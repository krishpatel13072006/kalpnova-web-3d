import Lenis from "@studio-freight/lenis";

import gsap from "gsap";

export const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
});

export function initLenis() {
  // Sync Lenis with GSAP's requestAnimationFrame for butter-smooth scrolling
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  // Disable GSAP lag smoothing to prevent visual skipping against smooth scroll
  gsap.ticker.lagSmoothing(0);
}
