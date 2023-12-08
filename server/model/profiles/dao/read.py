from db.db import collections

def dao_read_many(dict_query):
    dict_query = dict_query or {}
    collection = collections["profiles"]
    result = collection.find(dict_query)
    result = list(result)
    print(">>>response find many dao profiles", type(result))
    return result

def dao_read_one(dict_query):
    try:
        dict_query = dict_query or {}
        collection = collections["profiles"]
        result = collection.find_one(dict_query)
        result = [result]
        print(">>>response find one in dao profiles", type(result))
        return result
    except Exception as e:
        print(">>>error at dao_read_one:", e)

def dao_pull_items(items):
    try:
        # object_ids = [ObjectId(item) for item in items]
        object_ids = items
        pipeline = [
            {"$match": {"_id": {"$in": object_ids}}}
        ]
        collection = collections["profiles"]
        pulled_items = collection.aggregate(pipeline)
        return pulled_items
    except Exception as e:
        message = {"message": str(e)}
        print(">>>error at dao_pull_items:", message)