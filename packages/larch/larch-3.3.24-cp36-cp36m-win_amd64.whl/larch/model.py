
from .core import Model2, LarchError, _core, ParameterAlias, Facet, Fountain, ProvisioningError, ModelParameter, LinearComponent, LinearFunction
from .array import SymmetricArray
from .util.pmath import category, pmath, rename
from .util.categorize import Renamer, Categorizer
import numpy
import os
from .util.xhtml import XHTML, XML_Builder
import math
from .model_reporter import ModelReporter
import base64
from .util.attribute_dict import function_cache
from .model_shadowmanager import shadow_manager, metaparameter_manager
from .model_parametermanager import ParameterManager
from .model_datamanager import DataManager, WorkspaceManager
from .jupyter import JupyterManager
from .util.statsummary import statistical_summary

class MetaParameter():
	def __init__(self, name, value, under, initial_value=None):
		self._name = name
		self._value = value
		self.under = under
		self._initial_value = initial_value
	@property
	def name(self):
		return self._name
	@property
	def value(self):
		return self._value
	@property
	def initial_value(self):
		return self._initial_value




class Model(Model2, ModelReporter):

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self._cached_results = function_cache()
		self._setweakself(self)
		if self.option.author == "Chuck Finley":
			try:
				import getpass
				auth = getpass.getuser()
				if auth:
					self.option.author = auth
			except:
				pass


	from .util.roll import roll, session_log, stop_session_log
	
	from .util.optimize import (
		maximize_loglike,
		parameter_bounds,
		_scipy_check_grad,
		network_based_constraints,
		evaluate_network_based_constraints,
		optimizers, weight_choice_rebalance,
		_build_constraints,
		_compute_constrained_d2_loglike_and_bhhh,
		_compute_constrained_covariance,
		_bounds_as_constraints,
	)

	from .util.plotting import (
		new_xhtml_computed_factor_figure_with_derivative,
		svg_computed_factor_figure_with_derivative,
		new_xhtml_validation_distribution,
		svg_validation_distribution,
		new_xhtml_validation_latlong,
		svg_validation_latlong,
		svg_observations_latlong,
	)
	
	
	def dir(self):
		for f in dir(self):
			print(" ",f)

	@staticmethod
	def Example(n=1, d=None, pre=False):
		from . import examples
		if not pre:
			try:
				return examples._exec_example_n( n, d=d )
			except KeyError:
				pass
		examples.load_example(n, pre)
		if d is None:
			m = examples.model(examples.data())
		else:
			m = examples.model(d)
		return m

	@property
	def shadow_parameter(self):
		return shadow_manager(self)

	def px(self, n):
		if isinstance(n,str):
			raise LarchError("not implemented")
		return ModelParameter(self, n)

	def stash_parameters(self, ticket='generic', stashdir=None):
		if ticket=='generic' and self.title:
			ticket = self.title
		import json
		if stashdir is None:
			try:
				import appdirs
			except ImportError:
				raise TypeError("no stashdir given and appdirs not available")
			else:
				stashdir = appdirs.user_cache_dir('larch')
		from .util.filemanager import next_stack
		os.makedirs(stashdir, exist_ok=True)
		filename = next_stack(os.path.join(stashdir, 'ticket_{}.json'.format(ticket)))
		parms={}
		for p in self:
			parms[p.name] = p.value
		with open(filename, 'a') as s:
			json.dump(parms, s)

	def unstash_parameters(self, ticket='generic', stashdir=None):
		self._parameter_inclusion_check()
		if ticket=='generic' and self.title:
			ticket = self.title
		import json
		if stashdir is None:
			try:
				import appdirs
			except ImportError:
				raise TypeError("no stashdir given and appdirs not available")
			else:
				stashdir = appdirs.user_cache_dir('larch')
		from .util.filemanager import latest_matching
		filename = latest_matching(os.path.join(stashdir, 'ticket_{}.*.json'.format(ticket)))
		if filename is None:
			return
		parms = {}
		with open(filename, 'r') as s:
			parms = json.load(s)
		for p in self:
			if p.name in parms:
				val = parms[p.name]
				if p.holdfast:                # Don't change fixed parameters
					pass
				elif not numpy.isfinite(val): # Don't load infinte or NaN values
					pass
				elif val < p.min_value:       # Enforce min
					p.value = p.min_value
				elif val > p.max_value:       # Enforce max
					p.value = p.max_value
				else:
					p.value = val



	def add_parameter(self, name, **kwargs):
		if isinstance(name, ModelParameter):
			mp = name
			name = mp.name
			kwargs['value'] = mp.value
			kwargs['null_value'] = mp.null_value
			kwargs['initial_value'] = mp.initial_value
			kwargs['minimum'] = mp.minimum
			kwargs['maximum'] = mp.maximum
			kwargs['holdfast'] = mp.holdfast
		if name not in self._parameter_name_index:
			i = self._parameter_name_index[name]
			self.resize_allocated_memory()
		else:
			i = self._parameter_name_index[name]
		par = self.px(i)
		for key,value in kwargs.items():
			setattr(par,key,value)
		return par

	def _parameter_inclusion_check(self):
		def is_it_there(x, val=0):
			if x in self:
				return
			if self.option.autocreate_parameters:
				self.parameter(x, value=val, null_value=val)
			else:
				raise KeyError("parameter {} not found, option.autocreate=False".format(x))
		# utility
		for i in self.utility.ca:
			is_it_there(i.param)
		for j in self.utility.co:
			for i in self.utility.co[j]:
				is_it_there(i.param)
		# quantity
		for i in self.quantity:
			is_it_there(i.param)
		# samplingbias
		for i in self.samplingbias.ca:
			is_it_there(i.param)
		for j in self.samplingbias.co:
			for i in self.samplingbias.co[j]:
				is_it_there(i.param)
		# nest
		for n in self.nest.nodes():
			is_it_there(self.nest[n].param, val=1)
			
	def setUp(self, *arg, **kwarg):
		self._parameter_inclusion_check()
		super().setUp(*arg, **kwarg)

	def parameter_wide(self, name):
		if isinstance(name, rename):
			found = []
			if name.name in self:
				found.append(name.name)
			for i in name.members:
				if i in self:
					found.append(i)
			if len(found)==0:
				raise LarchError("model does not contain "+name.name+" nor "+(" nor ".join(found)))
			elif len(found)==1:
				return self.parameter_wide(found[0])
			else:
				raise LarchError("model contains "+(" and ".join(found)))
		else:
			try:
				ret = self.alias(name)
#				try:
#					ret.set_referred_modelparam( self.parameter_wide(ret.refers_to) )
#				except AttributeError:
#					pass
				return ret
			except (LarchError, KeyError):
				return self.parameter(name)

	def _parameter_(self, *arg, **kwarg):
		if 'max_value' in kwarg:
			kwarg['max'] = kwarg['max_value']
			del kwarg['max_value']
		if 'min_value' in kwarg:
			kwarg['min'] = kwarg['min_value']
			del kwarg['min_value']
		return super().parameter(*arg, **kwarg)

	@property
	def parameter(self):
		"""A :class:`ParameterManager` interface for the model."""
		return ParameterManager(self)

	@property
	def metaparameter(self):
		"""A metaparameter interface for the model."""
		return metaparameter_manager(self)


	@property
	def data(self):
		"""A :class:`DataManager` interface for the model."""
		return DataManager(self)

	@property
	def dataedit(self):
		"""A :class:`DataManager` interface for the model, with editable access to arrays."""
		return DataManager(self, False)

	@property
	def workspace(self):
		"""A :class:`WorkspaceManager` interface for the model."""
		return WorkspaceManager(self)

	work = workspace

	@property
	def jupyter(self):
		"""A :class:`JupyterManager` interface for the model."""
		return JupyterManager(self)



