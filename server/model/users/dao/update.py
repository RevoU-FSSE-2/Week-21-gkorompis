from db.db import collections

def dao_update_many(dict_query, dict_update):
    try:
        dict_query = dict_query or {}
        dict_update = dict_update or {}

        aggregator = {
            '$set': dict_update
        }

        collection = collections["users"]
        result = collection.update_many(dict_query, aggregator)
        print(">>>response update", type(result))
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

        collection = collections["users"]
        result = collection.update_one(dict_query, aggregator)
        print(">>>response update", type(result))
        return result
    except Exception as e:
        return str(e)