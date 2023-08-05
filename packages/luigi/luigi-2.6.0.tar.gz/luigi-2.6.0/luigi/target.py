# -*- coding: utf-8 -*-
#
# Copyright 2012-2015 Spotify AB
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
"""
The abstract :py:class:`Target` class.
It is a central concept of Luigi and represents the state of the workflow.
"""

import abc
import io
import os
import random
import tempfile
import logging
import warnings
from luigi import six

logger = logging.getLogger('luigi-interface')


@six.add_metaclass(abc.ABCMeta)
class Target(object):
    """
    A Target is a resource generated by a :py:class:`~luigi.task.Task`.

    For example, a Target might correspond to a file in HDFS or data in a database. The Target
    interface defines one method that must be overridden: :py:meth:`exists`, which signifies if the
    Target has been created or not.

    Typically, a :py:class:`~luigi.task.Task` will define one or more Targets as output, and the Task
    is considered complete if and only if each of its output Targets exist.
    """

    @abc.abstractmethod
    def exists(self):
        """
        Returns ``True`` if the :py:class:`Target` exists and ``False`` otherwise.
        """
        pass


class FileSystemException(Exception):
    """
    Base class for generic file system exceptions.
    """
    pass


class FileAlreadyExists(FileSystemException):
    """
    Raised when a file system operation can't be performed because
    a directory exists but is required to not exist.
    """
    pass


class MissingParentDirectory(FileSystemException):
    """
    Raised when a parent directory doesn't exist.
    (Imagine mkdir without -p)
    """
    pass


class NotADirectory(FileSystemException):
    """
    Raised when a file system operation can't be performed because
    an expected directory is actually a file.
    """
    pass


@six.add_metaclass(abc.ABCMeta)
class FileSystem(object):
    """
    FileSystem abstraction used in conjunction with :py:class:`FileSystemTarget`.

    Typically, a FileSystem is associated with instances of a :py:class:`FileSystemTarget`. The
    instances of the py:class:`FileSystemTarget` will delegate methods such as
    :py:meth:`FileSystemTarget.exists` and :py:meth:`FileSystemTarget.remove` to the FileSystem.

    Methods of FileSystem raise :py:class:`FileSystemException` if there is a problem completing the
    operation.
    """

    @abc.abstractmethod
    def exists(self, path):
        """
        Return ``True`` if file or directory at ``path`` exist, ``False`` otherwise

        :param str path: a path within the FileSystem to check for existence.
        """
        pass

    @abc.abstractmethod
    def remove(self, path, recursive=True, skip_trash=True):
        """ Remove file or directory at location ``path``

        :param str path: a path within the FileSystem to remove.
        :param bool recursive: if the path is a directory, recursively remove the directory and all
                               of its descendants. Defaults to ``True``.
        """
        pass

    def mkdir(self, path, parents=True, raise_if_exists=False):
        """
        Create directory at location ``path``

        Creates the directory at ``path`` and implicitly create parent
        directories if they do not already exist.

        :param str path: a path within the FileSystem to create as a directory.
        :param bool parents: Create parent directories when necessary. When
                             parents=False and the parent directory doesn't
                             exist, raise luigi.target.MissingParentDirectory
        :param bool raise_if_exists: raise luigi.target.FileAlreadyExists if
                                     the folder already exists.
        """
        raise NotImplementedError("mkdir() not implemented on {0}".format(self.__class__.__name__))

    def isdir(self, path):
        """
        Return ``True`` if the location at ``path`` is a directory. If not, return ``False``.

        :param str path: a path within the FileSystem to check as a directory.

        *Note*: This method is optional, not all FileSystem subclasses implements it.
        """
        raise NotImplementedError("isdir() not implemented on {0}".format(self.__class__.__name__))

    def listdir(self, path):
        """Return a list of files rooted in path.

        This returns an iterable of the files rooted at ``path``. This is intended to be a
        recursive listing.

        :param str path: a path within the FileSystem to list.

        *Note*: This method is optional, not all FileSystem subclasses implements it.
        """
        raise NotImplementedError("listdir() not implemented on {0}".format(self.__class__.__name__))

    def move(self, path, dest):
        """
        Move a file, as one would expect.
        """
        raise NotImplementedError("move() not implemented on {0}".format(self.__class__.__name__))

    def rename_dont_move(self, path, dest):
        """
        Potentially rename ``path`` to ``dest``, but don't move it into the
        ``dest`` folder (if it is a folder).  This relates to :ref:`AtomicWrites`.

        This method has a reasonable but not bullet proof default
        implementation.  It will just do ``move()`` if the file doesn't
        ``exists()`` already.
        """
        warnings.warn("File system {} client doesn't support atomic mv.".format(self.__class__.__name__))
        if self.exists(dest):
            raise FileAlreadyExists()
        self.move(path, dest)

    def rename(self, *args, **kwargs):
        """
        Alias for ``move()``
        """
        self.move(*args, **kwargs)

    def copy(self, path, dest):
        """
        Copy a file or a directory with contents.
        Currently, LocalFileSystem and MockFileSystem support only single file
        copying but S3Client copies either a file or a directory as required.
        """
        raise NotImplementedError("copy() not implemented on {0}".
                                  format(self.__class__.__name__))


