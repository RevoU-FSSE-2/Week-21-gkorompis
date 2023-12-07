from flask import request
import bcrypt

def hash_password(func):
    def wrapper(*args, **kwargs):
        print(">>> wrapper hashpassword", request.json)
        request_body = request.json
        naked_password = request_body.get('password')
        hashed_password = bcrypt.hashpw(naked_password.encode('utf-8'), bcrypt.gensalt())
        decoded_utf = hashed_password.decode('utf-8')
        wrapper_data = {"hashed_password": decoded_utf}
        print(">>> manipulated", wrapper_data)
        return func(wrapper_data, *args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper