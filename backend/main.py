import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import workouts_collection

app = FastAPI()

# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Models
# -----------------------------

class Workout(BaseModel):
    exercise: str
    reps: int
    calories: float
    duration: int
    accuracy: int


# -----------------------------
# Routes
# -----------------------------

@app.get("/")
def home():
    return {
        "message": "AI Gym Backend Running"
    }


@app.get("/live-workout")
def live_workout():
    try:
        with open("live_data.json", "r") as file:
            data = json.load(file)

        return data

    except Exception:
        return {
            "reps": 0,
            "stage": "down"
        }


@app.post("/save-workout")
def save_workout(workout: Workout):

    workout_data = {
        "exercise": workout.exercise,
        "reps": workout.reps,
        "calories": workout.calories,
        "duration": workout.duration,
        "accuracy": workout.accuracy,
    }

    result = workouts_collection.insert_one(workout_data)

    return {
        "message": "Workout Saved Successfully",
        "id": str(result.inserted_id),
    }


@app.get("/workout-history")
def workout_history():

    workouts = []

    for workout in workouts_collection.find():

        workouts.append({
            "id": str(workout["_id"]),
            "exercise": workout.get("exercise"),
            "reps": workout.get("reps"),
            "calories": workout.get("calories"),
            "duration": workout.get("duration"),
            "accuracy": workout.get("accuracy"),
        })

    return workouts
@app.get("/analytics")
def analytics():

    workouts = list(workouts_collection.find())

    total_workouts = len(workouts)

    total_reps = sum(
        int(w.get("reps", 0) or 0)
        for w in workouts
    )

    total_calories = sum(
        float(w.get("calories", 0) or 0)
        for w in workouts
    )

    total_duration = sum(
        int(w.get("duration", 0) or 0)
        for w in workouts
    )

    # Convert text accuracy into numbers
    accuracy_map = {
        "Poor": 25,
        "Average": 50,
        "Good": 75,
        "Excellent": 100
    }

    total_accuracy = sum(
        accuracy_map.get(str(w.get("accuracy", "")).strip(), 0)
        for w in workouts
    )

    average_accuracy = (
        total_accuracy / total_workouts
        if total_workouts > 0 else 0
    )

    return {
        "total_workouts": total_workouts,
        "total_reps": total_reps,
        "total_calories": round(total_calories, 2),
        "total_duration": total_duration,
        "average_accuracy": round(average_accuracy, 1),
    }