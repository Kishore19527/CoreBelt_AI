from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import json
import pandas as pd

app = Flask(__name__)
CORS(app)

# ==================================================
# LOAD MODEL
# ==================================================
model = joblib.load("conveyor_sensor_rf_final.pkl")

# ==================================================
# LOAD MAINTENANCE MAPPING
# ==================================================
with open("maintenance_mapping.json", "r") as f:
    maintenance_mapping = json.load(f)

print("==========================================")
print("Conveyor Belt AI Backend Started!")
print("==========================================")
print("Model loaded successfully.")
print("Maintenance mapping loaded successfully.")


# ==================================================
# HOME
# ==================================================
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "online",
        "message": "Conveyor Belt AI Backend is running"
    })


# ==================================================
# PREDICT
# ==================================================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("\n========== NEW PREDICTION ==========")
        print("Received data:", data)

        if data is None:
            raise ValueError("No JSON data received.")

        # ------------------------------------------
        # Map ESP32 keys to model features
        # ------------------------------------------
        speed = float(data.get("speed", data.get("beltSpeed", 0)))
        load = float(data.get("load", data.get("beltTension", 0)))
        temperature = float(data.get("temperature", 0))
        vibration = float(data.get("vibration", 0))
        current = float(data.get("current", 0))  # optional

        # ------------------------------------------
        # Build DataFrame with training feature names
        # ------------------------------------------
        input_data = pd.DataFrame([{
            "Speed (rpm)": speed,
            "Load (kg)": load,
            "Temperature (℃)": temperature,
            "Vibration (m/s²)": vibration,
            "Current (A)": current
        }])

        # ------------------------------------------
        # ML prediction
        # ------------------------------------------
        prediction = model.predict(input_data)[0]
        probabilities = model.predict_proba(input_data)[0]
        confidence = max(probabilities) * 100
        prediction = str(prediction)
        fault_key = prediction.lower()

        print("Predicted fault:", prediction)
        print("Confidence:", round(confidence, 2))

        # ------------------------------------------
        # Maintenance mapping
        # ------------------------------------------
        fault_to_component = maintenance_mapping["fault_to_component"]
        fault_to_maintenance = maintenance_mapping["fault_to_maintenance"]
        component_reliability = maintenance_mapping["component_reliability"]
        maintenance_priority = maintenance_mapping["maintenance_priority"]

        component = fault_to_component.get(fault_key, "Unknown")
        recommendation = fault_to_maintenance.get(fault_key, "No recommendation")

        reliability = {}
        for item in component_reliability:
            if isinstance(item, dict) and item.get("Component") == component:
                reliability = {
                    "TBF (hrs)": item.get("TBF (hrs)"),
                    "MTTF (hrs, β=2)": item.get("MTTF (hrs, β=2)")
                }
                break

        priority = "Unknown"
        for item in maintenance_priority:
            if isinstance(item, dict) and item.get("Component") == component:
                priority = item.get("Maintenance Priority", "Unknown")
                break

        # ------------------------------------------
        # Final response
        # ------------------------------------------
        response = {
            "status": "success",
            "fault": prediction,
            "confidence": round(confidence, 2),
            "component": component,
            "maintenance_priority": priority,
            "recommendation": recommendation,
            "reliability": reliability,
            "sensor_data": {
                "speed": speed,
                "load": load,
                "temperature": temperature,
                "vibration": vibration,
                "current": current
            }
        }

        print("Prediction completed successfully.")
        return jsonify(response)

    except Exception as e:
        print("\n!!!!!!!!!! PREDICTION ERROR !!!!!!!!!!")
        print(type(e).__name__)
        print(str(e))
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

        return jsonify({
            "status": "error",
            "error_type": type(e).__name__,
            "error": str(e)
        }), 400


# ==================================================
# RUN SERVER
# ==================================================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
