from flask import Flask, redirect, url_for
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from datetime import datetime, timezone
from bson import BSON
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('tutormatch')
users_collection = db.get_collection('users')
subjects_collection = db.get_collection('subjects')
bookings_collection = db.get_collection('bookings')

iso_date_start = datetime(2022, 3, 1, 12, 0, 0, tzinfo=timezone.utc)
iso_date_end = datetime(2022, 3, 1, 13, 0, 0, tzinfo=timezone.utc)

student_data = {
    "name": "dan gullis",
    "email": "dan@test.com",
    "password": "123",
    "status": "student"
}

availability_data = {
    "start_time": iso_date_start,
    "end_time": iso_date_end,
    "available": True,
}

tutor_data = {
    "name": "kat",
    "email": "katt@test.com",
    "password": "123",
    "status": "tutor",
    "availability": availability_data
}


student_result = db.users.insert_one(student_data)

tutor_result = db.users.insert_one(tutor_data)

print(tutor_result)


if __name__ == '__main__':
    app.run(debug=True)