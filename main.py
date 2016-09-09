# [START app]
import logging
import parse_google_labs
import process_syllabus
from flask import Flask

app = Flask(__name__)

# parse_google_labs.update()
process_syllabus.update()

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/labs')
def list_labs():
    return str(parse_google_labs.getLabs())

@app.route('/labs/<labname>')
def get_lab(labname):
    return parse_google_labs.getContent(labname)

@app.route('/update')
def update():
	resp = ""
	resp += process_labs.update() + "\n"
	resp += process_syllabus.update() + "\n"
	return resp

@app.route('/syllabus')
def get_syllabus():
	return process_syllabus.get()

@app.route('/showerrors')
def errors():
	return parse_google_labs.getErrors()


@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]
