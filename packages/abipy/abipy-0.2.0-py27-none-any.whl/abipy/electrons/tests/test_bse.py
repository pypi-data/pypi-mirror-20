"""Tests for electrons.bse module"""
from __future__ import print_function, division

import abipy.data as abidata

from abipy.electrons.bse import *
from abipy.core.testing import *


class TestMDF_Reader(AbipyTest):

    def test_MDF_reading(self):
        """Test MdfReader."""
        with MdfReader(abidata.ref_file("tbs_4o_DS2_MDF.nc")) as r:
            assert len(r.wmesh) == r.read_dimvalue("number_of_frequencies")
            assert len(r.qpoints) == r.read_dimvalue("number_of_qpoints")

            exc_mdf = r.read_exc_mdf()
            rpanlf_mdf = r.read_rpanlf_mdf()
            gwnlf_mdf = r.read_gwnlf_mdf()
            if self.has_matplotlib():
                exc_mdf.plot(show=False)

            # Test Plotter.
            plotter = MdfPlotter()
            plotter.add_mdf("EXC", exc_mdf)
            plotter.add_mdf("KS-RPA", rpanlf_mdf)
            plotter.add_mdf("GW-RPA", gwnlf_mdf)
            if self.has_matplotlib():
                plotter.plot(show=False)

    def test_mdf_api(self):
        """Test MdfFile API"""
        with MdfFile(abidata.ref_file("tbs_4o_DS2_MDF.nc")) as mdf_file:
            print(mdf_file)
            assert len(mdf_file.structure) == 2

            exc_tsr = mdf_file.get_tensor("exc")
            rpa_tsr = mdf_file.get_tensor("rpa")
            gw_tsr = mdf_file.get_tensor("gwrpa")

            if self.has_matplotlib():
                mdf_file.plot_mdfs(show=False)

            if self.has_nbformat():
                mdf_file.write_notebook(nbpath=self.get_tmpname(text=True))
