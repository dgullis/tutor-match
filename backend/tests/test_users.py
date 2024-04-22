import pytest
from app import app
from pymongo import MongoClient
from datetime import datetime
from modules.users import *
from modules.users import UserNotFoundError

@pytest.fixture
def client():
    return app.test_client()

test_booking_data = {
    "start_time": "2024-03-11T13:00:00.000Z",
    "tutorId": "tutor_firebase_id",
    "studentId": "student_firebase_id",
    "status": "accepted"
}

test_tutor_data = {
    "firebase_id": "tutor_firebase_id",
    "email": "testTutor@test.com",
    "name": "Test Tutor",
    "status": "Tutor",
    "safeguarding": True
    }

test_student_data = {
    "firebase_id": "student_firebase_id",
    "email": "testStudent@test.com",
    "name": "Test Student",
    "status": "Student",
    }

test_pending_tutor1 = {
    "firebase_id": "test_firebase_id_1",
    "email": "test1@example.com",
    "name": "Test User1",
    "safeguarding": 'Pending'
}
test_pending_tutor2 = {
    "firebase_id": "test_firebase_id_2",
    "email": "test2@example.com",
    "name": "Test User2",
    "safeguarding": 'Pending'
}

def test_signup_route_success(client, mongo_db_connection):
    db = mongo_db_connection
    # Prepare test data
    test_data = {
        "firebase_id": "test_firebase_id",
        "name": "Test User",
        "email": "test@example.com",
        "status": "active",
        "safeguarding": True
    }

    # POST request to the signup route with test data
    response = client.post("/signup", json=test_data)

    # Assert response status code is 201
    assert response.status_code == 201

    # Assert the response contains the expected message
    assert response.json["message"] == "Account created successfully"

    # Assert the user is created in the test database
    inserted_user = db['users'].find_one({"firebase_id": "test_firebase_id"})
    assert inserted_user is not None

def test_signup_route_error_missing_name(client, mongo_db_connection):
    db = mongo_db_connection
    # Prepare test data
    test_data = {
        "firebase_id": "test_firebase_id",
        "email": "test@example.com",
        "status": "active",
        "safeguarding": True
    }

    # POST request to the signup route with test data
    response = client.post("/signup", json=test_data)

    assert response.status_code == 400

    # Assert the response contains the expected error message
    assert response.json["error"] == "Missing fields"

def test_signup_route_error_missing_email(client, mongo_db_connection):
    db = mongo_db_connection
    # Prepare test data
    test_data = {
        "firebase_id": "test_firebase_id",
        "name": "Test User",
        "status": "active",
        "safeguarding": True
    }

    # POST request to the signup route with test data
    response = client.post("/signup", json=test_data)

    assert response.status_code == 400

    # Assert the response contains the expected error message
    assert response.json["error"] == "Missing fields"

def test_signup_route_error_missing_status(client, mongo_db_connection):
    db = mongo_db_connection
    # Prepare test data
    test_data = {
        "firebase_id": "test_firebase_id",
        "email": "test@example.com",
        "name": "Test User",
        "safeguarding": True
    }

    # POST request to the signup route with test data
    response = client.post("/signup", json=test_data)

    assert response.status_code == 400

    # Assert the response contains the expected error message
    assert response.json["error"] == "Missing fields"

def test_signup_route_error_missing_status(client, mongo_db_connection):
    db = mongo_db_connection
    # Prepare test data
    test_data = {
        "firebase_id": "test_firebase_id",
        "email": "test@example.com",
        "name": "Test User",
        "safeguarding": True
    }

    # POST request to the signup route with test data
    response = client.post("/signup", json=test_data)

    assert response.status_code == 400

    # Assert the response contains the expected error message
    assert response.json["error"] == "Missing fields"

def test_update_bio_successfull(mongo_db_connection):
    db = mongo_db_connection
    test_data = {
        "firebase_id": "test_firebase_id",
        "email": "test@example.com",
        "name": "Test User",
        "status": "Student",
        "safeguarding": True
    }
    db.users.insert_one(test_data)
    result = update_bio("test_firebase_id", "new bio")
    assert result == {"message": "Update bio successful"}

def test_update_bio_user_not_found(mongo_db_connection):
    db = mongo_db_connection

    test_data = {
        "firebase_id": "test_firebase_id",
        "email": "test@example.com",
        "name": "Test User",
        "status": "Student",
        "safeguarding": True
    }
    db.users.insert_one(test_data)

    with pytest.raises(UserNotFoundError) as error:
        update_bio("test_firebase_id_2", "new bio")
    assert str(error.value) == 'User not found'

def test_get_user_by_id_success_tutor(mongo_db_connection):
    db = mongo_db_connection
    db.users.insert_one(test_tutor_data)
    db.users.insert_one(test_student_data)
    db.bookings.insert_one(test_booking_data)
    
    result = get_user_by_id("tutor_firebase_id")
    
    # Remove _id field from bookings as this result will be different each time
    for booking in result['bookings']:
        booking.pop('_id', None)
    
    assert result == {
        'bookings': [
        {
            'start_time': '2024-03-11T13:00:00.000Z',
            'status': 'accepted',
            'studentId': 'student_firebase_id',
            'tutorId': 'tutor_firebase_id',
        },
        ],
        'email': 'testTutor@test.com',
        'firebase_id': 'tutor_firebase_id',
        'name': 'Test Tutor',
        'safeguarding': True,
        'status': 'Tutor',
    }

