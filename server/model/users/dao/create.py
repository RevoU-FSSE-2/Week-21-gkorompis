from db.db import collections
from model.users.schema.user import User

def dao_insert_one(doc):
    try:
        user_doc = User(**doc)
        new_user_doc = user_doc.to_dict()
        
        collection = collections["users"]
        result = collection.insert_one(new_user_doc)
        print(">>>response insert", result)
        return result
    except Exception as e:
        print(">>>error at dao_insert_one", e)
        return str(e)