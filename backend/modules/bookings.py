from bson import ObjectId
from db.mongodb import get_bookings_collection, get_users_collection

bookings_collection = get_bookings_collection()
users_collection = get_users_collection()


#define functions here for bookings

def update_booking_request(bookingId, tutor_id, booking_time, status):
    filter_criteria = {"_id": ObjectId(bookingId) }
    update_operation = {'$set': {'status': status}}


    # if denying booking request then delete request so another user can make a request
    if status == "denied":
        delete_booking_request_result = bookings_collection.delete_one(filter_criteria)
        if delete_booking_request_result.deleted_count > 0:
            return  {"success": True, "message": "Booking request denied and deleted", "status_code": 201}  
        else:
            return  {"success": False, "message": "Booking request not found", "status_code": 404}


    update_booking_request_result = bookings_collection.update_one(filter_criteria, update_operation)

    if update_booking_request_result.modified_count > 0:
        
        #if booking has been accepted then find the corresponding availability slot for the user(tutor) and change the status of available from true to false
        update_fields = {
        'availability.$.available': False,
        }

        filter_criteria = {
            'firebase_id': tutor_id,
            'availability': {
                '$elemMatch': {
                    'start_time': booking_time
                }
            }
        }

        update_availability_result = users_collection.update_one(filter_criteria, {'$set': update_fields})

        if update_availability_result.modified_count > 0:
            # if booking status has been updated to acepted and corresponding availablity slot has been change to available - false then
            return  {"success": True, "message": "Booking request updated", "status_code": 201}
        else:
            #booking status updated (accepted) but corresponding availability slot not found then
            return {"success": False, "message": "Unable to update booking request", "status_code": 500} 
    else:
        # if booking not found then
        return  {"success": False, "message": "Booking request not found", "status_code": 404}



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
        return {"success": True, "message": "Booking successfully requested", "status_code": 201}
        
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




