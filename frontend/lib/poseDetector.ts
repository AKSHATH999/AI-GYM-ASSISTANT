import {
  FilesetResolver,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";

let poseLandmarker: PoseLandmarker | null = null;

export async function createPoseLandmarker() {
  if (poseLandmarker) return poseLandmarker;

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  );

  poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task",
    },

    runningMode: "VIDEO",

    numPoses: 1,
  });

  return poseLandmarker;
}