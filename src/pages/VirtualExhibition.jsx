import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from "@react-three/drei";
import SEO from "../components/SEO";
import {
  Text,
  Image,
  Environment,
  Sparkles,
  useCursor,
  Float,
  OrbitControls,
  PerspectiveCamera,
  Html
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- 1. RELIABLE DATA CONFIGURATION ---
// I am using placehold.co with dark colors to match the "CGI" aesthetic.
const projects = [
  {
    id: 1,
    title: "ECOLIVE",
    subtitle: "Delivery Module",
    description: "A complete logistics solution connecting vendors with local delivery partners.",
    tech: "REACT • NODE.JS • POSTGRESQL",
    // Dark grey background with Cyan text
    imgUrl: "https://i.postimg.cc/FHw6pdw1/image.png",
    posters: {
      back: "https://i.postimg.cc/QtFky07v/image.png",
      left: "https://i.postimg.cc/FHw6pdw1/image.png",
      right: "https://i.postimg.cc/T18mHGfX/image.png",
      front: "https://i.postimg.cc/QtFky07v/image.png",
    },

    position: [0, 0, 0],
    rotation: [0, 0, 0],
    color: "#00d8ff"
  },
  {
    id: 2,
    title: "ANDROID",
    subtitle: "Native Architecture",
    description: "High-performance native application built for scalability and offline usage.",
    tech: "KOTLIN • JETPACK COMPOSE • FIREBASE",
    // Dark grey background with Pink text
    imgUrl: "https://i.postimg.cc/QtFky07v/image.png",
    posters: {
      back: "https://i.postimg.cc/FHw6pdw1/image.png",
      left: "https://i.postimg.cc/QtFky07v/image.png",
      right: "https://i.postimg.cc/T18mHGfX/image.png",
      front: "https://i.postimg.cc/FHw6pdw1/image.png",
    },
    // position: [-3.5, 0, 0.5],
    position: [-2.8, 0, 0.5],
    rotation: [0, 0.4, 0],
    color: "#ff0055"
  },
  {
    id: 3,
    title: "SYSTEMS",
    subtitle: "Enterprise Tech",
    description: "Internal tooling for managing large-scale data operations and security.",
    tech: "PYTHON • DOCKER • AWS",
    // Dark grey background with Orange text
    imgUrl: "https://i.postimg.cc/T18mHGfX/image.png",
    posters: {
      back: "https://i.postimg.cc/T18mHGfX/image.png",
      left: "https://i.postimg.cc/FHw6pdw1/image.png",
      right: "https://i.postimg.cc/QtFky07v/image.png",
      front: "https://i.postimg.cc/T18mHGfX/image.png",
    },
    // position: [3.5, 0, 0.5],
    position: [2.8, 0, 0.5],
    rotation: [0, -0.4, 0],
    color: "#ffaa00"
  }
];

// --- 2. LOADING SCREEN ---
function Loader() {
  return (
    <Html center>
      <div style={{ color: '#00d8ff', fontFamily: 'sans-serif', letterSpacing: '2px' }}>
        INITIALIZING...
      </div>
    </Html>
  );
}

// wall poster
function WallPoster({
  title,
  url,
  position,
  rotation = [0, 0, 0],
  size = [3.5, 5],
  accent = "#ffffff",
}) {
  const texture = useTexture(url);

  return (
    <group position={position} rotation={rotation}>
      {/* Heading */}
      <Text
        position={[0, size[1] / 2 + 0.6, 0.15]}
        fontSize={0.28}
        color={accent}
        letterSpacing={0.08}
      >
        {title}
      </Text>

      {/* Frame */}
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[size[0] + 0.4, size[1] + 0.4]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Poster (UNLIT, clean, readable) */}
      <mesh>
        <planeGeometry args={size} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
        />
      </mesh>

      {/* Soft gallery accent */}
      <spotLight
        position={[0, size[1] / 2 + 1.8, 3]}
        angle={0.55}
        penumbra={1}
        intensity={0.6}
        color={accent}
      />
    </group>
  );
}

