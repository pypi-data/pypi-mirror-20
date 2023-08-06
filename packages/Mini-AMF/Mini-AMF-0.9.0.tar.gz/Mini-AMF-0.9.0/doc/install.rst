=====================
 Installation Guide
=====================

Mini-AMF requires Python_ 2.7 or 3.4+, and DefusedXML_.


Easy Installation
=================

The easiest way to install Mini-AMF is with ``pip``::

    pip install mini-amf


Manual Installation
===================

First install DefusedXML_.  If you wish to build the C accelerator
module, you will also need a C compiler and the libraries for
compiling Python extensions.

:doc:`download` and unpack the Mini-AMF archive of your choice::

    tar zxfv Mini-AMF-<version>.tar.gz
    cd Mini-AMF-<version>

Then install using the ``setup.py`` script::

    python setup.py install

This will byte-compile the Python source code and install it in the
``site-packages`` directory of your Python installation.


Unit Tests
==========

Unit tests can also be run via ``setup.py``.  No additional modules
are required::

    python setup.py test


C Accelerator Module
====================

The C accelerator module is broken, and will not be compiled or
installed by default.  If you want to experiment with it, supply
the ``--with-accel`` option::

    python setup.py --with-accel test

You will need Cython_ to build the module, and do not be surprised
when the test runner crashes.

Documentation
=============

To build the main documentation you need Sphinx_ 1.0 or newer.

From the ``doc`` subdirectory of the source distribution, run this
command::

    sphinx-build -b html . build

This will generate HTML documentation in the ``doc/build/html``
folder. This documentation is identical to the content on the main Mini-AMF
website_.

.. _Python: 			https://www.python.org/
.. _DefusedXML:                 https://pypi.python.org/pypi/defusedxml
.. _Cython:			http://cython.org
.. _Sphinx:     		http://www.sphinx-doc.org/
.. _website:    		https://github.com/hydralabs/miniamf
