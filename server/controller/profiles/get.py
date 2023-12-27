from flask import jsonify, request
from model.profiles.dao.read import dao_read_many, dao_read_one, dao_pull_items
from model.tweets.dao.read import dao_pull_items as dao_pull_items_tweets
from bson import ObjectId

def get_profiles(restrict_query):
    try:
        if request.method == "GET":
            dict_query = request.args.to_dict()
            print(">>> query to read many in profiles:", dict_query)
            dict_query = {**dict_query, **restrict_query}
            result_read_many = dao_read_many(dict_query)
        response = result_read_many or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e), "script": f"error at, {get_profiles.__name__}!"}
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

def get_params_profile(profile_id, restrict_query={}):
    try:
        if request.method == "GET":
            dict_query = {"_id": profile_id, **restrict_query}
            print(">>> query to read params in profiles:", dict_query)
            result_read_one = dao_read_one(dict_query)
        response = result_read_one or {}
        return jsonify(response)
    except Exception as e:
        message = {"message": str(e), "script": f"error at, {get_params_profile.__name__}!"}
        return jsonify(message)

def pull_item_profile(profile_id, restrict_query, field):
    try:
        print(">>> pull item profile", profile_id)
        if request.method == "GET":
            dict_query = {"_id": profile_id, **restrict_query}
            result_read_one = dao_read_one(dict_query)
            print(">>> result dao read", result_read_one)
            parent_profile = result_read_one[0]
            if not parent_profile:
                return jsonify({"pulledItems": []})
            print(">>> parent profile", parent_profile)
            fields = parent_profile.get(field)

            list_of_fields = []
            if fields:
                #pull item from profile dao
                list_of_fields = dao_pull_items(fields)
                print(">>> type pulled_items", type(list_of_fields))
                list_of_fields = list(list_of_fields)
                print(">>> list_of_fields", type(list_of_fields),list_of_fields)
            pulled_items = list_of_fields if list_of_fields else []
            return jsonify({"pulledItems": pulled_items})
    except Exception as e:
        message = {"message": str(e), "script": f"error at, {pull_item_profile.__name__}!"}
        return jsonify(message)

def pull_item_profile_tweets(profile_id, restrict_query, field):
    try:
        print(">>> pull item profile", profile_id)
        if request.method == "GET":
            dict_query = {"_id": profile_id, **restrict_query}
            result_read_one = dao_read_one(dict_query)
            print(">>> result dao read", result_read_one)
            parent_profile = result_read_one[0]
            if not parent_profile:
                return jsonify({"pulledItems": []})
            print(">>> parent profile", parent_profile)
            fields = parent_profile.get(field)
            list_of_fields = []
            if fields:
                #pull item from profile dao
                list_of_fields = dao_pull_items_tweets(fields)
                print(">>> type pulled_items", type(list_of_fields))
                list_of_fields = list(list_of_fields)
                print(">>> list_of_fields", type(list_of_fields),list_of_fields)
            pulled_items = list_of_fields if list_of_fields else []
            return jsonify({"pulledItems": pulled_items})
    except Exception as e:
        message = {"message": str(e), "script": f"error at, {pull_item_profile_tweets.__name__}!"}
        return jsonify(message)