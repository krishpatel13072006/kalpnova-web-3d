import { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useAnimationFrame, useMotionValue } from 'framer-motion';
import TimelineButterfly from '../components/TimelineButterfly';

export default function AboutNarrative() {
  const timelineRef = useRef(null);
  
  // Butterfly Physics State
  const butterflyY = useMotionValue(0); 
  const butterflyRotate = useMotionValue(180); // 180 = DOWN, 0 = UP
  
  // Scroll tracking for user interaction vs auto-patrol
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  const state = useRef({
    dir: 1, // 1 = moving down, -1 = moving up
    speed: 1.5, // gentle patrol speed
  });

  useAnimationFrame((time, delta) => {
    if (!timelineRef.current) return;
    // We want the butterfly to travel the exact height of the line
    const maxH = timelineRef.current.offsetHeight;
    
    // Normalize delta for steady speed across different monitor refresh rates
    const dt = delta / 16.66;
    
    // Read smoothed scroll velocity
    const sv = smoothVelocity.get();
    
    let moveDelta = 0;
    let currentDir = state.current.dir;

    // Check if user is actively scrolling
    if (Math.abs(sv) > 10) {
       // if scroll velocity is positive (scrolling down page), face butterfly down
       if (sv > 0) currentDir = 1; else currentDir = -1;
       // Temporarily adjust speed when user scrolls (reduced scrolling multiplier for slower effect)
       moveDelta = currentDir * (state.current.speed + Math.abs(sv)/120) * dt;
    } else {
       // Continuous auto patrol when NOT scrolling
       moveDelta = state.current.dir * state.current.speed * dt;
    }

    let nextY = butterflyY.get() + moveDelta;

    // Automatic bounce at the ends of the timeline
    if (nextY >= maxH) {
      nextY = maxH;
      state.current.dir = -1; // hit bottom, bounce up
    } else if (nextY <= 0) {
      nextY = 0;
      state.current.dir = 1; // hit top, bounce down
    }

    butterflyY.set(nextY);

    // Smooth Rotation: if current motion is down -> 180deg (face down), if up -> 0deg (face up)
    const targetRot = (currentDir === 1) ? 180 : 0;
    const currentRot = butterflyRotate.get();
    butterflyRotate.set(currentRot + (targetRot - currentRot) * (0.1 * dt));
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* HEADER */}
      <div className="text-center mb-24">
        <span className="inline-block mb-4 px-4 py-1 text-xs tracking-widest
                         rounded-full border border-orange-500/30
                         text-orange-500">
          ABOUT US
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-[#FFE1C5]">
          Our <span className="text-orange-500">Journey</span>
        </h2>
      </div>

      {/* CONTENT GRID */}
      <div className="grid md:grid-cols-2 gap-20">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#FFE1C5]">
            Crafting Digital Excellence
          </h3>

          <p className="leading-relaxed text-[#FFE1C5]">
            Based out of Ahmedabad, India, Kalpnova is a creative and consultancy studio
            specializing in branding, design, and social media. We serve a diverse range 
            of clients worldwide, from ambitious startups to established global brands.
          </p>

          <p className="leading-relaxed text-[#FFE1C5]">
            With over 8 years of collective experience, our multidisciplinary team 
            combines creativity, technical expertise, and strategic thinking to deliver
            solutions that not only look beautiful but drive real growth.
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

          {/* Timeline Butterfly auto-patrolling and scrolling */}
          <motion.div
            style={{
              position: 'absolute',
              left: "-33px", // 12px (left-3) - 45px (half of butterfly's 90px width)
              top: 0,
              y: butterflyY,
              rotate: butterflyRotate,
              scale: 1.0, // Increased size slightly (from 0.8 to 1.0)
              marginTop: "-32px", // Perfect center over the exact pixel position
              zIndex: 10,
            }}
          >
            <TimelineButterfly />
          </motion.div>

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

              <h4 className="text-[#FFE1C5] font-semibold mt-1">
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
