#!/usr/bin/env python2.7

"""
CanvasSync by Mathias Perslev

MSc Bioinformatics, University of Copenhagen
February 2017

--------------------------------------------

file, CanvasEntity Class

"""

# Future imports
from __future__ import print_function

# Inbuilt modules
import os
import sys

# Third party
from six import text_type

from CanvasSync.CanvasEntities.entity import Entity
from CanvasSync.Statics.ANSI import ANSI
from CanvasSync.Statics import static_functions


class File(Entity):
    """ Derived class of the Entity base class """

    def __init__(self, file_info, parent, add_to_list_of_entities=True):
        """
        Constructor method, initializes base Entity class

        assignment_info : dict   | A dictionary of information on the Canvas file object
        parent          : object | The parent object, a Module, SubFolder or Assignment object
        """

        self.file_info = file_info

        file_id = self.file_info[u"id"]
        file_name = static_functions.get_corrected_name(self.file_info[u"display_name"])
        file_path = parent.get_path() + file_name

        # Initialize base class
        Entity.__init__(self,
                        id_number=file_id,
                        name=file_name,
                        sync_path=file_path,
                        parent=parent,
                        folder=False,
                        identifier=u"file",
                        add_to_list_of_entities=add_to_list_of_entities)

    def __repr__(self):
        """ String representation, overwriting base class method """
        return u" " * 15 + u"|   " + u"\t" * self.indent + u"%s: %s" % (ANSI.format(u"File",
                                                                                    formatting=u"file"),
                                                                        self.name)

    def download(self):
        """ Download the file """
        if os.path.exists(self.sync_path):
            return False

        self.print_status(u"DOWNLOADING", color=u"blue")

        # Download file payload from server
        file_data = self.api.download_file_payload(self.file_info[u"url"])

        # Write data to file
        try:
            with open(self.sync_path, u"wb") as out_file:
                out_file.write(file_data)

        except KeyboardInterrupt as e:
            # If interrupted mid-writing, delete the corrupted file
            if os.path.exists(self.sync_path):
                os.remove(self.sync_path)

            # Re-raise, will be catched in CanvasSync.py
            raise e

        return True

    def print_status(self, status, color, overwrite_previous_line=False):
        """ Print status to console """

        if overwrite_previous_line:
            # Move up one line
            sys.stdout.write(ANSI.format(u"", formatting=u"lineup"))
            sys.stdout.flush()

        print(ANSI.format(u"[%s]" % status, formatting=color) + str(self)[len(status) + 2:])
        sys.stdout.flush()

    def walk(self, counter):
        """ Stop walking, endpoint """
        print(text_type(self))

        counter[0] += 1
        return

    def sync(self):
        """
        Synchronize the file by downloading it from the Canvas server and saving it to the sync path
        If the file has already been downloaded, skip downloading.
        File objects have no children objects and represents an end point of a folder traverse.
        """
        was_downloaded = self.download()
        self.print_status(u"SYNCED", color=u"green", overwrite_previous_line=was_downloaded)

    def show(self):
        """ Show the folder hierarchy by printing every level """
        print(text_type(self))
