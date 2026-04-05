import React, { useState } from 'react';

const CubeGallery = ({ 
  images = [] 
}) => {
  // State to track which face is pointing forward
  const [activeFace, setActiveFace] = useState('front');

  // Sizing Configuration
  const cubeSize = 550; 
  const halfSize = cubeSize / 2;

  // The 3D Math for mapping faces to their rotations
  // images[0-5] mapped to front, right, top, left, bottom, back
  const faces = [
    { id: 'front',  src: images[0], viewTransform: `translateZ(-${halfSize}px) rotateY(0deg)`,   faceTransform: `rotateY(0deg) translateZ(${halfSize}px)` },
    { id: 'right',  src: images[1], viewTransform: `translateZ(-${halfSize}px) rotateY(-90deg)`, faceTransform: `rotateY(90deg) translateZ(${halfSize}px)` },
    { id: 'top',    src: images[2], viewTransform: `translateZ(-${halfSize}px) rotateX(-90deg)`, faceTransform: `rotateX(90deg) translateZ(${halfSize}px)` },
    { id: 'left',   src: images[3], viewTransform: `translateZ(-${halfSize}px) rotateY(90deg)`,  faceTransform: `rotateY(-90deg) translateZ(${halfSize}px)` },
    { id: 'bottom', src: images[4], viewTransform: `translateZ(-${halfSize}px) rotateX(90deg)`,  faceTransform: `rotateX(-90deg) translateZ(${halfSize}px)` },
    { id: 'back',   src: images[5], viewTransform: `translateZ(-${halfSize}px) rotateX(180deg)`, faceTransform: `rotateX(180deg) translateZ(${halfSize}px)` },
  ];

  // Find the required rotation for the whole cube based on active state
  const currentViewTransform = faces.find(f => f.id === activeFace)?.viewTransform;

  return (
    <div className="w-full h-auto flex items-center justify-center py-12 overflow-hidden font-sans selection:bg-[#ff6b2b] selection:text-white">
      
      {/* Main Layout Wrapper */}
      <div className="flex flex-col lg:flex-row items-center gap-[60px] lg:gap-[120px]">
        
        {/* Sidebar + Thumbnail Menu */}
        <div className="flex items-center gap-8">
          {/* VERTICAL LABEL */}
          <div className="hidden md:block [writing-mode:vertical-lr] rotate-180 text-[11px] font-black uppercase tracking-[0.5em] text-[#ff6b2b] whitespace-nowrap border-r border-white/10 pr-6 py-4 drop-shadow-[0_0_15px_rgba(255,107,43,0.3)]">
            Select Project Asset
          </div>

          {/* THUMBNAIL MENU */}
          <div className="grid grid-cols-2 gap-6 relative z-10">
            {faces.map((face) => {
              const isActive = activeFace === face.id;
              return (
                <button
                  key={face.id}
                  onClick={() => setActiveFace(face.id)}
                  className={`
                    w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-2xl overflow-hidden cursor-pointer outline-none bg-[#111] p-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${isActive 
                      ? 'border-2 border-[#ff6b2b] scale-105 shadow-[0_0_25px_rgba(255,107,43,0.4),0_10px_30px_rgba(0,0,0,0.5)]' 
                      : 'border-2 border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-white/20'
                    }
                  `}
                >
                  <img 
                    src={face.src} 
                    alt={`Thumbnail ${face.id}`} 
                    className={`
                      w-full h-full object-contain transition-all duration-500 
                      ${isActive ? 'opacity-100 grayscale-0' : 'opacity-70 grayscale-0 hover:opacity-100'}
                    `}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D CUBE WRAPPER - Hidden on smaller screens for this specific component view if needed, but here we let it scale */}
        <div 
          style={{ 
            width: cubeSize, 
            height: cubeSize, 
            perspective: '1500px' 
          }}
          className="relative max-w-full scale-[0.6] md:scale-[0.8] lg:scale-100 transition-transform duration-700"
        >
          {/* THE ROTATING CUBE */}
          <div 
            style={{ 
              transformStyle: 'preserve-3d',
              transform: currentViewTransform,
              transition: 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
            className="w-full h-full relative"
          >
            {/* THE 6 FACES */}
            {faces.map((face) => (
              <div 
                key={face.id}
                style={{ 
                  transform: face.faceTransform,
                  width: cubeSize,
                  height: cubeSize,
                }}
                className="absolute top-0 left-0 bg-[#111] rounded-[1rem] overflow-hidden border border-white/5 shadow-[inset_0_0_60px_rgba(0,0,0,0.8),0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-center p-4"
              >
                <img 
                  src={face.src} 
                  alt={`Face ${face.id}`} 
                  className="w-full h-full object-contain block drop-shadow-2xl"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CubeGallery;
