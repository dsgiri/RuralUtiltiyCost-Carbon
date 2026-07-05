import { type ReactNode, useState } from 'react';
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
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Footer } from './Footer';

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
  { name: 'Contact', href: 'https://www.ruralopstools.com/contact', icon: Phone },
  { name: 'Legal', href: 'https://www.ruralopstools.com/terms-of-use', icon: ShieldAlert },
  { name: 'License', href: 'https://www.ruralopstools.com/disclaimer', icon: Scale },
  { name: 'GitHub', href: 'https://github.com/dsgiri/ruralopstools-carbon', icon: Github },
];

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuCollapsed, setIsDesktopMenuCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 z-50 rounded-md font-medium outline-none ring-2 ring-offset-2 ring-emerald-600">Skip to main content</a>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-emerald-600 shrink-0" />
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
        "fixed md:static inset-y-0 left-0 bg-white border-r border-slate-200 z-40 transform transition-all duration-300 ease-in-out flex flex-col h-full overflow-hidden",
        isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0",
        !isMobileMenuOpen && (isDesktopMenuCollapsed ? "md:w-16 w-64" : "w-64")
      )}>
        <div className={cn("hidden md:flex p-6 items-center shrink-0 border-b border-slate-100", isDesktopMenuCollapsed ? "justify-center px-0" : "gap-2")}>
          <Leaf className="h-7 w-7 text-emerald-600 shrink-0" />
          <div className={cn("flex flex-col transition-all duration-300", isDesktopMenuCollapsed ? "hidden" : "flex")}>
            <span className="font-semibold text-xl text-slate-900 tracking-tight leading-none whitespace-nowrap">Carbon</span>
            <span className="text-[10px] text-slate-500 uppercase font-medium mt-1 tracking-wider whitespace-nowrap">Rural Ops Tools</span>
          </div>
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="hidden md:flex p-3 border-b border-slate-100 shrink-0">
          <button
            onClick={() => setIsDesktopMenuCollapsed(!isDesktopMenuCollapsed)}
            className={cn(
              "flex items-center p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors w-full",
              isDesktopMenuCollapsed ? "justify-center" : "justify-start gap-2"
            )}
            aria-label={isDesktopMenuCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isDesktopMenuCollapsed ? (
              <ChevronRight className="h-5 w-5 shrink-0" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">Collapse</span>
              </>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-8 no-scrollbar">
          <div>
            <h3 className={cn("px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2", isDesktopMenuCollapsed ? "md:hidden" : "block")}>Tools</h3>
            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-3 md:py-2 text-sm font-medium rounded-md transition-colors min-h-[48px] md:min-h-0 relative group",
                    isDesktopMenuCollapsed ? "md:justify-center md:px-0" : "",
                    isActive 
                      ? "bg-emerald-50 text-emerald-700" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                  title={isDesktopMenuCollapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className={cn("whitespace-nowrap transition-all duration-300", isDesktopMenuCollapsed ? "md:hidden" : "block")}>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <h3 className={cn("px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2", isDesktopMenuCollapsed ? "md:hidden" : "block")}>Shared Ecosystem</h3>
            <nav className="space-y-1">
              {sharedNavItems.map((item) => (
                item.href ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 md:py-2 text-sm font-medium rounded-md transition-colors min-h-[48px] md:min-h-0 text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                      isDesktopMenuCollapsed ? "md:justify-center md:px-0" : ""
                    )}
                    title={isDesktopMenuCollapsed ? item.name : undefined}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className={cn("whitespace-nowrap transition-all duration-300", isDesktopMenuCollapsed ? "md:hidden" : "block")}>{item.name}</span>
                  </a>
                ) : (
                  <NavLink
                    key={item.path}
                    to={item.path!}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-3 py-3 md:py-2 text-sm font-medium rounded-md transition-colors min-h-[48px] md:min-h-0",
                      isDesktopMenuCollapsed ? "md:justify-center md:px-0" : "",
                      isActive 
                        ? "bg-slate-100 text-slate-900" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                    title={isDesktopMenuCollapsed ? item.name : undefined}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className={cn("whitespace-nowrap transition-all duration-300", isDesktopMenuCollapsed ? "md:hidden" : "block")}>{item.name}</span>
                  </NavLink>
                )
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-slate-900/20 z-30" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-8 outline-none" tabIndex={-1}>
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

