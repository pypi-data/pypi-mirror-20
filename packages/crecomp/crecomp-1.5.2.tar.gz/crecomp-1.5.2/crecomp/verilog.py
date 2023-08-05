# Module Documentation
# This module contained definition of data structure for verilog
from jinja2 import Environment, FileSystemLoader
import os

TEMPLATE = os.path.dirname(os.path.abspath(__file__)) + '/template/'
class Sig(object):
	def __init__(self, name, bit):
		self.name = name
		self.bit = bit

class Input(Sig):
	pass

class Output(Sig):
	pass

class Inout(Sig):
	pass

class Reg(Sig):
	pass

class Wire(Sig):
	pass


# ------------------------ verilog generation functon ------------------------

def generate_userlogic_inst(ul):
	env = Environment(loader=FileSystemLoader(TEMPLATE, encoding='utf8'))
	tpl = env.get_template('ulinstance.jinja2')
	signals = []
	portnames = []
	for assign in ul.assignlist:
		(signal, portname) = assign
		signals.append(signal)
		portnames.append(portname)
	instance = tpl.render({'userlogicname': ul.name, 'uut': ul.uut,
							'signals': signals, 'portname': portnames })
	return instance

def generate_ports(module, compname, component):
	env = Environment(loader=FileSystemLoader(TEMPLATE, encoding='utf8'))
	tpl = env.get_template('ports.jinja2')
	ports = tpl.render({'compname': compname,
						'component':component,
						'input_ports': module["input"],
						'output_ports': module["output"],
						'inout_ports': module["inout"]})
	return ports

def generate_regwire(module):
	env = Environment(loader=FileSystemLoader(TEMPLATE, encoding='utf8'))
	tpl = env.get_template('regwire.jinja2')
	regwire = tpl.render({'user_regs': module["reg"],
						'user_wires': module["wire"]})
	return regwire

def generate_inst4top(compname, module):
	instance_top = '''//copy this instance to top module
//%s %s('''%(compname,compname)

	env = Environment(loader=FileSystemLoader(TEMPLATE, encoding='utf8'))

	for com in module["communication"]:
		if com.__class__.__name__ == "Xillybus_fifo":
			tpl = env.get_template('xillybus/xillybus_inst4top.jinja2')
			instance_top = instance_top + tpl.render({'com': com})

	tpl = env.get_template('inst4top.jinja2')
	for port in module["input"]:
		if module["communication"] != []:
			if ("din_" in port.name or 
				"wr_en_" in port.name or 
				"rd_en_" in port.name):
				pass
			else:
				instance_top = instance_top + tpl.render({'port': port, 'module': module})
				if module["output"] != [] or len(module["input"]) > module["input"].index(port) + 1:
					instance_top = instance_top + ","

	for port in module["output"]:
		if module["communication"] != []:
			if ("dout_" in port.name or 
				"full_" in port.name or 
				"empty_" in port.name):
				pass
			else:
				instance_top = instance_top + tpl.render({'port': port, 'module': module})
				if module["inout"] != [] or len(module["output"]) > module["output"].index(port) + 1:
					instance_top = instance_top + ",\n"

	for port in module["inout"]:
		instance_top = instance_top + tpl.render({'port': port, 'module': module})
		if len(module["inout"]) > module["inout"].index(port) + 1:
					instance_top = instance_top + ",\n"

	instance_top = instance_top + "//);\n"
	return instance_top