#	def metaparameter(self, name):
#		try:
#			x = self.alias(name)
#		except LarchError:
#			if name not in self.parameter_names():
#				raise LarchError("cannot find '{}' in model".format(name))
#			x = self.parameter(name)
#			return MetaParameter(name, x.value, x, x.initial_value)
#		else:
#			return MetaParameter(name, self.metaparameter(x.refers_to).value * x.multiplier, x, self.metaparameter(x.refers_to).initial_value* x.multiplier)

	def param_sum(self,*arg):
		value = 0
		found_any = False
		for p in arg:
			if isinstance(p,str) and p in self:
				value += self.metaparameter(p).value
				found_any = True
			elif isinstance(p,(int,float)):
				value += p
		if not found_any:
			raise LarchError("no parameters with any of these names: {}".format(str(arg)))
		return value

	def param_product(self,*arg):
		value = 1
		found_any = False
		for p in arg:
			if isinstance(p,str) and p in self:
				value *= self.metaparameter(p).value
				found_any = True
			elif isinstance(p,(int,float)):
				value *= p
		if not found_any:
			raise LarchError("no parameters with any of these names: {}".format(str(arg)))
		return value

	def param_ratio(self, numerator, denominator):
		if isinstance(numerator,str):
			if numerator in self:
				value = self.metaparameter(numerator).value
			else:
				raise LarchError("numerator {} not found".format(numerator))
		elif isinstance(numerator,(int,float)):
			value = numerator
		if isinstance(denominator,str):
			if denominator in self:
				value /= self.metaparameter(denominator).value
			else:
				raise LarchError("denominator {} not found".format(denominator))
		elif isinstance(denominator,(int,float)):
			value /= denominator
		return value

	def _set_nest(self, *args):
		_core.Model2_nest_set(self, *args)
		self.freshen()
	_nest_doc = """\
	A function-like object mapping node codes to names and parameters.
	
	This can be called as if it was a normal method of :class:`Model`.
	It also is an object that acts like a dict with integer keys 
	representing the node code numbers and :class:`larch.core.LinearComponent`
	values.
	
	Parameters
	----------
	id : int
		The code number of the nest. Must be unique to this nest among the 
		set of all nests and all elemental alternatives.
	name : str or None
		The name of the nest. This name is used in various reports.
		It can be any string but generally something short and descriptive
		is useful. If None, the name is set to "nest_{id}".
	parameter : str or None
		The name of the parameter to associate with this nest.  If None, 
		the `name` is used.
		
	Other Parameters
	----------------
	parent : int, optional
		The code number of the parent node of the nest, for which a link
		will automatically be created.
	parents : list of ints, optional
		A list of code numbers for the parent nodes of the nest, for which
		links will automatically be created.
	children : list of ints, optional
		A list of code numbers for the child nodes of the nest, for which
		links will automatically be created.
		
	Returns
	-------
	:class:`larch.core.LinearComponent`
		The component object for the designated node
		
	Notes
	-----
	Earlier versions of this software required node code numbers to be non-negative.  
	They can now be any 64 bit signed integer.
	
	Because the id and name are distinct data types, Larch can detect (and silently allow) when
	they are transposed (i.e. with `name` given before `id`).
	"""
	nest = property(_core.Model2_nest_get, _set_nest, None, _nest_doc)
	node = property(_core.Model2_nest_get, _set_nest, None, "an alias for :attr:`nest`")
	
	
	def _set_link(self, *args):
		_core.Model2_link_set(self, *args)
		self.freshen()
	_link_doc = """\
	A function-like object defining links between network nodes.
	
	Parameters
	----------
	up_id : int
		The code number of the upstream (i.e. closer to the root node) node on the link.
		This should never be an elemental alternative.
	down_id : int
		The code number of the downstream node on the link. This can be an elemental
		alternative.
	"""
	link = property(_core.Model2_link_get, _set_link, None, _link_doc)
	edge = property(_core.Model2_link_get, _set_link, None, "an alias for :attr:`link`")
	
	def alternatives(self):
		return {code:name for code,name in zip(self.alternative_codes(),self.alternative_names())}

	def alternative_name(self, code):
		codes = numpy.asarray(self.alternative_codes())
		idx = numpy.where(codes==code)[0][0]
		return self.alternative_names()[idx]

	def alternative_code(self, name):
		names = numpy.asarray(self.alternative_names())
		idx = numpy.where(names==name)[0][0]
		return self.alternative_codes()[idx]

	def _set_rootcode(self, *args):
		_core.Model2__set_root_cellcode(self, *args)
		#self.freshen()
	_rootcode_doc = """\
	The root_id is the code number for the root node in a nested logit or
	network GEV model. The default value for the root_id is 0. It is important
	that the root_id be different from the code for every elemental alternative
	and intermediate nesting node. If it is convenient for one of the elemental
	alternatives or one of the intermediate nesting nodes to have a code number
	of 0 (e.g., for a binary logit model where the choices are yes and no),
	then this value can be changed to some other integer.
	"""
	root_id = property(_core.Model2__get_root_cellcode, _set_rootcode, None, _rootcode_doc)

	def _grab_data_fountain(self):
		return self._ref_to_db

	def _change_data_fountain(self, datafount):
		if isinstance(datafount, Fountain):
			val = _core.Model2_change_data_fountain(self, datafount)
		else:
			val = None
		self._ref_to_db = datafount
		try:
			self._pull_graph_from_db()
		except LarchError:
			pass
		return val

	df = property(_grab_data_fountain, _change_data_fountain, Model2.delete_data_fountain)
	db = df


	def load_latest(self, filename="@@@", *, d=None, **kwarg):
		'''
		Load the latest modified version of a file glob.
		
		This function finds the most recently modified file matching the glob pattern
		and loads it.  This is convenient if you've been estimating a series of models.
		'''
		if filename=="@@@" and isinstance(self,str):
			filename = self
			if d:
				self = Model(d)
			else:
				self = Model()
		fileglob = filename
		from .util.filemanager import latest_matching
		filename = latest_matching(os.path.expanduser(fileglob))
		return self.load(filename, **kwarg)

	def load(self, filename="@@@", *, echo=False, d=None):
		if filename=="@@@" and isinstance(self,str):
			filename = self
			if d:
				self = Model(d)
				self.setUp(False)
			else:
				self = Model()
		inf = numpy.inf
		nan = numpy.nan
		_Str = lambda s: (base64.standard_b64decode(s)).decode()
		if (len(filename)>5 and filename[-5:]=='.html') or (len(filename)>6 and filename[-6:]=='.xhtml'):
			from html.parser import HTMLParser
			class LarchHTMLParser_ModelLoader(HTMLParser):
				def handle_starttag(subself, tag, attrs):
					if tag=='meta':
						use = False
						for attrname,attrval in attrs:
							if attrname=='name' and attrval=='pymodel':
								use = True
						if use:
							for attrname,attrval in attrs:
								if attrname=='content':
									self.loads(attrval, use_base64=True, echo=echo, d=self.df)
			parser = LarchHTMLParser_ModelLoader()
			with open(filename) as f:
				parser.feed(f.read())
			self.loaded_from = filename
			return self
		else:
			with open(filename) as f:
				code = compile(f.read(), filename, 'exec')
				exec(code)
			self.loaded_from = filename
			return self

	def loads(self, content="@@@", *, use_base64=False, echo=False, d=None):
		if content=="@@@" and isinstance(self,(str,bytes)):
			content = self
			if d:
				self = Model(d)
				self.setUp(False)
			else:
				self = Model()
		inf = numpy.inf
		nan = numpy.nan
		_Str = lambda s: (base64.standard_b64decode(s)).decode()
		if use_base64:
			content = base64.standard_b64decode(content)
		if isinstance(content, bytes):
			import zlib
			try:
				content = zlib.decompress(content)
			except zlib.error:
				pass
			import pickle
			try:
				content = pickle.loads(content)
			except pickle.UnpicklingError:
				pass
		if isinstance(content, bytes):
			content = content.decode('utf8')
		if isinstance(content, str):
			if echo:
				print("\n".join("{:> 5d}│{}".format(j+1,line) for j,line in enumerate(content.split("\n"))))
				code = compile(content, "<string>", 'exec')
				exec(code)
			elif echo is not 0:
				try:
					code = compile(content, "<string>", 'exec')
					exec(code)
				except:
					print("\n".join("{:> 5d}│{}".format(j+1,line) for j,line in enumerate(content.split("\n"))))
					raise
		else:
			raise LarchError("error in loading")
		return self

	def save(self, filename, overwrite=False, spool=True, report=False, report_cats=['title','params','LL','latest','utilitydata','data','notes']):
		if filename is None:
			import io
			filemaker = lambda: io.StringIO()
		else:
			if os.path.exists(filename) and not overwrite and not spool:
				raise IOError("file {0} already exists".format(filename))
			if os.path.exists(filename) and not overwrite and spool:
#				filename, filename_ext = os.path.splitext(filename)
#				n = 1
#				while os.path.exists("{} ({}){}".format(filename,n,filename_ext)):
#					n += 1
#				filename = "{} ({}){}".format(filename,n,filename_ext)
				from .util.filemanager import next_stack
				filename = next_stack(filename)
			filename, filename_ext = os.path.splitext(filename)
			if filename_ext=="":
				filename_ext = ".py"
			filename = filename+filename_ext
			filemaker = lambda: open(filename, 'w')
		with filemaker() as f:
