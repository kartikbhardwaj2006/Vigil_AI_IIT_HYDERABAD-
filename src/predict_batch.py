import joblib
import pandas as pd

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

# create dataframe with feature names
data = pd.DataFrame([{
    "Granulation_Time": granulation_time,
    "Binder_Amount": binder_amount,
    "Drying_Temp": drying_temp,
    "Drying_Time": drying_time,
    "Compression_Force": compression_force,
    "Machine_Speed": machine_speed,
    "Lubricant_Conc": lubricant_conc,
    "Moisture_Content": moisture_content,
    "Tablet_Weight": tablet_weight
}])

prediction = model.predict(data)

print("\nPredicted Batch Quality")
print("Hardness:", prediction[0][0])
print("Friability:", prediction[0][1])
print("Dissolution Rate:", prediction[0][2])
print("Content Uniformity:", prediction[0][3])