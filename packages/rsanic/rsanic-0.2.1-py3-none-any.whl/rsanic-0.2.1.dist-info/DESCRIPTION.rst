rsanic
==========

Micro framework built on top of sanic.py written in Python 3.

Installing rsanic
=====================

.. code-block:: bash

    pip3 install rsanic

Example app:
* Local Redis service must be installed and running at port 6397
* Shows how to use html or json responses

.. code-block:: bash

    git clone https://github.com/reformo/rsanic.git
    cd rsanic/example
    python3 server.py

Then use any web browser to open address: http://127.0.0.1:8000/

Credits
=======

* `Mehmet Korkmaz <http://github.com/mkorkmaz>`_

Change Log
==========

New in version 0.2.1
--------------------
* Requirements updated

New in version 0.2.0
--------------------
* Dependency Injection Container introduced to be used in Rsanic and Applications
* Request injected in to App
* Working example added

New in version 0.1.0
--------------------
* Introduced "rsanic" #WIP


