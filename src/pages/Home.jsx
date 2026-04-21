import { useEffect, useRef } from "react";
import gsap from "../lib/gsap";
import PinnedStory from "../sections/PinnedStory";
import Services from "../sections/ServicesGrid";
import Contact from "../sections/Contact";
import Testimonials from "../sections/Testimonials";
import Clients from "../sections/Clients";
import AboutCards from "../components/AboutCards";
import Silk from "../components/Silk";
import SEO from "../components/SEO";

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
      <SEO 
        title="Home"
        description="Kalpnova is an Ahmedabad-based design studio specialising in branding, social media design, Meta Ads creatives and UI/UX design. Stop looking random. Start looking premium."
        url="/"
      />
      {/* HERO */}
      <section className="relative min-h-screen min-h-[100dvh] pt-32 pb-16 md:pt-40 md:pb-16 flex items-center justify-center overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0A0C]">
          <Silk
            speed={5}
            scale={1}
            color="#FF6B00"
            noiseIntensity={1.5}
            rotation={0}
            className="absolute inset-0 w-full h-full opacity-90 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,11,0.92)_100%)] pointer-events-none z-10" />
        </div>


        {/* CONTENT WRAPPER (IMPORTANT FIX) */}
        <div
          ref={heroRef}
          className="relative z-20 w-full max-w-5xl mx-auto
    px-6 sm:px-8 md:px-12 text-center"
        >
          {/* TOP CONNECTOR */}
          <div className="flex items-center justify-center gap-4 mb-12 text-white/80">
            <span className="h-px w-20 bg-white/30" />
            <span className="px-4 py-1 text-xs rounded-full border border-white/30 bg-black/20 backdrop-blur-sm">
              ⭐ All in All solution at one place
            </span>
            <span className="h-px w-20 bg-white/30" />
          </div>

          {/* HEADING — always exactly 2 lines */}
          <h1
            className="font-heading font-bold tracking-tight leading-[1.1]"
            style={{ fontSize: "clamp(0.9rem, 3.5vw, 5rem)" }}
          >
            <span className="block text-white drop-shadow-md whitespace-nowrap">
              Premium Design &amp;
            </span>
            <span className="block text-[#f5f7f6] drop-shadow-lg whitespace-nowrap">
              Branding Studio in Ahmedabad
            </span>
          </h1>

          {/* SUBTEXT */}
          <p className="mt-8 max-w-2xl mx-auto text-white/90 font-medium text-base md:text-lg drop-shadow-md">
            We help growing businesses in Gujarat and across India build brands that look premium, feel intentional, and convert better — through design that actually works.
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
    bg-zinc-950 border border-white/10 text-white shadow-xl
    hover:bg-[#222] hover:border-white/30 transition text-center"
            >
              Chat Now
            </a>
            <a
              href="/services"
              className="relative z-[9999] px-7 py-3 rounded-full
  bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]
  hover:scale-[1.04] transition text-center"
            >
              Our Services
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
      <Clients />



      {/* PINNED STORY */}
      {/* <PinnedStory /> */}

      {/* SERVICES */}
      <Services />

      <Testimonials />
      <AboutCards />
      {/* CONTACT */}
      <Contact />

    </>
  );
}
