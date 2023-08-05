from django.core.management import CommandError
from django.utils.six import PY3

from cloudinary_storage.storage import StaticHashedCloudinaryStorage, RESOURCE_TYPES
from cloudinary_storage import app_settings
from . import deleteorphanedmedia


class Command(deleteorphanedmedia.Command):
    help = 'Removes redundant static files'
    storage = StaticHashedCloudinaryStorage()
    TAG = app_settings.STATIC_TAG

    def add_arguments(self, parser):
        super(Command, self).add_arguments(parser)
        parser.add_argument('--keep-unhashed-files', action='store_true', dest='keep_unhashed_files',
                            help='Keeps used unhashed files untouched. '
                                 'Without it all unhashed files will be always deleted.'
                                 'Use only when you run collectstatic with --upload-unhashed-files option.')

    def set_options(self, **options):
        super(Command, self).set_options(**options)
        self.keep_unhashed_files = options['keep_unhashed_files']

    def get_resource_types(self):
        """
        Overwritten as all static files are of raw resource type.
        """
        return {RESOURCE_TYPES['RAW']}

    def get_exclude_paths(self):
        return ()

    def get_needful_files(self):
        """
        Returns currently used static files.
        Assumes that manifest staticfiles.json is up-to-date.
        """
        manifest = self.storage.load_manifest()
        if self.keep_unhashed_files:
            if PY3:
                needful_files = set(manifest.keys() | manifest.values())
            else:
                needful_files = set(manifest.keys() + manifest.values())
            needful_files = {self.storage.clean_name(file) for file in needful_files}
        else:
            needful_files = set(manifest.values())
        return {self.storage._prepend_prefix(file) for file in needful_files}


    def handle(self, *args, **options):
        if self.storage.read_manifest() is None:
            raise CommandError('Command requires staticfiles.json. Run collectstatic command first and try again.')
        super(Command, self).handle(*args, **options)
