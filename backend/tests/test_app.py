import pytest
import json
from flask import Flask
from bson import ObjectId
from dotenv import load_dotenv
import os
from pymongo import MongoClient
from app import app
from app import signup_route
from app import get_user

app.config['TESTING'] = True


@pytest.fixture
def client():
    return app.test_client()


def test_signup(client):
    user = {
        "firebase_id": "test_firebase_id",
        "name": "Test name",
        "email": "test@email.com",
        "status": "Student"
    }
    response = client.post("/signup", json=user)

    assert response.status_code == 201
    assert response.json == {'user': user, 'message': 'Account created successfully'}


def test_get_user(client):
    new_user = {
        "firebase_id": "test_firebase_id",
        "name": "Test name",
        "email": "test@email.com",
        "status": "Student"
    }

    # user_id = str(ObjectId()) 
    users_collection = app.users_collection  
    # users_collection.insert_one({**new_user, "_id": ObjectId(user_id)})
    
    print(users_collection)

    response = client.get('/users/test_firebase_id')

    assert response.status_code == 200
    assert response.json == {"user": new_user}



# route currently not in use:
# def test_update_user_bio_route(client):
#     new_user = {
#         "firebase_id": "test_firebase_id",
#         "name": "Test name",
#         "email": "test@email.com",
#         "status": "Student"
#     }
    
#     user_id = str(ObjectId()) # Generate a unique ID for the user
#     users_collection = app.users_collection  # Access the collection from the app
#     users_collection.insert_one({**new_user, "_id": ObjectId(user_id)})  # Insert the user into the database

#     bio_content = "Test bio content"
#     response = client.put(f'/users/{user_id}/bio', json={'bio': bio_content})

#     assert response.status_code == 200
#     assert response.json == {'message': 'Update bio successful'}

#     # Check if the user's bio was actually updated in the database
#     updated_user = users_collection.find_one({"_id": ObjectId(user_id)})
#     assert updated_user["bio"] == bio_content



