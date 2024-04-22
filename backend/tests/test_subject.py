import pytest
from pymongo import MongoClient
from modules.subjects import *

mock_maths_collection = {
    "name": "Maths",
    "gcse": ["tutor1", "tutor2"],
    "alevel": ["tutor3"]
    }

mock_english_collection = {
    "name": "English",
    "gcse": ["tutor3"],
    "alevel": ["tutor2", "tutor1"]
    }

mock_tutor_1 =  {"firebase_id": "tutor1", "name": "Tutor One", "email": "T1@example.com"}

mock_tutor_2 = {"firebase_id": "tutor2", "name": "Tutor Two", "email": "T2@example.com"}


mock_tutor_3 = {"firebase_id": "tutor3", "name": "Tutor Three", "email": "T3@example.com"}


def test_search_by_subject_and_grade_success(mongo_db_connection):
    db = mongo_db_connection

    db.subjects.insert_one(mock_maths_collection)
    db.subjects.insert_one(mock_english_collection)
    db.users.insert_one(mock_tutor_1)
    db.users.insert_one(mock_tutor_2)
    db.users.insert_one(mock_tutor_3)

    result = search_by_subject_and_grade("Maths", "gcse")
    assert len(result) == 2
    assert result[0]["name"] == "Tutor One"
    assert result[1]["name"] == "Tutor Two"

    result = search_by_subject_and_grade("English", "alevel")
    assert len(result) == 2
    assert result[0]["name"] == "Tutor Two"
    assert result[1]["name"] == "Tutor One"


def test_search_by_subject_and_grade_error_invalid_subject():

    with pytest.raises(ValueError) as e:
        search_by_subject_and_grade("Physics", "gcse")
    assert str(e.value) == "Error finding tutors: Subject or grade not found"

def test_add_tutor_to_a_subject_grade_success(mongo_db_connection):
    db = mongo_db_connection

    db.subjects.insert_one(mock_english_collection)
    db.users.insert_one(mock_tutor_1)

    result = add_tutor_to_a_subject_grade("tutor1", "English", "gcse")
    assert result == {'message': 'Subject and grade added successfully.'}

    result = db.subjects.find_one({"name": "English"})
    assert result["gcse"] == ["tutor3", "tutor1"]


def test_add_tutor_to_a_subject_grade_error_tutor_already_added(mongo_db_connection):
    db = mongo_db_connection

    db.subjects.insert_one(mock_maths_collection)
    db.users.insert_one(mock_tutor_1)

    with pytest.raises(TutorAddingError) as e:
        add_tutor_to_a_subject_grade("tutor1", "Maths", "gcse")
    assert str(e.value) == "You have already added this subject and grade."

def test_add_tutor_to_a_subject_grade_error_invalid_subject(mongo_db_connection):
    with pytest.raises(SubjectGradeNotFoundError) as e:
        add_tutor_to_a_subject_grade("tutor1", "Physics", "gcse")
    assert str(e.value) == "Subject or grade not found"

def test_add_tutor_to_a_subject_grade_error_invalid_grade(mongo_db_connection):
    with pytest.raises(SubjectGradeNotFoundError) as e:
        add_tutor_to_a_subject_grade("tutor1", "Maths", "alevel")
    assert str(e.value) == "Subject or grade not found" 


def test_return_subjects_success(mongo_db_connection):
    db = mongo_db_connection

    db.subjects.insert_one(mock_maths_collection)
    db.subjects.insert_one(mock_english_collection)

    result = returnSubjects("tutor1", "gcse")
    assert len(result) == 1
    assert result[0]["name"] == "Maths"

    result = returnSubjects("tutor2", "alevel")
    assert len(result) == 1
    assert result[0]["name"] == "English"

