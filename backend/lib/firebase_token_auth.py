from flask import Flask, request, jsonify
from functools import wraps
import firebase_admin.auth as firebase_auth

app = Flask(__name__)

def verify_token(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'Authorization' not in request.headers:
            return jsonify({'message': 'No token provided'}), 401
        try:
            auth_header = request.headers['Authorization']
            token = auth_header.split(' ')[1]
            firebase_auth.verify_id_token(token)
        except Exception as e:
            return jsonify({'message': 'Invalid or expired token'}), 403
        return f(*args, **kwargs)
    return wrap

# Example code to include in 
# Example of a protected route
@app.route('/your-endpoint')
@verify_token
def protected_endpoint():
    # Your endpoint logic here
    return jsonify({'message': 'This is a protected route'})
