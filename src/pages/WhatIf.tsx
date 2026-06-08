import { useState } from 'react';
import { ToolLayout, DataCard } from '../components/layout/ToolLayout';

export function WhatIf() {
  const [baseline] = useState(2500); // tCO2e
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
              subtitle={`${((totalSaved / baseline) * 100).toFixed(1)}% footprint reduction`}
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
                      style={{ width: `${Math.max(1, (item.value / totalSaved) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </ToolLayout>
  )
}
