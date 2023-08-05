# todo: make the properties also "object oriented" to support different configs per different SeleneDriver instances
import itertools
import os
import time

from selene.browsers import Browser

timeout = 4
poll_during_waits = 0.1
app_host = ''

# todo: make cashing work (currently will not work...)
cash_elements = False
"""To cash all elements after first successful find
      config.cash_elements = True"""

browser_name = Browser.FIREFOX
maximize_window = True
hold_browser_open = False
counter = itertools.count(start=int(round(time.time() * 1000)))

screenshot_folder = os.path.join(os.path.expanduser("~"),
                                 ".selene",
                                 "screenshots",
                                 str(next(counter)))

desired_capabilities = None
