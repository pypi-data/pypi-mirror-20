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
import subprocess, shutil
import re, os, sys
from ytrss.core.sys.debug import Debug

class Downloader:
    def __init__(self, settings, url):
        self.name = ""
        self.settings = settings
        self.url = url
        self.output_path = settings.get_output_path()
    def download(self):
        status = 0
        cache_path = self.settings.get_cache_path()
        try:
            os.makedirs(cache_path)
        except OSError:
            pass
        current_path = os.getcwd()
        os.chdir(cache_path)
         
        print("url: %s" % self.url)
        command = [ "youtube-dl", '--extract-audio',  '--audio-format',  'mp3', '-o',  "%(uploader)s - %(title)s.%(ext)s", self.url ]
        process = subprocess.Popen(command, stdout=subprocess.PIPE)
        self.output, self.erroutput = process.communicate()
        
        files = []
        finded = False
        for find_file in os.listdir(cache_path):
            if find_file.endswith(".mp3"):
                finded = True
                source_path = os.path.join(cache_path, find_file)
                destination_path = os.path.join(self.output_path, find_file)
                Debug().debug_log("source_path: {}".format(source_path))
                Debug().debug_log("destination_path: {}".format(destination_path))
                shutil.move(source_path, destination_path)

        return status == 0 and finded

    def get_downloaded_file(self):
        return self.name
