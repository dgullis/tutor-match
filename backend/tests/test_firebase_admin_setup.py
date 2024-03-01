import pytest
import firebase_admin
from firebase_admin import credentials, auth

def test_firebase_admin_setup_expect_token_to_fail():
    # Initialize Firebase Admin SDK
    try:
        firebase_admin.get_app()
    except ValueError:
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred)
    
    # Expect invalid token error to be raised due to invalid token
    with pytest.raises(firebase_admin.auth.InvalidIdTokenError):
        auth.verify_id_token("invalid_token")
