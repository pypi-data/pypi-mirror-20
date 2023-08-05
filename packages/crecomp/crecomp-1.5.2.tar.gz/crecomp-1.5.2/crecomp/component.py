#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import shutil
import verilog as vl
import userlogic
import communication
import software as sw
CLOCK = "clk"
RESET = "rst"

TEMPLATE = os.path.dirname(os.path.abspath(__file__)) + '/template/'
class Component(object):
	def __init__(self, compname):
		self.clock = "clk"
		self.reset = "rst"
		self.module = {
			"input": [],	# class object input
			"output": [],	# class object output
			"inout": [],	# class object inout

			"userlogic": [],	# class object userlogic

			"reg": [],# class object reg
			"wire": [],	# class object wire

			"communication": [] # class object for communication
		}
		self.name = compname
		self.ros_package = False
		self.assginlist = []

	def show_info(self):
		module = self.module
		compname = self.name

		print "===== Component name ====="
		print self.name

		print "===== input ====="
		for port in module["input"]:
			print port.__class__.__name__, port.bit, port.name

		print "\n===== output ====="
		for port in module["output"]:
			print port.__class__.__name__, port.bit, port.name

		print "\n===== inout ====="
		for port in module["inout"]:
			print port.__class__.__name__, port.bit, port.name

		print "\n===== reg ====="
		for port in module["reg"]:
			print port.__class__.__name__, port.bit, port.name

		print "\n===== wire ====="
		for port in module["wire"]:
			print port.__class__.__name__, port.bit, port.name

		print "\n===== usrlogic ====="
		for ul in module["userlogic"]:
			print ul.name

		print "\n===== communication ====="
		for com in module["communication"]:
			print com.__class__.__name__, com.fifo_width
			print "rcv cycle",com.rcv_cycle
			print "rcv signal list:"
			for rcv in com.rcvlist:
				print rcv[0]
			print "snd cycle",com.snd_cycle
			print "snd signal list:",
			for snd in com.sndlist:
				print snd[0]
			print "switch condition", com.rs_cond
			print "\n"

		print "\n===== ROS package generation ====="
		print self.ros_package

	def add_clk(self, name):
		self.clock = name

	def add_rst(self, name):
		self.reset = name

	def add_input(self, name, bit=1):
		if name == CLOCK or name == RESET:
			print "pre defined signal %s"%name
			return
		input = vl.Input(name, bit)
		self.module["input"].append(input)

	def add_output(self, name, bit=1):
		output = vl.Output(name, bit)
		self.module["output"].append(output)

	def add_inout(self, name, bit=1):
		inout = vl.Inout(name, bit)
		self.module["inout"].append(inout)

	def add_reg(self, name, bit=1):
		reg = vl.Reg(name, bit)
		self.module["reg"].append(reg)

	def add_wire(self, name, bit=1):
		wire = vl.Wire(name, bit)
		self.module["wire"].append(wire)

	def add_ul(self, ul):
		self.module["userlogic"].append(ul)

	def add_com(self, com):
		if com.__class__.__name__ == "Xillybus_fifo":
			for port in com.signals:
				if port.__class__.__name__ == "Input":
					self.module["input"].append(port)
				if port.__class__.__name__ == "Output":
					self.module["output"].append(port)
				if port.__class__.__name__ == "Inout":
					self.module["inout"].append(port)
				if port.__class__.__name__ == "Reg":
					self.module["reg"].append(port)
				if port.__class__.__name__ == "Wire":
					self.module["wire"].append(port)

		self.module["communication"].append(com)

	def assgin(self, to_sig="", to_lsb=0, to_msb=0, from_sig="", from_lsb=0, from_msb=0):
		self.assginlist.append()

	def ros_packaging(self):
		self.ros_package = True

	def componentize(self):
		self.module['input'].append(vl.Input(self.clock, 1))
		self.module['input'].append(vl.Input(self.reset, 1))
		compname = self.name
		module = self.module
		self.generate_hardware()
		self.generate_software()
		self.show_info()
		print "Generate component successfully"

	def generate_hardware(self):
		compname = self.name
		module = self.module
		# ===================== hardware generation	=====================
		if os.path.isdir("%s/hardware"%compname) == False:
			os.makedirs("%s/hardware"%compname)

		for ul in module["userlogic"]:
			shutil.copy(ul.filepath , "%s/hardware/%s.v"%(compname,ul.name))

		fo = open("%s/hardware/%s.v"%(compname, compname), "w")

		# generate in or out ports
		fo.write(vl.generate_ports(module, compname, self))

		#generate user register and wire
		fo.write(vl.generate_regwire(module))

		# generate instance for top module
		fo.write(vl.generate_inst4top(compname,module))

		if module["userlogic"] != []:
			for x in xrange(0,len(module["userlogic"])):
				userlogic.check_ulassign(module["userlogic"][x], module)
				fo.write(vl.generate_userlogic_inst(module["userlogic"][x]))
				fo.write("\n")

		#generate communication logic
		if module["communication"] != []:
			for x in xrange(0,len(module["communication"])):
				if module["communication"][x].__class__.__name__ == "Xillybus_fifo":
					communication.check_xillybus_assign(module["communication"][x], module)
					fo.write(vl.generate_xillybus(module["communication"][x], module))
		fo.write("\nendmodule")
		fo.close()

	def generate_software(self):
		compname = self.name
		module = self.module
		if os.path.isdir("%s/software"%compname) == False:
			os.makedirs("%s/software"%compname)
		shutil.copy("%ssoftware/lib_cpp.h"%TEMPLATE, "%s/software/lib_cpp.h"%compname)
		shutil.copy("%ssoftware/bridge.py"%TEMPLATE, "%s/software/bridge.py"%compname)

		# generate software interface
		fo = open("%s/software/%s.cpp"%(compname, compname), "w")
		fo.write(sw.generate_cpp_xillybus_interface(self))
		fo.close()

		fo = open("%s/software/Makefile"%(compname), "w")
		fo.write(sw.generate_cpp_xillibus_makefile(module,compname))
		fo.close()

		# generate software on python
		fo = open("%s/software/%s.py"%(compname, compname), "w")
		fo.write(sw.generate_py_xillybus_interface(self))
		fo.close()

		if self.ros_package == True:
			sw.generate_ros_package(self)

if __name__ == '__main__':
	pass
