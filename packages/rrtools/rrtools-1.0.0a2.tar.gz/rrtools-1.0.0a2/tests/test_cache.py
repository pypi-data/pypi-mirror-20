from builtins import range
from builtins import object
from RRtoolbox.lib.cache import MemoizedDict,mapper
import unittest
from time import time
persistIn = "mydict"

class TextOp(object):
    # this is a main class
    def __init__(self,val):
        self.val = val

class TestMemoizedDisc(unittest.TestCase):

    def test_session(self):
        mydict = MemoizedDict(persistIn).clear()
        del mydict

        mydict = MemoizedDict(persistIn)

        mydict["TextOp"] = TextOp(1)
        del mydict

        mydict = MemoizedDict(persistIn)
        self.assertEqual(mydict["TextOp"].val,1)

    def test_times(self):
        mydict = MemoizedDict(persistIn).clear()
        del mydict
        mydict = MemoizedDict(persistIn)
        secs = 2
        try:
            for i in range(1000):
                t1 = time()
                mydict[i] = (("12"*100)*100)*100
                mytime = time()-t1
                self.assertTrue(mytime<secs,"At added data No {}, it takes {} which is more than {} seg".format(i,mytime,secs)) # less than 3 seconds
        finally:
            mydict.clear() # clean up

    def test_failed_session(self):
        mydict = MemoizedDict(persistIn).clear()
        del mydict

        mydict = MemoizedDict(persistIn)

        class textOp_fail(object):
            # unfortunately all classes that are memoized must be present
            # as main classes and not inside other objects
            def __init__(self,val):
                self.val = val

        from pickle import PicklingError
        with self.assertRaises(PicklingError): # if used pickle
            mydict["textOp_fail"] = textOp_fail(1)

if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(TestMemoizedDisc)
    unittest.TextTestRunner(verbosity=2).run(suite)