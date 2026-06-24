"use client";

interface WorkoutStatsProps {
  exercise: string;
  reps: number;
  stage: string;
  angle: number;
}

export default function WorkoutStats({
  exercise,
  reps,
  stage,
  angle,
}: WorkoutStatsProps) {
  let accuracy = "Good";

  if (angle < 90) accuracy = "Excellent";
  else if (angle < 120) accuracy = "Good";
  else accuracy = "Needs Improvement";

  return (
    <div className="absolute top-4 left-4 bg-black/70 text-white p-5 rounded-xl w-64 z-20 shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        🏋 AI Gym Assistant
      </h2>

      <div className="space-y-2 text-lg">
        <p>
          <strong>Exercise:</strong> {exercise}
        </p>

        <p>
          <strong>Reps:</strong> {reps}
        </p>

        <p>
          <strong>Stage:</strong> {stage}
        </p>

        <p>
          <strong>Angle:</strong> {Math.round(angle)}°
        </p>

        <p>
          <strong>Accuracy:</strong> {accuracy}
        </p>
      </div>
    </div>
  );
}