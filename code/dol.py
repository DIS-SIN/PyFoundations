from flask import (Blueprint, render_template,
                   render_template_string, request, redirect, url_for, Markup, jsonify)
import json
import urllib
import requests
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


@bp.route('/api/test/gettest', methods=('GET', 'POST'))
def serve_api_request():
    if request.method == 'GET' or request.method == 'POST':
        return jsonify(api_handle_dol_gettest(request))

# route and render the results (we're subbing back to the index with extra data)
# might want to consider changing this to a template on its own down the road


@bp.route('/api/test/signin', methods=('GET', 'POST'))
def render_signin():
    if request.method == 'GET' or request.method == 'POST':
        return jsonify(api_handle_dol_signintest(request))


@bp.route('/api/test/puttest', methods=('GET', 'POST'))
def render_search():
    if request.method == 'GET' or request.method == 'POST':
        return jsonify(api_handle_dol_puttest(request))


@bp.route('/api/test/learning_point', methods=('GET', 'POST'))
def render_test_learningpoint():
    if request.method == 'GET' or request.method == 'POST':
        return jsonify(api_handle_dol_learningpointtest(request))

######################################################################
#  Setup dol and define helper function
######################################################################


dol_data_folder = "static/data/can-live/"

# pull in the json file and load it for use


def get_dol_db_json(answerfile):
    with open(dol_data_folder+answerfile+'.json') as f:
        data = json.load(f)
        return data


# setup some dol answers
dol_db = get_dol_db_json('dol-en')


def api_handle_dol_learningpointtest(request):
    #    __tablename__ = "learning_points"
    #    id = Column("ID",BIGINT, Sequence("learning_points_seq_id"), primary_key = True)
    #    name = Column("Name", String)
    #    description = Column("String", String)
    #    slug = Column("Slug", String)
    #    tags = Column("Tags", ARRAY(BIGINT, dimensions = 1))
    #    difficulty = Column("Difficulty", Integer)
    # debug
    if app_set_debug_mode >= 1:
        print(
            f"-- bb -- > api_handle_dol_learningpointtest > enter > {request}")

    return_val = [
        {
            "api_return": "success",
            "api_data": [
                {
                    "id": 1,
                    "name": "Coding",
                    "description": "The Basics of Coding",
                    "slug": "this-is-a-slug",
                    "tags": [
                        {
                            "id": 1,
                            "tagname": "Python",
                            "datetime": "2019-02-06T21:10:18+00:00"  # RFC3339
                        },
                        {
                            "id": 2,
                            "tagname": "Go",
                            "datetime": "2019-03-06T21:10:18+00:00"  # RFC3339
                        },
                        {
                            "id": 3,
                            "tagname": "React",
                            "datetime": "2019-04-06T21:10:18+00:00"  # RFC3339
                        }
                    ],
                    "difficulty": 5
                },
                {
                    "id": 2,
                    "name": "Not Coding",
                    "description": "The Basics of Not Coding",
                    "slug": "this-is-a-slug",
                    "tags": [
                        {
                            "id": 4,
                            "tag": "Nython",
                            "datetime": "2019-02-16T21:10:18+00:00"  # RFC3339
                        },
                        {
                            "id": 5,
                            "tag": "No",
                            "datetime": "2019-03-17T21:10:18+00:00"  # RFC3339
                        },
                        {
                            "id": 6,
                            "tag": "UnReact",
                            "datetime": "2019-04-18T21:10:18+00:00"  # RFC3339
                        }
                    ],
                    "difficulty": 10
                }
            ]
        }
    ]

    return return_val


# the api return as json response, this can be used for whatever application
# you like
def api_handle_dol_gettest(request):
    # debug
    if app_set_debug_mode >= 1:
        print(
            f"-- bb -- > api_handle_dol_gettest > enter > {request}")

    q = dol_db['bbjsonfield']
    return_val = {
        "items": [
            {"id": 1, "name": "Apples",  "price": "$2"},
            {"id": 2, "name": "Peaches", "price": "$5"},
            {"id": 3, "name": q, "price": "$9"}
        ]
    }

    return return_val

# regular response, returns html to the render


def api_handle_dol_puttest(request):
    # debug
    if app_set_debug_mode >= 1:
        print(
            f"-- bb -- > api_handle_dol_puttest > enter > {request}")

    # For GET
    # text = request.args.get('dol_ask', False)

    # For POST
    # text = request.form.get('dol_ask', False)

    # For POST JSON
    data = request.data
    dataDict = json.loads(data)
    try:
        text = dataDict['dol_ask']
    except KeyError:
        text = "dol is waiting for your input"

    q = dol_db['bbjsonfield']
    return_val = {
        "items": [
            {"id": 1, "name": text,  "price": "$2"},
            {"id": 2, "name": "Peaches", "price": "$5"},
            {"id": 3, "name": q, "price": "$9"}
        ]
    }

    return return_val


def api_handle_dol_signintest(request):
    # debug
    if app_set_debug_mode >= 1:
        print(
            f"-- bb -- > api_handle_dol_signintest > enter > {request}")

    # For GET
    # text = request.args.get('dol_ask', False)

    # For POST
    # text = request.form.get('dol_ask', False)

    # For POST JSON
    data = request.data
    dataDict = json.loads(data)
    try:
        text = dataDict['signin']
    except KeyError:
        text = "dol is waiting for your input"

    return_val = {
        "signin_result": [
            {"user": "testuser-hc", "signin_state": "true",  "api_return": "success"}
        ],
        "payload": dataDict
    }

    return return_val

# annnd run it
# if __name__ == '__main__':
#    app.run(host = '0.0.0.0', port=5054)

# annnd run it
