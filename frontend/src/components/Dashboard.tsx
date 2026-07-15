import { Activity, Battery, Zap, SunMedium } from 'lucide-react';

interface DashboardProps {
  plant: 'Plant 1' | 'Plant 2';
}

export default function Dashboard({ plant }: DashboardProps) {
  const stats = [
    { title: 'Current Efficiency', value: '94.2%', icon: Activity, color: 'text-neonCyan' },
    { title: 'Daily Generation', value: '452 kWh', icon: Zap, color: 'text-yellow-400' },
    { title: 'Peak Irradiation', value: '0.85 W/m²', icon: SunMedium, color: 'text-orange-400' },
    { title: 'System Status', value: 'Optimal', icon: Battery, color: 'text-green-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="glass-panel p-4 flex flex-col gap-3 group hover:border-neonCyan/50 transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-gray-400 text-sm font-medium">{stat.title}</span>
              <Icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
            </div>
            <span className="text-2xl font-bold text-white">{stat.value}</span>
          </div>
        );
      })}
    </div>
  );
}
