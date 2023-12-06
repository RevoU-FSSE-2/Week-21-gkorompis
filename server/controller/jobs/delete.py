from flask import jsonify, request
from model.jobs.dao.delete import dao_delete_one

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

def delete_params_job(job_id):
    try:
        if request.method == "DELETE":
            dict_query = {"_id": job_id}
            print(">>> query to read params in jobs:", dict_query)
            result_delete_one = dao_delete_one(dict_query)
            print(">>> dao_delete_one:", result_delete_one)
        result = result_delete_one or {}
        if result and result.acknowledged:
            response = {
                "acknowledged": result.acknowledged
            }
        else:
            response = {
                "acknowledged": "none"
            }
        print(">>> response at delete_params_job", type(response), response)
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)