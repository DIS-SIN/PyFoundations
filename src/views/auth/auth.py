from flask import Blueprint, g, request, jsonify, make_response
from firebase_admin import auth
import datetime
bp = Blueprint('auth',__name__,url_prefix='/auth')

@bp.route('/login', methods = ('POST',))
def login():
    """
    view to create a session when a user logs in
    """
    userSession = request.cookies.get('userSession')
    if not userSession is None:
        if request.json is not None:
            user = request.json
        else:
            return make_response(jsonify({'error': "No data was recieved for this request"}), 400)
        if user.get('userToken') is None:
            return make_response(jsonify({'error': "userToken must be provided"}), 400)
        #create a time delta which will be used to specify when the cookie will expire
        #TODO: get this value from config
        expires_in = datetime.timedelta(days = 3)
        try:
            #user the firebase auth library to create a JWT 
            session_cookie = auth.create_session_cookie(user.get('userToken'), expires_in = expires_in)
            expires = datetime.datetime.utcnow() + expires_in
        except auth.AuthError:
            session_cookie = None
            expires = None 
            return make_response(jsonify({'error': 'Failed to create a session cookie'}), 403)
        try:
            decode_claims = auth.verify_session_cookie(session_cookie, check_revoked= True)
        except auth.AuthError:
            return make_response(jsonify({'error': 'Session has been revoked'}), 403)
        except ValueError:
            return make_response(jsonify({'error': 'Session created but could not be retrieved'}), 403)
            