EBAS Uploader
=============

.. image:: https://img.shields.io/pypi/dm/ebas-uploader.svg
   :target:  https://pypi.python.org/pypi/ebas-uploader/

.. image:: https://img.shields.io/pypi/v/ebas-uploader.svg
   :target:  https://pypi.python.org/pypi/ebas-uploader/

.. image:: https://img.shields.io/badge/license-MIT-blue.svg
   :target:  https://pypi.python.org/pypi/ebas-uploader/

a command line utility to watch a folder and auto-upload files to an EBAS node


Installation
------------

::

    pip install ebas-uploader


Usage
-----

::

    Usage: ebas_uploader [OPTIONS]

      watches a folder and auto-uploads files to an EBAS node with the given
      configuration for processing

      Note that previous versions required passing in many arguments via the
      command line on execution (`--watch-path`, `--archive-path`, etc). Now
      all of those instance specific variables that do not involve communication
      with EBAS should be stored in a single JSON file, provided as the
      `--script-config` argument.

    Options:
      --ebas-config FILENAME    JSON config file downloaded from EBAS  [required]
      --script-config FILENAME  JSON config file that contains instance-specific
                                settings (created with setup_local_config.py)
                                [required]
      --silent                  Set this flag to not report errors to Maize
      --version                 Show the version and exit.
      --help                    Show this message and exit.
