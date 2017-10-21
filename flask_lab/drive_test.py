

from __future__ import print_function

import httplib2
import os

from apiclient import discovery, errors
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

SCOPES = 'https://www.googleapis.com/auth/drive.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'UCBUGG Lab Download Test'

def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir, 'drive-python-quickstart.json')

    store = Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials

def get_file_content(folder_id):
	credentials = get_credentials()
	http = credentials.authorize(httplib2.Http())
	service = discovery.build('drive', 'v3', http=http)
	
	content = []

	"""
	perms = service.permissions().list(fileId=folder_id).execute()

	print ("PERMISSIONS:")
	for perm in perms["permissions"]:
		for p in perm:
		    print (p, perm[p])
	
	print()
	"""

	folderResults = service.files().list( fields="nextPageToken, files(id, name)", q="'" + folder_id + "' " + "in parents" ).execute()
	fileList = folderResults.get('files', [])
	if not fileList:
		print( 'no files found' )
	else:
		#print( 'Files: ')
		for file in fileList:
			# line below not necessary, just for test see
			content.append('name: {0} ({1})'.format(file['name'], file['id']))
			fileData = service.files().export( fileId=file['id'], mimeType="text/plain" ).execute()
			content.append(fileData)

	return content

if __name__ == '__main__':
	# should go to flask_test in website admin
	# permission is on anyone can view at the moment
	content = get_file_content("0Byl0o81BHtKgZy1EeEhRSDFmUEE")
	
	for thing in content:
		print(thing)
		print()



