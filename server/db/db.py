from pymongo import MongoClient
# from dotenv import load_dotenv
# import os

# load_dotenv()
from utils.global_env import MONGODB_CREDENTIAL

CONNECTION_STRING = MONGODB_CREDENTIAL
client = MongoClient(CONNECTION_STRING)
collections = client['todos-app']
message = "random message"