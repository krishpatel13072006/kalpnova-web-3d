import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import GrainOverlay from "./components/GrainOverlay";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";

import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import LiveLab from "./pages/LiveLab";
import InsideKalpnova from './pages/InsideKalpnova';
import VirtualExhibition from "./pages/VirtualExhibition";
import WorkPortfolio from './pages/workportfolio';
import ProjectDetail from './pages/ProjectDetail';
import Vision360 from './pages/Vision360';
import KalpnovaPavilion from './pages/KalpnovaPavilion';
import { ThemeProvider } from './context/ThemeContext';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/live" element={<PageTransition><LiveLab /></PageTransition>} />
          <Route path="/insidekalpnova" element={<PageTransition><InsideKalpnova /></PageTransition>} />
          <Route path="/showcase" element={<PageTransition><VirtualExhibition /></PageTransition>} />
          <Route path="/vision" element={<PageTransition><Vision360 /></PageTransition>} />
          <Route path="/pavilion" element={<PageTransition><KalpnovaPavilion /></PageTransition>} />
          <Route path="/portfolio" element={<PageTransition><WorkPortfolio /></PageTransition>} />
          <Route path="/portfolio/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      <Footer />
      <GrainOverlay />
    </ThemeProvider>
  );
}
