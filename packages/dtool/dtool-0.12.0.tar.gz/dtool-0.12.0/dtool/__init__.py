"""Tool for managing JIC archive data.

The central philosophy is that this project should produce outputs that can be
understood without access to these tools. This is important as it is likely
that the outputs of from these tools may outlive these tools.

This API has two main classes :class:`dtool.DataSet` and
:class:`dtool.Collection`. These allow the consumer of the API to annotate
new or existing directories as datasets or collections of datasets.

The dtool annotation takes the form of a ``.dtool`` directory inside the
directory of interest and a ``README.yml`` file with optional content.

The dtool annotation creates three types of metadata:

1. Administrative metadata (.dtool/dtool) managed by the API
2. Descriptive metadata (README.yml) mostly managed by the consumer of the API
   and/or the end user
3. Structural metadata (default path: .dtool/manifest.json) managed by the API
   and the consumer of the API

"""

import os
import json
import uuid
import getpass

import jinja2.meta
import yaml
import click
import magic

from dtool.filehasher import shasum
from dtool.filehasher import FileHasher
from dtool.utils import write_templated_file, JINJA2_ENV

__version__ = "0.12.0"

# admin/administrative metadata - .dtool/dtool
# descriptive metadata - README.yml
# structural metadata - manifest.json


class DtoolTypeError(TypeError):
    pass


class NotDtoolObject(TypeError):
    pass


class _DtoolObject(object):

    def __init__(self, extra_admin_metadata={}):
        self._admin_metadata = {"uuid": str(uuid.uuid4()),
                                "readme_path": "README.yml",
                                "dtool_version": __version__}
        self._admin_metadata.update(extra_admin_metadata)
        self._abs_path = None

    @property
    def _filesystem_parent(self):
        """Return instance of parent if it is a dtool object otherwise None."""
        if self._abs_path is None:
            return None
        parent_path = os.path.join(self._abs_path, "..")
        try:
            dtool_object = _DtoolObject.from_path(parent_path)
        except NotDtoolObject:
            return None
        return dtool_object

    @property
    def descriptive_metadata(self):
        """Return descriptive metadata as a dictionary.

        Read in from README.yml dynamically. Returns empty dictionary
        if file does not exist or is empty.

        Current implementation will return list if README.yml contains
        list as top level data structure.
        """
        content = {}
        parent = self._filesystem_parent
        if parent is not None:
            content.update(parent.descriptive_metadata)  # (Magic) recursion.

        if self.abs_readme_path is not None:
            with open(self.abs_readme_path) as fh:
                local_content = yaml.load(fh)
                if local_content:
                    content.update(local_content)
        return content

    def __eq__(self, other):
        return self._admin_metadata == other._admin_metadata

    @classmethod
    def from_path(cls, path):
        dtool_object = cls()
        dtool_object._abs_path = os.path.abspath(path)

        dtool_file_path = os.path.join(path, '.dtool', 'dtool')
        if not os.path.isfile(dtool_file_path):
            raise NotDtoolObject(
                'Not a dtool object; .dtool/dtool does not exist')

        with open(dtool_file_path) as fh:
            dtool_object._admin_metadata = json.load(fh)

        return dtool_object

    @property
    def uuid(self):
        """Return the dataset's UUID."""
        return self._admin_metadata['uuid']

    @property
    def dtool_version(self):
        """Return the version of the dtool API."""
        return self._admin_metadata['dtool_version']

    @property
    def abs_readme_path(self):
        """Return the absolute path of the dataset or None.

        Returns None if not persisted to path.
        """
        if self._abs_path is None:
            return None
        return os.path.join(self._abs_path,
                            self._admin_metadata['readme_path'])

    def _safe_create_readme(self):
        if not os.path.isfile(self.abs_readme_path):
            with open(self.abs_readme_path, 'w') as fh:
                fh.write("")


