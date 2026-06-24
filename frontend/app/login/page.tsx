"use client";

import Link from "next/link";

export default function LoginPage() {

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

        <h1 className="text-5xl font-bold text-white mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 mb-10">
          Login to continue your AI fitness journey
        </p>

        <div className="space-y-6">

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-800 text-white p-4 rounded-2xl outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-800 text-white p-4 rounded-2xl outline-none"
          />

          <button
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all p-4 rounded-2xl text-xl font-bold"
          >
            Login
          </button>

        </div>

        <p className="text-gray-400 mt-8 text-center">

          Don’t have an account?{" "}

          <Link
            href="/register"
            className="text-cyan-400"
          >
            Register
          </Link>

        </p>

      </div>

    </main>
  );
}