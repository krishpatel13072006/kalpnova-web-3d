import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commands_list = {
  help: 'Show available commands',
  clear: 'Clear terminal',
  sites: 'List all live web projects',
  open: 'Open a website [usage: open <url>]',
  launch: 'Launch a project [usage: launch <1-5>]',
  date: 'Show current date',
  whoami: 'Display session info'
};

const live_sites = [
  { id: 1, name: 'Akshar Live Security', url: 'https://aksharlivesecurity.com/' },
  { id: 2, name: 'Nilambuj', url: 'https://nilambuj.com/' },
  { id: 3, name: 'Kalpnova', url: 'https://kalpnova.com/' },
  { id: 4, name: 'ResourceOS', url: 'https://resourceos.com/' },
  { id: 5, name: 'Lioncut', url: 'https://lioncut.co.in/' }
];

const mobile_apps = [
  { name: 'Krusak App', url: 'https://play.google.com/store/apps/details?id=com.krusak.app&hl=en' },
  { name: 'SchoolG App', url: 'https://play.google.com/store/search?q=schoolg&c=apps&fpr=false&hl=en_IN' }
];

export default function Terminal({ 
  title = "Kalpnova-WebOS", 
  url = "", 
  siteName = "" 
}) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-[400px] md:max-w-6xl mx-auto rounded-[32px] md:rounded-[20px] overflow-hidden border border-white/10 bg-[#0d0f14] shadow-2xl transition-all duration-500 will-change-transform"
    >
      {/* Browser/Phone Header */}
      <div className="flex items-center justify-between px-5 py-4 md:px-6 md:py-4 bg-[#1a1b1e] border-b border-white/5">
        {/* Connection Dots (Phone Speaker look on mobile) */}
        <div className="flex gap-1.5 md:gap-2 w-16 md:w-20">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.2)]" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.1)]" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.1)]" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-[140px] md:max-w-2xl px-3 py-1 bg-black/40 border border-white/10 rounded-full flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-black/60 mx-1 md:mx-0">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50 animate-pulse shrink-0" />
          <span className="text-[8px] md:text-[11px] text-zinc-500 font-mono truncate lowercase">
            {url}
          </span>
        </div>

        {/* Action Button */}
        <div className="w-10 md:w-20 flex justify-end">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-7 h-7 md:w-auto md:h-auto md:px-3 md:py-1 bg-white/5 border border-white/10 rounded-full md:rounded-md text-[8px] md:text-[10px] font-bold text-zinc-400 uppercase hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <svg className="w-3 md:w-2.5 h-3 md:h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Website Viewport (Phone Portrait on mobile) */}
      <div className="relative w-full h-[580px] md:h-[650px] bg-white group">
        {isInView ? (
          <iframe 
            src={url} 
            className="w-full h-full border-none"
            title={`Preview of ${siteName}`}
            sandbox="allow-scripts allow-same-origin allow-forms"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#111] flex items-center justify-center">
             <div className="w-8 h-8 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
          </div>
        )}
        
        {/* Subtle Overlay to Prevent Initial Scrolling Conflict */}
        <div className="absolute inset-0 pointer-events-none border-t border-white/5" />
      </div>

      <style jsx="true">{`
        iframe::-webkit-scrollbar { width: 8px; }
        iframe::-webkit-scrollbar-track { background: #f1f1f1; }
        iframe::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
        iframe::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
    </div>
  );
}

