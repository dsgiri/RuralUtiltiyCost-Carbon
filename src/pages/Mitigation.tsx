import { useState } from 'react';
import { ToolLayout } from '../components/layout/ToolLayout';
import { ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Mitigation() {
  const [farmType, setFarmType] = useState('all');

  const allStrategies = [
    {
      area: "Nutrient Management",
      title: "Variable Rate Nitrogen Application",
      description: "Match fertilizer rates to exact crop needs spatially to minimize nitrous oxide emissions from excess application.",
      impact: "High",
      difficulty: "Medium",
      tags: ['crops', 'all']
    },
    {
      area: "Livestock",
      title: "Feed Additives & Forage Quality",
      description: "Implement specialized feed additives (e.g., specific lipids, seaweed extracts) to suppress methanogenesis in ruminants.",
      impact: "High",
      difficulty: "High",
      tags: ['livestock', 'all']
    },
    {
      area: "Energy & Fuel",
      title: "Electrification of Irrigation",
      description: "Transition diesel or propane irrigation motors to electric, ideally paired with a renewable energy source.",
      impact: "Medium",
      difficulty: "Medium",
      tags: ['crops', 'all']
    },
    {
      area: "Manure Management",
      title: "Covered Lagoons & Flaring",
      description: "Cover anaerobic lagoons to capture methane and flare it (or use for power), converting CH4 (GWP 28) to CO2 (GWP 1).",
      impact: "Very High",
      difficulty: "High",
      tags: ['livestock', 'all']
    },
    {
      area: "Soil Management",
      title: "Reduced Tillage",
      description: "Minimize soil disturbance to prevent the oxidation of soil organic carbon and reduce tractor fuel usage.",
      impact: "Low/Medium",
      difficulty: "Low",
      tags: ['crops', 'all']
    }
  ];

  const strategies = allStrategies.filter(s => s.tags.includes(farmType));

  return (
    <ToolLayout 
      title="Mitigation Planner"
      description="Identify structural and operational opportunities to lower your carbon footprint."
      category="mitigation"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-xl border border-slate-200 h-fit">
          <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-3">Operation Focus</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Primary Farm Type</label>
              <select 
                value={farmType}
                onChange={(e) => setFarmType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white"
              >
                <option value="all">Mixed / All Operations</option>
                <option value="crops">Row & Permanent Crops</option>
                <option value="livestock">Livestock & Dairy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 p-4 bg-orange-50 text-orange-900 rounded-xl border border-orange-200">
             <div className="bg-orange-100 p-2 rounded-full">
               <Flame className="w-5 h-5 text-orange-600" />
             </div>
             <div>
               <h3 className="font-semibold text-sm">Primary Hotspot Detected</h3>
               <p className="text-xs text-orange-700 mt-0.5">Based on generic averages, Methane and Nitrous Oxide typically constitute &gt;60% of rural agricultural emissions.</p>
             </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {strategies.map((strategy) => (
              <div key={strategy.title} className="bg-white border border-slate-200 p-5 rounded-xl hover:shadow-sm transition-shadow group flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    {strategy.area}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                    Difficulty: {strategy.difficulty}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-lg mb-2">{strategy.title}</h4>
                <p className="text-slate-600 text-sm flex-1 leading-relaxed">{strategy.description}</p>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Est. Impact: <strong className="text-slate-800">{strategy.impact}</strong></span>
                  <Link to="/what-if" className="text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center">
                    Test Scenario <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logic & FAQs & Disclaimer */}
      <div className="mt-12 space-y-8">
        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Logic & Formulas</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li><strong>Impact Assessment:</strong> Strategies are classified into Low, Medium, High, and Very High impact based on generalized potential to reduce total tCO2e for an average operation.</li>
            <li><strong>Difficulty Assessment:</strong> Strategies are rated based on required capital investment, operational disruption, and management intensity.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm text-slate-700">
            <details className="group border border-slate-200 rounded-lg p-4 cursor-pointer bg-white">
              <summary className="font-medium">Which strategy should I prioritize?</summary>
              <p className="mt-2 text-slate-600">Generally, prioritize strategies that target your largest emission sources (your hotspots) and offer a favorable return on investment or co-benefits (e.g., fuel savings).</p>
            </details>
            <details className="group border border-slate-200 rounded-lg p-4 cursor-pointer bg-white">
              <summary className="font-medium">Are there funding programs for these practices?</summary>
              <p className="mt-2 text-slate-600">Many regions offer EQIP (Environmental Quality Incentives Program) or other conservation grants that can help offset the cost of implementing high-difficulty structural changes like covered lagoons.</p>
            </details>
          </div>
        </section>

        <section className="text-xs text-slate-500 border-t border-slate-200 pt-6">
          <p><strong>Disclaimer:</strong> All calculations and strategy recommendations are for informational and planning purposes only and do not replace formal scientific, regulatory, or financial accounting.</p>
        </section>
      </div>
    </ToolLayout>
  )
}
