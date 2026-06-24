import cv2
import mediapipe as mp
import numpy as np
import json

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

counter = 0
stage = "down"

def calculate_angle(a, b, c):

    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    radians = np.arctan2(
        c[1] - b[1],
        c[0] - b[0]
    ) - np.arctan2(
        a[1] - b[1],
        a[0] - b[0]
    )

    angle = np.abs(radians * 180.0 / np.pi)

    if angle > 180:
        angle = 360 - angle

    return angle

while True:

    success, frame = cap.read()

    if not success:
        break

    # Flip camera
    frame = cv2.flip(frame, 1)

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = pose.process(rgb)

    try:
        if not results.pose_landmarks:
            continue

        landmarks = results.pose_landmarks.landmark

        # RIGHT ARM LANDMARKS
        shoulder = [
            landmarks[
                mp_pose.PoseLandmark.RIGHT_SHOULDER.value
            ].x,
            landmarks[
                mp_pose.PoseLandmark.RIGHT_SHOULDER.value
            ].y
        ]

        elbow = [
            landmarks[
                mp_pose.PoseLandmark.RIGHT_ELBOW.value
            ].x,
            landmarks[
                mp_pose.PoseLandmark.RIGHT_ELBOW.value
            ].y
        ]

        wrist = [
            landmarks[
                mp_pose.PoseLandmark.RIGHT_WRIST.value
            ].x,
            landmarks[
                mp_pose.PoseLandmark.RIGHT_WRIST.value
            ].y
        ]

        # Calculate angle
        angle = calculate_angle(
            shoulder,
            elbow,
            wrist
        )

        # Display angle
        cv2.putText(
            frame,
            str(int(angle)),
            tuple(
                np.multiply(
                    elbow,
                    [1280, 720]
                ).astype(int)
            ),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (255,255,255),
            2,
            cv2.LINE_AA
        )

        # REP COUNT LOGIC
        if angle > 160:
            stage = "down"

        if angle < 40 and stage == "down":
            stage = "up"
            counter += 1

        # SAVE LIVE DATA
        live_data = {
            "reps": counter,
            "stage": stage
        }

        with open("live_data.json", "w") as file:
            json.dump(live_data, file)

    except Exception as e:
        print(e)

    # UI PANEL
    cv2.rectangle(
        frame,
        (0,0),
        (320,130),
        (0,0,0),
        -1
    )

    # REPS
    cv2.putText(
        frame,
        "REPS",
        (15,35),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (255,255,255),
        2
    )

    cv2.putText(
        frame,
        str(counter),
        (20,100),
        cv2.FONT_HERSHEY_SIMPLEX,
        2,
        (0,255,0),
        3
    )

    # STAGE
    cv2.putText(
        frame,
        "STAGE",
        (170,35),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (255,255,255),
        2
    )

    cv2.putText(
        frame,
        str(stage),
        (170,100),
        cv2.FONT_HERSHEY_SIMPLEX,
        2,
        (0,255,255),
        3
    )

    # DRAW LANDMARKS
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

    cv2.imshow(
        "AI Rep Counter",
        frame
    )

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()