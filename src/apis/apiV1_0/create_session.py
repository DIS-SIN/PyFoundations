from flask_restful import Resource
from firebase_admin import auth
from flask import (
    after_this_request,
    request
)
import datetime
from .utils.api_helpers import create_user_if_not_exists
class SessionCreator(Resource):
    """
    Used to handle user registration and login through set Flask Restful endpoints
    """
    def post(self):
        # check if the request contains json and then deserialize into user variable
        userSession = request.cookies.get('userSession')
        if not userSession is None: 
            if request.json is not None:
                user = request.json
            else:
                user = None 
            if user is None:
                return {'error': "No JSON provided in request"},400
            else:
                #check if userToken field exists return otherwise
                if user.get('userToken') is None:
                    return {'error': " No token provided in request JSON"}, 400
            #setting the session expiration to 3 days
            expires_in = datetime.timedelta(days = 3)
            try:
                #we create the session cookie and verify the ID token
                session_cookie = auth.create_session_cookie(user.get('userToken'), expires_in=expires_in)
                expires = datetime.datetime.utcnow() + expires_in
            except auth.AuthError:
                session_cookie = None 
                expires = None
                return {"error": "Failed to create a session cookie"}, 403
            try:
                decode_claims = auth.verify_session_cookie(session_cookie, check_revoked= True)
            except ValueError:
                return {'error': 'Session created however could not be retrieved'}, 403
            except auth.AuthError:
                return {'error': 'Session has been revoked'}, 403
            create_user_if_not_exists(decode_claims)
            @after_this_request
            def set_session_cookie(response):
                if session_cookie is not None and expires is not None: 
                    response.set_cookie('userSession', session_cookie, expires=expires, httponly=True)
                return response
        else:
            try:
                auth.verify_session_cookie(userSession)
            except ValueError:
                return {'error': "Session does not exist, try to log in again"}, 403
                @after_this_request
                def force_session_expire(response):
                    response.set_cookie('userSession', expires = 0)
                    return response
            except auth.AuthError:
                return {'error': "Session has been revoked"}, 403
                @after_this_request
                def force_session_expire(response):
                    response.set_cookie('userSession', expires = 0)
                    return response

                