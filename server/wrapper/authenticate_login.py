
from flask import request, jsonify
from bcrypt import checkpw
from model.users.dao.read import dao_read_one


def authenticate_login(func):
    try:
        def wrapper(*args, **kwargs):
            try: 
                #fetch username
                request_body = request.json
                username = request_body.get("username")
                dict_query = {"username": username}
                fetched_document = dao_read_one(dict_query)
                user_doc = fetched_document[0]
                if not user_doc:
                    errorMessage = {"message": "invalid username or password"}
                    return jsonify(errorMessage), 403
                
                # match password from body
                login_password = request_body.get('password')
                db_password = user_doc.get('password')
                isMatched = checkpw(login_password.encode('utf-8'), db_password.encode('utf-8'))
                print(">>> is password matched", isMatched)
                if not isMatched:
                    errorMessage = {"message": "invalid username or password"}
                    return jsonify(errorMessage), 403
                wrapper_data = {"user_doc": user_doc}
                return func(wrapper_data, *args, **kwargs)
            except Exception as e:
                errorMessage = {"message": str(e)}
                return jsonify(errorMessage), 500
        wrapper.__name__ = func.__name__
        return wrapper
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500