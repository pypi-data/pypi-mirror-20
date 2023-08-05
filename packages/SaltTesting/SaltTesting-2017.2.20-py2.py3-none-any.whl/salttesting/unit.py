# -*- coding: utf-8 -*-
'''
    :codeauthor: :email:`Pedro Algarvio (pedro@algarvio.me)`


    ============================
    Unittest Compatibility Layer
    ============================

    Compatibility layer to use :mod:`unittest <python2:unittest>` under Python
    2.7 or `unittest2`_ under Python 2.6 without having to worry about which is
    in use.

    .. attention::

        Please refer to Python's :mod:`unittest <python2:unittest>`
        documentation as the ultimate source of information, this is just a
        compatibility layer.

    .. _`unittest2`: https://pypi.python.org/pypi/unittest2
    '''

# Import python libs
from __future__ import absolute_import
import sys
import copy
import logging
try:
    import psutil
    HAS_PSUTIL = True
except ImportError:
    HAS_PSUTIL = False

# Set SHOW_PROC to True to show
# process details when running in verbose mode
# i.e. [CPU:15.1%|MEM:48.3%|Z:0]
SHOW_PROC = False

# support python < 2.7 via unittest2
if sys.version_info < (2, 7):
    try:
        # pylint: disable=import-error
        from unittest2 import (
            TestLoader as _TestLoader,
            TextTestRunner as __TextTestRunner,
            TestCase as __TestCase,
            expectedFailure,
            TestSuite as _TestSuite,
            skip,
            skipIf,
            TestResult as _TestResult,
            TextTestResult as __TextTestResult
        )
        from unittest2.case import _id
        # pylint: enable=import-error

        class NewStyleClassMixin(object):
            '''
            Simple new style class to make pylint shut up!

            And also to avoid errors like:

                'Cannot create a consistent method resolution order (MRO) for bases'
            '''

        class TestLoader(_TestLoader, NewStyleClassMixin):
            pass

        class _TextTestRunner(__TextTestRunner, NewStyleClassMixin):
            pass

        class _TestCase(__TestCase, NewStyleClassMixin):
            pass

        class TestSuite(_TestSuite, NewStyleClassMixin):
            pass

        class TestResult(_TestResult, NewStyleClassMixin):
            pass

        class _TextTestResult(__TextTestResult, NewStyleClassMixin):
            pass

    except ImportError:
        raise SystemExit('You need to install unittest2 to run the salt tests')
else:
    from unittest import (
        TestLoader,
        TextTestRunner as _TextTestRunner,
        TestCase as _TestCase,
        expectedFailure,
        TestSuite,
        skip,
        skipIf,
        TestResult,
        TextTestResult as _TextTestResult
    )
    from unittest.case import _id


class TestCase(_TestCase):

##   Commented out because it may be causing tests to hang
##   at the end of the run
#
#    _cwd = os.getcwd()
#    _chdir_counter = 0

