import os

LABSDIR = "labs/"
IMGURL = "https://googledrive.com/host/0B1j-kstA_oRWYmZpVS1hbW4xV0k/"

html = {}

for i in filter(lambda x: x[-3:] == "txt", os.listdir(LABSDIR)):
	rawlab = open(LABSDIR + i, "r")
	# output = "<!DOCTYPE html><html>"
	output = ""
	table_of_contents = ""

	for line in rawlab:
		if len(line.strip()) == 0: continue
		line = line.replace("\xe2\x86\x92", "&rarr;")
		if line[:7] == "HEADING":  
			heading_map = {"LARGE": "h1", "MEDIU": "h2", "SMALL": "h3"}
			tag = heading_map[line[8:13]]
			output += "<" + tag + " class='lab'>" + line[15:].strip() + "</" + tag + ">"
			table_of_contents += '<a class="outline' + tag + '">' + line[15:].strip() + "</a>"
		elif line.strip()[-3:].lower() in ("png", "jpg", "gif"):
			output += '<img src="' + IMGURL + i[:-4] + "/" + line.strip() + '" class="lab-img">'
		elif line[:4] == "FILE":
			output += '<p></p><a href="' + i[:-4] + "/" + line[5:].strip() + '" class="lab-file" download>' +  line[5:].strip() + "</a>"
		else:
			output += '<p class="lab">' + line.strip() + "</p>"
	# output += "</html>"
	html[i[:-4].replace(" ", "")] = table_of_contents + output


# print html