'''
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
'''
import abc

from ..process.traversal import Traversal
from ..process.traversal import TraversalStrategy
from ..process.traversal import TraversalSideEffects

__author__ = 'Marko A. Rodriguez (http://markorodriguez.com)'


class RemoteConnection(metaclass=abc.ABCMeta):
    def __init__(self, url, traversal_source):
        self._url = url
        self._traversal_source = traversal_source

    @property
    def url(self):
        return self._url

    @property
    def traversal_source(self):
        return self._traversal_source

    @abc.abstractmethod
    def submit(self, bytecode):
        print("sending " + bytecode + " to GremlinServer...")
        return RemoteTraversal(iter([]), TraversalSideEffects())

    def __repr__(self):
        return "remoteconnection[" + self._url + "," + self._traversal_source + "]"


class RemoteTraversal(Traversal):
    def __init__(self, traversers, side_effects):
        Traversal.__init__(self, None, None, None)
        self.traversers = traversers
        self.side_effects = side_effects


class RemoteTraversalSideEffects(TraversalSideEffects):
    def __init__(self, keys_lambda, value_lambda):
        self.keys_lambda = keys_lambda
        self.value_lambda = value_lambda

    def keys(self):
        return self.keys_lambda()

    def get(self, key):
        return self.value_lambda(key)


class RemoteStrategy(TraversalStrategy):
    def __init__(self, remote_connection):
        self.remote_connection = remote_connection

    def apply(self, traversal):
        if traversal.traversers is None:
            remote_traversal = self.remote_connection.submit(traversal.bytecode)
            # traversal.side_effects = remote_traversal.side_effects
            traversal.traversers = remote_traversal#.traversers
