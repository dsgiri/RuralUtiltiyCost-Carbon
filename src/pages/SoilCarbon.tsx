import { useState } from 'react';
import { ToolLayout, DataCard } from '../components/layout/ToolLayout';

export function SoilCarbon() {
  const [acres, setAcres] = useState(1000);
  const [currentSOC, setCurrentSOC] = useState(1.5); // %
  const [targetSOC, setTargetSOC] = useState(2.0); // %
  
  // Very simplified model for informational purposes
  // 1% SOC in top 15cm is roughly 20-30 tonnes of C per ha (~8-12 t/ac)
  // 1 tonne C = 3.67 tonnes CO2e
  const tonnesC_per_ac_per_percent = 10; 
  const currentCarbonStock = acres * currentSOC * tonnesC_per_ac_per_percent;
  const targetCarbonStock = acres * targetSOC * tonnesC_per_ac_per_percent;
  const carbonDelta = targetCarbonStock - currentCarbonStock;
  
  const CO2eDelta = carbonDelta * 3.67;

  return (
    <ToolLayout 
      title="Soil Carbon & Sequestration"
      description="Model potential soil organic carbon (SOC) changes and estimate the greenhouse gas sequestration impact of regenerative practices."
      category="soil-carbon"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-3">Field Parameters</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Area (Acres)</label>
              <input 
                type="number" 
                value={acres} 
                onChange={e => setAcres(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current SOC (%)</label>
              <input 
                type="number" 
                step="0.1"
                value={currentSOC} 
                onChange={e => setCurrentSOC(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target/Projected SOC (%)</label>
              <input 
                type="number" 
                step="0.1"
                value={targetSOC} 
                onChange={e => setTargetSOC(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            Note: Soil carbon modeling is highly dependent on soil type, climate, and measurement depth. This tool uses a simplified bulk density assumption for planning.
          </p>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <DataCard 
              title="Potential CO2e Sequestered" 
              value={Math.round(CO2eDelta).toLocaleString()} 
              unit="tCO2e"
              highlight={true}
              subtitle={`Over transition period to target SOC`}
            />
            <DataCard 
              title="Per Acre Benefit" 
              value={(CO2eDelta / (acres || 1)).toFixed(1)} 
              unit="tCO2e / acre"
              subtitle="Estimated sequestration intensity"
            />
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
             <h3 className="font-semibold text-slate-900 mb-4">Carbon Stock Overview (Tonnes of C)</h3>
             <div className="flex h-12 rounded-lg overflow-hidden border border-slate-200">
               <div 
                  className="bg-slate-300 flex items-center justify-center text-xs font-semibold text-slate-700"
                  style={{ width: `${(currentCarbonStock / Math.max(targetCarbonStock, currentCarbonStock)) * 100}%` }}
               >
                 Baseline: {Math.round(currentCarbonStock).toLocaleString()} tC
               </div>
               {carbonDelta > 0 && (
                 <div 
                    className="bg-emerald-400 flex items-center justify-center text-xs font-semibold text-emerald-900"
                    style={{ width: `${(carbonDelta / targetCarbonStock) * 100}%` }}
                 >
                   +{Math.round(carbonDelta).toLocaleString()} tC
                 </div>
               )}
             </div>
             
             <div className="mt-8 space-y-3">
               <h4 className="text-sm font-semibold text-slate-700">Practices to bridge the gap:</h4>
               <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
                 <li>Implementation of multi-species cover crops during fallow periods</li>
                 <li>Transition to no-till or reduced tillage</li>
                 <li>Integration of rotational livestock grazing</li>
                 <li>Application of compost or managed manure</li>
               </ul>
             </div>
          </div>
        </div>

      </div>
    </ToolLayout>
  )
}
