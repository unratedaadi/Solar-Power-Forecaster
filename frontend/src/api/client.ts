// Note: using fetch to avoid requiring axios as it wasn't pre-installed by the template if npm failed.

const API_URL = 'http://localhost:8000';

export interface PredictRequest {
  plant: string;
  model_type: string;
  ambient_temp: number;
  module_temp: number;
  irradiation: number;
}

export interface PredictResponse {
  predicted_ac_power: number;
  model_used: string;
}

export async function predictGeneration(data: PredictRequest): Promise<PredictResponse> {
  const res = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch prediction');
  }
  
  return res.json();
}
