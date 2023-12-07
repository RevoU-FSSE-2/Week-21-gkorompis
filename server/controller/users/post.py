from flask import jsonify, request
from model.users.dao.create import dao_insert_one

def post_user(wrapper_data):
    if request.method == "POST":
        hashed_password = wrapper_data.get("hashed_password")
        password = hashed_password if hashed_password else data.get('password')
        data = request.json
        payload = {
            'username': data.get('username'),
            'email': data.get('email'),
            'fullname': data.get('fullname'),
            'password': password,
            'role': data.get('role')
        }
        print(">>>payload", payload)
        result = dao_insert_one(payload)
        modified_result = str(result)
        return jsonify({"message": "user is created", "data": payload, "result": modified_result})