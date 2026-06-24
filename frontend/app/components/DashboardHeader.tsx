"use client";

export default function DashboardHeader() {
  const today = new Date();

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const hour = today.getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  return (
    <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold">{greeting}</h1>

          <p className="mt-2 text-lg text-blue-100">
            {date}
          </p>

          <p className="mt-5 max-w-xl text-blue-50">
            Every workout makes you stronger than yesterday.
            Stay consistent and let AI track your progress.
          </p>
        </div>

        <div className="rounded-2xl bg-white/15 p-6 backdrop-blur-md">
          <h2 className="text-sm uppercase tracking-widest text-blue-100">
            Current Streak
          </h2>

          <p className="mt-2 text-5xl font-bold">
            🔥 7
          </p>

          <p className="mt-1 text-blue-100">
            days
          </p>
        </div>

      </div>
    </div>
  );
}