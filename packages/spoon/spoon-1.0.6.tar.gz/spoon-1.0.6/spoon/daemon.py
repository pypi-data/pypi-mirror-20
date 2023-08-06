"""Exposes tools for daemonizing."""

from __future__ import print_function

import os
import sys
import signal
import logging
import argparse
import importlib
import logging.handlers

try:
    import raven
    import raven.transport
    from raven.handlers.logging import SentryHandler
except ImportError:
    _has_raven = False
else:
    _has_raven = True


def detach(stdout="/dev/null", stderr=None, stdin="/dev/null",
           pidfile=None, logger=None):
    """This forks the current process into a daemon.

    The stdin, stdout, and stderr arguments are file names that
    will be opened and be used to replace the standard file descriptors
    in sys.stdin, sys.stdout, and sys.stderr.

    These arguments are optional and default to /dev/null.

    Note that stderr is opened unbuffered, so if it shares a file with
    stdout then interleaved output may not appear in the order that you
    expect."""
    if logger is None:
        logger = logging

    # Do first fork.
    try:
        pid = os.fork()
        if pid > 0:
            # Exit first parent.
            sys.exit(0)
    except OSError as err:
        logger.critical("Fork #1 failed: (%d) %s", err.errno, err.strerror)
        sys.exit(1)

    # Decouple from parent environment.
    os.chdir("/")
    os.umask(0)
    os.setsid()

    # Do second fork.
    try:
        pid = os.fork()
        if pid > 0:
            # Exit second parent.
            sys.exit(0)
    except OSError as err:
        logger.critical("Fork #2 failed: (%d) %s", err.errno, err.strerror)
        sys.exit(1)

    # Open file descriptors and print start message.
    if not stderr:
        stderr = stdout
    stdi = open(stdin, "r")
    stdo = open(stdout, "a+")
    stde = open(stderr, "ab+", 0)
    pid = str(os.getpid())
    if pidfile:
        with open(pidfile, "w+") as pidf:
            pidf.write("%s\n" % pid)

    # Redirect standard file descriptors.
    os.dup2(stdi.fileno(), sys.stdin.fileno())
    os.dup2(stdo.fileno(), sys.stdout.fileno())
    os.dup2(stde.fileno(), sys.stderr.fileno())


def run_daemon(server, pidfile, daemonize=True):
    """Run the server as a daemon

    :param server: cutlery (a Spoon or Spork)
    :param pidfile: the file to keep the parent PID
    :param daemonize: if True fork the processes into
      a daemon.
    :return:
    """
    logger = logging.getLogger(server.server_logger)
    if daemonize:
        detach(pidfile=pidfile, logger=logger)
    elif pidfile:
        with open(pidfile, "w+") as pidf:
            pidf.write("%s\n" % os.getpid())
    try:
        server.serve_forever()
    finally:
        try:
            os.remove(pidfile)
        except OSError:
            pass


def send_action(action, pidfile, logger=None):
    """Send a signal to an existing running daemon."""
    if logger is None:
        logger = logging
    if not os.path.exists(pidfile):
        logger.critical("No pid file available: %s", pidfile)
        return
    with open(pidfile) as pidf:
        pid = int(pidf.read())

    if action == "reload":
        os.kill(pid, signal.SIGUSR1)
    elif action == "stop":
        os.kill(pid, signal.SIGTERM)


