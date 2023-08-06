f-strings...sorta
=================

Home-page: https://github.com/danbradham/fstrings
Author: Dan Bradham
Author-email: danielbradham@gmail.com
License: MIT
Description: =================
        f-strings...sorta
        =================
        .. image:: https://travis-ci.org/danbradham/fstrings.svg?branch=master
            :target: https://travis-ci.org/danbradham/fstrings
        
        Python 3.6 f-strings are pretty awesome. It's too bad you can't use them in 2.7 or 3.5. With **fstrings** you can...sorta. The **fstrings** module provides a function *f* that acts similar to f-strings. Pass a string with str.format tokens and *f* will return a string formatted using the available globals and locals. Like this::
        
            >>> from fstrings import f
            >>> x = 'Hello, World...'
            >>> f('{x}')
            'Hello, World...'
        
        You can't evaluate arbitrary python code within the format tokens like you can in Python 3.6, but, some of that lost functionality is gained by allowing you to pass *args* and *kwargs* to *f*. For example, you can still use positional arguments with *f*::
        
            >>> x = 'World...'
            >>> f('{} {x}', 'Hello,')
            'Hello, World...'
        
        Or you could override globals and locals by passing keyword arguments::
        
            >>> x = 'Hello'
            >>> y = 'World...'
            >>> f('{x}, {y}', x='Goodbye')
            'Goodbye, World...'
        
        Or do both, it's your life. In addition to *f*, fstrings also provides some other nifty stuff.
        
        
        fdocstring Decorator
        ====================
        ::
        
            >>> from fstrings import fdocstring
            >>> x = 'Hello from ya docs'
            >>> @fdocstring()
            ... def func():
            ...     '''{x}'''
            ...
            >>> func.__doc__
            'Hello from ya docs'
        
        Right now you might be thinking, "Cool, *fdocstring* provides the same funcality as *f*, but, for doc strings." You would be correct. You can even use *fdocstring* to format class doc strings:
        
        ::
        
            >>> x = 'BOOM!'
            >>> @fdocstring()
            ... class Obj(object):
            ...     '''{x}'''
            ...     def method(self):
            ...         '''{x}'''
            ...
            >>> Obj.__doc__
            'BOOM!'
            >>> Obj.method.__doc__
            'BOOM!'
        
        "Boom boom" is right. Methods are auto formatted too.
        
        
        printf?
        =======
        After implementing *f*, *printf* was too obvious not to implement.
        
        ::
        
            >>> from fstrings import printf
            >>> x = 'PRINTFED'
            >>> printf('{x}')
            PRINTFED
        
        *printf* and *fdocstring* accept *args* and *kwargs* for overriding globals and locals just like *f*.
        
        Features and Differences
        ========================
        
         - Uses str.format instead of evaluating python code in {}
         - Allows overriding globals and locals by passing in \*args and \*\*kwargs
         - Supports python 2.7 to python 3.6
        
        Tests
        =====
        **fstrings** comes with a robust set of tests. *pip install nose* and run them if you like.
        
        ::
        
            > nosetests -v --with-coverage --with-doctest --doctest-extension rst
        
        Similar Projects
        ================
        If you're looking for an implementation truer to Python 3.6 f-strings check out `fmt <https://github.com/damnever/fmt>`_.
        
Platform: UNKNOWN
Classifier: Development Status :: 4 - Beta
Classifier: Intended Audience :: Developers
Classifier: License :: OSI Approved :: MIT License
Classifier: Operating System :: OS Independent
Classifier: Programming Language :: Python
Classifier: Programming Language :: Python :: 2.7
Classifier: Programming Language :: Python :: 3.2
Classifier: Programming Language :: Python :: 3.3
Classifier: Programming Language :: Python :: 3.4
Classifier: Programming Language :: Python :: 3.5
Classifier: Programming Language :: Python :: 3.6
Classifier: Topic :: Software Development :: Libraries :: Python Modules
