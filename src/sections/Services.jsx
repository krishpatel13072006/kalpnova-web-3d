import { useEffect, useRef, useState } from "react";
import gsap from "../lib/gsap";
import ServiceModal from "../components/ServiceModal";

const services = [
  {
    title: "Branding & Identity",
    desc: "We shape your brand’s positioning, voice, and visual identity to create lasting recognition.",
  },
  {
    title: "Social Media Design",
    desc: "Scroll-stopping creatives and content systems designed to grow engagement and brand recall.",
  },
  {
    title: "Web & App",
    desc: "High-performance, conversion-focused websites and apps with a cinematic user experience.",
  },
  {
    title: "Print Media Design",
    desc: "Impactful offline designs—from brochures to hoardings—crafted for clarity and recall.",
  },
  {
    title: "Meta Ads",
    desc: "Data-driven ad creatives optimized for attention, clicks, and measurable conversions.",
  },
  {
    title: "Video Editing",
    desc: "Dynamic video edits that tell your story, hold attention, and elevate your brand presence.",
  },    
];


export default function Services() {
  const cardsRef = useRef([]);
  const [activeService, setActiveService] = useState(null);

  // Entrance animation
  useEffect(() => {
    if (!cardsRef.current[0]) return;

    gsap.from(cardsRef.current, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardsRef.current[0],
        start: "top 80%",
      },
    });
  }, []);

  // Magnetic hover (unchanged)
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          x: x * 12,
          y: y * 12,
          rotateX: -y * 6,
          rotateY: x * 6,
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const onLeave = () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });
  }, []);

  return (
    <>
      <section className="section">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* HEADER */}
          <div className="max-w-2xl space-y-4">
            <h2 className="text-section font-bold text-[#FFE1C5]">
              WHAT WE <span className="accent">BUILD</span>
            </h2>
            <p className="text-[#FFE1C5]">
              We partner with ambitious teams to design clarity,
              momentum, and long-term growth.
            </p>
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => (cardsRef.current[i] = el)}
                className="
                  group card relative p-6 overflow-hidden cursor-pointer
                  rounded-2xl
                  bg-[#141414]
                  border border-orange-500/20
                  hover:border-orange-500/50
                  transition-colors duration-500
                "
              >
                {/* Inner glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                bg-[radial-gradient(circle_at_top_left,rgba(226,74,43,0.25),transparent_60%)]" />

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />

                <h3 className="text-xl font-semibold mb-2 text-[#FFE1C5]">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#FFE1C5]">
                  {item.desc}
                </p>

                <button
                  onClick={() => setActiveService(item)}
                  className="block mt-6 text-sm accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Learn more →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {activeService && (
        <ServiceModal
          service={activeService}
          onClose={() => setActiveService(null)}
        />
      )}
    </>
  );
}
