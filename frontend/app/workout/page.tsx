"use client";

import { useEffect, useState } from "react";
import PoseDetector from "../components/PoseDetector";

interface Workout {
  exercise: string;
  reps: number;
  duration: string;
  calories: number;
  date: string;
}

export default function WorkoutPage() {
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [repCount, setRepCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isWorkoutStarted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isWorkoutStarted]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartWorkout = () => {
    setRepCount(0);
    setSeconds(0);
    setIsWorkoutStarted(true);
  };

  const handleEndWorkout = () => {
    if (repCount === 0) {
      alert(
        "⚠️ Please complete at least one repetition before finishing your workout."
      );
      return;
    }

    const calories = Math.round(repCount * 0.6 + seconds * 0.15);

    const workout: Workout = {
      exercise: "Squat",
      reps: repCount,
      duration: formatTime(seconds),
      calories,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const history: Workout[] = JSON.parse(
      localStorage.getItem("workoutHistory") || "[]"
    );

    const previousBest =
      history.length > 0
        ? Math.max(...history.map((w) => w.reps))
        : 0;

    history.unshift(workout);

    localStorage.setItem(
      "workoutHistory",
      JSON.stringify(history)
    );

    const isNewBest = workout.reps > previousBest;

    alert(`🎉 Workout Saved Successfully!

🏋️ Exercise: ${workout.exercise}
🔢 Repetitions: ${workout.reps}
⏱ Duration: ${workout.duration}
🔥 Calories: ${workout.calories} kcal

${isNewBest ? "🏆 NEW PERSONAL BEST!\n\n" : ""}Great job! Keep pushing yourself! 💪`);

    setIsWorkoutStarted(false);
    setSeconds(0);
    setRepCount(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            AI Workout Tracker
          </h1>

          <p className="text-zinc-400 mt-2">
            Start your workout and let AI count your repetitions.
          </p>

        </div>

        {!isWorkoutStarted ? (

          <div className="flex justify-center items-center mt-32">

            <div className="bg-zinc-900 p-10 rounded-2xl border border-zinc-800 text-center">

              <h2 className="text-3xl font-bold mb-4">
                Ready to Workout?
              </h2>

              <p className="text-zinc-400 mb-8">
                Press Start and perform your squats.
              </p>

              <button
                onClick={handleStartWorkout}
                className="bg-blue-600 hover:bg-blue-700 transition px-10 py-4 rounded-xl text-xl font-semibold"
              >
                Start Workout
              </button>

            </div>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Camera */}

            <div className="lg:col-span-2">

              <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 p-4">

                <PoseDetector
                  exercise="Squat"
                  onRepCountChange={setRepCount}
                />

              </div>

            </div>

            {/* Live Stats */}

            <div className="space-y-6">

              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">

                <h2 className="text-2xl font-bold mb-6">
                  Live Workout
                </h2>

                <div className="space-y-5">

                  <div>

                    <p className="text-zinc-400">
                      Exercise
                    </p>

                    <p className="text-2xl font-bold text-cyan-400">
                      Squat
                    </p>

                  </div>

                  <div>

                    <p className="text-zinc-400">
                      Repetitions
                    </p>

                    <p className="text-5xl font-bold text-green-400">
                      {repCount}
                    </p>

                  </div>

                  <div>

                    <p className="text-zinc-400">
                      Duration
                    </p>

                    <p className="text-3xl font-bold">
                      {formatTime(seconds)}
                    </p>

                  </div>

                  <div>

                    <p className="text-zinc-400">
                      Calories
                    </p>

                    <p className="text-3xl font-bold text-orange-400">
                      {Math.round(repCount * 0.6 + seconds * 0.15)} kcal
                    </p>

                  </div>

                  <div>

                    <p className="text-zinc-400">
                      Status
                    </p>

                    <div className="flex items-center gap-2">

                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

                      <p className="text-xl font-bold text-green-500">
                        Active
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* Workout Tips */}

              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">

                <h3 className="text-xl font-bold mb-4">
                  💡 AI Tips
                </h3>

                {repCount < 10 ? (

                  <p className="text-zinc-400">
                    Focus on keeping your back straight and squat to at least knee level.
                  </p>

                ) : repCount < 25 ? (

                  <p className="text-zinc-400">
                    Great pace! Maintain a steady rhythm and control your breathing.
                  </p>

                ) : (

                  <p className="text-zinc-400">
                    Excellent work! Stay hydrated and maintain proper form as you continue.
                  </p>

                )}

              </div>

              <button
                onClick={handleEndWorkout}
                className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 transition text-lg font-semibold"
              >
                Finish Workout
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}