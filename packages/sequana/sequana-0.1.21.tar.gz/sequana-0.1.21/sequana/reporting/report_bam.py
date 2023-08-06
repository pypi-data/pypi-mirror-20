# -*- coding: utf-8 -*-
#
#  This file is part of Sequana software
#
#  Copyright (c) 2016 - Sequana Development Team
#
#  File author(s):
#      Thomas Cokelaer <thomas.cokelaer@pasteur.fr>
#      Dimitri Desvillechabrol <dimitri.desvillechabrol@pasteur.fr>, 
#          <d.desvillechabrol@gmail.com>
#
#  Distributed under the terms of the 3-clause BSD license.
#  The full license is in the LICENSE file, distributed with this software.
#
#  website: https://github.com/sequana/sequana
#  documentation: http://sequana.readthedocs.io
#
##############################################################################
"""Report dedicated to BAM file

.. autosummary::

    BAMReport

"""
import os

from sequana.lazy import pandas as pd
from sequana.reporting.report_main import BaseReport
from sequana.bamtools import  SAMFlags

from sequana.lazy import pylab
from sequana.lazy import reports


class BAMReport(BaseReport):
    """Report dedicated to BAM file

    ::

        from sequana import BAM, sequana_data
        from sequana.reporting.report_bam import BAMReport
        b = BAM(sequana_data("test.bam"))

        r = BAMReport()
        r.set_data(b)
        r.create_report()

        # report/bam.html is now available

    """
    def __init__(self, **kargs):
        super(BAMReport, self).__init__(
            jinja_filename="bam/index.html",
            directory="report",
            output_filename="bam.html", **kargs)

        self.jinja['title'] = "Bam Report"

    def set_data(self, data):
        self.bam = data

    def parse(self):
        self.jinja['alignment_count'] = len(self.bam)

        # first, we store the flags
        df = self.bam.get_flags_as_df().sum()
        df = df.to_frame()
        df.columns = ['counter']
        sf = SAMFlags()
        df['meaning'] = sf.get_meaning()
        df = df[['meaning', 'counter']]
        html = reports.HTMLTable(df).to_html(index=True)
        self.jinja['flags_table'] = html

        # create the bar plot with flags
        self.bam.plot_bar_flags(logy=True, filename=self.directory + os.sep +
                                                    "bar_flags_logy.png")
        self.bam.plot_bar_flags(logy=False, filename=self.directory + os.sep +
                                                     "bar_flags.png")
        self.bam.plot_bar_mapq(filename=self.directory + os.sep + "bar_mapq.png")