function ProjectRoom({ project }) {
  const { posters, color, title } = project;

  return (
    <group>
      {/* Room Shell */}
      <mesh>
        <boxGeometry args={[12, 7, 12]} />
        <meshStandardMaterial
          color="#050505"
          side={THREE.BackSide}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Floor */}
      <gridHelper
        args={[12, 12, 0x333333, 0x111111]}
        position={[0, -3.4, 0]}
      />

      {/* BACK WALL */}
      <WallPoster
        title={`${title} — Overview`}
        url={posters.back}
        position={[0, 0, -5.85]}
        size={[8, 5]}
        accent={color}
      />

      {/* LEFT WALL */}
      <WallPoster
        title="Architecture"
        url={posters.left}
        position={[-5.85, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        accent={color}
      />

      {/* RIGHT WALL */}
      <WallPoster
        title="Technology Stack"
        url={posters.right}
        position={[5.85, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        accent={color}
      />

      {/* FRONT WALL */}
      <WallPoster
        title="Concept & Vision"
        url={posters.front}
        position={[0, 0, 5.85]}
        rotation={[0, Math.PI, 0]}
        size={[4, 3]}
        accent={color}
      />

      {/* Ambient room light */}
      <ambientLight intensity={0.4} />

      {/* Ceiling fill */}
      <pointLight position={[0, 3, 0]} intensity={1.2} />
    </group>
  );
}


// --- 3. ROOM COMPONENT ---
// function ProjectRoom({ project }) {
//   return (
//     <group>
//       {/* Room Shell */}
//       <mesh rotation={[0, 0, 0]}>
//         <boxGeometry args={[12, 7, 12]} />
//         <meshStandardMaterial color="#050505" side={THREE.BackSide} roughness={0.3} metalness={0.8} />
//       </mesh>

//       {/* Grid Floor */}
//       <gridHelper args={[12, 12, 0x444444, 0x111111]} position={[0, -3.4, 0]} />

//       {/* CENTER SCREEN (Main Image) */}
//       <group position={[0, 0, -5.9]}>
//         <Image url={project.imgUrl} scale={[8, 5]} transparent />
//         <Text position={[0, -3, 0.1]} fontSize={0.2} color={project.color} letterSpacing={0.1}>
//           INTERACTIVE TERMINAL // {project.title}
//         </Text>
//       </group>

//       {/* LEFT WALL (Info) */}
//       <group position={[-5.9, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
//         <Text position={[0, 1.5, 0.1]} fontSize={0.8} color="white" anchorX="center" font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff">
//           {project.title}
//         </Text>
//         <Text position={[0, 0.5, 0.1]} fontSize={0.3} color={project.color} anchorX="center">
//           {project.subtitle}
//         </Text>
//         <Text position={[0, -1, 0.1]} fontSize={0.25} color="#cccccc" anchorX="center" maxWidth={5} lineHeight={1.6}>
//           {project.description}
//         </Text>
//       </group>

//       {/* RIGHT WALL (Tech Stack) */}
//       <group position={[5.9, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
//         <Text position={[0, 1.5, 0.1]} fontSize={0.4} color="white">
//           SYSTEM SPEC
//         </Text>
//         <mesh position={[0, 1.2, 0]}>
//           <boxGeometry args={[4, 0.05, 0.1]} />
//           <meshBasicMaterial color={project.color} />
//         </mesh>
//         <Text position={[0, 0, 0.1]} fontSize={0.3} color="#aaaaaa" anchorX="center" maxWidth={4}>
//           {project.tech}
//         </Text>
//       </group>

//       {/* Lighting */}
//       <pointLight position={[0, 3, 0]} intensity={1.5} distance={10} color="white" />
//       <pointLight position={[-5, 0, 0]} intensity={2} distance={8} color={project.color} />
//       <pointLight position={[5, 0, 0]} intensity={2} distance={8} color={project.color} />
//     </group>
//   );
// }

// --- 4. GALLERY CARD ---
function GalleryCard({ project, onSelect, ...props }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  useFrame((state) => {
    if (ref.current) {
      const targetScale = hovered ? 1.15 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Look at mouse
      // const x = state.pointer.x * 0.2;
      const x = state.pointer.x * 0.12;
      const y = state.pointer.y * 0.2;
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, x + props.rotation[1], 0.1);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -y, 0.1);
    }
  });

  return (
    <group
      ref={ref}
      {...props}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => onSelect(project)}
    >
      <Image
        url={project.imgUrl}
        scale={[2.2, 1.45]}
        opacity={0.85}
        toneMapped={false}
      />

      {/* Glow frame behind image */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2.55, 1.75]} />
        <meshBasicMaterial color={hovered ? project.color : "#222"} />
      </mesh>

      <Text position={[0, -1.0, 0.1]} fontSize={0.15} color="white" font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff">
        {project.title}
      </Text>
    </group>
  );
}

