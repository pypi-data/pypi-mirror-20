#!/usr/bin/env python
# -*- coding: utf-8 -*-
###########################################################################
#                                                                         #
#  Copyright (C) 2017  Rafal Kobel <rafalkobel@rafyco.pl>                 #
#                                                                         #
#  This program is free software: you can redistribute it and/or modify   #
#  it under the terms of the GNU General Public License as published by   #
#  the Free Software Foundation, either version 3 of the License, or      #
#  (at your option) any later version.                                    #
#                                                                         #
#  This program is distributed in the hope that it will be useful,        #
#  but WITHOUT ANY WARRANTY; without even the implied warranty of         #
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the           #
#  GNU General Public License for more details.                           #
#                                                                         #
#  You should have received a copy of the GNU General Public License      #
#  along with this program.  If not, see <http://www.gnu.org/licenses/>.  #
#                                                                         #
###########################################################################

from __future__ import unicode_literals
from ytrss import get_version
from ytrss.core import UrlRememberer
from ytrss.core import URLRemembererError
from ytrss.core.sys.debug import Debug
from ytrss.core.settings import YTSettings
from ytrss.core.settings import SettingException
from ytrss.core.sys.locker import Locker, LockerError
from ytrss.core.downloader import Downloader
from optparse import OptionParser
import os
try:
    import argcomplete
except ImportError:
    pass

def option_args():
    parser = OptionParser(description="Download all Youtube's movie to youtube path.",
                          prog='ytrss_daemon',
                          version='%prog {}'.format(get_version())) 
    parser.add_option("-d", "--debug", action="store_true",
                      dest="debug_mode", default=False,
                      help="show debug information")
    parser.add_option("-c", "--conf", dest="configuration", 
                      help="configuration file", default="", metavar="FILE")
    try:
        argcomplete.autocomplete(parser)
    except NameError:
        pass
    (options, args) = parser.parse_args()
    return options

class DaemonError(Exception):
    pass
    
def main():
    options = option_args()
    Debug().set_debug(options.debug_mode)
    Debug().debug_log("Debug mode: Run")
    try:
        settings = YTSettings(options.configuration)
    except SettingException:
        print("Configuration file not exist.")
        exit(1)
        
    locker = Locker('lock_ytdown')
    try:
        locker.lock()
    except LockerError:
        print("Program is running.")
        exit(1)
    try:
        if not(os.path.isfile(settings.get_download_file())) and not(os.path.isfile(settings.get_url_backup())):
            raise DaemonError
        urls = UrlRememberer(settings.get_download_file())
        urls.read_backup(settings.get_url_backup())
        urls.delete_file()
        urls.save_as(settings.get_url_backup())
        
        error_file = UrlRememberer(settings.get_err_file())
        history_file = UrlRememberer(settings.get_history_file())
        
        for elem in urls.get_elements():
            if not(history_file.is_new(elem)):
                print("URL {} cannot again download".format(elem))
                continue
            task = Downloader(settings, elem)
            if (task.download()):
                # finish ok
                print("finish ok") # RAF
                history_file.add_element(elem)
            else:
                # finish error
                print("finish error") # RAF
                error_file.add_element(elem)        
            
        locker.unlock()
        
        os.remove(settings.get_url_backup())
        Debug().debug_log("End")
    except KeyboardInterrupt as ex:
        locker.unlock()
        print("Keyboard Interrupt by user.")
        exit(1)
    except DaemonError:
        locker.unlock()
        print("Cannot find url to download")
        exit()
    except Exception as ex:
        locker.unlock()
        print("Unexpected Error: {}".format(ex))
        raise ex
    
def daemon():
    print("Not implemented yet.")
    exit(1)
