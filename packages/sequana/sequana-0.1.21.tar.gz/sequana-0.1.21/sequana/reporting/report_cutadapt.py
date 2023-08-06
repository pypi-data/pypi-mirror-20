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
"""Report for cutadapt/atropos"""
import os
import io

import easydev

from sequana.reporting.report_adapter_removal import AdapterRemovalReport
from sequana.reporting.report_main import BaseReport

from sequana.lazy import reports
from sequana.lazy import pandas as pd
from sequana import logger

class CutAdaptReport(AdapterRemovalReport):
    """Parse a cutadapt report and stores information as dictionary


    """
    def __init__(self, proj, output_filename="cutadapt.html",
                 directory="report", **kargs):
        """.. rubric:: Constructor

        :param input_filename: the input data with results of a cutadapt run
        :param output_filename: name of the HTML file that will be created
        :param report: name of the directory where will be saved the HTML files

        """
        super(CutAdaptReport, self).__init__(
            output_filename=output_filename,
            directory=directory, **kargs)
        self.jinja['title'] = "CutAdapt Report Summary"
        self.jinja['main_link'] = "summary.html"
        self.sample_name = proj

    def read_data(self, filename):
        self.input_filename = filename
        with open(self.input_filename, "r") as fin:
            self._rawdata = fin.read()

            if "Total read pairs processed" in self._rawdata:
                self.jinja['mode'] = "Paired-end"
                self.mode = "pe"
            else:
                self.jinja['mode'] = "Single-end"
                self.mode = "se"

    def _get_data_tobefound(self):
        tobefound = []
        if self.mode == 'se':
            tobefound.append(('total_reads', 'Total reads processed:'))
            tobefound.append(('reads_with_adapters', 'Reads with adapters:'))
            tobefound.append(('reads_too_short', 'Reads that were too short:'))
            tobefound.append(('reads_kept', 'Reads written (passing filters):'))
        else:
            tobefound.append(('paired_total_reads', 'Total read pairs processed:'))
            tobefound.append(('paired_reads1_with_adapters', '  Read 1 with adapter:'))
            tobefound.append(('paired_reads2_with_adapters', '  Read 2 with adapter:'))
            tobefound.append(('paired_reads_too_short', 'Pairs that were too short'))
            tobefound.append(('paired_reads_kept', 'Pairs written (passing filters):'))

        return tobefound

    def parse(self):
        d = {}
        # output
        tobefound = self._get_data_tobefound()
        adapters = []

        with open(self.input_filename, 'r') as fin:
            # not tool large so let us read everything
            data = fin.readlines()

            # some metadata to extract
            for this in tobefound:
                key, pattern = this
                found = [line for line in data if line.startswith(pattern)]
                if len(found) == 0:
                    print("ReportCutadapt: %s (not found)" % pattern)
                elif len(found) == 1:
                    text = found[0].split(":", 1)[1].strip()
                    try:
                        this, percent = text.split(" ")
                        self.jinja[key] = this
                        self.jinja[key+'_percent'] = percent
                    except:
                        self.jinja[key] = text
                        self.jinja[key+'_percent'] = "?"

            dd = {}
            positions = []
            for pos, this in enumerate(data):
                if this.startswith("Command line parameters: "):
                    cmd = this.split("Command line parameters: ")[1]
                    self.jinja['command'] = "cutadapt " + cmd

                if this.startswith("=== ") and "Adapter" in this:
                    name = this.split("=== ")[1].split(" ===")[0].strip()
                    dd['name'] = name
                    continue
                if this.startswith('Sequence:'):
                    info = this.split("Sequence:", 1)[1].strip()
                    info = info.split(";")
                    dd['info'] = {
                        'Sequence': info[0].strip(),
                        'Type': info[1].split(':',1)[1].strip(),
                        'Length': info[2].split(':',1)[1].strip(),
                        'Trimmed': info[3].split(':',1)[1].strip()
                    }
                    adapters.append(dd.copy())

        self.data = {}
        self.data['adapters'] = adapters

        #logs section
        self.jinja['logs'] = "<pre>\n"+ open(self.input_filename).read() + "</pre>\n"

    def get_histogram_data(self):
        """In cutadapt logs, an adapter section contains
        an histogram of matches that starts with a header
        and ends with a blank line
        """
        header = 'length\tcount\texpect\tmax.err\terror counts\n'
        with open(self.input_filename, 'r') as fin:
            # not too large so let us read everything
            data = fin.readlines()
            scanning_histogram = False
            adapters = []
            current_hist = header
            dfs = {}


            if "variable 5'/3'" in "\n".join(data):
                cutadapt_mode = "b"
            else:
                cutadapt_mode = "other"

            for this in data:
                # while we have not found a new adapter histogram section,
                # we keep going
                # !! What about 5' / 3' 
                if this.startswith("==="):
                    if 'read: Adapter' in this:
                        # We keep read: Adatpter because it may be the first
                        # or second read so to avoid confusion we keep the full 
                        # name for now.
                        name = this.replace("First read: Adapter ", "R1_")
                        name = name.replace("Second read: Adapter ", "R2_")
                        name = name.strip().strip("===")
                        name = name.strip()
                    elif "=== Adapter" in this:
                        name = this.split("=== ")[1].split(" ===")[0]
                        name = name.strip()
                    else:
                        pass

                if scanning_histogram is False:
                    if this == header:
                        # we found the beginning of an histogram
                        scanning_histogram = True
                    else:
                        # we are somewhere in the log we do not care about
                        pass
                elif scanning_histogram is True and len(this.strip()) != 0:
                    # accumulate the histogram data
                    current_hist += this
                elif scanning_histogram is True and len(this.strip()) == 0:
                    # we found the end of the histogram
                    # Could be a 5'/3' case ? if so another histogram is
                    # possible
                    self.dd = current_hist
                    df = pd.read_csv(io.StringIO(current_hist), sep='\t')
                    #reinitiate the variables
                    if cutadapt_mode != "b":
                        dfs[name] = df.set_index("length")
                        current_hist = header
                        scanning_histogram = False
                    else:
                        # there will be another histogram so keep scanning
                        current_hist = header
                        # If we have already found an histogram, this is
                        # therefore the second here.
                        if name in dfs:
                            dfs[name] = dfs[name].append(df.set_index("length"))
                            scanning_histogram = False

                            #Now that we have the two histograms, we can merge
                            # them using a group by

                            dfs[name] = dfs[name].reset_index().groupby("length").aggregate(sum)
                        else:
                            dfs[name] = df.set_index("length")
                            scanning_histogram = True

                            df.reset_index().groupby("length").aggregate(sum)


                else:
                    pass

        return dfs


