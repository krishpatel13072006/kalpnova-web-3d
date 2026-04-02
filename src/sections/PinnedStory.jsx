import { useLayoutEffect, useRef } from "react";
import gsap from "../lib/gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PinnedStory() {
  const sectionRef = useRef(null);

  const titleRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef(null);
  const lightRef = useRef(null);
  const progressRef = useRef(null);

  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // INITIAL STATES
      gsap.set(titleRef.current, { opacity: 0, y: 60 });
      gsap.set(textRef.current, { opacity: 0 });
      gsap.set(cardRef.current, { scale: 0.95, opacity: 0 });
      gsap.set(lightRef.current, { opacity: 0 });
      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left",
      });
      gsap.set(
        [img1Ref.current, img2Ref.current, img3Ref.current],
        { opacity: 0, scale: 1.08 }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // SCENE 1
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(textRef.current, { opacity: 1, duration: 0.6 }, "<")
        .to(cardRef.current, { opacity: 1, scale: 1, duration: 0.8 }, "<")
        .to(lightRef.current, { opacity: 1, duration: 0.8 }, "<")
        .to(img1Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
        .to(progressRef.current, { scaleX: 0.33, duration: 1 }, "<")

        // SCENE 2
        .to(titleRef.current, { opacity: 0, y: -40, duration: 0.6 })
        .to(textRef.current, { opacity: 0, duration: 0.4 }, "<")
        .to(img1Ref.current, { opacity: 0, duration: 0.6 }, "<")
        .add(() => {
          titleRef.current.textContent = "WHEN THINKING BECOMES CLEARER";
          textRef.current.textContent =
            "Clarity removes noise and sharpens decisions.";
        })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(textRef.current, { opacity: 1, duration: 0.4 }, "<")
        .to(img2Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
        .to(cardRef.current, { rotateY: 6, rotateX: -4, duration: 1 }, "<")
        .to(progressRef.current, { scaleX: 0.66, duration: 1 }, "<")

        // SCENE 3
        .to(titleRef.current, { opacity: 0, y: -40, duration: 0.6 })
        .to(textRef.current, { opacity: 0, duration: 0.4 }, "<")
        .to(img2Ref.current, { opacity: 0, duration: 0.6 }, "<")
        .add(() => {
          titleRef.current.textContent = "IMAGINE WHAT IS GROWING";
          textRef.current.textContent =
            "Momentum isn’t accidental — it’s designed.";
        })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(textRef.current, { opacity: 1, duration: 0.4 }, "<")
        .to(img3Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
        .to(cardRef.current, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
        }, "<")
        .to(progressRef.current, { scaleX: 1, duration: 1 }, "<");
    }, sectionRef);

    return () => {
      ctx.revert(); // ✅ THIS FIXES ROUTING CRASH
    };
  }, []);

  return (
<section
  ref={sectionRef}
  className="relative h-screen flex items-center
  bg-gradient-to-b from-[#0B0B0C] to-black
  -mt-screen"
>  
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6">
        {/* TEXT */}
        <div className="space-y-6">
          <h2 ref={titleRef} className="text-section font-bold text-[#FFE1C5]">
            IMAGINE WHAT HAPPENS NEXT
          </h2>
          <p ref={textRef} className="text-lg text-muted max-w-md text-[#FFE1C5]">
            Growth begins when thinking becomes intentional.
          </p>
        </div>

        {/* CARD */}
        <div
          ref={cardRef}
          className="card relative h-[360px] md:h-[420px] overflow-hidden"
        >
          <img ref={img1Ref} src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70" className="absolute inset-0 w-full h-full object-cover" />
          <img ref={img2Ref} src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" className="absolute inset-0 w-full h-full object-cover" />
          <img ref={img3Ref} src="https://images.unsplash.com/photo-1518770660439-4636190af475" className="absolute inset-0 w-full h-full object-cover" />

          <div
            ref={lightRef}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,74,43,0.35),transparent_65%)]"
          />

          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
            <div ref={progressRef} className="h-full bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