class DataSet(_DtoolObject):
    """Class for representing datasets."""

    def __init__(self, name, data_directory='.'):
        specific_metadata = {
            "type": "dataset",
            "name": name,
            "manifest_path": os.path.join(".dtool", "manifest.json"),
            "overlays_path": os.path.join(".dtool", "overlays"),
            "creator_username": getpass.getuser(),
            "manifest_root": data_directory}
        super(DataSet, self).__init__(specific_metadata)
        self._structural_metadata = {}

    @classmethod
    def from_path(cls, path):
        """Return instance of :class:`dtool.DataSet` instantiated from path.

        :param path: path to collection directory
        :raises: DtoolTypeError if the path has not been marked up
                 as a dataset in the .dtool/dtool file.
                 NotDtoolObject exception if .dtool/dtool not present.
        :returns: :class:`dtool.DataSet`
        """
        dataset = _DtoolObject.from_path(path)

        if 'type' not in dataset._admin_metadata:
            raise DtoolTypeError(
                'Not a dataset; no type definition in .dtool/dtool')

        if dataset._admin_metadata['type'] != 'dataset':
            raise DtoolTypeError(
                'Not a dataset; wrong type definition in .dtool/dtool')

        # This is Python's crazy way of "allowing" class promotion.
        dataset.__class__ = cls

        return dataset

    @property
    def identifiers(self):
        """Return list of dataset item identifiers."""
        file_list = self.manifest["file_list"]
        return [item["hash"] for item in file_list]

    @property
    def name(self):
        """Return the name of the dataset."""
        return self._admin_metadata['name']

    @property
    def creator_username(self):
        """Return the username of the creator of the dataset."""
        return self._admin_metadata['creator_username']

    @property
    def data_directory(self):
        """Return the directory in which data reside (this is equivalent to
        the manifest root)."""

        return self._admin_metadata['manifest_root']

    @property
    def _abs_manifest_path(self):
        """Return the absolute path of the manifest.json file or None.

        Returns None if not persisted to path.
        """
        if self._abs_path is None:
            return None
        return os.path.join(self._abs_path,
                            self._admin_metadata['manifest_path'])

    @property
    def _abs_overlays_path(self):
        """Return the absolute path of the overlays directory or None.

        Returns None if not persisted to path.
        """
        if self._abs_path is None:
            return None
        return os.path.join(self._abs_path,
                            self._admin_metadata['overlays_path'])

    @property
    def manifest(self):
        """Return the manifest as a dictionary."""

        if self._abs_manifest_path is None:
            return {}
        else:
            with open(self._abs_manifest_path) as fh:
                return json.load(fh)

    def update_manifest(self):
        """Update the manifest by full regeneration.

        Does nothing if dataset is not persisted."""

        if not self._abs_path:
            return

        self._structural_metadata.regenerate_file_list()
        self._structural_metadata.persist_to_path(self._abs_manifest_path)

    def persist_to_path(self, path, hash_function=shasum):
        """Mark up a directory as a dataset.

        Assumes that path exists.

        Creates:
            - .dtool directory
            - .dtool/dtool file (admin metadata)
            - manifest.json (structural metadata)
            - README.yml if it does not exist (descriptive metadata)
            - manifest_root directory if it does not exist (default ".")

        The location of the manifest.json file is determined by the
        ``manifest_path`` value in the admin metadata, and defaults to
        .dtool/manifest.json.

        :param path: path to where the dataset should be persisted
        :raises: OSError if .dtool directory already exists
        """

        path = os.path.abspath(path)

        if not os.path.isdir(path):
            error_message = 'No such directory: {}'.format(path)
            raise OSError(error_message)

        self._abs_path = path
        data_directory = os.path.join(path,
                                      self._admin_metadata['manifest_root'])

        if not os.path.isdir(data_directory):
            os.mkdir(data_directory)

        dtool_dir_path = os.path.join(path, '.dtool')
        os.mkdir(dtool_dir_path)

        os.mkdir(self._abs_overlays_path)

        self._safe_create_readme()

        self._structural_metadata = Manifest(data_directory, hash_function)
        self._structural_metadata.persist_to_path(self._abs_manifest_path)

        dtool_file_path = os.path.join(dtool_dir_path, 'dtool')
        with open(dtool_file_path, 'w') as fh:
            json.dump(self._admin_metadata, fh)

    def item_from_hash(self, hash_str):
        """Return an item of a dataset based on it's hash.

        :param hash_str: dataset item identifier as a hash string
        :returns: dataset item as a dictionary
        """
        for item in self.manifest["file_list"]:
            if item["hash"] == hash_str:
                return item
        raise(KeyError("File hash not in dataset"))

    def item_path_from_hash(self, hash_str):
        """Return absolute path of a dataset item based on it's hash.

        :param hash_str: dataset item identifier as a hash string
        :returns: absolute path to dataset item
        """
        item = self.item_from_hash(hash_str)
        return os.path.abspath(os.path.join(
            self._abs_path,
            self._admin_metadata["manifest_root"],
            item["path"]))

    def empty_overlay(self):
        """Return an empty annotation overlay as a dictionary whose keys are
        the hashes of items in the DataSet and whose values are empty
        dictionaries."""

        file_list = self.manifest["file_list"]

        return {entry['hash']: dict() for entry in file_list}

    def persist_overlay(self, name, overlay, overwrite=False):
        """Write the overlay to disk.

        :param name: name as a string
        :param overlay: overlay as a dictionary
        :param overwrite: bool replace overlay if already present
        :raises: IOError if overlay already exists and overwrite is False
        """
        overlay_fname = name + ".json"
        overlay_path = os.path.join(self._abs_overlays_path, overlay_fname)

        if os.path.isfile(overlay_path) and not overwrite:
            raise(IOError(
                "Overlay exists; set overwrite=True to force replacement"))

        # This shouldn't happen since the overlay directory should be created
        # when the DataSet is persisted, however some programs (e.g. git) won't
        # keep empty directories, so we might lose it.
        if not os.path.isdir(self._abs_overlays_path):
            os.mkdir(self._abs_overlays_path)

        with open(overlay_path, "w") as fh:
            json.dump(overlay, fh, indent=2)

    @property
    def overlays(self):

        overlays = {}

        for filename in os.listdir(self._abs_overlays_path):
            base, ext = os.path.splitext(filename)
            if ext == '.json':
                fq_filename = os.path.join(
                    self._abs_overlays_path, filename)
                with open(fq_filename) as fh:
                    overlays[base] = json.load(fh)

        return overlays


