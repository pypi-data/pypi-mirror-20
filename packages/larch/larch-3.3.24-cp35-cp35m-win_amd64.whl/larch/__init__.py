######################################################### encoding: utf-8 ######
#
#  Larch is free, open source software to estimate discrete choice models.
#  
#  Copyright 2007-2016 Jeffrey Newman
#
#  Larch is free software: you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
#
#  Larch is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with Larch.  If not, see <http://www.gnu.org/licenses/>.
#
################################################################################

import sys
import os, os.path

__version__ = '3.3.24'
__build_date__ = '25 February 2017'

if os.environ.get('READTHEDOCS', None) == 'True':
	# hack for building docs on rtfd
	from .mock_module import Mock
	MOCK_MODULES = ['numpy', 'pandas', 'larch._core', 'larch.apsw']
	sys.modules.update((mod_name, Mock()) for mod_name in MOCK_MODULES)



info = """Larch is free, open source software to estimate discrete choice models.
Copyright 2007-2016 Jeffrey Newman
This program is licensed under GPLv3 and comes with ABSOLUTELY NO WARRANTY."""

status = ""

def execfile(script, dirname=None):
	import runpy, os, sys
	if dirname is not None:
		os.chdir(dirname)
		sys.path.insert(0,dirname)
	namespace = runpy.run_path(script)
	return namespace


status += "Python %s" % sys.version

import struct
status += "\nPython is running in %i bit mode" % ( 8 * struct.calcsize("P"))

try:
	from .larch import * # testing...
except:
	pass
from . import logging
from . import core
from .util.sysinfo import get_processor_name as _get_processor_name
_processor_name = _get_processor_name()
if isinstance(_processor_name, bytes):
	_processor_name = _processor_name.decode()
core.larch_initialize(_processor_name)
from . import exceptions
from .db import DB
from .dt import DT, DTL, IncompatibleShape
from .omx import OMX
from .model import Model, ModelFamily
from .metamodel import MetaModel
from .core import ModelParameter, LarchError
from . import array
from . import roles
from .util.dirs import cache as cachedir
core._set_array_module(array)
try:
	from .built import build, versions, build_config, longversion
	del built
except (NameError, ImportError):
	build, versions, build_config, longversion = "",{},"",""

try:
	from . import linalg
	core.set_linalg(linalg)
except AttributeError as err:
	print(err)
except ImportError:
	from .mock_module import Mock
	linalg = Mock()

status += "\nLarch "+build
_directory_ = os.path.split(__file__)[0]
status += "\nLoaded from %s" % _directory_

_autoinit_loggers = False

larch = sys.modules[__name__]

from . import examples

#	import sys
#	import subprocess
#
#	from distutils.version import LooseVersion as _LooseVersion
#	from . import version
#	from .version import remote as _remote
#	try:
#		outdated = _LooseVersion(_remote.version) > _LooseVersion(version.version)
#		_verion_warning = "Version {} is available (currently using {})".format(_remote.version,version.version)
#	except:
#		outdated = True
#		_verion_warning = "There may be an update available (currently using version {})".format(_remote.version,version.version)
#
#	if outdated:
#		print("!"*len(_verion_warning))
#		print(_verion_warning)
#		print("To upgrade, run 'pip install larch --upgrade'")
#		print("!"*len(_verion_warning))
#	
#	if 'sandbox' not in sys.executable and 'python' in sys.executable.lower() and os.environ.get('READTHEDOCS', None) != 'True':
#		import time as _time
#		try:
#			from .version.last_check import time as _last_version_check_time
#		except ImportError:
#			_last_version_check_time = 0
#		if float(_last_version_check_time) + 60*60*24 < _time.time():
#			_remote_version_checker = subprocess.Popen([sys.executable, os.path.join(_directory_,"version","remote_version_check.py")])

try:
	import colorama
except ImportError:
	pass
else:
	colorama.init()

def _add_path(*arg):
	import sys, os
	sys.path.append(os.path.join(os.path.expanduser('~'), *arg))


del sys
del os
#	try:
#		del array
#	except NameError:
#		pass
# End of init
