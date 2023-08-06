"""
This module gathers the most important classes and helper functions used for scripting.
"""
from __future__ import print_function, division, unicode_literals

import os
import collections

####################
### Monty import ###
####################
from monty.os.path import which

#######################
### Pymatgen import ###
#######################
# Tools for unit conversion
import pymatgen.core.units as units
FloatWithUnit = units.FloatWithUnit
ArrayWithUnit = units.ArrayWithUnit

####################
### Abipy import ###
####################
from abipy.flowtk import Pseudo, PseudoTable, Mrgscr, Mrgddb, Mrggkk, Flow, TaskManager, AbinitBuild, flow_main
#from pymatgen.io.abinit.flows import (Flow, G0W0WithQptdmFlow, bandstructure_flow, PhononFlow,
#    g0w0_flow, phonon_flow, phonon_conv_flow, nonlinear_coeff_flow)

from abipy.core.release import __version__, min_abinit_version
from abipy.core.structure import Lattice, Structure, StructureModifier, frames_from_structures
from abipy.core.mixins import CubeFile
from abipy.core.kpoints import set_atol_kdiff
from abipy.htc.input import AbiInput, LdauParams, LexxParams, input_gen
from abipy.abio.robots import Robot, GsrRobot, SigresRobot, MdfRobot, DdbRobot, abirobot
from abipy.abio.inputs import AbinitInput, MultiDataset, AnaddbInput, OpticInput
from abipy.abio.abivars import AbinitInputFile
from abipy.abio.outputs import AbinitLogFile, AbinitOutputFile, OutNcFile #, CubeFile
from abipy.abio.factories import *
from abipy.electrons.ebands import (ElectronBands, ElectronBandsPlotter, ElectronDos, ElectronDosPlotter,
    frame_from_ebands)
from abipy.electrons.gsr import GsrFile
from abipy.electrons.psps import PspsFile
from abipy.electrons.gw import SigresFile, SigresPlotter
from abipy.electrons.bse import MdfFile
from abipy.electrons.scissors import ScissorsBuilder
from abipy.electrons.scr import ScrFile
#from abipy.electrons.sigmaph import SigmaPhFile
from abipy.electrons.denpot import DensityNcFile, DensityFortranFile
from abipy.electrons.fatbands import FatBandsFile
from abipy.dfpt.phonons import PhbstFile, PhononBands, PhdosFile, PhdosReader, phbands_gridplot
from abipy.dfpt.ddb import DdbFile
#from abipy.dfpt.gruneisen import GrunsFile
from abipy.dfpt.anaddbnc import AnaddbNcFile
from abipy.dynamics.hist import HistFile
from abipy.waves import WfkFile

# Abinit Documentation.
from abipy.abio.abivars_db import get_abinit_variables, abinit_help, docvar


def _straceback():
    """Returns a string with the traceback."""
    import traceback
    return traceback.format_exc()

# Abinit text files. Use OrderedDict for nice output in show_abiopen_exc2class.
ext2file = collections.OrderedDict([
    (".abi", AbinitInputFile),
    (".in", AbinitInputFile),
    (".abo", AbinitOutputFile),
    (".out", AbinitOutputFile),
    (".log", AbinitLogFile),
    (".cif", Structure),
    ("POSCAR", Structure),
    (".cssr", Structure),
    (".cube", CubeFile),
    ("anaddb.nc", AnaddbNcFile),
    ("DEN", DensityFortranFile),
    (".psp8", Pseudo),
    (".xml", Pseudo),
])

# Abinit files require a special treatment.
abiext2ncfile = collections.OrderedDict([
    ("GSR.nc", GsrFile),
    ("DEN.nc", DensityNcFile),
    ("OUT.nc", OutNcFile),
    ("WFK.nc", WfkFile),
    ("HIST.nc", HistFile),
    ("PSPS.nc", PspsFile),
    ("DDB", DdbFile),
    ("PHBST.nc", PhbstFile),
    ("PHDOS.nc", PhdosFile),
    ("SCR.nc", ScrFile),
    ("SIGRES.nc", SigresFile),
    #("SIGMAPH.nc", SigmaPhFile),
    #("GRUNS.nc", GrunsFile),
    ("MDF.nc", MdfFile),
    ("FATBANDS.nc", FatBandsFile),
])


def abiopen_ext2class_table():
    """
    Print the association table between file extensions and File classes.
    """
    from itertools import chain
    from tabulate import tabulate
    table = []

    for ext, cls in chain(ext2file.items(), abiext2ncfile.items()):
        table.append((ext, str(cls)))

    return tabulate(table, headers=["Extension", "Class"])


def abifile_subclass_from_filename(filename):
    """
    Returns the appropriate class associated to the given filename.
    """
    for ext, cls in ext2file.items():
        if filename.endswith(ext): return cls

    ext = filename.split("_")[-1]
    try:
        return abiext2ncfile[ext]
    except KeyError:
        for ext, cls in abiext2ncfile.items():
            if filename.endswith(ext): return cls

    msg = ("No class has been registered for file:\n\t%s\n\nFile extensions supported:\n%s" %
        (filename, abiopen_ext2class_table()))
    raise ValueError(msg)


