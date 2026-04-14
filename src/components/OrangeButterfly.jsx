import React from "react";

export default function OrangeButterfly({ scale = 1.0 }) {
  const ct = "orange";
  let color1 = "#FF7A00";
  let color2 = "#D04500";
  let baseScale = scale;

  return (
    <>
      <style>{`
        @keyframes flap-left-${ct} {
          0%, 100% { transform: rotateY(12deg) rotateX(8deg); }
          50%       { transform: rotateY(60deg) rotateX(-4deg); }
        }
        @keyframes flap-right-${ct} {
          0%, 100% { transform: rotateY(-12deg) rotateX(8deg); }
          50%       { transform: rotateY(-60deg) rotateX(-4deg); }
        }
        .bfly-wing-${ct} {
          position: absolute;
          top: 0;
          width: 45px;
          height: 65px;
          filter: drop-shadow(0px 8px 12px rgba(0,0,0,0.35));
        }
        .bfly-lw-${ct} {
          right: 50%;
          transform-origin: right center;
          animation: flap-left-${ct} 0.75s infinite alternate cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
        .bfly-rw-${ct} {
          left: 50%;
          transform-origin: left center;
          animation: flap-right-${ct} 0.75s infinite alternate cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
      `}</style>

      {/* Butterfly container */}
      <div 
        style={{ 
          position: "relative", 
          width: 90, 
          height: 65, 
          transformStyle: "preserve-3d",
          transform: `scale(${baseScale})`
        }}
      >
        {/* Left Wing */}
        <svg className={`bfly-wing-${ct} bfly-lw-${ct}`} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`bfly-gl-${ct}`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color1} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
          </defs>
          <path d="M100,10 C60,-5 10,10 0,40 C-5,65 15,80 25,80 C20,95 45,105 65,95 C90,80 95,60 100,45 Z" fill="#111" />
          <path d="M95,15 C60,5 20,15 10,38 C25,48 45,45 65,35 C80,28 90,20 95,15 Z" fill={`url(#bfly-gl-${ct})`} />
          <path d="M92,20 C65,30 25,45 15,55 C35,62 55,55 75,45 C85,38 92,25 92,20 Z" fill={`url(#bfly-gl-${ct})`} />
          <path d="M95,45 C70,55 40,65 30,75 C45,85 65,75 80,60 C90,50 95,45 95,45 Z" fill={`url(#bfly-gl-${ct})`} />
          <path d="M85,55 C65,65 45,75 35,85 C55,95 75,85 85,70 Z" fill={`url(#bfly-gl-${ct})`} />
          {[[10, 20], [5, 30], [3, 40], [6, 52], [12, 65], [20, 75], [32, 88], [45, 98], [60, 95], [75, 85]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.8" fill="#fff" />
          ))}
        </svg>

        {/* Right Wing */}
        <svg className={`bfly-wing-${ct} bfly-rw-${ct}`} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`bfly-gr-${ct}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color1} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
          </defs>
          <path d="M0,10 C40,-5 90,10 100,40 C105,65 85,80 75,80 C80,95 55,105 35,95 C10,80 5,60 0,45 Z" fill="#111" />
          <path d="M5,15 C40,5 80,15 90,38 C75,48 55,45 35,35 C20,28 10,20 5,15 Z" fill={`url(#bfly-gr-${ct})`} />
          <path d="M8,20 C35,30 75,45 85,55 C65,62 45,55 25,45 C15,38 8,25 8,20 Z" fill={`url(#bfly-gr-${ct})`} />
          <path d="M5,45 C30,55 60,65 70,75 C55,85 35,75 20,60 C10,50 5,45 5,45 Z" fill={`url(#bfly-gr-${ct})`} />
          <path d="M15,55 C35,65 55,75 65,85 C45,95 25,85 15,70 Z" fill={`url(#bfly-gr-${ct})`} />
          {[[90, 20], [95, 30], [97, 40], [94, 52], [88, 65], [80, 75], [68, 88], [55, 98], [40, 95], [25, 85]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.8" fill="#fff" />
          ))}
        </svg>

        {/* Body */}
        <div style={{ position: "absolute", left: "50%", top: "12%", transform: "translateX(-50%)", width: 6, height: 45, background: "#111", borderRadius: 6 }}>
          <div style={{ position: "absolute", top: -7, left: -1, width: 8, height: 8, background: "#000", borderRadius: "50%" }}>
            <div style={{ position: "absolute", top: 2, left: 1, width: 1.5, height: 1.5, background: "#fff", borderRadius: "50%" }} />
            <div style={{ position: "absolute", top: 2, right: 1, width: 1.5, height: 1.5, background: "#fff", borderRadius: "50%" }} />
          </div>
          <svg style={{ position: "absolute", top: -20, left: -12, width: 30, height: 20, overflow: "visible" }}>
            <path d="M15,20 C10,10 0,5 0,0" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15,20 C20,10 30,5 30,0" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </>
  );
}