def generate_xillybus(com, module):
	state = 2
	env = Environment(loader=FileSystemLoader(TEMPLATE, encoding='utf8'))
	# ======================= generate parameter for xillybus =============================
	tpl = env.get_template('xillybus/xillybus_para_init_idle.jinja2')
	xillybus = tpl.render({'fifobit': com.fifo_width})

	if com.rcv_cycle > 0:
		tpl = env.get_template('xillybus/xillybus_para_readyrcv.jinja2')
		xillybus = xillybus + tpl.render({'fifobit': com.fifo_width, 'state': state})
		state = state + 1

		for x in xrange(0,com.rcv_cycle):
			tpl = env.get_template('xillybus/xillybus_para_rcv.jinja2')
			xillybus = xillybus + tpl.render({'fifobit': com.fifo_width, 'num': x, 'state': state})
			state = state + 1

		tpl = env.get_template('xillybus/xillybus_para_rcvend.jinja2')
		xillybus = xillybus + tpl.render({'fifobit': com.fifo_width, 'state': state})
		state = state + 1

	tpl = env.get_template('xillybus/xillybus_para_pose.jinja2')
	xillybus = xillybus + tpl.render({'fifobit': com.fifo_width, 'state': state})
	state = state + 1

	if com.snd_cycle > 0:
		tpl = env.get_template('xillybus/xillybus_para_readysnd.jinja2')
		xillybus = xillybus + tpl.render({'fifobit': com.fifo_width, 'state': state})
		state = state + 1

		for x in xrange(0,com.snd_cycle):
			tpl = env.get_template('xillybus/xillybus_para_snd.jinja2')
			xillybus = xillybus + tpl.render({'fifobit': com.fifo_width, 'num': x, 'state': state})
			state = state + 1

	tpl = env.get_template('xillybus/xillybus_para_end.jinja2')
	xillybus = xillybus + tpl.render({'fifobit': com.fifo_width, 'state': state})

	# ======================= generate instance  of fifo for xillybus =============================
	tpl = env.get_template('xillybus/xillybus_fifoinst.jinja2')
	xillybus = xillybus + tpl.render({'fifobit': com.fifo_width})


	# ======================= generate state machine for xillybus =============================
	tpl = env.get_template('xillybus/xillybus_fsm_idle.jinja2')
	fsm = tpl.render({'fifobit': com.fifo_width, 'rcv_cycle': com.rcv_cycle, 'snd_cycle': com.snd_cycle})

	if com.rcv_cycle > 0:
		tpl = env.get_template('xillybus/xillybus_fsm_rcv.jinja2')
		fsm = fsm + tpl.render({'fifobit': com.fifo_width, 'rcv_cycle': com.rcv_cycle, 'snd_cycle': com.snd_cycle})

	tpl = env.get_template('xillybus/xillybus_fsm_pose.jinja2')
	fsm = fsm + tpl.render({'fifobit': com.fifo_width, 'rcv_cycle': com.rcv_cycle, 'snd_cycle': com.snd_cycle, 'condition':com.rs_cond})

	if com.snd_cycle > 0:
		tpl = env.get_template('xillybus/xillybus_fsm_snd.jinja2')
		fsm = fsm + tpl.render({'fifobit': com.fifo_width, 'snd_cycle': com.snd_cycle})

	tpl = env.get_template('xillybus/xillybus_fsm.jinja2')
	xillybus = xillybus + tpl.render({'fifobit': com.fifo_width, 'fsm': fsm})

	# ======================= generate state machine for xillybus =============================
	rst_ports = ""
	no_rst_ports = ""
	if com.rcv_cycle > 0:
		rcvlist = []
		for rcv in com.rcvlist:
			(sig, reset, depth) = rcv
			rcvlist.append(sig)

		tpl = env.get_template('xillybus/xillybus_rcvfsm_rstport.jinja2')
		for port in rcvlist:
			rst_ports = rst_ports + tpl.render({'fifobit': com.fifo_width, 'port': port})

		for rcv in com.rcvlist:
			sig, reset, depth = rcv
			if int(reset) == 1:
				no_rst_ports = no_rst_ports + tpl.render({'fifobit': com.fifo_width, 'port': sig})
	ports = ""
	if com.rcv_cycle > 0:
		tpl = env.get_template('xillybus/xillybus_rcvfsm_assign.jinja2')
		msb = 0
		lsb = 0
		for port in rcvlist:
			for reg in module["reg"]:
				if reg.name == port:
					msb = lsb + reg.bit - 1
					break
			ports = ports + tpl.render({'fifobit': com.fifo_width, 'port': port, 'msb': msb, 'lsb': lsb})
			lsb = msb + 1

	tpl = env.get_template('xillybus/xillybus_rcvfsm.jinja2')
	xillybus = xillybus + tpl.render({'fifobit': com.fifo_width, 'no_rst_ports': no_rst_ports, 'rst_ports': rst_ports, 'assign_dataport': ports})

	# ======================= generate enable signal control for xillybus =============================
	tpl = env.get_template('xillybus/xillybus_enablectl.jinja2')
	xillybus = xillybus + tpl.render({'fifobit': com.fifo_width, 'com' :com})

	# ======================= generate assign block for xillybus ============================

	if com.snd_cycle > 0:
		tpl = env.get_template('xillybus/xillybus_assign.jinja2')
		msb = 0
		lsb = 0
		port = ""

		sndlist = []
		for snd in com.sndlist:
			(sig, reset, depth) = snd
			sndlist.append(sig)

		for port in sndlist:
			for wire in module["wire"]:
				if wire.name == port:
					msb = lsb + wire.bit - 1
					break
			xillybus = xillybus + tpl.render({'fifobit': com.fifo_width, 'msb':msb, 'lsb':lsb, 'port':port})
			lsb = msb + 1

	return xillybus