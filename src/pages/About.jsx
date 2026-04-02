import { motion } from "framer-motion";
import AboutNarrative from "../sections/AboutNarrative";

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AboutNarrative />
    </motion.main>
  );
}
