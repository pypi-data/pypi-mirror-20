# -*- coding: utf-8 -*-
################################################################################
#
#  Rattail -- Retail Software Framework
#  Copyright © 2010-2016 Lance Edgar
#
#  This file is part of Rattail.
#
#  Rattail is free software: you can redistribute it and/or modify it under the
#  terms of the GNU Affero General Public License as published by the Free
#  Software Foundation, either version 3 of the License, or (at your option)
#  any later version.
#
#  Rattail is distributed in the hope that it will be useful, but WITHOUT ANY
#  WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
#  FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for
#  more details.
#
#  You should have received a copy of the GNU Affero General Public License
#  along with Rattail.  If not, see <http://www.gnu.org/licenses/>.
#
################################################################################
"""
**Exceptions**

This module contains all core Rattail exception classes.
"""

from __future__ import unicode_literals, absolute_import


class RattailError(Exception):
    """
    Base class for all Rattail exceptions.
    """


class ConfigurationError(RattailError):
    """
    Generic class for configuration errors.
    """


class SQLAlchemyNotInstalled(RattailError):
    """
    Error raised when an operation is requested which requires SQLAlchemy
    (and/or related libraries) to be installed, but they are not available.
    """
    def __init__(self, error):
        self.error = error

    def __unicode__(self):
        return ("Hm, looks like SQLAlchemy may not be installed?  "
                "(Perhaps you should do: 'pip install rattail[db]'?)  "
                "Original error was: {0}".format(self.error))


class WindowsExtensionsNotInstalled(RattailError):
    """
    Error raised when an operation is requested which requires the "Python for
    Windows Extensions" to be instealled, but it is not available.
    """

    def __unicode__(self):
        return ("Cannot proceed because Python for Windows Extensions is not installed.  Please see "
                "https://rattailproject.org/moin/Installation/Windows/Python#Python_for_Windows_Extensions "
                "for more info.")


class MailTemplateNotFound(ConfigurationError):

    def __init__(self, key):
        self.key = key

    def __unicode__(self):
        return ("No message templates could be found for '{0}' emails.  Please "
                "create '{0}.(txt|html).mako' and place it/them in one of the "
                "configured template folders.".format(self.key))


class SenderNotFound(ConfigurationError):

    def __init__(self, key):
        self.key = key

    def __unicode__(self):
        return ("No email sender (From: address) found in config.  Please set '{0}.from' "
                "(or 'default.from') in the [rattail.mail] section.".format(self.key))


class RecipientsNotFound(ConfigurationError):
    
    def __init__(self, key):
        self.key = key

    def __str__(self):
        return (b"No recipients found in config for '{0}' emails.  Please set '{0}.to' "
                "(or 'default.to') in the [rattail.mail] section.".format(self.key))

    def __unicode__(self):
        return ("No recipients found in config for '{0}' emails.  Please set '{0}.to' "
                "(or 'default.to') in the [rattail.mail] section.".format(self.key))


class FileOperationError(RattailError):
    """
    Generic exception for file operation failures.
    """


class PathNotFound(FileOperationError):
    """
    Raised when "path not found" errors are encountered within the
    :func:`rattail.files.locking_copy_test()` function.  The purpose of this is
    to normalize these errors to a single type, since the file monitor retry
    mechanism will fail if two distinct exceptions are encountered during its
    processing attempts.
    """
    def __init__(self, original_error):
        self.original_error = original_error

    def __unicode__(self):
        return '{0}: {1}'.format(
            self.original_error.__class__.__name__,
            self.original_error)


class BatchError(RattailError):
    """
    Base class for all batch-related errors.
    """


class BatchTypeNotFound(BatchError):

    def __init__(self, name):
        self.name = name

    def __unicode__(self):
        return "Batch type not found: {}".format(self.name)

    
class BatchTypeNotSupported(BatchError):
    """
    Raised when a :class:`rattail.db.batches.BatchExecutor` instance is asked
    to execute a batch, but the batch is of an unsupported type.
    """

    def __init__(self, executor, batch_type):
        self.executor = executor
        self.batch_type = batch_type

    def __unicode__(self):
        return "Batch type '{}' is not supported by executor: {}".format(
            self.batch_type, repr(self.executor))


class BatchExecutorNotFound(BatchError):

    def __init__(self, name):
        self.name = name

    def __unicode__(self):
        return "Batch executor not found: {}".format(self.name)

    
class LabelPrintingError(Exception):

    pass


class PalmError(RattailError):
    """
    Base class for all errors relating to the Palm OS application interface.
    """


class PalmClassicDatabaseTypelibNotFound(PalmError):

    def __unicode__(self):
        return ("The Python module for the Palm Classic Database type library "
                "could not be generated.  (Is the HotSync Manager software "
                "installed?)")


class PalmConduitManagerNotFound(PalmError):

    def __unicode__(self):
        return ("The Palm Desktop Conduit Manager could not be instantiated.  "
                "(Is the HotSync Manager software installed?)")


class PalmConduitAlreadyRegistered(PalmError):

    def __unicode__(self):
        return "The Rattail Palm conduit is already registered."


class PalmConduitNotRegistered(PalmError):

    def __unicode__(self):
        return "The Rattail Palm conduit is not registered."