// --- 5. MAIN COMPONENT ---
export default function VirtualExhibition() {
  const [activeProject, setActiveProject] = useState(null);

  // Simple, safe inline styles
  const containerStyle = { width: '100%', height: '100vh', background: '#000' };
  const headerStyle = { position: 'absolute', top: 40, left: 40, zIndex: 10, pointerEvents: 'none' };
  const btnStyle = {
    position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
    zIndex: 20, padding: '12px 30px', background: 'white', border: 'none',
    color: 'black', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px'
  };

  return (
    <div style={containerStyle}>
      <SEO 
        title="Virtual Showcase"
        description="Experience an immersive 3D gallery showcasing Kalpnova's premium high-impact web, app, and enterprise solutions."
        url="/showcase"
      />
      {/* <div style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '3rem', color: 'white', fontFamily: 'sans-serif' }}>KALPNOVA</h1>
        <p style={{ color: activeProject ? activeProject.color : '#fff', margin: 0, fontFamily: 'monospace' }}>
          {activeProject ? `// ACCESSING: ${activeProject.title}` : '// SELECT MODULE'}
        </p>
      </div> */}

      {activeProject ? (
        <button onClick={() => setActiveProject(null)} style={btnStyle}>
          RETURN TO GALLERY
        </button>
      ) : (
        <button onClick={() => window.location.href = '/insidekalpnova'} style={btnStyle}>
          ⟵ BACK TO HUB
        </button>
      )}

      <Canvas>
        <color attach="background" args={['#050505']} />

        {/* Safe Loader */}
        <Suspense fallback={<Loader />}>

          {/* Post Processing */}
          <EffectComposer disableNormalPass>
            {/* <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} radius={0.5} /> */}
            <Bloom
              luminanceThreshold={0.6}
              intensity={0.6}
              radius={0.4}
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>

          {activeProject ? (
            <>
              <PerspectiveCamera
                makeDefault
                position={[0, 0, 8]}
                fov={38}
              />
              <ProjectRoom project={activeProject} />
              <OrbitControls enableZoom={false} enablePan={false} />
            </>
          ) : (
            // GALLERY MODE
            <>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#00d8ff" />
              <pointLight position={[-10, -10, -10]} intensity={2} color="#ff0055" />

              <Sparkles count={120} scale={10} size={3} speed={0.4} opacity={0.5} color="#ffffff" />

              {/* <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
               */}
              <Float speed={2} rotationIntensity={0} floatIntensity={0.15}>
                <group position={[0, -0.2, 0]}>
                  {projects.map((proj) => (
                    <GalleryCard
                      key={proj.id}
                      project={proj}
                      onSelect={setActiveProject}
                      position={proj.position}
                      rotation={proj.rotation}
                    />
                  ))}
                </group>
              </Float>
              <Environment preset="city" />
              {/* <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} /> */}
              <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={60} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.6}
                dampingFactor={0.08}
                enableDamping
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />

            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}