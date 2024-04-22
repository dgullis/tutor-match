import pytest
import json
from flask import Flask
from bson import ObjectId
import os
from pymongo import MongoClient
from unittest.mock import patch
from lib.firebase_token_auth import verify_token

from app import app
from app import signup_route
from app import get_user


app.config['TESTING'] = True


@pytest.fixture
def client():
    return app.test_client()


# def test_signup(client):
#     user = {
#         "firebase_id": "test_firebase_id",
#         "name": "Test name",
#         "email": "test@email.com",
#         "status": "Student",
#         "safeguarding": "Approved",
#     }
    
#     response = client.post("/signup", json=user)
#     assert response.status_code == 201
#     assert response.json == {'user': user, 'message': 'Account created successfully'}
