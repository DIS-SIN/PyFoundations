from flask import (Blueprint, render_template,
                   render_template_string, request, redirect, url_for, Markup, jsonify)
import json
import urllib

# debug enable for logging
app_set_debug_mode = 1  # 0=none,1=entry,2=entry/exit,3=all

######################################################################
#  Application routing and web end
######################################################################

bp = Blueprint('dol', __name__, url_prefix='/')

# route/render the home page


@bp.route('/app', methods=('GET', 'POST'))
def render_home():
    if request.method == 'GET':
        return render_template('dol/react-index.tmpl.html',
                               dolanswer="home!")


@bp.route('/showcase', methods=('GET', 'POST'))
def render_showcase():
    if request.method == 'GET':
        return render_template('dol/react-showcase.tmpl.html',
                               dolanswer="home!")


@bp.route('/easteregg', methods=('GET', 'POST'))
def render_easteregg():
    if request.method == 'GET':
        return render_template('dol/easter-egg.html',
                               dolanswer="home!")
