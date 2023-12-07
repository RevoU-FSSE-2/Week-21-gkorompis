from flask import jsonify, request
from model.users.dao.read import dao_read_many, dao_read_one
from bson import ObjectId

def get_users():
    try:
        print(">>>controller get_users", request.method)
        if request.method == "GET":
            dict_query = request.args.to_dict()
            print(">>> query to read many in users:", dict_query)
            result_read_many = dao_read_many(dict_query)
        response = result_read_many or {}
        print(">>result controller get_users", response)
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)

def get_one_users(user_id):
    try:
        if request.method == "GET":
            dict_query = {"_id": user_id}
            print(">>> query to read one in users:", dict_query)
            result_read_one = dao_read_one(dict_query)
        response = result_read_one or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)

def get_params_user(user_id):
    try:
        if request.method == "GET":
            dict_query = {"_id": user_id}
            print(">>> query to read params in users:", dict_query)
            result_read_one = dao_read_one(dict_query)
        response = result_read_one or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e)}
        return jsonify(message)