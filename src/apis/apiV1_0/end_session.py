from flask import request, after_this_request
from flask_restful import Resource
from firebase_admin import auth
from .utils.api_helpers import access_restricted_content, validate_user_info


class SessionEnd(Resource):
    def post(self):
        cookie_vals = access_restricted_content(request)
        if cookie_vals.get("error") is not None:
            return cookie_vals, 403
        uid = cookie_vals["sub"]
        auth.revoke_refresh_tokens(uid)

        @after_this_request
        def force_session_expire(response):
            response.set_cookie("session", expires=0)
            return response
