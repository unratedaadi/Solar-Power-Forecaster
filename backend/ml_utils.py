import random
import os
# import joblib
# from keras.models import load_model

MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')

# In a real scenario, you'd load the models here
# models = {
#     'Random Forest': joblib.load(os.path.join(MODEL_DIR, 'rf_model.pkl')),
#     'LSTM': load_model(os.path.join(MODEL_DIR, 'lstm_model.h5'))
# }

def load_or_mock_predict(model_type: str, features: list) -> float:
    """
    Dummy prediction function. 
    In production, this would do:
    model = models.get(model_type)
    return model.predict([features])[0]
    """
    
    # Mocking a prediction based loosely on inputs to look realistic
    ambient, module, irrad = features
    
    # Simple linear combination for mock purposes
    base_power = (irrad * 800) - (module * 2) + (ambient * 0.5)
    
    # Add some noise based on model type
    noise_factors = {
        'Linear Regression': 1.0,
        'Random Forest': 0.95,
        'Gradient Boosting': 1.05,
        'LSTM': 1.02,
        'FFNN': 0.98
    }
    
    factor = noise_factors.get(model_type, 1.0)
    final_pred = max(0, base_power * factor + random.uniform(-10, 10))
    
    return round(final_pred, 2)
