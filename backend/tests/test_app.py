import pytest
import json
from flask import Flask
from unittest.mock import patch
from lib.firebase_token_auth import verify_token

from app import app
from app import update_user_bio

app.config['TESTING'] = True

@pytest.fixture
def client():
    return app.test_client()

# test on hold for now
#def test_update_user_bio_route(client):
#    user_id = 123
#    bio_content = "Test bio content"
#
#    response = client.put(f'/users/{user_id}/bio', json={'bio': bio_content})

#    assert response.status_code == 200
#    assert response.json == {'message': 'Update bio successful'}

# def test_update_user_bio_route(client):
#     user_id = 123
#     bio_content = "Test bio content"

#     response = client.put(f'/users/{user_id}/bio', json={'bio': bio_content})

#     assert response.status_code == 200
#     assert response.json == {'message': 'Update bio successful'}

def test_signup(client):
    user = {
        "firebase_id": "test_firebase_id",
        "name": "Test name",
        "email": "test@email.com",
        "status": "Student",
        "safeguarding": None
    }
    response = client.post("/signup", json=user)
    assert response.status_code == 201
    assert response.json == {'user': user, 'message': 'Account created successfully'}

# TO DO: Resolve testing db problems, make sure user created in testdb
# #See lines 4 & 5 for imports
# @patch('app.verify_token') #Patch points to where verify_token is used (not where it's defined)
# def test_getUser(mock_verify_token, client):
#     # Mock simulates a successful verification
#     mock_verify_token.return_value = {"firebase_id": "test_firebase_id"}

#     user = {
#         "firebase_id": "test_firebase_id",
#         "name": "Test name",
#         "email": "test@email.com",
#         "status": "Student"
#     }
    
#     client.post("/signup", json=user)
#     response = client.get("/users/test_firebase_id")
    
#     assert response.status_code == 200
#     assert response.json == {'user': user}

