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
        result = users_collection.find_one({"_id": ObjectId(userId)})

        if result:
            # If user is found create a new dictionary with _id as a string not ObjectId
            return {**result, '_id': str(ObjectId(userId))}
        else:
            raise UserNotFoundError('User not found')

    except Exception as e:
        raise ValueError(f'{str(e)}')
    

def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    status = data.get("status")

    if not all([name, email, status]):
        return jsonify({"error": "Missing fields"}), 400
    

    new_user = {
        "name": name,
        "email": email,
        "status": status
    }
    users_collection.insert_one(new_user)

    return jsonify({"message": "Account created successfully"}), 201

def add_availability_for_tutor(userId, availability):

    filter_criteria = {"_id": ObjectId(userId)}  
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
