verifyreq
=========

Tool to verify requirement file installations.


Usage
=====

verifyreq is a fairly straightforward tool. Run it with any number of
requirement files as arguments and it will check that everything in the
requirement files is installed and consistent in the current environment.

.. code:: bash

    verifyreq requirements.txt

If everything is consistent, there will be some output and the exit code
will be zero. If there are any problems, a stack trace will be emitted with
(hopefully) useful information and there will be a non-zero exit code.


Changelog
=========

0.1.1
-----

- Only check through files once.

0.1.0
-----

- Initial release
