from ultralytics import YOLO

# Load the trained model (best checkpoint)
model = YOLO("runs/detect/train-11/weights/best.pt")

# --- Choose your source ---
# For test images folder:
source = "C:/Users/KISHORE/Documents/Projects/ComputerVisionAI/conveyor_dataset/test/images"

# For webcam (default camera):
# source = 0

# Run prediction
results = model.predict(
    source=source,   # test images or webcam
    conf=0.5,        # confidence threshold
    show=True,       # display results
    save=True        # save annotated outputs in runs/detect/predict/
)

# Optional: print summary of detections
for r in results:
     for box in r.boxes:
        cls_id = int(box.cls)
        conf = float(box.conf)
        print(f"Detected {r.names[cls_id]} with {conf:.2f} confidence")
