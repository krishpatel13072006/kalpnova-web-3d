import { useRef, Fragment, useEffect } from 'react';
import { motion, useMotionValue, useScroll, useVelocity, useSpring, useAnimationFrame } from 'framer-motion';

/**
 * MagicalButterfly (Physics & Scroll Based)
 * ───────────────────────────────────────
 */
export default function MagicalButterfly({ colorTheme = 'orange' }) {
  const isBlue = colorTheme === 'blue';
  const isPink = colorTheme === 'pink';
  const ct = colorTheme;

  // Colors and Base Size
  let color1 = '#FF7A00'; // Default Orange
  let color2 = '#D04500';
  let color3 = null;
  let baseScale = 1.7;

  if (isBlue) {
    color1 = '#00A8FF';
    color2 = '#0055FF';
    baseScale = 1.4;
  } else if (isPink) {
    color1 = '#FFFFFF'; // White
    color2 = '#FF69B4'; // Pink
    color3 = '#FFD700'; // Yellow
    baseScale = 1.55;
  }

  // Framer Motion Values
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(baseScale);

  // Scroll Tracking
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Cached Image Rectangles to prevent lag (Layout Thrashing fix)
  const imageBounds = useRef([]);

  useEffect(() => {
    // Update image bounds every second to avoid checking DOM 60 times a second
    const updateBounds = () => {
      const imgs = document.querySelectorAll('img');
      imageBounds.current = Array.from(imgs).map(img => img.getBoundingClientRect());
    };
    
    updateBounds();
    const interval = setInterval(updateBounds, 1000);
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds, { passive: true });
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds);
    };
  }, []);

  // Physics State (Kept in ref so it doesn't trigger React re-renders)
  const state = useRef({
    px: typeof window !== 'undefined' ? (window.innerWidth / 2) + (isBlue ? -100 : (isPink ? 0 : 100)) : 500,
    py: typeof window !== 'undefined' ? (window.innerHeight / 2) : 500,
    angle: Math.random() * Math.PI * 2,
    baseAngle: Math.random() * Math.PI * 2,
    time: Math.random() * 100, // For organic sine waves
    targetScale: baseScale,
    currentScale: baseScale,
    phase: isBlue ? Math.PI : (isPink ? Math.PI / 2 : 0),
    returningToCenter: false
  });

  useAnimationFrame((t, delta) => {
    if (typeof window === 'undefined') return;

    const s = state.current;
    const v = smoothVelocity.get(); // + is scrolling down, - is scrolling up
    const dt = Math.min(delta / 16.66, 2); // Normalize frame rate, cap to prevent jumps

    s.time += 0.02 * dt;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const centerX = vw / 2;
    const centerY = vh / 2;

    // Check if hitting the literal physical edge of the device screen
    // (using 10px margin so the edge of the butterfly visually touches the screen edge)
    const margin = 10;
    const atEdge = s.px <= margin || s.px >= vw - margin || s.py <= margin || s.py >= vh - margin;

    if (atEdge && !s.returningToCenter) {
      s.returningToCenter = true;
    }

    // Check if reached center (within a radius)
    const distToCenter = Math.hypot(centerX - s.px, centerY - s.py);
    if (s.returningToCenter && distToCenter < 150) {
      s.returningToCenter = false;
      s.baseAngle = Math.random() * Math.PI * 2; // change direction randomly when reaching center
    }

    let targetAngle = s.angle;
    let speed = 1.5 * dt;
    let turnSpeed = 0.08;

    if (s.returningToCenter) {
      // OVERRIDE: Fly directly to center
      targetAngle = Math.atan2(centerY - s.py, centerX - s.px);
      speed = 3.5 * dt; // fly slightly faster to return
      turnSpeed = 0.2; // turn towards center quickly
    } else {
      // ─── NORMAL BEHAVIOR (S-Curve & Idle) ───
      turnSpeed = 0.1; // Smooth sweeping turn
      if (v > 15) {
        // SCROLL DOWN
        targetAngle = (Math.PI / 2) + Math.sin(s.time * 1.5 + s.phase) * 1.4;
        speed = 2.0 * dt + Math.min(v / 250, 2.5);
      } 
      else if (v < -15) {
        // SCROLL UP
        targetAngle = (-Math.PI / 2) + Math.sin(s.time * 1.5 + s.phase) * 1.4;
        speed = 2.0 * dt + Math.min(Math.abs(v) / 250, 2.5);
        turnSpeed = 0.3; // Fast turn to face up instantly
      } 
      else {
        // IDLE BEHAVIOR
        s.baseAngle += (Math.random() - 0.5) * 0.03 * dt;
        targetAngle = s.baseAngle + Math.sin(s.time) * 1.2 + Math.cos(s.time * 0.7) * 0.8;
        speed = 1.6 * dt;
        turnSpeed = 0.08;
      }
    }

    // Smoothly interpolate angle to avoid snapping
    let diff = targetAngle - s.angle;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff)); // Normalize to -PI to PI
    s.angle += diff * turnSpeed * dt;

    // Apply Velocity
    s.px += Math.cos(s.angle) * speed;
    s.py += Math.sin(s.angle) * speed;

    // STRICT CLAMPING (Using exact physical screen edges as the ultimate safety net)
    s.px = Math.max(0, Math.min(vw, s.px));
    s.py = Math.max(0, Math.min(vh, s.py));

    // ─── DEPTH SCALING (Over Images) ───
    // Check against cached bounds instead of querying the DOM (fixes the lag)
    let isOverImage = false;
    for (let i = 0; i < imageBounds.current.length; i++) {
      const rect = imageBounds.current[i];
      if (s.px >= rect.left && s.px <= rect.right && s.py >= rect.top && s.py <= rect.bottom) {
        isOverImage = true;
        break;
      }
    }
    
    s.targetScale = isOverImage ? baseScale * 0.45 : baseScale;
    s.currentScale += (s.targetScale - s.currentScale) * 0.1 * dt;

    // ─── UPDATE FRAMER MOTION VALUES ───
    x.set(s.px);
    y.set(s.py);
    // Add 90 degrees because our SVG natively points UP
    rotate.set((s.angle * 180) / Math.PI + 90);
    scale.set(s.currentScale);
  });

  return (
    <Fragment>
      <style>{`
        @keyframes flap-left-${ct} {
          0%, 100% { transform: rotateY(12deg) rotateX(8deg); }
          50%       { transform: rotateY(60deg) rotateX(-4deg); }
        }
        @keyframes flap-right-${ct} {
          0%, 100% { transform: rotateY(-12deg) rotateX(8deg); }
          50%       { transform: rotateY(-60deg) rotateX(-4deg); }
        }
        @keyframes float-body-${ct} {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
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
          /* Flap speed is constant regardless of scroll */
          animation: flap-left-${ct} 0.75s infinite alternate cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
        .bfly-rw-${ct} {
          left: 50%;
          transform-origin: left center;
          animation: flap-right-${ct} 0.75s infinite alternate cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }

        .bfly-root-${ct} { display: none; }
        @media (min-width: 768px) { .bfly-root-${ct} { display: block; } }
      `}</style>

      <motion.div
        className={`bfly-root-${ct}`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x,
          y,
          rotateZ: rotate,
          scale,
          pointerEvents: 'none',
          zIndex: 9999, // High z-index to fly above everything
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          // Offset back by half its size so x,y aligns perfectly with the center
          marginLeft: -45,
          marginTop: -32.5,
        }}
      >
        <div style={{ position: 'relative', width: 90, height: 65, transformStyle: 'preserve-3d', animation: `float-body-${ct} 2s infinite ease-in-out` }}>
          
          {/* Left Wing */}
          <svg className={`bfly-wing-${ct} bfly-lw-${ct}`} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`bfly-gl-${ct}`} x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color1} />
                {color3 && <stop offset="50%" stopColor={color2} />}
                <stop offset="100%" stopColor={color3 || color2} />
              </linearGradient>
            </defs>
            <path d="M100,10 C60,-5 10,10 0,40 C-5,65 15,80 25,80 C20,95 45,105 65,95 C90,80 95,60 100,45 Z" fill="#111" />
            <path d="M95,15 C60,5 20,15 10,38 C25,48 45,45 65,35 C80,28 90,20 95,15 Z" fill={`url(#bfly-gl-${ct})`} />
            <path d="M92,20 C65,30 25,45 15,55 C35,62 55,55 75,45 C85,38 92,25 92,20 Z" fill={`url(#bfly-gl-${ct})`} />
            <path d="M95,45 C70,55 40,65 30,75 C45,85 65,75 80,60 C90,50 95,45 95,45 Z" fill={`url(#bfly-gl-${ct})`} />
            <path d="M85,55 C65,65 45,75 35,85 C55,95 75,85 85,70 Z" fill={`url(#bfly-gl-${ct})`} />
            <path d="M95,15 C65,25 35,45 10,50" stroke="#111" strokeWidth="2.5" fill="none" />
            <path d="M100,45 C75,55 45,75 30,85" stroke="#111" strokeWidth="2.5" fill="none" />
            <path d="M75,35 C65,55 45,65 25,75" stroke="#111" strokeWidth="2.5" fill="none" />
            {[[10, 20], [5, 30], [3, 40], [6, 52], [12, 65], [20, 75], [32, 88], [45, 98], [60, 95], [75, 85]].map(([cx, cy], i) =>
              <circle key={i} cx={cx} cy={cy} r="1.8" fill="#fff" />
            )}
          </svg>

          {/* Right Wing */}
          <svg className={`bfly-wing-${ct} bfly-rw-${ct}`} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`bfly-gr-${ct}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color1} />
                {color3 && <stop offset="50%" stopColor={color2} />}
                <stop offset="100%" stopColor={color3 || color2} />
              </linearGradient>
            </defs>
            <path d="M0,10 C40,-5 90,10 100,40 C105,65 85,80 75,80 C80,95 55,105 35,95 C10,80 5,60 0,45 Z" fill="#111" />
            <path d="M5,15 C40,5 80,15 90,38 C75,48 55,45 35,35 C20,28 10,20 5,15 Z" fill={`url(#bfly-gr-${ct})`} />
            <path d="M8,20 C35,30 75,45 85,55 C65,62 45,55 25,45 C15,38 8,25 8,20 Z" fill={`url(#bfly-gr-${ct})`} />
            <path d="M5,45 C30,55 60,65 70,75 C55,85 35,75 20,60 C10,50 5,45 5,45 Z" fill={`url(#bfly-gr-${ct})`} />
            <path d="M15,55 C35,65 55,75 65,85 C45,95 25,85 15,70 Z" fill={`url(#bfly-gr-${ct})`} />
            <path d="M5,15 C35,25 65,45 90,50" stroke="#111" strokeWidth="2.5" fill="none" />
            <path d="M0,45 C25,55 55,75 70,85" stroke="#111" strokeWidth="2.5" fill="none" />
            <path d="M25,35 C35,55 55,65 75,75" stroke="#111" strokeWidth="2.5" fill="none" />
            {[[90, 20], [95, 30], [97, 40], [94, 52], [88, 65], [80, 75], [68, 88], [55, 98], [40, 95], [25, 85]].map(([cx, cy], i) =>
              <circle key={i} cx={cx} cy={cy} r="1.8" fill="#fff" />
            )}
          </svg>

          {/* Body */}
          <div style={{ position: 'absolute', left: '50%', top: '12%', transform: 'translateX(-50%)', width: 6, height: 45, background: '#111', borderRadius: 6 }}>
            <div style={{ position: 'absolute', top: -7, left: -1, width: 8, height: 8, background: '#000', borderRadius: '50%' }}>
              <div style={{ position: 'absolute', top: 2, left: 1, width: 1.5, height: 1.5, background: '#fff', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', top: 2, right: 1, width: 1.5, height: 1.5, background: '#fff', borderRadius: '50%' }} />
            </div>
            <svg style={{ position: 'absolute', top: -20, left: -12, width: 30, height: 20, overflow: 'visible' }}>
              <path d="M15,20 C10,10 0,5 0,0" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M15,20 C20,10 30,5 30,0" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          
        </div>
      </motion.div>
    </Fragment>
  );
}
