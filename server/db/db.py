from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_CREDENTIAL = os.getenv("MONGODB_CREDENTIAL")
CONNECTION_STRING = MONGODB_CREDENTIAL
client = MongoClient(CONNECTION_STRING)
collections = client['todos-app']