# Copyright (c) 2014-2017. Mount Sinai School of Medicine
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from __future__ import print_function, division, absolute_import

from .base_commandline_predictor import BaseCommandlinePredictor
from .file_formats import parse_netmhccons_stdout

class NetMHCcons(BaseCommandlinePredictor):
    def __init__(
            self,
            alleles,
            epitope_lengths=[9],
            program_name="netMHCcons",
            max_file_records=None,
            process_limit=0):
        BaseCommandlinePredictor.__init__(
            self,
            program_name=program_name,
            alleles=alleles,
            epitope_lengths=epitope_lengths,
            parse_output_fn=parse_netmhccons_stdout,
            # netMHCcons does not have a supported allele flag
            supported_alleles_flag=None,
            length_flag="-length",
            input_fasta_flag="-f",
            allele_flag="-a",
            tempdir_flag="-tdir",
            max_file_records=max_file_records,
            process_limit=process_limit)
