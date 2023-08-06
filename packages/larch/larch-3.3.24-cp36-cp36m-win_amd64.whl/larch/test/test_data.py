#
#  Copyright 2007-2016 Jeffrey Newman
#
#  This file is part of Larch.
#
#  Larch is free software: you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
#
#  Larch is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with Larch.  If not, see <http://www.gnu.org/licenses/>.
#

if __name__ == "__main__" and __package__ is None:
    __package__ = "larch.test.test_data"


import nose, unittest
from nose.tools import *
from ..test import TEST_DATA, ELM_TestCase, DEEP_TEST
from ..db import DB
from ..dt import DT
from ..model import Model
from ..core import LarchError, SQLiteError, FacetError, darray_req, LinearComponent
from ..exceptions import *
from ..array import Array, ArrayError
import shutil, os
import numpy, pandas

class TestSwigCommmands(ELM_TestCase):
	def test_dictionaries(self):
		from ..core import _swigtest_alpha_dict, _swigtest_empty_dict
		self.assertEqual({'a':1.0, 'b':2.0, 'c':3.0}, _swigtest_alpha_dict())
		self.assertEqual({}, _swigtest_empty_dict())


class TestData1(unittest.TestCase):
	def test_basic_stats(self):
		d = DB.Example('MTC')

		self.assertEqual(5029, d.nCases())		
		self.assertEqual(6, d.nAlts())
		
		AltCodes = d.alternative_codes()
		self.assertTrue( len(AltCodes) == 6 )
		self.assertTrue( 1 in AltCodes )  
		self.assertTrue( 2 in AltCodes )  
		self.assertTrue( 3 in AltCodes )  
		self.assertTrue( 4 in AltCodes )  
		self.assertTrue( 5 in AltCodes )  
		self.assertTrue( 6 in AltCodes )  

		AltNames = d.alternative_names()
		self.assertTrue( len(AltNames) == 6 )
		self.assertTrue( 'DA' in AltNames )  
		self.assertTrue( 'SR2' in AltNames )  
		self.assertTrue( 'SR3+' in AltNames )  
		self.assertTrue( 'Tran' in AltNames )  
		self.assertTrue( 'Bike' in AltNames )  
		self.assertTrue( 'Walk' in AltNames )  

	def test_StoredDict(self):
		from ..util import stored_dict
		d = DB()
		s1 = stored_dict(d,'hello')
		s1.add('a')
		s1.add('b')
		self.assertEqual( 1, s1.a )
		self.assertEqual( 2, s1.b )
		s2 = stored_dict(d,'hello')
		self.assertEqual( 1, s2.a )
		self.assertEqual( 2, s2.b )
		s1['c'] = 5
		self.assertEqual( 5, s2.c )

	@raises(NoResultsError)
	def test_no_results(self):
		db = DB()
		db.value("select 1 limit 0;")

	@raises(TooManyResultsError)
	def test_too_many_results(self):
		db = DB()
		db.execute("CREATE TEMP TABLE zz(a); INSERT INTO zz VALUES (1);INSERT INTO zz VALUES (2);")
		db.value('''SELECT a FROM zz;''')

	def test_dataframe(self):
		cols = ['a', 'b', 'c', 'd', 'e']
		df1 = pandas.DataFrame(numpy.random.randn(10, 5), columns=cols)
		db = DB()
		db.import_dataframe(df1, table="staging", if_exists='append')
		df2 = db.dataframe("SELECT * FROM staging")
		self.assertEqual( 5, len(df2.columns) )
		self.assertEqual( 10, len(df2) )
		for c in cols:
			for i in range(10):
				self.assertEqual( df1[c][i], df2[c][i])


	def test_percentiles(self):
		db = DB.Example()
		self.assertEqual( 2515, db.value("SELECT median(casenum) FROM "+db.tbl_idco()) )
		self.assertEqual( 2515, db.value("SELECT percentile(casenum, 50) FROM "+db.tbl_idco()) )
		self.assertEqual( 3772, db.value("SELECT upper_quartile(casenum) FROM "+db.tbl_idco()))
		self.assertEqual( 3772, db.value("SELECT percentile(casenum, .75) FROM "+db.tbl_idco()))
		self.assertEqual( 5029, db.value("SELECT percentile(casenum, 1.00) FROM "+db.tbl_idco()))
		self.assertEqual( 5029, db.value("SELECT percentile(casenum, 100) FROM "+db.tbl_idco()))
		self.assertEqual( 4979, db.value("SELECT percentile(casenum, 0.99) FROM "+db.tbl_idco()))
		self.assertEqual( 4979, db.value("SELECT percentile(casenum, 99) FROM "+db.tbl_idco()))

	def test_ldarray(self):
		import numpy
		z = numpy.ones([3,3])
		with self.assertRaises(ArrayError):
			q = Array(z, vars=['a','b'])
		q = Array(z, vars=['a','b','c'])
		w = Array(z, vars=['x','b','c'])
		req = darray_req(2,numpy.dtype('float64'))
		req.set_variables(['a','b','c'])
		self.assertTrue(req.satisfied_by(q)==0)
		self.assertFalse(req.satisfied_by(w)==0)
		self.assertTrue(req.satisfied_by(z)==0)

	def test_export_import_idca(self):
		from io import StringIO
		f = StringIO()
		d = DB.Example('MTC')
		d.queries.idco_query += " WHERE casenum < 100"
		d.queries.idca_query += " WHERE casenum < 100"
		m1 = Model.Example()
		m1.df = d
		m1.provision()
		self.assertAlmostEqual( -147.81203484134275, m1.loglike(), delta= 0.000001)
		self.assertAlmostEqual( -472.8980609887492, m1.loglike((-0.01,0,0,0,0.1,0,0,0.1,0,0,0,0)), delta= 0.000001)
		d.export_idca(f)
		f.seek(0)
		x = DB.CSV_idca(f, caseid='caseid', altid='altid', choice='chose', weight=None, avail=None, tablename='data', tablename_co='_co', savename=None, alts={}, safety=True)
		self.assertEqual( 99, x.nCases() )
		self.assertEqual( 6, x.nAlts() )
		self.assertEqual( ('caseid', 'altid', 'altnum', 'chose', 'ivtt', 'ovtt', 'tottime', 'totcost'), x.variables_ca() )
		self.assertEqual( ('caseid', 'casenum', 'hhid', 'perid', 'numalts', 'dist', 'wkzone', 'hmzone', 'rspopden', 'rsempden', 'wkpopden', 'wkempden', 'vehavdum', 'femdum', 'age', 'drlicdum', 'noncadum', 'numveh', 'hhsize', 'hhinc', 'famtype', 'hhowndum', 'numemphh', 'numadlt', 'nmlt5', 'nm5to11', 'nm12to16', 'wkccbd', 'wknccbd', 'corredis', 'vehbywrk', 'vocc', 'wgt'), x.variables_co() )
		m = Model.Example()
		m.df = x
		m.provision()
		self.assertAlmostEqual( -147.81203484134275, m.loglike(), delta= 0.000001)
		self.assertAlmostEqual( -472.8980609887492, m.loglike((-0.01,0,0,0,0.1,0,0,0.1,0,0,0,0)), delta= 0.000001)


	def test_component(self):
		nullcode = -9997999
	
		c = LinearComponent()
		self.assertEqual( nullcode, c._altcode )
		self.assertEqual( nullcode, c._upcode )
		self.assertEqual( nullcode, c._dncode )
		self.assertEqual( ""      , c._altname )
		self.assertEqual( ""      , c.data )
		self.assertEqual( ""      , c.param )

		c = LinearComponent(data="123", param="par", category=(3,4))
		self.assertEqual( nullcode, c._altcode )
		self.assertEqual( 3, c._upcode )
		self.assertEqual( 4, c._dncode )
		self.assertEqual( "", c._altname )
		self.assertEqual( "123", c.data )
		self.assertEqual( "par", c.param )

		c = LinearComponent(data="123", param="par", category=5)
		self.assertEqual( 5, c._altcode )
		self.assertEqual( nullcode, c._upcode )
		self.assertEqual( nullcode, c._dncode )
		self.assertEqual( "", c._altname )
		self.assertEqual( "123", c.data )
		self.assertEqual( "par", c.param )

		c = LinearComponent(data="123", param="PAR", category="five")
		self.assertEqual( nullcode, c._altcode )
		self.assertEqual( nullcode, c._upcode )
		self.assertEqual( nullcode, c._dncode )
		self.assertEqual( "five", c._altname )
		self.assertEqual( "123", c.data )
		self.assertEqual( "PAR", c.param )

	def test_numbering_system(self):
		from ..util.numbering import numbering_system
		from enum import Enum
		class levels_of_service(Enum):
			nonstop = 1
			withstop = 2
		class carriers(Enum):
			DL = 1
			US = 2
			UA = 3
			AA = 4 
			Other = 5
		class things(Enum):
			Apple = 1
			Orange = 2
			Hat = 3
			Boot = 4
			Camera = 5
			Box = 10
			Squid = 12
			Dog = 13
			Cat = 14
			Sun = 15
		ns = numbering_system(levels_of_service, carriers, things)
		self.assertEqual( ['0b11', '0b11100', '0b111100000'], [bin(a) for a in ns.bitmasks] )
		self.assertEqual( [0, 2, 5], [s for s in ns.shifts] )
		nn = ns.code_from_attributes(1, levels_of_service.withstop, carriers.UA, things.Cat)
		self.assertEqual(974, nn)
		x = ns.attributes_from_code(nn)
		self.assertEqual( (1, levels_of_service.withstop, carriers.UA, things.Cat), x)


	def test_pytables_examples(self):
		dts = DT.Example('SWISSMETRO')
		ms = Model.Example(101)
		ms.df = dts
		ms.provision()
		x = [-0.7012268762617896, -0.15465520761303447, -0.01277806274978315, -0.01083774419411773]
		self.assertAlmostEqual(  -5331.252007380466 , ms.loglike(x,cached=False))
		dt = DT.Example()
		dt.h5top.screen[:10] = False
		rr = dt.array_idca('_avail_*hhinc')
		self.assertEqual( rr.shape, (5019, 6, 1) )
		self.assertTrue( numpy.allclose( rr[0], numpy.array([[ 42.5],[ 42.5],[ 42.5],[ 42.5],[ 42.5],[  0. ]]) ))
		rr1 = dt.array_idca('_avail_')
		rr2 = dt.array_idca('hhinc')
		self.assertEqual( rr1.shape, (5019, 6, 1) )
		self.assertEqual( rr2.shape, (5019, 6, 1) )
