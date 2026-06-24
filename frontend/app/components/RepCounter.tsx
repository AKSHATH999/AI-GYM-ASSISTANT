export interface RepCounterState {
  stage: "Up" | "Down";
  reps: number;
}

export function calculateAngle(
  a: { x: number; y: number },
  b: { x: number; y: number },
  c: { x: number; y: number }
): number {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) -
    Math.atan2(a.y - b.y, a.x - b.x);

  let angle = Math.abs((radians * 180) / Math.PI);

  if (angle > 180) {
    angle = 360 - angle;
  }

  return angle;
}

export function updateRepCounter(
  averageAngle: number,
  state: RepCounterState
): RepCounterState {
  let { stage, reps } = state;

  if (averageAngle < 100 && stage === "Up") {
    stage = "Down";
  }

  if (averageAngle > 165 && stage === "Down") {
    stage = "Up";
    reps++;
  }

  return {
    stage,
    reps,
  };
}