"""
"""

# Created on 2016.04.29
#
# Author: Giovanni Cannata
#
# Copyright 2016 Giovanni Cannata
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

import unittest

from test import random_id, get_connection, drop_connection


testcase_id = random_id()


class Test(unittest.TestCase):
    def setUp(self):
        self.connection = get_connection(check_names=True)
        self.delete_at_teardown = []

    def tearDown(self):
        drop_connection(self.connection, self.delete_at_teardown)
        self.assertFalse(self.connection.bound)

    def test_abandon_0(self):
        # abandon(0) should work as a "ping" to the server
        result = self.connection.abandon(0)
        self.assertTrue(result)

    def test_abandon_1(self):
        # should abandon a specific operation, but messageID 1 has been used by the authentication
        result = self.connection.abandon(1)
        self.assertFalse(result)

    def test_abandon_99999999(self):
        # should abandon a not yet existing specific operation
        result = self.connection.abandon(99999999)
        self.assertFalse(result)
