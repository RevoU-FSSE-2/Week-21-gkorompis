from datetime import datetime
from bson import ObjectId
from typing import List

class Tweet:
    def __init__(self, created_by:str, tweet:str, comments:List[dict], permission: List[str], tweet_type: str):
        self._id = str(ObjectId())
        self.createdBy = created_by
        self.tweet = tweet
        self.comments = comments or []
        self.permission = permission or []
        self.createdAt = datetime.utcnow().replace(microsecond=0).isoformat() + "Z"
        self.tweetType = tweet_type
    
    def to_dict(self) -> dict:
        return {
            '_id': self._id,
            'createdBy': self.createdBy,
            'tweet': self.tweet,
            'comments': self.comments,
            'permission': self.permission,
            'createdAt': self.createdAt,
            'tweetType': self.tweetType or "parent"
        }