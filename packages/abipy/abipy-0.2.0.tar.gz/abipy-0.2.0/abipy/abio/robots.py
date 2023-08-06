# coding: utf-8
"""Robots."""
from __future__ import print_function, division, unicode_literals, absolute_import

import sys
import os
import numpy as np

from collections import OrderedDict, deque
from monty.string import is_string, list_strings
from monty.functools import lazy_property
from pymatgen.analysis.eos import EOS
from abipy.tools.plotting import add_fig_kwargs, get_ax_fig_plt
from abipy.flowtk import Flow
from abipy.core.mixins import NotebookWriter


#__all__ = [
#    "abirobot",
#]


def abirobot(obj, ext, nids=None):
    """
    Factory function that builds and return the :class:`Robot` subclass from the file
    extension `ext`. `obj` can be a directory path, or a :class:`Flow` instance.
    `nids` is an optional list of node identifiers used to filter the tasks in the flow.

    Usage example:

    .. code-block:: python

        with abirobot(flow, "GSR") as robot:
            # do something with robot and close the GSR files when done.

        with abirobot("dirpath", "SIGRES") as robot:
            # do something with robot and close the SIGRES files when done.
    """
    for cls in Robot.__subclasses__():
        if cls.EXT in (ext, ext.upper()):
            return cls.open(obj, nids=nids)

    raise ValueError("Cannot find Robot subclass associated to extension %s\n" % ext +
                     "The list of supported extensions is:\n%s" %
                     [cls.EXT for cls in Robot.__subclasses__()])


