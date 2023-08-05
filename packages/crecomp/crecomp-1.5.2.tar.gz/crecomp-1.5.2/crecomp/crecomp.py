# -*- coding: utf-8 -*-
# NAME
#         "cReComp"
# DESCRIPTION
#         This is a code generator for Reconfigurable Component
# 		  creator Reconfigurable Component
# LICENCE
#		  new BSD
#
# (c) Kazushi Yamashina

# requirements
# jinja2, veriloggen, pyverilog, iverilog

import os
import sys
import shutil
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'crecomp'))
from veriloggen import *
from optparse import OptionParser

import userlogic
import component
import verilog
import communication
import scrp_parser

VERSION = "1.5.2"

def main():

	USAGE = "Usage: crecomp [option] [file name] [-u user logic path]+\nversion : %s"%VERSION

	argvs = sys.argv
	argc = len(argvs)

	if argc < 2:
		print USAGE
		quit()

	optparser = OptionParser(USAGE)

	optparser.add_option("-u", "--userlogic", type="string", action="append",
									dest="userlogic", help="specifier your user logic name",
									default=[])
	optparser.add_option("-p", "--python_template", action="store",
									dest="python_templatename", help="specifier for template name",
									default=False)
	optparser.add_option("-s", "--scrp_template", action="store",
									dest="scrp_templatename", help="specifier for template name",
									default=False)
	optparser.add_option("-b", "--build", type="string", action="store", dest="scrp_path",
								default=False, help="specifier target scrp file to build for componentize")
	optparser.add_option("-t", "--test", type="string", action="store", dest="test_path",
								default=False, help="generate testbench of target user logic")


	(options, args) = optparser.parse_args()

	#include user logic
	userlogic_pathlist = options.userlogic

	userlogic_list = []

	for x in xrange(0,len(userlogic_pathlist)):
		ul_in = userlogic.Info()
		ul_in.get_userlogicinfo(userlogic_pathlist[x])
		userlogic_list.append(ul_in)

	if options.python_templatename != False:
		userlogic.generate_ulpyclass(options.python_templatename,userlogic_list)
		print "Generate %s successfully"%options.python_templatename

	elif options.scrp_templatename != False:
		scrp_parser.generate_scrptemplate(options.scrp_templatename, userlogic_list)
		print "Generate %s successfully"%options.scrp_templatename

	elif options.scrp_path != False:
		parser = scrp_parser.parse_scrp(options.scrp_path)

	elif options.test_path != False:
		for a_userlogic in userlogic_list:
			userlogic.generate_testbench(options.test_path, a_userlogic.filepath)
			print "Generate %s successfully"%options.test_path


if __name__ == '__main__':
	main()
