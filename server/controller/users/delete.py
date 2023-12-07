from flask import jsonify, request
from model.users.dao.delete import dao_delete_one

def delete_params_user(user_id):
    try:
        if request.method == "DELETE":
            dict_query = {"_id": user_id}
            print(">>> query to read params in users:", dict_query)
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
        print(">>> response at delete_params_user", type(response), response)
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)