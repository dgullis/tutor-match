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
from db.mongodb import users_collection

app.config['TESTING'] = True


@pytest.fixture
def client():
    return app.test_client()


def test_signup(client):
    user = {
        "firebase_id": "test_firebase_id",
        "name": "Test name",
        "email": "test@email.com",
        "status": "Student",
        "safeguarding": "Approved",
    }
    
    response = client.post("/signup", json=user)

    assert response.status_code == 201
    assert response.json == {'user': user, 'message': 'Account created successfully'}


# def test_update_user_bio_route(client):
#     new_user = {
#         "firebase_id": "test_firebase_id",
#         "name": "Test name",
#         "email": "test@email.com",
#         "status": "Student"
#     }
    
#     users_collection.insert_one({**new_user, "_id": "test_firebase_id"})  # Insert the user into the database

#     bio_content = "Test bio content"
#     response = client.post(f'/users/test_firebase_id/bio', json={'bio': bio_content})

#     assert response.status_code == 200
#     assert response.json == {'message': 'Update bio successful'}

#     updated_user = users_collection.find_one({"_id": "test_firebase_id"})
#     assert updated_user["bio"] == bio_content



# def test_getUser(mock_verify_token, client):
#     # Mock simulates a successful verification
#     mock_verify_token.return_value = {"firebase_id": "test_firebase_id"}

#     user = {
#         "firebase_id": "test_firebase_id",
#         "name": "Test name",
#         "email": "test@email.com",
#         "status": "Student"
#     }
    
#     users_collection.insert_one({**user, "_id": ObjectId(user_id)})
#     response = client.get("/users/test_firebase_id")
    
#     assert response.status_code == 200
#     assert response.json == {'user': user}


