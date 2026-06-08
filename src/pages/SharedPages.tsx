import { Info, ShieldAlert } from 'lucide-react';
import { useEffect } from 'react';

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
          <p className="font-semibold mb-1">Rural Utility Cost Ecosystem</p>
          <p className="text-sm text-emerald-700">Carbon is the farm carbon accounting and low-emissions decision hub for the Rural Utility Cost master ecosystem.</p>
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
        Please refer to our Legal page for important context regarding estimations and methodology.
      </p>
    </SharedPage>
  );
}

export function Legal() {
  return (
    <SharedPage title="Legal & Disclaimer">
      <div className="flex items-start gap-4 p-4 bg-rose-50 text-rose-800 rounded-lg mb-8">
        <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1">Informational Purposes Only</p>
          <p className="text-sm text-rose-700">All carbon estimates provided by this application are strictly for informational and planning purposes.</p>
        </div>
      </div>

      <div className="space-y-4">
        <p>
          <strong>Methodology Variance:</strong> Methods, emission factors, and sequestration assumptions can vary widely by specific tool, region, and scientific standard. 
          The outputs generated here provide a generalized estimate based on standard industry logic and should not be treated as exact scientific measurements.
        </p>
        <p>
          <strong>No Professional Advice:</strong> This application does not replace scientific, regulatory, legal, accounting, or financial advice. Users are strongly advised to verify all critical reporting, planning, or market-participation decisions independently with qualified professionals.
        </p>
        <p>
          <strong>Certification Standards:</strong> Outputs from the Carbon app are not guaranteed to satisfy any particular standard, protocol, or certification (e.g., ISO, Verra, CAR) unless explicitly configured and reviewed by an accredited third-party auditor.
        </p>
        <p>
          By using this tool within the Rural Utility Cost ecosystem, you acknowledge that all data, estimates, and theoretical scenarios are provided "as-is" without warranty of any kind.
        </p>
      </div>
    </SharedPage>
  );
}

// Simple placeholders for the rest
export function Contact() {
  return (
    <SharedPage title="Contact Us">
      <p>For inquiries regarding the Carbon accounting tools or the broader Rural Utility Cost ecosystem, please reach out to the master site support.</p>
    </SharedPage>
  )
}

export function License() {
  return (
    <SharedPage title="License">
      <p>This software is provided under the standard Rural Utility Cost ecosystem licensing terms.</p>
    </SharedPage>
  )
}
