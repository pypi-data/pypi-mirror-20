#!/usr/bin/env python
# -*- encoding: utf-8 -*-

# Copyright (c) 2002-2017 "Neo Technology,"
# Network Engine for Objects in Lund AB [http://neotechnology.com]
#
# This file is part of Neo4j.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
try:
    from setuptools import setup, Extension
except ImportError:
    from distutils.core import setup, Extension

from neo4j.meta import version

try:
    from Cython.Build import cythonize
    from Cython.Distutils import build_ext
except ImportError:
    cmdclass = {}
    ext_modules = [
        Extension("neo4j.bolt._io", ["neo4j/bolt/_io.c"]),
        Extension("neo4j.packstream._packer", ["neo4j/packstream/_packer.c"]),
        Extension("neo4j.packstream._unpacker", ["neo4j/packstream/_unpacker.c"]),
    ]
else:
    cmdclass = {'build_ext': build_ext}
    ext_modules = cythonize([Extension("*", ["**/*.pyx"])])


# Used for reading the README into long_description below.
def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()


setup(name="neo4j-driver",
      version=version,
      description="Neo4j Bolt driver for Python",
      license="Apache License, Version 2.0",
      long_description=read("README.rst"),
      author="Neo Technology",
      author_email="drivers@neo4j.com",
      keywords="neo4j graph database",
      url="https://github.com/neo4j/neo4j-python-driver",
      classifiers=[
          "Intended Audience :: Developers",
          "License :: OSI Approved :: Apache Software License",
          "Operating System :: OS Independent",
          "Topic :: Database",
          "Topic :: Software Development",
          "Programming Language :: Python :: 2.7",
          "Programming Language :: Python :: 3.4",
          "Programming Language :: Python :: 3.5",
          "Programming Language :: Python :: 3.6",
      ],
      packages=["neo4j", "neo4j.bolt", "neo4j.compat", "neo4j.packstream", "neo4j.v1"],
      ext_modules=ext_modules)
