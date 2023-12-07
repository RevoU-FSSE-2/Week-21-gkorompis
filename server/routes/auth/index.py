from flask import Blueprint
from controller.auth.post import auth_login

# jobs_blueprint = Blueprint("jobs", __name__)
# @jobs_blueprint.route("/", methods=["GET"])
# def get_route():
#     dict_query = request.args.to_dict()
#     job_id = dict_query.get('_id')
#     if job_id:
#         return get_one_jobs(job_id)
#     else:
#         return get_jobs()

auth_blueprint = Blueprint("auth", __name__)

@auth_blueprint.route("/", methods=["POST"])
def post_route():
    return auth_login()