from flask import jsonify, request
from model.jobs.dao.create import dao_insert_one

def post_job(restrict_query):
    try:
        if request.method == "POST":
            data = request.json
            created_by = restrict_query.get("createdBy")
            created_by = created_by if created_by else data.get('createdBy')
            print(">>>created_by_restrict", created_by)
            payload = {
                'created_by': created_by,
                'job': data.get('job'),
                'job_progress': data.get('jobProgress'),
                'permission': data.get('permission')
            }
            print(">>>payload", payload)
            result = dao_insert_one(payload)
            modified_result = str(result)
            return jsonify({"message": "Job is created", "data": payload, "result": modified_result})
    except Exception as e:
        errorMessage = {"message": str(e)}
        return jsonify(errorMessage), 500