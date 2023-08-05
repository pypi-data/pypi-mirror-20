httpie-token-auth
================

token auth plugin for HTTPie.


Installation
------------

.. code-block:: bash

    $ pip install httpie-token-auth

You should now see ``token`` under ``--auth-type`` in ``$ http --help`` output.


Usage
-----

.. code-block:: bash

    $ http --auth-type=token --auth='username:password' example.org
    $ http -A=token --auth='username:password' example.org

License
-------

Copyright (c) 2016 The Guardian. Available under the MIT License.
