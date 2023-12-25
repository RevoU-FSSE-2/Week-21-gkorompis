from flask import Blueprint, request, jsonify

from controller.jobs.get import get_jobs, get_one_jobs, get_params_job
from controller.jobs.post import post_job
from controller.jobs.put import put_params_job
from controller.jobs.delete import delete_params_job

from wrapper.protect_route import protect_route
from wrapper.permit_role import permit_role_custom
from wrapper.allow_modify_fields import allow_modify_fields

jobs_blueprint = Blueprint("jobs", __name__)
@jobs_blueprint.route("/", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"], "createdBy")
def get_route(wrapper_data):
    try:
        dict_query = request.args.to_dict()
        job_id = dict_query.get('_id')
        restrict_query = wrapper_data.get("restrict_query")
        if job_id:
            return get_one_jobs(job_id)
        else:
            return get_jobs(restrict_query)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500
    
@jobs_blueprint.route("/", methods=["POST"])
@protect_route
@permit_role_custom(["admin", "member"], "createdBy")
def post_route(wrapper_data):
    try:
        body = request.json
        if not body:
            errorMessage = {"message": "bad request. Body is expected"}
            return jsonify(errorMessage), 400
        restrict_query = wrapper_data.get("restrict_query")
        return post_job(restrict_query)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500

jobs_params_blueprint = Blueprint("jobs_one", __name__)
@jobs_params_blueprint.route("/", methods=["GET"])
@protect_route
@permit_role_custom(["admin", "member"], "createdBy")
def get_params_route(wrapper_data):
    try:
        id = wrapper_data.get("id")
        restrict_query = wrapper_data.get("restrict_query")
        return get_params_job(id, restrict_query)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500

@jobs_params_blueprint.route("/", methods=["PUT"])
@protect_route
@permit_role_custom(["admin","member"])
@allow_modify_fields(["job", "jobProgress"])
def put_params_route(wrapper_data):
    try:
        print(">>>put_params_route", wrapper_data)
        id = wrapper_data.get('id')
        restrict_query = wrapper_data.get('restrict_query')
        return put_params_job(id, restrict_query)
    except Exception as e:
        errorMessage = {"message": str(e), "script": f"error at, {put_params_job.__name__}!"}
        return jsonify(errorMessage), 500

@jobs_params_blueprint.route("/", methods=["DELETE"])
@protect_route
@permit_role_custom(["admin"])
def delete_params_route(wrapper_data):
    try:
        id = wrapper_data.get('id')
        restrict_query = wrapper_data.get('restrict_query')
        return delete_params_job(id, restrict_query)
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500