import json
import os
import errno

import cloudinary
import cloudinary.uploader
import cloudinary.api
import requests

from django.core.files.base import ContentFile, File
from django.core.files.uploadedfile import UploadedFile
from django.core.files.storage import Storage, FileSystemStorage
from django.utils.deconstruct import deconstructible
from django.conf import settings
from django.contrib.staticfiles.storage import HashedFilesMixin, ManifestFilesMixin
from django.contrib.staticfiles import finders
from django.utils.six.moves.urllib.parse import urlsplit, urlunsplit, unquote
from django.utils.six import get_method_function, PY3

from . import app_settings
from .helpers import get_resources_by_path

RESOURCE_TYPES = {
    'IMAGE': 'image',
    'RAW': 'raw',
    'VIDEO': 'video'
}


@deconstructible
class MediaCloudinaryStorage(Storage):
    RESOURCE_TYPE = RESOURCE_TYPES['IMAGE']
    TAG = app_settings.MEDIA_TAG

    def __init__(self, tag=None, resource_type=None):
        if tag is not None:
            self.TAG = tag
        if resource_type is not None:
            self.RESOURCE_TYPE = resource_type

    def _open(self, name, mode='rb'):
        url = self._get_url(name)
        response = requests.get(url)
        if response.status_code == 404:
            raise IOError
        response.raise_for_status()
        file = ContentFile(response.content)
        file.name = name
        file.mode = mode
        return file

    def _upload(self, name, content):
        options = {'use_filename': True, 'resource_type': self.RESOURCE_TYPE, 'tags': self.TAG}
        folder = os.path.dirname(name)
        if folder:
            options['folder'] = folder
        return cloudinary.uploader.upload(content, **options)

    def _save(self, name, content):
        name = self._normalise_name(name)
        name = self._prepend_prefix(name)
        content = UploadedFile(content, name)
        response = self._upload(name, content)
        return response['public_id']

    def delete(self, name):
        response = cloudinary.uploader.destroy(name, invalidate=True, resource_type=self.RESOURCE_TYPE)
        return response['result'] == 'ok'

    def _get_url(self, name):
        name = self._prepend_prefix(name)
        cloudinary_resource = cloudinary.CloudinaryResource(name, default_resource_type=self.RESOURCE_TYPE)
        return cloudinary_resource.url

    def url(self, name):
        return self._get_url(name)

    def exists(self, name):
        url = self._get_url(name)
        response = requests.head(url)
        if response.status_code == 404:
            return False
        response.raise_for_status()
        return True

    def size(self, name):
        url = self._get_url(name)
        response = requests.head(url)
        if response.status_code == 200:
            return int(response.headers['content-length'])
        else:
            return None

    def get_available_name(self, name, max_length=None):
        if max_length is None:
            return name
        else:
            return name[:max_length]

    def _normalize_path(self, path):
        if path != '' and not path.endswith('/'):
            path += '/'
        return path

    def _get_prefix(self):
        return settings.MEDIA_URL

    def _prepend_prefix(self, name):
        prefix = self._get_prefix().lstrip('/')
        prefix = self._normalize_path(prefix)
        if not name.startswith(prefix):
            name = prefix + name
        return name

    def listdir(self, path):
        path = self._normalize_path(path)
        resources = get_resources_by_path(self.RESOURCE_TYPE, self.TAG, path)
        directories = set()
        files = []
        for resource in resources:
            resource_tail = resource.replace(path, '', 1)
            if '/' in resource_tail:
                directory = resource_tail.split('/', 1)[0]
                directories.add(directory)
            else:
                files.append(resource_tail)
        return list(directories), files

    def _normalise_name(self, name):
        return name.replace('\\', '/')


class RawMediaCloudinaryStorage(MediaCloudinaryStorage):
    RESOURCE_TYPE = RESOURCE_TYPES['RAW']


class VideoMediaCloudinaryStorage(MediaCloudinaryStorage):
    RESOURCE_TYPE = RESOURCE_TYPES['VIDEO']


storages_per_type = {
    RESOURCE_TYPES['IMAGE']: MediaCloudinaryStorage(),
    RESOURCE_TYPES['RAW']: RawMediaCloudinaryStorage(),
    RESOURCE_TYPES['VIDEO']: VideoMediaCloudinaryStorage(),
}


