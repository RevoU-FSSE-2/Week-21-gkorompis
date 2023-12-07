from flask import jsonify, request
from model.users.dao.create import dao_insert_one

def post_user():
    if request.method == "POST":
        data = request.json
        payload = {
            'username': data.get('username'),
            'email': data.get('email'),
            'fullname': data.get('fullname'),
            'password': data.get('password'),
            'role': data.get('role')
        }
        print(">>>payload", payload)
        result = dao_insert_one(payload)
        modified_result = str(result)
        return jsonify({"message": "user is created", "data": payload, "result": modified_result})