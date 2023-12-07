from flask import Blueprint, request

from controller.jobs.get import get_jobs, get_one_jobs, get_params_job
from controller.jobs.post import post_job
from controller.jobs.put import put_params_job
from controller.jobs.delete import delete_params_job

from wrapper.protect_route import protect_route

jobs_blueprint = Blueprint("jobs", __name__)
@jobs_blueprint.route("/", methods=["GET"])
@protect_route
def get_route():
    dict_query = request.args.to_dict()
    job_id = dict_query.get('_id')
    if job_id:
        return get_one_jobs(job_id)
    else:
        return get_jobs()
    
@jobs_blueprint.route("/", methods=["POST"])
@protect_route
def post_route():
    return post_job()

jobs_params_blueprint = Blueprint("jobs_one", __name__)
@jobs_params_blueprint.route("/", methods=["GET"])
@protect_route
def get_params_route(id):
    return get_params_job(id)

@jobs_params_blueprint.route("/", methods=["PUT"])
@protect_route
def put_params_route(id):
    return put_params_job(id)

@jobs_params_blueprint.route("/", methods=["DELETE"])
@protect_route
def delete_params_route(id):
    return delete_params_job(id)