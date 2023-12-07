from db.db import collections
# from model.jobs.schema.job import Job

def dao_delete_one(dict_query):
    try:
        dict_query = dict_query

        collection = collections["tweets"]
        result = collection.delete_one(dict_query)
        print(">>>response delete", type(result))
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