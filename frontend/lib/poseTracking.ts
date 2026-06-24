import { drawPose } from "./drawing";
import { createPoseLandmarker } from "./poseDetector";

export async function startPoseTracking(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
) {
  const detector = await createPoseLandmarker();

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  const context = ctx;

  async function detect() {
    if (video.readyState >= 2) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const result = detector.detectForVideo(
        video,
        performance.now()
      );

      if (result.landmarks.length > 0) {
        drawPose(
          context,
          result.landmarks[0],
          canvas.width,
          canvas.height
        );
      }
    }

    requestAnimationFrame(detect);
  }

  detect();
}