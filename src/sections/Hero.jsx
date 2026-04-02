import { useEffect, useRef } from "react";
import gsap from "../lib/gsap";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.from(heroRef.current.children, {
      y: 80,
      opacity: 0,
      stagger: 0.2,
      duration: 1.2,
      ease: "power4.out",
    });
  }, []);

  return (
    <section className="h-screen flex items-center justify-center relative z-10">
      <div ref={heroRef} className="text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
          IMAGINE <br />
          WHAT HAPPENS <br />
          <span className="text-accent">NEXT</span>
        </h1>

        <p className="text-[#FFE1C5] max-w-xl mx-auto">
          We help ambitious businesses turn clarity into momentum.
        </p>
      </div>
    </section>
  );
}
