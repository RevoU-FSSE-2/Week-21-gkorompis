from flask import jsonify, request
from model.profiles.dao.read import dao_read_many, dao_read_one
from bson import ObjectId

def get_profiles():
    try:
        if request.method == "GET":
            dict_query = request.args.to_dict()
            print(">>> query to read many in profiles:", dict_query)
            result_read_many = dao_read_many(dict_query)
        response = result_read_many or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)

def get_one_profiles(profile_id):
    try:
        if request.method == "GET":
            dict_query = {"_id": profile_id}
            print(">>> query to read one in profiles:", dict_query)
            result_read_one = dao_read_one(dict_query)
        response = result_read_one or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)

def get_params_profile(profile_id):
    try:
        if request.method == "GET":
            dict_query = {"_id": profile_id}
            print(">>> query to read params in profiles:", dict_query)
            result_read_one = dao_read_one(dict_query)
        response = result_read_one or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)