#			if report:
#				f.write(self.report(lineprefix="#\t", cats=report_cats))
#				f.write("\n\n\n")
			import time
			f.write("# saved at %s"%time.strftime("%I:%M:%S %p %Z"))
			f.write(" on %s\n"%time.strftime("%d %b %Y"))
			f.write(self.save_buffer())
			
			f.write("self.covariance_matrix = numpy.loads( base64.standard_b64decode('")
			f.write( base64.standard_b64encode(self.covariance_matrix.dumps()).decode('utf8') )
			f.write("'))\n")
			f.write("self.robust_covariance_matrix = numpy.loads( base64.standard_b64decode('")
			f.write( base64.standard_b64encode(self.robust_covariance_matrix.dumps()).decode('utf8') )
			f.write("'))\n")
			
			from .nnnl import NNNL
			if isinstance(self, NNNL):
				blank_attr = set(dir(NNNL(Model())))
			else:
				blank_attr = set(dir(Model()))
			blank_attr.remove('descriptions')
			blank_attr.add('_ce')
			blank_attr.add('_ce_caseindex')
			blank_attr.add('_ce_altindex')
			blank_attr.add('_u_ce')
			blank_attr.add('base_model')
			aliens_found = False
			for a in dir(self):
				if a not in blank_attr:
					if isinstance(getattr(self,a),(int,float)):
						f.write("\n")
						f.write("self.{} = {}\n".format(a,getattr(self,a)))
					elif isinstance(getattr(self,a),(str,)):
						f.write("\n")
						f.write("self.{} = {!r}\n".format(a,getattr(self,a)))
					else:
						if not aliens_found:
							import pickle
							f.write("import pickle\n")
							aliens_found = True
						try:
							self_a = getattr(self,a)
							p_obj = pickle.dumps(self_a)
							f.write("\n")
							f.write("self.{} = pickle.loads({})\n".format(a,p_obj))
						except pickle.PickleError:
							f.write("\n")
							f.write("self.{} = 'unpicklable object'\n".format(a))
						except AttributeError as attr_err:
							if "Can't pickle local object" in str(attr_err):
								f.write("\n")
								f.write("self.{} = 'unpicklable local object'\n".format(a))
							else:
								raise
						except TypeError as t:
							t.args = (t.args[0] + "\nobject name {}".format(a),) + t.args[1:]
							raise t
			try:
				return f.getvalue()
			except AttributeError:
				return

	def saves(self):
		"Return a string representing the saved model"
		return self.save(None)

	def __getstate__(self):
		import pickle, zlib
		return zlib.compress(pickle.dumps(self.save(None)))

	def __setstate__(self, state):
		import pickle, zlib
		self.__init__()
		self.loads( pickle.loads(zlib.decompress(state)) )

	def copy(self, other="@@@"):
		if other=="@@@" and isinstance(self,Model):
			other = self
			self = Model()
		if not isinstance(other,Model):
			raise IOError("the object to copy from must be a larch.Model")
		inf = numpy.inf
		nan = numpy.nan
		_Str = lambda s: (base64.standard_b64decode(s)).decode()
		code = compile(other.save_buffer(), "model_to_copy", 'exec')
		exec(code)
		return self

	def recall(self, nCases=None):
		if nCases is not None:
			self._nCases_recall = nCases

	def __utility_get(self):
		return _core.Model2_utility_get(self)

	def __utility_set(self,x):
		return _core.Model2_utility_set(self,x)

	utility = property(__utility_get, __utility_set)

	def __quantity_get(self):
		return _core.Model2_quantity_get(self)

	def __quantity_set(self,x):
		if isinstance(x, LinearComponent):
			x = LinearFunction() + x
		return _core.Model2_quantity_set(self,x)

	quantity = property(__quantity_get, __quantity_set)

	def __quantity_scale_set(self, val):
		if val not in self:
			self.parameter(val, value=1.0, min=0.0001, max=1.0, null_value=1.0)
		_core.Model2_quantity_scale_set(self, val)

	def __quantity_scale_del(self):
		_core.Model2_quantity_scale_set(self, "CONSTANT")
	
	__quantity_scale_doc = "The scale (logsum) coefficient on the quantity term."

	quantity_scale = property(_core.Model2_quantity_scale_get, __quantity_scale_set, __quantity_scale_del, __quantity_scale_doc)


	def note(self, comment, isglobal=False):
		if isglobal:
			if not hasattr(self,"notes"): self.notes = []
			def _append_note(x):
				x = "{}".format(x).replace("\n"," -- ")
				if x not in self.notes:
					self.notes += [x,]
			if isinstance(comment,(list,tuple)):
				for eachcomment in comment: _append_note(eachcomment)
			else:
				_append_note(comment)
		else:
			self.write_runstats_note(comment)

	def _specific_warning_notes(self):
		w = ""
		#import warnings
		#warnings.warn(w, stacklevel=2)
		return w

	def networkx_digraph(self):
		try:
			import networkx as nx
		except ImportError:
			import warnings
			warnings.warn("networkx module not installed, unable to build network graph")
			raise
		G = nx.DiGraph()
		G.add_node(self.root_id, name='ROOT')
		for i in self.nest.nodes():
			G.add_node(i, name=self.nest[i]._altname)
		for icode,iname in self.alternatives().items():
			G.add_node(icode, name=iname)
		for i,j in self.link.links():
			G.add_edge(i,j)
		for n in G.nodes():
			if n!=self.root_id and G.in_degree(n)==0:
				G.add_edge(self.root_id,n)
		return G

	@property
	def graph(self):
		"""A :func:`networkx.DiGraph` representing the nesting structure.
		
		You can use this DiGraph to explore the network structure, and use
		standard networkx tools to describe and iterate over the graph.  Note
		that this is a read-only attribute; changes to network (nesting) structure
		must be made using :class:`Model.link` and :class:`Model.nest`.
		
		Raises
		------
		ImportError
			If the networkx module is not installed.
		"""
		return self.networkx_digraph()

	def nodes_descending_order(self):
		discovered = []
		discovered.append(self.root_id)
		pending = set()
		pending.add(self.root_id)
		attic = set()
		attic.add(self.root_id)
		G = self.networkx_digraph()
		predecessors = {i:set(G.predecessors(i)) for i in G.nodes()}
		while len(pending)>0:
			n = pending.pop()
			for s in G.successors(n):
				if s not in attic and predecessors[s] <= attic:
					pending.add(s)
					discovered.append(s)
					attic.add(s)
		return discovered

	def nodes_ascending_order(self, exclude_elementals=False):
		discovered = []
		if not exclude_elementals:
			discovered.extend(self.alternative_codes())
		pending = set(self.alternative_codes())
		basement = set(self.alternative_codes())
		G = self.networkx_digraph()
		successors = {i:set(G.successors(i)) for i in G.nodes()}
		while len(pending)>0:
			n = pending.pop()
			for s in G.predecessors(n):
				if s not in basement and successors[s] <= basement:
					pending.add(s)
					discovered.append(s)
					basement.add(s)
		return discovered

	def new_nest(self, nest_name=None, param_name="", branch=None, **kwargs):
		"""Generate a new nest with a new unique code.
		
		If you don't want to bother managing the code numbers for nests and instead
		just work with them more abstractly, this handy function allows you to 
		create a new nest node without worrying about the code number; an otherwise
		unused number will be selected for you (and returned by this method, so you
		can use it elsewhere).
		
		
		Parameters
		----------
		nest_name : str or None
			The name of the nest. This name is used in various reports.
			It can be any string but generally something short and descriptive
			is useful. If None, the name is set to "nest_{id}", although since
			you're not picking your own id, this might not be the best way to go.
		param_name : str
			The name of the parameter to associate with this nest.  If not given,
			or given as an empty string, the `nest_name` is used.
		branch : str or other immutable
			An optional label for the branch of the network that this nest is in.
			The new code will be populated into the set at model.branches[branch].

		Other Parameters
		----------------
		parent : int, optional
			The code number of the parent node of the nest, for which a link
			will automatically be created.
		parents : list of ints, optional
			A list of code numbers for the parent nodes of the nest, for which
			links will automatically be created.
		children : list of ints, optional
			A list of code numbers for the child nodes of the nest, for which
			links will automatically be created.

		Returns
		-------
		int
			The code for the newly created nest.
		
		Notes
		-----
		It may be convenient to give all of the parent and child linkages when 
		calling this function, but it is not necessary, as linkages can be created
		seperately later.
		
			
		"""
		if len(self.node.nodes())>0:
			max_node = max(self.node.nodes())
		else:
			max_node = 0
		try:
			max_altcode = max(self.alternative_codes())
		except ValueError:
			max_altcode = 100
		newcode = max(max_node,max_altcode,self.root_id)+1
		self.node(newcode, nest_name, param_name=param_name, **kwargs)
		if branch is not None:
			if not hasattr(self, 'branches'):
				self.branches = {}
			if branch not in self.branches:
				self.branches[branch] = set()
			self.branches[branch].add(newcode)
		return newcode
	
	new_node = new_nest

	def report_(self, cats='*', **kwargs):
		with XHTML('temp', quickhead=self, **kwargs) as f:
			f << self.report(cats=cats, style='xml')

	def report_1(self, filename="/tmp/larchreport.html", **kwargs):
		from .util.filemanager import next_stack
		print("from filename",filename)
		filename = next_stack(filename,suffix='html')
		print("to filename", filename)
		with XHTML(filename, quickhead=self, **kwargs) as f:
			f << self.report(cats='*', style='xml')



	def __str__(self):
		return self.report('txt')



	def stats_utility_co_sqlite(self, where=None):
		"""
		Generate a dataframe of descriptive statistics on the model idco data read from SQLite.
		If the where argument is given, it is used as a filter on the larch_idco table.
		"""
		import pandas
		keys = set()
		db = self._ref_to_db
		stats = None
		for u in self.utility.co:
			if u.data in keys:
				continue
			else:
				keys.add(u.data)
			qry = """
				SELECT
				'{0}' AS DATA,
				min({0}) AS MINIMUM,
				max({0}) AS MAXIMUM,
				avg({0}) AS MEAN,
				stdev({0}) AS STDEV
				FROM {1}
				""".format(u.data, self.df.tbl_idco())
			if where:
				qry += " WHERE {}".format(where)
			s = db.dataframe(qry)
			s = s.set_index('DATA')
			if stats is None:
				stats = s
			else:
				stats = pandas.concat([stats,s])
		return stats

	def stats_utility_co(self, datapool="UtilityCO"):
		"""
		Generate a set of descriptive statistics (mean,stdev,mins,maxs,nonzeros,
		positives,negatives,zeros,mean of nonzero values) on the model's idco data as loaded. Uses weights
		if available.
		"""
		x = self.Data(datapool)
		ss = statistical_summary.compute(x, dimzer=numpy.atleast_1d, weights=self.Data("Weight"))
#		if bool((self.Data("Weight")!=1).any()):
#			w = self.Data("Weight").flatten()
#			ss.mean = numpy.average(x, axis=0, weights=w)
#			variance = numpy.average((x-ss.mean)**2, axis=0, weights=w)
#			ss.stdev = numpy.sqrt(variance)
#			w_nonzero = w.copy().reshape(w.shape[0],1) * numpy.ones(x.shape[1])
#			w_nonzero[x==0] = 0
#			ss.mean_nonzero = numpy.average(x, axis=0, weights=w_nonzero)
		return ss


	def art_stats_utility_co(self, title="Utility idCO Data"):
		from .util.analytics import basic_idco_variable_analysis
		needs = self.needs()
		if 'UtilityCO' in needs:
			return basic_idco_variable_analysis(
				self.data.utilityco,
				needs['UtilityCO'].get_variables(),
				title=title,
				)


	def art_stats_utility_co_by_alt(self, title="Utility idCO Data by Alternative"):
		from .util.analytics import basic_variable_analysis_by_alt
		needs = self.needs()
		if 'UtilityCO' in needs:
			picks = set()
			for i in self.utility.co:
				for j in self.utility.co[i]:
					try:
						float(j.data)
					except ValueError:
						picks.add((i,j.data))
			return basic_variable_analysis_by_alt(
				arr=self.data.utilityco,
				ch=self.data.choice,
				av=self.data.avail,
				names=self.needs()['UtilityCO'].get_variables(),
				altcodes=self.alternative_codes(),
				altnames=self.alternative_names(),
				picks=picks,
				title=title,
				)

	def art_stats_utility_ca(self, title="Utility idCA Data"):
		from .util.analytics import basic_idca_variable_analysis
		needs = self.needs()
		if 'UtilityCA' in needs:
			return basic_idca_variable_analysis(
				self.data.utilityca,
				needs['UtilityCA'].get_variables(),
				self.data.avail,
				title=title,
				)

	def art_stats_quantity_ca(self, title="Quantity idCA Data"):
		from .util.analytics import basic_idca_variable_analysis
		needs = self.needs()
		if 'QuantityCA' in needs:
			return basic_idca_variable_analysis(
				self.data.quantity,
				needs['QuantityCA'].get_variables(),
				self.data.avail,
				title=title,
				)


	def art_stats_utility_ca_by_alt(self, title="Utility idCA Data by Alternative"):
		from .util.analytics import basic_variable_analysis_by_alt
		needs = self.needs()
		if 'UtilityCA' in needs:
			return basic_variable_analysis_by_alt(
				arr=self.data.utilityca,
				ch=self.data.choice,
				av=self.data.avail,
				names=needs['UtilityCA'].get_variables(),
				altcodes=self.alternative_codes(),
				altnames=self.alternative_names(),
				picks=None,
				title=title,
				)

	def art_stats_utility_ca_by_all(self, title="Utility idCA Data by Choice"):
		from .util.analytics import basic_variable_analysis_all
		needs = self.needs()
		if 'UtilityCA' in needs:
			return basic_variable_analysis_all(
				arr=self.data.utilityca,
				ch=self.data.choice,
				av=self.data.avail,
				names=needs['UtilityCA'].get_variables(),
				picks=None,
				title=title,
				)

	def art_stats_quantity_ca_by_alt(self, title="Quantity idCA Data by Alternative"):
		from .util.analytics import basic_variable_analysis_by_alt
		needs = self.needs()
		if 'QuantityCA' in needs:
			return basic_variable_analysis_by_alt(
				arr=self.data.quantity,
				ch=self.data.choice,
				av=self.data.avail,
				names=needs['QuantityCA'].get_variables(),
				altcodes=self.alternative_codes(),
				altnames=self.alternative_names(),
				picks=None,
				title=title,
				)

	def art_stats_quantity_ca_by_all(self, title="Quantity idCA Data by Choice"):
		from .util.analytics import basic_variable_analysis_all
		needs = self.needs()
		if 'QuantityCA' in needs:
			return basic_variable_analysis_all(
				arr=self.data.quantity,
				ch=self.data.choice,
				av=self.data.avail,
				names=needs['QuantityCA'].get_variables(),
				picks=None,
				title=title,
				)

	def stats_utility_ca_chosen_unchosen(self):
		"""
		Generate a set of descriptive statistics (mean,stdev,mins,maxs,nonzeros,
		positives,negatives,zeros,mean of nonzero values) on the model's idca data as loaded. Uses weights
		if available.
		"""
		
		x = self.Data("UtilityCA")
		ch = self.Data("Choice")
		wgt = self.Data("Weight")
		
		ch_asbool = ch.astype(bool).reshape(ch.shape[0],ch.shape[1])
		
		av = self.Data("Avail")
		ch_asbool &= av.squeeze()
		x_chosen = x[ch_asbool]
		
		ch_asbool = ~ch_asbool & av.squeeze()
		x_unchosen = x[ch_asbool]
		
		x_total = x[av.squeeze()]
		
		ss_chosen = statistical_summary.compute(x_chosen, dimzer=numpy.atleast_1d, full_xxx=x_total, weights=wgt)
		ss_unchosen = statistical_summary.compute(x_unchosen, dimzer=numpy.atleast_1d, full_xxx=x_total, weights=wgt)
		
		return ss_chosen, ss_unchosen

	def stats_utility_ca_chosen_unchosen_by_alt(self, altcode, histograms=False):
		"""
		Generate a set of descriptive statistics (mean,stdev,mins,maxs,nonzeros,
		positives,negatives,zeros,mean of nonzero values) on the model's idca data as loaded. Uses weights
		if available.
		"""
		
		x = self.Data("UtilityCA")
		ch = self.Data("Choice")
		av = self.Data("Avail")
		wgt = self.Data("Weight")
		
		altslots = numpy.zeros([len(self.alternative_codes())], dtype=bool)
		# CONVERT altcode to SLOT
		for anum,acode in enumerate(self.alternative_codes()):
			if acode == altcode:
				altslots[anum] = True
				break
	
		ch_asbool = ch.astype(bool).reshape(ch.shape[0],ch.shape[1])
		ch_asbool[:,~altslots] = False
		
		x_chosen = x[ch_asbool]
		#ch_asbool = ~ch_asbool
		#ch_asbool[:,~altslots] = False
		
		ch_asbool[:,altslots] = ~ch_asbool[:,altslots] & av[:,altslots].squeeze(axis=2)
		x_unchosen = x[ch_asbool]
		x_total = x[av[:,altslots].squeeze(),altslots].squeeze()
		
		ss_chosen = statistical_summary.compute(x_chosen, dimzer=numpy.atleast_1d, full_xxx=x_total, weights=wgt)
		ss_unchosen = statistical_summary.compute(x_unchosen, dimzer=numpy.atleast_1d, full_xxx=x_total, weights=wgt)
		
		return ss_chosen, ss_unchosen,

	def stats_utility_ca(self, by_alt=True):
		"""
		Selected statistics about the idca data.
		
		This method requires the data to be currently provisioned in the
		:class:`Model`.
		
		Returns
		-------
		:class:`pandas.DataFrame`
			A DataFrame containing selected statistics.
		
		"""
		import pandas
		from itertools import count
		footnotes = set()
		if by_alt:
			table_cache = pandas.DataFrame(columns=["altcode","altname","data","filter","mean","stdev","min","max","zeros","mean_nonzero","positives","negatives","descrip","histogram",])
			names = self.needs()["UtilityCA"].get_variables()
			for acode,aname in self.alternatives().items():
				bucket = self.stats_utility_ca_chosen_unchosen_by_alt(acode)
				bucket_types = ["Chosen", "Unchosen"]
				for summary_attrib, bucket_type in zip( bucket, bucket_types ):
					if summary_attrib.empty():
						continue
					means = summary_attrib.mean
					stdevs = summary_attrib.stdev
					mins = summary_attrib.minimum
					maxs = summary_attrib.maximum
					nonzers = summary_attrib.n_nonzeros
					posis = summary_attrib.n_positives
					negs = summary_attrib.n_negatives
					zers = summary_attrib.n_zeros
					mean_nonzer = summary_attrib.mean_nonzero
					histos = summary_attrib.histogram
					footnotes |= summary_attrib.notes
					for s in zip(names,means,stdevs,mins,maxs,zers,mean_nonzer,posis,negs,count(),histos,):