def dir2abifiles(top, recurse=True):
    """
    Analyze the filesystem starting from directory `top` and
    return an ordered dictionary mapping the directory name to the list
    of files supported by `abiopen` contained within that directory.
    If not `recurse`, children directories are not analyzed.
    """
    dl = collections.defaultdict(list)

    if recurse:
        for dirpath, dirnames, filenames in os.walk(top):
            for f in filenames:
                path = os.path.join(dirpath, f)
                if not isabifile(path): continue
                dl[dirpath].append(path)
    else:
        for f in os.listdir(top):
            path = os.path.join(top, f)
            if not isabifile(path): continue
            dl[top].append(path)

    return collections.OrderedDict([(k, dl[k]) for k in sorted(dl.keys())])


def isabifile(filepath):
    """
    Return True if `filepath` can be opened with `abiopen`.
    """
    try:
        abifile_subclass_from_filename(filepath)
        return True
    except ValueError:
        return False


def abiopen(filepath):
    """
    Factory function that opens any file supported by abipy.
    File type is detected from the extension

    Args:
        filepath: string with the filename.
    """
    if os.path.basename(filepath) == "__AbinitFlow__.pickle":
        return Flow.pickle_load(filepath)

    # Handle old output files produced by Abinit.
    import re
    outnum = re.compile(r".+\.out[\d]+")
    abonum = re.compile(r".+\.abo[\d]+")
    if outnum.match(filepath) or abonum.match(filepath):
        return AbinitOutputFile.from_file(filepath)

    cls = abifile_subclass_from_filename(filepath)
    return cls.from_file(filepath)


def print_frame(frame, title=None):
    """
    Print entire pandas DataFrame.

    Args:
        frame: pandas DataFrame.
        title: Optional string to print as initial title.
    """
    if title is not None: print(title)
    import pandas as pd
    with pd.option_context('display.max_rows', len(frame),
                           'display.max_columns', len(list(frame.keys()))):
        print(frame)
    print()


def display_structure(obj, **kwargs):
    """
    Use Jsmol to display a structure in the jupyter notebook.
    Requires `nbjsmol` notebook extension installed on the local machine.
    Install it with `pip install nbjsmol`. See also https://github.com/gmatteo/nbjsmol.

    Args:
        obj: Structure object or file with a structure or python object with a `structure` attribute.
        kwargs: Keyword arguments passed to `nbjsmol_display`
    """
    try:
        from nbjsmol import nbjsmol_display
    except ImportError as exc:
        raise ImportError(str(exc) +
                          "\ndisplay structure requires nbjsmol package\n."
                          "Install it with `pip install nbjsmol.`\n"
                          "See also https://github.com/gmatteo/nbjsmol.")

    # Cast to structure, get string with cif data and pass it to nbjsmol.
    structure = Structure.as_structure(obj)
    return nbjsmol_display(structure.to(fmt="cif"), ext=".cif", **kwargs)


def software_stack():
    """
    Import all the hard dependencies. Returns ordered dict: package --> string with version info.
    """
    import platform
    system, node, release, version, machine, processor = platform.uname()
    # These packages are required
    import numpy, scipy, netCDF4, pymatgen, apscheduler, pydispatch, yaml

    d = collections.OrderedDict([
        ("system", system),
        ("python_version", platform.python_version()),
        ("numpy", numpy.version.version),
        ("scipy", scipy.version.version),
        ("netCDF4", netCDF4.__version__),
        ("apscheduler", apscheduler.version),
        ("pydispatch", pydispatch.__version__),
        ("yaml", yaml.__version__),
        ("pymatgen", pymatgen.__version__),
    ])

    # Optional but strongly suggested.
    try:
        import matplotlib
        d["matplotlib"] = "%s (backend: %s)" % (matplotlib.__version__, matplotlib.get_backend())
    except ImportError:
        pass

    return d


def abicheck(verbose=0):
    """
    This function tests if the most important ABINIT executables
    can be found in $PATH and whether the python modules needed
    at run-time can be imported. Return string with error messages, empty if success.
    """
    from monty.termcolor import cprint
    err_lines = []
    app = err_lines.append

    try:
        manager = TaskManager.from_user_config()
    except Exception:
        manager = None
        app(_straceback())

    # Get info on the Abinit build.
    from abipy.core.testing import cmp_version
    from abipy.flowtk import PyFlowScheduler

    if manager is not None:
        cprint("AbiPy Manager:\n%s\n" % str(manager), color="green")
        build = AbinitBuild(manager=manager)
        if not build.has_netcdf: app("Abinit executable does not support netcdf")
        cprint("Abinitbuild:\n%s" % str(build), color="magenta")
        if verbose: cprint(str(build.info), color="magenta")
        print()
        if not cmp_version(build.version, min_abinit_version, op=">="):
            app("Abipy requires Abinit version >= %s but got %s" % (min_abinit_version, build.version))

    # Get info on the scheduler.
    try:
        scheduler = PyFlowScheduler.from_user_config()
        cprint("Abipy Scheduler:\n%s\n" % str(scheduler), color="yellow")
    except Exception as exc:
        app(_straceback())

    from tabulate import tabulate
    try:
        d = software_stack()
        cprint("Installed packages:", color="blue")
        cprint(tabulate(list(d.items()), headers=["Package", "Version"]), color="blue")
        print()
    except ImportError:
        app(_straceback())

    return "\n".join(err_lines)


