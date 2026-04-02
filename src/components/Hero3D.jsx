import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";

function Blob() {
  const meshRef = useRef();

  useFrame((state) => {
    const { x, y } = state.mouse;

    if (!meshRef.current) return;

    // subtle parallax rotation
    meshRef.current.rotation.y += (x * 0.6 - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (y * 0.6 - meshRef.current.rotation.x) * 0.05;
  });

  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={3.5}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color="#E24A2B"
          distort={0.45}
          speed={1}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ alpha: true }}
    >
      {/* LIGHTING */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 4, 4]} intensity={1.5} />
      <pointLight position={[-4, -4, 4]} intensity={1} />

      <Blob />
    </Canvas>
  );
}
