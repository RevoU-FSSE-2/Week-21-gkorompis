from db.db import collections
# from model.jobs.schema.job import Job

def dao_read_many(dict_query):
    # job_doc = Job(**doc)
    # new_job_doc = job_doc.to_dict()

    dict_query = dict_query or {}
    collection = collections["jobs"]
    result = collection.find(dict_query)
    result = list(result)
    print(">>>response find many dao jobs", type(result))
    return result

def dao_read_one(dict_query):
    try:
        dict_query = dict_query or {}
        collection = collections["jobs"]
        result = collection.find_one(dict_query)
        result = [result]
        print(">>>response find one in dao jobs", type(result))
        return result
    except Exception as e:
        print(">>>error at dao_read_one:", e)