#						if s[1]==0 and numpy.isnan(s[6]):
#							continue
						newrow = {'altcode':acode, 'altname':aname, 'filter':bucket_type,
									'data':s[0], 'mean':s[1], 'stdev':s[2],
									'min':s[3],'max':s[4],'zeros':s[5],'mean_nonzero':s[6],
									'positives':s[7],'negatives':s[8],'namecounter':s[9],
									'histogram':s[10],
						}
						table_cache = table_cache.append(newrow, ignore_index=True)
			table_cache.sort_values(['altcode','namecounter','filter'], inplace=True)
			table_cache.index = range(len(table_cache))
			return table_cache, footnotes
		else:
			table_cache = pandas.DataFrame(columns=["data","filter","mean","stdev","min","max","zeros","mean_nonzero","positives","negatives","descrip","histogram",])
			names = self.needs()["UtilityCA"].get_variables()
			# agg over all alts
			bucket = self.stats_utility_ca_chosen_unchosen()
			bucket_types = ["Chosen", "Unchosen"]
			for summary_attrib, bucket_type in zip( bucket, bucket_types ):
				means = summary_attrib.mean
				stdevs = summary_attrib.stdev
				mins = summary_attrib.minimum
				maxs = summary_attrib.maximum
				nonzers = summary_attrib.n_nonzeros
				posis = summary_attrib.n_positives
				negs = summary_attrib.n_negatives
				zers = summary_attrib.n_zeros
				mean_nonzer = summary_attrib.mean_nonzero
				histos = summary_attrib.histogram
				footnotes |= summary_attrib.notes
				for s in zip(names,means,stdevs,mins,maxs,zers,mean_nonzer,posis,negs,count(),histos,):
					newrow = {'filter':bucket_type,
								'data':s[0], 'mean':s[1], 'stdev':s[2],
								'min':s[3],'max':s[4],'zeros':s[5],'mean_nonzero':s[6],
								'positives':s[7],'negatives':s[8],'namecounter':s[9],
								'histogram':s[10],
					}
					table_cache = table_cache.append(newrow, ignore_index=True)
			table_cache.sort_values(['namecounter','filter'], inplace=True)
			table_cache.index = range(len(table_cache))
			return table_cache, footnotes

	def parameter_names(self, output_type=list):
		x = []
		for n,p in enumerate(self._get_parameter()):
			x.append(p['name'])
		if output_type is not list:
			x = output_type(x)
		return x

	def reconstruct_covariance(self):
		s = len(self)
		from .array import SymmetricArray
		x = SymmetricArray([s])
		names = self.parameter_names()
		for n,p in enumerate(self._get_parameter()):
			for j in range(n+1):
				if names[j] in p['covariance']:
					x[n,j] = p['covariance'][names[j]]
		return x

	def reconstruct_robust_covariance(self):
		s = len(self)
		from .array import SymmetricArray
		x = SymmetricArray([s])
		names = self.parameter_names()
		for n,p in enumerate(self._get_parameter()):
			for j in range(n+1):
				if names[j] in p['robust_covariance']:
					x[n,j] = p['robust_covariance'][names[j]]
		return x


	def d2_loglike(self, *args, finite_grad=False):
		z = self.finite_diff_hessian(*args, out=self.hessian_matrix, finite_grad=finite_grad)
		if self.hessian_matrix is not z:
			self.hessian_matrix = z
		return z

	def negative_d2_loglike(self, *args, finite_grad=False):
		z = numpy.copy(self.finite_diff_hessian(*args, out=self.hessian_matrix, finite_grad=finite_grad))
		z *= -1
		return z


	hessian_matrix = property(Model2._get_hessian_array,
	                                 Model2._set_hessian_array,
									 Model2._del_hessian_array)

	covariance_matrix = property(Model2._get_inverse_hessian_array,
	                                 Model2._set_inverse_hessian_array,
									 Model2._del_inverse_hessian_array)

	robust_covariance_matrix = property(Model2._get_robust_covar_array,
	                                 Model2._set_robust_covar_array,
									 Model2._del_robust_covar_array)

	@property
	def correlation_matrix(self):
		cor = self.covariance_matrix.copy()
		scale = numpy.sqrt(cor.diagonal())
		cor /= numpy.outer(scale,scale)
		cor[numpy.isnan(cor)] = 0
		return cor

	def calculate_parameter_covariance(self):
		hess = self.negative_d2_loglike()
		take = numpy.full_like(hess, True, dtype=bool)
		dense_s = len(self)
		for i in range(len(self)):
			if self[i].holdfast or (self[i].value >= self[i].max_value) or (self[i].value <= self[i].min_value):
				take[i,:] = False
				take[:,i] = False
				dense_s -= 1
		hess_taken = hess[take].reshape(dense_s,dense_s)
		from .linalg import matrix_inverse
		try:
			invhess = matrix_inverse(hess_taken)
		except numpy.linalg.linalg.LinAlgError:
			invhess = numpy.full_like(hess_taken, numpy.nan, dtype=numpy.float64)
		self.covariance_matrix = numpy.full_like(hess, 0, dtype=numpy.float64)
		self.covariance_matrix[take] = invhess.reshape(-1)
		# robust...
		try:
			bhhh_taken = self.bhhh()[take].reshape(dense_s,dense_s)
		except NotImplementedError:
			pass
		else:
			#import scipy.linalg.blas
			#temp_b_times_h = scipy.linalg.blas.dsymm(float(1), invhess, bhhh_taken)
			#robusto = scipy.linalg.blas.dsymm(float(1), invhess, temp_b_times_h, side=1)
			robusto = numpy.dot(numpy.dot(invhess, bhhh_taken),invhess)
			self.robust_covariance_matrix = numpy.full_like(hess, 0, dtype=numpy.float64)
			self.robust_covariance_matrix[take] = robusto.reshape(-1)


	def bhhh_tolerance(self, *args, **kwargs):
		try:
			constraints = self._built_constraints_cache
		except AttributeError:
			constraints = self._build_constraints(include_bounds=True)
		if len(constraints)==0:
			return super().bhhh_tolerance(*args, **kwargs)
		# constraints are pre-built by _build_constraints here
		try:
			d2, bh, d1, abandoned_slots = self._compute_constrained_d2_loglike_and_bhhh(constraints=constraints, skip_d2=True)
		except TypeError:  # intermediate constraints?  TODO fix this
			return numpy.inf
		from .linalg import general_inverse as _general_inverse
		try:
			return numpy.dot(numpy.dot(d1,_general_inverse(bh)),d1) #, bh, d1
		except ValueError:
			return numpy.inf

	def _bhhh_simple_direction(self, *args, **kwargs):
		from .linalg import general_inverse as _general_inverse
		try:
			constraints = self._built_constraints_cache
		except AttributeError:
			constraints = self._build_constraints(include_bounds=True)
		if len(constraints)==0:
			return numpy.dot(self.d_loglike(*args),_general_inverse(self.bhhh(*args)))
		# constraints are pre-built by _build_constraints here
		try:
			d2, bh, d1, abandoned_slots = self._compute_constrained_d2_loglike_and_bhhh(constraints=constraints, skip_d2=True)
		except TypeError:  # intermediate constraints?  TODO fix this
			raise
		try:
			return numpy.dot(d1,_general_inverse(bh))
		except ValueError:
			raise

	def _bhhh_simple_step(self, steplen=1.0, printer=None):
		current = self.parameter_array.copy()
		current_ll = self.loglike()
		direction = self._bhhh_simple_direction()
		while True:
			self.parameter_array[:] = current[:] + direction*steplen
			val = self.loglike()
			if val > current_ll: break
			steplen *= 0.5
			if steplen < 0.01: break
		if printer is not None:
			printer("simple step {} to:\n".format(steplen)+self._parameter_report(direction))
			printer("LL={}".format(val))
		if val < current_ll:
			self.parameter_array[:] = current[:]
			raise RuntimeError("simple step failed {} to:\n".format(steplen)+self._parameter_report(direction)+"\nLL={}".format(val))
		return val

	def parameter_holdfast_mask(self):
		return self.parameter_holdfast_array.copy()

	def parameter_holdfast_release(self):
		self.parameter_holdfast_array[:] = 0

	def parameter_holdfast_mask_restore(self, mask):
		self.parameter_holdfast_array[:] = mask[:]

	def rank_check(self, apply_correction=True, zero_correction=False):
		"""
		Check if the model is over-specified.
		"""
		locks = set()
		h = self.hessian(True)
		names = self.parameter_names(numpy.array)
		mask = self.parameter_holdfast_mask()
		h_masked = h[mask,:][:,mask]
		while h_masked.flats().shape[1]:
			bads = numpy.flatnonzero(numpy.round(h_masked.flats()[:,0], 5))
			fixit = bads.flat[0]
			locks.add(names[mask][fixit])
			self.parameter(names[mask][fixit], holdfast=True)
			if zero_correction:
				self.parameter(names[mask][fixit], value=self.parameter(names[mask][fixit]).initial_value)
			mask = self.parameter_holdfast_mask()
			h_masked = h[mask,:][:,mask]
		self.teardown()
		if not apply_correction:
			for l in locks:
				self.parameter(l, holdfast=False)
		return locks

	def parameter_reset_to_initial_values(self):
		self.parameter_array[:] = self.parameter_initial_values_array[:]

	def estimate_constants_only(self, repair='-', using_alts=None):
		db = self._ref_to_db
		if using_alts is None:
			alts = db.alternatives()
		else:
			alts = using_alts
		m = Model(db)
		for a in alts[1:]:
			m.utility.co('1',a[0],a[1])
		m.provision()
		clashes = numpy.nonzero( numpy.logical_and(m.Data("Choice"), ~m.Data("Avail")) )
		n_clashes = len(clashes[0])
		if n_clashes>0:
			m.clash = clashes
			if repair == '+':
				for i in zip(*clashes):
					m.DataEdit("Avail")[i] = True
					print("REPAIR + ",i)
			if repair == '-':
				for i in zip(*clashes):
					m.DataEdit("Choice")[i] = 0
					print("REPAIR - ",i)
			else:
				raise LarchError("Model has {} cases where the chosen alternative is unavailable".format(n_clashes))
		m.maximize_loglike()
		self._LL_constants = m.loglike()
		return m

	def estimate_nil_model(self):
		db = self._ref_to_db
		alts = db.alternatives()
		m = Model(db)
		for a in alts[1:]:
			m.utility.co('0',a[0],a[1])
		m.maximize_loglike()
		self._LL_nil = m.loglike()


	def doctor(self, clash=None):
		"""
		Analyze the model and data and look for problems.
		
		This function will look for problems with your model or the
		underlying data, and alert you to them.  Exactly what is checked
		for may vary (generally expand) in future version.  These checks 
		may be computationally expensive so the are not completed 
		automatically on every model run, but if you are experiencing
		difficulty converging or errors in estimation, try this.
		
		Parameters
		----------
		clash : {None, '+', '-'}
			When a case has an alternative that is chosen but not available,
			it can be repaired by making the chosen alternative available ('+')
			or by making it not chosen ('-') or left alone (None, the default).
			Note that making it not chosen will quite possibly result in the entire
			case having no chosen alternative, which can introduce numerical 
			problems.
		
		"""
		doc = []
		def spot_a_nan(arr, label, none_is_ok=True):
			if arr is None:
				if not none_is_ok:
					doc.append("{} is None".format(label))
			else:
				nans = numpy.isnan(arr)
				if numpy.any(nans):
					first = tuple(i[0] for i in numpy.where(nans))
					doc.append("{} is NaN at {}".format(label,str(first)))
		spot_a_nan(self.data.choice, "data.choice", none_is_ok=False)
		spot_a_nan(self.data.utilityco, "data.utilityco")
		spot_a_nan(self.data.utilityca, "data.utilityca")
		spot_a_nan(self.data.quantity, "data.quantity")
		spot_a_nan(self.work.probability, "work.probability")
		try:
			self.data_quality_check(repair=clash, autoprovision=False)
		except LarchError as err:
			doc.append(str(err))
		
		ncases_with_zero_choice = int((self.data.choice.sum(1)==0).sum())
		if ncases_with_zero_choice:
			first_case_index = numpy.where((self.data.choice.sum(1)==0).squeeze())[0][0]
			doc.append('there are {} cases without any observed choice, the first of which is at caseindex {}'.format(ncases_with_zero_choice, first_case_index))
		
		if self.data.quantity is not None:
			no_quantity = (self.data.quantity.sum(2)==0)
			any_choice = (self.data.choice>0).squeeze(2)
			chosen_but_no_quantity = (any_choice & no_quantity)
			ncases_with_choice_but_no_quantity = chosen_but_no_quantity.sum()
			if ncases_with_choice_but_no_quantity:
				wherefore = numpy.where(chosen_but_no_quantity)
				first_case_index = wherefore[0][0]
				first_alt_index = wherefore[1][0]
				doc.append('there are {} choices without any observed quantity, the first of which is at caseindex {} alt {}'.format(ncases_with_choice_but_no_quantity, first_case_index, self.alternative_names()[first_alt_index]))
		
		
		# report out
		if doc:
			from .util.doctor import warn
			warn( "\n-> "+"\n-> ".join(doc) )
			return "\n".join(doc)
		else:
			return "ok"


	def loglike(self, *args, cached=True, holdfast_unmask=0, blp_contraction_threshold=1e-8):
		if len(args)>0:
			if numpy.any(numpy.isnan(args[0])):
				if self.option.log_turns and self.logger(): self.logger().critical("<LL> Parameters with NaN "+str(self.parameter_array))
				return -numpy.inf
			self.parameter_values(args[0], holdfast_unmask)
		if self.Data_UtilityCE_manual.active():
			numpy.dot(self._ce,self.Coef("UtilityCA").reshape(-1), out=self._u_ce)
			self.Utility()[self._ce_caseindex,self._ce_altindex] = self._u_ce
			if self.option.log_turns and self.logger(): self.logger().critical("<LL> Data_UtilityCE_manual.active "+str(self.parameter_array))
			return self.loglike_given_utility()
		if hasattr(self,'blp_shares_map') and hasattr(self,'logmarketshares') and blp_contraction_threshold is not None:
			# BLP contraction
			delta_norm = 1e9
			while delta_norm > blp_contraction_threshold:
				pr = self.probability(self.parameter_array)
				pr_sum = (pr*self.Data("Weight")).sum(0)
				pr_sum /= pr_sum.sum()
				delta = self.logmarketshares - numpy.log(pr_sum)
				delta[numpy.isnan(delta)] = 0
				self.parameter_array[self.blp_shares_map] += delta
				delta_norm = numpy.sum(delta**2)	
			# remean shocks
			mean_shock = numpy.mean(self.parameter_array[self.blp_shares_map])
			self.parameter_array[self.blp_shares_map] -= mean_shock
		if cached:
			try:
				if self.option.log_turns and self.logger(): self.logger().critical("<LL> {} <= {!s}".format(self._cached_results[self.parameter_array.tobytes()].loglike, self.parameter_array))
				return self._cached_results[self.parameter_array.tobytes()].loglike
			except (KeyError, AttributeError):
				pass
		# otherwise not cached (or not correctly) so calculate anew
		ll = super().loglike()
		if ll and isinstance(self._cached_results, function_cache):
			self._cached_results[self.parameter_array.tobytes()].loglike = ll
		if numpy.isnan(ll):
			self.doctor()
			ll = -numpy.inf
		if self.option.log_turns and self.logger() and self.logger(): self.logger().critical("<LL> {} <- {}".format(ll, str(self.parameter_array)))
		return ll

	def loglike_null(self):
		# save values
		value_save = self.parameter_array.copy()
		if self.option.null_disregards_holdfast:
			hold_save = self.parameter_holdfast_array.copy()
			self.parameter_holdfast_array[:] = 0
		# calc LL
		self._LL_null = self.loglike(self.parameter_null_values_array)
		# Restore values
		self.parameter_array[:] = value_save
		if self.option.null_disregards_holdfast:
			self.parameter_holdfast_array[:] = hold_save
		return self._LL_null

	def set_parameters_to_null(self, disregard_holdfast=None):
		"""
		Set the parameters to their null values.
		
		Parameters
		----------
		disregard_holdfast : bool or None
		"""
		if disregard_holdfast or (disregard_holdfast is not False and self.option.null_disregards_holdfast):
			self.parameter_array[:] = self.parameter_null_values_array[:]
		else:
			h = not self.parameter_holdfast_array[:]
			self.parameter_array[h] = self.parameter_null_values_array[h]

	def negative_loglike(self, *args, **kwargs):
		z = -(self.loglike(*args, **kwargs))
		return z

	def negative_d_loglike(self, *args):
		if self.Data_UtilityCE_manual.active():
			if len(args)>0:
				if numpy.any(numpy.isnan(args[0])):
					return numpy.full(self.parameter_array.shape, numpy.nan)
				self.parameter_values(args[0])
			numpy.dot(self._ce,self.Coef("UtilityCA").reshape(-1), out=self._u_ce)
			self.Utility()[self._ce_caseindex,self._ce_altindex] = self._u_ce
			z= -(self.d_loglike_given_utility())
		else:
			z= super().negative_d_loglike(*args)
		return z

	def d_loglike(self, *args, cached=True):
		"""
		Find the first derivative of the log likelihood of the model, with respect to the parameters.
		
		Parameters
		----------
		values : array-like, optional
			If given, an array-like vector of values should be provided that
			will replace the current parameter values.  The vector must be exactly
			as long as the number of parameters in the model (including holdfast
			parameters).  If any holdfast parameter values differ in the provided
			`values`, the new values are ignored and a warning is emitted to the
			model logger.
			
		Returns
		-------
		array
			An array of partial first derivatives with respect to the parameters, 
			thus matching the size of the parameter array.
		"""
		if self.Data_UtilityCE_manual.active():
			if len(args)>0:
				if numpy.any(numpy.isnan(args[0])):
					return numpy.full(self.parameter_array.shape, numpy.nan)
				self.parameter_values(args[0])
			numpy.dot(self._ce,self.Coef("UtilityCA").reshape(-1), out=self._u_ce)
			self.Utility()[self._ce_caseindex,self._ce_altindex] = self._u_ce
			return self.d_loglike_given_utility()
		if not cached:
			return -(self.negative_d_loglike_nocache(*args))
		else:
			return -(self.negative_d_loglike(*args))

	def d_loglike_nocache(self, *args):
		if len(args)>0:
			if numpy.any(numpy.isnan(args[0])):
				return numpy.full(self.parameter_array.shape, numpy.nan)
		if self.Data_UtilityCE_manual.active():
			return self.d_loglike(*args)
		return -(self.negative_d_loglike_nocache(*args))

	def d_loglike_cached(self, *args):
		if len(args)>0:
			if numpy.any(numpy.isnan(args[0])):
				return numpy.full(self.parameter_array.shape, numpy.nan)
		if self.Data_UtilityCE_manual.active():
			return self.d_loglike(*args)
		return -(self.negative_d_loglike_cached(*args))

	def negative_d_loglike_nocache(self, *args):
		if len(args)>0:
			if numpy.any(numpy.isnan(args[0])):
				return numpy.full(self.parameter_array.shape, numpy.nan)
		if self.Data_UtilityCE_manual.active():
			return self.negative_d_loglike(*args)
		return super().negative_d_loglike_nocache(*args)

	def negative_d_loglike_cached(self, *args):
		if len(args)>0:
			if numpy.any(numpy.isnan(args[0])):
				return numpy.full(self.parameter_array.shape, numpy.nan)
		if self.Data_UtilityCE_manual.active():
			return self.negative_d_loglike(*args)
		return super().negative_d_loglike_cached(*args)

	def negative_loglike_(self, x):
		'''Same as negative_loglike, but converts NAN to INF'''
		y = self.negative_loglike(x)
		if numpy.isnan(y):
			y = numpy.inf
		return y

	def d_loglike_given_utility(self):
		return -(self.negative_d_loglike_given_utility())

	def bhhh(self, *args, cached=True) -> "std::shared_ptr< etk::symmetric_matrix >":
		if self.Data_UtilityCE_manual.active():
			if len(args)>0:
				self.parameter_values(args[0])
			return _core.Model2_bhhh_cached(self)
		if not cached:
			return self.bhhh_nocache(*args)
		return _core.Model2_bhhh(self, *args)

	def setup_utility_ce(self):
		if len(self.utility.co)>0:
			raise LarchError('simultaneous use of idce format (packed idca) and idco format utility data is not yet supported')
		if hasattr(self.df, 'queries'):
			from .util.arraytools import label_to_index
			# load data and ids
			caseids = self.df.array_caseids().squeeze()
			ca_vars = self.needs()['UtilityCA'].get_variables()
			ca_vars_str = ", ".join(ca_vars)
			self._ce = self.df.array("SELECT {} FROM larch_idca".format(ca_vars_str), cte=True)
			ce_altids = self.df.array("SELECT altid FROM larch_idca", cte=True).astype(int).squeeze()
			ce_caseids = self.df.array("SELECT caseid FROM larch_idca", cte=True).astype(int).squeeze()
			# convert ids to indexes
			self._ce_caseindex = label_to_index(caseids, ce_caseids)
			self._ce_altindex = label_to_index(self.alternative_codes(), ce_altids)
			# provision other data, link ce data
			self.provision_without_utility()
			self.Data_UtilityCE_manual.maplink(self._ce_caseindex, self._ce_altindex, self._ce, len(caseids), len(self.alternative_codes()))
			self.setUp(False)
			# initialize utility
			self.Utility()[:] = -numpy.inf
			# dummy utility array
			self._u_ce = numpy.empty(self._ce.shape[0], dtype=numpy.float64)
		else:
			raise LarchError('use of idce format currently requires a linked DB data fountain')



	def gradient_check(self, disp=True):
