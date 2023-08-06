# Copyright 2017 Taylor DeHaan
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""This module contains the DirectoryTree and DirectoryNode class.

The DirectoryTree class is a tree consisting of DirectoryNode objects. Other
objects interact with it via the get_root() method which returns the
DirectoryNode object at the root of the tree.

The DirectoryNode class is a node in the DirectoryTree. The node has a list of
child directories (DirectorNodes) and a list of files. Other objects interact
with a node via the add_child and add_file methods. DirectoryNode also exposes
two generator methods for iterating through the node's child directories and
files.
"""


class DirectoryNode(object):
    """Recursive data structure containing filenames and directories.

    Exposes methods for adding child nodes, files, and symlinks in addition to
    generator methods for iterating over child nodes and filenames.

    Args:
        name (str): The name of this directory.

    Attributes:
        _name (str): The name of this directory.
        _child_dirs (list): List of DirectoryNodes under this directory.
        _files (list): List of string filenames under this directory.
        _symlinks (list): List of symlink->real path pairs under this directory.
    """

    def __init__(self, name):
        self._name = name
        self._child_dirs = []
        self._files = []
        self._symlinks = []

    def add_child(self, name):
        """Add child node under this directory.

        Args:
            name (str): Construct and add a DirectoryNode object to the
                _child_dirs with this name.
        """
        self._child_dirs.append(DirectoryNode(name))

    def add_file(self, filename):
        """Add file to the list files under this directory.

        Args:
            filename (str): Name of the file to be added to _files.
        """
        self._files.append(filename)

    def add_files(self, file_list):
        """Adds a list of files to the directory's file list.

        Args:
            file_list (list): List of files to add to _files.
        """
        self._files += file_list

    def add_symlinks(self, symlink_list):
        """Adds a list of symlinks to the directory's symlink list.

        Args:
            symlink_list (list): List of symlinks to add to _symlinks.
        """
        self._symlinks += symlink_list

    def children(self):
        """Iterates through the child nodes.

        Yields:
            DirectoryNode: The next node in the list of child directories.
        """
        for node in self._child_dirs:
            yield node

    def files(self):
        """Iterates through the filenames.

        Yields:
            str: The next filename in the list of files.
        """
        for filename in self._files:
            yield filename

    def get_name(self):
        """Get the node's name.

        Returns:
            The name of the node.
        """
        return self._name

    def get_children(self):
        """Get the list of child directory under this directory.

        Returns:
            List of child directory under this directory.
        """
        return self._child_dirs

    def get_files(self):
        """Get the list of files under this directory.

        Returns:
            List of files under this directory.
        """
        return self._files

    def get_symlinks(self):
        """Get the list of symbolic links under this directory.

        Returns:
            List of symlinks under this directory.
        """
        return self._symlinks

    def get_last_child(self):
        """Get the last child added to the list of children.

        Returns:
            Last child node added to list if list is not empty else None.
        """
        try:
            return self._child_dirs[-1]
        except IndexError:
            return None


class DirectoryTree(object):
    """Collection of DirectoryNodes modeled after a simple tree.

    This class exposes a get_root() method which returns a DirectoryNode object
    which is the directory root in the tree.

    Args:
        root_name (str): The name of the root directory.

    Attributes:
        _root (DirectorNode): The root of the tree.
    """

    def __init__(self, root_name):
        self._root = DirectoryNode(root_name)

    def get_root(self):
        """Get the root of the tree.

        Returns:
            DirectoryNode: The root node of the tree.
        """
        return self._root
