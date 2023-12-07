from datetime import datetime
from bson import ObjectId
from typing import List

class Profile:
    def __init__(self, username:str, followers:List[str], following:List[str], tweets: List[str]):
        self._id = str(ObjectId())
        self.username = username
        self.followers = followers
        self.following = following
        self.tweets = tweets

    def to_dict(self) -> dict:
        return {
            '_id': self._id,
            'username': self.username,
            'followers': self.followers,
            'following': self.following,
            'tweets': self.tweets
        }

