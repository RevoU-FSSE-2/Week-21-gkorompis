from flask import jsonify, request
from model.jobs.dao.create import dao_insert_one

def post_job():
    if request.method == "POST":
        data = request.json
        payload = {
            'created_by': data.get('createdBy'),
            'job': data.get('job'),
            'job_progress': data.get('jobProgress'),
            'permission': data.get('permission')
        }
        print(">>>payload", payload)
        result = dao_insert_one(payload)
        modified_result = str(result)
        return jsonify({"message": "Job is created", "data": payload, "result": modified_result})