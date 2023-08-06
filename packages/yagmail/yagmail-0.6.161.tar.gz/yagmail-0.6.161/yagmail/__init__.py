__project__ = 'yagmail'
__version__ = "0.6.161"

from .error import YagConnectionClosed
from .error import YagAddressError
from .yagmail import SMTP
from .yagmail import register
from .yagmail import logging
from .yagmail import raw
from .yagmail import inline
