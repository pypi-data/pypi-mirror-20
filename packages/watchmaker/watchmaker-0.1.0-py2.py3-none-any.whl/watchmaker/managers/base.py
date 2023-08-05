# -*- coding: utf-8 -*-
"""Watchmaker base manager."""
from __future__ import (absolute_import, division, print_function,
                        unicode_literals, with_statement)

import abc
import logging
import os
import shutil
import subprocess
import tarfile
import tempfile
import zipfile

from six import add_metaclass
from six.moves import urllib

from watchmaker.exceptions import WatchmakerException


class ManagerBase(object):
    """
    Base class for operating system managers.

    All child classes will have access to methods unless overridden by
    similarly-named method in the child class.

    Args:
        system_params (:obj:`dict`):
            Attributes, mostly file-paths, specific to the system-type (Linux
            or Windows).
    """

    boto3 = None
    boto_client = None

    def __init__(self, system_params, *args, **kwargs):  # noqa: D102
        self.log = logging.getLogger(
            '{0}.{1}'.format(__name__, self.__class__.__name__)
        )
        self.system_params = system_params
        self.working_dir = None
        args = args
        kwargs = kwargs

    def _import_boto3(self):
        if self.boto3:
            return

        self.log.info("Dynamically importing boto3 ...")
        try:
            self.boto3 = __import__("boto3")
            self.boto_client = __import__(
                "botocore.client",
                globals(),
                locals(),
                ["ClientError"],
                -1
            )
        except ImportError:
            msg = 'Unable to import boto3 module.'
            self.log.critical(msg)
            raise

    def _get_s3_file(self, url, bucket_name, key_name, destination):
        self._import_boto3()

        try:
            s3_ = self.boto3.resource("s3")
            s3_.meta.client.head_bucket(Bucket=bucket_name)
            s3_.Object(bucket_name, key_name).download_file(destination)
        except self.boto_client.ClientError:
            msg = 'Bucket does not exist.  bucket = {0}.'.format(bucket_name)
            self.log.critical(msg)
            raise
        except Exception:
            msg = (
                'Unable to download file from S3 bucket. url = {0}. '
                'bucket = {1}. key = {2}. file = {3}.'
                .format(url, bucket_name, key_name, destination)
            )
            self.log.critical(msg)
            raise

    def download_file(self, url, filename, sourceiss3bucket=False):
        """
        Download a file from a web server or S3 bucket.

        Args:
            url (:obj:`str`):
                URL to a file.
            filename (:obj:`str`):
                Path where the file will be saved.
            sourceiss3bucket (bool):
                (Defaults to ``False``) Switch to indicate that the download
                should use boto3 to download the file from an S3 bucket.
        """
        self.log.debug('Downloading: %s', url)
        self.log.debug('Destination: %s', filename)
        self.log.debug('S3: %s', sourceiss3bucket)

        if sourceiss3bucket:
            self._import_boto3()

            bucket_name = url.split('/')[3]
            key_name = '/'.join(url.split('/')[4:])

            self.log.debug('Bucket Name: %s', bucket_name)
            self.log.debug('key_name: %s', key_name)

            try:
                s3_ = self.boto3.resource('s3')
                s3_.meta.client.head_bucket(Bucket=bucket_name)
                s3_.Object(bucket_name, key_name).download_file(filename)
            except (NameError, self.boto_client.ClientError):
                self.log.error('NameError: %s', self.boto_client.ClientError)
                try:
                    bucket_name = url.split('/')[2].split('.')[0]
                    key_name = '/'.join(url.split('/')[3:])
                    s3_ = self.boto3.resource("s3")
                    s3_.meta.client.head_bucket(Bucket=bucket_name)
                    s3_.Object(bucket_name, key_name).download_file(filename)
                except Exception:
                    msg = (
                        'Unable to download file from S3 bucket. url = {0}. '
                        'bucket = {1}. key = {2}. file = {3}.'
                        .format(url, bucket_name, key_name, filename)
                    )
                    self.log.critical(msg)
                    raise
            except Exception:
                msg = (
                    'Unable to download file from S3 bucket. url = {0}. '
                    'bucket = {1}. key = {2}. file = {3}.'
                    .format(url, bucket_name, key_name, filename)
                )
                self.log.critical(msg)
                raise
            self.log.info(
                'Downloaded file from S3 bucket. url=%s. filename=%s',
                url, filename
            )
        else:
            try:
                response = urllib.request.urlopen(url)
                with open(filename, 'wb') as outfile:
                    shutil.copyfileobj(response, outfile)
            except Exception:
                msg = (
                    'Unable to download file from web server. url = {0}. '
                    'filename = {1}.'
                    .format(url, filename)
                )
                self.log.critical(msg)
                raise
            self.log.info(
                'Downloaded file from web server. url=%s. filename=%s',
                url, filename
            )

    def create_working_dir(self, basedir, prefix):
        """
        Create a directory in ``basedir`` with a prefix of ``prefix``.

        Args:
            prefix (:obj:`str`):
                Prefix to prepend to the working directory.
            basedir (:obj:`str`):
                The directory in which to create the working directory.
        """
        self.log.info('Creating a working directory.')
        original_umask = os.umask(0)
        try:
            working_dir = tempfile.mkdtemp(prefix=prefix, dir=basedir)
        except Exception:
            msg = 'Could not create a working dir in {0}'.format(basedir)
            self.log.critical(msg)
            raise
        self.log.debug('Working directory: %s', working_dir)
        self.working_dir = working_dir
        os.umask(original_umask)

    def call_process(self, cmd):
        """
        Execute a shell command.

        Args:
            cmd (:obj:`list`):
                Command to execute.
        """
        if not isinstance(cmd, list):
            msg = 'Command is not a list: {0}'.format(cmd)
            self.log.critical(msg)
            raise WatchmakerException(msg)

        self.log.debug('Running command: %s', cmd)
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        with process.stdout as stdout:
            for line in iter(stdout.readline, b''):
                self.log.debug('Command stdout: %s', line.rstrip())
        with process.stderr as stderr:
            for line in iter(stderr.readline, b''):
                self.log.error('Command stderr: %s', line.rstrip())

        rsp = process.wait()
        if rsp != 0:
            msg = 'Command failed! Exit code={0}, cmd={1}'.format(rsp, cmd)
            self.log.critical(msg)
            raise WatchmakerException(msg)

    def cleanup(self):
        """Delete working directory."""
        self.log.info('Cleanup Time...')
        try:
            self.log.debug('working_dir=%s', self.working_dir)
            shutil.rmtree(self.working_dir)
            self.log.info('Deleted working directory...')
        except Exception:
            msg = 'Cleanup Failed!'
            self.log.critical(msg)
            raise

        self.log.info('Exiting cleanup routine...')

    def extract_contents(self, filepath, to_directory, create_dir=False):
        """
        Extract a compressed archive to the specified directory.

        Args:
            filepath (:obj:`str`):
                Path to the compressed file. Supported file extensions:

                - `zip`
                - `tar.gz`
                - `.tgz`
                - `.tar.bz2`
                - `.tbz`

            to_directory (:obj:`str`):
                Path to the target directory
            create_dir (bool):
                (Defaults to ``False``) Switch to control the creation of a
                subdirectory within ``to_directory`` named for the filename of
                the compressed file.
        """
        if filepath.endswith('.zip'):
            self.log.debug('File Type: zip')
            opener, mode = zipfile.ZipFile, 'r'
        elif filepath.endswith('.tar.gz') or filepath.endswith('.tgz'):
            self.log.debug('File Type: GZip Tar')
            opener, mode = tarfile.open, 'r:gz'
        elif filepath.endswith('.tar.bz2') or filepath.endswith('.tbz'):
            self.log.debug('File Type: Bzip Tar')
            opener, mode = tarfile.open, 'r:bz2'
        else:
            msg = (
                'Could not extract "{0}" as no appropriate extractor is found.'
                .format(filepath)
            )
            self.log.critical(msg)
            raise WatchmakerException(msg)

        if create_dir:
            to_directory = os.sep.join((
                to_directory,
                '.'.join(filepath.split(os.sep)[-1].split('.')[:-1])
            ))

        try:
            os.makedirs(to_directory)
        except OSError:
            if not os.path.isdir(to_directory):
                msg = 'Unable create directory - {0}'.format(to_directory)
                self.log.critical(msg)
                raise

        cwd = os.getcwd()
        os.chdir(to_directory)

        try:
            openfile = opener(filepath, mode)
            try:
                openfile.extractall()
            finally:
                openfile.close()
        finally:
            os.chdir(cwd)

        self.log.info(
            'Extracted file. source=%s, dest=%s',
            filepath, to_directory
        )


