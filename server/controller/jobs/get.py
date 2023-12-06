from flask import jsonify, request
from model.jobs.dao.read import dao_read_many, dao_read_one
from bson import ObjectId

# jobs_collection = [
#     {
#         '_id': '656030f476bd5546952b0777',
#         'createdBy': 'admins',
#         'job': 'week 21',
#         'jobProgress': 'working',
#         'permission': ['admin'],
#         'createdAt': "2023-11-24T05:13:24.994Z"
#     },
#     {
#         '_id': '656030f476bd5546952b0777',
#         'createdBy': 'members',
#         'job': 'week 21',
#         'jobProgress': 'working',
#         'permission': ['admin', 'member'],
#         'createdAt': "2023-11-24T05:13:24.994Z"
#     }
# ]

def get_jobs():
    try:
        if request.method == "GET":
            dict_query = request.args.to_dict()
            print(">>> query to read many in jobs:", dict_query)
            result_read_many = dao_read_many(dict_query)
        response = result_read_many or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)

def get_one_jobs(job_id):
    try:
        if request.method == "GET":
            dict_query = {"_id": job_id}
            print(">>> query to read one in jobs:", dict_query)
            result_read_one = dao_read_one(dict_query)
        response = result_read_one or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)

def get_params_job(job_id):
    try:
        if request.method == "GET":
            dict_query = {"_id": job_id}
            print(">>> query to read params in jobs:", dict_query)
            result_read_one = dao_read_one(dict_query)
        response = result_read_one or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)