export function drawPose(
  ctx: CanvasRenderingContext2D,
  landmarks: any[],
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height);

  // Draw keypoints
  for (const landmark of landmarks) {
    ctx.beginPath();
    ctx.arc(
      landmark.x * width,
      landmark.y * height,
      5,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "#00FFFF";
    ctx.fill();
  }

  // Connections
  const connections = [
    [11, 13], [13, 15],
    [12, 14], [14, 16],
    [11, 12],
    [11, 23], [12, 24],
    [23, 24],
    [23, 25], [25, 27],
    [24, 26], [26, 28],
    [27, 31], [28, 32]
  ];

  ctx.strokeStyle = "#22C55E";
  ctx.lineWidth = 3;

  for (const [start, end] of connections) {
    const a = landmarks[start];
    const b = landmarks[end];

    if (!a || !b) continue;

    ctx.beginPath();
    ctx.moveTo(a.x * width, a.y * height);
    ctx.lineTo(b.x * width, b.y * height);
    ctx.stroke();
  }
}