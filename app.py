
import os
from flask import Flask, render_template, request, redirect, url_for

from parse_google_labs import GoogleLabController
import process_syllabus
from werkzeug.contrib.cache import SimpleCache

app = Flask(__name__)
cache = SimpleCache()
# app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'this_should_be_configured')


###
# Routing for your application.
###
lab_controller = GoogleLabController(cache)
process_syllabus.update()


@app.route('/')
def root():
    return redirect('/static/index.html')

@app.route('/labs')
def list_labs():
    labs = lab_controller.getLabs()
    return str(labs)

@app.route('/labs/<labname>')
def get_lab(labname):
    return lab_controller.getContent(labname)

@app.route('/update')
def update():
    resp = ""
    lab_controller.update()
    resp += lab_controller.getLabs() + "\n <p></p>"
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
    return 'An internal error occurred.', 500


if __name__ == '__main__':
    app.run(debug=True)
