import React from 'react';

interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom';
}

const AdBanner: React.FC<AdBannerProps> = ({ position }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center my-8 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden min-h-[100px] ${position === 'top' ? 'mt-0' : ''}`}>
      <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-mono">Advertisement</span>
      
      {/* Google AdSense Placeholder */}
      <div className="w-full max-w-[728px] h-[90px] bg-zinc-800/50 flex items-center justify-center border border-dashed border-zinc-700 rounded">
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%', height: '90px' }}
             data-ad-client="ca-pub-전체공용코드"
             data-ad-slot="1234567890"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <span className="text-zinc-600 text-xs font-mono">AdSense Display Ad ({position})</span>
      </div>
      
      <p className="text-[9px] text-zinc-600 mt-2 italic">
        * Replace "ca-pub-전체공용코드" with your actual AdSense Publisher ID
      </p>
    </div>
  );
};

export default AdBanner;
