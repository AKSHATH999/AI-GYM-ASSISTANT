"use client";

import { ExerciseType } from "@/types/exercise";

interface Props {
  value: ExerciseType;
  onChange: (exercise: ExerciseType) => void;
}

export default function ExerciseSelector({
  value,
  onChange,
}: Props) {
  return (
    <div className="absolute top-4 right-4 z-20">
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value as ExerciseType)
        }
        className="bg-black/70 text-white px-4 py-2 rounded-xl border border-gray-600"
      >
        <option value="SQUAT">🏋 Squat</option>
        <option value="PUSH_UP">💪 Push Up</option>
        <option value="BICEP_CURL">🏋 Bicep Curl</option>
        <option value="LUNGE">🦵 Lunge</option>
      </select>
    </div>
  );
}