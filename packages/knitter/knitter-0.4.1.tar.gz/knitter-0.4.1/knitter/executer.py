# -*- coding: utf-8 -*-

from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.common.exceptions import WebDriverException
import types, os, datetime, importlib, time, sys
# from knitter import log, env, common

try:
    # Python 3
    from knitter import log
    from knitter import env
    from knitter import common
except ImportError:
    # Python 2
    import log
    import env
    import common


import threading


def launch_browser(url):
    '''
    Launch a new browser, and set the parameters for the browser.
    
    '''
    
    if env.threadlocal.TESTING_BROWSER.upper() == 'FIREFOX':
        firefox_capabilities = DesiredCapabilities.FIREFOX
        
        ## set profile
        fp = webdriver.FirefoxProfile()
        fp.set_preference('browser.download.manager.showWhenStarting', False)
        
        try:
            env.THREAD_LOCK.acquire()
            
            if env.FIREFOX_BINARY == '':
                browser = webdriver.Firefox(executable_path=env.DRIVER_OF_FIREFOX,
                                            firefox_profile=fp, capabilities=firefox_capabilities)
            else:
                browser = webdriver.Firefox(executable_path=env.DRIVER_OF_FIREFOX, 
                                            firefox_profile=fp, 
                                            firefox_binary=FirefoxBinary(firefox_path=env.FIREFOX_BINARY))

            if env.threadlocal.TESTING_BROWSER not in env.BROWSER_VERSION_INFO:
                env.BROWSER_VERSION_INFO[env.threadlocal.TESTING_BROWSER] = browser.capabilities['browserVersion']

        except:
            log.handle_error()
            return False
        finally:
            env.THREAD_LOCK.release()

    elif env.threadlocal.TESTING_BROWSER.upper() == 'CHROME':
        try:
            env.THREAD_LOCK.acquire()
            browser = webdriver.Chrome(executable_path=env.DRIVER_OF_CHROME)

            if env.threadlocal.TESTING_BROWSER not in env.BROWSER_VERSION_INFO:
                env.BROWSER_VERSION_INFO[env.threadlocal.TESTING_BROWSER] = browser.capabilities['version']

        except:
            log.handle_error()
            return False
        finally:
            env.THREAD_LOCK.release()

    elif env.threadlocal.TESTING_BROWSER.upper() == 'IE':
        '''
        os.popen('TASKKILL /F /IM IEDriverServer.exe')
        dc = DesiredCapabilities.INTERNETEXPLORER.copy()
        dc['nativeEvents'] = False
        dc['acceptSslCerts'] = True
        '''

        try:
            env.THREAD_LOCK.acquire()
            browser = webdriver.Ie(executable_path=env.DRIVER_OF_IE)

            if env.threadlocal.TESTING_BROWSER not in env.BROWSER_VERSION_INFO:
                env.BROWSER_VERSION_INFO[env.threadlocal.TESTING_BROWSER] = browser.capabilities['version']
        except:
            log.handle_error()
            return False
        finally:
            env.THREAD_LOCK.release()

    browser.set_window_size(1366, 758)
    browser.set_window_position(0, 0)
    browser.set_page_load_timeout(300)
    browser.implicitly_wait(0)
    
    browser.get(url)
    
    return browser



def quit_browser(browser):
    try:
        browser.quit()
    except:
        log.step_warning(str(sys.exc_info()))




