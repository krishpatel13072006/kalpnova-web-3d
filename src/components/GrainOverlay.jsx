import { useLocation } from 'react-router-dom';

export default function GrainOverlay() {
  const location = useLocation();
  
  // Disable grain on heavy performance-critical pages to prevent flickering/lag
  if (location.pathname === '/workportfolio') return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.05]"
      style={{
        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        mixBlendMode: "multiply", // Keeps depth but much lighter than 'overlay'
      }}
    />
  );
}
