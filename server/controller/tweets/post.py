from flask import jsonify, request
from model.tweets.dao.create import dao_insert_one

def post_tweet():
    if request.method == "POST":
        data = request.json
        payload = {
            'created_by': data.get('createdBy'),
            'tweet': data.get('tweet'),
            'comments': data.get('comments'),
            'permission': data.get('permission'),
            'tweet_type': data.get('tweetType')
        }
        print(">>>payload", payload)
        result = dao_insert_one(payload)
        modified_result = str(result)
        return jsonify({"message": "Tweet is created", "data": payload, "result": modified_result})