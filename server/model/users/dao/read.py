from db.db import collections

def dao_read_many(dict_query):
    dict_query = dict_query or {}
    collection = collections["users"]
    result = collection.find(dict_query)
    result = list(result)
    print(">>>response find many dao users", type(result))
    return result

def dao_read_one(dict_query):
    try:
        dict_query = dict_query or {}
        collection = collections["users"]
        result = collection.find_one(dict_query)
        result = [result]
        print(">>>response find one in dao users", type(result))
        return result
    except Exception as e:
        print(">>>error at dao_read_one:", e)