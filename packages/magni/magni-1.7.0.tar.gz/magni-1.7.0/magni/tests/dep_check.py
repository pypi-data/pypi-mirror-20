"""
..
    Copyright (c) 2014-2017, Magni developers.
    All rights reserved.
    See LICENSE.rst for further information.

A script that prints a dependency report for Magni

More about comparing versions of Python packages:
http://www.python.org/dev/peps/pep-0345/
http://www.python.org/dev/peps/pep-0386/
https://www.python.org/dev/peps/pep-0440/

"""

from __future__ import division
from pkg_resources import parse_version
import importlib
from itertools import chain
import platform
import re
import sys


# Package names vs import names
pac_names = {'python': 'Python',
             'numpy': 'NumPy',
             'scipy': 'SciPy',
             'tables': 'PyTables',
             'matplotlib': 'Matplotlib',
             'mkl': 'MKL',
             'sphinx': 'Sphinx',
             'IPython': 'IPython',
             'pyflakes': 'Pyflakes',
             'pep8': 'PEP8',
             'radon': 'Radon',
             'nose': 'Nose',
             'coverage': 'Coverage',
             'PIL': 'PIL',
             'conda': 'Conda',
             'setuptools': 'Setuptools',
             'sklearn': 'scikit-learn'}


# Minimum version requirements
python2_min_ver = '2.7'
python3_min_ver = '3.3'
python3_first_break_ver = '3.5'  # First version following minimum version for
# which some third party dependency requires a newer version than specified
# below.

deps = {'numpy': '1.8',
        'scipy': '0.14',
        'tables': '3.1',
        'matplotlib': '1.3',
        'setuptools': '11.3'}

opt_deps = {'mkl': '11.1',
            'sphinx': '1.3.1',
            'IPython': '2.1',
            'pyflakes': '0.8',
            'pep8': '1.5',
            'radon': '1.2',
            'nose': '1.3',
            'coverage': '3.7',
            'PIL': '1.1.7',
            'sklearn': '0.15.1',
            'conda': '3.7.0'}

ver_broken_opt_deps = {}

status = {}


# Python requirements
py_ver = platform.python_version()
if py_ver[0] == '2':
    if parse_version(py_ver) < parse_version(python2_min_ver):
        status['python'] = ('FAIL: Python 2 version nedded ' +
                            python2_min_ver + '; Installed version is ' +
                            py_ver)
    else:
        status['python'] = 'OK: Python 2 at version ' + py_ver

elif py_ver[0] == '3':
    if parse_version(py_ver) < parse_version(python3_min_ver):
        status['python'] = ('FAIL: Python 3 version needed ' +
                            python3_min_ver + '; Installed version is ' +
                            py_ver)
    else:
        status['python'] = 'OK: Python 3 at version ' + py_ver
        if parse_version(py_ver) >= parse_version(python3_first_break_ver):
            status['python'] = (
                'WARN: Python 3 at version ' + py_ver +
                ' (this version may require newer versions of some of the ' +
                'third party libraries)')

else:
    status['python'] = 'FAIL: Python version is ' + py_ver + '... What???'


# Third party dependencies
all_deps = dict(chain(deps.items(), opt_deps.items()))
for pac in all_deps:
    try:
        p = importlib.import_module(pac)

        # Fix packages that do not have a __version__ magic
        if pac == 'mkl':
            p.__version__ = re.search('\d+\.\d+\.\d+',
                                      p.get_version_string()).group()
        elif pac == 'PIL':
            import PIL.Image
            p.__version__ = PIL.Image.VERSION

        if parse_version(p.__version__) < parse_version(all_deps[pac]):
            status[pac] = ('WARN: Tested on version >= ' + all_deps[pac] +
                           '; Installed version is ' + p.__version__)
        else:
            status[pac] = 'OK: Installed version is ' + p.__version__

    except ImportError:
        status[pac] = 'FAIL: Unable to import'


# Version broken optional dependencies:
for brok, brok_ver in ver_broken_opt_deps.items():
    try:
        b = importlib.import_module(brok)
        if parse_version(b.__version__) < parse_version(brok_ver):
            status[brok] = ('WARN: Tested on version >= ' + brok_ver +
                            '; Installed version is ' + b.__version__)
        else:
            status[brok] = 'OK: Installed version is ' + b.__version__
    except AttributeError:
        status[brok] = ('WARN: Unknown version. Please ensure version >= ' +
                        ver_broken_opt_deps[brok])
    except ImportError:
        status[brok] = 'FAIL: Unable to import'


# Pretty print formatting function
def _print_dep_report(dep, status):
    """
    Pretty print a report about a single Magni dependency.

    Parameters
    ----------
    dep : str
        The key in the `status` dict correspoding to the relevant dependency.
    status : dict
        The dictionary holding the dependency status to be printed.

    """

    print ('{0:>14}  :  {1:<15}'.format(pac_names[dep], status[dep]))


# Print the full dependency report
print('\nMagni dependency report')
print('======================================================================')
print('\nPython installation:')

_print_dep_report('python', status)

print('\nThird party dependencies:')

for dep in sorted(deps):
    _print_dep_report(dep, status)

print('\nOptional third party dependencies:')

for opt in sorted(opt_deps):
    _print_dep_report(opt, status)

for opt in sorted(ver_broken_opt_deps):
    _print_dep_report(opt, status)

# Exit 1 in case of failures
for val in status.values():
    if 'FAIL' in val:
        sys.exit(1)