def __run_test_module(module):
    env.threadlocal.MODULE_NAME = module.__name__.split('.')[-1]
    
    testcases = []
    for fun in dir(module):
        if (not fun.startswith("__")) and (not fun.endswith("__")) and (isinstance(module.__dict__.get(fun), types.FunctionType)):
            if  module.__dict__.get(fun).__module__ == module.__name__:
                testcases.append(fun)
    
    for testcase in testcases:
        if testcase == 'before_each_testcase' or testcase == 'after_each_testcase' or testcase == 'before_launch_browser':
            return
        
        for browser in env.TESTING_BROWSERS.split('|'):
            env.threadlocal.TESTING_BROWSER = browser
            if not hasattr(env.threadlocal, "BROWSER"): env.threadlocal.BROWSER = None
            
            ###### Run Test Case ######
            try:
                log.start_test(testcase)
                
                if hasattr(module, 'before_launch_browser'):
                    getattr(module, 'before_launch_browser')()
                
                if (env.RESTART_BROWSER == True) or (env.threadlocal.BROWSER == None):
                    env.threadlocal.BROWSER = launch_browser(env.BASE_URL)
                
                if hasattr(module, 'before_each_testcase'):
                    getattr(module, 'before_each_testcase')()
                
                getattr(module, testcase)()
                
                if hasattr(module, 'after_each_testcase'):
                    getattr(module, 'after_each_testcase')()
                
            except:
                log.handle_error()
            finally:
                if env.threadlocal.CASE_PASS == False:
                    env.threadlocal.casepass = False
                else:
                    env.threadlocal.casepass = True
                
                if env.threadlocal.CASE_PASS == False and env.FAST_FAIL == True:
                    log.stop_test()
                    return "FAST_FAIL"
                else:
                    log.stop_test()
                
                if (env.RESTART_BROWSER == True):
                    quit_browser(env.threadlocal.BROWSER)
                    env.threadlocal.BROWSER = None
                
                if (env.RESTART_BROWSER == False) and (env.threadlocal.BROWSER != None) and (env.threadlocal.casepass == False):
                    quit_browser(env.threadlocal.BROWSER)
                    env.threadlocal.BROWSER = None
    
    if (env.threadlocal.BROWSER != None):
        quit_browser(env.threadlocal.BROWSER)
        env.threadlocal.BROWSER = None




def __run_test_case(case):
    module   = importlib.import_module(case.__module__)
    env.threadlocal.MODULE_NAME = case.__module__.split('.')[-1]
    
    for browser in env.TESTING_BROWSERS.split('|'):
        env.threadlocal.TESTING_BROWSER = browser
        if not hasattr(env.threadlocal, "BROWSER"): env.threadlocal.BROWSER = None
        
        ###### Run Test Case ######
        try:
            log.start_test(case.__name__)
            
            if hasattr(module, 'before_launch_browser'):
                getattr(module, 'before_launch_browser')()
            
            if (env.RESTART_BROWSER == True) or (env.threadlocal.BROWSER == None):
                env.threadlocal.BROWSER = launch_browser(env.BASE_URL)
            
            if hasattr(module, 'before_each_testcase'):
                getattr(module, 'before_each_testcase')()
            
            case()
            
            if hasattr(module, 'after_each_testcase'):
                getattr(module, 'after_each_testcase')()
            
        except:
            log.handle_error()
        finally:
            if env.threadlocal.CASE_PASS == False:
                env.threadlocal.casepass = False
            else:
                env.threadlocal.casepass = True
            
            if env.threadlocal.CASE_PASS == False and env.FAST_FAIL == True:
                log.stop_test()
                return "FAST_FAIL"
            else:
                log.stop_test()
            
            if (env.RESTART_BROWSER == True):
                quit_browser(env.threadlocal.BROWSER)
                env.threadlocal.BROWSER = None
            
            if (env.RESTART_BROWSER == False) and (env.threadlocal.BROWSER != None) and (env.threadlocal.casepass == False):
                quit_browser(env.threadlocal.BROWSER)
                env.threadlocal.BROWSER = None
    
    if (env.threadlocal.BROWSER != None):
        quit_browser(env.threadlocal.BROWSER)
        env.threadlocal.BROWSER = None


def peripheral():
    def handle_func(func):
        def handle_args(*args):
            common.parse_conf_class(args[0])
            log.start_total_test()
            
            func(*args)
            
            log.finish_total_test()
            
            return env.EXIT_STATUS
        return handle_args
    return handle_func


@peripheral()
def run(*args):
    if len(args) < 2:
        print ("Code error! 1st arg => conf; other args => test object(s).")
    
    for i in range(1, len(args)):
        testobj = args[i]
        threads = []
        
        if isinstance(testobj, list):
            for item in testobj:
                threads.append(threading.Thread(target=run_test_obj, args=([item])))
        else:
            threads.append(threading.Thread(target=run_test_obj, args=([testobj])))
        
        
        for thread in threads:
            thread.start()
        
        for thread in threads:
            thread.join()



def run_test_obj(testobj):
    if isinstance(testobj, types.ModuleType):
        __run_test_module(testobj)
    
    elif isinstance(testobj, types.FunctionType):
        __run_test_case(testobj)
    
    elif isinstance(testobj, list):
        for obj in testobj:
            run_test_obj(obj)
    
    else:
        print ("knitter- executer: function [run_test_obj] code error.")








