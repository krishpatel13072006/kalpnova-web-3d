import { useEffect, useRef } from "react";
import gsap from "../lib/gsap";

export default function ServiceModal({ service, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overlay fade
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      // Content animation
      gsap.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });

      // Ambient glow loop
      gsap.to(glowRef.current, {
        x: 40,
        y: -30,
        scale: 1.1,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  if (!service) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md
                 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* ORANGE AMBIENT GLOW */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-[520px] h-[520px] rounded-full
                   bg-[radial-gradient(circle,rgba(226,74,43,0.45),transparent_65%)]
                   blur-[140px]"
      />

      {/* BORDER WRAPPER */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative p-[1px] rounded-3xl
                   bg-gradient-to-br from-orange-500/70 via-orange-500/30 to-transparent"
      >
        {/* MODAL CARD */}
        <div
          ref={contentRef}
          className="relative z-10 rounded-3xl
                     bg-[#141414]
                     max-w-xl w-full p-8 md:p-10
                     shadow-[0_0_80px_rgba(226,74,43,0.25)]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full
                       flex items-center justify-center
                       bg-white/5 hover:bg-white/10
                       text-sm opacity-70 hover:opacity-100
                       transition"
          >
            ✕
          </button>

          {/* Accent tag */}
          <span className="inline-block mb-4 text-xs tracking-widest
                           text-orange-500 uppercase">
            Service
          </span>

          <h3 className="text-3xl font-bold text-orange-500">
            {service.title}
          </h3>

          <p className="mt-4 text-gray-400 leading-relaxed">
            {service.desc}
          </p>

          <p className="mt-6 text-sm text-gray-400 leading-relaxed">
            We work closely with your team to translate strategy into
            systems that scale. From discovery to execution, every step
            is intentional and aligned with growth.
          </p>

          <button
            className="mt-8 inline-flex items-center gap-2
                       text-orange-500 font-medium
                       hover:gap-3 transition-all"
          >
            Start a project →
          </button>
        </div>
      </div>
    </div>
  );
}
