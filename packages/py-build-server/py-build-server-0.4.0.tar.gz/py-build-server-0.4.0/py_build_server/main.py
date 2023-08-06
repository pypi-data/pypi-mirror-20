import json
import sys
import click

from multiprocessing import Process

from py_build_server.lib import ExtendedRepo
from py_build_server.config import Config
from py_build_server.lib.api import Api
from py_build_server.lib.http_server_skeleton import HTTPServerSkeleton
from py_build_server.lib.logger import Logger
from py_build_server.lib.python_daemon import Daemon
from py_build_server.lib import updater

HELP_DECLS=('help', '--help', '-h', 'h')


class PyBuildServer(Daemon):
    def __init__(self, *args, **kwargs):
        super(PyBuildServer, self).__init__(*args, **kwargs)
        self.config = Config()
        self.logger = Logger('py-build-server')
        self.updater = updater.get_updater(self.config)
        self.api = Api()

    def run(self, *args, **kwargs):
        repository_processes = {}
        self.logger.info('Initializing processes...')
        for repo in ExtendedRepo.build_repos_from_config(self.config):
            self.logger.debug('creating process for {}...'.format(repo.name))
            self.updater.register_new_repo(repo)
            self.api.register_new_repo(repo)
            p = Process(target=self.wait_for_event, args=(repo, ))
            self.logger.debug('starting process for {}...'.format(repo.name))
            p.start()

            repository_processes[repo.name] = p
            self.logger.debug('started process for {}'.format(repo.name))

        self.api.load_config(self.config)
        self.updater.load_config(self.config)
        #self.api.start()
        #self.updater.start()
        HTTPServerSkeleton.start()
        try:
            for p in repository_processes.values():
                self.logger.debug('waiting for threads to return (shouldnt happen')
                p.join()
            HTTPServerSkeleton.stop()
        except KeyboardInterrupt:
            self.logger.info('exiting')
            HTTPServerSkeleton.stop()
            sys.exit(0)

    def wait_for_event(self, repo):
        while True:
            try:
                payload = json.loads(repo.queue.get())
                action = payload.get('event')

            except KeyboardInterrupt:
                self.logger.debug('exited while waiting for event from queue')
                return
            self.logger.debug('recieved {} from queue'.format(action))
            if action == 'stop':
                break
            if action == 'new_tag':
                try:
                    repo.upload(payload.get('latest'))
                except KeyboardInterrupt:
                    self.logger.debug('exited while running repo.update() task')
                    return


@click.command()
@click.argument('command')
def main(command):
    if command in HELP_DECLS:
        print("""
        Python daemon to monitor git repositories, either by polling or listening for
        webhooks from Github.

        Usage:    py-build-server [COMMAND]

        Commands:
            start       : start the daemon process and fork to background
            stop        : stop the currently running daemon process
            restart     : restarts the daemon
            foreground  : runs process in the foreground
        """)
        return

    server = PyBuildServer('/var/run/py-build-server.pid',
                           verbose=0)
    if command == 'start':
        server.start()

    elif command == 'stop':
        server.stop()

    elif command == 'restart':
        server.restart()

    elif command == 'foreground':
        server.run()

if __name__ == '__main__':
    main()
