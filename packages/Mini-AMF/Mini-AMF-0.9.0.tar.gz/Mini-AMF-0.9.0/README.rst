========
Mini-AMF
========

Mini-AMF provides Action Message Format (AMF_) serialization and
deserialization support for Python_, compatible with the `Adobe Flash
Player`_.  It supports Python 2.7 and 3.4+.

.. image:: https://travis-ci.org/zackw/mini-amf.svg?branch=master
    :target: https://travis-ci.org/zackw/mini-amf
.. image:: https://coveralls.io/repos/zackw/mini-amf/badge.svg
    :target: https://coveralls.io/r/zackw/mini-amf

Mini-AMF is a trimmed-down version of the `original PyAMF`_, which (as
far as I can tell) is no longer being maintained.  It provides only
the core serialization and deserialization primitives, and support for
reading and writing LSO_ objects on disk.  Support for Flex-specific
types, "remoting", and integration with web frameworks has all been
removed.  (Adapter classes are still supported.)

Mini-AMF is lightly maintained by `Zack Weinberg`_.  All bug reports
and pull requests will be heard and responded to, but I have no plans
to develop the software any further myself.  Please note that patches
to restore support for old versions of Python 2 will *not* be
accepted, as this interferes with support for Python 3.  Please also
note that "remoting" and server integration will probably be easier to
maintain in their own separate packages, one per framework.


What's AMF?
-----------

AMF is a binary message serialization format geared for remote
procedure calls, native to the `Adobe Flash Player`_ and `Adobe
Integrated Runtime`_.  There are two versions of the format, AMF0 and
AMF3.  AMF3 is more compact than AMF0, and and supports data types
that are available only in ActionScript_ 3.0, such as ByteArray.

.. _AMF: https://en.wikipedia.org/wiki/Action_Message_Format
.. _Python: https://www.python.org
.. _Adobe Flash Player: https://en.wikipedia.org/wiki/Flash_Player
.. _original PyAMF: https://github.com/hydralabs/pyamf
.. _LSO: https://en.wikipedia.org/wiki/Local_shared_object
.. _Zack Weinberg: https://www.owlfolio.org/

.. _Adobe Integrated Runtime: https://en.wikipedia.org/wiki/Adobe_AIR
.. _ActionScript: https://en.wikipedia.org/wiki/ActionScript
