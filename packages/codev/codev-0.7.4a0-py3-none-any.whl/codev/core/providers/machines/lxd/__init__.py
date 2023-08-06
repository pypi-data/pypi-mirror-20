import re
from time import sleep
from contextlib import contextmanager
from logging import getLogger
from os import path

from codev.core.settings import BaseSettings
from codev.core.machines import MachinesProvider, BaseMachine
from codev.core.performer import BackgroundExecutor, PerformerError

logger = getLogger(__name__)


class LXDMachine(BaseMachine):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__container_directory = None
        self.__share_directory = None
        self.__gateway = None
        self.base_dir = '/root'

    def exists(self):
        output = self.performer.execute('lxc list -cn --format=json ^{container_name}$'.format(container_name=self.ident))
        return bool(output)

    def is_started(self):
        output = self.performer.execute('lxc info {container_name}'.format(
            container_name=self.ident,
        ))
        for line in output.splitlines():
            r = re.match('^Status:\s+(.*)$', line)
            if r:
                state = r.group(1)
                break
        else:
            raise ValueError(output)

        if state == 'Running':
            if self.ip and self.check_execute('runlevel'):
                return True
            else:
                return False
        elif state == 'Stopped':
            return False
        else:
            raise ValueError('Bad state: {}'.format(state))

    def create(self, settings, install_ssh_server=False, ssh_key=None): #, ip=None, gateway=None):
        distribution = settings.distribution
        release = settings.release

        self.performer.execute(
            'lxc launch images:{distribution}/{release} {container_name}'.format(
                container_name=self.ident,
                distribution=distribution,
                release=release
            )
        )

        if install_ssh_server:
            self.install_packages('openssh-server')

            # authorize user for ssh
            if ssh_key:
                self.execute('mkdir -p .ssh')
                self.execute('tee .ssh/authorized_keys', writein=ssh_key)

    def destroy(self):
        # TODO
        self.performer.execute('rm -rf {share_directory}'.format(share_directory=self.share_directory))

        self.performer.execute('lxc delete {container_name}'.format(
            container_name=self.ident,
        ))

    def _configure(self, ip=None, gateway=None):
        self.performer.execute('mkdir -p {share_directory} && chmod 7777 {share_directory}'.format(
            share_directory=self.share_directory
        ))
        if self.performer.check_execute('[ -f /usr/share/lxc/config/nesting.conf ]'):
            nesting = 'lxc.mount.auto = cgroup\nlxc.include = /usr/share/lxc/config/nesting.conf'
        else:
            nesting = 'lxc.mount.auto = cgroup\nlxc.aa_profile = lxc-container-default-with-nesting'

        if ip:
            template_dir = 'static'
            self.performer.send_file(
                '{directory}/templates/{template_dir}/network_interfaces'.format(
                    directory=path.dirname(__file__),
                    template_dir=template_dir
                ),
                '{container_root}/etc/network/interfaces'.format(
                    container_root=self.container_root
                )
            )
            self.performer.execute(
                'rm -f {container_root}/etc/resolv.conf'.format(
                    container_root=self.container_root
                )
            )
            self.performer.execute(
                'echo "nameserver {gateway}" >> {container_root}/etc/resolv.conf'.format(
                    gateway=gateway,
                    container_root=self.container_root
                )
            )

        else:
            template_dir = 'default'

        for line in open('{directory}/templates/{template_dir}/config'.format(
                directory=path.dirname(__file__),
                template_dir=template_dir
            )
        ):
            self.performer.execute('echo "{line}" >> {container_config}'.format(
                    line=line.format(
                        ip=ip,
                        share_directory=self.share_directory,
                        nesting=nesting
                    ),
                    container_config=self.container_config
                )
            )

        # ubuntu trusty workaround
        # self.performer.execute("sed -e '/lxc.include\s=\s\/usr\/share\/lxc\/config\/ubuntu.userns\.conf/ s/^#*/#/' -i {container_config}".format(container_config=self.container_config))

    @property
    def share_directory(self):
        if not self.__share_directory:
            # abs_base_dir = self.performer.execute('pwd')
            abs_base_dir = '$HOME/.local/codev'
            return '{abs_base_dir}/{container_name}/share'.format(
                abs_base_dir=abs_base_dir,
                container_name=self.ident
            )
        return self.__share_directory

    @property
    def _container_directory(self):
        if not self.__container_directory:
            lxc_path = self.performer.execute('lxc-config lxc.lxcpath')
            self.__container_directory = '{lxc_path}/{container_name}'.format(
                lxc_path=lxc_path,
                container_name=self.ident
            )
        return self.__container_directory

    @property
    def container_root(self):
        return '{container_directory}/rootfs'.format(container_directory=self._container_directory)

    @property
    def container_config(self):
        return '{container_directory}/config'.format(container_directory=self._container_directory)

    def start(self):
        self.performer.execute('lxc start {container_name}'.format(
            container_name=self.ident,
        ))
        #TODO timeout
        while not self.is_started():
            sleep(0.5)

        return True

    def stop(self):
        self.performer.execute('lxc stop {container_name}'.format(
            container_name=self.ident,
        ))

    @property
    def ip(self):
        output = self.performer.execute('lxc-info -n {container_name} -i'.format(
            container_name=self.ident,
        ))

        for line in output.splitlines():
            r = re.match('^IP:\s+([0-9\.]+)$', line)
            if r:
                return r.group(1)

        return None

    @property
    def _gateway(self):
        if not self.__gateway:
            # attempts to get gateway ip
            for i in range(3):
                self.__gateway = self.performer.execute(
                    'lxc exec {container_name} -- ip route | grep default | cut -d " " -f 3'.format(
                        container_name=self.ident
                    )
                )
                if self.__gateway:
                    break
                else:
                    sleep(3)
        return self.__gateway

    @contextmanager
    def get_fo(self, remote_path):
        tempfile = '/tmp/codev.{ident}.tempfile'.format(ident=self.ident)

        remote_path = self._sanitize_path(remote_path)

        self.performer.execute('lxc-usernsexec -- cp {container_root}{remote_path} {tempfile}'.format(
            tempfile=tempfile,
            remote_path=remote_path,
            container_root=self.container_root
        ))
        try:
            with self.performer.get_fo(tempfile) as fo:
                yield fo
        finally:
            self.performer.execute('lxc-usernsexec -- rm {tempfile}'.format(tempfile=tempfile))

    def send_file(self, source, target):
        tempfile = '/tmp/codev.{ident}.tempfile'.format(ident=self.ident)
        self.performer.send_file(source, tempfile)
        target = self._sanitize_path(target)

        self.performer.execute('lxc-usernsexec -- cp {tempfile} {container_root}{target}'.format(
            tempfile=tempfile,
            target=target,
            container_root=self.container_root
        ))
        self.performer.execute('rm {tempfile}'.format(tempfile=tempfile))

    def execute(self, command, env=None, logger=None, writein=None, max_lines=None):
        if env is None:
            env = {}
        env.update({
            'HOME': '/root',
            'LANG': 'C.UTF-8',
            'LC_ALL':  'C.UTF-8'
        })

        with self.performer.change_directory(self.working_dir):
            return self.performer.execute_wrapper(
                'lxc exec {env} {container_name} -- {{command}}'.format(
                    container_name=self.ident,
                    env=' '.join('--env {var}={value}'.format(var=var, value=value) for var, value in env.items())
                ),
                command,
                logger=logger,
                writein=writein,
                max_lines=max_lines
            )

    def share(self, source, target, bidirectional=False):
        share_target = '{share_directory}/{target}'.format(
            share_directory=self.share_directory,
            target=target
        )

        # copy all files to share directory
        # sequence /. just after source paramater makes cp command idempotent
        self.performer.execute(
            'cp -Ru {source}/. {share_target}'.format(
                source=source,
                share_target=share_target
            )
        )

        if bidirectional:
            self.performer.execute(
                'chmod -R go+w {share_target}'.format(
                    share_target=share_target
                )
            )

        source_target_background_runner = BackgroundExecutor(
            performer=self.performer, ident='share_{ident}'.format(
                ident=self.ident
            )
        )
        dir_path = path.dirname(__file__)

        # prevent sync loop - if there is no change in file don't sync
        # This option may eat a lot of memory on huge file trees. see 'man clsync'
        modification_signature = ' --modification-signature "*"' if bidirectional else ''

        # TODO keep in mind relative and abs paths
        try:
            source_target_background_runner.execute(
                'TO={share_target}'
                ' clsync'
                ' --label live'
                ' --mode rsyncshell'
                ' --delay-sync 2'
                ' --delay-collect 3'
                ' --watch-dir {source}'
                '{modification_signature}'
                ' --sync-handler {dir_path}/scripts/clsync-synchandler-rsyncshell.sh'.format(
                    modification_signature=modification_signature,
                    share_target=share_target,
                    source=source,
                    dir_path=dir_path
                ),
                wait=False
            )
        except PerformerError:
            pass

        if bidirectional:
            target_source_background_runner = BackgroundExecutor(
                performer=self.performer, ident='share_back_{ident}'.format(
                    ident=self.ident
                )
            )
            try:
                target_source_background_runner.execute(
                    'TO={source}'
                    ' clsync'
                    ' --label live'
                    ' --mode rsyncshell'
                    ' --delay-sync 2'
                    ' --delay-collect 3'
                    ' --watch-dir {share_target}'
                    ' --modification-signature "*"'
                    ' --sync-handler {dir_path}/scripts/clsync-synchandler-rsyncshell.sh'.format(
                        share_target=share_target,
                        source=source,
                        dir_path=dir_path
                    ),
                    wait=False
                )
            except PerformerError:
                pass

        if not self.check_execute('[ -L {target} ]'.format(target=target)):
            self.execute(
                'ln -s /share/{target} {target}'.format(
                    target=target,
                )
            )


class LXDMachinesSettings(BaseSettings):
    @property
    def distribution(self):
        return self.data.get('distribution')

    @property
    def release(self):
        return self.data.get('release')

    @property
    def number(self):
        return int(self.data.get('number', 1))


class LXCMachinesProvider(MachinesProvider):
    provider_name = 'lxd'
    settings_class = LXDMachinesSettings
    machine_class = LXDMachine
