from flask import Blueprint, request

from controller.tweets.get import get_tweets, get_params_tweet, get_one_tweets
from controller.tweets.post import post_tweet
from controller.tweets.put import put_params_tweet
from controller.tweets.delete import delete_params_tweet

from wrapper.protect_route import protect_route

tweets_blueprint = Blueprint("tweets", __name__)
@tweets_blueprint.route("/", methods=["GET"])
@protect_route
def get_route():
    dict_query = request.args.to_dict()
    tweet_id = dict_query.get('_id')
    if tweet_id:
        return get_one_tweets(tweet_id) #one query
    else:
        return get_tweets()
    
@tweets_blueprint.route("/", methods=["POST"])
@protect_route
def post_route():
    return post_tweet()


tweets_params_blueprint = Blueprint("tweets_one", __name__)
@tweets_params_blueprint.route("/", methods=["GET"])
@protect_route
def get_params_route(id):
    return get_params_tweet(id)

@tweets_params_blueprint.route("/", methods=["PUT", "PATCH"])
@protect_route
def put_params_route(id):
    return put_params_tweet(id)

@tweets_params_blueprint.route("/", methods=["DELETE"])
@protect_route
def delete_params_route(id):
    return delete_params_tweet(id)