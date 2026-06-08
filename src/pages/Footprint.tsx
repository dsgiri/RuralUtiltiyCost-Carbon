import { useState } from 'react';
import { ToolLayout, DataCard } from '../components/layout/ToolLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Footprint() {
  const [farmSize, setFarmSize] = useState<number>(1500);
  const [electricity, setElectricity] = useState<number>(45000); // kWh
  const [diesel, setDiesel] = useState<number>(3000); // gallons
  const [fertilizer, setFertilizer] = useState<number>(120); // tons
  const [livestock, setLivestock] = useState<number>(200); // head

  // Faux emission factors (for informational use)
  const efElectricity = 0.4; // kg CO2e per kWh
  const efDiesel = 10.2; // kg CO2e per gallon
  const efFertilizer = 3000; // kg CO2e per ton (manufacturing + n2o)
  const efLivestock = 2500; // kg CO2e per head enteric

  const emElectricity = (electricity * efElectricity) / 1000; // tonnes CO2e
  const emDiesel = (diesel * efDiesel) / 1000;
  const emFertilizer = (fertilizer * efFertilizer) / 1000;
  const emLivestock = (livestock * efLivestock) / 1000;
  
  const totalEmissions = emElectricity + emDiesel + emFertilizer + emLivestock;
  const intensity = farmSize > 0 ? totalEmissions / farmSize : 0;

  const chartData = [
    { name: 'Jan', emissions: totalEmissions * 0.08 },
    { name: 'Feb', emissions: totalEmissions * 0.07 },
    { name: 'Mar', emissions: totalEmissions * 0.09 },
    { name: 'Apr', emissions: totalEmissions * 0.12 },
    { name: 'May', emissions: totalEmissions * 0.15 },
    { name: 'Jun', emissions: totalEmissions * 0.11 },
    { name: 'Jul', emissions: totalEmissions * 0.08 },
    { name: 'Aug', emissions: totalEmissions * 0.07 },
    { name: 'Sep', emissions: totalEmissions * 0.08 },
    { name: 'Oct', emissions: totalEmissions * 0.09 },
    { name: 'Nov', emissions: totalEmissions * 0.04 },
    { name: 'Dec', emissions: totalEmissions * 0.02 },
  ];

  return (
    <ToolLayout 
      title="Whole-Farm Carbon Footprint"
      description="Estimate your complete greenhouse gas emissions across all farm operations to understand your baseline impact."
      category="whole-farm"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-3">Operational Inputs</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Farm Size (Acres)</label>
              <input 
                type="number" 
                value={farmSize} 
                onChange={e => setFarmSize(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Electricity Use (kWh/yr)</label>
              <input 
                type="number" 
                value={electricity} 
                onChange={e => setElectricity(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Diesel Fuel (gals/yr)</label>
              <input 
                type="number" 
                value={diesel} 
                onChange={e => setDiesel(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Synthetic Fertilizer (tons/yr)</label>
              <input 
                type="number" 
                value={fertilizer} 
                onChange={e => setFertilizer(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Livestock (head)</label>
              <input 
                type="number" 
                value={livestock} 
                onChange={e => setLivestock(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <DataCard 
              title="Total Estimated Emissions" 
              value={Math.round(totalEmissions).toLocaleString()} 
              unit="tCO2e / yr"
              highlight={true}
              subtitle="Scope 1 & 2 operational footprint"
            />
            <DataCard 
              title="Carbon Intensity" 
              value={intensity.toFixed(2)} 
              unit="tCO2e / acre"
              subtitle="Emissions normalized by land area"
            />
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-6">Emissions by Source (tCO2e)</h3>
            <div className="space-y-4">
              {[
                { label: 'Enteric & Manure (Livestock)', value: emLivestock, color: 'bg-emerald-500' },
                { label: 'Synthetic Fertilizer (N2O)', value: emFertilizer, color: 'bg-emerald-400' },
                { label: 'Diesel & Fuel', value: emDiesel, color: 'bg-emerald-300' },
                { label: 'Electricity (Grid)', value: emElectricity, color: 'bg-slate-300' },
              ].sort((a,b) => b.value - a.value).map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{Math.round(item.value).toLocaleString()} tCO2e</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full`} 
                      style={{ width: `${Math.max(2, (item.value / totalEmissions) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 h-80">
            <h3 className="font-semibold text-slate-900 mb-4">Estimated Monthly Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${Math.round(value)} tCO2e`, 'Emissions']}
                />
                <Area 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorEmissions)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </ToolLayout>
  )
}
