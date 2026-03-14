# 🚀 VIGIL-AI

### 🧠 AI-Powered Manufacturing Intelligence Platform

**VIGIL-AI** is a smart manufacturing intelligence system that predicts **pharmaceutical tablet batch quality** and detects **machine anomalies** using Machine Learning.

It combines **Machine Learning models, a FastAPI backend, and a React dashboard** to simulate a real **AI-driven factory monitoring system**.

This project was developed as part of an **AI/ML Hackathon prototype** to demonstrate how AI can improve manufacturing quality and efficiency.

---

# 🎯 Project Goal

Modern manufacturing generates large amounts of process data.
However, engineers often struggle to predict **batch quality** before production completes.

VIGIL-AI solves this problem by using **AI models** to:

✅ Predict tablet quality before production finishes
✅ Detect abnormal machine behavior
✅ Reduce defective batches
✅ Assist manufacturing engineers in decision-making

---

# 🏭 System Architecture

```text
React Dashboard
       │
       ▼
FastAPI Backend
       │
       ▼
Machine Learning Models
(Random Forest + Isolation Forest)
```

---

# ⚙️ Key Features

## 📊 1. Batch Quality Prediction

Predicts important tablet quality parameters using manufacturing process data.

### 🔢 Input Parameters

* ⏱ Granulation Time
* 🧪 Binder Amount
* 🌡 Drying Temperature
* ⏳ Drying Time
* 💪 Compression Force
* ⚙️ Machine Speed
* 💧 Lubricant Concentration
* 🌊 Moisture Content
* ⚖️ Tablet Weight

### 📈 Predicted Outputs

* 💎 Hardness
* 🧱 Friability
* ⚗️ Dissolution Rate
* 📊 Content Uniformity

The system automatically shows **PASS / FAIL batch quality results**.

---

## ⚠️ 2. Machine Anomaly Detection

Detects abnormal machine behavior using sensor data.

### 🔍 Sensor Data

* 🌡 Temperature
* 🧪 Pressure
* 💧 Humidity
* ⚙️ Motor Speed
* 🌊 Flow Rate
* ⚡ Power Consumption
* 📡 Vibration

Using **Isolation Forest**, the system identifies unusual machine activity.

This helps with:

✅ Early fault detection
✅ Predictive maintenance
✅ Energy anomaly monitoring

---

# 🧠 Machine Learning Models

## 🌲 Random Forest Regressor

Used for **multi-target prediction** of tablet quality.

Model:

```text
RandomForestRegressor + MultiOutputRegressor
```

Predicts multiple outputs simultaneously:

* Hardness
* Friability
* Dissolution Rate
* Content Uniformity

---

## 🚨 Isolation Forest

Used for **unsupervised anomaly detection**.

It detects unusual patterns in machine sensor data that may indicate:

* Equipment failure
* Energy anomalies
* Abnormal operating conditions

---

# 🛠 Tech Stack

## 🐍 Backend

* Python
* FastAPI
* Pandas
* NumPy
* Scikit-learn
* Joblib

---

## ⚛️ Frontend

* React
* Axios
* CSS Dashboard UI

Features:

🌙 Dark / Light Mode
📊 Interactive Dashboard
⚡ Real-time AI predictions

---

## 🤖 Machine Learning

Libraries used:

* RandomForestRegressor
* MultiOutputRegressor
* IsolationForest

---

# 📂 Project Structure

```text
VIGIL_AI_HACKATHON
│
├── backend
│   └── main.py
│
├── frontend
│   ├── src
│   │   ├── ManufacturingDashboard.js
│   │   ├── ManufacturingDashboard.css
│   │   └── App.js
│
├── models
│   ├── batch_prediction_model.pkl
│   └── anomaly_detection_model.pkl
│
├── data
│   ├── batch_data.xlsx
│   └── sensor_data.xlsx
│
└── notebook
    └── vigil_ai_training.ipynb
```

---

# ▶️ How to Run the Project

## 1️⃣ Start Backend (FastAPI)

Go to backend folder:

```bash
cd backend
```

Run server:

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

API documentation:

```
http://localhost:8000/docs
```

---

## 2️⃣ Start Frontend (React)

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React app:

```bash
npm start
```

Open in browser:

```
http://localhost:3000
```

---

# 🔬 Example Prediction

### 🧾 Input

```
Granulation Time: 16
Binder Amount: 9
Drying Temperature: 60
Drying Time: 28
Compression Force: 12
Machine Speed: 165
Lubricant Concentration: 1.2
Moisture Content: 2
Tablet Weight: 202
```

### 📊 AI Prediction

```
Hardness: 91 N
Friability: 0.73 %
Dissolution Rate: 90 %
Content Uniformity: 98 %
```

### ✅ Result

```
Batch Approved
```

---

# 🌍 Applications

VIGIL-AI can be used in:

🏭 Pharmaceutical manufacturing
🏭 Smart factories
🏭 Industry 4.0 monitoring systems
🔧 Predictive maintenance systems
📊 AI-based quality control

---

# 🔮 Future Improvements

Possible upgrades:

✨ Real-time IoT sensor integration
✨ AI explainability dashboard
✨ Cloud deployment
✨ Production monitoring system
✨ Advanced analytics

---

# 👨‍💻 Author

**Kartik Bhardwaj**
