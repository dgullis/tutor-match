import pytest
from pymongo import MongoClient
from modules.bookings import *

def test_request_booking_success(mongo_db_connection):
    db = mongo_db_connection
    result = request_booking("mock_tutor_1", "mock_student_1", "2022-03-01T12:00:00Z")
    new_booking = db.bookings.find_one({"tutorId": "mock_tutor_1", "studentId": "mock_student_1", "start_time": "2022-03-01T12:00:00Z"})
    assert new_booking is not None
    assert result == {"success": True, "message": "Booking successfully requested", "status_code": 201}

def test_request_booking_error_duplicate(mongo_db_connection):
    db = mongo_db_connection
    db.bookings.insert_one({"tutorId": "mock_tutor_1", "studentId": "mock_student_1", "start_time": "2022-03-01T12:00:00Z", "status": "requested"})
    
    result = request_booking("mock_tutor_1", "mock_student_1", "2022-03-01T12:00:00Z")
    
    assert result == {"success": False, "message": "Booking request already exists for this time and date", "status_code": 400}

def test_update_booking_request_success_accepted(mongo_db_connection):  
    db = mongo_db_connection
    db.users.insert_one({"firebase_id": "mock_tutor_1", "name": "Tutor One", "email": "T1@email.com", "status": "Tutor", "availability": [{
        "start_time": "2022-03-01T12:00:00Z",
        "end_time": "2022-03-01T13:00:00Z",
        "available": True
    }]})
    
    booking = db.bookings.insert_one({"tutorId": "mock_tutor_1", "studentId": "mock_student_1", "start_time": "2022-03-01T12:00:00Z", "status": "requested"})
    booking_id = booking.inserted_id
    result = update_booking_request(booking_id, "mock_tutor_1", "2022-03-01T12:00:00Z", "accepted")
    updated_booking = db.bookings.find_one({"_id": booking_id})
    assert updated_booking["status"] == "accepted"
    assert result == {"success": True, "message": "Booking request updated", "status_code": 201}

def test_update_booking_request_error_request_not_found(mongo_db_connection):  

    result = update_booking_request("3A7F91BE2D8C5F04E764A3D9", "mock_tutor_1", "2022-03-01T12:00:00Z", "accepted")
    assert result == {"success": False, "message": "Booking request not found", "status_code": 404}

def test_update_booking_request_error_no_corresponding_availability(mongo_db_connection):  
    db = mongo_db_connection
    booking = db.bookings.insert_one({"tutorId": "mock_tutor_1", "studentId": "mock_student_1", "start_time": "2022-03-01T12:00:00Z", "status": "requested"})
    booking_id = booking.inserted_id
    result = update_booking_request(booking_id, "mock_tutor_1", "2022-03-01T12:00:00Z", "accepted")
    assert result == {"success": False, "message": "Unable to update booking request", "status_code": 500} 

 