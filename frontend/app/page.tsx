"use client";

import Sidebar from "./components/Sidebar";
import Link from "next/link";
import { Dumbbell, Flame, Brain } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            AI Gym Assistant
          </h1>

          <p className="mt-4 text-gray-400 text-lg md:text-xl max-w-3xl">
            Your intelligent workout companion powered by AI. Track workouts,
            monitor progress, improve your form, and achieve your fitness goals
            with real-time analytics.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {/* Card 1 */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 hover:border-cyan-500 transition duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-lg">Today's Workout</h3>

              <Dumbbell className="text-cyan-400" size={32} />
            </div>

            <h2 className="mt-6 text-5xl font-bold text-cyan-400">
              0
            </h2>

            <p className="mt-2 text-gray-500">
              Workouts Completed
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 hover:border-pink-500 transition duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-lg">
                Calories Burned
              </h3>

              <Flame className="text-pink-400" size={32} />
            </div>

            <h2 className="mt-6 text-5xl font-bold text-pink-400">
              0 kcal
            </h2>

            <p className="mt-2 text-gray-500">
              Today's Progress
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 hover:border-green-500 transition duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-lg">
                AI Form Score
              </h3>

              <Brain className="text-green-400" size={32} />
            </div>

            <h2 className="mt-6 text-5xl font-bold text-green-400">
              --
            </h2>

            <p className="mt-2 text-gray-500">
              Real-time Analysis
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
          <h2 className="text-4xl font-bold mb-8">
            Quick Actions ⚡
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/workout"
              className="rounded-2xl bg-cyan-500 py-8 text-center text-2xl font-bold transition hover:bg-cyan-400"
            >
              💪 Start Workout
            </Link>

            <Link
              href="/history"
              className="rounded-2xl bg-pink-500 py-8 text-center text-2xl font-bold transition hover:bg-pink-400"
            >
              📜 Workout History
            </Link>

            <Link
              href="/analytics"
              className="rounded-2xl bg-green-500 py-8 text-center text-2xl font-bold transition hover:bg-green-400"
            >
              📊 Analytics
            </Link>
          </div>
        </div>

        {/* AI Coach */}
        <div className="mt-12 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8">
          <h2 className="text-3xl font-bold text-cyan-400">
            Meet Axon 🤖
          </h2>

          <p className="mt-4 text-gray-300 text-lg leading-8">
            Axon is your personal AI fitness coach. It will analyze your
            workout form, count repetitions automatically, track your
            performance, and provide intelligent feedback to help you train
            smarter and achieve better results.
          </p>
        </div>
      </main>
    </div>
  );
}