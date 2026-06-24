"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  PoseLandmarker,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

interface PoseDetectorProps {
  exercise?: string;
  onRepCountChange?: (count: number) => void;
}

const PoseDetector: React.FC<PoseDetectorProps> = ({
  exercise = "Squat",
  onRepCountChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const poseLandmarkerRef = useRef<PoseLandmarker | null>(null);
  const drawingUtilsRef = useRef<DrawingUtils | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef(-1);
  const lastFrameTimeRef = useRef(performance.now());

  const [loading, setLoading] = useState(true);
  const [cameraStarted, setCameraStarted] = useState(false);

  const [repCount, setRepCount] = useState(0);
  const [stage, setStage] = useState<"Up" | "Down">("Up");

  const [leftAngle, setLeftAngle] = useState(0);
  const [rightAngle, setRightAngle] = useState(0);

  const [fps, setFps] = useState(0);

  useEffect(() => {
    onRepCountChange?.(repCount);
  }, [repCount, onRepCountChange]);

  const calculateAngle = (
    a: { x: number; y: number },
    b: { x: number; y: number },
    c: { x: number; y: number }
  ) => {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);

    let angle = Math.abs((radians * 180) / Math.PI);

    if (angle > 180) {
      angle = 360 - angle;
    }

    return angle;
  };

  const setupCamera = async () => {
    if (!videoRef.current) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 1280,
        height: 720,
        facingMode: "user",
      },
      audio: false,
    });

    videoRef.current.srcObject = stream;

    await new Promise<void>((resolve) => {
      if (!videoRef.current) return;

      videoRef.current.onloadedmetadata = () => resolve();
    });

    await videoRef.current.play();

    setCameraStarted(true);
  };

  const createPoseLandmarker = async () => {
    console.log("Loading MediaPipe...");

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
    );

    poseLandmarkerRef.current =
      await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/pose_landmarker_lite.task",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        drawingUtilsRef.current = new DrawingUtils(ctx);
      }
    }

    console.log("PoseLandmarker ready.");
  };

  useEffect(() => {
    const init = async () => {
      try {
        await setupCamera();

        await createPoseLandmarker();

        setLoading(false);
      } catch (error) {
        console.error("Initialization failed:");
        console.error(error);
      }
    };

    init();
        return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      poseLandmarkerRef.current?.close();

      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const detectPose = () => {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      !poseLandmarkerRef.current ||
      !drawingUtilsRef.current
    ) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;

      const results = poseLandmarkerRef.current.detectForVideo(
        video,
        performance.now()
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];

        drawingUtilsRef.current.drawConnectors(
          landmarks,
          PoseLandmarker.POSE_CONNECTIONS,
          {
            lineWidth: 4,
          }
        );

        drawingUtilsRef.current.drawLandmarks(landmarks, {
          radius: 4,
        });

        const leftHip = landmarks[23];
        const leftKnee = landmarks[25];
        const leftAnkle = landmarks[27];

        const rightHip = landmarks[24];
        const rightKnee = landmarks[26];
        const rightAnkle = landmarks[28];

        const left = calculateAngle(
          leftHip,
          leftKnee,
          leftAnkle
        );

        const right = calculateAngle(
          rightHip,
          rightKnee,
          rightAnkle
        );

        setLeftAngle(Math.round(left));
        setRightAngle(Math.round(right));

        const avgAngle = (left + right) / 2;

        if (avgAngle < 100 && stage === "Up") {
          setStage("Down");
        }

        if (avgAngle > 165 && stage === "Down") {
          setStage("Up");
          setRepCount((prev) => prev + 1);
        }

        ctx.fillStyle = "#00ff00";
        ctx.font = "24px Arial";

        ctx.fillText(
          `Left Knee: ${Math.round(left)}°`,
          20,
          40
        );

        ctx.fillText(
          `Right Knee: ${Math.round(right)}°`,
          20,
          80
        );

        ctx.fillText(
          `Stage: ${stage}`,
          20,
          120
        );

        ctx.fillText(
          `Reps: ${repCount}`,
          20,
          160
        );
      }
    }

    const now = performance.now();

    const currentFPS =
      1000 / (now - lastFrameTimeRef.current);

    lastFrameTimeRef.current = now;

    setFps(Math.round(currentFPS));

    animationFrameRef.current =
      requestAnimationFrame(detectPose);
  };

  useEffect(() => {
    if (!loading && cameraStarted) {
      animationFrameRef.current =
        requestAnimationFrame(detectPose);
    }
  }, [loading, cameraStarted]);
    return (
    <div className="flex flex-col items-center gap-6 p-6">

      <h1 className="text-3xl font-bold">
        {exercise} Pose Detection
      </h1>

      {loading && (
        <div className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 font-semibold">
          Loading MediaPipe...
        </div>
      )}

      {!loading && !cameraStarted && (
        <div className="rounded-lg bg-red-100 px-4 py-2 text-red-700 font-semibold">
          Camera not detected.
        </div>
      )}

      <div className="relative">

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width={960}
          height={720}
          className="rounded-xl border shadow-lg"
        />

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
        />

      </div>

      <div className="grid grid-cols-2 gap-5 w-full max-w-3xl">

        <div className="rounded-xl border bg-white p-5 shadow">

          <p className="text-gray-500 text-sm">
            Repetitions
          </p>

          <p className="text-4xl font-bold">
            {repCount}
          </p>

        </div>

        <div className="rounded-xl border bg-white p-5 shadow">

          <p className="text-gray-500 text-sm">
            Current Stage
          </p>

          <p className="text-4xl font-bold">
            {stage}
          </p>

        </div>

        <div className="rounded-xl border bg-white p-5 shadow">

          <p className="text-gray-500 text-sm">
            Left Knee Angle
          </p>

          <p className="text-4xl font-bold">
            {leftAngle}°
          </p>

        </div>

        <div className="rounded-xl border bg-white p-5 shadow">

          <p className="text-gray-500 text-sm">
            Right Knee Angle
          </p>

          <p className="text-4xl font-bold">
            {rightAngle}°
          </p>

        </div>

        <div className="col-span-2 rounded-xl border bg-white p-5 shadow">

          <p className="text-gray-500 text-sm">
            FPS
          </p>

          <p className="text-4xl font-bold">
            {fps}
          </p>

        </div>

      </div>

    </div>
  );
};

export default PoseDetector;