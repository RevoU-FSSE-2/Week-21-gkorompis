from flask import Blueprint, request, jsonify

from controller.profiles.get import get_profiles, get_params_profile, get_one_profiles, pull_item_profile, pull_item_profile_tweets
from controller.profiles.post import post_profile
from controller.profiles.put import put_params_profile
from controller.profiles.delete import delete_params_profile

from wrapper.protect_route import protect_route
from wrapper.permit_role import permit_role_custom
from wrapper.restrict_post import restrict_post_profile

profiles_blueprint = Blueprint("profiles", __name__)
@profiles_blueprint.route("/", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"] ,"username")
def get_route(wrapper_data):
    dict_query = request.args.to_dict()
    profile_id = dict_query.get('_id')
    restrict_query = wrapper_data.get('restrict_query')
    if profile_id:
        return get_one_profiles(profile_id) #one query
    else:
        return get_profiles(restrict_query)
    
@profiles_blueprint.route("/", methods=["POST"])
@protect_route
@restrict_post_profile
@permit_role_custom(["admin", "member"] ,"username")
def post_route(wrapper_data):
    try:
        restrict_query = wrapper_data.get("restrict_query")
        return post_profile(restrict_query)
    except Exception as e:
        errorMessage = {"message":str(e)}
        return jsonify(errorMessage), 500

profiles_params_blueprint = Blueprint("profiles_one", __name__)
@profiles_params_blueprint.route("/", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"], "username")
def get_params_route(id):
    try:
        return get_params_profile(id)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500
@profiles_params_blueprint.route("/", methods=["PUT", "PATCH"])
@protect_route
@permit_role_custom(["admin"])
def put_params_route(id):
    return put_params_profile(id)

@profiles_params_blueprint.route("/", methods=["DELETE"])
@protect_route
@permit_role_custom(["admin"])
def delete_params_route(id):
    return delete_params_profile(id)




profile_aggregator_params_blueprint = Blueprint("profile_aggregator", __name__)
@profile_aggregator_params_blueprint.route("/profile/pull-items/followers/<id>", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"], "username")
def pull_item_followers_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        restrict_query = wrapper_data.get("restrict_query")
        field = "followers"
        return pull_item_profile(id, restrict_query, field)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500

@profile_aggregator_params_blueprint.route("/profile/pull-items/following/<id>", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"], "username")
def pull_item_following_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        restrict_query = wrapper_data.get("restrict_query")
        field = "following"
        return pull_item_profile(id, restrict_query, field)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500

@profile_aggregator_params_blueprint.route("/profile/pull-items/tweets/<id>", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"], "username")
def pull_item_tweets_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        restrict_query = wrapper_data.get("restrict_query")
        field = "tweets"
        return pull_item_profile_tweets(id, restrict_query, field)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500
