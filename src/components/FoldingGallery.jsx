import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const FoldingGallery = ({
  images = [],
  title = "The Collection",
  accentColor = "#ff6b2b"
}) => {
  // Map images to the expected format, or use defaults if not enough images
  const items = images.slice(0, 5).map((src, index) => ({
    id: index + 1,
    src: src
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // --------------------------------------------------------
  // AUTOPLAY LOGIC
  // Pauses when 'isHovered' is true, resumes when false
  // --------------------------------------------------------
  useEffect(() => {
    if (isHovered || items.length === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, 3500); // Changes image every 3.5 seconds

    return () => clearInterval(timer);
  }, [isHovered, items.length]);

  if (items.length === 0) return null;

  return (
    <div className="w-full py-20 bg-transparent flex flex-col items-center justify-center font-sans selection:bg-[#ff6b2b] selection:text-white">

      {/* HEADER & STATUS INDICATOR */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Digital <span className="text-[#ff6b2b]">Showcase</span>
          </h2>
        </div>

        {/* Dynamic Status Badge */}
        <div className="flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 bg-white/5 w-fit">
          {isHovered ? (
            <>
              <Pause size={14} className="text-zinc-500" />
              <span className="text-zinc-500">Manual Focus</span>
            </>
          ) : (
            <>
              <Play size={14} className="text-[#ff6b2b]" />
              <span className="text-[#ff6b2b]">Auto-Rotating</span>
              <span className="w-2 h-2 rounded-full bg-[#ff6b2b] animate-pulse ml-1"></span>
            </>
          )}
        </div>
      </div>

      {/* 3D FOLDING ACCORDION CONTAINER 
        'perspective' gives depth to the rotated child elements 
      */}
      <div
        className="w-full max-w-7xl h-[60vh] md:h-[75vh] flex gap-2 md:gap-4"
        style={{ perspective: '2000px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className="relative overflow-hidden rounded-2xl cursor-pointer border border-white/5"
              style={{
                flex: isActive ? 10 : 1.2,
                transform: isActive
                  ? 'rotateY(0deg) translateZ(50px)'
                  : isPast
                    ? 'rotateY(25deg) translateZ(-100px)'
                    : 'rotateY(-25deg) translateZ(-100px)',
                transition: 'flex 1s cubic-bezier(0.23, 1, 0.32, 1), transform 1s cubic-bezier(0.23, 1, 0.32, 1)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* 1. BACKGROUND IMAGE */}
              <div className="absolute inset-0 w-full h-full bg-[#111] flex items-center justify-center p-4">
                <img
                  src={item.src}
                  alt="Project Asset"
                  className="w-full h-full object-contain transition-all duration-1000"
                  style={{
                    filter: isActive ? 'none' : 'grayscale(0.5) blur(2px)',
                    transform: isActive ? 'scale(1)' : 'scale(1.1)'
                  }}
                />
              </div>

              {/* 2. SHADOW OVERLAY */}
              <div
                className="absolute inset-0 bg-black/60 pointer-events-none transition-opacity duration-1000"
                style={{ opacity: isActive ? 0 : 0.7 }}
              />

              {/* 3. ACTIVE GLOW BORDER */}
              <div
                className={`absolute inset-0 border-2 rounded-2xl transition-all duration-1000 pointer-events-none ${isActive ? 'border-[#ff6b2b]/40 shadow-[inset_0_0_50px_rgba(255,107,43,0.2)]' : 'border-transparent'
                  }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoldingGallery;
