import pytest
import firebase_admin
from firebase_admin import credentials, auth
from unittest.mock import patch, MagicMock
from flask import Flask

from lib.firebase_token_auth import verify_token


# test on hold 
#def test_firebase_admin_setup_expect_token_to_fail():
#    # Initialize Firebase Admin SDK
#    try:
#    except ValueError:
#        firebase_admin.get_app()
#        cred = credentials.ApplicationDefault()
#        firebase_admin.initialize_app(cred)
# Expect ValueError to be raised due to invalid token
#    with pytest.raises(ValueError):
#        decoded_token = auth.verify_id_token("invalid_token")