#		from .metamodel import MetaModel
#		if isinstance(self, MetaModel):
#			self.setUp()
#		else:
#			try:
#				if self.is_provisioned()<=0:
#					self.provision()
#			except LarchError:
#				self.provision()
#			self.setUp()
		self.loglike()
		_force_recalculate = self.option.force_recalculate
		self.option.force_recalculate = True
#		a_grad = self.d_loglike_nocache()
		a_grad = self.d_loglike(cached=False)
#		fd_grad = self.finite_diff_gradient()
		fd_grad = self.finite_diff_d_loglike()
		self.option.force_recalculate = _force_recalculate
		return self._gradient_check_reporter(a_grad, fd_grad, disp=disp)


	def _gradient_check_reporter(self, a_grad, fd_grad, disp=True):
		namelen = max(len(n) for n in self.parameter_names())
		namelen = max(namelen,9)
		from .util.flux import flux_mag, flux
		from math import log10
		s = ("{1:<{0}s}\t{2:12s}\t{3:12s}\t{4:12s}\t{5:12s}".format(namelen,'Parameter','Value','Analytic','FiniteDiff','Flux'))
		max_flux = -999
		max_flux_name = ""
		for name,val,a,fd in zip(self.parameter_names(),self.parameter_values(), a_grad, fd_grad):
			s += "\n{1:<{0}s}\t{2:< 12.6g}\t{3:< 12.6g}\t{4:< 12.6g}\t{5:12s}".format(namelen,name,val,a,fd,flux_mag(fd,a))
			flx = flux(fd,a)
			if flx>max_flux:
				max_flux = flx
				max_flux_name = name
		if disp:
			if isinstance(disp,str):
				print(disp)
			print(s)
			return max_flux, max_flux_name
		return max_flux, s

	def d_logsums_check(self, caserows=(0,1,2), disp=True, agg=True):
		self.loglike()
		_force_recalculate = self.option.force_recalculate
		self.option.force_recalculate = True
		a_grad = self.d_logsums()
		fd_grad = self.finite_diff_d_logsums()
		self.option.force_recalculate = _force_recalculate
		if disp:
			ret = [self._gradient_check_reporter(a_grad[c], fd_grad[c], disp="=== CASE ROW {} ===".format(c)) for c in caserows]
			if agg:
				ret.append(self._gradient_check_reporter(a_grad.sum(0), fd_grad.sum(0), disp="=== AGGREGATE SUM ==="))
		else:
			ret = [self._gradient_check_reporter(a_grad[c], fd_grad[c], disp=False) for c in caserows]
			if agg:
				ret.append(self._gradient_check_reporter(a_grad.sum(0), fd_grad.sum(0), disp=False))
		return ret

	def d_loglike_casewise(self, v=None):
		if self.option.force_finite_diff_grad:
			return self.finite_diff_gradient_casewise(v)
		if v is None:
			return self._gradient_casewise()
		return self._gradient_casewise(v)

	def finite_diff_gradient_casewise(self, v=None):
		from .array import Array
		g = Array([self.nCases(), len(self)])
		if v is None:
			v = numpy.asarray(self.parameter_values())
		else:
			assert(len(v)==len(self))
			v = numpy.asarray(v)
		for n in range(len(self)):
			jiggle = v[n] * 1e-5 if v[n] else 1e-5
			v1 = v.copy()
			v1[n] += jiggle
			g[:,n] = self.loglike_casewise(v1)
			v2 = v.copy()
			v2[n] -= jiggle
			g[:,n] -= self.loglike_casewise(v2)
			g[:,n] /= -2*jiggle
		return g

	def finite_diff_d_loglike(self, *args, out=None, **kwargs):
		s = len(self)
		try:
			v = numpy.asarray(args[0])
			assert(v.shape[0]==s)
		except IndexError:
			v = numpy.asarray(self.parameter_values())
		if out is None or out.shape!=(s,):
			out = numpy.empty([s,], dtype=numpy.float64)
		for n in range(s):
			if self.parameter_holdfast_array[n]!=0:
				continue
			jiggle = (self[n].value * 1e-5) or 1e-5;
			v1 = v.copy()
			v1[n] += jiggle
			out[n] = self.loglike(v1, **kwargs)
			v1[n] -= jiggle*2
			out[n] -= self.loglike(v1, **kwargs)
			out[n] /= (2*jiggle)
		self.parameter_values(v)
		return out

	def finite_diff_d_logsums(self, *args, out=None, **kwargs):
		s = len(self)
		try:
			v = numpy.asarray(args[0])
			assert(v.shape[0]==s)
		except IndexError:
			v = numpy.asarray(self.parameter_values())
		if out is None or out.shape!=(self.nCases(), s,):
			out = numpy.empty([self.nCases(), s,], dtype=numpy.float64)
		for n in range(s):
			if self.parameter_holdfast_array[n]!=0:
				continue
			jiggle = (self[n].value * 1e-5) or 1e-5;
			v1 = v.copy()
			v1[n] += jiggle
			self.loglike(v1, cached=False)
			out[:,n] = self.logsums(**kwargs)
			v1[n] -= jiggle*2
			self.loglike(v1, cached=False)
			out[:,n] -= self.logsums(**kwargs)
			out[:,n] /= (2*jiggle)
		self.parameter_values(v)
		return out

	def finite_diff_hessian(self, *args, out=None, finite_grad=False):
		grad = lambda x: self.d_loglike(x)
		if finite_grad:
			grad = lambda x: self.finite_diff_d_loglike(x)
		s = len(self)
		try:
			v = numpy.asarray(args[0])
			assert(v.shape[0]==s)
		except IndexError:
			v = numpy.asarray(self.parameter_values())
		if out is None or out.shape!=(s,s):
			out = numpy.empty([s,s], dtype=numpy.float64)
		for n in range(s):
			if self.parameter_holdfast_array[n]!=0:
				continue
			jiggle = (self[n].value * 1e-5) or 1e-5;
			v1 = v.copy()
			v1[n] += jiggle
			out[:,n] = grad(v1)
			v1[n] -= jiggle*2
			out[:,n] -= grad(v1)
			out[:,n] /= (2*jiggle)
		return out


	def loglike_c(self):
		return self._get_estimation_statistics()[0]['log_like_constants']

	def logsums(self, fresh=False, hardway=False, **kwargs):
		if not hardway:
			if fresh:
				self.preserve_casewise_logsums = True
				self.loglike(cached=False)
			if self.top_logsums_out is not None:
				if self.top_logsums_out_currently_valid():
					return self.top_logsums_out
				else:
					raise ValueError('top_logsums are not up to date, re-run loglike')
			if self.top_logsums_out is None and (len(self.quantity) or len(self.nest)):
				raise NotImplementedError('logsums must be saved on the fly for non-MNL models')
		self.freshen()
		return self.calc_utility_logsums(self.Data("UtilityCO"),self.Data("UtilityCA"),self.Data("Avail"))

	top_logsums_out = property(Model2._get_top_logsums_out, Model2._set_top_logsums_out,
							   Model2._del_top_logsums_out, "array to store model logsums upon calculation, (only for MNL at present)")

	@property
	def preserve_casewise_logsums(self):
		"""
		Shall case-wise logsums be preserved when calculating the log likelihood?
		
		If you don't need them for anything in particular, there's no reason to use memory to save them.
		But if you do need them, it's much easier to save them than recreate them.
		"""
		return not(self.top_logsums_out is None)
	
	@preserve_casewise_logsums.setter
	def preserve_casewise_logsums(self, val):
		if val:
			if self.top_logsums_out is not None and self.top_logsums_out.shape == (self.nCases(),):
				pass
			else:
				self.top_logsums_out = numpy.zeros(self.nCases())
		else:
			del self.top_logsums_out

	casewise_gradient_buffer = property(Model2._get_casewise_grad_buffer, Model2._set_casewise_grad_buffer,
							   Model2._del_casewise_grad_buffer, "array to store model casewise gradient upon calculation, (only for NGEV at present)")

	def estimate_scipy(self, method='Nelder-Mead', basinhopping=False, constraints=(), maxiter=1000, disp=True, **kwargs):
		import scipy.optimize
		import datetime
		starttime = (datetime.datetime.utcnow() - datetime.datetime(1970, 1, 1)).total_seconds()
		if basinhopping:
			cb = lambda x, f, accept: print("{} <- {} ({})".format(f,",".join(str(i) for i in x), 'accepted' if accept else 'not accepted'))
			ret = scipy.optimize.basinhopping(
				self.negative_loglike,   # objective function
				self.parameter_values(), # initial values
				minimizer_kwargs=dict(method=method,args=(),jac=self.negative_d_loglike,
										hess=None, hessp=None, bounds=None,
										constraints=constraints, tol=None, callback=None,),
				disp=disp,
				callback=cb,
				**kwargs)
		else:
			ret = scipy.optimize.minimize(
				self.negative_loglike,   # objective function
				self.parameter_values(), # initial values
				args=(),
				method=method,
				jac=self.negative_d_loglike,
				hess=None, hessp=None, bounds=None, constraints=constraints, tol=None, callback=print if disp else None,
				options=dict(disp=disp, maxiter=maxiter))
		endtime = (datetime.datetime.utcnow() - datetime.datetime(1970, 1, 1)).total_seconds()
		startfrac, startwhole = math.modf(starttime)
		endfrac, endwhole = math.modf(endtime)
		startfrac *= 1000000
		endfrac *= 1000000
		try:
			s = ret.success
		except AttributeError:
			s = False
			try:
				if basinhopping and 'success' in ret.message[0]:
					s = True
			except:
				pass
		if s or True:
			self.parameter_values(ret.x)
			self._LL_current =  -(ret.fun) 
		return ret

	def data_quality_check(self, repair=None, autoprovision=True):
		if self.is_provisioned()<=0 and autoprovision:
			self.provision()
		elif self.is_provisioned()<=0 and not autoprovision:
			return
		clashes = numpy.nonzero( numpy.logical_and(self.Data("Choice"), ~self.Data("Avail")) )
		n_clashes = len(clashes[0])
		if n_clashes>0:
			self.clash = clashes
			if repair == '+':
				for i in zip(*clashes):
					self.DataEdit("Avail")[i] = True
				self.note("Model had {} cases where the chosen alternative is unavailable, these have been repaired by making it available".format(n_clashes))
			elif repair == '-':
				for i in zip(*clashes):
					self.DataEdit("Choice")[i] = 0
				self.note("Model had {} cases where the chosen alternative is unavailable, these have been repaired by making it not chosen".format(n_clashes))
			else:
				raise LarchError("Model has {} cases where the chosen alternative is unavailable".format(n_clashes))

	def analyze(self, reportfile=None, css=None, repair=None, est_args=None, est_tight=None, *arg, **kwargs):
		if reportfile is not None:
			htmlfile = XHTML(reportfile, *arg, **kwargs)
			
			xhead = XML_Builder("head")
			if self.title != '':
				xhead.title(self.title)
			xhead.style()
			if css is None:
				css = """
				.error_report {color:red; font-family:monospace;}
				table {border-collapse:collapse;}
				table, th, td {border: 1px solid #999999; padding:2px; font-family:monospace;}
				.statistics_bridge {text-align:center;}
				a.parameter_reference {font-style: italic; text-decoration: none}
				.strut2 {min-width:2in}
				.histogram_cell { padding-top:1; padding-bottom:1; vertical-align:center; }
				"""
			xhead.data(css.replace('\n',' ').replace('\t',' '))
			xhead.end_style()
			htmlfile << xhead
		else:
			from .util import xhtml
			htmlfile = xhtml.Elem('div')

		if self.is_provisioned()<=0:
			self.provision()
		try:
			qc = self.df.queries.quality_check()
		except AttributeError:
			qc = None
		
		clashes = numpy.nonzero( numpy.logical_and(self.Data("Choice"), ~self.Data("Avail")) )
		n_clashes = len(clashes[0])
		if n_clashes>0:
			self.clash = clashes
			if repair == '+':
				for i in zip(*clashes):
					self.DataEdit("Avail")[i] = True
				self.note("Model had {} cases where the chosen alternative is unavailable, these have been repaired by making it available".format(n_clashes))
			if repair == '-':
				for i in zip(*clashes):
					self.DataEdit("Choice")[i] = 0
				self.note("Model had {} cases where the chosen alternative is unavailable, these have been repaired by making it not chosen".format(n_clashes))
			else:
				raise LarchError("Model has {} cases where the chosen alternative is unavailable".format(n_clashes))
		
		if qc is not None and len(qc):
			self.note(qc)
		
		try:
			if est_tight is not None:
				self.estimate_tight(est_tight)
			elif est_args is None:
				self.estimate()
			else:
				self.estimate(est_args)
		except KeyboardInterrupt:
			pass

		htmlfile << self.report('*', style='xml')
		
		if reportfile is not None:
			try:
				htmlfile.dump()
				htmlfile._f.view()
			except AttributeError:
				pass
			return htmlfile.root
		else:
			return htmlfile


	def utility_full_constants(self):
		"Add a complete set of alternative specific constants"
		for code, name in self.df.alternatives()[1:]:
			self.utility.co("1",code,name)

	def __contains__(self, x):
		if x is None:
			return False
		if isinstance(x,(category,Categorizer)):
			for i in x.members:
				if i in self: return True
			return False
		if isinstance(x,pmath):
			return x.valid(self)
		from .roles import ParameterRef
		if isinstance(x,ParameterRef):
			return x.valid(self)
		if isinstance(x,(rename, Renamer)):
			found = []
			if x.name in self:
				found.append(x.name)
			for i in x.members:
				if i in self:
					found.append(i)
			if len(found)==0:
				return False
			elif len(found)==1:
				return True
			else:
				raise LarchError("model contains "+(" and ".join(found)))
		return super().__contains__(x)

	def __getitem__(self, x):
		if isinstance(x,rename):
			x = x.find_in(self)
		if isinstance(x,Renamer):
			x0 = x.decode(self.parameter_names())
			if x0 is None:
				x0 = x.decode(self.alias_names())
			x = x0
		try:
			return super().__getitem__(x)
		except KeyError:
			if len(self) < 500:
				from .util.text_manip import case_insensitive_close_matches
				did_you_mean_list = case_insensitive_close_matches(x, self.parameter_names())
				if len(did_you_mean_list)>0:
					did_you_mean = "Parameter '{}' not found, did you mean {}?".format(x, " or ".join("'{}'".format(s) for s in did_you_mean_list))
					raise KeyError(did_you_mean) from None
			raise

	def __setitem__(self, x, val):
		if isinstance(x,rename):
			x = x.find_in(self)
		return super().__setitem__(x, val)

	def __delitem__(self, key):
		dropindex = self._parameter_name_index.drop(key)
		retain = numpy.ones_like(self.parameter_array, dtype=bool)
		retain[dropindex] = False
		self._set_parameter_array( numpy.require(self.parameter_array[retain], requirements=['A', 'O', 'W', 'C']) )
		self._set_parameter_minbound_array( numpy.require(self.parameter_minimums[retain], requirements=['A', 'O', 'W', 'C']) )
		self._set_parameter_maxbound_array( numpy.require(self.parameter_maximums[retain], requirements=['A', 'O', 'W', 'C']) )
		self._set_holdfast_array( numpy.require(self.parameter_holdfast_array[retain], requirements=['A', 'O', 'W', 'C']) )
		self._set_null_values_array( numpy.require(self.parameter_null_values_array[retain], requirements=['A', 'O', 'W', 'C']) )
		self._set_init_values_array( numpy.require(self.parameter_initial_values_array[retain], requirements=['A', 'O', 'W', 'C']) )
		self._set_robust_covar_array( numpy.require(self._get_robust_covar_array()[retain,:][:,retain], requirements=['A', 'O', 'W', 'C']) )
		self._set_inverse_hessian_array( numpy.require(self._get_inverse_hessian_array()[retain,:][:,retain], requirements=['A', 'O', 'W', 'C']) )
		self.hessian_matrix = numpy.require( self.hessian_matrix[retain,:][:,retain], requirements=['A', 'O', 'W', 'C'])
		
	def provision_without_utility(self):
		if not hasattr(self,'df'):
			raise LarchError('model has no db specified for provisioning')
		self.tearDown()
		needs = self.needs()
		if 'UtilityCA' in needs:
			del needs['UtilityCA']
		if 'UtilityCO' in needs:
			del needs['UtilityCO']
		provided = self.df.provision(needs)
		try:
			self.provision(provided)
		except ProvisioningError:
			pass

	def provision_zeros(self, ncases=None, nalts=None, initializer=None, avail_initializer=None):
		'''
		Initialize input data arrays with zeros instead of loading from a data file.
		
		Parameters
		----------
		ncases : int
			Override the number of cases provisioned.  You probably want to use this.
		nalts : int
			Override the nubmer of alternatives provisioned.  
			Probably you don't want to do this, but just in case.
		initializer : float64
			Optionally fill utilityca and utilityco with this value instead of zero.
		avail_initializer : bool
			Optionally fill avail with this value instead of False
		'''
		need = self.needs()
		ncases = ncases or self.nCases()
		if ncases==0:
			import warnings
			warnings.warn("ncases is zero in provision_zeros")
		if nalts==0:
			import warnings
			warnings.warn("nalts is zero in provision_zeros")
		nalts = nalts or self.nAlts()
		zer = {}
		_shape = lambda req: (ncases, nalts, req.nVars() or 1) if req.dimty==3 else (ncases, req.nVars() or 1)
		numpy_dtype_nums = {
			7: numpy.int64,
			12: numpy.float64,
			0: numpy.bool,
		}
		for key,val in need.items():
			if initializer is not None and key in ('UtilityCA','UtilityCO'):
				zer[key] = numpy.full(_shape(val), initializer, dtype=numpy_dtype_nums[val.dtype])
			elif avail_initializer is not None and key in ('Avail',):
				zer[key] = numpy.full(_shape(val), avail_initializer, dtype=numpy_dtype_nums[val.dtype])
			else:
				zer[key] = numpy.zeros(_shape(val), dtype=numpy_dtype_nums[val.dtype])
		self.provision( zer )

	def provision(self, *args, idca_avail_ratio_floor=None, cache=False, **kwargs):
		from .db import DB
		from .dt import DT
		if idca_avail_ratio_floor is None:
			idca_avail_ratio_floor = self.option.idca_avail_ratio_floor
		if len(args)==0:
			if cache:
				md5 = self.data.needs_hash()
				from .util.dirs import project_cache
				cachefile = project_cache.provisioning(md5+'.npz')
				if os.path.exists(cachefile):
					if self.logger():
						self.logger().log(50,'provisioning from cache at {}'.format(cachefile))
					args = (dict(numpy.load(cachefile, 'r')),)
					cache = False # loaded it, so don't overwrite it
		if len(args)==0:
			if hasattr(self,'df') and isinstance(self.df,(DB,DT)):
				args = (self.df.provision(self.needs(), idca_avail_ratio_floor=idca_avail_ratio_floor, log=self.logger(), **kwargs), )
			else:
				raise LarchError('model has no db specified for provisioning')
		otherformats = {}
		provided = args[0]
		for key,value in provided.items():
			if not isinstance(value, numpy.ndarray):
				otherformats[key] = value
		for key in otherformats.keys():
			del provided[key]
		if "UtilityCE" in otherformats:
			self.Data_UtilityCE_builtin.maplink(*(otherformats["UtilityCE"]))
		if "SamplingCE" in otherformats:
			self.Data_SamplingCE_builtin.maplink(*(otherformats["SamplingCE"]))
		if provided == {}:
			raise TypeError("nothing provided here")
		super().provision(provided)
		if cache:
			if self.logger():
				self.logger().log(50,'caching provisioned data at {}'.format(cachefile))
			numpy.savez_compressed(cachefile, **provided)

	def provision_fat(self, fat=1, screen=None):
		self.provision(self.df.provision_fat(needs=self.needs(),screen=screen,fat=fat))
		self.setUp(False)

	def reprovision(self, *args, idca_avail_ratio_floor=None):
		self.unprovision()
		self.provision(*args, idca_avail_ratio_floor=idca_avail_ratio_floor)

	def alias(self, *args):
		if not args:
			raise NameError('an alias must have a name')
		name = args[0]
		if name in self._parameter_name_index:
			#import warnings
			#warnings.warn("overwriting a parameter with an alias is buggy. ({})".format(name))
			raise KeyError("overwriting a parameter with an alias is buggy, and not currently allowed")
		if name in self._parameter_name_index:
			del self[name]
		z = super().alias(*args)
		#z.set_referred_modelparam( self.parameter(z.refers_to) )
		return z


	def setup_blp_contraction(self, shares_map, log_marketshares=None):
		assert( len(self.alternative_codes()) == len(shares_map) )
		self.blp_shares_map = shares_map
		for i in shares_map:
			self[i].holdfast = 2
		if log_marketshares is None:
			ch = self.Data("Choice")
			shares = ch.sum(0)
			shares /= shares.sum()
			self.logmarketshares = numpy.log(shares).squeeze()
		else:
			self.logmarketshares = log_marketshares

	def parameter_dataframe(self):
		"""
		Return the parameters as a :class:`pandas.DataFrame`.
		"""
		import pandas
		df = pandas.DataFrame(
				data={
						'name':self.parameter_names(),
						'value':self.parameter_array,
						'holdfast':self.parameter_holdfast_array,
						'max_value':self.parameter_maximums,
						'min_value':self.parameter_minimums,
						'null_value':self.parameter_null_values_array,
						'std_err':[p.std_err for p in self],
						't_stat':[p.t_stat for p in self],
						'robust_std_err':[p.robust_std_err for p in self],
					},
				columns = (
						'name','value','std_err','t_stat','robust_std_err',
						'null_value','initial_value','min_value','max_value','holdfast',
					),
			)
		return df


	def reorder_parameters(self, *ordering):
		"""
		Reorder the parameters in the model.
		
		This method reorders the model parameters as they appear in the model.
		It should have no material impact on the model results, although it
		may be convenient for presentation.
		
		The ordering is defined by a series of regular expressions (regex). For each
		regex, all of the parameter names matching that regex are grouped together
		and moved to the front of the list, retaining their original ordering within
		the group.  Any subsequent matches for the same parameter are ignored.  All
		unmatched parameters retain their original ordering and move to the end of
		the list as a group.
		
		Parameters
		----------
		ordering : list or tuple of str
			A list of regex expressions.
			
		Examples
		--------
		>>> import larch
		>>> m = larch.Model()
		>>> m.parameter("A1", value=1)
		ModelParameter('A1', value=1.0)
		>>> m.parameter("B1", value=2)
		ModelParameter('B1', value=2.0)
		>>> m.parameter("C1", value=3)
		ModelParameter('C1', value=3.0)
		>>> m.parameter("A2", value=4)
		ModelParameter('A2', value=4.0)
		>>> m.parameter("B2", value=5)
		ModelParameter('B2', value=5.0)
		>>> m.parameter("C2", value=6)
		ModelParameter('C2', value=6.0)
		>>> m.parameter_names()
		['A1', 'B1', 'C1', 'A2', 'B2', 'C2']
		>>> m.parameter_values()
		(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)
		>>> m.reorder_parameters('A','C')
		>>> m.parameter_names()
		['A1', 'A2', 'C1', 'C2', 'B1', 'B2']
		>>> m.parameter_values()
		(1.0, 4.0, 3.0, 6.0, 2.0, 5.0)
		"""
		self.tearDown()
		self.setUp(and_load_data=False, force=True)
		import re
		names = self.parameter_names()
		slots = numpy.empty(0, dtype=int)
		if len(ordering)==1 and isinstance(ordering[0], (tuple,list)):
			ordering = ordering[0]
		for regex in tuple(ordering) + ("",):
			newslots = numpy.where([re.search(regex,x) for x in names])[0]
			if len(slots):
				inactive_newslots = numpy.in1d(newslots, slots)
				newslots = newslots[~inactive_newslots]
			slots = numpy.append(slots, newslots)

		self.parameter_array[:] = self.parameter_array[slots]
		self.parameter_holdfast_array[:] = self.parameter_holdfast_array[slots]
		self.parameter_initial_values_array[:] = self.parameter_initial_values_array[slots]
		self.parameter_null_values_array[:] = self.parameter_null_values_array[slots]
		self.parameter_maximums[:] = self.parameter_maximums[slots]
		self.parameter_minimums[:] = self.parameter_minimums[slots]
		
		self.robust_covariance_matrix[:,:] = self.robust_covariance_matrix[slots,:]
		self.robust_covariance_matrix[:,:] = self.robust_covariance_matrix[:,slots]
		
		self.covariance_matrix[:,:] = self.covariance_matrix[slots,:]
		self.covariance_matrix[:,:] = self.covariance_matrix[:,slots]

		self.hessian_matrix[:,:] = self.hessian_matrix[slots,:]
		self.hessian_matrix[:,:] = self.hessian_matrix[:,slots]
		try:
			self._parameter_name_index.reorder(numpy.asarray(names)[slots])
		except:
			print(numpy.asarray(names))
			print(slots)
			print(numpy.asarray(names)[slots])
			raise
		self.tearDown()
		self.setUp(and_load_data=False, force=True)


