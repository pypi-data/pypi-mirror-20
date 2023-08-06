"""
setup.py
========

This is the setup.py script for Eelbrain.

http://docs.python.org/distutils/index.html

"""
# Setuptools bootstrap module
# http://pythonhosted.org//setuptools/setuptools.html
from ez_setup import use_setuptools
use_setuptools('17')

import re
import sys
from setuptools import setup, find_packages, Extension
import numpy as np


DESC = """
GitHub: https://github.com/christianbrodbeck/Eelbrain
"""

# version must be in X.X.X format, e.g., "0.0.3dev"
with open('eelbrain/__init__.py') as fid:
    text = fid.read()
match = re.search("__version__ = '([.\w]+)'", text)
if match is None:
    raise ValueError("No valid version string found in:\n\n" + text)
version = match.group(1)
if version.count('.') != 2 and not version.endswith('dev'):
    raise ValueError("Invalid version string extracted: %r" % version)

if len(sys.argv) > 1:
    arg = sys.argv[1]
else:
    arg = None

# Cython extensions
ext = [Extension("eelbrain._stats.opt", ["eelbrain/_stats/opt.c"])]

# basic setup arguments
kwargs = dict(name='eelbrain',
              version=version,
              description="MEG/EEG analysis tools",
              url="http://eelbrain.readthedocs.io",
              author="Christian Brodbeck",
              author_email='christianbrodbeck@nyu.edu',
              license='GPL3',
              long_description=DESC,
              install_requires=['keyring >= 5',
                                'tex >= 1.8',
                                'mne >= 0.13.1',
                                'nibabel >= 2.0',
                                'colormath >= 2.1'],
              extras_require={'full': ['numpy >= 1.8',
                                       'scipy >= 0.11.0',
                                       'matplotlib >= 1.1'],
                              'dev': ['cython >= 0.21',
                                      'sphinx >= 1.1',
                                      'numpydoc >= 0.5'],
                              'plot.brain': ['pysurfer[save_movie] >= 0.7']},
              include_dirs=[np.get_include()],
              packages=find_packages(),
              ext_modules=ext,
              )

# Either PIL or Pillow is fine...
try:
    import PIL
except ImportError:
    kwargs['install_requires'].append('pillow')

setup(**kwargs)

