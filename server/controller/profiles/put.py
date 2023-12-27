from flask import jsonify, request
from model.profiles.dao.update import dao_update_one, dao_append_following
from model.profiles.dao.read import dao_read_one

def put_params_profile(profile_id):
    try:
        if request.method == "PUT" or request.method == "PATCH":
            dict_query = {"_id": profile_id}
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
        print(">>> response at put_params_profile", type(response), response)
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)

def append_item_profile(parent_profile_id, restrict_query, field):
    try:
        print(">>> append item profile", parent_profile_id)
        if request.method == "PUT":
            request_body = request.json
            profile_id = request_body.get("profileId")
            if profile_id == parent_profile_id:
                message = {"message": f"can't have {field} of self {parent_profile_id}"}
                return jsonify(message), 40
            
            fetched_parent = dao_read_one({"_id":parent_profile_id})
            print(">>> fetched_parent", parent_profile_id,fetched_parent)

            if not fetched_parent[0]:
                message = {"message": f"profile may not be registerd yet"}
                return jsonify(message), 406
            
            following = fetched_parent[0].get("following")
            print(">>>fetched following", following, profile_id in following)
            if profile_id in following:
                message = {"message": f"already following"}
                return jsonify(message), 409
            if field=="following":
                append_result_status = dao_append_following(parent_profile_id, restrict_query, profile_id)
            else:
                print(">>>not following controller")
                append_result_status = {}
            print(">>> append_result_status", append_result_status)
        result = append_result_status or {}
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
        print(">>> response at append_item_profile", type(response), response)
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e), "script": f"error at, {append_item_profile.__name__}!"}
        return jsonify(message)
