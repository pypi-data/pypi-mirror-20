from __future__ import absolute_import, print_function, division, unicode_literals

import os
import json

from functools import partial
from pathlib import Path

from .file_handling import file_types, calcFileHash, check_update

from ..models import Media
from ..api.appuser import get_current_user

from . import get_uuid_unicode, NotAuthorizedException

# how to handle paths?
guid_mode = {
    "filename": lambda pref, path: pref + str(Path(path).name),
    "fullpath": lambda pref, path: pref + str(Path(path)),
    "uuid": lambda path: get_uuid_unicode(),
    "hash": lambda path: calcFileHash(path),
}


def recursive_walk(directory):
    for root, dirs, files in os.walk(directory):
        for f in files:
            if f.rsplit(".", 1)[-1].lower() in file_types:
                yield os.path.join(root, f)


def simple_walk(directory):
    for f in os.listdir(directory):
        if f.rsplit(".", 1)[-1].lower() in file_types:
            yield os.path.join(directory, f)


def scan_dir(directory, guid_type="uuid", guid_params=None, recursive=True):
    if guid_type == "filename" or guid_type == "fullpath":
        ref_func = partial(guid_mode[guid_type], guid_params[0])
    else:
        ref_func = guid_mode[guid_type]

    directory = os.path.abspath(directory)
    dir_objects = {m.path: m for m in Media.query.filter(
        Media.path.like(directory + "%")).all()}

    current_user = get_current_user()
    if current_user is None:
        raise NotAuthorizedException()
    config = json.loads(current_user.config)

    if os.path.exists(directory):

        dir_iter = simple_walk
        if recursive:
            dir_iter = recursive_walk

        for p in dir_iter(directory):
            m = None
            if p in dir_objects:
                m = check_update(dir_objects[p], p, current_user, guid_type)
            else:
                m = Media(path=p, file_reference=ref_func(p),
                          appuser=current_user)
                props = {}
                props["dc:rights"] = config.get("license", "CC0")
                m.props = json.dumps(props)

            yield m
    else:
        raise FileNotFoundError("No Such Directory {}".format(directory))


if __name__ == '__main__':
    for m in scan_dir("/home/godfoder/Downloads"):
        print(m)
