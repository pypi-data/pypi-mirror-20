# 2014. 12. 9 by Hans Roh hansroh@gmail.com

__version__ = "0.25.5.1"
version_info = tuple (map (lambda x: not x.isdigit () and x or int (x),  __version__.split (".")))
NAME = "SWAE/%s.%s" % version_info [:2]

import threading
import sys
import h2

WEBSOCKET_SIMPLE = 1
WEBSOCKET_DEDICATE_THREADSAFE = 4
WEBSOCKET_GROUPCHAT = 5

WS_SIMPLE = 1
WS_DEDICATE = 4
WS_GROUPCHAT = 5

WS_EVT_INIT = "init"
WS_EVT_OPEN = "open"
WS_EVT_CLOSE = "close"
WS_EVT_NONE = None

WS_MSG_JSON = "json"
WS_MSG_XMLRPC = "xmlrpc"
WS_MSG_GRPC = "grpc"
WS_MSG_DEFAULT = None

WS_OPCODE_TEXT = 0x1
WS_OPCODE_BINARY = 0x2
WS_OPCODE_CLOSE = 0x8
WS_OPCODE_PING = 0x9
WS_OPCODE_PONG = 0xa

from aquests.dbapi import DB_PGSQL, DB_SQLITE3, DB_REDIS, DB_MONGODB

class _WASPool:
	def __init__ (self):
		self.__wasc = None
		self.__p = {}
		
	def __get_id (self):
		return id (threading.currentThread ())
	
	def __repr__ (self):
		return "<class skitai.WASPool at %x>" % id (self)
			
	def __getattr__ (self, attr):
		_was = self._get ()
		if not _was.in__dict__ ("app") and hasattr (_was, 'request'):
			# it will be called WSGI middlewares except Saddle,
			# So request object not need
			del _was.request			
		return  getattr (_was, attr)
			
	def __setattr__ (self, attr, value):
		if attr.startswith ("_WASPool__"):
			self.__dict__[attr] = value
		else:	
			setattr (self.__wasc, attr, value)
			for _id in self.__p:
				setattr (self.__p [_id], attr, value)
	
	def __delattr__ (self, attr):
		delattr (self.__wasc, attr)
		for _id in self.__p:
			delattr (self.__p [_id], attr, value)
	
	def _start (self, wasc):
		self.__wasc = wasc
	
	def _del (self):
		_id = self.__get_id ()
		try:
			del self.__p [_id]
		except KeyError:
			pass

	def _get (self):
		_id = self.__get_id ()
		try:
			return self.__p [_id]
		except KeyError:
			_was = self.__wasc ()
			self.__p [_id] = _was
			return _was


was = _WASPool ()
def start_was (wasc):
	global was
	was._start (wasc)	

	
def run (**conf):
	from . import lifetime
	from .server import Skitai
	
	class SkitaiServer (Skitai.Loader):
		def __init__ (self, conf):
			self.conf = conf
			Skitai.Loader.__init__ (self, 'test.conf')
			
		def configure (self):
			conf = self.conf			
			self.set_num_worker (1)
			if conf.get ("certfile"):
				self.config_certification (conf.get ("certfile"), conf.get ("keyfile"), conf.get ("passphrase"))
			self.config_cachefs ()
			self.config_rcache (100)
			self.config_webserver (
				conf.get ('port', 5000), conf.get ('address', '0.0.0.0'),
				"Skitai Server", conf.get ("certfile") is not None,
				5, 10
			)
			self.config_threads (conf.get ('threads', 4))						
			for name, args in conf.get ("clusters", {}).items ():
				if name [0] == "@":
					name = name [1:]
				if len (args) == 3:
					ctype, members, ssl = args
				else:
					ctype, members = args	
					ssl = 0
				self.add_cluster (ctype, name, members, ssl)
			
			self.install_handler (
				conf.get ("mount"), 
				conf.get ("proxy", False),
				conf.get ("static_max_age", 300),
				None, # blacklistdir
				False, # disable unsecure https
				conf.get ("enable_gw", False), # API gateway
				conf.get ("gw_auth", False),
				conf.get ("gw_realm", "API Gateway"),
				conf.get ("gw_secret_key", None)
			)
			lifetime.init ()
			
	if not conf.get ('mount'):
		raise ValueError ('Dictionary mount {mount point: path or app} required')
	
	server = SkitaiServer (conf)
	# timeout for fast keyboard interrupt on win32	
	server.run (2.0)
	