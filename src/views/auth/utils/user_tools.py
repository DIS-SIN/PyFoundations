from firebase_admin import auth

def get_user_info(uid):
    user = auth.get_user(uid)
    user_info = {
        'uid': user.uid,
        'displayName': user.display_name,
        'email': user.email,
        'emailVerified': user.email_verified,
        'phoneNumber': user.phone_number,
        'provider': user.provider_id,
        'profile_picture': user.photo_url,
        'created_on': user.user_metadata.creation_timestamp,
        'last_signed_in': user.user_metadata.last_sign_in_timestamp
    }
    return user_info
def create_user_if_not_exist(uid):
    user_info = get_user_info(uid)

