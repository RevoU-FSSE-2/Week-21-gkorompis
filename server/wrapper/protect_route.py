from flask import request, jsonify
from utils.global_env import JWT_SECRET_KEY
from jwt import decode
from datetime import datetime

def validate_jwt_token(token, secret):
    try:
        print(">>> token", token)
        decodedToken = decode(token, secret, algorithms=["HS256"])
        print(">>> decoded", decodedToken)
        #check expired token
        current_time = datetime.utcnow()
        expiration_time = datetime.fromtimestamp(decodedToken["exp"])

        print(">>> currentTime", current_time)
        print(">>> expirationTime", expiration_time)

        expired = current_time > expiration_time
        message = "expired" if expired else "not yet expired"
        print(">>> expired:", expired)
        print(">>> message:", message)
        if not token and not secret:
            return False
        return decodedToken
    except Exception as e:
        errorMessage = {"message": str(e)}
        print(">>> errorMessage", errorMessage)
        return False

def protect_route(func):
    try:
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get('Authorization')
            print(">>>authorization headers", auth_header)

            #check if token bearer is present or not, else 401
            if not auth_header or not auth_header.startswith("Bearer"):
                errorMessage = {"message": "missing or invalid authorization header"}
                return jsonify(errorMessage), 401
            
            token = auth_header.split(" ")[1]

            token_info = validate_jwt_token(token, JWT_SECRET_KEY)
            #check if token bearer is valid, else 403
            if not token_info:
                errorMessage = {"message": "Invalid token"}
                return jsonify(errorMessage), 403
            
            print(">>> token info", token_info)
            #if passed next
            return func(*args, **kwargs)
        wrapper.__name__ = func.__name__
        return wrapper
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500