import cv2
import mediapipe as mp

mp_pose = mp.solutions.pose
mp_draw = mp.solutions.drawing_utils

pose = mp_pose.Pose(
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)

cap = cv2.VideoCapture(0)

# Better webcam resolution
cap.set(3, 1280)
cap.set(4, 720)

while True:

    success, frame = cap.read()

    if not success:
        break

    # Flip for natural movement
    frame = cv2.flip(frame, 1)

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = pose.process(rgb)

    if results.pose_landmarks:

        mp_draw.draw_landmarks(
            frame,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            mp_draw.DrawingSpec(
                color=(0,255,0),
                thickness=3,
                circle_radius=3
            ),
            mp_draw.DrawingSpec(
                color=(255,0,0),
                thickness=3
            )
        )

    cv2.imshow("AI Pose Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()