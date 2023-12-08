from flask import jsonify, request
from model.users.dao.read import dao_read_one
def restrict_post_user(func):
    try:
        def wrapper(*args, **kwargs):
            try:
                request_body = request.json
                new_username = request_body.get('username')
                new_email = request_body.get('email')
                new_password = request_body.get('password')

                if not request_body or not new_username or not new_email or not new_password:
                    errorMessage = {"message": "Bad request!"}
                    return jsonify(errorMessage), 400
                
                dict_query = {"username": new_username}
                matchedUsername = dao_read_one(dict_query)
                print(">>>matchedUsername", matchedUsername)
                if matchedUsername[0]:
                    errorMessage = {"message": "username already registered"}
                    return jsonify(errorMessage), 409
                
                
                dict_query = {"email":new_email }
                matchedEmail = dao_read_one(dict_query)
                if matchedEmail[0]:
                    errorMessage = {"message": "email already registered"}
                    return jsonify(errorMessage), 409
                return func(*args, **kwargs)
            except Exception as e:
                errorMessage = {"message": str(e)}
                return jsonify(errorMessage), 500
        wrapper.__name__ = func.__name__
        return wrapper
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500
