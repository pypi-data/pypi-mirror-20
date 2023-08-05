# -*- coding: utf-8 -*-
#
# Copyright (c) 2016, Thomas Bechtold <tbechtold@suse.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
# implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import tarfile
import zipfile


def _get_archive_filelist(filename):
    names = []
    if tarfile.is_tarfile(filename):
        with tarfile.open(filename) as f:
            names = sorted(f.getnames())
    elif zipfile.is_zipfile(filename):
        with zipfile.ZipFile(filename) as f:
            names = sorted(f.namelist())
    else:
        raise Exception("Can not get filenames from '%s'. "
                        "Not a tar or zip file" % filename)
    if "./" in names:
        names.remove("./")
    return names
