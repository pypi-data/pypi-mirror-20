from contextlib import contextmanager
import shutil
from time import time
from uuid import uuid1

from codev.core.source import Source


class ActualSource(Source):
    provider_name = 'actual'

    def install(self, performer):
        filename = uuid1()
        archive = shutil.make_archive('/tmp/{filename}'.format(filename=filename), 'gztar')

        remote_archive = '/tmp/{filename}.tar.gz'.format(filename=filename)

        performer.execute('mkdir -p {directory}'.format(directory=self.directory))
        performer.send_file(archive, remote_archive)

        # install gunzip
        # TODO requirements
        # performer.install_packages('gzip')

        performer.execute(
            'tar -xzf {archive} --directory {directory}'.format(
                archive=remote_archive, directory=self.directory
            )
        )

    @contextmanager
    def open_codev_file(self, performer):
        with open('.codev') as codev_file:
            yield codev_file

    def process_options(self, options):
        return options or str(time())
