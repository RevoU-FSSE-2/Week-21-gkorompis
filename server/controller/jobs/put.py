from flask import jsonify, request
from model.jobs.dao.update import dao_update_one
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

# def get_jobs():
#     if request.method == "GET":
#         dict_query = request.args.to_dict()
#         print(">>> query to find:", dict_query)
#         result_read_many = dao_read_many(dict_query)
#     return jsonify(result_read_many)

# def put_one_jobs():
#     if request.method == "PUT":
#         dict_query = request.args.to_dict()
#         dict_update = request.json

#         job_id = dict_query.get('_id')
#         if job_id:
#             dict_query["_id"] = ObjectId(job_id)
        
#         print(">>> query to find:", dict_query)
#         print(">>> query to update:", dict_update)

#         result_read_many = dao_update_one(dict_query, dict_update)
#         result_read_many = str(result_read_many)
#     return jsonify(result_read_many)

def put_params_job(job_id):
    try:
        if request.method == "PUT" or request.method == "PATCH":
            dict_query = {"_id": job_id}
            dict_update = request.json
            
            print(">>> query to find:", dict_query)
            print(">>> query to update:", dict_update)

            result_update_one = dao_update_one(dict_query, dict_update)
        result = result_update_one or {}
        if result and result.acknowledged:
            response = {
                "n_modified": result.modified_count,
                "acknowledged": result.acknowledged
            }
        else:
            response = {
                "n_modified": 0,
                "acknowledged": "none"
            }
        print(">>> response at put_params_job", type(response), response)
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)