class Collection(_DtoolObject):
    """Class for representing collections of data sets."""

    def __init__(self):
        specific_metadata = {"type": "collection"}
        super(Collection, self).__init__(specific_metadata)

    @classmethod
    def from_path(cls, path):
        """Return instance of :class:`dtool.Collection` instantiated from path.

        :param path: path to collection directory
        :raises: DtoolTypeError if the path has not been marked up
                 as a collection in the .dtool/dtool file.
                 NotDtoolObject exception if .dtool/dtool not present.
        :returns: :class:`dtool.Collection`
        """
        collection = _DtoolObject.from_path(path)

        if 'type' not in collection._admin_metadata:
            raise DtoolTypeError(
                'Not a collection; no type definition in .dtool/dtool')

        if collection._admin_metadata['type'] != 'collection':
            raise DtoolTypeError(
                'Not a collection; wrong type definition in .dtool/dtool')

        # This is Python's crazy way of "allowing" class promotion.
        collection.__class__ = cls

        return collection

    def persist_to_path(self, path):
        """Mark up a directory as a collection.

        Creates:
            - .dtool directory
            - .dtool/dtool file (admin metadata)
            - README.yml if it does not exist (descriptive metadata)

        :param path: path to where the collection should be persisted
        :raises: OSError if .dtool directory already exists
        """
        path = os.path.abspath(path)
        self._abs_path = path
        dtool_dir_path = os.path.join(path, ".dtool")
        dtool_file_path = os.path.join(dtool_dir_path, "dtool")
        os.mkdir(dtool_dir_path)
        self._safe_create_readme()
        with open(dtool_file_path, "w") as fh:
            json.dump(self._admin_metadata, fh)


class Project(Collection):
    """Class representing a specific project.

    Writes a README.yml with the project name."""

    def __init__(self, name):
        super(Project, self).__init__()
        self.name = name

    def _safe_create_readme(self):
        if not os.path.isfile(self.abs_readme_path):
            descriptive_metadata = {'project_name': self.name}
            write_templated_file(
                self.abs_readme_path,
                'dtool_project_README.yml',
                descriptive_metadata)


