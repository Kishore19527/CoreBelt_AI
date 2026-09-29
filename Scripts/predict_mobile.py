import cv2
from ultralytics import YOLO

# Load your trained model
model = YOLO('runs/detect/train-11/weights/best.pt')

# Mobile IP camera stream
cap = cv2.VideoCapture('http://10.223.247.225:8080/video')  # replace with your phone's IP

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame")
        break

    # Run YOLO inference
    results = model(frame)
    annotated = results[0].plot()

    # Show output
    cv2.imwrite("frame.jpg", annotated)


    # Exit on ESC key
    if cv2.waitKey(1) == 27:
        break

cap.release()
cv2.destroyAllWindows()
