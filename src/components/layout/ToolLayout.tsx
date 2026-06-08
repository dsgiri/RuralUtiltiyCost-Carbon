import { type ReactNode, useEffect } from 'react';
import { Leaf } from 'lucide-react';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  category: string;
}

export function ToolLayout({ title, description, children, category }: ToolLayoutProps) {
  useEffect(() => {
    document.title = `${title} | Carbon | RUC`;
  }, [title]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col space-y-2 mb-8">
        <div className="flex items-center gap-2 text-emerald-600 mb-2">
          <Leaf className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">{category.replace('-', ' ')}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
        <p className="text-slate-600 max-w-3xl leading-relaxed">{description}</p>
      </div>
      
      {children}
    </div>
  );
}

export function DataCard({ title, value, unit, subtitle, highlight = false }: { title: string, value: number | string, unit: string, subtitle?: string, highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-xl border ${highlight ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}>
      <h3 className={`text-sm font-medium ${highlight ? 'text-slate-400' : 'text-slate-500'} mb-1`}>{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className={`text-4xl font-bold tracking-tight ${highlight ? 'text-white' : 'text-slate-900'}`}>
          {value}
        </span>
        <span className={`text-sm font-semibold ${highlight ? 'text-slate-300' : 'text-slate-600'}`}>{unit}</span>
      </div>
      {subtitle && <p className={`mt-2 text-xs ${highlight ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>}
    </div>
  )
}