def abipy_logo1():
    """http://www.text-image.com/convert/pic2ascii.cgi"""
    return r"""\

                 `:-                                                               -:`
         --`  .+/`                              `                                  `/+.  .-.
   `.  :+.   /s-                   `yy         .yo                                   -s/   :+. .`
 ./.  +o`   /s/           `-::-`   `yy.-::-`   `:-    .:::-`   -:`     .:`            /s/   :s- ./.
.o.  /o:   .oo.         .oyo++syo. `yyys++oys. -ys  -syo++sy+` sy-     +y:            .oo-   oo` `o.
++   oo.   /oo          yy-    -yy `yy:    .yy`-ys .ys`    /yo sy-     +y:             oo/   /o:  ++
+/   oo`   /oo         `yy.    .yy` yy.    `yy`-ys :ys     :yo oy/     oy:             +o/   :o:  /o
-/   :+.   -++`         -sy+::+yyy` .sy+::+yy- -ys :yys/::oys. `oyo::/syy:            `++-   /+.  /:
 --  `//    /+-           -/++/-//    -/++/-   `+: :yo:/++/.     .:++/:oy:            -+/   `+-  --
  `.`  -:    :/`                                   :yo                 +y:           `/:`  `:. `.`
        `..   .:.                                   .`                 `.           .:.  `..
                ...                                                               ...
"""


def abipy_logo2():
    """http://www.text-image.com/convert/pic2ascii.cgi"""
    return r"""\
MMMMMMMMMMMMMMMMNhdMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMdhmMMMMMMMMMMMMMMM
MMMMMMMMMddNMMmoyNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNyomMMmhmMMMMMMMM
MMMmmMMhomMMMy/hMMMMMMMMMMMMMMMMMMMN::MMMMMMMMMm:oMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMd+yMMMhomMmmMMM
MmsmMMs+NMMMy+yMMMMMMMMMMMNhyyhmMMMN::mhyyhmMMMNhdMMMMmhyydNMMMdyNMMMMMmyNMMMMMMMMMMMMy+yMMMh+dMmsmM
m+mMMy+hMMMd++mMMMMMMMMMm+:+ss+:+mMN:::/ss+:+mMd:/MMd/:+so/:oNM/:dMMMMMo:yMMMMMMMMMMMMm++dMMMo+NMN+m
osMMMo+mMMMy+oMMMMMMMMMM::dMMMMd:/MN::hMMMMd::Nd:/Mm:/NMMMMy:oM/:dMMMMMo:yMMMMMMMMMMMMMo+yMMMy+hMMso
oyMMMooNMMMyooMMMMMMMMMN::mMMMMm::NM::mMMMMN::Nd:/Mh:/MMMMMh:+Mo:yMMMMM+:yMMMMMMMMMMMMMooyMMMyohMMyo
dyMMMysmMMMdooNMMMMMMMMMd/:oyys:::NMd/:oyys::dMd:/Mh::/shyo:/mMN+:+yhs/::yMMMMMMMMMMMMNoodMMMysmMMyh
MddMMNyhMMMMysdMMMMMMMMMMMdyooydssMMMMdysoydMMMNsyMh:+hsosydMMMMMmysosho:yMMMMMMMMMMMMdsyMMMNydMMddM
MMNmNMMddMMMMhyNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMh:oMMMMMMMMMMMMMMMMMo:yMMMMMMMMMMMNyhMMMNhmMNmNMM
MMMMMMMMNmmMMMmhmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmNMMMMMMMMMMMMMMMMMNdMMMMMMMMMMMmhmMMNmmMMMMMMMM
MMMMMMMMMMMMMMMMmmNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNmmMMMMMMMMMMMMMMM
"""


def abipy_logo3():
    """http://www.text-image.com/convert/pic2ascii.cgi"""
    return r"""\
             `-.                                                  `--`
      -:. `//`              `/.       ::                           `+: `-:`
 --``+:  `o+        `.--.`  -y/.--.`  ::   `---`  `-     ..         `o+  `o-`--
:/  /o   /o-       -oo/:+s/ -yy+:/os- ss .oo/:/s+`:y.    yo          :o:  :o. /:
o-  o/   oo`       ss    /y..y/    ss ss +y`   -y::y-    yo          -o/  .o- -o
:-  //   /+.       :s+--/sy- +s/--+s: ss oyo:-:so``os:-:oyo          -+:  -+. -/
 -` `/.  `/:        `-:::-:`  `-::-`  -- oy-:::.    .:::-yo          //`  :- `-
   `  ..` `:-                            :+              /:         --` `-` `
            `.`                                                   ..`
"""
