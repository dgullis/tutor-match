from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
db_name= os.getenv('DB_NAME')

#mongodb_url = os.getenv("MONGODB_URL")
mongoClient = MongoClient('MONGOURL')
#mongoClient = MongoClient('')
print(db_name, "HELLLLLOOOO")

db = mongoClient.get_database(db_name)

users_collection = db.get_collection('users')
subjects_collection = db.get_collection('subjects')
bookings_collection = db.get_collection('bookings')

def get_users_collection():
    return users_collection

def get_subjects_collection():
    return subjects_collection

def get_bookings_collection():
    return bookings_collection
    