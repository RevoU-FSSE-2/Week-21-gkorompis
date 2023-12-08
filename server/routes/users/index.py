from flask import Blueprint, request, jsonify

from controller.users.get import get_users, get_params_user, get_one_users
from controller.users.post import post_user
from controller.users.put import put_params_user
from controller.users.delete import delete_params_user

from wrapper.protect_route import protect_route
from wrapper.hash_password import hash_password
from wrapper.permit_role import permit_role_custom

users_blueprint = Blueprint("users", __name__)
@users_blueprint.route("/", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"], "username")
def get_route(wrapper_data):
    try:
        dict_query = request.args.to_dict()
        user_id = dict_query.get('_id')
        restrict_query = wrapper_data.get("restrict_query")
        if user_id:
            return get_one_users(user_id) #one query
        else:
            return get_users(restrict_query)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage)
    
@users_blueprint.route("/", methods=["POST"])
@hash_password
def post_route(wrapper_data):
    return post_user(wrapper_data)


users_params_blueprint = Blueprint("users_one", __name__)
@users_params_blueprint.route("/", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"], "username")
def get_params_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        return get_params_user(id)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage)
    

@users_params_blueprint.route("/", methods=["PUT", "PATCH"])
@protect_route
@permit_role_custom(["admin"])
def put_params_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        return put_params_user(id)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage)
    
@users_params_blueprint.route("/", methods=["DELETE"])
@protect_route
@permit_role_custom(["admin"])
def delete_params_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        return delete_params_user(id)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage)
