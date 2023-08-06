=========================
Installation instructions
=========================

sulfur can be installed using pip::

    $ python3 -m pip install sulfur

This command will fetch the archive and its dependencies from the internet and
install them.

If you've downloaded the tarball, unpack it, and execute::

    $ python3 setup.py install

In either case, it is possible to perform local user installs by appending the
``--user`` option.


Selenium drivers
----------------

Sulfur uses python-selenium in order to control the web browser. Pip takes care
of installing it for you, but there are some additional steps to make it work
as expected.

`Selenium`<http://www.seleniumhq.org/> must connect with the web browser using
a WebDriver application. There are WebDriver applications to all of the most
common Web Browsers including Google Chrome, Firefox, Opera and Microsoft Edge.
Another driver you probably should know is the PhantomJS, which is a headless
driver (i.e., it opens no windows) that works entirely on node.js. PhantomJS is
the faster driver and is a good option for making tests that checks generic
browser/js behavior.


Installing a driver
...................

If you are running a fairly recent version of Ubuntu, both PhantomJS and Chromium
drivers will be available on apt. Old versions may require a manual installation
(check http://www.seleniumhq.org/download/ for more instructions)::

    $ sudo apt-get install chromium-chromedriver phantomjs

Once you have the Chromium driver installed, just initialize the driver as::

    >>> from sulfur import Driver
    >>> driver = Driver('chrome')
    >>> driver.open('http://python.org/')

