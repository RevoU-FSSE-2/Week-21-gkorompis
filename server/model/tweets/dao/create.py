from db.db import collections
from model.tweets.schema.tweet import Tweet

def dao_insert_one(doc):
    try:
        tweet_doc = Tweet(**doc)
        new_tweet_doc = tweet_doc.to_dict()
        
        collection = collections["tweets"]
        result = collection.insert_one(new_tweet_doc)
        print(">>>response insert", result)
        return result
    except Exception as e:
        print(">>>error at dao_insert_one", e)
        return str(e)