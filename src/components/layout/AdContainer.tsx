import { useEffect, useRef } from 'react';

interface AdContainerProps {
  className?: string;
  adSlot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
}

export function AdContainer({ className, adSlot = "YOUR_AD_SLOT", format = "auto" }: AdContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: number;

    const pushAd = () => {
      try {
        if (containerRef.current && containerRef.current.offsetWidth > 0) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } else {
          timeoutId = window.setTimeout(pushAd, 250);
        }
      } catch (e: any) {
        // Ignore strict mode double-render errors and 0 width errors
        if (e.message && !e.message.includes('already have ads') && !e.message.includes('availableWidth=0')) {
          console.error('Adsense error', e);
        }
      }
    };

    timeoutId = window.setTimeout(pushAd, 100);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div ref={containerRef} className={`ad-container flex justify-center items-center bg-slate-50 border border-slate-200 min-h-[250px] my-5 overflow-hidden w-full ${className || ''}`} data-ad-status="unfilled" aria-label="Advertisement">
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%', minWidth: '200px' }}
           data-ad-client="ca-PUB-YOUR_CLIENT_ID"
           data-ad-slot={adSlot}
           data-ad-format={format}
           data-full-width-responsive="true"></ins>
    </div>
  );
}
