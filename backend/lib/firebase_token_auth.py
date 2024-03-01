from flask import request
from firebase_admin import auth

def verify_token():
    id_token = request.headers.get('Authorization')
    if not id_token or not id_token.startswith('Bearer '):
        raise ValueError('Authorization token not found or invalid')

    id_token = id_token.split('Bearer ')[1]

    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except auth.InvalidIdTokenError:
        raise ValueError('Invalid ID token')
    except auth.ExpiredIdTokenError:
        raise ValueError('ID token has expired')
    