class Robot(object):
    """
    The main function of a `Robot` is facilitating the extraction of the output data produced by
    multiple tasks in a :class:`Flow`. This is the base class from which all Robot subclasses should derive.
    A Robot supports the `with` context manager:

    Usage example:

    .. code-block:: python

        with Robot([("label1", "file1"), (label2, "file2")]) as robot:
            # Do something with robot. files are automatically closed when we exit.
    """
    # TODO
    # 1) Abstract interface from collections
    # 2) should __iter__  return (label, ncfile) or ncfile (not __getitem__ returns ncfiles.__getitem__ !!!
    # 3) replace ncfiles with files just to be consistent since we have DdbRobot!

    def __init__(self, *args):
        """
        args is a list of tuples (label, filepath)
        """
        self._ncfiles, self._do_close = OrderedDict(), OrderedDict()
        self._exceptions = deque(maxlen=100)

        for label, ncfile in args:
            self.add_file(label, ncfile)

    #@abstractmethod
    #def get_dataframe(self, **kwargs):

    @classmethod
    def class_for_ext(cls, ext):
        """Return the Robot subclass associated to the given extension."""
        for subcls in cls.__subclasses__():
            if subcls.EXT in (ext, ext.upper()):
                return subcls

        raise ValueError("Cannot find Robot subclass associated to extension %s\n" % ext +
                         "The list of supported extensions is:\n%s" %
                         [cls.EXT for cls in Robot.__subclasses__()])

    # Deprecated. Use class_for_ext
    for_ext = class_for_ext

    @classmethod
    def from_dir(cls, top, walk=True):
        """
        This class method builds a robot by scanning all files located within directory `top`.
        Note that if walk is True, directories inside `top` are included as well.
        This method should be invoked with a concrete robot class, for example:

            robot = GsrRobot.from_dir(".")

        Args:
            top (str): Root directory
        """
        top = os.path.abspath(top)

        from abipy.abilab import abiopen
        items = []
        if walk:
            for dirpath, dirnames, filenames in os.walk(top):
                filenames = [f for f in filenames if f.endswith(cls.EXT + ".nc") or f.endswith(cls.EXT)]
                for f in filenames:
                    ncfile = abiopen(os.path.join(dirpath, f))
                    if ncfile is not None: items.append((ncfile.filepath, ncfile))
        else:
            filenames = [f for f in os.listdir(top) if f.endswith(cls.EXT + ".nc") or f.endswith(cls.EXT)]
            for f in filenames:
                ncfile = abiopen(os.path.join(top, f))
                if ncfile is not None: items.append((ncfile.filepath, ncfile))

        return cls(*items)

    @classmethod
    def from_files(cls, filenames):
        """
        Build a Robot from a list of files.
        """
        # Refactor this. cls should be automatically detecteed from the extension in filenames[0]
        from abipy.abilab import abiopen
        filenames = [f for f in filenames if f.endswith(cls.EXT + ".nc") or f.endswith(cls.EXT)]
        items = []
        for f in filenames:
            try:
                ncfile = abiopen(f)
            except Exception:
                ncfile = None
            if ncfile is not None: items.append((ncfile.filepath, ncfile))
        return cls(*items)

    @classmethod
    def from_flow(cls, flow, outdirs="all", nids=None):
        """
        Build a robot from a Flow.

        Args:
            flow: :class:`Flow` object
            outdirs: String used to select/ignore the files in the output directory of flow, works and tasks
                outdirs="work" selects only the outdir of the Works,
                outdirs="flow+task" selects the outdir of the Flow and the outdirs of the tasks
                outdirs="-work" excludes the outdir of the Works.
                Cannot use `+` and `-` flags in the same string.
                Default: `all` that is equivalent to "flow+work+task"
            nids: List of node identifiers used to select particular nodes. Not used if None

        Returns:
            `Robot` subclass.
        """
        robot = cls()
        all_opts = ["flow", "work", "task"]

        if outdirs == "all":
            tokens = all_opts
        elif "+" in outdirs:
            assert "-" not in outdirs
            tokens = outdirs.split("+")
        elif "-" in outdirs:
            assert "+" not in outdirs
            tokens = [s for s in all if s not in outdirs.split("-")]
        else:
            tokens = list_strings(outdirs)

        if not all(t in all_opts for t in tokens):
            raise ValueError("Wrong outdirs string %s" % outdirs)

        if "flow" in tokens:
            robot.add_extfile_of_node(flow, nids=nids)

        if "work" in tokens:
            for work in flow:
                robot.add_extfile_of_node(work, nids=nids)

        if "task" in tokens:
            for task in flow.iflat_tasks():
                #print("task %s, nids %s" %  (task, nids))
                robot.add_extfile_of_node(task, nids=nids)

        return robot

    def add_extfile_of_node(self, node, nids=None):
        """
        Add the file produced by this node to the robot.
        """
        if nids and node.node_id not in nids: return
        filepath = node.outdir.has_abiext(self.EXT)
        if filepath:
            try:
                label = os.path.relpath(filepath)
            except OSError:
                # current working directory may not be defined!
                label = filepath

            self.add_file(label, filepath)

    def add_file(self, label, ncfile):
        """
        Add a file to the robot with the given label.

        Args:
            label: String used to identify the file (must be unique, ax exceptions is
                raised if label is already present.
            ncfile: Specify the file to be added. Accepts strings (filepath) or abipy file-like objects.
        """
        if is_string(ncfile):
            from abipy.abilab import abiopen
            ncfile = abiopen(ncfile)
            self._do_close[ncfile.filepath] = True

        if label in self._ncfiles:
            raise ValueError("label %s is already present!")

        self._ncfiles[label] = ncfile

    #def pop(self, label):

    @property
    def exceptions(self):
        """List of exceptions."""
        return self._exceptions

    def __len__(self):
        return len(self._ncfiles)

    def __iter__(self):
        return iter(self._ncfiles.items())

    def __getitem__(self, key):
        return self.ncfiles.__getitem__(key)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Activated at the end of the with statement."""
        self.close()

    def items(self):
        return self._ncfiles.items()

    def show_files(self, stream=sys.stdout):
        s = "\n".join(["%s --> %s" % (label, ncfile.filepath) for label, ncfile in self])
        stream.write(s)

    def __repr__(self):
        lines = ["%s with %d files in memory" % (self.__class__.__name__, len(self.ncfiles))]
        for i, f in enumerate(self.ncfiles):
            path = f.relpath if len(f.relpath) < len(f.filepath) else f.filepath
            lines.append("  [%d] %s" % (i, path))
        return "\n".join(lines)

    __str__ = __repr__

    @property
    def ncfiles(self):
        """List of netcdf files."""
        return list(self._ncfiles.values())

    def close(self):
        """
        Close all files that have been opened by the Robot
        """
        for ncfile in self.ncfiles:
            if self._do_close.pop(ncfile.filepath, False):
                try:
                    ncfile.close()
                except:
                    pass

    @classmethod
    def open(cls, obj, nids=None, **kwargs):
        """
        Flexible constructor. obj can be a :class:`Flow` or a string with the directory containing the Flow.
        nids is an optional list of :class:`Node` identifiers used to filter the set of :class:`Task` in the Flow.
        """
        has_dirpath = False
        if is_string(obj):
            try:
                obj = Flow.pickle_load(obj)
            except:
                has_dirpath = True

        if not has_dirpath:
            # We have a Flow. smeth is the name of the Task method used to open the file.
            items = []
            smeth = "open_" + cls.EXT.lower()
            for task in obj.iflat_tasks(nids=nids): #, status=obj.S_OK):
                open_method = getattr(task, smeth, None)
                if open_method is None: continue
                ncfile = open_method()
                if ncfile is not None: items.append((task.pos_str, ncfile))
            return cls(*items)

        else:
            # directory --> search for files with the appropriate extension and open it with abiopen.
            if nids is not None: raise ValueError("nids cannot be used when obj is a directory.")
            return cls.from_dir(obj)

    def _exec_funcs(self, funcs, arg):
        """
        Execute list of callable functions. Each function receives arg as argument.
        """
        if not isinstance(funcs, (list, tuple)): funcs = [funcs]
        d = {}
        for func in funcs:
            try:
                key, value = func(arg)
                d[key] = value
            except Exception as exc:
                self._exceptions.append(str(exc))
        return d

    def pairplot(self, data=None, getter="get_dataframe", map_kws=None, show=True, **kwargs):
        # TODO: Remove
        import matplotlib.pyplot as plt
        import seaborn.apionly as sns
        if data is None:
            data = getattr(self, getter)()

        #grid = sns.PairGrid(data, x_vars="nkpt", y_vars=["a", "volume"]) #, hue="tsmear")
        grid = sns.PairGrid(data, **kwargs)
        if map_kws is None:
            grid.map(plt.plot, marker="o")
        else:
            func = map_kws.pop("func", plt.plot)
            grid.map(func, **map_kws)

        grid.add_legend()
        if show: plt.show()
        return grid


class GsrRobot(Robot, NotebookWriter):
    """
    This robot analyzes the results contained in multiple GSR files.
    """
    EXT = "GSR"

    def get_dataframe(self, **kwargs):
        """
        Return a pandas DataFrame with the most important GS results.

        kwargs:
            attrs:
                List of additional attributes of the :class:`GsrFile` to add to
                the pandas :class:`DataFrame`
            funcs:
                Function or list of functions to execute to add more data to the DataFrame.
                Each function receives a :class:`GsrFile` object and returns a tuple (key, value)
                where key is a string with the name of column and value is the value to be inserted.
        """
        # TODO add more columns
        # Add attributes specified by the users
        attrs = [
            "energy", "pressure", "max_force",
            "ecut", "pawecutdg",
            "tsmear", "nkpt",
            "nsppol", "nspinor", "nspden",
        ] + kwargs.pop("attrs", [])

        rows, row_names = [], []
        for label, gsr in self:
            row_names.append(label)
            d = OrderedDict()
            for aname in attrs:
                if aname == "nkpt":
                    value = len(gsr.ebands.kpoints)
                else:
                    value = getattr(gsr, aname, None)
                    if value is None: value = getattr(gsr.ebands, aname, None)
                d[aname] = value

            # Add info on structure.
            if kwargs.get("with_geo", True):
                d.update(gsr.structure.get_dict4frame(with_spglib=True))

            # Execute funcs.
            d.update(self._exec_funcs(kwargs.get("funcs", []), gsr))
            rows.append(d)

        import pandas as pd
        return pd.DataFrame(rows, index=row_names, columns=list(rows[0].keys()))

    def get_ebands_plotter(self):
        from abipy import abilab
        plotter = abilab.ElectronBandsPlotter()
        for label, gsr in self:
            plotter.add_ebands(label, gsr.ebands)
        return plotter

    def eos_fit(self, eos_name="murnaghan"):
        """
        Fit E(V)
        For the list of available models, see EOS.MODELS

        TODO: which default? all should return a list of fits
        """
        # Read volumes and energies from the GSR files.
        energies, volumes = [], []
        for label, gsr in self:
            energies.append(gsr.energy)
            volumes.append(gsr.structure.volume)

        # Note that eos.fit expects lengths in Angstrom, and energies in eV.
        if eos_name != "all":
            return EOS(eos_name=eos_name).fit(volumes, energies)
        else:
            # Use all the available models.
            fits, rows = [], []
            for eos_name in EOS.MODELS:
                fit = EOS(eos_name=eos_name).fit(volumes, energies)
                fits.append(fit)
                rows.append(fit.results)

            import pandas as pd
            frame = pd.DataFrame(rows, index=EOS.MODELS, columns=list(rows[0].keys()))
            return fits, frame

    def write_notebook(self, nbpath=None):
        """
        Write an ipython notebook to nbpath. If nbpath is None, a temporay file in the current
        working directory is created. Return path to the notebook.
        """
        nbformat, nbv, nb = self.get_nbformat_nbv_nb(title=None)

        args = [(l, f.filepath) for l, f in self.items()]
        nb.cells.extend([
            #nbv.new_markdown_cell("# This is a markdown cell"),
            nbv.new_code_cell("robot = abilab.GsrRobot(*%s)\nprint(robot)" % str(args)),
            nbv.new_code_cell("plotter = robot.get_ebands_plotter()"),
            nbv.new_code_cell("frame = plotter.get_ebands_frame()\ndisplay(frame)"),
            nbv.new_code_cell("fig = plotter.gridplot()"),
            nbv.new_code_cell("fig = plotter.combiplot()"),
            nbv.new_code_cell("fig = plotter.boxplot()"),
            nbv.new_code_cell("fig = plotter.combiboxplot()"),
            nbv.new_code_cell("anim = plotter.animate()"),
        ])

        return self._write_nb_nbpath(nb, nbpath)


class SigresRobot(Robot):
    """
    This robot analyzes the results contained in multiple SIGRES files.
    """
    EXT = "SIGRES"

    def merge_dataframes_sk(self, spin, kpoint, **kwargs):
        for i, (label, sigr) in enumerate(self):
            frame = sigr.get_dataframe_sk(spin, kpoint, index=label)
            if i == 0:
                table = frame
            else:
                table = table.append(frame)

        return table

    def get_qpgaps_dataframe(self, spin=None, kpoint=None, **kwargs):
        # TODO: Ideally one should select the k-point for which we have the fundamental gap for the given spin
        if spin is None: spin = 0
        if kpoint is None: kpoint = 0

        attrs = [
            "nsppol", #"nspinor", "nspden", #"ecut", "pawecutdg",
            #"tsmear", "nkibz",
        ] + kwargs.pop("attrs", [])

        rows, row_names = [], []
        for label, sigres in self:
            row_names.append(label)
            d = OrderedDict()
            for aname in attrs:
                d[aname] = getattr(sigres, aname, None)
            d.update({"qpgap": sigres.get_qpgap(spin, kpoint)})

            # Add convergence parameters
            d.update(sigres.params)

            # Add info on structure.
            if kwargs.get("with_geo", False):
                d.update(sigres.structure.get_dict4frame(with_spglib=True))

            # Execute funcs.
            d.update(self._exec_funcs(kwargs.get("funcs", []), sigres))
            rows.append(d)

        import pandas as pd
        return pd.DataFrame(rows, index=row_names, columns=list(rows[0].keys()))

    def plot_conv_qpgap(self, x_vars, **kwargs):
        """
        Plot the convergence of the Quasi-particle gap.
        kwargs are passed to :class:`seaborn.PairGrid`.
        """
        import matplotlib.pyplot as plt
        import seaborn.apionly as sns

        data = self.get_qpgaps_dataframe()
        print(list(data.keys()))
        grid = sns.PairGrid(data, x_vars=x_vars, y_vars="qpgap", **kwargs)
        grid.map(plt.plot, marker="o")
        grid.add_legend()
        plt.show()


class MdfRobot(Robot):
    """
    This robot analyzes the results contained in multiple MDF files.
    """
    EXT = "MDF.nc"

    def get_mdf_plotter(self):
        from abipy.electrons.bse import MdfPlotter
        plotter = MdfPlotter()
        for label, mdf in self:
            plotter.add_mdf(label, mdf.exc_mdf)
        return plotter

    def get_dataframe(self, **kwargs):
        rows, row_names = [], []
        for i, (label, mdf) in enumerate(self):
            row_names.append(label)
            d = OrderedDict([
                ("exc_mdf", mdf.exc_mdf),
                ("rpa_mdf", mdf.rpanlf_mdf),
                ("gwrpa_mdf", mdf.gwnlf_mdf),
            ])
            #d = {aname: getattr(mdf, aname) for aname in attrs}
            #d.update({"qpgap": mdf.get_qpgap(spin, kpoint)})

            # Add convergence parameters
            d.update(mdf.params)

            # Add info on structure.
            if kwargs.get("with_geo", False):
                d.update(mdf.structure.get_dict4frame(with_spglib=True))

            # Execute funcs.
            d.update(self._exec_funcs(kwargs.get("funcs", []), mdf))
            rows.append(d)

        import pandas as pd
        return pd.DataFrame(rows, index=row_names, columns=list(rows[0].keys()))

    @add_fig_kwargs
    def plot_conv_mdf(self, hue, mdf_type="exc_mdf", **kwargs):
        import matplotlib.pyplot as plt
        frame = self.get_dataframe()
        grouped = frame.groupby(hue)

        fig, ax_list = plt.subplots(nrows=len(grouped), ncols=1, sharex=True, sharey=True, squeeze=True)

        for i, (hue_val, group) in enumerate(grouped):
            #print(group)
            mdfs = group[mdf_type]
            ax = ax_list[i]
            ax.set_title("%s = %s" % (hue, hue_val))
            for mdf in mdfs:
                mdf.plot_ax(ax)

        return fig


class DdbRobot(Robot):
    """
    This robot analyzes the results contained in multiple DDB files.
    """
    EXT = "DDB"

    def get_qpoints_union(self):
        """
        Return numpy array with the q-points in reduced coordinates found in the DDB files.
        """
        qpoints = []
        for label, ddb in enumerate(self):
            qpoints.extend(q for q in ddb.qpoints if q not in qpoints)

        return np.array(qpoints)

    #@property
    #def qpoints_intersection(self):
    #    """Return numpy array with the q-points in reduced coordinates found in the DDB files."""
    #    qpoints = []
    #    for label, ddb in enumerate(self):
    #        qpoints.extend(q for q in ddb.qpoints if q not in qpoints)
    #    return np.array(qpoints)

    def get_dataframe_at_qpoint(self, qpoint=None, asr=2, chneut=1, dipdip=1, **kwargs):
        """
        Return a pandas table with the phonon frequencies at the given q-point
        as computed from the different DDB files.

        Args:
            qpoint: Reduced coordinates of the qpoint where phonon modes are computed
            asr, chneut, dipdp: Anaddb input variable. See official documentation.
        """
        # If qpoint is None, all the DDB must contain have the same q-point .
        if qpoint is None:
            if not all(len(ddb.qpoints) == 1 for ddb in self.ncfiles):
                raise ValueError("Found more than one q-point in the DDB file. qpoint must be specified")
            qpoint = self[0].qpoints[0]
            if any(np.any(ddb.qpoints[0] != qpoint) for ddb in self.ncfiles):
                raise ValueError("All the q-points in the DDB files must be equal")

        rows, row_names = [], []
        for i, (label, ddb) in enumerate(self):
            row_names.append(label)
            d = OrderedDict()
            #d = {aname: getattr(ddb, aname) for aname in attrs}
            #d.update({"qpgap": mdf.get_qpgap(spin, kpoint)})

            # Call anaddb to get the phonon frequencies.
            phbands = ddb.anaget_phmodes_at_qpoint(qpoint=qpoint, asr=asr, chneut=chneut, dipdip=dipdip)
            freqs = phbands.phfreqs[0, :]  # (nq, nmodes)

            d.update({"mode" + str(i): freqs[i] for i in range(len(freqs))})

            # Add convergence parameters
            d.update(ddb.params)

            # Add info on structure.
            if kwargs.get("with_geo", True):
                d.update(phbands.structure.get_dict4frame(with_spglib=True))

            # Execute funcs.
            d.update(self._exec_funcs(kwargs.get("funcs", []), ddb))

            rows.append(d)

        import pandas as pd
        return pd.DataFrame(rows, index=row_names, columns=list(rows[0].keys()))

    def plot_conv_phfreqs_qpoint(self, x_vars, qpoint=None, **kwargs):
        """
        Plot the convergence of the phonon frequencies.
        kwargs are passed to :class:`seaborn.PairGrid`.
        """
        import matplotlib.pyplot as plt
        import seaborn.apionly as sns

        # Get the dataframe for this q-point.
        data = self.get_dataframe_at_qpoint(qpoint=qpoint)

        y_vars = sorted([k for k in data if k.startswith("mode")])
        #print(y_vars)

        # Call seaborn.
        grid = sns.PairGrid(data, x_vars=x_vars, y_vars=y_vars, **kwargs)
        grid.map(plt.plot, marker="o")
        grid.add_legend()
        plt.show()

    # TODO
    #def get_phbands_plotter(self):
    #    from abipy import abilab
    #    plotter = abilab.PhononBandsPlotter()
    #    for label, ddb in self:
    #        plotter.add_ebands(label, ddb.ebands)
    #    return plotter
