from db.db import collections

def dao_delete_one(dict_query):
    try:
        dict_query = dict_query
        collection = collections["profiles"]
        result = collection.delete_one(dict_query)
        print(">>>response delete", type(result))
        return result
    except Exception as e:
        return str(e)