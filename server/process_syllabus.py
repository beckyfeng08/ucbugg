# using static csv file instead of a database because syllabus is edited once a semester, not 20 times at once

import csv

with open('syllabus.csv') as csvfile:
	reader = csv.reader(csvfile)
	for row in reader:
		print row