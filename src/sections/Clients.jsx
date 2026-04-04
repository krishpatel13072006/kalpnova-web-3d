import { useEffect, useRef } from "react";
import gsap from "../lib/gsap";

const clients = [
  { name: "LionCut", logo: "/clients/lioncut.png" },
  { name: "Nilambuj Mandapam", logo: "/clients/nilambuj.svg" },
  { name: "innovative", logo: "/clients/innovattive.png" },
  { name: "sivahdam", logo: "/clients/sivahdam.png" },
  { name: "krushak", logo: "/clients/krushak.png" },
  { name: "The Safar", logo: "/clients/thesafar.png" },
];

export default function Clients() {
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const width = trackRef.current.scrollWidth / 2;

      gsap.to(trackRef.current, {
        x: -width,
        duration: 25,
        ease: "linear",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section overflow-hidden py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-14 max-w-xl">
          <span className="inline-block mb-4 px-4 py-1 text-xs tracking-widest
                           rounded-full border border-orange-500/30
                           text-orange-500 font-medium">
            CLIENTS
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#FFE1C5] tracking-tight leading-tight">
            Trusted by teams
            <span className="text-orange-500"> worldwide</span>
          </h2>
        </div>

        {/* SCROLLER */}
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32
                          bg-gradient-to-r from-bg via-bg/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32
                          bg-gradient-to-l from-bg via-bg/80 to-transparent z-10" />

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-20 w-max items-center py-4"
            >
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center
                             min-w-[180px]
                             opacity-60
                             transition-all duration-300
                             hover:opacity-100 hover:scale-110"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-12 object-contain
                               grayscale
                               hover:grayscale-0
                               hover:drop-shadow-[0_0_25px_rgba(249,115,22,0.8)]
                               transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}