Python path setup utility
=========================

Module for configuration of sys.path for local imports relative to the
directory of the current script entry file.

Import of entrydir_pypath appends directories to the end of sys.path in
accordance with files named '.pythonpath'. Such files are referred to as
pythonpath files below. First, the directory of the script entry file
(obtained by sys.argv[0]) and its parents are searched for pythonpath files.
For interactive scripts and similar special cases, the current working
directory is used as fallback. The pythonpath file in the closest parent
directory is used to initiate the processing. If no such file is found,
sys.path is left unaltered.

Each line in a pythonpath file is a directory path that may be absolute or
relative. Directories that do not exist are ignored. Existing directories are
added to sys.path if there is no pythonpath file in the directory. Otherwise,
the entries in the found pythonpath file are processed in the same way as
above, and recursion continues until no additional pythonpath files are found.
To add a directory that contains a pythonpath file, the pythonpath file of
that directory must list its own directory.


Setup
-----

To install the package for the current user:

.. code-block:: bash

	$ pip install --user entrydir_pypath

To import the package automatically from usercustomize during initialization:

.. code-block:: bash

	$ entrydir-pypath-config -install
	

For deactivation of automatical import:
	
.. code-block:: bash

	$ entrydir-pypath-config -remove


To uninstall the package:
	
.. code-block:: bash

	$ pip uninstall entrydir_pypath
