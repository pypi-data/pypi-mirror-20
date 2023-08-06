

"""

TAC Deployment Example
----------------------

A more usable example. Exposes the filesystems specified
by the implementation of :data:`fs_server.config.FILESYSTEMS`,
and the reactor listens at :data:`fs_server.config.SERVER_PORT`.

The important part of this, the part that makes it a .tac file, is
the final root-level section, which sets up the object called
'application' which twistd will look for.

You can run this .tac file directly with ::

    twistd -ny fs_server.tac

"""

# import sys
# from twisted.python import log
# log.startLogging(sys.stdout)

from twisted.application import service
from twisted.python.log import ILogObserver, FileLogObserver
from twisted.python.logfile import LogFile


# this is the core part of any tac file, the creation of the root-level
# application object
application = service.Application("Tendril FS Server")
logfile = LogFile("fs_server.log", "/var/log/tendril")
application.setComponent(ILogObserver, FileLogObserver(logfile).emit)


# attach the service to its parent application
from fs_server.serve import get_service
service = get_service()
service.setServiceParent(application)

from fs_server.serve_ftp import get_ftp_service
ftp_service = get_ftp_service()
ftp_service.setServiceParent(application)
