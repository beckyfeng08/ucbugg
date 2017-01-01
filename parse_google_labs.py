# from pydrive.drive import GoogleDrive
import urllib3
import json
import sys

FOLDER_ID = '0B1j-kstA_oRWZi1mTVhOWG00dDg'
API_KEY = 'AIzaSyC6oJ_00I7Ijm8SQ_yJnwmlwjOgmLzxF9M'

class GoogleLabConnectionManager():
    def __init__(self):
        self.http = urllib3.PoolManager()
        urllib3.disable_warnings()

    def get_contents_of_folder(self, fid):
      url = "https://www.googleapis.com/drive/v3/files?q='" + fid + "'+in+parents&key=" + API_KEY
      # print "trying to access lab: " + str(fid)
      # print "using this url: " + url
      try:
        return json.loads(self.http.request('GET', url).data)
      except:
        return {'files':[]}

    def get_contents_of_document(self, fid):
      global http
      try:
        url = "https://docs.google.com/document/d/" + fid + "/export?formal=html"
        return self.http.request('GET', url).data
      except:
        return {'files':[]}



class GoogleLabController():
    def __init__(self, cache):
        self.cache = cache
        self.connection_manager = GoogleLabConnectionManager()
        self.update()

    # updates instance vars with raw html from google drive folder
    # TODO get_contents calls should be async. i'm lazy.
    def update(self):
      get_folder = self.connection_manager.get_contents_of_folder
      get_doc = self.connection_manager.get_contents_of_document
      root = get_folder(FOLDER_ID)
      all_labs = {}
      lab_content = {}
      try:
        for pipeline in root['files']:
          all_labs[pipeline['name']] = {}
          for level in get_folder(pipeline['id'])['files']:
            all_labs[pipeline['name']][level['name']] = []
            for lab in get_folder(level['id'])['files']:
              all_labs[pipeline['name']][level['name']].append(lab['name'])
              for f in get_folder(lab['id'])['files']:
                lab_content[lab['name'].replace(' ', '')] = get_doc(f['id'])
        self.cache.set('all_labs', all_labs)
        self.cache.set('lab_content', lab_content)
      except KeyError as err:
        print err

    # returns formatted version of lab
    # needs to be fast because this is called when user clicks on lab
    def getContent(self, labname):
      lab_content = self.cache.get('lab_content')
      if lab_content is not None and labname in lab_content:
        return lab_content[labname]
      else:
        return "No Content Found"

    # returns json object that represents lab structure and names
    # this should be the basis for pipeline graphic
    def getLabs(self):
      all_labs = self.cache.get('all_labs')
      if all_labs is not None:
        return json.dumps(all_labs)
      else:
        return "No Labs Loaded Yet"
