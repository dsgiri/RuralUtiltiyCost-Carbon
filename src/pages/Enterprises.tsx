import { useState } from 'react';
import { ToolLayout, DataCard } from '../components/layout/ToolLayout';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export function Enterprises() {
  const [dairy, setDairy] = useState<number>(1200);
  const [crops, setCrops] = useState<number>(850);
  const [beef, setBeef] = useState<number>(400);
  const [orchard, setOrchard] = useState<number>(50);

  const data = [
    { name: 'Dairy Operations', value: dairy },
    { name: 'Row Crops (Corn/Soy)', value: crops },
    { name: 'Beef Cattle', value: beef },
    { name: 'Orchard / Permanent Crops', value: orchard },
  ].filter(d => d.value > 0);
  
  const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <ToolLayout 
      title="Enterprise Emissions Breakout"
      description="Compare and allocate carbon responsibility across specific farm enterprises."
      category="enterprise"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-3">Enterprises (tCO2e)</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Dairy Operations</label>
              <input 
                type="number" 
                value={dairy} 
                onChange={e => setDairy(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Row Crops</label>
              <input 
                type="number" 
                value={crops} 
                onChange={e => setCrops(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Beef Cattle</label>
              <input 
                type="number" 
                value={beef} 
                onChange={e => setBeef(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Orchard</label>
              <input 
                type="number" 
                value={orchard} 
                onChange={e => setOrchard(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-2 space-y-6">
          <DataCard 
            title="Total Allocated Emissions" 
            value={total.toLocaleString()} 
            unit="tCO2e"
            highlight={true}
            subtitle="Across all tracked enterprises"
          />
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Enterprise Breakdown</h3>
              <div className="space-y-4">
                {data.map((entry, index) => (
                  <div key={entry.name} className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length]}}></div>
                        <span className="text-sm font-medium text-slate-700">{entry.name}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-800">{entry.value.toLocaleString()} tCO2e</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500 pl-5">
                      <span>{total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0}% of total</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col">
              <h3 className="font-semibold text-slate-900 mb-2">Proportional Share</h3>
              <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [`${Math.round(value)} tCO2e`, 'Emissions']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Logic & FAQs & Disclaimer */}
      <div className="mt-12 space-y-8">
        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Logic & Formulas</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li><strong>Total Emissions:</strong> Sum of all individual enterprise emissions.</li>
            <li><strong>Proportional Share:</strong> Individual enterprise emissions divided by the total, expressed as a percentage.</li>
            <li><strong>Allocation Methodology:</strong> Physical or economic allocation as defined by the user inputs.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm text-slate-700">
            <details className="group border border-slate-200 rounded-lg p-4 cursor-pointer bg-white">
              <summary className="font-medium">Why do we allocate emissions by enterprise?</summary>
              <p className="mt-2 text-slate-600">Allocating emissions helps identify which specific parts of your operation are driving the majority of your footprint, allowing for targeted reduction strategies.</p>
            </details>
            <details className="group border border-slate-200 rounded-lg p-4 cursor-pointer bg-white">
              <summary className="font-medium">Should I use economic or physical allocation?</summary>
              <p className="mt-2 text-slate-600">Physical allocation (e.g., by mass or energy) is often preferred for environmental assessments, but economic allocation (by revenue) is sometimes used when physical relationships are complex.</p>
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
