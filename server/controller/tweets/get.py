from flask import jsonify, request
from model.tweets.dao.read import dao_read_many, dao_read_one, dao_pull_items
from bson import ObjectId


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
    


    
def pull_item_tweet(tweet_id):
    try:
        print(">>> pull item tweet", tweet_id)
        if request.method == "GET":
            dict_query = {"_id": tweet_id}
            result_read_one = dao_read_one(dict_query)
            print(">>> result dao read", result_read_one)
            parent_tweet = result_read_one[0]
            print(">>> parent tweet", parent_tweet)
            comments = parent_tweet.get("comments")

            if comments:
                list_of_comments = dao_pull_items(comments)
                print(">>> type pulled_items", type(list_of_comments))
                list_of_comments = list(list_of_comments)
                print(">>> list_of_comments", type(list_of_comments),list_of_comments)
            pulled_items = list_of_comments if list_of_comments else []
            return jsonify({"pulledItems": pulled_items})
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)
    
