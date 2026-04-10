/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Color } from 'three';

const hexToNormalizedRGB = hex => {
  hex = hex.replace('#', '');
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255
  ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  // Bypassing Camera directly for a guaranteed full-screen quad layout!
  gl_Position = vec4(position.x, position.y, 0.0, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

const SilkPlane = function SilkPlane({ uniforms }) {
  const materialRef = useRef(null);

  useFrame((_, delta) => {
    // Safety check prevents R3F unmount crashes
    if(materialRef.current) {
        materialRef.current.uniforms.uTime.value += 0.1 * delta;
    }
  });

  return (
    <mesh>
      {/* 2x2 clip space quad perfectly fills any screen without shrinking manually */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        ref={materialRef} 
        uniforms={uniforms} 
        vertexShader={vertexShader} 
        fragmentShader={fragmentShader} 
        transparent={true} 
      />
    </mesh>
  );
};

const Silk = ({ speed = 5, scale = 1, color = '#FF6B00', noiseIntensity = 1.5, rotation = 0, className = "" }) => {
  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 }
    }),
    [speed, scale, noiseIntensity, color, rotation]
  );
  
  return (
    <div className={`pointer-events-none ${className}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
      {/* Using preserveDrawingBuffer prevents Canvas blackouts on render cycles */}
      <Canvas 
        dpr={[1, 2]} 
        frameloop="always" 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      >
        <SilkPlane uniforms={uniforms} />
      </Canvas>
    </div>
  );
};

export default Silk;
