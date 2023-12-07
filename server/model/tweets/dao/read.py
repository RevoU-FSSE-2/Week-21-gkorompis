from db.db import collections
from bson import ObjectId
from flask import jsonify
# from model.tweets.schema.job import Job

def dao_read_many(dict_query):
    # job_doc = Job(**doc)
    # new_job_doc = job_doc.to_dict()

    dict_query = dict_query or {}
    collection = collections["tweets"]
    result = collection.find(dict_query)
    result = list(result)
    print(">>>response find many dao tweets", type(result))
    return result

def dao_read_one(dict_query):
    try:
        dict_query = dict_query or {}
        collection = collections["tweets"]
        result = collection.find_one(dict_query)
        result = [result]
        print(">>>response find one in dao tweets", type(result))
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
        collection = collections["tweets"]
        pulled_items = collection.aggregate(pipeline)
        return pulled_items
    except Exception as e:
        message = {"message": str(e)}
        print(">>>error at dao_pull_items:", message)
