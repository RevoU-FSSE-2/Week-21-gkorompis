from flask import Blueprint, request, jsonify

from controller.tweets.get import get_tweets, get_params_tweet, get_one_tweets, pull_item_tweet
from controller.tweets.post import post_tweet
from controller.tweets.put import put_params_tweet, append_item_tweet
from controller.tweets.delete import delete_params_tweet

from wrapper.protect_route import protect_route
from wrapper.permit_role import permit_role_custom

tweets_blueprint = Blueprint("tweets", __name__)
@tweets_blueprint.route("/", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"], "createdBy")
def get_route(wrapper_data):
    try:
        dict_query = request.args.to_dict()
        tweet_id = dict_query.get('_id')
        restrict_query = wrapper_data.get("restrict_query")
        print(">>> restrict query at get tweet route", restrict_query)
        if tweet_id:
            return get_one_tweets(tweet_id) #one query
        else:
            return get_tweets(restrict_query)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500  
    
@tweets_blueprint.route("/", methods=["POST"])
@protect_route
@permit_role_custom(["admin", "member"], "createdBy")
def post_route(wrapper_data):
    try:
        restrict_query = wrapper_data.get("restrict_query")
        print(">>>restrict query at post route", restrict_query)
        return post_tweet(restrict_query)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500

tweets_params_blueprint = Blueprint("tweets_one", __name__)
@tweets_params_blueprint.route("/", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"], "createdBy")
def get_params_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        restrict_query = wrapper_data.get("restrict_query")
        return get_params_tweet(id, restrict_query)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500
    
@tweets_params_blueprint.route("/", methods=["PUT"])
@protect_route
@permit_role_custom(["admin"])
def put_params_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        return put_params_tweet(id)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500

@tweets_params_blueprint.route("/", methods=["DELETE"])
@protect_route
@permit_role_custom(["admin"])
def delete_params_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        return delete_params_tweet(id)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500

tweets_aggregator_params_blueprint = Blueprint("tweets_aggregator", __name__)
@tweets_aggregator_params_blueprint.route("/tweets/pull-items/<id>", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"], "createdBy")
def pull_item_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        restrict_query = wrapper_data.get("restrict_query")
        return pull_item_tweet(id, restrict_query)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500
    
@tweets_aggregator_params_blueprint.route("/tweets/append-item/<id>", methods=["PUT"])
@protect_route
@permit_role_custom(["admin", "member"], "createdBy")
def apppend_item_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        restrict_query = wrapper_data.get("restrict_query")
        return append_item_tweet(id, restrict_query)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500