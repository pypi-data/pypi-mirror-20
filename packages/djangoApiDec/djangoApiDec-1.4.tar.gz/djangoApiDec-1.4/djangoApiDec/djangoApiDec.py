# -*- coding: utf-8 -*-
from django.http import Http404
from pathlib import Path
import time, logging, os, urllib, requests, json
from datetime import datetime
from functools import wraps
from django.urls import reverse
def date_proc(func):
	"""	An decorator checking whether date parameter is passing in or not. If not, default date value is all PTT data.
		Else, return PTT data with right date.
	Args:
		func: function you want to decorate.
		request: WSGI request parameter getten from django.

	Returns:
		date:
			a datetime variable, you can only give year, year + month or year + month + day, three type.
			The missing part would be assigned default value 1 (for month is Jan, for day is 1).
	"""
	@wraps(func)
	def wrapped(request, *args, **kwargs):
		if 'date' in request.GET and request.GET['date'] == '':
			raise Http404("api does not exist")
		elif 'date' not in request.GET:
			date = datetime.today()
			return func(request, date)
		else:
			date = tuple(int(intValue) for intValue in request.GET['date'].split('-'))
			if len(date) == 3:
				date = datetime(*date)
			elif len(date) == 2:
				date = datetime(*date, day = 1)
			else:
				date = datetime(*date, month = 1, day = 1)
			return func(request, date)
	return wrapped

def queryString_required(strList):
	"""	An decorator checking whether queryString key is valid or not
	Args:
		str: allowed queryString key

	Returns:
		if contains invalid queryString key, it will raise exception.
	"""
	def _dec(function):
		@wraps(function)
		def _wrap(request, *args, **kwargs):
			for i in strList:
				if i not in request.GET:
					raise Http404("api does not exist")
			return function(request, *args, **kwargs)
		return _wrap
	return _dec

def timing(func):
	@wraps(func)
	def wrap(*args, **kw):
		ts = time.time()
		result = func(*args, **kw)
		te = time.time()
		print('It cost {} seconds to do {}'.format(te-ts, func.__name__))
		return result
	return wrap

def removeInputFile(func):
	def remove_file_if_exist(file_name):
		"""Remove file if it exist

		Args:
			file_name: name of the file to be removed
		"""
		file = Path(file_name)
		if file.is_file():
			os.remove(file_name)
	@wraps(func)
	def wrap(*args, **kw):
		result = func(*args, **kw)
		remove_file_if_exist(args[1])
		return result
	return wrap

def getJsonFromApi(request, protocol, app, urlName, queryStringTuple):
	"""Return json from querying Web Api

		Args:
			request: http request object got from django
			protocol: http or https
			app: django app name
			urlName: name of django URL pattern
			queryStringTuple: a tuple containing many tuples, first elements is queryString and second is value, eq (('date', '2016-10-10'))

		Returns: json format dictionary
		"""
	urlPattern = reverse('{}:{}'.format(app, urlName))
	apiURL = request.get_host() + urlPattern + "?" 
	queryString = ""
	for i in queryStringTuple:
		queryString+="{}={}&".format(str(i[0]), urllib.parse.quote(str(i[1])))
	print('{}://'.format(protocol) + apiURL + queryString)
	jsonText = requests.get('{}://'.format(protocol) + apiURL + queryString)
	jsonText = json.loads(jsonText.text)
	return jsonText
