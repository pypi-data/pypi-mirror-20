Copyright (c) 2016 Harvard University / iCommons

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Description: ====================
        Dj-Log-Config-Helper
        ====================
        
        Centralize management of simple log configuration across Django projects
        
        The ``dj_log_config_helper.configure_installed_apps_logger`` method configures either a console or file logger with a list of all the top-level app module packages being installed in ``INSTALLED_APPS``.  Use this method in your ``settings.py`` file.
        
        Meta
        ----
        
        * Author: Jaime Bermudez
        * Email:  jaime_bermudez@harvard.edu
        * Maintainer: Harvard University Academic Technology
        * Email: tlt-ops@g.harvard.edu
        * Status: active development, stable, maintained
        
        
        Installation
        ------------
        Simply run the following from within a virtualenv::
        
            $ pip install git+https://github.com/Harvard-University-iCommons/dj-log-config-helper
        
        Running the tests
        -----------------
        Via make::
        
            $ make test
        
        Usage
        -----
        Import the log config function in ``settings.py``::
        
            from dj_log_config_helper import configure_installed_apps_logger
        
        Disable Django's default logging::
        
            LOGGING_CONFIG = None
        
        At the end of ``settings.py`` configure a simple console logger::
        
            configure_installed_apps_logger(logging.INFO)
        
        Or, configure a verbose file logger::
        
            configure_installed_apps_logger(logging.INFO, verbose=True, filename='django-project.log')
        
        You can also log additional packages that are not part of INSTALLED_APPS::
        
            configure_installed_apps_logger(logging.INFO, additional_packages=['py.warnings'])
        
Platform: any
Classifier: Environment :: Web Environment
Classifier: Intended Audience :: Developers
Classifier: License :: OSI Approved :: MIT License
Classifier: Operating System :: OS Independent
Classifier: Programming Language :: Python
Classifier: Topic :: Internet :: WWW/HTTP :: Dynamic Content
Classifier: Topic :: Software Development :: Libraries :: Python Modules
Classifier: Programming Language :: Python
Classifier: Programming Language :: Python :: 2.5
Classifier: Programming Language :: Python :: 2.6
Classifier: Programming Language :: Python :: 2.7
Classifier: Programming Language :: Python :: 3
Classifier: Programming Language :: Python :: 3.2
Classifier: Programming Language :: Python :: 3.3
Classifier: Programming Language :: Python :: 3.4
Classifier: Programming Language :: Python :: 3.5
