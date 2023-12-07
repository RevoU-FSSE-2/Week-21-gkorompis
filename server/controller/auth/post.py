from flask import jsonify, request
from flask_jwt_extended import create_access_token
from datetime import timedelta

def auth_login():
    try:
        if request.method == "POST":
            data = request.json
            username = data.get('username')
            password = data.get('password')

            print(">>>auth_login", data)

            if not username or not password:
                failed_message = {
                    'message': "Invalid username or password!"
                }
                return jsonify(failed_message), 401

            expired_time = timedelta(hours=8)
            access_token = create_access_token(identity=username, additional_claims=data, expires_delta=expired_time)
            print(">>>access_token success", )
            return jsonify(access_token), 200
    except Exception as e:
        errorMessage= {"message": str(e)}
        return jsonify(errorMessage), 500
