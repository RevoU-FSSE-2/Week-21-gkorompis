from db.db import collections
from model.jobs.schema.job import Job

def dao_insert_one(doc):
    job_doc = Job(**doc)
    new_job_doc = job_doc.to_dict()
    
    collection = collections["jobs"]
    result = collection.insert_one(new_job_doc)
    print(">>>response insert", result)
    return result