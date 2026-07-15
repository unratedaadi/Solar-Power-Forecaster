from pydantic import BaseModel, Field

class PredictRequest(BaseModel):
    plant: str = Field(..., description="Plant 1 or Plant 2")
    model_type: str = Field(..., description="The ML model architecture to use")
    ambient_temp: float = Field(..., description="Ambient Temperature")
    module_temp: float = Field(..., description="Module Temperature")
    irradiation: float = Field(..., description="Irradiation")

class PredictResponse(BaseModel):
    predicted_ac_power: float
    model_used: str

class MetricsResponse(BaseModel):
    plant: str
    mae: float
    rmse: float
    r2_score: float
