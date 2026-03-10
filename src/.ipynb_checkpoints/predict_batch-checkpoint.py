import joblib
import numpy as np

# load trained model
model = joblib.load("models/batch_prediction_model.pkl")

print("VIGIL-AI Batch Prediction System")

granulation_time = float(input("Granulation Time: "))
binder_amount = float(input("Binder Amount: "))
drying_temp = float(input("Drying Temp: "))
drying_time = float(input("Drying Time: "))
compression_force = float(input("Compression Force: "))
machine_speed = float(input("Machine Speed: "))
lubricant_conc = float(input("Lubricant Conc: "))
moisture_content = float(input("Moisture Content: "))
tablet_weight = float(input("Tablet Weight: "))

data = np.array([[granulation_time,
                  binder_amount,
                  drying_temp,
                  drying_time,
                  compression_force,
                  machine_speed,
                  lubricant_conc,
                  moisture_content,
                  tablet_weight]])

prediction = model.predict(data)

print("\nPredicted Batch Quality")
print("Hardness:", prediction[0][0])
print("Friability:", prediction[0][1])
print("Dissolution Rate:", prediction[0][2])
print("Content Uniformity:", prediction[0][3])