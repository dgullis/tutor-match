from flask import Flask, redirect, url_for
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from datetime import datetime, timezone
from bson import BSON
import json
from firebase_admin import credentials, initialise_app

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cred = credentials.Certificate('firebaseServiceAccountKey.json')
firebase_admin = initialize_app(cred)


if __name__ == '__main__':
    app.run(debug=True)