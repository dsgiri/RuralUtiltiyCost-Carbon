import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('ruc-cookie-consent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ruc-cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 px-2 sm:px-5 z-50 animate-in slide-in-from-bottom-5">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 shadow-xl max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-slate-300 text-sm">
          We use cookies and third-party tools to improve user experience, analyze site traffic, and serve advertisements. By continuing to use our site, you consent to our use of cookies in accordance with our <a href="https://www.ruralopstools.com/privacy-policy" target="_blank" rel="noreferrer" className="underline text-emerald-400 hover:text-emerald-300">Privacy Policy</a>.
        </div>
        <div className="flex shrink-0">
          <button 
            onClick={handleAccept}
            className="whitespace-nowrap px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition outline-none ring-2 ring-offset-2 ring-offset-slate-900 ring-transparent focus:ring-emerald-500"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
