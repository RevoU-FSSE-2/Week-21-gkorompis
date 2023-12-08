from flask import jsonify, request
from model.tweets.dao.update import dao_update_one, dao_append_items

def put_params_tweet(tweet_id, restrict_query):
    try:
        if request.method == "PUT" or request.method == "PATCH":
            dict_query = {"_id": tweet_id, **restrict_query}
            dict_update = request.json
            
            print(">>> query to find:", dict_query)
            print(">>> query to update:", dict_update)

            result_update_one = dao_update_one(dict_query, dict_update)
        result = result_update_one or {}
        if result and result.acknowledged:
            response = {
                "n_modified": result.modified_count,
                "acknowledged": result.acknowledged
            }
        else:
            response = {
                "n_modified": 0,
                "acknowledged": "none"
            }
        print(">>> response at put_params_tweet", type(response), response)
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)
    
def append_item_tweet(tweet_id, restrict_query):
    try:
        print(">>> append item tweet", tweet_id)
        if request.method == "PUT":
            request_body = request.json
            comment_id = request_body.get("commentId")
            append_result_status = dao_append_items(tweet_id, restrict_query, comment_id)
            print(">>> append_result_status", append_result_status)
        result = append_result_status or {}
        if result and result.acknowledged:
            response = {
                "n_modified": result.modified_count,
                "acknowledged": result.acknowledged
            }
        else:
            response = {
                "n_modified": 0,
                "acknowledged": "none"
            }
        print(">>> response at append_item_tweet", type(response), response)
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)