import { useRef } from "react";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import AboutNarrative from "../sections/AboutNarrative";
import TeamSection from "../sections/TeamSection";
import SEO from "../components/SEO";

export default function About() {
  const pageRef = useRef(null);

  // Track scroll progress across the ENTIRE about page
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  return (
    <motion.main
      ref={pageRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ position: "relative" }}
    >
      <SEO 
        title="About Us"
        description="Learn more about Kalpnova, our premium design process, and the award-winning team driving digital growth for brands globally."
        url="/about"
      />
      <AboutNarrative />
      <TeamSection />
    </motion.main>
  );
}
