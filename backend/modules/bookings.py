from bson import ObjectId
from db.mongodb import get_bookings_collection, get_users_collection

bookings_collection = get_bookings_collection()
users_collection = get_users_collection()


#define functions here for bookings

def update_booking_request(bookingId, status):
    filter_criteria = {"_id": ObjectId(bookingId) }
    update_operation = {'$set': {'status': status}}

    update_booking_request_result = bookings_collection.update_one(filter_criteria, update_operation)

    if update_booking_request_result.modified_count > 0:
        return  {"success": True, "message": "Booking status updated", "status_code": 201}
    else:
        return  {"success": False, "message": "Booking not found", "status_code": 404}



def request_booking(tutorId, studentId, start_time):

    if is_booking_duplicate(tutorId, studentId, start_time):
        return {"success": False, "message": "Booking request already exists for this time and date", "status_code": 400}
    
    new_booking = {
        "tutorId": tutorId,
        "studentId": studentId,
        "start_time": start_time,
        "status": "requested"
    }

    booking_result = bookings_collection.insert_one(new_booking)

    if booking_result.inserted_id:

        update_fields = {
        'availability.$.available': False,
        }

        filter_criteria = {
            'firebase_id': tutorId,
            'availability': {
                '$elemMatch': {
                    'start_time': start_time
                }
            }
        }

        update_availability_result = users_collection.update_one(filter_criteria, {'$set': update_fields})

        if update_availability_result.modified_count > 0:
        # Add more fields to update as needed
            return {"success": True, "message": "Booking successfully requested", "status_code": 201}
        else:

            return {"success": False, "message": "Unable to make booking", "status_code": 500}
        
        # maybe add this in later
        # filter_criteria = {"firebase_id": tutorId}
        # update_operation = {"$push": {"bookings": booking_result.inserted_id}}
        # add_booking_to_user = users_collection.update_one(filter_criteria, update_operation)
        # if add_booking_to_user.acknowledged:
        #     return {"success": True, "message": "Booking successfully requested", "status_code": 201}
        # else:
        #     return {"success": False, "message": "Unable to make booking, tutor not found", "status_code": 404}
    
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




