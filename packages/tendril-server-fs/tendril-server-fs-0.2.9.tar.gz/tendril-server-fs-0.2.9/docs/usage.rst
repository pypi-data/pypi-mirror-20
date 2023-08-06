=============
Usage Example
=============

Basic Usage Example
-------------------

.. literalinclude:: ../deploy/runserver.py


Self-contained Usage : Deploy using twistd and systemd
------------------------------------------------------

Twisted ``.tac`` file:

.. literalinclude:: ../deploy/fs_server.tac

Systemd ``.service`` file:

.. literalinclude:: ../deploy/tendril_fs_server.service
