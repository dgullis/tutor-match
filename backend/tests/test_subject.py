import pytest
from pymongo import MongoClient
from datetime import datetime


def test_get_all_subjects(mongo_db_connection):
    db = mongo_db_connection
    collection = db["subjects"]

    subjects = collection.find()

    assert subjects[0]["name"] == "mathematics"
    assert subjects[0]["gcse"] == []
    assert subjects[0]["alevel"] == []

