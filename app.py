
import os
from flask import Flask, render_template, request, redirect, url_for, session
from flask.ext.session import Session

import parse_google_labs
import process_syllabus
import logging

app = Flask(__name__)

# app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'this_should_be_configured')


###
# Routing for your application.
###

# parse_google_labs.update()
# process_syllabus.update()


@app.route('/')
def root():
    return redirect('/static/index.html')

@app.route('/labs')
def list_labs():
    labs = parse_google_labs.getLabs()
    return str(labs)

@app.route('/labs/<labname>')
def get_lab(labname):
    return parse_google_labs.getContent(labname)

@app.route('/update')
def update():
    resp = ""
    parse_google_labs.update()
    resp += parse_google_labs.getLabs() + "\n <p></p>"
    # resp += parse_google_labs.update() + "\n"
    resp += process_syllabus.update() + "\n"
    return resp

@app.route('/syllabus')
def get_syllabus():
	return process_syllabus.get()


###
# The functions below should be applicable to all Flask apps.
###

@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=600'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500


if __name__ == '__main__':
    app.run(debug=True)
