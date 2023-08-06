from codev.core.isolator import Isolator


class NoneIsolator(Isolator):
    provider_name = 'none'

    def exists(self):
        return True
