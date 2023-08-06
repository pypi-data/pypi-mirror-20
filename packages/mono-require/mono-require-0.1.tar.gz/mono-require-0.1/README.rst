mono-require
============

Use `mono-require` to access local resource for avoid read/write conflict.

Usage
-----

Use `require` to access local resource.

.. code-block::python
    from monorequire import require

    with require("resource") as f:
        f.write("some")


`require` support all arguments except `closefd` and `opener` of built-in method `open` (https://docs.python.org/3/library/functions.html?highlight=open#open).

And `require` have three more arguments with default value:

* `timeout=1` and `delay=0.001`. When require a resource has been used, `require` could waiting till timeout and throw `LockTimeoutException`.
* `lock_path="."` to set the lock file location. By default we create lock file in resource directory.
