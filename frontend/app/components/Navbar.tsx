"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Dumbbell,
  BarChart3,
  Bot,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Workout",
      href: "/workout",
      icon: Dumbbell,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Coach",
      href: "/coach",
      icon: Bot,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200 shadow-sm">

      <div className="max-w-7xl mx-auto h-16 px-8 flex justify-between items-center">

        {/* Logo */}

        <Link
          href="/"
          className="text-2xl font-extrabold text-blue-600"
        >
          ForgeAI
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-4">

          {navItems.map((item) => {

            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
                ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}

        </div>

      </div>

    </nav>
  );
}