#		m = Model.Example()
#		m.db = dt
#		m.utility.ca('exp(log(ivtt))+ovtt+altnum')
#		m.maximize_loglike()
#		self.assertAlmostEqual(   -3616.461567801068 , m.loglike())
#		self.assertEqual(   5019 , m.nCases())

	def test_pytables_examples_validate(self):
		d1=DT.Example('MTC')
		self.assertEqual( 0, d1.validate_hdf5(log=(lambda y: None), errlog=print) )
		del d1
		d2=DT.Example('SWISSMETRO')
		self.assertEqual( 0, d2.validate_hdf5(log=(lambda y: None), errlog=print) )
		del d2
		d3=DT.Example('ITINERARY')
		self.assertEqual( 0, d3.validate_hdf5(log=(lambda y: None), errlog=print) )
		del d3
		d4=DT.Example('MINI')
		self.assertEqual( 0, d4.validate_hdf5(log=(lambda y: None), errlog=print) )
		del d4


	def test_autoindex_string(self):
		from ..core import autoindex_string
		a = autoindex_string( ['Hello','World!'] )
		self.assertEqual( 1, a['World!'] )
		self.assertEqual( 0, a['Hello'] )
		self.assertEqual( 2, a['Earth!'] )
		self.assertEqual( 1, a.drop('World!') )
		self.assertEqual( 1, a['Earth!'] )
		self.assertEqual( 1, a[-1] )
		with self.assertRaises(IndexError):
			a[-3]
		with self.assertRaises(IndexError):
			a[3]
		a.extend(['a','b','c'])
		self.assertEqual( 5, len(a) )
		self.assertEqual( 3, a['b'] )


	def test_html_reporting_2(self):
		m = Model.Example(1, pre=True)
		from ..util.categorize import Categorizer, Renamer
		from ..util.xhtml import XHTML
		import re
		param_groups = [
			Categorizer('Level of Service',
					 Renamer('Total Time', 'tottime'),
					 Renamer('Total Cost', 'totcost'),
					),
			Categorizer('Alternative Specific Constants',
						'ASC.*',
					),
			Categorizer('Income',
						'hhinc.*',
					),
		]
		with XHTML(quickhead=m) as f:
			f << m.xhtml_title()
			f << m.xhtml_params(param_groups)
			s = f.dump()
		self.assertTrue(re.compile(b'<td.*class=".*parameter_category".*>Level of Service</td>').search(s) is not None)
		self.assertTrue(re.compile(b'<td.*class=".*parameter_category".*>Alternative Specific Constants</td>').search(s) is not None)
		self.assertTrue(re.compile(b'<td.*><a.*></a>Total Cost</td>.*<td.*>-0.00492\s*</td>').search(s) is not None)


	def test_pytables_import_idco_with_nulls(self):
		dt = DT()
		tinytest = os.path.join( DT.ExampleDirectory(), 'tinytest.csv' )
		dt.import_idco(tinytest)
		self.assertEqual( 2, dt.idco.Banana[0] )
		self.assertTrue( numpy.isnan(dt.idco.Banana[1]) )
		self.assertTrue( numpy.isnan(dt.idco.Banana[-1]) )
		purch = numpy.array([b'Apple', b'Cookie', b'Apple', b'Banana', b'Cookie', b'Apple',
							b'Apple', b'Cookie', b'Cookie'],
							dtype='|S8')
		self.assertTrue(numpy.array_equal( purch, dt.idco.Purchase[:] ))
		apple = numpy.array([1, 1, 2, 1, 1, 2, 1, 1, 2])
		self.assertTrue( numpy.array_equal(apple, dt.idco.Apple[:]) )
		dt.set_alternatives(['Apple','Banana','Cookie'])
		dt.avail_idco("isfinite(Apple)","isfinite(Banana)","isfinite(Cookie)",)
		av = numpy.array([[ True,  True,  True],
						   [ True, False,  True],
						   [ True, False,  True],
						   [ True,  True,  True],
						   [ True, False,  True],
						   [ True, False,  True],
						   [ True,  True,  True],
						   [ True, False,  True],
						   [ True, False,  True]], dtype=bool)
		self.assertTrue(numpy.array_equal( av, dt.array_avail().squeeze() ))
		dt.avail_idco("1",1,0, varname='_built_avail2_')
		av2 = numpy.array( [[ True,  True,  False],
						   [ True,  True,  False],
						   [ True,  True,  False],
						   [ True,  True,  False],
						   [ True,  True,  False],
						   [ True,  True,  False],
						   [ True,  True,  False],
						   [ True,  True,  False],
						   [ True,  True,  False]], dtype=bool)
		self.assertTrue(numpy.array_equal( av2, dt.array_avail().squeeze() ))
		dt.avail_idco(1,"isfinite(Banana)",1)
		self.assertTrue(numpy.array_equal( av, dt.array_avail().squeeze() ))
		self.assertFalse(numpy.array_equal( av, dt.array_avail() ))
		dt.choice_idco = {
			1: "Purchase==b'Apple'",
			2: "Purchase==b'Banana'",
			3: "Purchase==b'Cookie'",
			}
		self.assertTrue( dt.validate(None)==0 )
		ch = numpy.array([ [ 1.,  0.,  0.],
						   [ 0.,  0.,  1.],
						   [ 1.,  0.,  0.],
						   [ 0.,  1.,  0.],
						   [ 0.,  0.,  1.],
						   [ 1.,  0.,  0.],
						   [ 1.,  0.,  0.],
						   [ 0.,  0.,  1.],
						   [ 0.,  0.,  1.]])
		self.assertTrue(numpy.array_equal( ch, dt.array_choice().squeeze() ))
		dt.avail_idco = {1:"1",2:1,3:0,}
		self.assertTrue(numpy.array_equal( av2, dt.array_avail().squeeze() ))
		dt.avail_idco[3] = 1
		dt.avail_idco[2] = 'isfinite(Banana)'
		self.assertTrue(numpy.array_equal( av, dt.array_avail().squeeze() ))
		


	def test_pytables_import_idca_with_nulls(self):
		dt = DT()
		tinytest = os.path.join( DT.ExampleDirectory(), 'tinytest_idca.csv' )
		dt.import_idca(tinytest, caseid_col='Customer', altid_col='Product')
		self.assertTrue(numpy.array_equal( ['Apple','Banana','Cookie'], dt.alternative_names() ))
		self.assertEqual( 2, dt.h5idca.Price[0,1] )
		self.assertEqual( 0, dt.h5idca.Price[1,1] ) # missing values are 0 not NAN in idca load
		self.assertTrue( numpy.isnan(dt.h5idca.Price[-1,1]) )
		purch = numpy.array([  [ 1.,  0.,  0.],
							   [ 0.,  0.,  1.],
							   [ 1.,  0.,  0.],
							   [ 0.,  1.,  0.],
							   [ 0.,  0.,  1.],
							   [ 1.,  0.,  0.],
							   [ 1.,  0.,  0.],
							   [ 0.,  0.,  1.],
							   [ 0.,  0.,  1.]])
		self.assertTrue(numpy.array_equal( purch, dt.h5idca.Purchased[:] ))
		apple = numpy.array([1, 1, 2, 1, 1, 2, 1, 1, 2])
		self.assertTrue( numpy.array_equal(apple, dt.h5idca.Price[:,0]) )

	def test_dt_csv_import_with_screen(self):
		swissmetro_alts = {
			1:('Train','TRAIN_AV*(SP!=0)'),
			2:('SM','SM_AV'),
			3:('Car','CAR_AV*(SP!=0)'),
		}
		dd = DT.CSV_idco( os.path.join( DT.ExampleDirectory(), 'swissmetro.csv' ),
									caseid=None,
									choice='CHOICE', 
									weight=None, 
									savename=None, 
									alts=swissmetro_alts, 
									csv_kwargs={} ,
								)
		dd.set_screen( exclude_idco=['PURPOSE not in (1,3)', 'CHOICE in (0,)'] )
		m = Model.Example(101)
		m.df = dd
		m.provision()
		x = [-0.7012268762617896, -0.15465520761303447, -0.01277806274978315, -0.01083774419411773]
		self.assertAlmostEqual(  -5331.252007380466 , m.loglike(x,cached=False))
		self.assertEqual(  6768 , m.nCases())
		dd.rescreen( exclude_idco=['+', 'caseid<=10'] )
		m = Model.Example(101)
		m.df = dd
		m.provision()
		x = [-0.7012268762617896, -0.15465520761303447, -0.01277806274978315, -0.01083774419411773]
		self.assertAlmostEqual(  -5324.7532567301105 , m.loglike(x,cached=False))
		self.assertEqual(  6758 , m.nCases())

	def test_piecewise_function_reformat(self):
		from ..roles import P,X
		q = P.Spam*X.spam + P.Eggs*X.eggs
		q_p1 = P.Spam_1*X.spam + P.Eggs_1*X.eggs
		q_d1 = P.Spam*X.spam_1 + P.Eggs*X.eggs_1
		self.assertEqual (q, q.reformat_param())
		self.assertEqual (q_p1, q.reformat_param('{}_1'))
		self.assertEqual (q_d1, q.reformat_data('{}_1'))
		self.assertEqual (P.Spam*X.spam + P.Spams*X.eggs, q.reformat_param(pattern='Egg', repl='Spam'))


	def test_idco_variable_analysis_weighting(self):

		d = DT.Example()
		m = Model.Example(d=d)
		a0 = m.art_idco_variable_analysis(['dist'])
		self.assertEqual( '5029', a0.get_text_iloc(1,7) )

		d = DT.Example()
		d.new_idco_from_array('wgtseq', numpy.arange(d.nAllCases(), dtype=numpy.float64))
		d.set_weight('wgtseq')
		m = Model.Example(d=d)
		a1 = m.art_idco_variable_analysis(['dist'])
		self.assertEqual( '12642906', a1.get_text_iloc(1,7) )

		r = m.maximize_loglike()
		self.assertAlmostEqual( -8766328.743932359, r.loglike, delta= 0.000001)


	def test_validation_in_clause(self):
		d = DT.Example()
		self.assertTrue( d.check_co('hhsize in (1,2)')                        )
		self.assertTrue( d.check_ca('ovtt * (numveh==1) * (hhsize in (1,2))') )
		x = d.array_idca('ovtt * (numveh==1) * (hhsize in (1,2))', 'ovtt', 'numveh', 'hhsize')
		c1 = numpy.array([[ 10. ,  10. ,   1. ,   1. ],
						 [ 10. ,  10. ,   1. ,   1. ],
						 [ 10. ,  10. ,   1. ,   1. ],
						 [ 14.2,  14.2,   1. ,   1. ],
						 [ 10. ,  10. ,   1. ,   1. ],
						 [  0. ,   0. ,   1. ,   1. ]])
		c0 = numpy.array([[  0. ,   2. ,   4. ,   1. ],
						 [  0. ,   2. ,   4. ,   1. ],
						 [  0. ,   2. ,   4. ,   1. ],
						 [  0. ,  15.2,   4. ,   1. ],
						 [  0. ,   2. ,   4. ,   1. ],
						 [  0. ,   0. ,   4. ,   1. ]])
		self.assertTrue( bool(numpy.all(x[0]==c0)) )
		self.assertTrue( bool(numpy.all(x[1]==c1)) )
		x = d.array_idco('hhsize in (1,2)', 'hhsize')
		self.assertEqual( 1, x[0,0] )
		self.assertEqual( 1, x[0,1] )
		self.assertEqual( 0, x[2,0] )
		self.assertEqual( 5, x[2,1] )





	def test_data_consolidation(self):
		from ..examples.exampville import builder
		nZones = 15
		transit_scope = (4,15)
		n_HH = 2000
		directory, omx, f_hh, f_pp, f_tour = builder(
			nZones=nZones, 
			transit_scope=transit_scope, 
			n_HH=n_HH,
		)
		f_tour.change_mode('r')

		### MODE CHOICE DATA

		# Define numbers and names for modes
		DA = 1
		SR = 2
		Walk = 3
		Bike = 4
		Transit = 5

		d = DT()
		# By omitting a filename here, we create a temporary HDF5 store.

		d.set_alternatives( [DA,SR,Walk,Bike,Transit], ['DA','SR','Walk','Bike','Transit'] )

		d.new_caseids( f_tour.caseids() )
		# d.merge_into_idco(f_tour, "caseid")
		d.idco.add_external_data(f_tour.idco)
		d.merge_into_idco(f_pp, "PERSONID")
		d.merge_into_idco(f_hh, "HHID")

		# Create a new variables with zero-based home TAZ numbers
		d.new_idco("HOMETAZi", "HOMETAZ-1", dtype=int)
		d.new_idco("DTAZi", "DTAZ-1", dtype=int)

		# Pull in plucked data from Matrix file
		d.pluck_into_idco(omx, "HOMETAZi", "DTAZi")
		# This command is new as of Larch 3.3.15
		# It loads all the matrix DATA from an OMX based on OTAZ and DTAZ 
		# columns that already exist in the DT

		d.choice_idco = {
			DA: 'TOURMODE==1',
			SR: 'TOURMODE==2',
			Walk: 'TOURMODE==3',
			Bike: 'TOURMODE==4',
			Transit: 'TOURMODE==5',
		}
		# Alternately:   d.choice_idco = {i:'TOURMODE=={}'.format(i) for i in [1,2,3,4,5]}

		d.avail_idco = {
			DA: '(AGE>=16)',
			SR: '1',
			Walk: 'DIST<=3',
			Bike: 'DIST<=15',
			Transit: 'RAIL_TIME>0',
		}

		# Let's define some variables for clarity.
		d.new_idco("WALKTIME", "DIST / 2.5 * 60 * (DIST<=3)") # 2.5 mph, 60 minutes per hour, max 3 miles
		d.new_idco("BIKETIME", "DIST / 12 * 60 * (DIST<=15)")  # 12 mph, 60 minutes per hour, max 15 miles
		d.new_idco("CARCOST", "DIST * 0.20")  # 20 cents per mile

		# And let's link in something that isn't plucked
		d.new_idco_from_keyed_array('HOME_EMPLOYMENT', omx.filename+":"+omx.lookup.EMPLOYMENT._v_pathname, d.idco.HOMETAZi,)

		#  The source datafile is ready.  Now make a consolidated copy.
		d1 = d.consolidate(None)

		for co in d.idco._v_children_keys_including_extern:
			self.assertTrue( numpy.all( d1.array_idco(co) == d.array_idco(co) ) )

		for ca in d.idca._v_children_keys_including_extern:
			self.assertTrue( numpy.all( d1.array_idca(ca) == d.array_idca(ca) ) )
