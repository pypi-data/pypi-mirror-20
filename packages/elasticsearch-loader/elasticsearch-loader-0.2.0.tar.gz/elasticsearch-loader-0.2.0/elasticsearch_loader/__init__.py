#!/usr/bin/env python
# -*- coding: utf-8 -*-
from elasticsearch import helpers
from elasticsearch import Elasticsearch
from elasticsearch.exceptions import NotFoundError
from pkg_resources import iter_entry_points
from click_stream import Stream
from itertools import chain
from datetime import datetime
import csv
import click
import concurrent.futures as futures

from .parsers import json, parquet
from .iter import grouper, bulk_builder, json_lines_iter


def single_bulk_to_es(bulk, config, es_conn):
    bulk = bulk_builder(bulk, config)
    helpers.bulk(es_conn, bulk)


def load(lines, config):
    # FIXME: Get rid of the list comprehension (done for better progress bar duration)
    chunks = [x for x in grouper(lines, config['bulk_size'])]
    with futures.ThreadPoolExecutor(config['concurrency']) as executor:
        future_map = (executor.submit(single_bulk_to_es, chunk, config, config['es_conn']) for chunk in chunks)
        with click.progressbar(futures.as_completed(future_map), label='Uploading', length=len(chunks)) as pbar:
            for i, f in enumerate(pbar):
                try:
                    f.result()
                except Exception as e:
                    log('warn', 'Chunk {i} got exception ({e}) while processing'.format(e=e, i=i))


def format_msg(msg, sevirity):
    return '{} {} {}'.format(datetime.now(), sevirity.upper(), msg)


def log(sevirity, msg):
    cmap = {'info': 'blue', 'warn': 'yellow', 'error': 'red'}
    click.secho(format_msg(msg, sevirity), fg=cmap[sevirity])


@click.group()
@click.option('--bulk-size', default=500, help='How many docs to collect before writing to ElasticSearch (default 500)')
@click.option('--concurrency', default=10, help='How much worker threads to start (default 10)')
@click.option('--es-host', default='http://localhost:9200', help='Elasticsearch cluster entry point. (default http://localhost:9200)')
@click.option('--verify-certs', default=False, is_flag=True, help='Make sure we verify SSL certificates (default false)')
@click.option('--use-ssl', default=False, is_flag=True, help='Turn on SSL (default false)')
@click.option('--ca-certs', help='Provide a path to CA certs on disk')
@click.option('--http-auth', help='Provide username and password for basic auth in the format of username:password')
@click.option('--index', help='Destination index name', required=True)
@click.option('--delete', default=False, is_flag=True, help='Delete index before import? (default false)')
@click.option('--type', help='Docs type', required=True)
@click.option('--id-field', help='Specify field name that be used as document id')
@click.option('--index-settings-file', type=click.File('rb'), help='Specify path to json file containing index mapping and settings')
@click.pass_context
def cli(ctx, **opts):
    ctx.obj = opts
    es_opts = {x: y for x, y in opts.items() if x in ('use_ssl', 'ca_certs', 'verify_certs', 'http_auth')}
    ctx.obj['es_conn'] = Elasticsearch(opts['es_host'], **es_opts)
    if opts['delete']:
        try:
            ctx.obj['es_conn'].indices.delete(opts['index'])
            log('info', 'Index %s deleted' % opts['index'])
        except NotFoundError:
            log('info', 'Skipping index deletion')
    if opts['index_settings_file']:
        ctx.obj['es_conn'].indices.create(index=opts['index'], body=opts['index_settings_file'].read())


@cli.command(name='csv')
@click.argument('files', type=Stream(file_mode='rb'), nargs=-1, required=True)
@click.option('--delimiter', default=',', type=str, help='Default ,')
@click.pass_context
def _csv(ctx, files, delimiter):
    lines = chain(*(csv.DictReader(x, delimiter=str(delimiter)) for x in files))
    log('info', 'Loading into ElasticSearch')
    load(lines, ctx.obj)


@cli.command(name='json')
@click.argument('files', type=Stream(file_mode='rb'), nargs=-1, required=True)
@click.option('--json-lines', default=False, is_flag=True, help='Files formated as json lines')
@click.pass_context
def _json(ctx, files, json_lines):
    """
    FILES with the format of [{"a": "1"}, {"b": "2"}]
    """
    if json_lines:
        lines = chain(*(json_lines_iter(x) for x in files))
    else:
        lines = chain(*(json.load(x) for x in files))
    load(lines, ctx.obj)


@cli.command(name='parquet')
@click.argument('files', type=Stream(file_mode='rb'), nargs=-1, required=True)
@click.pass_context
def _parquet(ctx, files):
    if not parquet:
        raise SystemExit("parquet module not found, please install manually")
    lines = chain(*(parquet.DictReader(x) for x in files))
    log('info', 'Loading into ElasticSearch')
    load(lines, ctx.obj)


def load_plugins():
    for plugin in iter_entry_points(group='esl.plugins'):
        log('info', 'loading %s' % plugin.module_name)
        plugin.resolve()(cli)


def main():
    load_plugins()
    cli()


if __name__ == '__main__':
    main()