class FileSystemTarget(Target):
    """
    Base class for FileSystem Targets like :class:`~luigi.file.LocalTarget` and :class:`~luigi.contrib.hdfs.HdfsTarget`.

    A FileSystemTarget has an associated :py:class:`FileSystem` to which certain operations can be
    delegated. By default, :py:meth:`exists` and :py:meth:`remove` are delegated to the
    :py:class:`FileSystem`, which is determined by the :py:attr:`fs` property.

    Methods of FileSystemTarget raise :py:class:`FileSystemException` if there is a problem
    completing the operation.
    """

    def __init__(self, path):
        """
        Initializes a FileSystemTarget instance.

        :param str path: the path associated with this FileSystemTarget.
        """
        self.path = path

    @abc.abstractproperty
    def fs(self):
        """
        The :py:class:`FileSystem` associated with this FileSystemTarget.
        """
        raise NotImplementedError()

    @abc.abstractmethod
    def open(self, mode):
        """
        Open the FileSystem target.

        This method returns a file-like object which can either be read from or written to depending
        on the specified mode.

        :param str mode: the mode `r` opens the FileSystemTarget in read-only mode, whereas `w` will
                         open the FileSystemTarget in write mode. Subclasses can implement
                         additional options.
        """
        pass

    def exists(self):
        """
        Returns ``True`` if the path for this FileSystemTarget exists; ``False`` otherwise.

        This method is implemented by using :py:attr:`fs`.
        """
        path = self.path
        if '*' in path or '?' in path or '[' in path or '{' in path:
            logger.warning("Using wildcards in path %s might lead to processing of an incomplete dataset; "
                           "override exists() to suppress the warning.", path)
        return self.fs.exists(path)

    def remove(self):
        """
        Remove the resource at the path specified by this FileSystemTarget.

        This method is implemented by using :py:attr:`fs`.
        """
        self.fs.remove(self.path)

    def temporary_path(self):
        """
        A context manager that enables a reasonably short, general and
        magic-less way to solve the :ref:`AtomicWrites`.

         * On *entering*, it will create the parent directories so the
           temporary_path is writeable right away.
           This step uses :py:meth:`FileSystem.mkdir`.
         * On *exiting*, it will move the temporary file if there was no exception thrown.
           This step uses :py:meth:`FileSystem.rename_dont_move`

        The file system operations will be carried out by calling them on :py:attr:`fs`.

        The typical use case looks like this:

        .. code:: python

            class MyTask(luigi.Task):
                def output(self):
                    return MyFileSystemTarget(...)

                def run(self):
                    with self.output().temporary_path() as self.temp_output_path:
                        run_some_external_command(output_path=self.temp_output_path)
        """
        class _Manager(object):
            target = self

            def __init__(self):
                num = random.randrange(0, 1e10)
                slashless_path = self.target.path.rstrip('/').rstrip("\\")
                self._temp_path = '{}-luigi-tmp-{:010}{}'.format(
                    slashless_path,
                    num,
                    self.target._trailing_slash())
                # TODO: os.path doesn't make sense here as it's os-dependent
                tmp_dir = os.path.dirname(slashless_path)
                self.target.fs.mkdir(tmp_dir, parents=True, raise_if_exists=False)

            def __enter__(self):
                return self._temp_path

            def __exit__(self, exc_type, exc_value, traceback):
                if exc_type is None:
                    # There were no exceptions
                    self.target.fs.rename_dont_move(self._temp_path, self.target.path)
                return False  # False means we don't suppress the exception

        return _Manager()

    def _touchz(self):
        with self.open('w'):
            pass

    def _trailing_slash(self):
        # I suppose one day schema-like paths, like
        # file:///path/blah.txt?params=etc can be parsed too
        return self.path[-1] if self.path[-1] in r'\/' else ''


class AtomicLocalFile(io.BufferedWriter):
    """Abstract class to create a Target that creates
    a temporary file in the local filesystem before
    moving it to its final destination.

    This class is just for the writing part of the Target. See
    :class:`luigi.file.LocalTarget` for example
    """

    def __init__(self, path):
        self.__tmp_path = self.generate_tmp_path(path)
        self.path = path
        super(AtomicLocalFile, self).__init__(io.FileIO(self.__tmp_path, 'w'))

    def close(self):
        super(AtomicLocalFile, self).close()
        self.move_to_final_destination()

    def generate_tmp_path(self, path):
        return os.path.join(tempfile.gettempdir(), 'luigi-s3-tmp-%09d' % random.randrange(0, 1e10))

    def move_to_final_destination(self):
        raise NotImplementedError()

    def __del__(self):
        if os.path.exists(self.tmp_path):
            os.remove(self.tmp_path)

    @property
    def tmp_path(self):
        return self.__tmp_path

    def __exit__(self, exc_type, exc, traceback):
        " Close/commit the file if there are no exception "
        if exc_type:
            return
        return super(AtomicLocalFile, self).__exit__(exc_type, exc, traceback)
