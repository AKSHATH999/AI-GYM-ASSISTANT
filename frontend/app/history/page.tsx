"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

interface Workout {
  id: string;
  exercise: string;
  reps: number;
  calories: number;
  duration: number;
  accuracy: number;
}

export default function HistoryPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("http://127.0.0.1:8000/workout-history");
        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 min-h-screen bg-black text-white p-10">
        <h1 className="text-5xl font-black mb-8">
          Workout History
        </h1>

        {loading ? (
          <p className="text-xl">Loading...</p>
        ) : workouts.length === 0 ? (
          <p className="text-xl text-gray-400">
            No workouts found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-zinc-800">
            <table className="w-full">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="p-5 text-left">Exercise</th>
                  <th className="p-5">Reps</th>
                  <th className="p-5">Calories</th>
                  <th className="p-5">Duration (sec)</th>
                  <th className="p-5">Accuracy</th>
                </tr>
              </thead>

              <tbody>
                {workouts.map((workout) => (
                  <tr
                    key={workout.id}
                    className="border-t border-zinc-800 hover:bg-zinc-900"
                  >
                    <td className="p-5">{workout.exercise}</td>
                    <td className="text-center">{workout.reps}</td>
                    <td className="text-center">
                      🔥 {workout.calories}
                    </td>
                    <td className="text-center">
                      {workout.duration}
                    </td>
                    <td className="text-center">
                      {workout.accuracy}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}