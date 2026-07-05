import { Info, ShieldAlert } from 'lucide-react';
import React, { useEffect } from 'react';

export function SharedPage({ title, children }: { title: string, children: React.ReactNode }) {
  useEffect(() => {
    document.title = `${title} | Carbon | RUC`;
  }, [title]);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 space-y-6 text-slate-600 leading-relaxed prose prose-slate max-w-none">
        {children}
      </div>
    </div>
  )
}

export function About() {
  return (
    <SharedPage title="About Carbon">
      <div className="flex items-start gap-4 p-4 bg-emerald-50 text-emerald-800 rounded-lg mb-8">
        <Info className="w-6 h-6 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1">Rural Ops Tools Ecosystem</p>
          <p className="text-sm text-emerald-700">Carbon is the farm carbon accounting and low-emissions decision hub for the Rural Ops Tools master ecosystem.</p>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-slate-900 mt-6">Our Mission</h3>
      <p>
        The Carbon application helps users estimate greenhouse gas emissions, carbon intensity, soil carbon sequestration, and the outcomes 
        of low-carbon scenarios across rural operations. We strive to provide clean, analytical, and practical tools to support whole-farm 
        planning, enterprise comparisons, and what-if emission reduction decisions.
      </p>

      <h3 className="text-lg font-semibold text-slate-900 mt-6">Core Capabilities</h3>
      <ul className="list-disc pl-5 space-y-2 mt-4">
        <li>Estimate whole-farm emissions and break them down by specific sources.</li>
        <li>Show carbon intensity per acre, per head, or per unit of product.</li>
        <li>Model the impact of soil carbon and sequestration practices over time.</li>
        <li>Benchmark performance against prior periods or target goals.</li>
        <li>Run what-if reduction scenarios to evaluate practical practice changes.</li>
        <li>Provide transparent assumptions and practical mitigation hotspots.</li>
      </ul>
      
      <p className="mt-8 text-sm italic text-slate-500">
        Please refer to our <a href="https://www.ruralopstools.com/terms-of-use" target="_blank" rel="noreferrer" className="underline hover:text-slate-700">Legal</a> page for important context regarding estimations and methodology.
      </p>
    </SharedPage>
  );
}
