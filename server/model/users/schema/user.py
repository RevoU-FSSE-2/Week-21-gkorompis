from datetime import datetime
from bson import ObjectId

class User:
    def __init__(self, username:str, email:str, fullname:str, password: str, role: str):
        self._id = str(ObjectId())
        self.username = username
        self.email = email
        self.fullname = fullname
        self.password = password
        self.role = role

    def to_dict(self) -> dict:
        return {
            '_id': self._id,
            'username': self.username,
            'email': self.email,
            'fullname': self.fullname,
            'password': self.password,
            'role': self.role
        }

