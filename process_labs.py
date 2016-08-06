import os

LABSDIR = "labs/"
APIURL = "http://localhost:8080/labs/"

html = {}

for i in filter(lambda x: x[-3:] == "txt", os.listdir(LABSDIR)):
	rawlab = open(LABSDIR + i, "r")
	# output = "<!DOCTYPE html><html>"
	output = ""

	for line in rawlab:
		if len(line.strip()) == 0: continue
		line = line.replace("\xe2\x86\x92", "&rarr;")
		if line[:7] == "HEADING":  
			heading_map = {"LARGE": "h1", "MEDIU": "h2", "SMALL": "h3"}
			tag = heading_map[line[8:13]]
			output += "<" + tag + " class='lab'>" + line[15:].strip() + "</" + tag + ">"
		elif line.strip()[-3:].lower() in ("png", "jpg", "gif"):
			output += '<img src="' + APIURL + i[:-4] + "/" + line.strip() + '" class="lab-img">'
		elif line[:4] == "FILE":
			output += '<p></p><a href="' + i[:-4] + "/" + line[5:].strip() + '" class="lab-file" download>' +  line[5:].strip() + "</a>"
		else:
			output += '<p class="lab">' + line.strip() + "</p>"
	# output += "</html>"
	html[i[:-4].replace(" ", "")] = output


# print html