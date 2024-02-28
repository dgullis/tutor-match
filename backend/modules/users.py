from db.mongodb import get_users_collection

#create functions in here to add users / update users / delete users etc

def update_bio(userId, bioContent):
    users_collection = get_users_collection()

    try:
        filter_criteria = {"_id": userId}  
        update_data = {"$set": {"bio": bioContent}} 
        result = users_collection.update_one(filter_criteria, update_data)
        
        return result

    except Exception as e:
        return e

