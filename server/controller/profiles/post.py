from flask import jsonify, request
from model.profiles.dao.create import dao_insert_one

def post_profile():
    if request.method == "POST":
        data = request.json
        payload = {
            'username': data.get('username'),
            'followers': data.get('followers'),
            'following': data.get('following'),
            'tweets': data.get('tweets')
        }
        print(">>>payload", payload)
        result = dao_insert_one(payload)
        modified_result = str(result)
        return jsonify({"message": "profile is created", "data": payload, "result": modified_result})