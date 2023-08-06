#!/usr/bin/env python
from __future__ import print_function, division

from abipy import *
from abipy.electrons import ScissorsBuilder

import sys

#scissors_from_sigres(get_reference_file("tgw1_9o_DS4_SIGRES.nc"))


# Printout of the QPState results

from abipy import *

import numpy as np
from abipy.tools.derivatives import finite_diff
#from abipy.testing import *
import matplotlib.pyplot as plt


def plot_fft():
    xmin, xmax = -1.0, 1.0
    mesh, h = np.linspace(xmin, xmax, 500, retstep=True)
    sinf = Function1D.from_func(np.sin, mesh)
    cosf = Function1D.from_func(np.cos, mesh)
    eix = cosf + 1j*sinf

    fig = plt.figure()
    ax = fig.add_subplot(111)

    gauss = lambda x : np.exp(-x**2)
    func = Function1D.from_func(gauss, mesh)

    poly = lambda x : x + x**2 + 3
    func = Function1D.from_func(poly, mesh)

    #(0.1 + func).plot_ax(ax, name="func")
    func.plot_ax(ax, label="func")
    fft_func = func.fft() 
    fft_func.plot_ax(ax, label="FFT(func)")
    same_func = fft_func.ifft(x0=xmin)
    print(same_func.h/ func.h)
    same_func.plot_ax(ax, label="IFFT(FFT(func))")

    #sinf.fft().plot()
    #fft_eix = eix.fft()
    #fft_eix.plot()
    plt.legend()
    plt.show()

def check_kinfo():
    from abipy.core.kpoints import KpointsInfo, kpoints_factory
    file = get_reference_file("si_nscf_WFK-etsf.nc")
    #kinfo = KpointsInfo.from_file(file)
    #print(kinfo)
    #print(kinfo.is_sampling)
    kpoints = kpoints_factory(file)
    print(kpoints)

def test_convolve():
    xmin, xmax = -3, 3
    mesh, h = np.linspace(xmin, xmax, 500, retstep=True)
    gauss = lambda x : np.exp(-x**2)

    #values = gauss(mesh) + 0.3 * np.random.rand(len(mesh))
    values = np.cos(mesh) + 0.3 * np.random.rand(len(mesh))

    func = Function1D(mesh, values)
    cgauss = func.gauss_convolve(0.1)

    fig = plt.figure()
    ax = fig.add_subplot(111)

    func.plot_ax(ax, label="func")
    cgauss.plot_ax(ax, marker="o", label="func * gauss")

    smooth = func.smooth()
    smooth.plot_ax(ax, marker="x", label="func * smooth")

    plt.legend()
    plt.show()

def sppgroup():
    filename = "/Users/gmatteo/Coding/Abinit/bzr_archives/733/gmatteo-private/gcc47/tests/Silicon/o_GSR"
    #from abipy.core import Structure, SpaceGroup
    #wfk = WFK_File(get_reference_file("si_WFK-etsf.nc"))

    #wfk = WFK_File(get_reference_file("si_WFK-etsf.nc"))
    #structure = wfk.get_structure()
    #ibz = wfk.kpoints

    structure = Structure.from_file(filename)

    spg = structure.spacegroup
    print(spg)

    ibz = kpoints_factory(filename)
    print(type(ibz))
    print("mpdivs",ibz.mpdivs)

    bands = ElectronBands.from_file(filename)

    from abipy.core.kpoints import map_mesh2ibz, Kmesh

    kmap = map_mesh2ibz(structure, ibz.mpdivs, ibz.shifts, ibz)
    sys.exit(1)
    #kmesh = Kmesh(structure,ibz.mpdivs, ibz.shifts, ibz)
    #print(kmesh.bzmap)

    band = 3

    branch = bands.eigens[0,:,band]
    kx, ky, plane = kmesh.plane_cut(branch)
    #print(plane)
    #plot_array(plane)
    #plt.contour(plane)

    #from mayavi import mlab
    #mlab.surf(kx,ky,plane)
    #mlab.show()

    from abipy.tools.plotting_utils import plot_array
    from mpl_toolkits.mplot3d import axes3d
    from matplotlib import cm

    fig = plt.figure()
    ax = fig.gca(projection='3d')

    surf = ax.plot_surface(kx, ky, plane, alpha=0.3)

    min_eig = plane.min()
    #min_eig -= abs(min_eig) * 0.1
    off_x = -1
    off_y = len(ky) + 1

    cset = ax.contourf(kx, ky, plane, zdir='z', offset=min_eig, cmap=cm.jet)
    #cset = ax.contourf(kx, ky, plane, zdir='x', offset=off_x, cmap=cm.coolwarm)
    #cset = ax.contourf(kx, ky, plane, zdir='y', offset=off_y, cmap=cm.coolwarm)
    #fig.colorbar(surf, shrink=0.5, aspect=5)

    plt.show()

def plot3d():
    """
    .. versionadded:: 1.1.0
    This demo depends on new features added to contourf3d.
    """
    from mpl_toolkits.mplot3d import axes3d
    import matplotlib.pyplot as plt
    from matplotlib import cm

    fig = plt.figure()
    ax = fig.gca(projection='3d')
    X, Y, Z = axes3d.get_test_data(0.05)
    ax.plot_surface(X, Y, Z, rstride=8, cstride=8, alpha=0.3)
    cset = ax.contourf(X, Y, Z, zdir='z', offset=-100, cmap=cm.coolwarm)
    cset = ax.contourf(X, Y, Z, zdir='x', offset=-40, cmap=cm.coolwarm)
    cset = ax.contourf(X, Y, Z, zdir='y', offset=40, cmap=cm.coolwarm)

    ax.set_xlabel('X')
    #ax.set_xlim(-40, 40)
    ax.set_ylabel('Y')
    #ax.set_ylim(-40, 40)
    ax.set_zlabel('Z')
    #ax.set_zlim(-100, 100)

    plt.show()

if __name__ == "__main__":
    #plot3d()
    #import cProfile, pstats, io
    #pr = cProfile.Profile()
    #pr.enable()
    #sppgroup()
    #pr.disable()
    #s = io.StringIO()
    #ps = pstats.Stats(pr, stream=s)
    #ps.sort_stats('cumulative')
    #ps.print_stats()
    plot_emasses()
    #plot_fft()
    #check_kinfo()
    #test_convolve()
