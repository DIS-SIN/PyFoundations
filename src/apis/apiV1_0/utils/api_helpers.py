from firebase_admin import auth
from src.utils.json_decoder import AlchemyDecoder


def construct_row_object(model, json, key_of_columns=None):
    if not key_of_columns is None:
        json = json[key_of_columns]
    json_de = AlchemyDecoder()
    new_row = json_de.default(json, model)
    return new_row


def access_restricted_content(req):
    """
    This is a utility function used to verify the user has the rights to access content
    """
    session_cookie = req.cookies.get("session")
    try:
        decode_claims = auth.verify_session_cookie(session_cookie)
        return decode_claims
    except ValueError as e:
        # Session cookie is not available or not valid.
        print(repr(e))
        return {"error": "Session does not exist"}
    except auth.AuthError:
        # Session has been revoked. Force the user to login
        return {"error": "Session has been revoked"}


def create_user_if_not_exists(cookie_dict):
    uid = cookie_dict["sub"]
    user = auth.get_user(uid)
    # waiting to see which model to put in
    # use this dictionary to securely hash a file in the instance folder
    user_info = {
        "displayName": user.display_name,
        "email": user.email,
        "emailVerified": user.email_verified,
        "phoneNumber": user.phone_number,
        "provider": user.provider_id,
    }


def download_photo(photo_url, user_info):
    # create_hashed_path and store the photo and update the db
    pass


def validate_user_info(user_info):
    # get the user and then check if information is the same
    # update field if not
    pass
