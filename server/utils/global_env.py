from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_CREDENTIAL = os.getenv("MONGODB_CREDENTIAL")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")