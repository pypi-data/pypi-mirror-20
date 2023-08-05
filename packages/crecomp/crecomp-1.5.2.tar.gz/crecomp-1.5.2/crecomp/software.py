from jinja2 import Environment, FileSystemLoader
import os
import shutil
TEMPLATE = os.path.dirname(os.path.abspath(__file__)) + '/template/'

def generate_cpp_xillybus_interface(component):
	env = Environment(loader=FileSystemLoader(TEMPLATE, encoding='utf8'))
	xillybus = []
	for com in component.module["communication"]:
		if com.__class__.__name__ == "Xillybus_fifo":
			xillybus.append(com)
	tpl = env.get_template('software/cpp_xillybus.jinja2')
	cpp = tpl.render({'comp': component, 'xillybus': xillybus})
	return cpp

def generate_cpp_xillibus_makefile(module, compname):
	env = Environment(loader=FileSystemLoader(TEMPLATE, encoding='utf8'))
	xillybus = []
	for com in module["communication"]:
		if com.__class__.__name__ == "Xillybus_fifo":
			xillybus.append(com)
	tpl = env.get_template('software/cpp_xillybus_makefile.jinja2')
	makefille = tpl.render({'compname': compname})
	return makefille

def generate_py_xillybus_interface(component):
	env = Environment(loader=FileSystemLoader(TEMPLATE, encoding='utf8'))
	tpl = env.get_template('software/py_xillybus.jinja2')

	input_var_list = []
	output_var_list = []
	for com in component.module["communication"]:
		for rcv in com.rcvlist:
			(signame,reset,depth) = rcv
			for reg in component.module['reg']:
				if reg.name == signame:
					bitwidth = com.fifo_width
					input_var_list.append(("input_%s"%signame, bitwidth, reg.bit, depth))

		for snd in com.sndlist:
			(signame,reset,depth) = snd
			for wire in component.module['wire']:
				if wire.name == signame:
					bitwidth = com.fifo_width
					output_var_list.append(("output_%s"%signame, bitwidth, wire.bit, depth))

	py = tpl.render({'comp': component, 'input_var_list': input_var_list, 'output_var_list': output_var_list,})
	return py

def generate_ros_package(component):
	compname = component.name
	module = component.module

	package_path = "%s/software/ros_package/%s"%(compname,compname)

	if os.path.isdir("%s"%(package_path)) == False:
		os.makedirs("%s"%(package_path))
	# if os.path.isdir("%s/src"%(package_path)) == False:
	# 	os.makedirs("%s/src"%(package_path))
	if os.path.isdir("%s/include/%s"%(package_path,compname)) == False:
		os.makedirs("%s/include/%s"%(package_path,compname))
	if os.path.isdir("%s/msg"%(package_path)) == False:
		os.makedirs("%s/msg"%(package_path))
	if os.path.isdir("%s/scripts"%(package_path)) == False:
		os.makedirs("%s/scripts"%(package_path))

	msg_file = open("%s/msg/%sMsg.msg"%(package_path,compname[0].upper()+compname[1:]), "w")
	cmakelists = open("%s/CMakeLists.txt"%(package_path), "w")
	package_xml = open("%s/package.xml"%(package_path), "w")
	# cpp = open("%s/src/%s.cpp"%(package_path,compname), "w")
	# shutil.copy("%s/software/lib_cpp.h"%compname, "%s/include/%s/lib_cpp.h"%(package_path,compname))
	shutil.copy("%s/software/bridge.py"%compname, "%s/scripts/bridge.py"%(package_path))
	py = open("%s/scripts/%s_node.py"%(package_path,compname), "w")
	test_py = open("%s/scripts/test_node.py"%(package_path), "w")

	# generate package.xml
	env = Environment(loader=FileSystemLoader(TEMPLATE, encoding='utf8'))
	tpl = env.get_template('software/ros_package_xml.jinja2')
	tmp = tpl.render({'compname': compname})
	package_xml.write(tmp)
	package_xml.close()

	# generate CMakeLists.txt
	tpl = env.get_template('software/ros_cmakelists.jinja2')
	tmp = tpl.render({'compname': compname})
	cmakelists.write(tmp)
	cmakelists.close()

	# generate message file
	input_var_list = []
	output_var_list = []
	for com in module["communication"]:
		for rcv in com.rcvlist:
			(signame,reset, depth) = rcv
			for reg in component.module['reg']:
				if reg.name == signame:
					if reg.bit <= 8:
						bitwidth = 8
					elif reg.bit <= 16:
						bitwidth = 16
					elif reg.bit <= 32:
						bitwidth = 32
					input_var_list.append(("input_%s"%signame, bitwidth, reg.bit, depth))
					msg_file.write("int%d input_%s\n"%(bitwidth,signame))

		for snd in com.sndlist:
			(signame,reset,depth) = snd
			for wire in component.module['wire']:
				if wire.name == signame:
					if wire.bit <= 8:
						bitwidth = 8
					elif wire.bit <= 16:
						bitwidth = 16
					elif wire.bit <= 32:
						bitwidth = 32
					output_var_list.append(("output_%s"%signame, bitwidth, wire.bit, depth))
					msg_file.write("int%d output_%s\n"%(bitwidth, signame))

	msg_file.write("int32 id\n")

	# # generate src
	# xillybus = []
	# for com in component.module["communication"]:
	# 	if com.__class__.__name__ == "Xillybus_fifo":
	# 		xillybus.append(com)
	# tpl = env.get_template('software/ros_src.jinja2')
	# tmp = tpl.render({'comp': component, 'xillybus': xillybus,
	# 				'input_var_list': input_var_list, 'output_var_list': output_var_list,})

	# cpp.write(tmp)
	# cpp.close()

	del input_var_list[:]
	del output_var_list[:]
	for com in component.module["communication"]:
		for rcv in com.rcvlist:
			(signame,reset,depth) = rcv
			for reg in component.module['reg']:
				if reg.name == signame:
					bitwidth = com.fifo_width
					input_var_list.append(("input_%s"%signame, bitwidth, reg.bit, depth))

		for snd in com.sndlist:
			(signame,reset,depth) = snd
			for wire in component.module['wire']:
				if wire.name == signame:
					bitwidth = com.fifo_width
					output_var_list.append(("output_%s"%signame, bitwidth, wire.bit, depth))

	tpl = env.get_template('software/ros_scripts_py.jinja2')
	tmp = tpl.render({'comp': component, 'input_var_list': input_var_list, 'output_var_list': output_var_list,})
	py.write(tmp)
	py.close()

	tpl = env.get_template('software/ros_test_comp_py.jinja2')
	tmp = tpl.render({'comp': component})
	test_py.write(tmp)
	test_py.close()

if __name__ == '__main__':
	pass