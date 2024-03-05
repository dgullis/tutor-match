from flask import Flask, redirect, url_for, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from datetime import datetime, timezone
from bson import BSON
import json
from firebase_admin import credentials, initialize_app
from modules.users import signup, update_bio, get_user_by_id, add_availability_for_tutor, UserNotFoundError
from modules.subjects import add_tutor_to_a_subject_grade, search_by_subject_and_grade, returnSubjects, TutorAddingError, SubjectGradeNotFoundError
from modules.bookings import request_booking, update_booking_request
from lib.firebase_token_auth import verify_token



app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cred = credentials.Certificate('firebaseServiceAccountKey.json')
firebase_admin = initialize_app(cred)

@app.route("/bookings", methods=["POST"])
def request_new_booking():
    data = request.json
    tutorId = data.get('tutorId')
    studentId = data.get('studentId')
    start_time = data.get('start_time')

    result = request_booking(tutorId, studentId, start_time)
    status_code = result.get("status_code", 500)

    return jsonify(result), status_code

@app.route("/bookings/<string:bookingId>", methods=["PUT"])
def update_booking(bookingId):
    data = request.json
    status = data.get('status')
    tutor_id = data.get('tutorId')
    booking_time = data.get('bookingTime')

    result = update_booking_request(bookingId, tutor_id, booking_time, status)

    status_code = result.get("status_code", 500)
    return jsonify(result), status_code


@app.route("/signup", methods=["POST"])
def signup_route():
    return signup()

@app.route('/subjects', methods = ['GET'])
def get_tutor_subjects():
    #as this is a GET request subject and grade should be in a query string 
    #e.g. GET /tutors?subject=Maths&grade=alevel
    verify_token()
    firebaseId = request.args.get('firebaseId')
    grade = request.args.get('grade')

    try:
        result = returnSubjects(firebaseId, grade)
        return jsonify({"result": result}),200
    
    except SubjectGradeNotFoundError as sgnfe:
        return jsonify({'error': str(sgnfe)}), 404
    
    except Exception as e:
        return jsonify({f'Error retrieving subjects: {str(e)}'}), 500

@app.route('/subjects/<string:subject>/add', methods=['POST'])
def add_tutor_to_subject_grade(subject):
    verify_token()
    data = request.json
    firebase_id = data.get('firebase_id')
    grade = data.get('grade')

    try:
        add_tutor_to_a_subject_grade(firebase_id, subject, grade)
        # request successfull and tutor added to array for subject/grade
        return jsonify({'message': 'Tutor added sucessfully'}), 201
    # request successful but nothing to change as tutor already exists for subject/grade so send back 204
    except TutorAddingError as tae:
        return "", 204
    # request not successfull subject or grade not found
    except SubjectGradeNotFoundError as sgnfe:
        return jsonify({'message': str(sgnfe)}), 404
    # request not sucessfull for other errors
    except Exception as e:
        return jsonify({'error': f'{str(e)}'}), 500

@app.route('/tutors', methods=['GET'])
def search_tutors():
    #as this is a GET request subject and grade should be in a query string 
    #e.g. GET /tutors?subject=Maths&grade=alevel
    verify_token()
    subject = request.args.get('subject')
    grade = request.args.get('grade')
    print("backend subject", subject)
    print("backend grade", grade)
    
    try:
        result = search_by_subject_and_grade(subject, grade)
        return jsonify({"result": result}), 200
    
    except SubjectGradeNotFoundError as sgnfe:
        return jsonify({'error': str(sgnfe)}), 404
    
    except Exception as e:
        return jsonify({f'Error retrieving subjects: {str(e)}'}), 500
    
@app.route('/tutors/<string:userId>/availability', methods=['POST'])
def add_availability(userId):
    verify_token()
    data = request.json
    availability = data.get('availability')

    try:
        add_availability_for_tutor(userId, availability)
        return jsonify({"message": "availability added"}), 201
    except Exception as e:
        return jsonify({f'Error adding availability: {str(e)}'}), 500

@app.route('/users/<string:userId>/bio', methods=['PUT'])
def update_user_bio(userId):
    data = request.json
    bioContent = data.get('bio')

    try:
        update_bio(userId, bioContent)
        return jsonify({'message': 'Update bio successful'}), 200
    
    except UserNotFoundError as usnfe:
        return jsonify({'error': str(usnfe)}), 404
    
    except Exception as e:
        return jsonify({'error': f'Error updating bio: {str(e)}'}), 500

@app.route('/users/<string:userId>', methods=['GET'])
def get_user(userId):
    verify_token()
    
    try:
        user = get_user_by_id(userId)
        return jsonify({"user": user}), 200
    
    except UserNotFoundError as ve:
        return jsonify({'error': str(ve)}), 400
    
    except Exception as e:
        return jsonify({'error': f'Error finding user: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True)