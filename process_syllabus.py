# using static csv file instead of a database because syllabus is edited once a semester, not 20 times at once

import csv
# import pprint
import json

csvfile = open('syllabus.csv', 'rb').read().decode('utf-16')
arr = []
for line in csvfile.splitlines():
	# print line
	arr.append(line.split(','))

syllabus = {}

categories = arr[0]
for i in range(1,len(arr)):
	week = arr[i][0]
	syllabus[week] = {}
	for j in range(1,len(arr[i])):
		# print syllabus[week]
		if not arr[i][j]:
			continue
		# print arr[i][j]
		if arr[i][j][0] == "/":
			arr[i][j] = "GROUP: " + arr[i][j][1:]
		syllabus[week][categories[j]] = arr[i][j]

json_syllabus = json.dumps(syllabus)