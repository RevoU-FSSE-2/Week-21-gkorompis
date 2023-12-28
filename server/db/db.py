from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
# from dotenv import load_dotenv
# import os

# load_dotenv()
from utils.global_env import MONGODB_CREDENTIAL

CONNECTION_STRING = MONGODB_CREDENTIAL
print(">>>>>> connecting to mongodby")
print(">>> connecting using uri:", CONNECTION_STRING)
client = MongoClient(CONNECTION_STRING, server_api=ServerApi('1') )
print(">>>>>> mongodb client connected")
collections = client['todos-app']
message = "random message"