# using static csv file instead of a database because syllabus is edited once a semester, not 20 times at once

import csv

csvfile = open('syllabus.csv', 'rb').read().decode('utf-16')
	# reader = csv.reader(csvfile)
	# for row in reader:
		# print row
for line in csvfile.splitlines():
	print line.split(',')