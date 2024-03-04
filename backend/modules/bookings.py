from db.mongodb import get_bookings_collection, get_users_collection

bookings_collection = get_bookings_collection()
users_collection = get_users_collection()


#define functions here for bookings

def request_booking(tutorId, studentId, start_time):

    if is_booking_duplicate(tutorId, studentId, start_time):
        return {"success": False, "message": "Booking already exists", "status_code": 400}
    
    new_booking = {
        "tutorId": tutorId,
        "studentId": studentId,
        "start_time": start_time,
        "status": "requested"
    }

    booking_result = bookings_collection.insert_one(new_booking)

    if booking_result.inserted_id:
        filter_criteria = {"firebase_id": tutorId}
        update_operation = {"$push": {"bookings": booking_result.inserted_id}}

        add_booking_to_user = users_collection.update_one(filter_criteria, update_operation)
        if add_booking_to_user.acknowledged:
            return {"success": True, "message": "Booking successfully requested", "status_code": 201}
        else:
            return {"success": False, "message": "Unable to make booking, tutor not found", "status_code": 404}

    else:
        return {"success": False, "message": "Unable to make booking", "status_code": 500}

def is_booking_duplicate(tutorId, studentId, start_time):
    # Query criteria to check for duplicate booking
    duplicate_query = {
        "tutorId": tutorId,
        "studentId": studentId,
        "start_time": start_time,
        "status": "requested"
    }

    existing_booking = bookings_collection.find_one(duplicate_query)
    return existing_booking is not None




