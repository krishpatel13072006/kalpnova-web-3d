import { useEffect, useRef } from "react";
import gsap from "../lib/gsap";

const clients = [
  { name: "BoostIQ", logo: "/clients/Boostiq white logo.webp" },
  { name: "Westrock", logo: "/clients/Westrock logo.webp" },
  { name: "Krushak", logo: "/clients/krushak.webp" },
  { name: "London Coffee", logo: "/clients/London Coffee logo.webp" },
  { name: "Pixal Plus", logo: "/clients/PP logo.webp" },
  { name: "SchoolG", logo: "/clients/LOGO.webp" },
  { name: "Maruti", logo: "/clients/maruti.webp" },
  { name: "Lioncut", logo: "/clients/lioncut.webp" },
  { name: "Mayota", logo: "/clients/Asset 5@4x-8.webp" },
  { name: "Kalpnova", logo: "/kalpnova.svg" },
  { name: "Lotus Salon", logo: "/clients/lotus salon.webp" },
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

          <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#FFE1C5] tracking-tight leading-tight">
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
              {[...clients, ...clients, ...clients].map((client, i) => (
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
                    alt={`${client.name} logo - Kalpnova Client`}
                    loading="lazy"
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
