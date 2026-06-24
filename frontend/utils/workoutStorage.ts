export interface WorkoutSession {
  exercise: string;
  reps: number;
  duration: string;
  date: string;
}

const STORAGE_KEY = "ai-fitness-workouts";

export function saveWorkout(session: WorkoutSession) {
  const existing = getWorkouts();
  existing.unshift(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getWorkouts(): WorkoutSession[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

export function clearWorkouts() {
  localStorage.removeItem(STORAGE_KEY);
}