#	def _simple_bhhh_direction(self):
#		b = self.bhhh()
#		from .linalg import general_inverse


	def suggest(self, paramname, value):
		"""
		Suggest a starting value for a parameter.
		
		Parameters
		----------
		paramname : str
			The name of the parameter to suggest a value for.  If not already in the model, this method is a no-op.
		value : numeric
			The value to suggest
		"""
		if paramname not in self:
			return
		try:
			p = self[paramname]
		except KeyError:
			# parameter not found in first check, examine utility function to check if the model isn't setUp yet
			from .roles import ParameterRef
			p_ref = ParameterRef(paramname)
			if p_ref in self.utility.ca:
				self.parameter(p_ref)
		if not isinstance(p, ModelParameter) or p.holdfast:
			return
		p.initial_value = value
		p.value = value

	def reference_parameter(self, *args):
		self.setUp(False, True)
		for arg in args:
			if arg in self.parameter_names():
				self.parameter(arg, holdfast=1)
				return
		raise NameError('None of the potential reference parameters was found')


class _AllInTheFamily():

	def __init__(self, this, func):
		self.this_ = this
		self.func_ = func

	def __call__(self, *args, **kwargs):
		return [self.func_(i,*args, **kwargs) for i in self.this_]

	def list(self):
		if isinstance(self.func_, property):
			return [self.func_.fget(i) for i in self.this_]
		else:
			return [getattr(i, self.func_) for i in self.this_]

	def __getattr__(self, attr):
		if attr[-1]=="_":
			return super().__getattr__(attr)
		if isinstance(self.func_, property):
			return [getattr(self.func_.fget(i), attr) for i in self.this_]
		else:
			return [getattr(i, attr) for i in self.this_]

	def __setattr__(self, attr, value):
		if attr[-1]=="_":
			return super().__setattr__(attr,value)
		try:
			iterator = iter(value)
		except TypeError:
			multi = False
		else:
			multi = True if len(value)==len(self.this_) else False
		if multi:
			if isinstance(self.func_, property):
				for i,v in zip(self.this_, value):
					setattr(self.func_.fget(i), attr, v)
			else:
				for i,v in zip(self.this_, value):
					setattr(i, attr, v)
		else:
			if isinstance(self.func_, property):
				for i in self.this_:
					setattr(self.func_.fget(i), attr, value)
			else:
				for i in self.this_:
					setattr(i, attr, value)

