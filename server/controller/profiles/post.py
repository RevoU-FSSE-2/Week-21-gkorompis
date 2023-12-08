from flask import jsonify, request
from model.profiles.dao.create import dao_insert_one

def post_profile(restrict_query):
    try:
        if request.method == "POST":
            data = request.json
            username = restrict_query.get("username") if restrict_query.get("username") else data.get('username')
            followers = data.get('followers') if data.get('followers') else []
            following = data.get('following') if data.get('following') else []
            tweets = data.get('tweets') if data.get('tweets') else []
            payload = {
                'username': username,
                'followers': followers,
                'following': following,
                'tweets': tweets
            }
            print(">>>payload", payload)
            result = dao_insert_one(payload)
            modified_result = str(result)
            return jsonify({"message": "profile is created", "data": payload, "result": modified_result})
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500