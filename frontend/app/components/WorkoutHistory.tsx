"use client";

import { useEffect, useState } from "react";

interface Workout {
  date: string;
  exercise: string;
  reps: number;
  duration: string;
  calories: number;
}

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    loadWorkouts();

    const handleStorage = () => loadWorkouts();

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const loadWorkouts = () => {
    const saved = localStorage.getItem("workoutHistory");

    if (saved) {
      setWorkouts(JSON.parse(saved));
    } else {
      setWorkouts([]);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          Workout History
        </h2>

        <button
          onClick={loadWorkouts}
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg"
        >
          Refresh
        </button>

      </div>

      {workouts.length === 0 ? (

        <div className="text-center py-12 text-gray-400">

          <p className="text-lg">
            No workouts completed yet.
          </p>

          <p className="mt-2">
            Complete your first workout to see it here.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-zinc-700 text-gray-400">

                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Exercise</th>
                <th className="text-center py-3">Reps</th>
                <th className="text-center py-3">Duration</th>
                <th className="text-center py-3">Calories</th>

              </tr>

            </thead>

            <tbody>

              {workouts.map((workout, index) => (

                <tr
                  key={index}
                  className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                >

                  <td className="py-4">
                    {workout.date}
                  </td>

                  <td className="py-4 font-semibold">
                    {workout.exercise}
                  </td>

                  <td className="text-center py-4">
                    {workout.reps}
                  </td>

                  <td className="text-center py-4">
                    {workout.duration}
                  </td>

                  <td className="text-center py-4 text-green-400 font-semibold">
                    {workout.calories} kcal
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}