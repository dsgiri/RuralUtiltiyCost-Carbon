import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Leaf, 
  Calculator, 
  BarChart4, 
  Sprout, 
  LineChart, 
  Workflow, 
  Lightbulb, 
  Heart, 
  Info, 
  Phone, 
  ShieldAlert, 
  Scale, 
  Github,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { Footer } from './Footer';
import { AdContainer } from './AdContainer';

interface LayoutProps {
  children: ReactNode;
}

const mainNavItems = [
  { name: 'Dashboard', path: '/', icon: Leaf },
  { name: 'Footprint', path: '/footprint', icon: Calculator },
  { name: 'Enterprises', path: '/enterprises', icon: BarChart4 },
  { name: 'Soil Carbon', path: '/soil-carbon', icon: Sprout },
  { name: 'Benchmark', path: '/benchmark', icon: LineChart },
  { name: 'What If', path: '/what-if', icon: Workflow },
  { name: 'Mitigation', path: '/mitigation', icon: Lightbulb },
  { name: 'Favorites', path: '/favorites', icon: Heart },
];

const sharedNavItems = [
  { name: 'About', path: '/about', icon: Info },
  { name: 'Contact', path: '/contact', icon: Phone },
  { name: 'Legal', path: '/legal', icon: ShieldAlert },
  { name: 'License', path: '/license', icon: Scale },
  { name: 'GitHub', path: '/github', icon: Github },
];

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 z-50 rounded-md font-medium outline-none ring-2 ring-offset-2 ring-emerald-600">Skip to main content</a>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-emerald-600" />
          <span className="font-semibold text-lg text-slate-900 tracking-tight">
            Carbon <span className="text-slate-400 font-normal">| RUC</span>
          </span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center p-3 -mr-2 min-w-[48px] min-h-[48px] text-slate-600 hover:text-slate-900"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={cn(
        "fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-20 transform transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col h-full",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="hidden md:flex p-6 items-center gap-2 shrink-0 border-b border-slate-100">
          <Leaf className="h-7 w-7 text-emerald-600" />
          <div className="flex flex-col">
            <span className="font-semibold text-xl text-slate-900 tracking-tight leading-none">Carbon</span>
            <span className="text-[10px] text-slate-500 uppercase font-medium mt-1 tracking-wider">Rural Utility Cost</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-8">
          <div>
            <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tools</h3>
            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-3 md:py-2 text-sm font-medium rounded-md transition-colors min-h-[48px] md:min-h-0",
                    isActive 
                      ? "bg-emerald-50 text-emerald-700" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Shared Ecosystem</h3>
            <nav className="space-y-1">
              {sharedNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-3 md:py-2 text-sm font-medium rounded-md transition-colors min-h-[48px] md:min-h-0",
                    isActive 
                      ? "bg-slate-100 text-slate-900" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="px-2 pb-4">
            <AdContainer adSlot="SIDEBAR_AD_SLOT" className="min-h-[250px] w-full border-none shadow-sm rounded-lg overflow-hidden my-0" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-slate-900/20 z-10" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-8 outline-none" tabIndex={-1}>
          <div className="max-w-6xl mx-auto">
            <AdContainer adSlot="HEADER_AD_SLOT" className="mt-0 mb-8" />
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
