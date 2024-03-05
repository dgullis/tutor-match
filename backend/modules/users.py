from db.mongodb import get_users_collection
from flask import Flask, redirect, url_for, request, jsonify
from bson import ObjectId

class UserNotFoundError(Exception):
    pass
class AddAvailabilityError(Exception):
    pass

#create functions in here to add users / update users / delete users etc
users_collection = get_users_collection()

def update_bio(userId, bioContent):
    users_collection = get_users_collection()
    

    try:
        filter_criteria = {"_id": ObjectId(userId)}  
        update_data = {"$set": {"bio": bioContent}} 
        result = users_collection.update_one(filter_criteria, update_data)
        
        if result.matched_count == 0:
            raise UserNotFoundError('User not found')
        else: 
            return {"message": "Update bio successful"}
        
    except Exception as e:
        raise ValueError(f'Error updating bio: {str(e)}')
    

def get_user_by_id(userId):
    users_collection = get_users_collection()

    try:
        pipeline = [
            {
                "$match": {"firebase_id": userId}
            },
            {
                "$lookup": {
                    "from": "bookings", 
                    "localField": "firebase_id",  
                    "foreignField": "tutorId",  
                    "as": "bookings"
                }
            },
            {
                "$project": {"_id": 0}
            }
        ]

        result = list(users_collection.aggregate(pipeline))

        if result:
            for booking in result[0].get("bookings", []):
                booking["_id"] = str(booking["_id"])

            return result[0]
        else:
            raise UserNotFoundError('User not found')

    except Exception as e:
        raise ValueError(f'{str(e)}')
    
# def get_user_by_id_with_bookings(userId):
#     users_collection = get_users_collection()

#     try:
#         # Perform a $lookup to get bookings related to the user
#         pipeline = [
#             {
#                 "$match": {"firebase_id": userId}
#             },
#             {
#                 "$lookup": {
#                     "from": "bookings",  # Replace with the actual name of your bookings collection
#                     "localField": "firebase_id",  # Replace with the actual field in the users collection
#                     "foreignField": "tutorId",  # Replace with the actual field in the bookings collection
#                     "as": "bookings"
#                 }
#             },
#             {
#                 "$project": {"_id": 0}
#             }
#         ]

#         result = list(users_collection.aggregate(pipeline))

#         if result:
#             for booking in result[0].get("bookings", []):
#                 booking["_id"] = str(booking["_id"])

#             return result[0]
#         else:
#             raise UserNotFoundError('User not found')

#     except Exception as e:
#         raise ValueError(str(e))

    

def signup():
    data = request.json
    firebase_id = data.get("firebase_id")
    name = data.get("name")
    email = data.get("email")
    status = data.get("status")
    safeguarding = data.get("safeguarding")

    if not all([name, email, status]):
        return jsonify({"error": "Missing fields"}), 400
    
    users_collection = get_users_collection()

    new_user = {
        "firebase_id": firebase_id,
        "name": name,
        "email": email,
        "status": status,
        "safeguarding": safeguarding
    }

    result = users_collection.insert_one(new_user)

    if result.inserted_id:
        user = users_collection.find_one({"firebase_id": firebase_id}, {"_id": 0})
        return jsonify({"user": user, "message": "Account created successfully"}), 201

def add_availability_for_tutor(userId, availability):

    filter_criteria = {"firebase_id": userId}  
    for availability in availability:
        
        try:
            update_data = {"$addToSet": {
                "availability": {
                    "start_time": availability["start_time"],
                    "end_time": availability["end_time"],
                    "available": True  
                } 
                }
            }
            users_collection.update_one(filter_criteria, update_data)
        except Exception as e:
            raise ValueError(f'Error adding availability: {str(e)}')
        
def get_pending_tutors():

    try:
        result = users_collection.find({"safeguarding":"Pending"}, {"_id": 0})

        if result:
            # If user is found create a new dictionary with _id as a string not ObjectId
            return list(result)
        else:
            raise UserNotFoundError('User not found')

    except Exception as e:
        raise ValueError(f'{str(e)}')
    

def approve_tutor(firebase_id):

    filter_criteria = {"firebase_id": firebase_id}
    update_data = {"$set": {"safeguarding": "Approved"}}
    try:
        result = users_collection.update_one(filter_criteria,update_data)
    
        if result.matched_count == 0:
           raise UserNotFoundError('User not found')
        else: 
            return {"message": "Update bio successful"}
        
    except Exception as e:
        raise ValueError(f'Error updating bio: {str(e)}')
    
        
