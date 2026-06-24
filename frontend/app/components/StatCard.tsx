import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div
      className={`
      rounded-2xl
      p-6
      shadow-lg
      hover:shadow-2xl
      transition-all
      duration-300
      hover:-translate-y-2
      text-white
      ${color}
      `}
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm opacity-90">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div className="bg-white/20 rounded-full p-4">

          <Icon size={34} />

        </div>

      </div>
    </div>
  );
}