#!/usr/bin/env python
import sys
sys.path.append('/usr/local/lib/python2.7/dist-packages/tinker_access_client')

# Reference: https://wiki.debian.org/LSBInitScripts

### BEGIN INIT INFO
# Provides:          tinker-access-client
# Required-Start:    $all
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: tinker-access-client
# Description:       The tinker-access-client service is responsible for coordinating communication
# between RPi's modules (i.e. RFID reader, LCD, power relays etc..) and the remote tinker_access_server.
### END INIT INFO

import sys
import logging
from ClientLogger import ClientLogger
from ClientDaemon import ClientDaemon
from CommandHandler import CommandHandler
from ClientOptionParser import ClientOptionParser, Command


def run():
    logger = ClientLogger.setup()
    (opts, args) = ClientOptionParser().parse_args()

    try:
        with CommandHandler(opts, args) as handler:
            handler.on(Command.STOP, ClientDaemon.stop)
            handler.on(Command.START, ClientDaemon.start)
            handler.on(Command.STATUS, ClientDaemon.status)
            handler.on(Command.RESTART, ClientDaemon.restart)
            return handler.handle_command()

    except Exception as e:
        logger.exception(e)
        sys.stdout.write(str(e))
        sys.stdout.flush()
        sys.exit(1)

    finally:
        logging.shutdown()

if __name__ == '__main__':
    run()
