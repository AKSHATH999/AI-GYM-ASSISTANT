"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import WorkoutHistory from "../components/WorkoutHistory";

import {
  Flame,
  Dumbbell,
  Clock,
  Trophy,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Workout {
  date: string;
  exercise: string;
  reps: number;
  duration: string;
  calories: number;
}

export default function AnalyticsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("workoutHistory");

    if (saved) {
      setWorkouts(JSON.parse(saved));
    }
  }, []);

  const totalCalories = workouts.reduce(
    (sum, w) => sum + w.calories,
    0
  );

  const totalWorkouts = workouts.length;

  const totalMinutes = workouts.reduce((sum, w) => {
    const parts = w.duration.split(":");

    if (parts.length !== 2) return sum;

    return sum + Number(parts[0]);
  }, 0);

  const bestWorkout =
    workouts.length > 0
      ? Math.max(...workouts.map((w) => w.reps))
      : 0;

  const chartData = workouts
    .slice()
    .reverse()
    .map((workout, index) => ({
      workout: index + 1,
      calories: workout.calories,
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto p-6">

        <DashboardHeader />

        <div className="grid gap-6 mt-8 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Calories Burned"
            value={totalCalories.toString()}
            icon={Flame}
            color="bg-gradient-to-r from-orange-500 to-red-500"
          />

          <StatCard
            title="Total Workouts"
            value={totalWorkouts.toString()}
            icon={Dumbbell}
            color="bg-gradient-to-r from-blue-500 to-cyan-500"
          />

          <StatCard
            title="Training Minutes"
            value={totalMinutes.toString()}
            icon={Clock}
            color="bg-gradient-to-r from-green-500 to-emerald-500"
          />

          <StatCard
            title="Best Workout"
            value={`${bestWorkout} reps`}
            icon={Trophy}
            color="bg-gradient-to-r from-purple-500 to-pink-500"
          />

        </div>

        <div className="grid gap-8 mt-10 lg:grid-cols-3">

          <div className="lg:col-span-2 rounded-3xl bg-white shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Calories Per Workout
            </h2>

            <div className="h-96">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={chartData}>

                  <CartesianGrid strokeDasharray="4 4"/>

                  <XAxis dataKey="workout"/>

                  <YAxis/>

                  <Tooltip/>

                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#2563eb"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="rounded-3xl bg-white shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Workout Summary
            </h2>

            <div className="space-y-5">

              <div className="rounded-xl bg-orange-100 p-4">

                <p className="text-gray-500">
                  Calories Burned
                </p>

                <h3 className="text-3xl font-bold text-orange-600">
                  {totalCalories} kcal
                </h3>

              </div>

              <div className="rounded-xl bg-blue-100 p-4">

                <p className="text-gray-500">
                  Workouts Completed
                </p>

                <h3 className="text-3xl font-bold text-blue-600">
                  {totalWorkouts}
                </h3>

              </div>

              <div className="rounded-xl bg-green-100 p-4">

                <p className="text-gray-500">
                  Training Minutes
                </p>

                <h3 className="text-3xl font-bold text-green-600">
                  {totalMinutes}
                </h3>

              </div>

              <div className="rounded-xl bg-purple-100 p-4">

                <p className="text-gray-500">
                  Personal Best
                </p>

                <h3 className="text-3xl font-bold text-purple-600">
                  🏆 {bestWorkout} Reps
                </h3>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-10">

          <WorkoutHistory/>

        </div>

      </div>

    </div>
  );
}