class DescriptiveMetadata(object):
    """Class for building up descriptive metadata."""

    def __init__(self, schema=None):
        if schema is None:
            self._schema = None
            self._ordered_keys = []
            self._dict = {}
        else:
            self._ordered_keys, _ = map(list, zip(*schema))
            self._dict = dict(schema)

    def __iter__(self):
        for k in self.ordered_keys:
            yield k, self._dict[k]

    def __getitem__(self, key):
        return self._dict[key]

    def keys(self):
        return self.ordered_keys

    @property
    def ordered_keys(self):
        return self._ordered_keys

    def update(self, d):
        new_keys = set(d.keys()) - set(self.keys())
        ordered_new_keys = sorted(list(new_keys))
        self._ordered_keys.extend(ordered_new_keys)
        self._dict.update(d)

    def prompt_for_values(self):
        for key, default in self:
            self._dict[key] = click.prompt(key, default=default)

    def persist_to_path(
            self, path, filename='README.yml', template="base.yml.j2"):
        """Write the metadata to path + filename."""

        output_path = os.path.join(path, filename)

        # Find variables in the template from the abstract syntax tree (ast).
        template_source = JINJA2_ENV.loader.get_source(JINJA2_ENV, template)
        ast = JINJA2_ENV.parse(template_source)
        template_variables = jinja2.meta.find_undeclared_variables(ast)

        # Create yaml for any variables that are not present in the template.
        extra_variables = set(self.keys()) - template_variables
        extra_yml_content = ["{}: {}".format(k, self[k])
                             for k in self.ordered_keys
                             if k in extra_variables]

        # Create the dictionary to pass to the template.
        variables = self._dict.copy()
        variables["extra_yml_content"] = extra_yml_content

        write_templated_file(output_path, template, variables)


class Manifest(dict):
    """Class for managing structural metadata."""

    def __init__(self, abs_manifest_root, hash_func):
        # Use abspath to avoid problems with trailing slashes and length
        self.abs_manifest_root = os.path.abspath(abs_manifest_root)
        self.hash_generator = FileHasher(hash_func)
        self["file_list"] = []
        self["dtool_version"] = __version__
        self["hash_function"] = self.hash_generator.name
        self.regenerate_file_list()

    def _generate_relative_paths(self):
        """Return list of relative paths to all files in manifest root.

        :returns: list of fully qualified paths to all files in manifest root
        """
        path = self.abs_manifest_root
        path_length = len(path) + 1

        relative_path_list = []

        for dirpath, dirnames, filenames in os.walk(path):
            for fn in filenames:
                relative_path = os.path.join(dirpath, fn)
                relative_path_list.append(relative_path[path_length:])

        return relative_path_list

    def _file_metadata(self, path):
        """Return dictionary with file metadata.

        The metadata includes:

        * hash
        * mtime (last modified time)
        * size
        * mimetype

        :param path: path to file
        :returns: dictionary with file metadata
        """
        return dict(hash=self.hash_generator(path),
                    size=os.stat(path).st_size,
                    mtime=os.stat(path).st_mtime,
                    mimetype=magic.from_file(path, mime=True))

    def regenerate_file_list(self):
        """Regenerate the file list from scratch."""
        rel_paths = self._generate_relative_paths()

        file_list = []
        for filename in rel_paths:
            fq_filename = os.path.join(self.abs_manifest_root, filename)
            entry = self._file_metadata(fq_filename)
            entry['path'] = filename
            file_list.append(entry)

        self["file_list"] = file_list

    def persist_to_path(self, path):
        """Write the manifest to disk.

        :param path: path to file to persist manifest to
        """
        with open(path, "w") as fh:
            json.dump(self, fh, indent=2)


def metadata_from_path(path):
    """Return dictionary containing metadata derived from dtool
    objects a level of the directory structure."""

    try:
        dtool_object = _DtoolObject.from_path(path)
        descriptive_metadata = dtool_object.descriptive_metadata
    except NotDtoolObject:
        descriptive_metadata = {}

    return descriptive_metadata
