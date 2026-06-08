import { ToolLayout, DataCard } from '../components/layout/ToolLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export function Benchmark() {
  const data = [
    { name: '2021', intensity: 2.4 },
    { name: '2022', intensity: 2.2 },
    { name: '2023', intensity: 1.9 },
    { name: '2024 (Current)', intensity: 1.6 },
  ];
  
  const regionalAverage = 2.1;
  const current = data[data.length - 1].intensity;
  const gap = regionalAverage - current;

  return (
    <ToolLayout 
      title="Benchmark Comparison"
      description="Compare your farm's carbon intensity over time and against regional industry averages."
      category="benchmarking"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1 space-y-6">
           <DataCard 
            title="Current Performance" 
            value={current.toFixed(2)} 
            unit="tCO2e / acre"
            highlight={true}
            subtitle="Your latest operating period"
          />
          <DataCard 
            title="Regional Benchmark" 
            value={regionalAverage.toFixed(2)} 
            unit="tCO2e / acre"
            subtitle="Aggregated industry average"
          />
          
          <div className={`p-6 rounded-xl border ${gap >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className="text-sm font-medium text-slate-700 mb-1">Performance Gap</h3>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold tracking-tight ${gap >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                {gap >= 0 ? '-' : '+'}{Math.abs(gap).toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-slate-600">tCO2e / acre</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              {gap >= 0 ? 'You are operating below (better than) the regional average.' : 'You are operating above (worse than) the regional average.'}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-8">Carbon Intensity Trend vs Benchmark</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <ReferenceLine y={regionalAverage} stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'top', value: 'Regional Avg', fill: '#64748b', fontSize: 12 }} />
                <Bar dataKey="intensity" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </ToolLayout>
  )
}
