"""Tests for electrons.gw module"""
from __future__ import print_function, division

import collections
import numpy as np
import abipy.data as abidata

from abipy.abilab import abiopen
from abipy.electrons.gw import *
from abipy.electrons.gw import SigresReader, SigresPlotter
from abipy.core.testing import *


class TestQPList(AbipyTest):

    def setUp(self):
        self.sigres = sigres = abiopen(abidata.ref_file("tgw1_9o_DS4_SIGRES.nc"))
        self.qplist = sigres.get_qplist(spin=0, kpoint=sigres.gwkpoints[0])

    def tearDown(self):
        self.sigres.close()

    def test_qplist(self):
        """Test QPList object."""
        qplist = self.qplist
        assert isinstance(qplist, collections.Iterable)
        self.serialize_with_pickle(qplist, protocols=[-1])

        print(qplist)
        qplist_copy = qplist.copy()
        self.assertTrue(qplist_copy == qplist)

        qpl_e0sort = qplist.sort_by_e0()
        qpl_e0sort.get_e0mesh()

        with self.assertRaises(ValueError):
            qplist.get_e0mesh()

        with self.assertRaises(ValueError):
            qplist.merge(qpl_e0sort)

        other_qplist = self.sigres.get_qplist(spin=0, kpoint=self.sigres.gwkpoints[1])
        qpl_merge = qplist.merge(other_qplist)

        for qp in qplist:
            assert qp in qpl_merge

        for qp in other_qplist:
            assert qp in qpl_merge

        # Test QPState object.
        qp = qplist[0]
        print(qp)
        print(qp.tips)

        self.assertAlmostEqual(qp.e0, -5.04619941555265, places=5)
        self.assertAlmostEqual(qp.qpe.real, -4.76022137474714)
        self.assertAlmostEqual(qp.qpe.imag, -0.011501666037697)
        self.assertAlmostEqual(qp.sigxme, -16.549383605401)


class TestSigresFile(AbipyTest):

    def test_readall(self):
        for path in abidata.SIGRES_NCFILES:
            with abiopen(path) as sigres:
                print(sigres)

    def test_base(self):
        """Test SIGRES File."""
        sigres = abiopen(abidata.ref_file("tgw1_9o_DS4_SIGRES.nc"))
        assert sigres.nsppol == 1

        # Markers are initialied in __init__
        assert sigres.ebands.markers

        # In this run IBZ = kptgw
        assert len(sigres.ibz) == 6
        assert sigres.gwkpoints == sigres.ibz

        kptgw_coords = np.reshape([
            -0.25, -0.25, 0,
            -0.25, 0.25, 0,
            0.5, 0.5, 0,
            -0.25, 0.5, 0.25,
            0.5, 0, 0,
            0, 0, 0
        ], (-1,3))

        self.assert_almost_equal(sigres.ibz.frac_coords, kptgw_coords)

        qpgaps = [3.53719151871085, 4.35685250045637, 4.11717896881632,
                  8.71122659251508, 3.29693118466282, 3.125545059031]

        self.assert_almost_equal(sigres.qpgaps, np.reshape(qpgaps, (1,6)))
        ik = 0
        df = sigres.get_dataframe_sk(spin=0, kpoint=ik)
        same_df = sigres.get_dataframe_sk(spin=0, kpoint=sigres.gwkpoints[ik])
        assert np.all(df["qpe"] == same_df["qpe"])

        if self.has_matplotlib():
            sigres.plot_qps_vs_e0(show=False)
            with self.assertRaises(ValueError):
                sigres.plot_qps_vs_e0(with_fields="qqeme0", show=False)
            sigres.plot_qps_vs_e0(with_fields="qpeme0", show=False)
            sigres.plot_qps_vs_e0(exclude_fields=["vUme"], show=False)

        if self.has_nbformat():
            sigres.write_notebook(nbpath=self.get_tmpname(text=True))

        sigres.close()

    def test_interpolator(self):
        """Test QP interpolation."""
        from abipy.abilab import abiopen, ElectronBandsPlotter
        # Get quasiparticle results from the SIGRES.nc database.
        sigres = abiopen(abidata.ref_file("si_g0w0ppm_nband30_SIGRES.nc"))

        # Interpolate QP corrections and apply them on top of the KS band structures.
        # QP band energies are returned in r.qp_ebands_kpath and r.qp_ebands_kmesh.
        r = sigres.interpolate(lpratio=5,
                               ks_ebands_kpath=abidata.ref_file("si_nscf_GSR.nc"),
                               ks_ebands_kmesh=abidata.ref_file("si_scf_GSR.nc"),
                               verbose=0, filter_params=[1.0, 1.0], line_density=10)

        assert r.qp_ebands_kpath is not None
        assert r.qp_ebands_kpath.kpoints.is_path
        #print(r.qp_ebands_kpath.kpoints.ksampling, r.qp_ebands_kpath.kpoints.mpdivs_shifts)
        assert r.qp_ebands_kpath.kpoints.mpdivs_shifts == (None, None)

        assert r.qp_ebands_kmesh is not None
        assert r.qp_ebands_kmesh.kpoints.is_ibz
        assert r.qp_ebands_kmesh.kpoints.ksampling is not None
        assert r.qp_ebands_kmesh.kpoints.is_mpmesh
        qp_mpdivs, qp_shifts = r.qp_ebands_kmesh.kpoints.mpdivs_shifts
        assert not ((qp_mpdivs, qp_shifts) == (None, None))
        ks_mpdivs, ks_shifts = r.ks_ebands_kmesh.kpoints.mpdivs_shifts
        self.assert_equal(qp_mpdivs, ks_mpdivs)
        self.assert_equal(qp_shifts, ks_shifts)

        # Get DOS from interpolated energies.
        ks_edos = r.ks_ebands_kmesh.get_edos()
        qp_edos = r.qp_ebands_kmesh.get_edos()

        r.qp_ebands_kmesh.to_bxsf(self.get_tmpname(text=True))

        # Plot the LDA and the QPState band structure with matplotlib.
        plotter = ElectronBandsPlotter()
        plotter.add_ebands("LDA", r.ks_ebands_kpath, dos=ks_edos)
        plotter.add_ebands("GW (interpolated)", r.qp_ebands_kpath, dos=qp_edos)

        if self.has_matplotlib():
            plotter.combiplot(title="Silicon band structure", show=False)
            plotter.gridplot(title="Silicon band structure", show=False)

        sigres.close()


class TestSigresPlotter(AbipyTest):
    def test_sigres_plotter(self):
        """Testing SigresPlotter."""
        filenames = [
            "si_g0w0ppm_nband10_SIGRES.nc",
            "si_g0w0ppm_nband20_SIGRES.nc",
            "si_g0w0ppm_nband30_SIGRES.nc",
        ]
        filepaths = [abidata.ref_file(fname) for fname in filenames]

        plotter = SigresPlotter()
        plotter.add_files(filepaths)
        print(plotter)
        assert len(plotter) == len(filepaths)

        if self.has_matplotlib():
            plotter.plot_qpgaps(title="QP gaps vs sigma_nband", hspan=0.05, show=False)
            plotter.plot_qpenes(title="QP energies vs sigma_nband", hspan=0.05, show=False)
            plotter.plot_qps_vs_e0(show=False)

        plotter.close()
