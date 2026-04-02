import { useEffect, useRef } from "react";
import gsap from "../lib/gsap";

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.from(sectionRef.current.children, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section className="section relative overflow-hidden bg-[#0B0B0C]">
      {/* ORANGE AMBIENT GLOW */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center translate-y-24">
        <div
          className="w-[900px] h-[900px] rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, rgba(226,74,43,0.45), transparent 70%)",
          }}
        />
      </div>

      {/* ANIMATED GRID */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226,74,43,0.55) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226,74,43,0.55) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          animation: "grid-move 24s linear infinite",
          opacity: 0.45,
        }}
      />

      {/* TOP FADE */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[120px] z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, #0B0B0C, rgba(11,11,12,0))",
        }}
      />

      {/* BOTTOM FADE */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[120px] z-[2]"
        style={{
          background:
            "linear-gradient(to top, #0B0B0C, rgba(11,11,12,0))",
        }}
      />

      {/* CONTENT */}
      <div
        ref={sectionRef}
        className="relative z-10 max-w-5xl mx-auto text-center space-y-10"
      >
        <h2 className="text-section font-bold text-[#FFE1C5]">
          READY TO <span className="text-orange-500">BUILD</span> WHAT’S NEXT?
        </h2>

        <p className="max-w-2xl mx-auto text-gray-300">
          If you’re looking for clarity, direction, and a partner
          who thinks beyond templates — let’s talk.
        </p>

        <div className="flex justify-center">
          <a
            href="mailto:info@kalpnova.com"
            className="inline-flex items-center gap-2 px-10 py-4
                       rounded-full font-semibold
                       bg-orange-500 text-black
                       shadow-[0_0_60px_rgba(226,74,43,0.75)]
                       transition-all duration-300
                       hover:-translate-y-1
                       hover:shadow-[0_0_90px_rgba(226,74,43,1)]"
          >
            Start a conversation →
          </a>
        </div>
      </div>
    </section>
  );
}