class StaticCloudinaryStorage(MediaCloudinaryStorage):
    """
    Base storage for staticfiles kept in Cloudinary.
    Uploads only unhashed files, so it is highly unrecommended to use it directly,
    because static files are cached both by Cloudinary CDN and browsers
    and changing files could become problematic.
    """
    RESOURCE_TYPE = RESOURCE_TYPES['RAW']
    TAG = app_settings.STATIC_TAG

    def url(self, name):
        if settings.DEBUG:
            return settings.STATIC_URL + name
        return super(StaticCloudinaryStorage, self).url(name)

    def _upload(self, name, content):
        return cloudinary.uploader.upload(content, public_id=name, resource_type=self.RESOURCE_TYPE,
                                          invalidate=True, tags=self.TAG)

    # we only need 2 method of HashedFilesMixin, so we just copy them as function objects to avoid MRO complexities
    file_hash = HashedFilesMixin.file_hash if PY3 else get_method_function(HashedFilesMixin.file_hash)
    clean_name = HashedFilesMixin.clean_name if PY3 else get_method_function(HashedFilesMixin.clean_name)

    def _exists_with_etag(self, name, content):
        """
        Checks whether a file with a name and a content is already uploaded to Cloudinary.
        Uses ETAG header and MD5 hash for the content comparison.
        """
        url = self._get_url(name)
        response = requests.head(url)
        if response.status_code == 404:
            return False
        etag = response.headers['ETAG'].split('"')[1]
        hash = self.file_hash(name, content)
        return etag.startswith(hash)

    def _save(self, name, content):
        """
        Saves only when a file with a name and a content is not already uploaded to Cloudinary.
        """
        name = self.clean_name(name)  # to change to UNIX style path on windows if necessary
        if not self._exists_with_etag(name, content):
            content.seek(0)
            super(StaticCloudinaryStorage, self)._save(name, content)
        return self._prepend_prefix(name)

    def _get_prefix(self):
        return settings.STATIC_URL


class ManifestCloudinaryStorage(FileSystemStorage):
    """
    Storage for manifest file which will keep map of hashed paths.
    Subclasses FileSystemStorage, so the manifest file is kept locally.
    It is highly recommended to keep the manifest in your version control system,
    then you are guaranteed the manifest will be used in all production environment,
    including Heroku and AWS Elastic Beanstalk.
    """
    def __init__(self, location=None, base_url=None, *args, **kwargs):
        location = app_settings.STATICFILES_MANIFEST_ROOT if location is None else location
        super(ManifestCloudinaryStorage, self).__init__(location, base_url, *args, **kwargs)


class HashCloudinaryMixin(object):
    def __init__(self, *args, **kwargs):
        self.manifest_storage = ManifestCloudinaryStorage()
        super(HashCloudinaryMixin, self).__init__(*args, **kwargs)

    def hashed_name(self, name, content=None):
        parsed_name = urlsplit(unquote(name))
        clean_name = parsed_name.path.strip()
        opened = False
        if content is None:
            absolute_path = finders.find(clean_name)
            try:
                content = open(absolute_path, 'rb')
            except (IOError, OSError) as e:
                if e.errno == errno.ENOENT:
                    raise ValueError("The file '%s' could not be found with %r." % (clean_name, self))
                else:
                    raise
            content = File(content)
            opened = True
        try:
            file_hash = self.file_hash(clean_name, content)
        finally:
            if opened:
                content.close()
        path, filename = os.path.split(clean_name)
        root, ext = os.path.splitext(filename)
        if file_hash is not None:
            file_hash = ".%s" % file_hash
        hashed_name = os.path.join(path, "%s%s%s" % (root, file_hash, ext))
        unparsed_name = list(parsed_name)
        unparsed_name[2] = hashed_name
        # Special casing for a @font-face hack, like url(myfont.eot?#iefix")
        # http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax
        if '?#' in name and not unparsed_name[3]:
            unparsed_name[2] += '?'
        return urlunsplit(unparsed_name)

    def post_process(self, paths, dry_run=False, **options):
        original_delete = self.delete
        self.delete = lambda name: None  # temporarily overwritten to prevent any deletion in post_process
        for response in super(HashCloudinaryMixin, self).post_process(paths, dry_run, **options):
            yield response
        self.delete = original_delete

    def read_manifest(self):
        try:
            with self.manifest_storage.open(self.manifest_name) as manifest:
                return manifest.read().decode('utf-8')
        except IOError:
            return None

    def add_unix_path_keys_to_paths(self, paths):
        for path in paths.copy():
            if '\\' in path:
                clean_path = self.clean_name(path)
                paths[clean_path] = paths[path]

    def save_manifest(self):
        payload = {'paths': self.hashed_files, 'version': self.manifest_version}
        if os.name == 'nt':
            paths = payload['paths']
            self.add_unix_path_keys_to_paths(paths)
        if self.manifest_storage.exists(self.manifest_name):
            self.manifest_storage.delete(self.manifest_name)
        contents = json.dumps(payload).encode('utf-8')
        self.manifest_storage._save(self.manifest_name, ContentFile(contents))


class StaticHashedCloudinaryStorage(HashCloudinaryMixin, ManifestFilesMixin, StaticCloudinaryStorage):
    pass
