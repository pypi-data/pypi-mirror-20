# -*- coding: utf-8 -*-

import os
import sys
import warnings
import kiwilite
from setuptools import setup, Extension
from setuptools.command.build_ext import build_ext

if os.name == 'nt' and os.getenv('VS90COMNTOOLS') is None:
	if os.getenv('VS140COMNTOOLS') is not None:
		os.environ['VS90COMNTOOLS'] = os.getenv('VS140COMNTOOLS')
	elif os.getenv('VS120COMNTOOLS') is not None:
		os.environ['VS90COMNTOOLS'] = os.getenv('VS120COMNTOOLS')
	elif os.getenv('VS110COMNTOOLS') is not None:
		os.environ['VS90COMNTOOLS'] = os.getenv('VS110COMNTOOLS')
	elif os.getenv('VS100COMNTOOLS') is not None:
		os.environ['VS90COMNTOOLS'] = os.getenv('VS100COMNTOOLS')

class kiwilite_build_ext(build_ext):
	def run(self):
		try: build_ext.run(self)
		except Exception:
			e = sys.exc_info()[1]
			sys.stdout.write('%s\n' % str(e))
			warnings.warn("Extension modules could not be compiled. KiwiLite will fallback to pure python version.")

	def build_extension(self, ext):
		try: build_ext.build_extension(self, ext)
		except Exception:
			e = sys.exc_info()[1]
			sys.stdout.write('%s\n' % str(e))
			warnings.warn("The %s extension module could not be compiled. KiwiLite will fallback to pure python version." % ext.name)

path = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(path, 'README.rst')) as f:
	readme = f.read()

setup(
	name = 'kiwilite',
	version = kiwilite.__version__,
	url = 'http://github.com/ibelie/kiwilite/python',
	keywords = ('noSql', 'key-value', 'database', 'kiwilite'),
	description = 'A single-file database storages key-value pairs.',
	long_description = readme,

	author = 'joungtao',
	author_email = 'joungtao@gmail.com',
	license = 'MIT License',

	cmdclass = {'build_ext': kiwilite_build_ext},
	ext_modules = [Extension('kiwilite._storage',
		sources = ['kiwilite/storage.c', 'c/kiwilite.c', 'c/tree.c', 'c/map.c', 'c/port.c'],
		include_dirs = ['c'],
	)],

	classifiers=[
		'Development Status :: 3 - Alpha',
		# 'Development Status :: 4 - Beta',
		# 'Development Status :: 5 - Production/Stable',
		'Environment :: Console',
		'Natural Language :: English',
		'Operating System :: OS Independent',
		'License :: OSI Approved :: MIT License',
		'Intended Audience :: Developers',
		'Intended Audience :: Science/Research',
		'Intended Audience :: Education',
		'Topic :: Software Development :: Libraries',
		'Programming Language :: Python :: 2.7',
		'Programming Language :: Python :: 3.5',
	],
	packages = ['kiwilite'],
)
