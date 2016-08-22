# [START app]
import logging
import process_labs
import process_syllabus
from flask import Flask

app = Flask(__name__)

process_labs.update()

# @app.route('/')
# def hello():
#     return 'Hello World!'

@app.route('/labs')
def list_labs():
    return str(process_labs.get_html().keys())

@app.route('/labs/<labname>')
def get_lab(labname):
    if labname in process_labs.get_html():
        return process_labs.get_html()[labname]

@app.route('/update')
def update():
    process_labs.update()
    return ""

@app.route('/syllabus')
def get_syllabus():
    return process_syllabus.json_syllabus


@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]
