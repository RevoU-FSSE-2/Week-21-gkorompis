from flask import jsonify, request
from model.users.dao.read import dao_read_one
from model.profiles.dao.read import dao_read_one as dao_read_one_profile

def restrict_post_user(func):
    try:
        print(">>> restrict_post_user")
        def wrapper(*args, **kwargs):
            try:
                print(">>> restrict_post_user wrapper")
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
                errorMessage = {"message": str(e), "script": f"error at wrapper, {func.__name__}!"}
                return jsonify(errorMessage), 500
        wrapper.__name__ = func.__name__
        return wrapper
    except Exception as e:
        errorMessage = {"message": str(e), "script": f"error at, {restrict_post_user.__name__}!"}
        return jsonify(errorMessage), 500
    


def restrict_post_profile(func):
    try:
        def wrapper(wrapper_data, *args, **kwargs):
            try:
                request_body = request.json
                new_username = request_body.get('username')

                if not request_body or not new_username:
                    errorMessage = {"message": "Bad request!!"}
                    return jsonify(errorMessage), 400
                
                restrict_query = wrapper_data.get("restrict_query")
                restrict_query_name = restrict_query.get("username")
                print(">>>restrict_query_name", restrict_query_name, "and", new_username)
                dict_query = {"username": restrict_query_name if restrict_query_name else new_username}
                matchedUsername = dao_read_one_profile(dict_query)
    
                print(">>>matchedUsername", matchedUsername)
                if matchedUsername[0]:
                    errorMessage = {"message": "username already registered"}
                    return jsonify(errorMessage), 409
                
                return func(wrapper_data, *args, **kwargs)
            except Exception as e:
                errorMessage = {"message": str(e), "script": f"error at wrapper, {func.__name__}!"}
                return jsonify(errorMessage), 500
        wrapper.__name__ = func.__name__
        return wrapper
    except Exception as e:
        errorMessage = {"message": str(e), "script": f"error at, {restrict_post_profile.__name__}!"}
        return jsonify(errorMessage), 500

