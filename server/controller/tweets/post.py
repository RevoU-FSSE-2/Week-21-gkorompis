from flask import jsonify, request
from model.tweets.dao.create import dao_insert_one

def post_tweet(restrict_query):
    try:
        if request.method == "POST":
            data = request.json
            created_by = restrict_query.get("createdBy")
            created_by = created_by if created_by else data.get('createdBy')
            
            permission = ["admin", created_by]
            tweet_type = "comment" if data.get("tweetType") == "comment" else "parent"

            payload = {
                'created_by': created_by,
                'tweet': data.get('tweet'),
                'comments': data.get('comments'),
                'permission': permission,
                'tweet_type': tweet_type
            }
            print(">>>payload", payload)
            result = dao_insert_one(payload)
            modified_result = str(result)
            return jsonify({"message": "Tweet is created", "data": payload, "result": modified_result})
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500