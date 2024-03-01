import pytest
import json
from flask import Flask

from app import app
from app import update_user_bio

app.config['TESTING'] = True

@pytest.fixture
def client():
    return app.test_client()


def test_update_user_bio_route(client):
    user_id = 123
    bio_content = "Test bio content"

    response = client.put(f'/users/{user_id}/bio', json={'bio': bio_content})

    assert response.status_code == 200
    assert response.json == {'message': 'Update bio successful'}

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