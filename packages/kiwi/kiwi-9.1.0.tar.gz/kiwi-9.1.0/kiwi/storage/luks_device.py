# Copyright (c) 2015 SUSE Linux GmbH.  All rights reserved.
#
# This file is part of kiwi.
#
# kiwi is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# kiwi is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with kiwi.  If not, see <http://www.gnu.org/licenses/>
#
from tempfile import NamedTemporaryFile

# project
from ..command import Command
from .device_provider import DeviceProvider
from .mapped_device import MappedDevice
from ..logger import log

from ..exceptions import (
    KiwiLuksSetupError
)


class LuksDevice(DeviceProvider):
    """
    Implements luks setup on a storage device

    Attributes

    * :attr:`storage_provider`
        Instance of class based on DeviceProvider

    * :attr:`luks_device`
        LUKS device node name

    * :attr:`luks_name`
        LUKS map name, set to: luksRoot

    * :attr:`option_map`
        dict of distribution specific luks options
    """
    def __init__(self, storage_provider):
        # bind the underlaying block device providing class instance
        # to this object (e.g loop) if present. This is done to guarantee
        # the correct destructor order when the device should be released.
        self.storage_provider = storage_provider

        self.luks_device = None
        self.luks_name = 'luksRoot'

        self.option_map = {
            'sle12': [
                '--cipher', 'aes-xts-plain64',
                '--key-size', '256',
                '--hash', 'sha1'
            ]
        }

    def get_device(self):
        """
        Instance of MappedDevice providing the luks device

        :return: mapped luks device
        :rtype: MappedDevice
        """
        if self.luks_device:
            return MappedDevice(
                device=self.luks_device, device_provider=self
            )

    def create_crypto_luks(self, passphrase, os=None, options=None):
        """
        Create luks device. Please note the passphrase is readable
        at creation time of this image. Make sure your host system
        is secure while this process runs
        """
        if not options:
            options = []
        if not passphrase:
            raise KiwiLuksSetupError(
                'passphrase must not be empty'
            )
        if os:
            if os in self.option_map:
                options += self.option_map[os]
            else:
                raise KiwiLuksSetupError(
                    'no custom option configuration found for OS %s' % os
                )
        storage_device = self.storage_provider.get_device()
        log.info('Creating crypto LUKS on %s', storage_device)
        log.info('--> Randomizing...')
        storage_size_mbytes = self.storage_provider.get_byte_size(
            storage_device
        ) / 1048576
        Command.run(
            [
                'dd', 'if=/dev/urandom', 'bs=1M',
                'count=%d' % storage_size_mbytes,
                'of=%s' % storage_device
            ]
        )
        log.info('--> Creating LUKS map')
        passphrase_file = NamedTemporaryFile()
        with open(passphrase_file.name, 'w') as credentials:
            credentials.write(passphrase)
        Command.run(
            [
                'cryptsetup', '-q', '--key-file', passphrase_file.name
            ] + options + [
                'luksFormat', storage_device
            ]
        )
        Command.run(
            [
                'cryptsetup', '--key-file', passphrase_file.name,
                'luksOpen', storage_device, self.luks_name
            ]
        )
        self.luks_device = '/dev/mapper/' + self.luks_name

    def create_crypttab(self, filename):
        """
        Create crypttab, setting the UUID of the storage device
        """
        storage_device = self.storage_provider.get_device()
        with open(filename, 'w') as crypttab:
            crypttab.write(
                'luks UUID=%s\n' % self.storage_provider.get_uuid(
                    storage_device
                )
            )

    def is_loop(self):
        """
        Check if storage provider is loop based

        Return loop status from base storage provider

        :rtype: bool
        """
        return self.storage_provider.is_loop()

    def __del__(self):
        if self.luks_device:
            log.info('Cleaning up %s instance', type(self).__name__)
            try:
                Command.run(
                    ['cryptsetup', 'luksClose', self.luks_name]
                )
            except Exception:
                log.warning(
                    'Shutdown of luks map %s failed, %s still busy',
                    self.luks_name, self.luks_device
                )
