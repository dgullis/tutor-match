from flask import Flask, redirect, url_for, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from datetime import datetime, timezone
from bson import BSON
import json
from modules.users import update_bio
from modules.users import signup
from firebase_admin import credentials, initialize_app


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cred = credentials.Certificate('firebaseServiceAccountKey.json')
firebase_admin = initialize_app(cred)

@app.route('/users/<int:userId>/bio', methods=['PUT'])
def update_user_bio(userId):
    data = request.json
    bioContent = data.get('bio')

    try:
        update_bio(userId, bioContent)
        return jsonify({'message': 'Update bio successful'})
    except Exception as e:
        return jsonify({'error': f'Error updating bio: {str(e)}'}), 500

@app.route("/signup", methods=["POST"])
def signup_route():
    return signup()

if __name__ == '__main__':
    app.run(debug=True)