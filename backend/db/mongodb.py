from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()


def get_database():
    # If running tests, use the test database
    if os.getenv('FLASK_ENV') == 'test':
        mongo_uri = os.getenv('TEST_MONGO_URI')
        db_name = os.getenv('TEST_DB_NAME')
    else:
        # Use the main database
        mongo_uri = os.getenv('MONGO_URI')
        db_name = os.getenv('DB_NAME')

    mongo_client = MongoClient(mongo_uri)
    db = mongo_client.get_database(db_name)
    return db

def get_users_collection():
    db = get_database()
    return db.get_collection('users')

def get_subjects_collection():
    db = get_database()
    return db.get_collection('subjects')

def get_bookings_collection():
    db = get_database()
    return db.get_collection('bookings')