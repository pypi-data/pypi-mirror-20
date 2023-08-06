#!/usr/bin/env python
"""
Interface to the database of ABINIT input variables
"""
from __future__ import unicode_literals, division, print_function, absolute_import

import sys
import os
import argparse

from pprint import pprint
from monty.functools import prof_main
from abipy.core.release import __version__
from abipy.abilab import abinit_help
from abipy.abio.abivars_db import get_abinit_variables


def print_vlist(vlist, options):
    for v in vlist:
        print(repr(v))

    if options.verbose:
        for v in vlist: abinit_help(v)
    else:
        print("\nUse -v for more info")


@prof_main
def main():
    def str_examples():
        examples = """\
Usage example:
    abidoc.py man ecut        --> Show documentation for ecut input variable.
    abidoc.py apropos ecut    --> To search in the database for the variables related to ecut.
    abidoc.py find paw        --> To search in the database for the variables whose name contains paw
    abidoc.py list            --> Print full list of variables
    abidoc.py withdim natom   --> Print arrays depending on natom.
"""
        return examples

    def show_examples_and_exit(err_msg=None, error_code=1):
        """Display the usage of the script."""
        sys.stderr.write(str_examples())
        if err_msg: sys.stderr.write("Fatal Error\n" + err_msg + "\n")
        sys.exit(error_code)

    # Build the main parser.
    parser = argparse.ArgumentParser(epilog=str_examples(), formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('-V', '--version', action='version', version="%(prog)s version " + __version__)


    # Parent parser for common options.
    copts_parser = argparse.ArgumentParser(add_help=False)
    copts_parser.add_argument('-v', '--verbose', default=0, action='count', # -vv --> verbose=2
                              help='verbose, can be supplied multiple times to increase verbosity')
    copts_parser.add_argument('--loglevel', default="ERROR", type=str,
                              help="set the loglevel. Possible values: CRITICAL, ERROR (default), WARNING, INFO, DEBUG")

    var_parser = argparse.ArgumentParser(add_help=False)
    var_parser.add_argument('varname', help="ABINIT variable")

    # Create the parsers for the sub-commands
    subparsers = parser.add_subparsers(dest='command', help='sub-command help', description="Valid subcommands")

    # Subparser for man.
    p_man = subparsers.add_parser('man', parents=[copts_parser, var_parser], help="Show documentation for varname.")

    # Subparser for apropos.
    p_apropos = subparsers.add_parser('apropos', parents=[copts_parser, var_parser], help="Find variables related to varname.")

    # Subparser for find.
    p_find = subparsers.add_parser('find', parents=[copts_parser, var_parser],
                                   help="Find all variables whose name contains varname.")

    # Subparser for require.
    #p_require = subparsers.add_parser('require', parents=[copts_parser], help="Find all variables required by varname.")

    # Subparser for withdim.
    p_withdim = subparsers.add_parser('withdim', parents=[copts_parser],
                                      help="Find all arrays depending on the given dimension.")
    p_withdim.add_argument("dimname", help="Dimension name")

    # Subparser for list.
    p_list = subparsers.add_parser('list', parents=[copts_parser], help="List all variables.")
    p_list.add_argument('--mode', default="a",
                        help="Sorte mode, `a` for alphabethical, `s` for sections, `c` for characteristics.")

    try:
        options = parser.parse_args()
    except Exception as exc:
        show_examples_and_exit(error_code=1)

    # loglevel is bound to the string value obtained from the command line argument.
    # Convert to upper case to allow the user to specify --loglevel=DEBUG or --loglevel=debug
    import logging
    numeric_level = getattr(logging, options.loglevel.upper(), None)
    if not isinstance(numeric_level, int):
        raise ValueError('Invalid log level: %s' % options.loglevel)
    logging.basicConfig(level=numeric_level)

    database = get_abinit_variables()

    if options.command == "man":
        abinit_help(options.varname)

    elif options.command == "apropos":
        vlist = database.apropos(options.varname)
        print_vlist(vlist, options)

    elif options.command == "find":
        vlist = [v for v in database.values() if options.varname in v.varname]
        print("find results:\n")
        print_vlist(vlist, options)

    elif options.command == "list":
        if options.mode == "a":
            # Alphabetical
            for i, var in enumerate(database.values()):
                print(i, repr(var))

        elif options.mode == "s":
            # Grouped by sections.
            for section in database.sections:
                header = 30*"#" +  " Section: " + section + " " + 30*"#"
                print(header)
                print_vlist(database.vars_with_section(section), options)

        elif options.mode == "c":
            # Grouped by characteristics.
            for char in database.characteristics:
                header = 30*"#" +  " Characteristic: " + char + 30*"#"
                print(header)
                print_vlist(database.vars_with_char(char), options)

        else:
            raise ValueError("Wrong mode %s" % options.mode)

    elif options.command == "withdim":
        for var in database.values():
            if var.isarray and options.dimname in str(var.dimensions):
                print(repr(var), "\n", str(var.dimensions), "\n") # type(var.dimensions)

    else:
        raise ValueError("Don't know how to handle command %s" % options.command)


if __name__ == "__main__":
    sys.exit(main())
