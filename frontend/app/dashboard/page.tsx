"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import WorkoutChart from "../components/WorkoutChart";

interface Workout {
  date: string;
  exercise: string;
  reps: number;
  duration: string;
  calories: number;
}

export default function Dashboard() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("workoutHistory");

    if (saved) {
      setWorkouts(JSON.parse(saved));
    }
  }, []);

  const totalWorkouts = workouts.length;

  const totalReps = workouts.reduce(
    (sum, workout) => sum + Number(workout.reps),
    0
  );

  const totalCalories = workouts.reduce(
    (sum, workout) => sum + Number(workout.calories),
    0
  );

  const streak = totalWorkouts;

  const personalBest =
    workouts.length > 0
      ? Math.max(...workouts.map((w) => w.reps))
      : 0;

  const latestWorkout =
    workouts.length > 0 ? workouts[0] : null;

  const goal = 100;

  const progress = Math.min(
    Math.round((totalWorkouts / goal) * 100),
    100
  );

  const recommendation =
    totalReps < 100
      ? "You're off to a great start! Try completing another workout today to build consistency."
      : totalReps < 300
      ? "Great progress! Increase your squat reps by 5 next workout."
      : "Excellent consistency! Consider adding push-ups or lunges for a balanced workout.";

  return (
    <main className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}

      <aside className="w-72 bg-zinc-950 border-r border-zinc-800 p-6">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          AI Gym
        </h1>

        <div className="mt-10 flex flex-col gap-5 text-gray-300">

          <Link href="/dashboard" className="hover:text-cyan-400">
            Dashboard
          </Link>

          <Link href="/workout" className="hover:text-cyan-400">
            Workout
          </Link>

          <Link href="/analytics" className="hover:text-cyan-400">
            Analytics
          </Link>

          <Link href="/history" className="hover:text-cyan-400">
            History
          </Link>

          <Link
            href="/login"
            className="hover:text-red-400 mt-8"
          >
            Logout
          </Link>

        </div>

      </aside>

      {/* Main */}

      <section className="flex-1 p-10 overflow-y-auto">

        <h2 className="text-5xl font-bold">
          Welcome Back 💪
        </h2>

        <p className="text-gray-400 mt-4">
          Track your workouts, monitor progress, and improve your fitness with AI.
        </p>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-12">

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

            <h3 className="text-gray-400">
              Workouts
            </h3>

            <p className="text-4xl font-bold mt-4 text-cyan-400">
              {totalWorkouts}
            </p>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

            <h3 className="text-gray-400">
              Total Reps
            </h3>

            <p className="text-4xl font-bold mt-4 text-green-400">
              {totalReps}
            </p>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

            <h3 className="text-gray-400">
              Calories Burned
            </h3>

            <p className="text-4xl font-bold mt-4 text-orange-400">
              {totalCalories}
            </p>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

            <h3 className="text-gray-400">
              Workout Streak
            </h3>

            <p className="text-4xl font-bold mt-4 text-purple-400">
              {streak} Days
            </p>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

            <h3 className="text-gray-400">
              Personal Best
            </h3>

            <p className="text-4xl font-bold mt-4 text-yellow-400">
              🏆 {personalBest}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Best Squat Reps
            </p>

          </div>

        </div>

        {/* Start Workout */}

        <Link href="/workout">

          <div className="mt-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl p-8 cursor-pointer hover:scale-[1.02] transition">

            <h2 className="text-3xl font-bold">
              🚀 Start Workout
            </h2>

            <p className="mt-3">
              Launch the AI pose detector and begin tracking your workout.
            </p>

          </div>

        </Link>

        {/* Workout Goal */}

        <div className="mt-10 bg-zinc-900 rounded-3xl border border-zinc-800 p-8">

          <h2 className="text-2xl font-bold mb-6">
            🎯 Workout Goal
          </h2>

          <div className="w-full bg-zinc-700 rounded-full h-4">

            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />

          </div>

          <p className="mt-4 text-gray-400">
            {totalWorkouts} / {goal} workouts completed ({progress}%)
          </p>

        </div>

        {/* Chart */}

        <div className="mt-10">

          <WorkoutChart />

        </div>
                {/* Latest Workout */}

        <div className="mt-10 bg-zinc-900 rounded-3xl border border-zinc-800 p-8">

          <h2 className="text-2xl font-bold mb-6">
            🔥 Latest Workout
          </h2>

          {latestWorkout ? (

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              <div>

                <p className="text-gray-400">
                  Exercise
                </p>

                <p className="text-xl font-bold text-cyan-400">
                  {latestWorkout.exercise}
                </p>

              </div>

              <div>

                <p className="text-gray-400">
                  Reps
                </p>

                <p className="text-xl font-bold text-green-400">
                  {latestWorkout.reps}
                </p>

              </div>

              <div>

                <p className="text-gray-400">
                  Calories
                </p>

                <p className="text-xl font-bold text-orange-400">
                  {latestWorkout.calories} kcal
                </p>

              </div>

              <div>

                <p className="text-gray-400">
                  Duration
                </p>

                <p className="text-xl font-bold">
                  {latestWorkout.duration}
                </p>

              </div>

            </div>

          ) : (

            <p className="text-gray-400">
              No workouts yet. Complete your first workout to see your latest activity.
            </p>

          )}

        </div>

        {/* AI Recommendation */}

        <div className="mt-10 bg-zinc-900 rounded-3xl border border-zinc-800 p-8">

          <h2 className="text-2xl font-bold mb-5">
            🤖 AI Recommendation
          </h2>

          <p className="text-lg text-gray-300 leading-8">
            {recommendation}
          </p>

        </div>

        {/* Recent Workouts */}

        <div className="mt-10 bg-zinc-900 rounded-3xl border border-zinc-800 p-8">

          <h2 className="text-2xl font-bold mb-6">
            📅 Recent Workouts
          </h2>

          {workouts.length === 0 ? (

            <div className="text-center py-12">

              <p className="text-gray-400 text-lg">
                No workout history available.
              </p>

              <p className="text-gray-500 mt-2">
                Start your first workout to populate your dashboard.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b border-zinc-700">

                    <th className="py-4">
                      Date
                    </th>

                    <th>
                      Exercise
                    </th>

                    <th>
                      Reps
                    </th>

                    <th>
                      Duration
                    </th>

                    <th>
                      Calories
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {workouts.slice(0, 8).map((workout, index) => (

                    <tr
                      key={index}
                      className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                    >

                      <td className="py-4">
                        {workout.date}
                      </td>

                      <td>
                        {workout.exercise}
                      </td>

                      <td className="text-green-400 font-semibold">
                        {workout.reps}
                      </td>

                      <td>
                        {workout.duration}
                      </td>

                      <td className="text-orange-400">
                        {workout.calories} kcal
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>
              </section>

    </main>
  );
}