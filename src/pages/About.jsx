import { motion } from "framer-motion";
import AboutNarrative from "../sections/AboutNarrative";
import TeamSection from "../sections/TeamSection";
import AboutCards from "../components/AboutCards";

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AboutNarrative />
      <TeamSection />
      <AboutCards />
    </motion.main>
  );
}
