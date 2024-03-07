from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
mongo_uri = os.getenv('MONGO_URI')
mongo_client = MongoClient(mongo_uri)
db_name = os.getenv('DB_NAME')
db = mongo_client.get_database(db_name)

users_collection = db.get_collection('users')
subjects_collection = db.get_collection('subjects')
bookings_collection = db.get_collection('bookings')

def get_users_collection():
    return users_collection

def get_subjects_collection():
    return subjects_collection

def get_bookings_collection():
    return bookings_collection
    