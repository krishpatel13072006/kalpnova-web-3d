import { useEffect, useRef } from "react";
import gsap from "../lib/gsap";
import PinnedStory from "../sections/PinnedStory";
import Services from "../sections/Services";
import Contact from "../sections/Contact";
import Testimonials from "../sections/Testimonials";
import Clients from "../sections/Clients";

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    gsap.from(heroRef.current.children, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <>
{/* HERO */}
<section className="relative min-h-screen pt-32 flex items-start justify-center overflow-hidden">
  {/* BACKGROUND */}
{/* BACKGROUND */}
<div className="absolute inset-0 z-0 pointer-events-none">

  {/* BASE (BOTTOM MOST) */}
  <div className="absolute inset-0 bg-[#0B0B0C]" />

{/* LINE ANIMATION */}
<div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
  <div className="hero-lines-wrap">
    <div className="hero-lines hero-lines-1" />
    <div className="hero-lines hero-lines-2" />
  </div>
</div>



  {/* LEFT ORANGE */}
  <div className="absolute left-[-30%] top-0 w-[65%] h-full
    bg-[radial-gradient(circle_at_left,rgba(226,74,43,0.35),transparent_65%)]
    z-[3]"
  />

  {/* RIGHT ORANGE */}
  <div className="absolute right-[-30%] top-0 w-[65%] h-full
    bg-[radial-gradient(circle_at_right,rgba(226,74,43,0.35),transparent_65%)]
    z-[3]"
  />

  {/* GRID (TOP MOST BG) */}
  <div
    className="absolute inset-0 opacity-[0.08] z-[4]"
    style={{
      backgroundImage:
        "linear-gradient(45deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />

</div>


  {/* CONTENT WRAPPER (IMPORTANT FIX) */}
  <div
    ref={heroRef}
    className="relative z-20 w-full max-w-5xl mx-auto
    px-6 sm:px-8 md:px-12 text-center"
  >
    {/* TOP CONNECTOR */}
    <div className="flex items-center justify-center gap-4 mb-12 text-[#FFE1C5]/60">
      <span className="h-px w-20 bg-white/20" />
      <span className="px-4 py-1 text-xs rounded-full border border-white/20">
        ⭐ All in All solution at one place
      </span>
      <span className="h-px w-20 bg-white/20" />
    </div>

    {/* HEADING */}
    <h1
      className="font-bold tracking-tight leading-[1.08]
      text-[2.2rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.2rem]"
    >
<span className="block text-[#FFE1C5] mb-3">
  Stop Looking Random.
</span>

      <span
  className="block bg-gradient-to-r
  from-[#FF8A00] to-[#E24A2B]
  bg-clip-text text-transparent
  "
>
  Start Looking Premium.
</span>


    </h1>

    {/* SUBTEXT */}
    <p className="mt-8 max-w-2xl mx-auto text-[#FFE1C5]/70 text-base md:text-lg">
    A clean identity + consistent design can change perception instantly. We build systems that make your brand look serious.
    </p>

    {/* CTA (VISIBILITY FIXED) */}
{/* CTA — FORCED FOREGROUND */}
{/* <div className="relative z-[9999] isolate mt-12 flex flex-col sm:flex-row justify-center gap-6">
  <button
    className="relative z-[9999] px-7 py-3 rounded-full
    bg-[#1A1A1C] border border-white/30 text-[#FFE1C5]
    hover:bg-[#222] transition"
  >
    Chat Now
  </button> */}
<div className="relative z-[9999] isolate mt-12 flex flex-col sm:flex-row justify-center gap-6">
  <a
    href="https://wa.me/919662479165?text=Hi%20I%20want%20to%20chat%20with%20you%20kalpnova"
    target="_blank"
    rel="noopener noreferrer"
    className="relative z-[9999] px-7 py-3 rounded-full
    bg-[#1A1A1C] border border-white/30 text-[#FFE1C5]
    hover:bg-[#222] transition text-center"
  >
    Chat Now
  </a>
  <a
  target="_blank"
  href="tel:+919662479165"  
  rel="noopener noreferrer"  
  className="relative z-[9999] px-7 py-3 rounded-full
  bg-gradient-to-r from-[#FF8A00] to-[#E24A2B]
  text-[#FFE1C5] font-medium
  hover:scale-[1.04] transition"
>
  Get A Quote →
</a>

</div>


    {/* TOOLS */}
    {/* <div className="mt-20">
      <p className="text-sm text-white/50 mb-6">
        Revolutionizing Client Solutions with the Best Tools
      </p>

      <div className="flex flex-wrap justify-center gap-5">
        {["wordpress","css3","html5","javascript","nodejs","php"].map(
          (tool) => (
            <div
              key={tool}
              className="w-12 h-12 rounded-full flex items-center justify-center
              bg-white/5 border border-white/15 backdrop-blur"
            >
              <img src={`/icons/${tool}.svg`} className="w-6 h-6" />
            </div>
          )
        )}
      </div>
    </div> */}
  </div>
  {/* BOTTOM FADE — HERO TO NEXT SECTION */}


</section>



      {/* PINNED STORY */}
      {/* <PinnedStory /> */}

      {/* SERVICES */}
      <Services />

      <Testimonials />
      <Clients />
      {/* CONTACT */}
      <Contact />

    </>
  );
}
