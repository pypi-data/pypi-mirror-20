""lib2to3import
===============

lib2to3import is a utility to apply Python 2 to 3 code translation on import.

w/o lib2to3import
-------------------

  >>> from py2codes import py2_print
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    File "py2codes/py2_print.py", line 1
      print "Written when Python 2 was majority."
                                                ^
  SyntaxError: Missing parentheses in call to 'print'

With lib2to3import
--------------------

  >>> from lib2to3import import lib2to3importer, prepending
  >>> fixers = ["lib2to3.fixes.fix_print"]
  >>> with prepending(lib2to3importer(fixers, "py2codes.")):
  ...     from py2codes import py2_print
  ...
  Written when Python 2 was majority.

Limitation
------------

There's no way to apply fixes to 2 different roots concurrently.

When you apply fixes to both 'foo.module' and 'bar.module' at one time, you
have to leave out prefix parameter, that makes fixes applied to all of modules
and packages to be imported.

**Concurrent import**::

  from lib2to3import import lib2to3importer, prepending
  fixers = ["lib2to3.fixes.fix_print"]

  with prepending(lib2to3importer(fixers)):
      import foo.module  #  import chain: 1. foo.module -> 2. bar.module

**2 steps import (Recommended)**::

  from lib2to3import import lib2to3importer, prepending
  fixers = ["lib2to3.fixes.fix_print"]

  with prepending(lib2to3importer(fixers, "bar.")):
      import bar.module  # ... 2

  with prepending(lib2to3importer(fixers, "foo.")):
      import foo.module  # ... 1
