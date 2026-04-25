import { useEffect, useRef } from "react";
import gsap from "../lib/gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); // ✅ REQUIRED

const testimonials = [
  {
    quote:
      "The team at Kalpnova is incredibly supportive and put tremendous effort into the entire development process. Their suggestions were invaluable, and we were impressed by the timely delivery of our products.",
    name: "Bhavin Patel",
    role: "Founder, Krusak",
  },
  {
    quote:
      "We were impressed by the technical depth and attention to detail Kalpnova brought to our project. They didn't just build software; they engineered a robust solution that scaled perfectly with our needs. A highly reliable technology partner.",
    name: "Krunal Vanja",
    role: "Founder, Lioncut",
  },
  {
    quote:
      "Transparency and efficiency define our experience with Kalpnova. From the initial roadmap to the final launch, communication was seamless. It is rare to find a development team that cares as much about your business goals as you do.",
    name: "Maharshi Patel",
    role: "Founder, Nilambuj Mandapam/Maa No Garbo",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!cardsRef.current.length) return;

    const ctx = gsap.context(() => {
      // ✅ SAFETY: ensure visible before animation
      gsap.set(cardsRef.current, { opacity: 1 });

      gsap.from(cardsRef.current, {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="max-w-2xl">
          <span className="inline-block mb-4 px-4 py-1 text-xs tracking-widest
                           rounded-full border border-orange-500/30
                           text-orange-500">
            TESTIMONIALS
          </span>

          <h2 className="font-heading text-section font-bold text-section text-[#FFE1C5] uppercase">
            Trusted by teams who
            <span className="accent"> value clarity</span>
          </h2>

          <p className="mt-4 text-[#FFE1C5]">
            We work closely with ambitious founders and teams.
            Here’s what they say after building with us.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className="relative p-8 rounded-2xl
                         bg-[#141414]
                         border border-orange-500/10
                         opacity-100
                         transition-all duration-300
                         hover:-translate-y-2
                         hover:border-orange-500/30
                         hover:shadow-[0_0_60px_rgba(226,74,43,0.25)]"
            >
              <p className="leading-relaxed mb-6 text-[#FFE1C5] font-heading">
                “{item.quote}”
              </p>

              <div className="pt-4 border-t border-white/10">
                <div className="font-semibold text-[#FFE1C5]">
                  {item.name}
                </div>
                <div className="text-sm text-[#FFE1C5]">
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
