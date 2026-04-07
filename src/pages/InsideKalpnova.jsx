import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Hyperspeed from '../components/Hyperspeed';

export default function InsideKalpnova() {
  const navigate = useNavigate();

  const effectOptions = useMemo(() => {
    return {
      "distortion": "turbulentDistortion",
      "length": 400,
      "roadWidth": 10,
      "islandWidth": 2,
      "lanesPerRoad": 3,
      "fov": 90,
      "fovSpeedUp": 150,
      "speedUp": 2,
      "carLightsFade": 0.4,
      "totalSideLightSticks": 20,
      "lightPairsPerRoadWay": 40,
      "shoulderLinesWidthPercentage": 0.05,
      "brokenLinesWidthPercentage": 0.1,
      "brokenLinesLengthPercentage": 0.5,
      "lightStickWidth": [0.12, 0.5],
      "lightStickHeight": [1.3, 1.7],
      "movingAwaySpeed": [60, 80],
      "movingCloserSpeed": [-120, -160],
      "carLightsLength": [12, 80],
      "carLightsRadius": [0.05, 0.14],
      "carWidthPercentage": [0.3, 0.5],
      "carShiftX": [-0.8, 0.8],
      "carFloorSeparation": [0, 5],
      "colors": {
        "roadColor": 0x080808,
        "islandColor": 0x0a0a0a,
        "background": 0x000000,
        "shoulderLines": 0xffffff,
        "brokenLines": 0xffffff,
        "leftCars": [0xff8a00, 0xe24a2b, 0xff6b2b],
        "rightCars": [0xffffff, 0xffd700, 0xff8a00],
        "sticks": 0xff8a00
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center relative overflow-hidden font-sans p-6">
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={effectOptions} />
      </div>
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="z-10 text-center mb-16 animate-fade-in mt-10">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase">Inside Kalpnova</h1>
        <p className="text-gray-400 tracking-[0.3em] uppercase text-sm">Select an architectural experience</p>
      </div>

      <div className="z-10 flex flex-col md:flex-row gap-6 w-full max-w-6xl">
        <div onClick={() => navigate('/vision')} className="flex-1 group cursor-pointer border border-white/10 bg-black/60 backdrop-blur p-8 hover:bg-white/5 transition-all duration-500 hover:-translate-y-2">
          <div className="text-emerald-500 font-mono text-[10px] tracking-widest mb-4 uppercase">01 // Neural Panorama</div>
          <h2 className="text-3xl font-bold mb-3 tracking-tight">Vision 360</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">A 360° immersive cylinder featuring aquatic flora with real-time AI specimen analysis.</p>
          <div className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Initialize ⟶</div>
        </div>

        <div onClick={() => navigate('/pavilion')} className="flex-1 group cursor-pointer border border-white/10 bg-black/60 backdrop-blur p-8 hover:bg-white/5 transition-all duration-500 hover:-translate-y-2">
          <div className="text-orange-500 font-mono text-[10px] tracking-widest mb-4 uppercase">02 // Kinetic Architecture</div>
          <h2 className="text-3xl font-bold mb-3 tracking-tight">The Pavilion</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">A scroll-driven architectural walkthrough guiding the camera through a museum space.</p>
          <div className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Initialize ⟶</div>
        </div>

        <div onClick={() => navigate('/showcase')} className="flex-1 group cursor-pointer border border-white/10 bg-black/60 backdrop-blur p-8 hover:bg-white/5 transition-all duration-500 hover:-translate-y-2">
          <div className="text-cyan-500 font-mono text-[10px] tracking-widest mb-4 uppercase">03 // Spatial Rooms</div>
          <h2 className="text-3xl font-bold mb-3 tracking-tight">Virtual Exhibition</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">A spatial floating gallery environment built to showcase enterprise-level projects and apps.</p>
          <div className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Initialize ⟶</div>
        </div>
      </div>

      <div className="absolute bottom-8 text-center text-[10px] text-gray-600 tracking-[0.4em] uppercase z-10">
        System Online // {new Date().getFullYear()}
      </div>
    </div>
  );
}