
import { calculateAngle } from "./calculateAngle";
import { PoseLandmarks } from "@/types/pose";

export interface SquatResult {
  reps: number;
  stage: "UP" | "DOWN";
  angle: number;
}

export class SquatCounter {
  private reps = 0;
  private stage: "UP" | "DOWN" = "UP";

  process(landmarks: PoseLandmarks): SquatResult {
    if (!landmarks || landmarks.length < 33) {
      return {
        reps: this.reps,
        stage: this.stage,
        angle: 0,
      };
    }

    // Left leg
    const leftAngle = calculateAngle(
      landmarks[23],
      landmarks[25],
      landmarks[27]
    );

    // Right leg
    const rightAngle = calculateAngle(
      landmarks[24],
      landmarks[26],
      landmarks[28]
    );

    // Average both legs
    const angle = (leftAngle + rightAngle) / 2;

    // User is standing
    if (angle > 165) {
      if (this.stage === "DOWN") {
        this.reps++;
      }

      this.stage = "UP";
    }

    // User is squatting
    if (angle < 90) {
      this.stage = "DOWN";
    }

    return {
      reps: this.reps,
      stage: this.stage,
      angle: Math.round(angle),
    };
  }

  reset() {
    this.reps = 0;
    this.stage = "UP";
  }
}