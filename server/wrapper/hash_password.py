from flask import request, jsonify
import bcrypt

def hash_password(func):
    try:
        print(">>> hash_password")
        def wrapper(*args, **kwargs):
            try:
                print(">>> wrapper hashpassword", request.json)
                request_body = request.json
                naked_password = request_body.get('password')
                hashed_password = bcrypt.hashpw(naked_password.encode('utf-8'), bcrypt.gensalt())
                decoded_utf = hashed_password.decode('utf-8')
                wrapper_data = {"hashed_password": decoded_utf}
                print(">>> manipulated", wrapper_data)
                return func(wrapper_data, *args, **kwargs)
            except Exception as e:
                errorMessage = {"message": str(e), "script": f"error at wrapper, {func.__name__}!"}
                return jsonify(errorMessage), 500
        wrapper.__name__ = func.__name__
        return wrapper
    except Exception as e:
        errorMessage = {"message": str(e), "script": f"error at hash_password, {func.__name__}!"}
        return jsonify(errorMessage), 500