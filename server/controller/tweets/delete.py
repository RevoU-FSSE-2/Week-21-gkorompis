from flask import jsonify, request
from model.tweets.dao.delete import dao_delete_one

def delete_params_tweet(tweet_id, restrict_query):
    try:
        if request.method == "DELETE":
            dict_query = {"_id": tweet_id, **restrict_query}
            print(">>> query to read params in tweets:", dict_query)
            result_delete_one = dao_delete_one(dict_query)
            print(">>> dao_delete_one:", result_delete_one)
        result = result_delete_one or {}
        if result and result.acknowledged:
            response = {
                "acknowledged": result.acknowledged
            }
        else:
            response = {
                "acknowledged": "none"
            }
        print(">>> response at delete_params_tweet", type(response), response)
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e), "script": f"error at, {delete_params_tweet.__name__}!"}
        return jsonify(message)