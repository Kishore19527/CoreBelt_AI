import os
from ultralytics import YOLO

# Print the current working directory to debug path issues
print("Current working directory:", os.getcwd())

# Load a pre-trained YOLOv8 model (nano version for speed)
model = YOLO("yolov8n.pt")

# Train on your dataset (absolute path avoids confusion)
model.train(
    data="C:/Users/KISHORE/Documents/Projects/ComputerVisionAI/conveyor_dataset/data.yaml",
    epochs=50,
    imgsz=640,
    batch=16
)