class LinuxManager(ManagerBase):
    """
    Base class for Linux Managers.

    Serves as a foundational class to keep OS consitency.
    """

    def __init__(self, *args, **kwargs):  # noqa: D102
        super(LinuxManager, self).__init__(*args, **kwargs)

    def _install_from_yum(self, packages):
        yum_cmd = ['sudo', 'yum', '-y', 'install']
        if isinstance(packages, list):
            yum_cmd.extend(packages)
        else:
            yum_cmd.append(packages)
        self.call_process(yum_cmd)
        self.log.debug(packages)


class WindowsManager(ManagerBase):
    """
    Base class for Windows Managers.

    Serves as a foundational class to keep OS consitency.
    """

    def __init__(self, *args, **kwargs):  # noqa: D102
        super(WindowsManager, self).__init__(*args, **kwargs)


@add_metaclass(abc.ABCMeta)
class WorkersManagerBase(object):
    """
    Base class for worker managers.

    Args:
        system_params (:obj:`dict`):
            Attributes, mostly file-paths, specific to the system-type (Linux
            or Windows).
        workers (:obj:`OrderedDict`):
            Workers to run and associated configuration data.
    """

    def __init__(self, system_params, workers, *args, **kwargs):  # noqa: D102
        self.system_params = system_params
        self.workers = workers
        args = args
        kwargs = kwargs

    @abc.abstractmethod
    def _worker_execution(self):
        return

    @abc.abstractmethod
    def _worker_validation(self):
        return

    @abc.abstractmethod
    def worker_cadence(self):  # noqa: D102
        return

    @abc.abstractmethod
    def cleanup(self):  # noqa: D102
        return
