#!/usr/bin/env python

##
## You can download latest version of this file:
##  $ wget https://gist.github.com/vaab/e0eae9607ae806b662d4/raw -O setup.py
##  $ chmod +x setup.py
##
## This setup.py is meant to be run along with ``./autogen.sh`` that
## you can also find here: https://gist.github.com/vaab/9118087/raw
##

try:
    from setuptools import setup
except ImportError:
    from distribute_setup import use_setuptools
    use_setuptools()
    from setuptools import setup

##
## Ensure that ``./autogen.sh`` is run prior to using ``setup.py``
##

if "2.5.0".startswith("%%"):
    import os.path
    import sys
    if not os.path.exists('./autogen.sh'):
        sys.stderr.write(
            "This source repository was not configured.\n"
            "Please ensure ``./autogen.sh`` exists and that you are running "
            "``setup.py`` from the project root directory.\n")
        sys.exit(1)
    if os.path.exists('.autogen.sh.output'):
        sys.stderr.write(
            "It seems that ``./autogen.sh`` couldn't do its job as expected.\n"
            "Please try to launch ``./autogen.sh`` manualy, and send the "
            "results to the\nmaintainer of this package.\n"
            "Package will not be installed !\n")
        sys.exit(1)
    sys.stderr.write("Missing version information: "
                     "running './autogen.sh'...\n")
    import os
    import subprocess
    os.system('./autogen.sh > .autogen.sh.output')
    cmdline = sys.argv[:]
    if cmdline[0] == "-c":
        ## XXXvlab: for some reason, this is needed when launched from pip
        cmdline[0] = "setup.py"
    errlvl = subprocess.call(["python", ] + cmdline)
    os.unlink(".autogen.sh.output")
    sys.exit(errlvl)


## XXXvlab: Hacking distutils, not very elegant, but the only way I found
## to get data files to get copied next to the colour.py file...
## Any suggestions are welcome.
from distutils.command.install import INSTALL_SCHEMES
for scheme in INSTALL_SCHEMES.values():
    scheme['data'] = scheme['purelib']


##
## Normal d2to1 setup
##

setup(
    setup_requires=['d2to1'],
    extras_require={
        'Mustache': ["pystache", ],
        'Mako': ["mako", ],
        'test': [
            "nose",
            "minimock",
            "mako",
            "pystache",
        ],
    },
    d2to1=True
)
