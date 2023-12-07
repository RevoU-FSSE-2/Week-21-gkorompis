from flask import Blueprint, request

from controller.users.get import get_users, get_params_user, get_one_users
from controller.users.post import post_user
from controller.users.put import put_params_user
from controller.users.delete import delete_params_user

from wrapper.protect_route import protect_route
from wrapper.hash_password import hash_password

users_blueprint = Blueprint("users", __name__)
@users_blueprint.route("/", methods=["GET"])
@protect_route
def get_route():
    dict_query = request.args.to_dict()
    user_id = dict_query.get('_id')
    if user_id:
        return get_one_users(user_id) #one query
    else:
        return get_users()
    
@users_blueprint.route("/", methods=["POST"])
@protect_route
@hash_password
def post_route(wrapper_data):
    return post_user(wrapper_data)


users_params_blueprint = Blueprint("users_one", __name__)
@users_params_blueprint.route("/", methods=["GET"])
@protect_route
def get_params_route(id):
    return get_params_user(id)

@users_params_blueprint.route("/", methods=["PUT", "PATCH"])
@protect_route
def put_params_route(id):
    return put_params_user(id)

@users_params_blueprint.route("/", methods=["DELETE"])
@protect_route
def delete_params_route(id):
    return delete_params_user(id)
