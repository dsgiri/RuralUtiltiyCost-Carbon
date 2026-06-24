import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 px-4 md:px-8 shrink-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <div className="flex flex-col items-center md:items-start">
          <p className="font-medium text-slate-700">Carbon &bull; Rural Utility Cost</p>
          <p className="mt-1 text-xs">Farm carbon accounting & low-emissions decision hub.</p>
        </div>
        <div className="flex gap-4 font-medium text-xs">
          <Link to="/about" className="hover:text-emerald-600 transition-colors">About</Link>
          <a href="https://www.ruralutilitycost.com/terms-of-use" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">Legal</a>
          <a href="https://www.ruralutilitycost.com/contact" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">Contact</a>
          <a href="https://ruralutilitycost.com/" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">Main Ecosystem</a>
        </div>
      </div>
    </footer>
  );
}
