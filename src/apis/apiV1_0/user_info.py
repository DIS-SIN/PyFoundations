from flask import request
from flask_restful import Resource
from firebase_admin import auth
from .utils.api_helpers import access_restricted_content, validate_user_info
class UserInfo(Resource):
    def get(self):
        cookie_vals = access_restricted_content(request)
        if cookie_vals.get('error') is not None:
           return cookie_vals, 403
        uid = cookie_vals['sub']
        user = auth.get_user(uid)
        user_info = {
            "displayName": user.display_name,
            "email": user.email,
            "emailVerified": user.email_verified,
            "phoneNumber": user.phone_number,
            "photo": user.photo_url,
            "provider": user.provider_id
        }
        validate_user_info(user_info)
        return user_info