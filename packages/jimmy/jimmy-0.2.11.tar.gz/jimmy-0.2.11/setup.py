# -*- coding: utf-8 -*-

#    Copyright 2016 Mirantis, Inc.
#
#    This program is free software; you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation; either version 2 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License along
#    with this program; if not, write to the Free Software Foundation, Inc.,
#    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

try:
    from setuptools import setup, find_packages
except ImportError:
    from distutils.core import setup

config = {
    'name': 'jimmy',
    'version': '0.2.11',

    'author': 'CI Team',

    'description': 'Update jenkins configuration using YAML',

    'url': 'https://github.com/ci-team/jimmy',

    'download_url': 'https://github.com/ci-team/jimmy',

    'classifiers': [
        'Development Status :: 5 - Production/Stable',
        'License :: OSI Approved :: Apache Software License',
        'Operating System :: Unix',
        'Programming Language :: Python :: 2.7',
     ],

    'platforms': ['Unix'],

    'scripts': [],

    'provides': [],

    'license': ['Apache License 2.0'],

    'install_requires': [
        'click',
        'functools32',
        'jsonschema',
        'MarkupSafe',
        'pyaml',
        'PyYAML',
        'wheel'
    ],

    'packages': find_packages(),
    'package_data': {
        'jimmy': ['lib/schema.yaml',
                  'modules/*/resources/*']
    },
    'entry_points': {
        'console_scripts': [
            'jimmy = jimmy:cli',
        ],
    },


    'zip_safe': False,
}

setup(**config)
