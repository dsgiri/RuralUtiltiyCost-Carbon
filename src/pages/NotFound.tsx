import { Link } from 'react-router-dom';
import { ToolLayout } from '../components/layout/ToolLayout';

export function NotFound() {
  return (
    <ToolLayout 
      title="404 - Page Not Found"
      description="We couldn't find the page you're looking for."
      category="navigation"
    >
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Are you lost in the field?</h2>
        <p className="text-slate-600 mb-8">
          The requested URL doesn't exist. It might have been moved or removed.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center min-h-[48px] px-6 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition outline-none ring-2 ring-offset-2 ring-transparent focus:ring-emerald-600"
        >
          Return to Dashboard
        </Link>
      </div>
    </ToolLayout>
  );
}
