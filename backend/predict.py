import sys
import json
import joblib

# Load the model and scaler
model = joblib.load('fall_detection_models.pkl')
scaler = joblib.load('scalers.pkl')

# Read input data from command-line arguments
input_data = json.loads(sys.argv[1])

# Preprocess the input data
input_data_scaled = scaler.transform([input_data])

# Make a prediction
prediction = model.predict(input_data_scaled)

# Return the prediction as JSON
print(json.dumps({"prediction": int(prediction[0])}))