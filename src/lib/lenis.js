import Lenis from "@studio-freight/lenis";

import gsap from "gsap";

export const lenis = new Lenis({
  duration: 1.2,
  lerp: 0.08,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  infinite: false,
});

export function initLenis() {
  // Disable GSAP lag smoothing to prevent visual skipping against smooth scroll
  gsap.ticker.lagSmoothing(0);

  // Sync Lenis with GSAP's ticker for ultra-consistent frame timing
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
}
