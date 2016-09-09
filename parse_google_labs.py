# from pydrive.drive import GoogleDrive
import urllib3
import json

folder_id = '0B1j-kstA_oRWZi1mTVhOWG00dDg'
api_key = 'AIzaSyC6oJ_00I7Ijm8SQ_yJnwmlwjOgmLzxF9M'
http = urllib3.PoolManager()
urllib3.disable_warnings()


errorstr = ""

def get_contents(fid):
  global http
  global errorstr
  url = "https://www.googleapis.com/drive/v3/files?q='" + fid + "'+in+parents&key=" + api_key
  try:
    return json.loads(http.request('GET', url).data)
  except:
    errorstr += sys.exc_info()[0]
    return json.loads("")

def get_doc(fid):
  global http
  global errorstr
  try:
    url = "https://docs.google.com/document/d/" + fid + "/export?formal=html"
    return http.request('GET', url).data
  except:
    errorstr += sys.exc_info()[0]
    return ""


root = get_contents(folder_id)
allLabs = {}
labcontent = {}

def update():
  global root
  global allLabs
  global labcontent
  global errorstr
  for pipeline in root['files']:
    allLabs[pipeline['name']] = {}
    for level in get_contents(pipeline['id'])['files']:
      allLabs[pipeline['name']][level['name']] = []
      for lab in get_contents(level['id'])['files']:
        allLabs[pipeline['name']][level['name']].append(lab['name'])
        for f in get_contents(lab['id'])['files']:
          labcontent[lab['name'].replace(' ', '')] = get_doc(f['id'])

def getContent(labname):
  global labcontent
  if labname in labcontent:
    return labcontent[labname]
  else:
    return ""

def getLabs():
  global allLabs
  return json.dumps(allLabs)

def getErrors():
  global errorstr
  return "<p>" + errorstr.replace("\n", "</p> <p>") + "</p>"



# test = "https://docs.google.com/document/d/1M6Cjqnp3nwBbi4JasjG_c3F61Ppd0_MPHkXiAz1qteg/export?format=html"
# shit =  http.request('GET', test).data
# f = open('shit.html', 'w')
# f.write(shit)

"""
{
 "kind": "drive#fileList",
 "files": [
  {
   "kind": "drive#file",
   "id": "0B1j-kstA_oRWdlJmTTRRT3R6cDA",
   "name": "effects",
   "mimeType": "application/vnd.google-apps.folder"
  },
  {
   "kind": "drive#file",
   "id": "0B1j-kstA_oRWMm15WVlTd1lERU0",
   "name": "animation",
   "mimeType": "application/vnd.google-apps.folder"
  },
  {
   "kind": "drive#file",
   "id": "0B1j-kstA_oRWbFBYQi1ENzdmd2c",
   "name": "post-production",
   "mimeType": "application/vnd.google-apps.folder"
  },
  {
   "kind": "drive#file",
   "id": "0B1j-kstA_oRWcFZlYVFJZmVHdjQ",
   "name": "lighting",
   "mimeType": "application/vnd.google-apps.folder"
  },
  {
   "kind": "drive#file",
   "id": "0B1j-kstA_oRWcWE1ZXlDRU9vNlE",
   "name": "rigging",
   "mimeType": "application/vnd.google-apps.folder"
  },
  {
   "kind": "drive#file",
   "id": "0B1j-kstA_oRWaTBJd01EQy1wWDQ",
   "name": "shading",
   "mimeType": "application/vnd.google-apps.folder"
  },
  {
   "kind": "drive#file",
   "id": "0B1j-kstA_oRWdjBmOWF5V2QxZVU",
   "name": "modeling",
   "mimeType": "application/vnd.google-apps.folder"
  },
  {
   "kind": "drive#file",
   "id": "0B1j-kstA_oRWX2dOX0RFUGpnUEU",
   "name": "pre-production",
   "mimeType": "application/vnd.google-apps.folder"
  },
  {
   "kind": "drive#file",
   "id": "0B1j-kstA_oRWbnE2UlBSMVVBUWs",
   "name": "introduction to maya",
   "mimeType": "application/vnd.google-apps.folder"
  }
 ]
}

"""