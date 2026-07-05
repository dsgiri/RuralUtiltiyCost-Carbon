import { useState } from 'react';
import { ToolLayout, DataCard } from '../components/layout/ToolLayout';

export function WhatIf() {
  const [baseline, setBaseline] = useState(2500); // tCO2e
  const [fertReduction, setFertReduction] = useState(15); // %
  const [fuelReduction, setFuelReduction] = useState(10); // %
  const [feedEfficiency, setFeedEfficiency] = useState(5); // %
  
  // Faux calculation for demo
  const fertAssumedPortion = 0.35; // 35% of total footprint is fertilizer
  const fuelAssumedPortion = 0.15;
  const entericAssumedPortion = 0.40;
  
  const savedFert = baseline * fertAssumedPortion * (fertReduction / 100);
  const savedFuel = baseline * fuelAssumedPortion * (fuelReduction / 100);
  const savedFeed = baseline * entericAssumedPortion * (feedEfficiency / 100);
  
  const totalSaved = savedFert + savedFuel + savedFeed;
  const newFootprint = baseline - totalSaved;

  return (
    <ToolLayout 
      title="What-If Reduction Scenarios"
      description="Adjust practice variables to see how changes impact your whole-farm footprint."
      category="what-if"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-3">Test Scenario Dials</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Baseline Footprint (tCO2e)</label>
              <input 
                type="number" 
                value={baseline} 
                onChange={e => setBaseline(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm mb-4"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Synthetic Fertilizer Reduction</span>
                <span className="text-emerald-600 font-bold">{fertReduction}%</span>
              </label>
              <input 
                type="range" min="0" max="50" step="1"
                value={fertReduction} 
                onChange={e => setFertReduction(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">E.g., via variable rate application</p>
            </div>
            
            <div>
               <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Fuel Usage Reduction</span>
                <span className="text-emerald-600 font-bold">{fuelReduction}%</span>
              </label>
              <input 
                type="range" min="0" max="50" step="1"
                value={fuelReduction} 
                onChange={e => setFuelReduction(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
               <p className="text-[10px] text-slate-500 mt-1">E.g., via fewer passes, equipment upgrades</p>
            </div>
            
            <div>
               <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Enteric/Feed Efficiency Gain</span>
                <span className="text-emerald-600 font-bold">{feedEfficiency}%</span>
              </label>
              <input 
                type="range" min="0" max="30" step="1"
                value={feedEfficiency} 
                onChange={e => setFeedEfficiency(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
               <p className="text-[10px] text-slate-500 mt-1">E.g., via feed additives or improved forage</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <div className="grid sm:grid-cols-2 gap-4">
            <DataCard 
              title="Projected Footprint" 
              value={Math.round(newFootprint).toLocaleString()} 
              unit="tCO2e"
              highlight={true}
              subtitle={`Down from ${baseline.toLocaleString()} tCO2e baseline`}
            />
            <DataCard 
              title="Total Estimated Savings" 
              value={Math.round(totalSaved).toLocaleString()} 
              unit="tCO2e"
              subtitle={`${baseline > 0 ? ((totalSaved / baseline) * 100).toFixed(1) : 0}% footprint reduction`}
            />
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Savings Breakdown</h3>
            <div className="space-y-4">
              {[
                { label: 'Fertilizer (Nitrous Oxide)', value: savedFert, color: 'bg-emerald-400' },
                { label: 'Enteric Fermentation (Methane)', value: savedFeed, color: 'bg-emerald-500' },
                { label: 'Fuel & Electricity (CO2)', value: savedFuel, color: 'bg-emerald-300' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{Math.round(item.value).toLocaleString()} tCO2e saved</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full`} 
                      style={{ width: `${Math.max(1, totalSaved > 0 ? (item.value / totalSaved) * 100 : 0)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Logic & FAQs & Disclaimer */}
      <div className="mt-12 space-y-8">
        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Logic & Formulas</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li><strong>Assumed Baseline Profile:</strong> For demonstration, the tool assumes fertilizer makes up 35%, fuel 15%, and enteric emissions 40% of the baseline footprint.</li>
            <li><strong>Projected Savings:</strong> The percentage reduction applied to the specific emission category (e.g., 10% reduction in fuel usage saves 10% of the fuel-related emissions).</li>
            <li><strong>New Footprint:</strong> Original baseline minus total calculated savings.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm text-slate-700">
            <details className="group border border-slate-200 rounded-lg p-4 cursor-pointer bg-white">
              <summary className="font-medium">Can I customize the baseline profile?</summary>
              <p className="mt-2 text-slate-600">In a full accounting setup, these percentages are derived from your actual Whole-Farm footprint data. This tool uses standard assumptions for scenario planning.</p>
            </details>
            <details className="group border border-slate-200 rounded-lg p-4 cursor-pointer bg-white">
              <summary className="font-medium">Do practice changes guarantee these reductions?</summary>
              <p className="mt-2 text-slate-600">No. Changes like feed additives or variable rate application have complex interactions with weather and biology. These numbers are target estimates based on optimal implementation.</p>
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
