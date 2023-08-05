"""
"""

# Created on 2013.05.15
#
# Author: Giovanni Cannata
#
# Copyright 2013, 2014, 2015, 2016, 2017 Giovanni Giovanni Cannata
#
# This file is part of ldap3.
#
# ldap3 is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# ldap3 is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public License
# along with ldap3 in the COPYING and COPYING.LESSER files.
# If not, see <http://www.gnu.org/licenses/>.

from types import GeneratorType

# authentication
ANONYMOUS = 'ANONYMOUS'
SIMPLE = 'SIMPLE'
SASL = 'SASL'
NTLM = 'NTLM'

# SASL MECHANISMS
EXTERNAL = 'EXTERNAL'
DIGEST_MD5 = 'DIGEST-MD5'
KERBEROS = GSSAPI = 'GSSAPI'

AUTO_BIND_NONE = 'NONE'  # same as False
AUTO_BIND_NO_TLS = 'NO_TLS'  # same as True
AUTO_BIND_TLS_BEFORE_BIND = 'TLS_BEFORE_BIND'
AUTO_BIND_TLS_AFTER_BIND = 'TLS_AFTER_BIND'

# server IP dual stack mode
IP_SYSTEM_DEFAULT = 'IP_SYSTEM_DEFAULT'
IP_V4_ONLY = 'IP_V4_ONLY'
IP_V6_ONLY = 'IP_V6_ONLY'
IP_V4_PREFERRED = 'IP_V4_PREFERRED'
IP_V6_PREFERRED = 'IP_V6_PREFERRED'

# search scope
BASE = 'BASE'
LEVEL = 'LEVEL'
SUBTREE = 'SUBTREE'

# search alias
DEREF_NEVER = 'NEVER'
DEREF_SEARCH = 'SEARCH'
DEREF_BASE = 'FINDING_BASE'
DEREF_ALWAYS = 'ALWAYS'

# search attributes
ALL_ATTRIBUTES = '*'
NO_ATTRIBUTES = '1.1'  # as per RFC 4511
ALL_OPERATIONAL_ATTRIBUTES = '+'  # as per RFC 3673

# modify type
MODIFY_ADD = 'MODIFY_ADD'
MODIFY_DELETE = 'MODIFY_DELETE'
MODIFY_REPLACE = 'MODIFY_REPLACE'
MODIFY_INCREMENT = 'MODIFY_INCREMENT'

# client strategies
SYNC = 'SYNC'
ASYNC = 'ASYNC'
LDIF = 'LDIF'
RESTARTABLE = 'RESTARTABLE'
REUSABLE = 'REUSABLE'
MOCK_SYNC = 'MOCK_SYNC'
MOCK_ASYNC = 'MOCK_ASYNC'
ASYNC_STREAM = 'ASYNC_STREAM'

# get rootDSE info
NONE = 'NO_INFO'
DSA = 'DSA'
SCHEMA = 'SCHEMA'
ALL = 'ALL'

OFFLINE_EDIR_8_8_8 = 'EDIR_8_8_8'
OFFLINE_AD_2012_R2 = 'AD_2012_R2'
OFFLINE_SLAPD_2_4 = 'SLAPD_2_4'
OFFLINE_DS389_1_3_3 = 'DS389_1_3_3'

# server pooling
FIRST = 'FIRST'
ROUND_ROBIN = 'ROUND_ROBIN'
RANDOM = 'RANDOM'

# Hashed password
HASHED_NONE = 'PLAIN'
HASHED_SHA = 'SHA'
HASHED_SHA256 = 'SHA256'
HASHED_SHA384 = 'SHA384'
HASHED_SHA512 = 'SHA512'
HASHED_MD5 = 'MD5'
HASHED_SALTED_SHA = 'SALTED_SHA'
HASHED_SALTED_SHA256 = 'SALTED_SHA256'
HASHED_SALTED_SHA384 = 'SALTED_SHA384'
HASHED_SALTED_SHA512 = 'SALTED_SHA512'
HASHED_SALTED_MD5 = 'SALTED_MD5'

NUMERIC_TYPES = (int, float)

# types for string and sequence
if str != bytes:  # python 3
    STRING_TYPES = (str, )
    SEQUENCE_TYPES = (set, list, tuple, GeneratorType, type(dict().keys()))  # dict.keys() is a iterable memoryview in Python 3
else:  # python 2
    STRING_TYPES = (str, unicode)
    SEQUENCE_TYPES = (set, list, tuple, GeneratorType)

# centralized imports  # must be at the end of the __init__.py file
from .version import __author__, __version__, __email__, __description__, __status__, __license__, __url__
from .utils.config import get_config_parameter, set_config_parameter
from .core.server import Server
from .core.connection import Connection
from .core.tls import Tls
from .core.pooling import ServerPool
from .abstract.objectDef import ObjectDef
from .abstract.attrDef import AttrDef
from .abstract.attribute import Attribute, WritableAttribute, OperationalAttribute
from .abstract.entry import Entry, WritableEntry
from .abstract.cursor import Reader, Writer
from .protocol.rfc4512 import DsaInfo, SchemaInfo
