import pytest
from pymongo import MongoClient
from datetime import datetime

def test_get_all_users(mongo_db_connection):

    db = mongo_db_connection
    collection = db["users"]

    users = collection.find()

    assert users[0]["name"] == "dan gullis"
    assert users[1]["name"] == "kat"
    assert users[1]["availability"] == {
        "start_time": datetime(2022, 3, 1, 12, 0),
        "end_time": datetime(2022, 3, 1, 13, 0),
        "available": True
    }



