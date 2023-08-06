"""Tests for electrons.bse module"""
from __future__ import print_function, division

import abipy.data as abidata

from abipy.electrons.fatbands import FatBandsFile
from abipy.core.testing import *


class TestElectronFatbands(AbipyTest):

    def test_MgB2_fatbands(self):
        """Test MgB2 fatbands with prtdos 3."""
        fbnc_kpath = FatBandsFile(abidata.ref_file("mgb2_kpath_FATBANDS.nc"))
        print(fbnc_kpath)
        assert fbnc_kpath.ebands.kpoints.is_path
        assert not fbnc_kpath.ebands.kpoints.is_ibz
        assert fbnc_kpath.prtdos == 3
        assert fbnc_kpath.prtdosm == 0
        assert fbnc_kpath.mbesslang == 5
        assert fbnc_kpath.pawprtdos == 0
        assert fbnc_kpath.usepaw == 0
        assert fbnc_kpath.nsppol == 1
        assert fbnc_kpath.nkpt == 78
        assert fbnc_kpath.mband == 8
        assert fbnc_kpath.natsph_extra == 0
        assert not fbnc_kpath.ebands.has_metallic_scheme

        if self.has_matplotlib():
            fbnc_kpath.plot_fatbands_typeview(tight_layout=True, show=False)
            fbnc_kpath.plot_fatbands_lview(tight_layout=True, show=False)

        if self.has_nbformat():
            fbnc_kpath.write_notebook(nbpath=self.get_tmpname(text=True))

        fbnc_kmesh = FatBandsFile(abidata.ref_file("mgb2_kmesh181818_FATBANDS.nc"))
        print(fbnc_kmesh)
        assert fbnc_kmesh.ebands.kpoints.is_ibz
        assert fbnc_kmesh.ebands.has_metallic_scheme

        if self.has_matplotlib():
            fbnc_kmesh.plot_pjdos_typeview(tight_layout=True, show=False)
            fbnc_kmesh.plot_pjdos_lview(tight_layout=True, show=False)
            fbnc_kpath.plot_fatbands_with_pjdos(pjdosfile=fbnc_kmesh, view="type", tight_layout=True, show=False)

        fbnc_kpath.close()
        fbnc_kmesh.close()
