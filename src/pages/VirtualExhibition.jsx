import React, { useState, useRef, Suspense, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Text, Environment, Sparkles, useCursor, OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import SEO from "../components/SEO";
import * as THREE from 'three';
import { portfolioItems } from '../data/portfolio';

// --- 1. DATA CONFIGURATION ---
const THEME_COLORS = ["#ff6b2b", "#00d8ff", "#ff0055", "#ffaa00", "#00ff88", "#8800ff"];

// --- 2. COMPONENTS ---

function Loader() {
  return (
    <Html center>
      <div style={{ color: 'white', background: 'rgba(0,0,0,0.95)', padding: '20px 40px', borderRadius: '15px', border: '1px solid #333', textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '16px', letterSpacing: '2px', color: '#ff6b2b' }}>KALPNOVA</h2>
        <p style={{ margin: '5px 0 0 0', opacity: 0.7, fontSize: '11px' }}>PREPARING SHOWCASE...</p>
      </div>
    </Html>
  );
}

function WallPoster({ url, position, rotation = [0, 0, 0], size = [4, 2.5] }) {
  if (!url) return null;
  const texture = useTexture(encodeURI(url));
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function ProjectRoom({ project }) {
  const { gallery, color, image } = project;
  const displayImages = gallery && gallery.length > 0 ? gallery : [image];
  const limitedImages = displayImages.slice(0, 12);

  return (
    <group>
      <mesh>
        <boxGeometry args={[16, 8, 16]} />
        <meshStandardMaterial color="#020202" side={THREE.BackSide} />
      </mesh>
      <gridHelper args={[16, 16, 0x222222, 0x111111]} position={[0, -3.9, 0]} />
      <group position={[0, 0, -7.8]}>
        {limitedImages.slice(0, 3).map((img, i) => (
          <WallPoster key={`back-${i}`} url={img} position={[(i - 1) * 5, 0, 0]} />
        ))}
      </group>
      <group position={[-7.8, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {limitedImages.slice(3, 6).map((img, i) => (
          <WallPoster key={`left-${i}`} url={img} position={[(i - 1) * 5, 0, 0]} />
        ))}
      </group>
      <group position={[7.8, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {limitedImages.slice(6, 9).map((img, i) => (
          <WallPoster key={`right-${i}`} url={img} position={[(i - 1) * 5, 0, 0]} />
        ))}
      </group>
      <group position={[0, 0, 7.8]} rotation={[0, Math.PI, 0]}>
        {limitedImages.slice(9, 12).map((img, i) => (
          <WallPoster key={`front-${i}`} url={img} position={[(i - 1) * 5, 0, 0]} />
        ))}
      </group>
      <ambientLight intensity={1.5} />
      <pointLight position={[0, 4, 0]} intensity={3} color={color} />
    </group>
  );
}

function GalleryCard({ project, onSelect, ...props }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  useCursor(hovered);
  const texture = useTexture(encodeURI(project.imgUrl));

  useFrame(() => {
    if (ref.current) {
      const targetScale = hovered ? 1.08 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={ref}
      {...props}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerDown={(e) => {
        e.stopPropagation();
        // Record start position to distinguish between tap and scroll
        ref.current.userData.pointerDownPos = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        const downPos = ref.current.userData.pointerDownPos;
        if (downPos) {
          const dist = Math.sqrt(Math.pow(e.clientX - downPos.x, 2) + Math.pow(e.clientY - downPos.y, 2));
          // If moved less than 10px, it's a click
          if (dist < 10) {
            onSelect(project);
          }
        }
      }}
    >
      <mesh position={[0, -0.4, -0.05]}>
        <planeGeometry args={[5.0, 6.0]} />
        <meshStandardMaterial color={hovered ? "#121212" : "#080808"} />
      </mesh>
      <mesh position={[0, 1.0, 0.02]}>
        <planeGeometry args={[4.2, 2.6]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <Text position={[0, -1.6, 0.1]} fontSize={0.3} color="white" fontWeight="black">
        {project.shortName}
      </Text>
      <Text position={[0, -2.1, 0.1]} fontSize={0.14} color={project.color} letterSpacing={0.1}>
        {project.category?.toUpperCase() || "PROJECT"}
      </Text>
    </group>
  );
}

function ProjectsGrid({ onSelectProject, setScrollProgress }) {
  const { width } = useThree().size;
  const scrollY = useRef(0);
  const groupRef = useRef();

  // Responsive column logic
  const cols = width < 600 ? 1 : width < 1050 ? 2 : 3;
  const spacingX = width < 600 ? 0 : width < 1050 ? 6.5 : 6.5;
  const spacingY = 6.2; 

  const projects = useMemo(() => {
    return portfolioItems
      .filter(p => !p.isComingSoon)
      .map((p, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const x = (col - (cols - 1) / 2) * spacingX;
        const y = -row * spacingY + 2;
        const shortName = (p.client?.split('|')[0]?.split('(')[0]?.trim() || p.title).toUpperCase();
        return {
          ...p,
          shortName,
          color: THEME_COLORS[idx % THEME_COLORS.length],
          position: [x, y, 0],
          imgUrl: p.image || p.heroImage,
        };
      });
  }, [cols, spacingX]);

  // Scroll handling — prevent page scroll ONLY when within the 3D grid range
  useEffect(() => {
    const container = document.getElementById('virtual-exhibition-container');
    if (!container) return;

    const handleWheel = (e) => {
      const totalRows = Math.ceil(projects.length / cols);
      const maxScroll = (totalRows - 1) * spacingY;
      
      const isAtTop = scrollY.current >= 1.95;
      const isAtBottom = scrollY.current <= -maxScroll + 2.05;

      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) return;

      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      
      scrollY.current -= e.deltaY * 0.005;
      scrollY.current = THREE.MathUtils.clamp(scrollY.current, -maxScroll + 2, 2);
      
      const currentProgress = (2 - scrollY.current) / (maxScroll || 1);
      setScrollProgress(currentProgress);
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;

      const totalRows = Math.ceil(projects.length / cols);
      const maxScroll = (totalRows - 1) * spacingY;

      const isAtTop = scrollY.current >= 1.95;
      const isAtBottom = scrollY.current <= -maxScroll + 2.05;

      if ((deltaY < 0 && isAtTop) || (deltaY > 0 && isAtBottom)) return;

      if (e.cancelable) e.preventDefault();
      e.stopPropagation();

      scrollY.current -= deltaY * 0.015; // Adjusted sensitivity for touch
      scrollY.current = THREE.MathUtils.clamp(scrollY.current, -maxScroll + 2, 2);

      const currentProgress = (2 - scrollY.current) / (maxScroll || 1);
      setScrollProgress(currentProgress);
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [projects.length, cols, spacingY, setScrollProgress]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -scrollY.current, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((proj) => (
        <GalleryCard key={proj.id} project={proj} onSelect={onSelectProject} position={proj.position} />
      ))}
    </group>
  );
}

export default function VirtualExhibition() {
  const [activeProject, setActiveProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <div id="virtual-exhibition-container" style={{ width: '100%', height: '100vh', background: '#000', position: 'relative', overflow: 'hidden', touchAction: 'none' }}>
      <SEO title="Virtual Showcase" description="Immersive 3D gallery." url="/showcase" />

      <div style={{ position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%) rotate(-180deg)', zIndex: 100, writingMode: 'vertical-rl', textAlign: 'center' }}>
         <h1 style={{ color: 'white', fontSize: '11px', letterSpacing: '8px', opacity: 0.3, margin: 0, fontWeight: 'normal', textTransform: 'uppercase' }}>VIRTUAL EXHIBITION</h1>
      </div>

      {/* Top Left Navigation (Below Navbar) */}
      <div style={{ position: 'absolute', left: '40px', top: '120px', zIndex: 100 }}>
        {activeProject ? (
          <button 
            onClick={() => setActiveProject(null)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#ff6b2b', 
              fontSize: '14px', 
              fontWeight: '900', 
              textTransform: 'uppercase', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: 0
            }}
          >
            ← BACK TO GALLERY
          </button>
        ) : (
          <button 
            onClick={() => window.location.href = '/insidekalpnova'} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#ff6b2b', 
              fontSize: '14px', 
              fontWeight: '900', 
              textTransform: 'uppercase', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: 0
            }}
          >
            ← EXIT SHOWCASE
          </button>
        )}
      </div>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 50 }}>
        <color attach="background" args={['#000000']} />
        <Suspense fallback={<Loader />}>
          {activeProject ? (
            <group key={activeProject.id}>
              <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
              <ProjectRoom project={activeProject} />
              <OrbitControls enableZoom={true} enablePan={true} />
            </group>
          ) : (
            <group>
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <Sparkles count={40} scale={20} size={1} color="white" speed={0.2} />
              <ProjectsGrid onSelectProject={setActiveProject} setScrollProgress={setScrollProgress} />
              <Environment preset="night" />
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </group>
          )}
        </Suspense>
      </Canvas>
      
      {!activeProject && (
        <div style={{ position: 'absolute', right: '10px', top: '20%', height: '60%', width: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', zIndex: 100 }}>
          <div style={{ 
            width: '100%', 
            height: '40px', 
            background: 'rgba(255,255,255,0.3)', 
            borderRadius: '10px', 
            transform: `translateY(${scrollProgress * (window.innerHeight * 0.6 - 40)}px)`,
            transition: 'transform 0.1s ease-out'
          }} />
        </div>
      )}
    </div>
  );
}
