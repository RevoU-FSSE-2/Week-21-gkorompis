from flask import Blueprint
from controller.jobs.get import get_jobs

jobs_blueprint = Blueprint("jobs", __name__)

@jobs_blueprint.route("/", methods=["GET"])
def get_route():
    return get_jobs()