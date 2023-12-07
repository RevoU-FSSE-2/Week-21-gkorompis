from flask import Blueprint
from controller.auth.post import auth_login
from wrapper.authenticate_login import authenticate_login

auth_blueprint = Blueprint("auth", __name__)

@auth_blueprint.route("/", methods=["POST"])
@authenticate_login
def post_route(wrapper_data):
    return auth_login(wrapper_data)