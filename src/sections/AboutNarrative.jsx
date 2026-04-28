import { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useAnimationFrame, useMotionValue } from 'framer-motion';
import TimelineButterfly from '../components/TimelineButterfly';
export default function AboutNarrative() {
  const timelineRef = useRef(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* HEADER */}
      <div className="text-center mb-24">
        <span className="inline-flex items-center justify-center mb-4 px-4 h-8 text-xs tracking-widest
                         rounded-full border border-orange-500/30
                         text-orange-500 pt-[2px]">
          ABOUT US
        </span>

        <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#FFE1C5]">
          Our <span className="text-orange-500">Journey</span>
        </h2>
      </div>

      {/* CONTENT GRID */}
      <div className="grid md:grid-cols-2 gap-20">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-[#FFE1C5]">
            We make your brand impossible to ignore
          </h3>

          <p className="leading-relaxed text-[#FFE1C5]">
            Kalpnova is a design and marketing growth studio based in Ahmedabad, Gujarat. 
            We work with founders, startups, and growing businesses who are tired of looking like everyone else.
          </p>

          <p className="leading-relaxed text-[#FFE1C5]">
            Our studio handles everything from brand identity and social media design to Meta Ads creatives, UI/UX, print media, and video editing — all under one roof, with the speed and focus of a boutique team.
          </p>

          <p className="leading-relaxed text-[#FFE1C5]">
            We believe great design is not decoration. It is strategy made visible.
          </p>

          <ul className="space-y-3 pt-6">
            {["Innovation", "Quality", "Collaboration", "Results-Driven"].map(
              (item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-[#FFE1C5]">{item}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* RIGHT TIMELINE */}
        <div className="relative pl-10 space-y-10" ref={timelineRef}>
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-orange-500/30" />

          {[
            {
              year: "2016",
              title: "The Beginning",
              desc: "Started with a few passionate creators in Mumbai, focused on pure design excellence.",
            },
            {
              year: "2024",
              title: "Growth Phase",
              desc: "Expanded team and began working with international clients and brands.",
            },
            {
              year: "2025",
              title: "Global Presence",
              desc: "Now serving clients across 2 continents with cutting-edge solutions and products.",
            },
          ].map((item) => (
            <div
              key={item.year}
              className="relative bg-[#141414] rounded-xl p-6
                         border border-orange-500/20"
            >
              {/* Dot */}
              <span className="absolute -left-[34px] top-8
                               w-3 h-3 rounded-full bg-orange-500" />

              <span className="text-orange-500 font-semibold">
                {item.year}
              </span>

              <h4 className="font-heading text-[#FFE1C5] font-semibold mt-1">
                {item.title}
              </h4>

              <p className="text-[#FFE1C5] text-sm mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