def test_get_user_by_id_success_student(mongo_db_connection):
    db= mongo_db_connection

    db.users.insert_one(test_tutor_data)
    db.users.insert_one(test_student_data)
    db.bookings.insert_one(test_booking_data)
    
    result = get_user_by_id("student_firebase_id")
    
    # Remove _id field from bookings as this result will be different each time
    for booking in result['bookings']:
        booking.pop('_id', None)
    
    assert result == {
        'bookings': [
        {
            'start_time': '2024-03-11T13:00:00.000Z',
            'status': 'accepted',
            'studentId': 'student_firebase_id',
            'tutorId': 'tutor_firebase_id',
        },
        ],
        'email': 'testStudent@test.com',
        'firebase_id': 'student_firebase_id',
        'name': 'Test Student',
        'status': 'Student',
    }

def test_get_user_by_id_error_user_not_found(mongo_db_connection):
    db = mongo_db_connection

    with pytest.raises(UserNotFoundError) as error:
        get_user_by_id("tutor_firebase_id_error")
    assert str(error.value) == 'User not found'


def test_add_availability_for_tutor_success(mongo_db_connection):
    db = mongo_db_connection

    db.users.insert_one(test_tutor_data)

    availability = [
        {
            "start_time": datetime(2024, 3, 11, 13, 0, 0),
            "end_time": datetime(2024, 3, 11, 14, 0, 0)
        }
    ]

    add_availability_for_tutor("tutor_firebase_id", availability)
    result = db.users.find_one({"firebase_id": "tutor_firebase_id"})
    assert result['availability'] == [{
            "start_time": datetime(2024, 3, 11, 13, 0, 0),
            "end_time": datetime(2024, 3, 11, 14, 0, 0),
            "available": True
        }]
    



def test_get_pending_tutors_success(mongo_db_connection):
    db =  mongo_db_connection

    db.users.insert_one(test_pending_tutor1)
    db.users.insert_one(test_pending_tutor2)

    result = get_pending_tutors()
    assert result == [
        {
        "email": "test1@example.com",
        "firebase_id": "test_firebase_id_1",
        "name": "Test User1",
        "safeguarding": 'Pending'
        },
       {
        "email": "test2@example.com",
        "firebase_id": "test_firebase_id_2",
        "name": "Test User2",
        "safeguarding": 'Pending'
        }
    ]

def test_approve_tutor_success(mongo_db_connection):

    db = mongo_db_connection

    db.users.insert_one(test_pending_tutor1)

    result = approve_tutor("test_firebase_id_1")
    assert result == {"message": "Update status successful"}

def test_approve_tutor_error_user_not_found(mongo_db_connection):
    db = mongo_db_connection

    with pytest.raises(UserNotFoundError) as error:
        approve_tutor("test_firebase_id_1")
    assert str(error.value) == "User not found"


def test_submit_review_success(mongo_db_connection):
    db = mongo_db_connection

    db.users.insert_one(test_student_data)
    db.users.insert_one(test_tutor_data)

    result = submit_review("tutor_firebase_id", 5, "Great tutor", "student_firebase_id")
    assert result == {"success": True, "message": "Review submitted sucessfully", "status_code": 201}

def test_submit_review_error_duplicate_review(mongo_db_connection):

    db = mongo_db_connection

    db.users.insert_one(test_tutor_data)
    db.users.insert_one(test_student_data)
    
    submit_review("tutor_firebase_id", 5, "Great tutor", "student_firebase_id")
    result = submit_review("tutor_firebase_id", 5, "Great tutor", "student_firebase_id")
    assert result == {"success": False, "message": "You have already submited a review for this tutor", "status_code": 400}

def test_submit_review_error_user_not_found():
    result = submit_review("tutor_firebase_id_error", 5, "Great tutor", "student_firebase_id")
    assert result == {"success": False, "message": "Unable to submit review. User not found", "status_code": 404} 

 
def test_update_rating_success_single_review(mongo_db_connection):
    db = mongo_db_connection

    db.users.insert_one({**test_tutor_data, "reviews": [{"rating": 5, "comment": "Great tutor", "reviewer_id": "student_firebase_id_1"}]})
    updating_rating("tutor_firebase_id")
    user = db.users.find_one({"firebase_id": "tutor_firebase_id"})
    assert user['rating'] == 5

def test_update_rating_success_multiple_reviews(mongo_db_connection):
    db = mongo_db_connection
    db.users.insert_one({**test_tutor_data, "reviews": 
                        [
                            {"rating": 5, "comment": "Great tutor", "reviewer_id": "student_firebase_id_1"},
                            {"rating": 3, "comment": "Okay tutor", "reviewer_id": "student_firebase_id_2"},
                            {"rating": 2, "comment": "Bad tutor", "reviewer_id": "student_firebase_id_3"}
                        ]})
    updating_rating("tutor_firebase_id")
    user = db.users.find_one({"firebase_id": "tutor_firebase_id"})
    assert user['rating'] == 3.33


def test_update_profile_picture_success(mongo_db_connection):
    db = mongo_db_connection

    db.users.insert_one(test_tutor_data)
    update_profile_picture("tutor_firebase_id", "https://example.com/profile.jpg")
    user = db.users.find_one({"firebase_id": "tutor_firebase_id"})
    assert user['profileImage'] == "https://example.com/profile.jpg"

def test_update_profile_picture_error_user_not_found(mongo_db_connection):  

    result = update_profile_picture("tutor_firebase_id", "https://example.com/profile.jpg")
    assert result ==  {"sucess": False, "error": "unable to update profile picture URL", "status_code": 404}





        










