from flask import Flask, redirect, url_for
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('tutormatch')
users_colletion = db.get_collection('users')

user_data = {
    "name": "dan gullis",
    "email": "test@test.com",
    "password": "123",
    "status": "student",
}

result = db.users.insert_one(user_data)

if result.inserted_id:
    print(f"User inserted with ID: {result.inserted_id}")
else:
    print("Failed to insert user.")

if __name__ == '__main__':
    app.run(debug=True)