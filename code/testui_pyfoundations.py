from flask import (Blueprint, render_template, render_template_string, request, redirect, Markup, jsonify)
import json
import urllib
import requests


#debug enable for logging
app_set_debug_mode = 1 # 0=none,1=entry,2=entry/exit,3=all

######################################################################
#  Application routing and web end
######################################################################

bp = Blueprint('pyfoundations', __name__, url_prefix = '/pyfoundations')

# route/render the home page
@bp.route('/home', methods = ('GET', 'POST'))
def render_home():
    if request.method == 'GET':
        return render_template('pyfoundations/pyfoundations.tmpl.html', pyfoundationsanswer="home!")

# api requests, returns json
@bp.route('/api', methods = ('GET', 'POST'))
def serve_api_request():
    if request.method == 'GET':
        return jsonify( api_handle_pyfoundations_message( request  ) )
    
# route and render the results (we're subbing back to the index with extra data)
# might want to consider changing this to a template on its own down the road
@bp.route('/search', methods = ('GET', 'POST'))
def render_search():
    if request.method == 'GET':
        return handle_pyfoundations_message( request ) 


######################################################################
#  Setup pyfoundations and define helper function
######################################################################

pyfoundations_data_folder = "static/data/can-live/"

# pull in the json file and load it for use
def get_pyfoundations_db_json(answerfile):
    with open(pyfoundations_data_folder+answerfile+'.json') as f:
        data = json.load(f)
        return data

# setup some pyfoundations answers
pyfoundations_db = get_pyfoundations_db_json('pyfoundations-en');
    
# the api return as json response, this can be used for whatever application you like
def api_handle_pyfoundations_message(request):
    pyfoundations_answer = {"pyfoundations_answer": request}
    return pyfoundations_answer

# regular response, returns html to the render
def handle_pyfoundations_message(request,render_template_target=None):
    if render_template_target is None:
        render_template_target = 'pyfoundations/pyfoundations.tmpl.html'

    #debug
    if app_set_debug_mode >= 1: 
        print(f"-- bb -- > handle_pyfoundations_message > enter > {request} {render_template_target}")

    text = request.args.get('pyfoundations_ask', False)
    lang = request.args.get('recognition_language', False)
    tlx = request.args.get('recognition_lang_tlxd', False)
    if not text:
        text = "pyfoundations is waiting for your input"
    if not lang:
        lang = "en-US"
    if not tlx:
        tlx = "disabled"
    
    if lang == "fr-CA":
        if tlx == "enabled":
            pass 
    
    q = pyfoundations_db['bbjsonfield']
    pyfoundations_answer = text + " " + lang + " " + tlx + " " + q

    return render_template(render_template_target, pyfoundationsanswer=pyfoundations_answer)
    
# annnd run it
if __name__ == '__main__':
    app.run(host = '0.0.0.0', port=5054)
