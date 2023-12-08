from db.db import collections
# from model.tweets.schema.job import Job

def dao_update_many(dict_query, dict_update):
    try:
        dict_query = dict_query or {}
        dict_update = dict_update or {}

        aggregator = {
            '$set': dict_update
        }

        collection = collections["tweets"]
        result = collection.update_many(dict_query, aggregator)
        print(">>>response update many", type(result))
        return result
    except Exception as e:
        return str(e)

def dao_update_one(dict_query, dict_update):
    try:
        dict_query = dict_query or {}
        dict_update = dict_update or {}
        
        aggregator = {
            '$set': dict_update
        }

        collection = collections["tweets"]
        result = collection.update_one(dict_query, aggregator)
        print(">>>response update one", type(result))
        return result
    except Exception as e:
        return str(e)

def dao_append_items(parent_id, restrict_query, new_item):
    try:
        collection = collections["tweets"]
        result_append = collection.update_one(
            {"_id": parent_id, **restrict_query},
            {"$push": {"comments": new_item}}
        )
        print(">>> result append items", type(result_append), result_append)
        return result_append
    except Exception as e:
        message = {"message": str(e)}
        print(">>>error at dao_pull_items:", message)