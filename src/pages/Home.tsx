import { TOOLS } from '../data/tools';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Info, Heart } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export function Home() {
  useEffect(() => {
    document.title = "Carbon Dashboard | Rural Utility Cost";
  }, []);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ruc-carbon-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', { element: 'favorite_button_' + id });
    }

    let next: string[];
    if (favorites.includes(id)) {
      next = favorites.filter(fav => fav !== id);
    } else {
      next = [...favorites, id];
    }
    setFavorites(next);
    localStorage.setItem('ruc-carbon-favorites', JSON.stringify(next));
  };

  const handleToolClick = (id: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', { element: 'tool_card_' + id });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between shadow-sm">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wide">
            <Leaf className="w-3.5 h-3.5" />
            Accounting & Benchmarking Hub
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Farm Carbon Intelligence
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Estimate greenhouse gas emissions, track carbon intensity per acre or unit, model soil sequestration, and test low-carbon what-if scenarios across your entire rural operation.
          </p>
          <div className="pt-2 flex items-center gap-2 text-sm text-slate-500">
            <Info className="w-4 h-4 shrink-0" />
            <span>Part of the Rural Utility Cost planning ecosystem.</span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Analysis Tools</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {TOOLS.map((tool) => {
            const isFav = favorites.includes(tool.id);
            return (
              <Link 
                key={tool.id} 
                to={tool.path}
                onClick={() => handleToolClick(tool.id)}
                className="group flex flex-col bg-white border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all duration-200 relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {tool.category.replace('-', ' ')}
                  </div>
                  <button 
                    onClick={(e) => toggleFavorite(tool.id, e)}
                    className={cn(
                      "p-1.5 rounded-full transition-colors",
                      isFav ? "text-rose-500 bg-rose-50 hover:bg-rose-100" : "text-slate-300 hover:text-slate-500 hover:bg-slate-50"
                    )}
                    aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={cn("w-4 h-4", isFav && "fill-current")} />
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-600 flex-1 mb-6 leading-relaxed">
                  {tool.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-500">
                    Out: {tool.primaryOutcome}
                  </span>
                  <div className="flex items-center text-emerald-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                    Launch <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

    </div>
  );
}