def _setup_logging(logger, options):
    formatter = logging.Formatter('%(asctime)s %(process)s %(levelname)s '
                                  '%(message)s')
    logger.setLevel(logging.DEBUG)

    if options["log_file"]:
        filename = options["log_file"]
        file_handler = logging.handlers.WatchedFileHandler(filename)
        file_handler.setFormatter(formatter)
        if options["debug"]:
            file_handler.setLevel(logging.DEBUG)
        else:
            file_handler.setLevel(logging.INFO)
        logger.addHandler(file_handler)

    stream_handler = logging.StreamHandler()
    stream_handler.setLevel(logging.CRITICAL)
    stream_handler.setFormatter(formatter)
    logger.addHandler(stream_handler)

    if options["sentry_dsn"] and _has_raven:
        client = raven.Client(options["sentry_dsn"],
                              enable_breadcrumbs=False,
                              transport=raven.transport.HTTPTransport)

        # Add Sentry handle to application logger.
        sentry_handler = SentryHandler(client)
        sentry_handler.setLevel(logging.WARNING)
        logger.addHandler(sentry_handler)

        null_loggers = [
            logging.getLogger("sentry.errors"),
            logging.getLogger("sentry.errors.uncaught")
        ]
        for null_logger in null_loggers:
            null_logger.handlers = [logging.NullHandler()]

    if options["debug"]:
        stream_handler.setLevel(logging.DEBUG)
    elif options["info"]:
        stream_handler.setLevel(logging.INFO)


def _is_process_running(logger, options):
    pid_file = options["pid_file"]
    if not os.path.exists(pid_file):
        logger.debug("No other process running.")
        return False

    with open(pid_file, "r") as pidf:
        pid = pidf.read().strip()

    if not os.path.exists("/proc/%s" % pid):
        logger.info("Stale pid file, removing.")
        os.remove(pid_file)
        return False

    logger.critical("Process still running, cannot start: %s", pid)
    return True


def _main():
    """Parse command line arguments and process
    action related to daemons.
    """
    parser = argparse.ArgumentParser(
        formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument("klass", help="The spoon class.")
    parser.add_argument("command", choices=["start", "stop", "reload",
                                            "restart"],
                        help="The command to be issued.")
    parser.add_argument("-s", "--spork", default=None,
                        help="Set the number of sporked workers")
    parser.add_argument("-p", "--pid-file", default=None,
                        help="Set the PID file for the daemon.")
    parser.add_argument("-P", "--port", default=None, type=int,
                        help="Port to listen on")
    parser.add_argument("-I", "--interface", default=None,
                        help="Interface to listen on")
    parser.add_argument("-n", "--nice", dest="nice", type=int,
                        help="'nice' level", default=10)
    parser.add_argument("-d", "--debug", action="store_true", default=None,
                        dest="debug", help="enable debugging output")
    parser.add_argument("-i", "--info", action="store_true", default=None,
                        dest="info", help="enable informational output")
    parser.add_argument("-L", "--log-file", default=None,
                        help="Set the log file.")
    parser.add_argument("-S", "--sentry-dsn", default=None,
                        help="Set the sentry DSN for logging.")
    parser.add_argument("-D", "--no-daemon", default=False,
                        action="store_true", help="Don't daemonize process")

    cmd_options = parser.parse_args()
    os.nice(cmd_options.nice)

    module, klass = cmd_options.klass.rsplit(".", 1)
    klass = getattr(importlib.import_module(module), klass)
    logger = logging.getLogger(klass.server_logger)

    options = dict(klass.command_line_defaults)
    for key in options.keys():
        # Override with cmd line options.
        value = getattr(cmd_options, key, None)
        if value is not None:
            options[key] = value
    for key, value in cmd_options.__dict__.items():
        if key not in options:
            options[key] = value

    _setup_logging(logger, options)
    if cmd_options.command in ("stop", "restart"):
        send_action("stop", options["pid_file"], logger)
    if cmd_options.command == "reload":
        send_action("reload", options["pid_file"], logger)
    if cmd_options.command in ("start", "restart"):
        if _is_process_running(logger, options):
            return
        logger.info("Starting %s (%s)", cmd_options.klass,
                    options["spork"])
        klass.prefork = int(options["spork"])
        server = klass((options["interface"], options["port"]))
        run_daemon(server, options["pid_file"],
                   not cmd_options.no_daemon)


if __name__ == "__main__":
    _main()
