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
        return render_template('pyfoundations/react-index.tmpl.html', pyfoundationsanswer="home!")

# api requests, returns json
@bp.route('/api/gettest', methods = ('GET', 'POST'))
def serve_api_request():
    if request.method == 'GET' or request.method == 'POST':
        return jsonify( api_handle_pyfoundations_gettest( request  ) )
    
# route and render the results (we're subbing back to the index with extra data)
# might want to consider changing this to a template on its own down the road
@bp.route('/api/puttest', methods = ('GET', 'POST'))
def render_search():
    if request.method == 'GET' or request.method == 'POST':
        return jsonify( api_handle_pyfoundations_puttest( request  ) )


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
pyfoundations_db = get_pyfoundations_db_json('pyfoundations-en')
    
# the api return as json response, this can be used for whatever application you like
def api_handle_pyfoundations_gettest(request):
    #debug
    if app_set_debug_mode >= 1: 
        print(f"-- bb -- > api_handle_pyfoundations_gettest > enter > {request}")

    q = pyfoundations_db['bbjsonfield']
    return_val = {
        "items": [
            { "id": 1, "name": "Apples",  "price": "$2" },
            { "id": 2, "name": "Peaches", "price": "$5" },
            { "id": 3, "name": q, "price": "$9"}
        ] 
    }

    return return_val

# regular response, returns html to the render
def api_handle_pyfoundations_puttest(request):
    #debug
    if app_set_debug_mode >= 1: 
        print(f"-- bb -- > api_handle_pyfoundations_puttest > enter > {request}")

    text = request.args.get('pyfoundations_ask', False)
    if not text:
        text = "pyfoundations is waiting for your input"
 
    q = pyfoundations_db['bbjsonfield']
    return_value = text + " " + q

    pyfoundations_answer = {"pyfoundations_answer": return_value}
    return pyfoundations_answer
    
# annnd run it
#if __name__ == '__main__':
#    app.run(host = '0.0.0.0', port=5054)
