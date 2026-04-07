import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { portfolioItems } from '../data/portfolio';
import GalleryMosaic from '../components/GalleryMosaic';

/**
 * ANIMATION VARIANTS
 */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const isLight = false; // Fix: Website is now strictly dark mode, resolving ReferenceError

  const project = useMemo(() => portfolioItems.find(p => p.id === parseInt(id)), [id]);

  const similarProjects = useMemo(() => {
    const others = portfolioItems.filter(p => p.id !== parseInt(id));
    return [...others, ...others];
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <div className="text-white text-center py-24 bg-[#0b0b0b] min-h-screen flex items-center justify-center font-bold text-2xl uppercase tracking-widest">Project not found</div>;

  const themeStyles = {
    bg: 'bg-[#0b0b0b]',
    text: 'text-[#f4f4f4]',
    accent: '#ff6b2b',
    accentBg: 'bg-[#ff6b2b]',
    subText: 'text-gray-400',
    card: 'bg-[#111] border-white/5',
    gridLines: 'radial-gradient(#ff6b2b 1px, transparent 1px)',
    folderTab: 'bg-[#1a1a1a] border-white/5',
  };

  return (
    <div className={`min-h-screen w-full ${themeStyles.bg} ${themeStyles.text} font-sans selection:${themeStyles.accentBg} selection:text-white overflow-x-hidden transition-colors duration-700 ease-in-out relative`}>

      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-0 w-[40%] h-[40%] bg-[#ff6b2b]/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-700"></div>
      <div className="absolute bottom-[10%] right-0 w-[30%] h-[30%] bg-[#ff6b2b]/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-700"></div>

      {/* --- STICKY "LET'S CONNECT" TAB --- */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <Link to="/contact">
          <div className={`${themeStyles.accentBg} text-white px-3 py-6 rounded-r-md cursor-pointer hover:bg-black transition-all duration-300 [writing-mode:vertical-lr] rotate-180 flex items-center gap-2 font-bold text-xs uppercase tracking-widest shadow-lg`}>
            Let's Connect
          </div>
        </Link>
      </div>

      {/* --- HEADER SECTION --- */}
      <header className="max-w-[1440px] mx-auto px-6 pt-24 md:pt-32 pb-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative inline-block"
          >
            <Link to="/portfolio" className="flex items-center gap-2 mb-4 hover:translate-x-[-4px] transition-transform text-[#ff6b2b]">
              <ArrowLeft size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Back to Portfolio</span>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] transition-colors duration-500 text-white">
              {project.title}
            </h1>
            <div className={`w-24 h-[3px] mt-6 transition-colors duration-500 ${themeStyles.accentBg}`}></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:text-right"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-500 text-[#ff6b2b]">Industry</p>
            <p className="text-xl font-bold uppercase tracking-tighter transition-colors duration-500 text-white">{project.industry}</p>
          </motion.div>
        </div>
      </header>

      {/* --- HERO BANNER --- */}
      <section className="w-full px-4 md:px-6 mb-16 mt-8 relative z-10">
        <div className={`max-w-[1440px] mx-auto relative h-[400px] md:h-[600px] lg:h-[750px] overflow-hidden flex items-center justify-center bg-[#0a0a0a] rounded-[1.5rem] md:rounded-[2rem] border shadow-2xl transition-all duration-500 ${isLight ? 'border-zinc-200 shadow-xl' : 'border-white/5 shadow-2xl'}`}>
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={project.heroImage}
            /* UPDATED: Changed object-contain to object-cover and w-full h-full to fill space */
            className="w-full h-full object-cover block transition-all duration-1000"
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-40 from-[#0b0b0b]"></div>
        </div>
      </section>

      {/* --- TEXT CONTENT SECTION --- */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 pb-16 relative z-10">
        <div className="space-y-16 md:space-y-20 max-w-6xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-widest leading-tight transition-colors duration-500 text-[#ff6b2b]">Brand Overview</h2>
            <p className="text-lg md:text-2xl lg:text-3xl leading-snug font-medium transition-colors duration-500 text-gray-300">
              {project.brandOverview}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-lg font-black mb-4 uppercase tracking-widest border-l-4 pl-4 transition-colors duration-500 text-white border-[#ff6b2b]">Challenge</h3>
              <p className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${themeStyles.subText}`}>
                {project.challenge}
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-lg font-black mb-4 uppercase tracking-widest border-l-4 pl-4 transition-colors duration-500 text-white border-[#ff6b2b]">Perception Shift</h3>
              <p className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${themeStyles.subText}`}>
                {project.perceptionShift}
              </p>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-500 ${themeStyles.card}`}>
            <h3 className="text-base md:text-xl font-black mb-6 uppercase tracking-widest flex items-center gap-4 transition-colors duration-500 text-white">
              <span className="w-8 md:w-12 h-px bg-[#ff6b2b]"></span>
              Strategic Endorsement
            </h3>
            <p className="text-lg md:text-2xl leading-relaxed font-medium italic transition-colors duration-500 text-gray-300">
              "{project.endorsement}"
            </p>
          </motion.div>
        </div>



        {/* --- SERVICES LIST --- */}
        <section className="mt-24 md:mt-32 border-t pt-8 md:pt-12 transition-colors duration-500 border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-8">
              <h3 className="text-[10px] font-black mb-3 md:mb-4 uppercase tracking-[0.3em] transition-colors duration-500 text-[#ff6b2b]">Services Provided</h3>
              <p className="text-lg md:text-xl font-bold leading-relaxed tracking-tight transition-colors duration-500 text-white">
                {project.services}
              </p>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-[10px] font-black mb-3 md:mb-4 uppercase tracking-[0.3em] transition-colors duration-500 text-[#ff6b2b]">Sector</h3>
              <p className="text-xl font-bold uppercase tracking-tighter transition-colors duration-500 text-white">{project.industry}</p>
            </div>
          </div>
        </section>

        <GalleryMosaic images={project.gallery} layout={project.galleryLayout} />

        {/* --- SIMILAR PROJECTS (INFINITE SCROLL) --- */}
        <section className="mt-8 md:mt-12 pt-8 md:pt-12 border-t overflow-hidden transition-colors duration-500 border-white/5">
          <div className="flex items-center justify-between mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter transition-colors duration-500 text-white">Related Works</h2>
          </div>

          <div className="relative w-full overflow-hidden py-10">
            <motion.div
              className="flex flex-nowrap gap-12 md:gap-20 w-max will-change-transform"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 40,
                repeat: Infinity
              }}
            >
              {similarProjects.map((proj, i) => (
                <Link
                  to={`/portfolio/${proj.id}`}
                  key={i}
                  className="w-[280px] md:w-[480px] shrink-0 group cursor-pointer flex flex-col"
                >
                  <div className="relative flex flex-col mb-6 transition-transform duration-500 group-hover:-translate-y-2" style={{ willChange: 'transform' }}>
                    <div className="w-[35%] md:w-[40%] h-8 rounded-t-[12px] relative z-10 flex items-center justify-center border-t border-l border-r transition-colors duration-500 bg-[#1a1a1a] border-white/5 group-hover:border-white/10">
                      <div className="w-10 h-[3px] rounded-full transition-colors bg-[#333] group-hover:bg-[#ff6b2b]"></div>
                      <div className="absolute -bottom-[2px] left-[0px] right-[0px] h-[4px] bg-[#1a1a1a]"></div>
                    </div>

                    <div className="w-full rounded-b-3xl rounded-tr-3xl p-3 md:p-5 relative z-0 border transition-all duration-500 shadow-lg bg-[#1a1a1a] border-white/5 group-hover:border-white/10 group-hover:shadow-[0_20px_50px_-12px_rgba(255,107,43,0.15)]">
                      <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden relative shadow-inner bg-[#050505]">
                        <img
                          src={proj.heroImage || proj.image}
                          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-100"
                          alt={proj.title}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60 from-[#0b0b0b]" />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-xl md:text-2xl font-black mb-2 flex items-center justify-between uppercase tracking-tighter pr-4 transition-colors duration-500 text-white group-hover:text-[#ff6b2b]">
                    {proj.title}
                    <ArrowUpRight size={24} className="hidden md:block translate-y-2 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed whitespace-normal pr-8 transition-colors duration-500 text-gray-500">
                    {proj.type}
                  </p>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- COMPANY CONTACT DETAILS --- */}
        <section className={`mt-16 pt-12 border-t relative z-10 transition-colors duration-500 ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <h2 className={`text-2xl md:text-4xl lg:text-5xl font-black leading-tight uppercase tracking-tighter transition-colors duration-500 ${isLight ? 'text-black' : 'text-white'}`}>
              Got big plans for your brand or a <br className="hidden md:block" /> new project? <span className={`transition-colors duration-500 ${isLight ? 'text-[#e31e24]' : 'text-[#ff6b2b]'}`}>Let's chat!</span>
            </h2>

            <div className="space-y-8 md:space-y-12 pt-4 md:pt-6">
              <div>
                <Link
                  to="mailto:business@kalpnova.com"
                  className={`text-lg md:text-2xl font-bold transition-all duration-500 tracking-tight ${isLight ? 'text-zinc-500 hover:text-[#e31e24]' : 'text-gray-400 hover:text-white'}`}
                >
                  business@kalpnova.com
                </Link>
              </div>

              <div className="space-y-3 md:space-y-4">
                <h3 className={`text-2x md:text-3xl font-black uppercase tracking-tighter transition-colors duration-500 ${isLight ? 'text-black' : 'text-white'}`}>Career</h3>
                <Link
                  to="mailto:hr@kalpnova.com"
                  className={`text-lg md:text-2xl font-bold transition-all duration-500 tracking-tight ${isLight ? 'text-zinc-500 hover:text-[#e31e24]' : 'text-gray-400 hover:text-white'}`}
                >
                  hr@kalpnova.com
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetail;