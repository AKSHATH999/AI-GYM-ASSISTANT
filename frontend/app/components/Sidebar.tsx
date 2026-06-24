"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Dumbbell,
  History,
  BarChart3,
  User,
  Bot,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Workout",
    icon: Dumbbell,
    href: "/workout",
  },
  {
    title: "History",
    icon: History,
    href: "/history",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Profile",
    icon: User,
    href: "/profile",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col">

      {/* Logo */}
      <div className="p-8 border-b border-zinc-800">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">

            <Bot size={30} />

          </div>

          <div>

            <h1 className="text-2xl font-extrabold text-white">
              AI Gym
            </h1>

            <p className="text-sm text-gray-400">
              Assistant
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-5 space-y-3">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                active
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                  : "text-gray-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon size={24} />

              <span className="text-lg font-semibold">
                {item.title}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* AI Coach Card */}

      <div className="p-5">

        <div className="rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-700 p-6">

          <p className="text-sm opacity-80">
            AI Coach
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Axon
          </h2>

          <p className="mt-4 text-sm leading-6 opacity-90">
            Ready to guide your workout today.
          </p>

          <button className="mt-6 w-full rounded-xl bg-white text-black font-bold py-3 hover:scale-105 transition">
            Start Session
          </button>

        </div>

      </div>

    </aside>
  );
}