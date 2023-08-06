#!/usr/bin/env python
"""
This example shows how to plot the Kohn-Sham energies with
markers providing a graphical representation of the GW results.
"""
import abipy.data as abidata
from abipy.abilab import abiopen

sigres = abiopen(abidata.ref_file("tgw1_9o_DS4_SIGRES.nc"))

# Plot the KS energies with markers whose size is proportional to the difference E_GW - E_KS
# Multiply the difference by 1000 to make the markers more visible.
sigres.plot_ksbands_with_qpmarkers(qpattr="qpeme0", fact=1000)

# The list of available qpattr:
#from abipy.electrons.import QPState
#print(QPState.get_fields)

#sigres.plot_ksbands_with_qpmarkers(qpattr="vxcme", fact=1000)
