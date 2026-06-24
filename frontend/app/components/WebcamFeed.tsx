"use client";

import Webcam from "react-webcam";
import { useRef, useEffect, useState } from "react";

import {
  FilesetResolver,
  PoseLandmarker,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

import { SquatCounter } from "@/lib/squatCounter";
import { PoseLandmarks } from "@/types/pose";

export default function WebcamFeed() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create one SquatCounter instance
  const squatCounter = useRef(new SquatCounter());

  // Workout stats
  const [reps, setReps] = useState(0);
  const [stage, setStage] = useState<"UP" | "DOWN">("UP");
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let poseLandmarker: PoseLandmarker;
    let animationFrameId: number;

    async function initializePose() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });

      detectPose();
    }

    function detectPose() {
      if (
        !webcamRef.current?.video ||
        webcamRef.current.video.readyState !== 4
      ) {
        animationFrameId = requestAnimationFrame(detectPose);
        return;
      }

      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      if (!canvas) {
        animationFrameId = requestAnimationFrame(detectPose);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        animationFrameId = requestAnimationFrame(detectPose);
        return;
      }

      const results = poseLandmarker.detectForVideo(
        video,
        performance.now()
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mirror drawing to match webcam
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);

      if (results.landmarks.length > 0) {
        const drawingUtils = new DrawingUtils(ctx);

        for (const landmarks of results.landmarks) {
          drawingUtils.drawConnectors(
            landmarks,
            PoseLandmarker.POSE_CONNECTIONS,
            {
              lineWidth: 4,
            }
          );

          drawingUtils.drawLandmarks(landmarks, {
            radius: 5,
          });

          // Process squat
          const squat = squatCounter.current.process(
            landmarks as PoseLandmarks
          );

          setReps(squat.reps);
          setStage(squat.stage);
          setAngle(squat.angle);
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(detectPose);
    }

    initializePose();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden rounded-2xl">
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored={true}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "user",
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Workout Stats Overlay */}
      <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded-xl shadow-lg">
        <p className="text-xl font-bold">🏋️ Reps: {reps}</p>
        <p className="text-lg">📈 Stage: {stage}</p>
        <p className="text-lg">📐 Angle: {angle}°</p>
      </div>
    </div>
  );
}