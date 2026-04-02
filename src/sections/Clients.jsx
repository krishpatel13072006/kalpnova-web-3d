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
    <section className="section overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-14 max-w-xl">
          <span className="inline-block mb-4 px-4 py-1 text-xs tracking-widest
                           rounded-full border border-orange-500/30
                           text-orange-500">
            CLIENTS
          </span>

          <h2 className="text-section font-bold text-[#FFE1C5]">
            Trusted by teams
            <span className="accent"> worldwide</span>
          </h2>
        </div>

        {/* SCROLLER */}
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24
                          bg-gradient-to-r from-bg to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24
                          bg-gradient-to-l from-bg to-transparent z-10" />

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-16 w-max items-center"
            >
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center
                             min-w-[160px]
                             opacity-50
                             transition-all duration-300
                             hover:opacity-100"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-10 object-contain
                               grayscale
                               hover:grayscale-0
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
