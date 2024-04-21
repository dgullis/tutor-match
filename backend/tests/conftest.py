import pytest
from pymongo import MongoClient
from datetime import datetime, timezone
import os
from dotenv import load_dotenv

iso_date_start = datetime(2022, 3, 1, 12, 0, 0, tzinfo=timezone.utc)
iso_date_end = datetime(2022, 3, 1, 13, 0, 0, tzinfo=timezone.utc)

student_data = {
    "name": "test student 1",
    "email": "teststudent1@test.com",
    "password": "123",
    "status": "student"
}

availability_data = {
    "start_time": iso_date_start,
    "end_time": iso_date_end,
    "available": True,
}

tutor_data1 = {
    "name": "test tutor 1",
    "email": "testtutor1@test.com",
    "password": "123",
    "status": "tutor",
    "availability": availability_data
}

tutor_data2 = {
    "name": "test tutor 2",
    "email": "testtutor2@test.com",
    "password": "123",
    "status": "tutor",
    "availability": availability_data
}

subject_data1 = {
    "name": "Maths",
    "gcse": [],
    "alevel" : []
}
subject_data2 = {
    "name": "Science",
    "gcse": [],
    "alevel" : []
}
subject_data3 = {
    "name": "English",
    "gcse": [],
    "alevel" : []
}

load_dotenv()


@pytest.fixture()
def mongo_db_connection():
    print("Connecting to the test database...")

    # Establish connection to the MongoDB database
    client = MongoClient('mongodb+srv://danielgullis1:eLyZVRpuAGUsHxQq@cluster0.vtruigh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    
    # Access the test database
    db = client['tutor-match-test']

    print("Connected to the test database.")

    # db.users.insert_one(student_data)
    # db.users.insert_one(tutor_data1)
    # db.users.insert_one(tutor_data2)
    # db.subjects.insert_one(subject_data1)
    # db.subjects.insert_one(subject_data2)
    # db.subjects.insert_one(subject_data3)


    #allows the test to run and once finished executes clean up code to clear database
    yield db
    client.drop_database("tutor-match-test")
