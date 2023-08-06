# maildrake/_metadata.py
# Part of Mail Drake, an email server for development and testing.
#
# Copyright © 2017 Ben Finney <ben+python@benfinney.id.au>
#
# This is free software, and you are welcome to redistribute it under
# certain conditions; see the end of this file for copyright
# information, grant of license, and disclaimer of warranty.

""" Package metadata for the ‘maildrake’ distribution. """

import datetime
import json

import pkg_resources


distribution_name = "maildrake"
version_info_filename = "version_info.json"


def get_distribution_version_info(filename=version_info_filename):
    """ Get the version info from the installed distribution.

        :param filename: Base filename of the version info resource.
        :return: The version info as a mapping of fields. If the
            distribution is not available, the mapping is empty.

        The version info is stored as a metadata file in the
        distribution.

        """
    version_info = {
            'release_date': "UNKNOWN",
            'version': "UNKNOWN",
            'maintainer': "UNKNOWN",
            }

    try:
        distribution = pkg_resources.get_distribution(distribution_name)
    except pkg_resources.DistributionNotFound:
        distribution = None

    if distribution is not None:
        if distribution.has_metadata(filename):
            content = distribution.get_metadata(filename)
            version_info = json.loads(content)

    return version_info


version_info = get_distribution_version_info()

version_installed = version_info['version']


author_name = "Ben Finney"
author_email = "ben+python@benfinney.id.au"
author = "{name} <{email}>".format(name=author_name, email=author_email)


class YearRange:
    """ A range of years spanning a period. """

    def __init__(self, begin, end=None):
        self.begin = begin
        self.end = end

    def __unicode__(self):
        text = "{range.begin:04d}".format(range=self)
        if self.end is not None:
            if self.end > self.begin:
                text = "{range.begin:04d}–{range.end:04d}".format(range=self)
        return text

    __str__ = __unicode__


def make_year_range(begin_year, end_date=None):
    """ Construct the year range given a start and possible end date.

        :param begin_year: The beginning year (text, 4 digits) for the
            range.
        :param end_date: The end date (text, ISO-8601 format) for the
            range, or a non-date token string.
        :return: The range of years as a `YearRange` instance.

        If the `end_date` is not a valid ISO-8601 date string, the
        range has ``None`` for the end year.

        """
    begin_year = int(begin_year)

    try:
        end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d")
    except (TypeError, ValueError):
        # Specified end_date value is not a valid date.
        end_year = None
    else:
        end_year = end_date.year

    year_range = YearRange(begin=begin_year, end=end_year)

    return year_range


copyright_year_begin = "2008"
build_date = version_info['release_date']
copyright_year_range = make_year_range(copyright_year_begin, build_date)

copyright = "Copyright © {year_range} {author}".format(
        year_range=copyright_year_range, author=author)
license = "GNU AGPL-3+"
url = "https://pagure.io/maildrake/"


# Copyright © 2008–2017 Ben Finney <ben+python@benfinney.id.au>
#
# This is free software: you may copy, modify, and/or distribute this work
# under the terms of the GNU Affero General Public License as published by the
# Free Software Foundation; version 3 of that license or any later version.
# No warranty expressed or implied. See the file ‘LICENSE.AGPL-3’ for details.


# Local variables:
# coding: utf-8
# mode: python
# End:
# vim: fileencoding=utf-8 filetype=python :
