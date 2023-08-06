#!/usr/bin/env python

# Copyright (c) 2016, Michael Boyle
# See LICENSE file for details: <https://github.com/moble/spherical_functions/blob/master/LICENSE>

from distutils.core import setup
from auto_version import calculate_version, build_py_copy_version
from os import getenv

validate = True
error_on_invalid = False
if getenv('CI') is not None:
    if getenv('CI').lower() == 'true':
        error_on_invalid = True

setup(name='spherical-functions',
      description='Python/numba implementation of Wigner D Matrices, spin-weighted spherical harmonics, and associated functions',
      url='https://github.com/moble/spherical_functions',
      author='Michael Boyle',
      author_email='',
      packages=['spherical_functions', ],
      package_dir={'spherical_functions': '.'},
      package_data={'spherical_functions': ['*.npy']},
      version=calculate_version(validate, error_on_invalid),
      cmdclass={'build_py': build_py_copy_version}, )
