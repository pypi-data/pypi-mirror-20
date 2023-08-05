_42
========

*python decorator that executes a function and returns code 42 if the code
rises an exception.*

Description
-----------

This decorator comes to the aid of developers in search of an answer.
Yet, sometimes the answer seems meaningless because the beings who
instructed it never actually knew what the Question was. So, in this case,
this decorator returns the answer to the Ultimate Question of Life, the
Universe and Everything.

Installation
------------

    $ pip install python-42

Usage
-----------

.. code:: python

    from _42 import _42

    @_42
    def function(...):
        """Whatever."""
        ...
