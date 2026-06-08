import { ToolLayout, DataCard } from '../components/layout/ToolLayout';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export function Enterprises() {
  const data = [
    { name: 'Dairy Operations', value: 1200 },
    { name: 'Row Crops (Corn/Soy)', value: 850 },
    { name: 'Beef Cattle', value: 400 },
    { name: 'Orchard / Permanent Crops', value: 50 },
  ];
  
  const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <ToolLayout 
      title="Enterprise Emissions Breakout"
      description="Compare and allocate carbon responsibility across specific farm enterprises."
      category="enterprise"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        
        <div className="space-y-6">
          <DataCard 
            title="Total Allocated Emissions" 
            value={total.toLocaleString()} 
            unit="tCO2e"
            highlight={true}
            subtitle="Across all tracked enterprises"
          />
          
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
                    <span>{((entry.value / total) * 100).toFixed(1)}% of total</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                <span className="text-slate-500">Methodology</span>
                <span className="font-medium text-slate-700">Economic Allocation</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col">
          <h3 className="font-semibold text-slate-900 mb-2">Proportional Share</h3>
          <p className="text-xs text-slate-500 mb-8">Visual breakdown of emissions assigned to separate business units.</p>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
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
    </ToolLayout>
  )
}
