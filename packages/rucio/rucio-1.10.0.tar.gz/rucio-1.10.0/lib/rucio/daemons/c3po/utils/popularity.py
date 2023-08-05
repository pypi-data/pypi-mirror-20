# Copyright European Organization for Nuclear Research (CERN)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# You may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# http://www.apache.org/licenses/LICENSE-2.0
#
# Authors:
# - Thomas Beermann, <thomas.beermann@cern.ch>, 2016

import logging

from requests import post
from requests.auth import HTTPBasicAuth
from json import dumps, loads

from rucio.common.config import config_get, config_get_options

elastic_url = config_get('es-atlas', 'url')

elastic_options = config_get_options('es-atlas')

auth = None
if ('username' in elastic_options) and ('password' in elastic_options):
    auth = HTTPBasicAuth(config_get('es-atlas', 'username'), config_get('es-atlas', 'password'))

elastic_ca_cert = False
if 'ca_cert' in elastic_options:
    elastic_ca_cert = config_get('es-atlas', 'ca_cert')

url = elastic_url + '/atlas_rucio-popularity-*/_search'


def get_popularity(did):
    """
    Query the popularity for a given DID in the ElasticSearch popularity db.
    """
    query = {
        "query": {
            "bool": {
                "must": []
            }
        },
        "filter": {
            "range": {
                "timestamp": {
                    "gt": "now-7d",
                    "lt": "now"
                }
            }
        },
        "aggs": {
            "pop": {"sum": {"field": "ops"}}
        },
        "size": 0
    }

    query['query']['bool']['must'].append({"term": {"scope": did[0]}})
    query['query']['bool']['must'].append({"term": {"name": did[1]}})

    logging.debug(query)
    if auth:
        r = post(url, data=dumps(query), auth=auth, verify=elastic_ca_cert)
    else:
        r = post(url, data=dumps(query), verify=elastic_ca_cert)

    if r.status_code != 200:
        return None

    result = loads(r.text)

    if 'aggregations' in result:
        if 'pop' in result['aggregations']:
            if 'value' in result['aggregations']['pop']:
                return result['aggregations']['pop']['value']

    return None
