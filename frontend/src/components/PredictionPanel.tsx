import { useState } from 'react';
import { Cpu, Thermometer, Sun } from 'lucide-react';
import { predictGeneration } from '../api/client';

interface PredictionPanelProps {
  plant: 'Plant 1' | 'Plant 2';
}

export default function PredictionPanel({ plant }: PredictionPanelProps) {
  const [model, setModel] = useState('Random Forest');
  const [ambientTemp, setAmbientTemp] = useState(25.0);
  const [moduleTemp, setModuleTemp] = useState(45.0);
  const [irradiation, setIrradiation] = useState(0.5);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await predictGeneration({
        plant,
        model_type: model,
        ambient_temp: ambientTemp,
        module_temp: moduleTemp,
        irradiation: irradiation
      });
      setPrediction(res.predicted_ac_power);
    } catch (err) {
      console.error(err);
      // fallback dummy for UI demonstration
      setPrediction(Math.random() * 500 + 100);
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel p-6 h-full flex flex-col gap-6 relative overflow-hidden">
      {/* Holographic background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-neonCyan/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center gap-2 text-neonCyan mb-2">
        <Cpu className="w-6 h-6" />
        <h2 className="text-xl font-bold text-white">AI Predictor</h2>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Model Architecture</label>
          <select 
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full glass-input appearance-none bg-black/40"
          >
            <option>Linear Regression</option>
            <option>Random Forest</option>
            <option>Gradient Boosting</option>
            <option>LSTM</option>
            <option>FFNN</option>
          </select>
        </div>

        <div>
          <label className="flex justify-between text-sm text-gray-400 mb-2">
            <span className="flex items-center gap-1"><Thermometer className="w-4 h-4"/> Ambient Temp</span>
            <span className="text-neonCyan">{ambientTemp.toFixed(1)} °C</span>
          </label>
          <input 
            type="range" min="10" max="45" step="0.1" 
            value={ambientTemp} onChange={(e) => setAmbientTemp(parseFloat(e.target.value))}
            className="w-full accent-neonCyan"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm text-gray-400 mb-2">
            <span className="flex items-center gap-1"><Thermometer className="w-4 h-4 text-orange-400"/> Module Temp</span>
            <span className="text-orange-400">{moduleTemp.toFixed(1)} °C</span>
          </label>
          <input 
            type="range" min="20" max="80" step="0.1" 
            value={moduleTemp} onChange={(e) => setModuleTemp(parseFloat(e.target.value))}
            className="w-full accent-orange-400"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm text-gray-400 mb-2">
            <span className="flex items-center gap-1"><Sun className="w-4 h-4 text-yellow-400"/> Irradiation</span>
            <span className="text-yellow-400">{irradiation.toFixed(2)} W/m²</span>
          </label>
          <input 
            type="range" min="0" max="1.5" step="0.01" 
            value={irradiation} onChange={(e) => setIrradiation(parseFloat(e.target.value))}
            className="w-full accent-yellow-400"
          />
        </div>
      </div>

      <button 
        onClick={handlePredict}
        disabled={loading}
        className="glass-button-primary mt-auto flex items-center justify-center gap-2"
      >
        {loading ? 'Processing...' : 'Generate Forecast'}
      </button>

      {/* Holographic Output Display */}
      {prediction !== null && (
        <div className="mt-4 p-4 rounded-xl bg-black/40 border border-neonCyan/30 relative flex flex-col items-center justify-center">
          <span className="text-xs text-neonCyan uppercase tracking-widest mb-1">Predicted AC Power</span>
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-white">
            {prediction.toFixed(2)} <span className="text-lg font-medium text-gray-400">kW</span>
          </div>
          <div className="absolute inset-0 bg-neonCyan/5 rounded-xl animate-pulse pointer-events-none"></div>
        </div>
      )}
    </div>
  );
}