#    @classmethod
#    def tearDownClass(cls):
#        '''
#        Overriden method for tearing down all classes in salttesting
#
#        This hard-resets the environment between test classes
#        '''
#        # Compare where we are now compared to where we were when we began this family of tests
#        if not cls._cwd == os.getcwd() and cls._chdir_counter > 0:
#            os.chdir(cls._cwd)
#            print('\nWARNING: A misbehaving test has modified the working directory!\nThe test suite has reset the working directory '
#                    'on tearDown() to {0}\n'.format(cls._cwd))
#            cls._chdir_counter += 1

    def setUp(self):
        loader_module = getattr(self, 'loader_module', None)
        if loader_module is not None:
            from salttesting.mock import NO_MOCK, NO_MOCK_REASON
            if NO_MOCK:
                self.skipTest(NO_MOCK_REASON)

            loader_module_name = loader_module.__name__
            loader_module_globals = getattr(self, 'loader_module_globals', None)
            loader_module_blacklisted_dunders = getattr(self, 'loader_module_blacklisted_dunders', ())
            if loader_module_globals is None:
                loader_module_globals = {}
            elif callable(loader_module_globals):
                loader_module_globals = loader_module_globals()
            else:
                loader_module_globals = copy.deepcopy(loader_module_globals)

            salt_dunders = (
                '__opts__', '__salt__', '__runner__', '__context__', '__utils__',
                '__ext_pillar__', '__thorium__', '__states__', '__serializers__', '__ret__',
                '__grains__', '__pillar__', '__sdb__',
                # Proxy is commented out on purpose since some code in salt expects a NameError
                # and is most of the time not a required dunder
                # '__proxy__'
            )
            for dunder_name in salt_dunders:
                if dunder_name not in loader_module_globals:
                    if dunder_name in loader_module_blacklisted_dunders:
                        continue
                    loader_module_globals[dunder_name] = {}

            for key in loader_module_globals:
                if not hasattr(loader_module, key):
                    if key in salt_dunders:
                        setattr(loader_module, key, {})
                    else:
                        setattr(loader_module, key, None)

            if loader_module_globals:
                from salttesting.mock import patch
                patcher = patch.multiple(loader_module_name, **loader_module_globals)
                patcher.start()
                self.addCleanup(patcher.stop)
        super(TestCase, self).setUp()

    def shortDescription(self):
        desc = _TestCase.shortDescription(self)
        if HAS_PSUTIL and SHOW_PROC:
            proc_info = ''
            found_zombies = 0
            try:
                for proc in psutil.process_iter():
                    if proc.status == psutil.STATUS_ZOMBIE:
                        found_zombies += 1
                proc_info = '[CPU:{0}%|MEM:{1}%|Z:{2}] {short_desc}'.format(psutil.cpu_percent(),
                                                                            psutil.virtual_memory().percent,
                                                                            found_zombies,
                                                                            short_desc=desc if desc else '')
            except Exception:
                pass
            return proc_info
        else:
            return _TestCase.shortDescription(self)

    #def runTest(self):
    #    pass

    def assertEquals(self, *args, **kwargs):
        raise DeprecationWarning(
            'The {0}() function is deprecated. Please start using {1}() '
            'instead.'.format('assertEquals', 'assertEqual')
        )
        return _TestCase.assertEquals(self, *args, **kwargs)

    def failUnlessEqual(self, *args, **kwargs):
        raise DeprecationWarning(
            'The {0}() function is deprecated. Please start using {1}() '
            'instead.'.format('failUnlessEqual', 'assertEqual')
        )
        return _TestCase.failUnlessEqual(self, *args, **kwargs)

    def failIfEqual(self, *args, **kwargs):
        raise DeprecationWarning(
            'The {0}() function is deprecated. Please start using {1}() '
            'instead.'.format('failIfEqual', 'assertNotEqual')
        )
        return _TestCase.failIfEqual(self, *args, **kwargs)

    def failUnless(self, *args, **kwargs):
        raise DeprecationWarning(
            'The {0}() function is deprecated. Please start using {1}() '
            'instead.'.format('failUnless', 'assertTrue')
        )
        return _TestCase.failUnless(self, *args, **kwargs)

    def assert_(self, *args, **kwargs):
        if sys.version_info >= (2, 7):
            # The unittest2 library uses this deprecated method, we can't raise
            # the exception.
            raise DeprecationWarning(
                'The {0}() function is deprecated. Please start using {1}() '
                'instead.'.format('assert_', 'assertTrue')
            )
        return _TestCase.assert_(self, *args, **kwargs)

    def failIf(self, *args, **kwargs):
        raise DeprecationWarning(
            'The {0}() function is deprecated. Please start using {1}() '
            'instead.'.format('failIf', 'assertFalse')
        )
        return _TestCase.failIf(self, *args, **kwargs)

    def failUnlessRaises(self, *args, **kwargs):
        raise DeprecationWarning(
            'The {0}() function is deprecated. Please start using {1}() '
            'instead.'.format('failUnlessRaises', 'assertRaises')
        )
        return _TestCase.failUnlessRaises(self, *args, **kwargs)

    def failUnlessAlmostEqual(self, *args, **kwargs):
        raise DeprecationWarning(
            'The {0}() function is deprecated. Please start using {1}() '
            'instead.'.format('failUnlessAlmostEqual', 'assertAlmostEqual')
        )
        return _TestCase.failUnlessAlmostEqual(self, *args, **kwargs)

    def failIfAlmostEqual(self, *args, **kwargs):
        raise DeprecationWarning(
            'The {0}() function is deprecated. Please start using {1}() '
            'instead.'.format('failIfAlmostEqual', 'assertNotAlmostEqual')
        )
        return _TestCase.failIfAlmostEqual(self, *args, **kwargs)


class TextTestResult(_TextTestResult):
    '''
    Custom TestResult class whith logs the start and the end of a test
    '''

    def startTest(self, test):
        logging.getLogger(__name__).debug(
            '>>>>> START >>>>> {0}'.format(test.id())
        )
        return super(TextTestResult, self).startTest(test)

    def stopTest(self, test):
        logging.getLogger(__name__).debug(
            '<<<<< END <<<<<<< {0}'.format(test.id())
        )
        return super(TextTestResult, self).stopTest(test)


class TextTestRunner(_TextTestRunner):
    '''
    Custom Text tests runner to log the start and the end of a test case
    '''
    resultclass = TextTestResult


__all__ = [
    'TestLoader',
    'TextTestRunner',
    'TestCase',
    'expectedFailure',
    'TestSuite',
    'skipIf',
    'TestResult'
]
