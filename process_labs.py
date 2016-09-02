import os

LABSDIR = "labs/"
IMGURL = "https://googledrive.com/host/0B1j-kstA_oRWYmZpVS1hbW4xV0k/"

html = {}

def update():
	global html
	html = {}
	for i in filter(lambda x: x[-3:] == "txt", os.listdir(LABSDIR)):
		rawlab = open(LABSDIR + i, "r")
		# output = "<!DOCTYPE html><html>"
		output = ""
		table_of_contents = ""
		current_header = 0
		current_header_increment = 0

		for line in rawlab:
			if len(line.strip()) == 0: continue
			line = line.replace("\xe2\x86\x92", "&rarr;")
			if line[:7] == "HEADING":  
				heading_map = {"LARGE": "h1", "MEDIU": "h2", "SMALL": "h3"}
				tag = heading_map[line[8:13]]
				if tag == "h1":
					current_header += 1
					if current_header != 1:
						output += "</section>"
					table_of_contents += '<a class="outline' + tag + '" id="outline' + str(current_header) + '" onclick="scrollToSection(' + str(current_header) + ');">' + line[15:].strip() + "</a>"
					output += "<section class='labsection' id='labsection" + str(current_header) + "'>"
				output += "<" + tag + " class='lab' id='labheader" + str(current_header)+ "'>" + line[15:].strip() + "</" + tag + ">"
				# current_header += current_header_increment
				# current_header_increment = 0
			elif line.strip()[-3:].lower() in ("png", "jpg", "gif"):
				output += '<img src="' + IMGURL + i[:-4] + "/" + line.strip() + '" class="lab-img">'
			elif line.strip()[-3:].lower() in ("mp4", "mov", "avi", "ogg", "ebm"):
				extension = line.strip()[-3:].lower()
				if extension == "ebm": extension = "webm"
				output += '<video class="lab-img" width="640" height="360" controls> <source src="' + IMGURL + i[:-4] + "/" + line.strip() + '" type="video/' + extension+ '"> </video>'
			elif line[:4] == "FILE":
				output += '<p></p><a href="' + IMGURL + i[:-4] + "/" + line[5:].strip() + '" class="lab-file" download>' +  line[5:].strip() + "</a>"
			else:
				output += '<p class="lab">' + line.strip() + "</p>"
		# output += "</html>"
		table_of_contents = "<div class='lab-outline'>"+ table_of_contents + "</div>"
		output = "<div class='lab-content'>" + output + "</section></div>"
		html[i[:-4].replace(" ", "")] = table_of_contents + output
	return "labs updated"


def get_html():
	global html
	return html