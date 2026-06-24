"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Workout {
  exercise: string;
  reps: number;
  duration: string;
  calories: number;
  date: string;
}

export default function WorkoutChart() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("workoutHistory");

    if (saved) {
      setWorkouts(JSON.parse(saved));
    }
  }, []);

  // Last 7 workouts
  const recent = [...workouts].reverse().slice(-7);

  const data = {
    labels:
      recent.length > 0
        ? recent.map((w) => w.date)
        : ["No Data"],

    datasets: [
      {
        label: "Calories Burned",
        data:
          recent.length > 0
            ? recent.map((w) => w.calories)
            : [0],

        borderColor: "#06b6d4",
        backgroundColor: "#06b6d4",

        tension: 0.4,

        pointRadius: 5,

        pointHoverRadius: 7,

        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },

      title: {
        display: true,
        text: "Weekly Calories Burned",
        color: "white",
        font: {
          size: 18,
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",
        },

        grid: {
          color: "#333",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "white",
        },

        grid: {
          color: "#333",
        },
      },
    },
  };

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

      <Line
        data={data}
        options={options}
      />

      {workouts.length === 0 && (

        <p className="text-center text-gray-500 mt-6">
          Complete a workout to generate analytics.
        </p>

      )}

    </div>
  );
}