import { useState } from 'react';
import { ToolLayout, DataCard } from '../components/layout/ToolLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export function Benchmark() {
  const [currentIntensity, setCurrentIntensity] = useState<number>(1.6);
  const [regionalAverage, setRegionalAverage] = useState<number>(2.1);

  const data = [
    { name: '2021', intensity: 2.4 },
    { name: '2022', intensity: 2.2 },
    { name: '2023', intensity: 1.9 },
    { name: '2024 (Current)', intensity: currentIntensity },
  ];
  
  const gap = regionalAverage - currentIntensity;

  return (
    <ToolLayout 
      title="Benchmark Comparison"
      description="Compare your farm's carbon intensity over time and against regional industry averages."
      category="benchmarking"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-3">Benchmark Parameters</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Your Current Intensity (tCO2e/ac)</label>
              <input 
                type="number" 
                step="0.1"
                value={currentIntensity} 
                onChange={e => setCurrentIntensity(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Regional Average (tCO2e/ac)</label>
              <input 
                type="number" 
                step="0.1"
                value={regionalAverage} 
                onChange={e => setRegionalAverage(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <DataCard 
              title="Current Performance" 
              value={currentIntensity.toFixed(2)} 
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
          </div>
          
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

          <div className="bg-white p-6 rounded-xl border border-slate-200">
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

      </div>

      {/* Logic & FAQs & Disclaimer */}
      <div className="mt-12 space-y-8">
        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Logic & Formulas</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li><strong>Carbon Intensity:</strong> Measured as tonnes of CO2 equivalent (tCO2e) per acre.</li>
            <li><strong>Performance Gap:</strong> Regional Average minus Current Intensity. A positive gap means you are below the average (better), while a negative gap means you are above (worse).</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm text-slate-700">
            <details className="group border border-slate-200 rounded-lg p-4 cursor-pointer bg-white">
              <summary className="font-medium">Where do regional averages come from?</summary>
              <p className="mt-2 text-slate-600">Regional averages are typically aggregated from university extension data, government agricultural census data, and anonymized industry benchmarking groups.</p>
            </details>
            <details className="group border border-slate-200 rounded-lg p-4 cursor-pointer bg-white">
              <summary className="font-medium">Why use intensity instead of absolute emissions?</summary>
              <p className="mt-2 text-slate-600">Carbon intensity normalizes emissions against farm size or production volume, allowing for fair comparison between operations of vastly different scales.</p>
            </details>
          </div>
        </section>

        <section className="text-xs text-slate-500 border-t border-slate-200 pt-6">
          <p><strong>Disclaimer:</strong> All calculations are for informational and planning purposes only and do not replace formal scientific, regulatory, or financial accounting.</p>
        </section>
      </div>
    </ToolLayout>
  )
}
