export default function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]"
      style={{
        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')",
        backgroundRepeat: "repeat",
        mixBlendMode: "overlay",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
}
