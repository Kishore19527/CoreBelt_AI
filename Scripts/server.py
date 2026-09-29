from flask import Flask, Response, jsonify
import cv2
from ultralytics import YOLO

app = Flask(__name__)

# =========================================================
# YOLO MODEL
# =========================================================

MODEL_PATH = "../yolov8n.pt"

print("Loading YOLO model...")

model = YOLO(MODEL_PATH)

print("YOLO model loaded successfully.")


# =========================================================
# CAMERA
# =========================================================

CAMERA_URL = "http://10.223.247.225:8080/video"


# =========================================================
# LIVE VIDEO STREAM
# =========================================================

@app.route("/video_feed")
def video_feed():

    def generate():

        cap = cv2.VideoCapture(CAMERA_URL)

        if not cap.isOpened():
            print("ERROR: Could not connect to camera")
            return

        print("Camera connected successfully.")

        while True:

            ret, frame = cap.read()

            if not ret:
                print("ERROR: Failed to read camera frame")
                break

            # ---------------------------------------------
            # YOLO inference
            # ---------------------------------------------

            results = model(frame)

            # ---------------------------------------------
            # Draw detections
            # ---------------------------------------------

            annotated_frame = results[0].plot()

            # ---------------------------------------------
            # Convert to JPEG
            # ---------------------------------------------

            success, buffer = cv2.imencode(
                ".jpg",
                annotated_frame
            )

            if not success:
                continue

            frame_bytes = buffer.tobytes()

            # ---------------------------------------------
            # Send frame to browser
            # ---------------------------------------------

            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n"
                + frame_bytes
                + b"\r\n"
            )

        cap.release()

    return Response(
        generate(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )


# =========================================================
# JSON COMPUTER VISION RESULT
# =========================================================

@app.route("/vision_data")
def vision_data():

    cap = cv2.VideoCapture(CAMERA_URL)

    if not cap.isOpened():

        return jsonify({
            "status": "error",
            "message": "Could not connect to camera"
        }), 500

    ret, frame = cap.read()

    cap.release()

    if not ret:

        return jsonify({
            "status": "error",
            "message": "Could not read camera frame"
        }), 500

    # ---------------------------------------------
    # YOLO inference
    # ---------------------------------------------

    results = model(frame)

    detections = []

    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])

            confidence = float(box.conf[0])

            class_name = model.names[class_id]

            x1, y1, x2, y2 = map(
                int,
                box.xyxy[0]
            )

            detections.append({

                "class": class_name,

                "confidence": round(
                    confidence,
                    3
                ),

                "bounding_box": {

                    "x1": x1,
                    "y1": y1,
                    "x2": x2,
                    "y2": y2
                }
            })


    # ---------------------------------------------
    # JSON response
    # ---------------------------------------------

    return jsonify({

        "status": "success",

        "count": len(detections),

        "detections": detections

    })


# =========================================================
# START SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )