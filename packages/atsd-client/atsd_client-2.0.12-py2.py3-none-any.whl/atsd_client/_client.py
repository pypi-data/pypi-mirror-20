# -*- coding: utf-8 -*-

"""
Copyright 2015 Axibase Corporation or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at

https://www.axibase.com/atsd/axibase-apache-2.0.pdf

or in the "license" file accompanying this file. This file is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied. See the License for the specific language governing
permissions and limitations under the License.
"""

try:
    import urlparse
except ImportError:
    import urllib.parse as urlparse
import requests
from . import _jsonutil

from .exceptions import ServerException


class Client(object):
    """
    low level requests wrapper
    gets path data and method
    returns return response data
        or True if successful without content
    """

    def __init__(self, base_url,
                 username=None, password=None,
                 verify=None, timeout=None):
        """
        :param base_url: atsd url
        :param username: login
        :param password:
        :param verify: verify ssl sertificate
        :param timeout: request timeout
        """
        self.context = urlparse.urljoin(base_url, 'api/')
        session = requests.Session()
        if verify is False:
            session.verify = False
        if username is not None and password is not None:
            session.auth = (username, password)
        self.session = session
        self.timeout = timeout

    def _request(self, method, path, params=None, data=None):
        request = requests.Request(
            method=method,
            url=urlparse.urljoin(self.context, path),
            json=_jsonutil.serialize(data),
            params=params
        )
        prepared_request = self.session.prepare_request(request)
        response = self.session.send(prepared_request, timeout=self.timeout)
        if response.status_code is not 200:
            raise ServerException(response.status_code, response.text)
        try:
            return response.json()
        except ValueError:
            return response.text

    def post(self, path, data, params=None):
        return self._request('POST', path, params=params, data=data)

    def patch(self, path, data):
        return self._request('PATCH', path, data=data)

    def get(self, path, params=None):
        return self._request('GET', path, params=params)

    def put(self, path, data):
        return self._request('PUT', path, data=data)

    def delete(self, path):
        return self._request('DELETE', path)
