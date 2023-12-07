from db.db import collections
from model.profiles.schema.profile import Profile

def dao_insert_one(doc):
    try:
        profile_doc = Profile(**doc)
        new_profile_doc = profile_doc.to_dict()
        
        collection = collections["profiles"]
        result = collection.insert_one(new_profile_doc)
        print(">>>response insert", result)
        return result
    except Exception as e:
        print(">>>error at dao_insert_one", e)
        return str(e)