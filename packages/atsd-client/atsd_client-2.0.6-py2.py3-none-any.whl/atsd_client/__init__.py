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

from .connection import connect, connect_url
from . import models, _constants, _utilities, _time_utilities
from . import services

__all__ = ['services', 'models']
__version__ = '2.0.6'

try:
    print("Checking for the appropriate 'python-requests' version...")
    req_v = None
    import requests
    req_v = requests.__version__
    if list(map(lambda x: int(x), req_v.split("."))) >= [2, 4, 2]:
        print("Detected version of 'python-requests' :{}. OK".format(req_v))
    else:
        raise Exception 
except:
        import sys
        sys.stderr.write("WARNING! Detected version of 'python-requests' :{}. Needed at least 2.4.2!\n".format(req_v))
        sys.stderr.flush()
    
