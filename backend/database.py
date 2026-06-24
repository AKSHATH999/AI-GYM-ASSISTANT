from pymongo import MongoClient

MONGO_URL = "mongodb+srv://akshath:vinsmoke30@cluster0.gjddtxw.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URL)

db = client["ai_gym"]

workouts_collection = db["workouts"]

print("MongoDB Connected Successfully")