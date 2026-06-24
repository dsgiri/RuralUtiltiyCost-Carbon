import React, { useState, useEffect } from 'react';
import { TOOLS } from '../data/tools';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { ToolLayout } from '../components/layout/ToolLayout';

export function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ruc-carbon-favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const favoriteTools = TOOLS.filter(t => favorites.includes(t.id));

  const removeFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = favorites.filter(fav => fav !== id);
    setFavorites(next);
    localStorage.setItem('ruc-carbon-favorites', JSON.stringify(next));
  };

  return (
    <ToolLayout 
      title="Saved Tools"
      description="Quick access to your most frequently used carbon accounting modules."
      category="favorites"
    >
      {favoriteTools.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
           <Heart className="w-12 h-12 text-slate-200 mx-auto mb-4" />
           <h3 className="text-lg font-medium text-slate-900 mb-2">No favorites yet</h3>
           <p className="text-slate-500 mb-6">Tools you favorite on the dashboard will appear here for quick access.</p>
           <Link to="/" className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition">
             Browse tools
           </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTools.map((tool) => (
            <Link 
              key={tool.id} 
              to={tool.path}
              className="group flex flex-col bg-white border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {tool.category.replace('-', ' ')}
                </div>
                <button 
                  onClick={(e) => removeFavorite(tool.id, e)}
                  className="p-1.5 rounded-full text-rose-500 bg-rose-50 hover:bg-rose-100 transition-colors"
                  aria-label="Remove from favorites"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-slate-600 flex-1 mb-6">
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
          ))}
        </div>
      )}
    </ToolLayout>
  )
}
