from db.db import collections

def dao_update_many(dict_query, dict_update):
    try:
        dict_query = dict_query or {}
        dict_update = dict_update or {}

        aggregator = {
            '$set': dict_update
        }

        collection = collections["profiles"]
        result = collection.update_many(dict_query, aggregator)
        print(">>>response update", type(result))
        return result
    except Exception as e:
        message = {"message": str(e), "script": f"error at, {dao_update_many.__name__}!"}
        print(">>>error:", message)
        return str(e)

def dao_update_one(dict_query, dict_update):
    try:
        dict_query = dict_query or {}
        dict_update = dict_update or {}
        
        aggregator = {
            '$set': dict_update
        }

        collection = collections["profiles"]
        result = collection.update_one(dict_query, aggregator)
        print(">>>response update", type(result))
        return result
    except Exception as e:
        message = {"message": str(e), "script": f"error at, {dao_update_one.__name__}!"}
        print(">>>error:", message)
        return str(e)
    
# def dao_update_one(dict_query, dict_update):
#     try:
#         dict_query = dict_query or {}
#         dict_update = dict_update or {}
        
#         aggregator = {
#             '$set': dict_update
#         }

#         collection = collections["profiles"]
#         result = collection.update_one(dict_query, aggregator)
#         print(">>>response update one", type(result))
#         return result
#     except Exception as e:
#         message = {"message": str(e), "script": f"error at, {dao_update_one.__name__}!"}
#         print(">>>error:", message)
#         return str(e)

def dao_append_items(parent_id, restrict_query, new_item, field):
    try:
        collection = collections["profiles"]
        result_append = collection.update_one(
            {"_id": parent_id, **restrict_query},
            {"$push": {field: new_item}}
        )
        print(">>> result append items", type(result_append), result_append)
        return result_append
    except Exception as e:
        message = {"message": str(e), "script": f"error at, {dao_append_items.__name__}!"}
        print(">>>error", message)

def dao_append_following(parent_id, restrict_query, new_item):
    try:
        collection = collections["profiles"]
        result_append_following = collection.update_one(
            {"_id": parent_id, **restrict_query},
            {"$push": {"following": new_item}}
        )
        print(">>> result append items following of", parent_id, type(result_append_following), result_append_following)
        update_result = result_append_following.raw_result.get("nModified")
        print(">>> update result nModified:", update_result)
        if not update_result:
            print("not update result", update_result)
            return result_append_following
        result_append_follower = collection.update_one(
            {"_id": new_item},
            {"$push": {"followers": parent_id}}
        )
        print(">>> result append items follower of", new_item, type(result_append_follower), result_append_follower)
        return result_append_following
    except Exception as e:
        message = {"message": str(e), "script": f"error at, {dao_append_following.__name__}!"}
        print(">>>error", message)

def dao_append_followers(parent_id, restrict_query, new_item):
    try:
        collection = collections["profiles"]
        result_append_followers = collection.update_one(
            {"_id": parent_id, **restrict_query},
            {"$push": {"followers": new_item}}
        )
        print(">>> result append items following of", parent_id, type(result_append_followers), result_append_following)

        result_append_following = collection.update_one(
            {"_id": new_item, **restrict_query},
            {"$push": {"following": parent_id}}
        )
        print(">>> result append items follower of", new_item, type(result_append_following), result_append_following)
        return result_append_following
    except Exception as e:
        message = {"message": str(e), "script": f"error at, {dao_append_followers.__name__}!"}
        print(">>>error", message)