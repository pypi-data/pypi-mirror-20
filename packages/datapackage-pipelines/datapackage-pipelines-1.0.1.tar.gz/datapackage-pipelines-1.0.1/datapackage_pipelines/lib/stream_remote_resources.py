import os
import logging

import itertools

import tabulator

from jsontableschema import Schema

from datapackage_pipelines.wrapper import ingest, spew
from datapackage_pipelines.utilities.resource_matcher import ResourceMatcher


def _reader(opener, _url):
    yield None
    filename = os.path.basename(_url)
    logging.info('%s: OPENING %s', filename, _url)
    _schema, _headers, _reader = opener()
    num_headers = len(_headers)
    i = 0
    for i, row in enumerate(_reader):

        row = [str(x).strip() for x in row]
        values = set(row)
        if len(values) == 1 and '' in values:
            # In case of empty rows, just skip them
            continue
        output = dict(zip(_headers, _schema.cast_row(row[:num_headers])))
        yield output

        i += 1
        if i % 10000 == 0:
            logging.info('%s: %d rows', filename, i)
            # break

    logging.info('%s: TOTAL %d rows', filename, i)


def dedupe(headers):
    _dedupped_headers = []
    headers = list(map(str, headers))
    for hdr in headers:
        if hdr is None or len(hdr.strip()) == 0:
            continue
        if hdr in _dedupped_headers:
            i = 0
            deduped_hdr = hdr
            while deduped_hdr in _dedupped_headers:
                i += 1
                deduped_hdr = '%s_%s' % (hdr, i)
            hdr = deduped_hdr
        _dedupped_headers.append(hdr)
    return _dedupped_headers


def row_skipper(rows_to_skip):
    def _func(extended_rows):
        for number, headers, row in extended_rows:
            if number > rows_to_skip:
                yield (number-rows_to_skip, headers, row)
    return _func


def stream_reader(_resource, _url):
    def get_opener(__url, __resource):
        def opener():
            _params = dict(headers=1)
            _params.update(
                dict(x for x in __resource.items()
                     if x[0] not in {'path', 'name', 'schema',
                                     'mediatype', 'skip_rows'}))
            skip_rows = __resource.get('skip_rows', 0)
            _stream = tabulator.Stream(__url, **_params,
                                       post_parse=[row_skipper(skip_rows)])
            _stream.open()
            _headers = dedupe(_stream.headers)
            _schema = __resource.get('schema')
            if _schema is not None:
                _schema = Schema(_schema)
            return _schema, _headers, _stream
        return opener

    schema, headers, stream = get_opener(url, _resource)()
    if schema is None:
        schema = {
            'fields': [
                {'name': header, 'type': 'string'}
                for header in headers
                ]
        }
        _resource['schema'] = schema

    stream.close()
    del stream

    return itertools\
        .islice(
            _reader(
                get_opener(_url, _resource),
                _url),
            1, None)


parameters, datapackage, resource_iterator = ingest()

resources = ResourceMatcher(parameters.get('resources'))

new_resource_iterator = []
for resource in datapackage['resources']:

    path = resource.get('path')
    if path is not None and '://' not in path:
        new_resource_iterator.append(next(resource_iterator))
    else:
        url = resource.get('url', path)
        assert url is not None, \
            'Resource should have at least on "url" or "path" property'

        name = resource['name']
        if not resources.match(name):
            continue

        basename = os.path.basename(resource['url'])
        path = os.path.join('data', basename)
        resource['path'] = path
        if 'url' in resource:
            del resource['url']

        rows = stream_reader(resource, url)
        new_resource_iterator.append(rows)

spew(datapackage, new_resource_iterator)
