# using static csv file instead of a database because syllabus is edited once a semester, not 20 times at once

import csv
# import pprint
import json

# import httplib

# def patch_http_response_read(func):
#     def inner(*args):
#         try:
#             return func(*args)
#         except httplib.IncompleteRead, e:
#             return e.partial

#     return inner

# httplib.HTTPResponse.read = patch_http_response_read(httplib.HTTPResponse.read)

LINK = "https://docs.google.com/spreadsheets/d/1EYIf9en6oyRgH8nT5d2zFo43o_0PHaSdDGcgN090jsU/export?format=csv"

# import requests
import urllib3
http = urllib3.PoolManager()
# response = http.request('GET', 'someurl')

json_syllabus = None

def update():
	global json_syllabus
	try:
		response = http.request('GET', LINK)
		# assert response.status_code == 200, 'Wrong status code'

		csvfile = response.data #open('syllabus.csv', 'rb').read().decode('utf-16')
	except:
		csvfile = open('syllabus.csv', 'rb').read().decode('utf-16')
	arr = []
	for line in csvfile.splitlines():
		# print line
		arr.append(line.split(','))

	syllabus = {}
	def correct_date(d):
		return "/".join(map(lambda x: x if len(x) > 1 else "0" + x, d.split("/")))

	categories = arr[0]
	for i in range(1,len(arr)):
		week = correct_date(arr[i][0])
		syllabus[week] = {}
		for j in range(1,len(arr[i])):
			# print syllabus[week]
			if not arr[i][j]:
				continue
			# print arr[i][j]
			if arr[i][j][0] == "/":
				arr[i][j] = "GROUP: " + arr[i][j][1:]
			syllabus[week][categories[j]] = arr[i][j]

	json_syllabus =  json.dumps(syllabus)
	return json_syllabus

def get():
	global json_syllabus
	return json_syllabus

# update()
# print get()
