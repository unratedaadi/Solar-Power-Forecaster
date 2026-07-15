from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import PredictRequest, PredictResponse, MetricsResponse
from ml_utils import load_or_mock_predict

app = FastAPI(
    title="Solar Power Prediction API",
    description="API for serving ML models for Solar Power Generation Forecasting"
)

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"status": "healthy", "service": "Solar Power Prediction API"}

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    # Extract features in the expected order
    features = [req.ambient_temp, req.module_temp, req.irradiation]
    
    # Run prediction
    prediction = load_or_mock_predict(req.model_type, features)
    
    return PredictResponse(
        predicted_ac_power=prediction,
        model_used=req.model_type
    )

@app.get("/metrics/{plant_id}", response_model=MetricsResponse)
def get_metrics(plant_id: str):
    # Mock metrics - in real scenario, this would aggregate from a DB or pre-calculated file
    if plant_id == "plant1":
        return MetricsResponse(plant="Plant 1", mae=15.4, rmse=28.2, r2_score=0.94)
    else:
        return MetricsResponse(plant="Plant 2", mae=12.1, rmse=24.5, r2_score=0.96)
