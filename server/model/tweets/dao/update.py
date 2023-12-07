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

# def dao_read_one(dict_query):
#     dict_query = dict_query or {}
#     collection = collections["tweets"]
#     result = collection.find_one(dict_query)
#     result = list(result)
#     print(">>>response find", type(result))
#     return result