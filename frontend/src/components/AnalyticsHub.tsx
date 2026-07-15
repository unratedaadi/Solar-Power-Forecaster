import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';

interface AnalyticsHubProps {
  plant: 'Plant 1' | 'Plant 2';
}

const mockTimeSeriesData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  irradiation: Math.sin((i - 6) * Math.PI / 12) > 0 ? Math.sin((i - 6) * Math.PI / 12) : 0,
  power: Math.sin((i - 6) * Math.PI / 12) > 0 ? (Math.sin((i - 6) * Math.PI / 12) * 500) + Math.random() * 50 : 0
}));

const mockPerformanceData = [
  { name: 'Linear Reg', R2: 0.85, RMSE: 45 },
  { name: 'Random Forest', R2: 0.94, RMSE: 28 },
  { name: 'Grad Boost', R2: 0.96, RMSE: 22 },
  { name: 'LSTM', R2: 0.97, RMSE: 18 },
  { name: 'FFNN', R2: 0.95, RMSE: 24 },
];

export default function AnalyticsHub({ plant }: AnalyticsHubProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-neonPurple" />
          <h3 className="text-lg font-semibold">Irradiation vs Power</h3>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockTimeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis yAxisId="left" stroke="#00f3ff" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#bc13fe" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Line yAxisId="left" type="monotone" dataKey="power" stroke="#00f3ff" strokeWidth={2} dot={false} name="AC Power (kW)" />
              <Line yAxisId="right" type="monotone" dataKey="irradiation" stroke="#bc13fe" strokeWidth={2} dot={false} name="Irradiation (W/m²)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-neonCyan" />
          <h3 className="text-lg font-semibold">Model Performance Matrix (R²)</h3>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={11} angle={-20} textAnchor="end" />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} domain={[0.8, 1]} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(0,243,255,0.3)', borderRadius: '8px' }}
              />
              <Bar dataKey="R2" fill="#00f3ff" radius={[4, 4, 0, 0]} name="R² Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
