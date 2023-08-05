#!/usr/bin/env python
# This file is part of ranger, the console file manager.
# License: GNU GPL version 3, see the file "AUTHORS" for details.

from __future__ import (absolute_import, division, print_function)

from hashlib import sha512
import os
import shutil

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

import ranger


SCRIPTS_PATH = 'build_scripts'


def findall(directory):
    return [os.path.join(directory, f) for f in os.listdir(directory)
            if os.path.isfile(os.path.join(directory, f))]


def hash_file(path):
    with open(path, 'rb') as fobj:
        return sha512(fobj.read()).digest()


def scripts_hack(*scripts):
    ''' Hack around `pip install` temporary directories '''
    if not os.path.exists(SCRIPTS_PATH):
        os.makedirs(SCRIPTS_PATH)
    scripts_path = []
    for src_path, basename in scripts:
        dest_path = os.path.join(SCRIPTS_PATH, basename)
        if not os.path.exists(dest_path) or \
                (os.path.exists(src_path) and hash_file(src_path) != hash_file(dest_path)):
            shutil.copy(src_path, dest_path)
        scripts_path += [dest_path]
    return scripts_path


def main():
    setup(
        name='ranger-fm',
        description='Vim-like file manager',
        long_description=ranger.__doc__,
        version=ranger.__version__,
        author=ranger.__author__,
        author_email=ranger.__email__,
        license=ranger.__license__,
        url='http://ranger.nongnu.org',

        scripts=scripts_hack(
            ('ranger.py', 'ranger'),
            ('ranger/ext/rifle.py', 'rifle'),
        ),
        data_files=[
            ('share/applications', [
                'doc/ranger.desktop',
            ]),
            ('share/man/man1', [
                'doc/ranger.1',
                'doc/rifle.1',
            ]),
            ('share/doc/ranger', [
                'doc/colorschemes.txt',
                'CHANGELOG.md',
                'HACKING.md',
                'README.md',
            ]),
            ('share/doc/ranger/config', findall('doc/config')),
            ('share/doc/ranger/config/colorschemes', findall('doc/config/colorschemes')),
            ('share/doc/ranger/examples', findall('examples')),
            ('share/doc/ranger/tools', findall('doc/tools')),
        ],
        package_data={
            'ranger': [
                'data/*',
                'config/rc.conf',
                'config/rifle.conf',
            ],
        },
        packages=(
            'ranger',
            'ranger.api',
            'ranger.colorschemes',
            'ranger.config',
            'ranger.container',
            'ranger.core',
            'ranger.ext',
            'ranger.ext.vcs',
            'ranger.gui',
            'ranger.gui.widgets',
        ),
    )


if __name__ == '__main__':
    main()
