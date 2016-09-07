# from pydrive.auth import GoogleAuth

# gauth = GoogleAuth()
# gauth.LocalWebserverAuth()

# from pydrive.drive import GoogleDrive

# drive = GoogleDrive()

LINK = "https://docs.google.com/spreadsheets/d/1EYIf9en6oyRgH8nT5d2zFo43o_0PHaSdDGcgN090jsU/export?format=csv"

import requests
response = requests.get(LINK)
assert response.status_code == 200, 'Wrong status code'
print response.content