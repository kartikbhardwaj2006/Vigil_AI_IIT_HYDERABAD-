from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI()

# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load models
batch_model = joblib.load("../models/batch_prediction_model.pkl")
anomaly_model = joblib.load("../models/anomaly_detection_model.pkl")


class BatchInput(BaseModel):
    Granulation_Time: float
    Binder_Amount: float
    Drying_Temp: float
    Drying_Time: float
    Compression_Force: float
    Machine_Speed: float
    Lubricant_Conc: float
    Moisture_Content: float
    Tablet_Weight: float


@app.post("/predict_batch")
def predict_batch(data: BatchInput):

    df = pd.DataFrame([data.dict()])

    prediction = batch_model.predict(df)

    return {
        "Hardness": float(prediction[0][0]),
        "Friability": float(prediction[0][1]),
        "Dissolution_Rate": float(prediction[0][2]),
        "Content_Uniformity": float(prediction[0][3])
    }