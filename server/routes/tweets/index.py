from flask import Blueprint, request

from controller.tweets.get import get_tweets, get_params_tweet, get_one_tweets, pull_item_tweet
from controller.tweets.post import post_tweet
from controller.tweets.put import put_params_tweet, append_item_tweet
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


tweets_aggregator_params_blueprint = Blueprint("tweets_aggregator", __name__)
@tweets_aggregator_params_blueprint.route("/tweets/pull-items/<id>", methods=["GET"])
@protect_route
def pull_item_route(id):
    return pull_item_tweet(id)

@tweets_aggregator_params_blueprint.route("/tweets/append-item/<id>", methods=["PUT"])
@protect_route
def apppend_item_route(id):
    return append_item_tweet(id)