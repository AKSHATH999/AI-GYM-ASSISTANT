"use client";

import Link from "next/link";
import { Dumbbell, Activity, Brain, ArrowRight } from "lucide-react";

export default function AxonHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="absolute -top-40 left-20 h-96 w-96 rounded-full bg-blue-500/20 blur-[150px]" />
      <div className="absolute bottom-0 right-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[150px]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6">

        <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
          Powered by AXON AI
        </span>

        <h1 className="mt-8 text-center text-6xl font-extrabold leading-tight md:text-8xl">
          Train
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {" "}
            Smarter
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-center text-lg text-gray-400">
          AI Gym Assistant analyzes your workouts in real time using
          computer vision to count reps, evaluate posture,
          track progress, and help you improve every session.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <Link
            href="/workout"
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:scale-105 hover:bg-cyan-400"
          >
            Start Workout
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/analytics"
            className="rounded-xl border border-gray-700 px-8 py-4 transition hover:border-cyan-400 hover:bg-white/5"
          >
            View Analytics
          </Link>

        </div>

        <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
            <Dumbbell className="mb-4 text-cyan-400" size={34} />
            <h3 className="text-xl font-bold">
              Smart Workout
            </h3>
            <p className="mt-3 text-gray-400">
              AI tracks every repetition with precision.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
            <Activity className="mb-4 text-cyan-400" size={34} />
            <h3 className="text-xl font-bold">
              Live Analytics
            </h3>
            <p className="mt-3 text-gray-400">
              Monitor calories, accuracy and workout trends.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
            <Brain className="mb-4 text-cyan-400" size={34} />
            <h3 className="text-xl font-bold">
              AI Feedback
            </h3>
            <p className="mt-3 text-gray-400">
              Improve posture and performance after every session.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}