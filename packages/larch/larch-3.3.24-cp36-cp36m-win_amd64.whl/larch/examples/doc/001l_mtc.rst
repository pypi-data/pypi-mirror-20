.. currentmodule:: larch

======================================
1l: MTC MNL Mode Choice (Legacy Style)
======================================

.. testsetup:: *

   import larch



This example is a mode choice model built using the MTC example dataset.  We will use
a "legacy" style of coding the utility functions, which is deprecated as of
larch version 3.3. It still works, but it is not as easy to read and understand as the
newer style.  If you are learning larch, it's probably best to skip this example.

First we create the DB and Model objects:

.. testcode::

	d = larch.DB.Example('MTC')
	m = larch.Model(d)

Then we can build up the utility function.  We'll use some idco data first, using
the `utility.co` command.  This command takes two or three arguments: a data column,
an alternative code, and an (optional) parameter name.  If no parameter name is
given, one will be created automatically.
The data column is a string and can be any idCO data column or a pre-calculated
value derived from one or more idCO data columns, or no data columns at all (e.g.,
by just giving an integer, as a string, as the name of the column).

.. testcode::

	m.utility.co("1",2,"ASC_SR2")
	m.utility.co("1",3,"ASC_SR3P") 
	m.utility.co("1",4,"ASC_TRAN") 
	m.utility.co("1",5,"ASC_BIKE") 
	m.utility.co("1",6,"ASC_WALK") 
	m.utility.co("hhinc",2)
	m.utility.co("hhinc",3)
	m.utility.co("hhinc",4)
	m.utility.co("hhinc",5)
	m.utility.co("hhinc",6)

Next we'll use some idca data, with the `utility.ca` command. This command takes
one or two arguments: a data column,
an alternative code, and an (optional) parameter name.  If no parameter name is
given, one will be created automatically.  You can give an integer as the data
column here as well, but you probably won't want to (as it will create
problems in parameter estimation if, for an idca variable, there is no variance
across alternatives.

.. testcode::

	m.utility.ca("tottime")
	m.utility.ca("totcost")

We can specify some model options too.  And let's give our model a descriptive title.

.. testcode::

	m.option.calc_std_errors = True
	m.title = "MTC Example 1 (Simple MNL)"


Having created this model, we can then estimate it:

.. doctest::
	:options: +ELLIPSIS, +NORMALIZE_WHITESPACE

	>>> m.maximize_loglike()
	messages: Optimization terminated successfully ...
	>>> m.loglike()
	-3626.18...

	>>> print(m)
	============================================================================================
	MTC Example 1 (Simple MNL)
	============================================================================================
	Model Parameter Estimates
	--------------------------------------------------------------------------------------------
	Parameter	InitValue   	FinalValue  	StdError    	t-Stat      	NullValue   
	ASC_SR2  	 0          	-2.17804    	 0.104638   	-20.815     	 0          
	ASC_SR3P 	 0          	-3.72513    	 0.177692   	-20.964     	 0          
	ASC_TRAN 	 0          	-0.670973   	 0.132591   	-5.06047    	 0          
	ASC_BIKE 	 0          	-2.37634    	 0.304502   	-7.80403    	 0          
	ASC_WALK 	 0          	-0.206814   	 0.1941     	-1.0655     	 0          
	hhinc#2  	 0          	-0.00217    	 0.00155329 	-1.39704    	 0          
	hhinc#3  	 0          	 0.000357656	 0.00253773 	 0.140935   	 0          
	hhinc#4  	 0          	-0.00528648 	 0.00182882 	-2.89064    	 0          
	hhinc#5  	 0          	-0.0128081  	 0.00532408 	-2.40568    	 0          
	hhinc#6  	 0          	-0.00968626 	 0.00303305 	-3.19358    	 0          
	tottime  	 0          	-0.0513404  	 0.00309941 	-16.5646    	 0          
	totcost  	 0          	-0.00492031 	 0.000238894	-20.5962    	 0
	============================================================================================
	Model Estimation Statistics
	--------------------------------------------------------------------------------------------
	Log Likelihood at Convergence     	-3626.19
	Log Likelihood at Null Parameters 	-7309.60
	--------------------------------------------------------------------------------------------
	Rho Squared w.r.t. Null Parameters	0.504
	============================================================================================
	...


You can then access individual parameters from the model either by name or number
(using zero-based indexing).

.. doctest::
	:options: +ELLIPSIS, +NORMALIZE_WHITESPACE

	>>> m[0]
	ModelParameter('ASC_SR2', value=-2.17...)

	>>> m['totcost']
	ModelParameter('totcost', value=-0.00492...)


The :func:`len` function retrieves the number of parameters.

.. doctest::
	:options: +ELLIPSIS, +NORMALIZE_WHITESPACE

	>>> len(m)
	12


You can get a list of the parameter names in order.

.. doctest::
	:options: +ELLIPSIS, +NORMALIZE_WHITESPACE

	>>> m.parameter_names()
	['ASC_SR2', 'ASC_SR3P', 'ASC_TRAN', 'ASC_BIKE', 'ASC_WALK', 'hhinc#2',
	'hhinc#3', 'hhinc#4', 'hhinc#5', 'hhinc#6', 'tottime', 'totcost']

