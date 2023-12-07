from flask import jsonify, request
from model.tweets.dao.read import dao_read_many, dao_read_one


def get_tweets():
    try:
        if request.method == "GET":
            dict_query = request.args.to_dict()
            print(">>> query to read many in tweets:", dict_query)
            result_read_many = dao_read_many(dict_query)
        response = result_read_many or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)

def get_one_tweets(tweet_id):
    try:
        if request.method == "GET":
            dict_query = {"_id": tweet_id}
            print(">>> query to read one in tweets:", dict_query)
            result_read_one = dao_read_one(dict_query)
        response = result_read_one or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)

def get_params_tweet(tweet_id):
    try:
        if request.method == "GET":
            dict_query = {"_id": tweet_id}
            print(">>> query to read params in tweets:", dict_query)
            result_read_one = dao_read_one(dict_query)
        response = result_read_one or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)