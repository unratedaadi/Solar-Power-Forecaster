import { useState } from 'react';
import { Sun, Activity, Zap } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PredictionPanel from './components/PredictionPanel';
import AnalyticsHub from './components/AnalyticsHub';

function App() {
  const [plant, setPlant] = useState<'Plant 1' | 'Plant 2'>('Plant 1');

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0f] to-[#050508] p-6 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neonPurple/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neonCyan/20 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-6">
        {/* Header */}
        <header className="glass-panel p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-neonCyan">
            <Sun className="w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-wider text-white">SOLAR<span className="text-neonCyan">NEXUS</span></h1>
          </div>
          
          {/* Plant Selector */}
          <div className="flex bg-black/40 p-1 rounded-lg border border-glassBorder">
            <button 
              onClick={() => setPlant('Plant 1')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${plant === 'Plant 1' ? 'bg-white/10 text-neonCyan shadow-[0_0_15px_rgba(0,243,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
            >
              Plant 1
            </button>
            <button 
              onClick={() => setPlant('Plant 2')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${plant === 'Plant 2' ? 'bg-white/10 text-neonPurple shadow-[0_0_15px_rgba(188,19,254,0.3)]' : 'text-gray-400 hover:text-white'}`}
            >
              Plant 2
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Dashboard plant={plant} />
            <AnalyticsHub plant={plant} />
          </div>
          <div className="lg:col-span-1">
            <PredictionPanel plant={plant} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