class ModelFamily(list):

	def __init__(self, *args, **kwargs):
		self._name_map = {}
		list.__init__(self)
		for arg in args:
			self.add(arg)
		for key, arg in kwargs.items():
			self.add(arg, key)

	def add(self, arg, name=None):
		if isinstance(arg, (str,bytes)):
			try:
				self.append(Model.loads(arg))
			except LarchError:
				raise TypeError("family members must be Model objects (or loadable string or bytes)")
		elif isinstance(arg, Model):
			self.append(arg)
		else:
			raise TypeError("family members must be Model objects (or loadable string or bytes)")
		if name is not None:
			if isinstance(name, str):
				self._name_map[name] = len(self)-1
			else:
				raise TypeError("family names must be strings")

	def load(self, file, name=None):
		self.add(Model.load(file), name)

	def __getitem__(self, key):
		if isinstance(key, str):
			return self[self._name_map[key]]
		else:
			return super().__getitem__(key)

	def __setitem__(self,key,value):
		if isinstance(key, str):
			if key in self._name_map:
				slot = self._name_map[key]
				self[slot] = value
			else:
				self.add(value, key)
		else:
			super().__setitem__(key,value)

	def __contains__(self, key):
		return key in self._name_map

	def replicate(self, key, newkey=None):
		source = self[key]
		m = Model.copy(source)
		m.df = source.df
		self.add(m, newkey)
		return m

	def spawn(self, newkey=None):
		"Create a blank model using the same data"
		m = Model(self.df)
		self.add(m, newkey)
		return m

	def _set_df(self, df):
		for i in self:
			i.df = df

	def _get_df(self):
		for i in self:
			if i.df is not None:
				return i.df

	def _del_df(self):
		for i in self:
			del i.df

	df = property(_get_df, _set_df, _del_df)

	def constants_only_model(self, est=True, logger=False):
		m = self.spawn("constants_only")
		m.utility_full_constants()
		m.option.calc_std_errors = False
		m.logger(logger)
		if est:
			m.estimate()

	def all_option(self, opt, value=None):
		if value is None:
			return [i.option[opt] for i in self]
		else:
			for i in self:
				i.option[opt] = value

	def __getattr__(self,attr):
		return _AllInTheFamily(self, getattr(Model,attr))


#	def __getstate__(self):
#		import pickle, zlib
#		mods = [zlib.compress(pickle.dumps(i)) for i in self]
#		return (mods,self._name_map)
#		
#	def __setstate__(self, state):
#		for i in state[0]:
#			self.append(pickle.loads(zlib.decompress(i)))
#		self._name_map = state[1]

