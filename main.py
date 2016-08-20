# [START app]
import logging
import process_labs
from flask import Flask

app = Flask(__name__)


# @app.route('/')
# def hello():
#     return 'Hello World!'

@app.route('/labs')
def list_labs():
    return "hi"#process_labs.get_html().keys()+ ""


@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]
