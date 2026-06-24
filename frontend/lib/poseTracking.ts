import { drawPose } from "./drawing";
import { createPoseDetector } from "./poseDetector";

export async function startPoseTracking(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
) {
  const detector = await createPoseDetector();

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

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
          ctx,
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