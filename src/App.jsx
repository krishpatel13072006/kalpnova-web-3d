import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import GrainOverlay from "./components/GrainOverlay";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";

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

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />

      {/* Normal SPA Routing without forced full-tree remounts */}
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/live" element={<LiveLab />} />

        {/* The Hub Route */}
        <Route path="/insidekalpnova" element={<InsideKalpnova />} />

        {/* Hub Experience Routes */}
        <Route path="/showcase" element={<VirtualExhibition />} />
        <Route path="/vision" element={<Vision360 />} />
        <Route path="/pavilion" element={<KalpnovaPavilion />} />

        <Route path="/portfolio" element={<WorkPortfolio />} />
        <Route path="/portfolio/:id" element={<ProjectDetail />} />
      </Routes>
      <Footer />
      <GrainOverlay />
    </ThemeProvider>
  );
}
