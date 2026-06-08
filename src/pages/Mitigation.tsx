import { ToolLayout } from '../components/layout/ToolLayout';
import { ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Mitigation() {
  const strategies = [
    {
      area: "Nutrient Management",
      title: "Variable Rate Nitrogen Application",
      description: "Match fertilizer rates to exact crop needs spatially to minimize nitrous oxide emissions from excess application.",
      impact: "High",
      difficulty: "Medium"
    },
    {
      area: "Livestock",
      title: "Feed Additives & Forage Quality",
      description: "Implement specialized feed additives (e.g., specific lipids, seaweed extracts) to suppress methanogenesis in ruminants.",
      impact: "High",
      difficulty: "High"
    },
    {
      area: "Energy & Fuel",
      title: "Electrification of Irrigation",
      description: "Transition diesel or propane irrigation motors to electric, ideally paired with a renewable energy source.",
      impact: "Medium",
      difficulty: "Medium"
    },
    {
      area: "Manure Management",
      title: "Covered Lagoons & Flaring",
      description: "Cover anaerobic lagoons to capture methane and flare it (or use for power), converting CH4 (GWP 28) to CO2 (GWP 1).",
      impact: "Very High",
      difficulty: "High"
    },
    {
      area: "Soil Management",
      title: "Reduced Tillage",
      description: "Minimize soil disturbance to prevent the oxidation of soil organic carbon and reduce tractor fuel usage.",
      impact: "Low/Medium",
      difficulty: "Low"
    }
  ];

  return (
    <ToolLayout 
      title="Mitigation Planner"
      description="Identify structural and operational opportunities to lower your carbon footprint."
      category="mitigation"
    >
      <div className="space-y-6">
        
        <div className="flex items-center gap-3 p-4 bg-orange-50 text-orange-900 rounded-xl border border-orange-200">
           <div className="bg-orange-100 p-2 rounded-full">
             <Flame className="w-5 h-5 text-orange-600" />
           </div>
           <div>
             <h3 className="font-semibold text-sm">Primary Hotspot Detected</h3>
             <p className="text-xs text-orange-700 mt-0.5">Based on generic averages, Enterprise Methane and Nitrous Oxide typically constitute &gt;60% of rural agricultural emissions.</p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
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
    </ToolLayout>
  )
}
