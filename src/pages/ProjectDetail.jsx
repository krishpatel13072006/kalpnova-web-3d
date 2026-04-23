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

  const othersProjects = useMemo(() => {
    return portfolioItems.filter(p => p.id !== parseInt(id));
  }, [id]);

  const scrollRef = React.useRef(null);
  const halfContainerRef = React.useRef(null);
  const isHovered = React.useRef(false);

  useEffect(() => {
    let animationFrameId;
    const scroll = () => {
      if (scrollRef.current && halfContainerRef.current && !isHovered.current) {
        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= halfContainerRef.current.offsetWidth) {
          scrollRef.current.scrollLeft -= halfContainerRef.current.offsetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <div className="text-white text-center py-24 bg-[#0b0b0b] min-h-screen flex items-center justify-center font-bold text-2xl uppercase">Project not found</div>;

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
    <div className={`min-h-screen w-full ${themeStyles.bg} ${themeStyles.text}  selection:${themeStyles.accentBg} selection:text-white overflow-x-hidden transition-colors duration-700 ease-in-out relative`}>

      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-0 w-[40%] h-[40%] bg-[#ff6b2b]/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-700"></div>
      <div className="absolute bottom-[10%] right-0 w-[30%] h-[30%] bg-[#ff6b2b]/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-700"></div>

      {/* --- STICKY "LET'S CONNECT" TAB --- */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <Link to="/contact">
          <div className={`${themeStyles.accentBg} text-white px-3 py-6 rounded-r-md cursor-pointer hover:bg-black transition-all duration-300 [writing-mode:vertical-lr] rotate-180 flex items-center gap-2 font-bold text-xs uppercase shadow-lg`}>
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
              <span className="text-[10px] font-bold uppercase">Back to Portfolio</span>
            </Link>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[0.9] transition-colors duration-500 text-white">
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
            <p className="text-[10px] font-bold uppercase mb-1 transition-colors duration-500 text-[#ff6b2b]">Industry</p>
            <p className="text-xl font-bold uppercase transition-colors duration-500 text-white">{project.industry}</p>
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
            /* UPDATED: Changed object-cover to object-contain to show the complete image without cropping */
            className="w-full h-full object-contain block transition-all duration-1000"
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-40 from-[#0b0b0b]"></div>
        </div>
      </section>

      {/* --- TEXT CONTENT SECTION --- */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 pb-16 relative z-10">
        <div className="space-y-16 md:space-y-20 max-w-6xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-heading text-xl md:text-2xl font-black mb-4 uppercase leading-tight transition-colors duration-500 text-[#ff6b2b]">Brand Overview</h2>
            <p className="text-lg md:text-2xl lg:text-3xl leading-snug font-medium transition-colors duration-500 text-gray-300">
              {project.brandOverview}
            </p>
          </motion.div>

            {project.challenge && (
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={typeof project.challenge === 'object' && project.challenge.list ? 'md:col-span-2' : ''}>
                <h3 className="font-heading text-lg font-black mb-6 uppercase border-l-4 pl-4 transition-colors duration-500 text-white border-[#ff6b2b]">Challenge</h3>
                {typeof project.challenge === 'object' && project.challenge.list ? (
                  <div className={`p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-500 ${themeStyles.card} hover:border-[#ff6b2b]/50 group`}>
                    <p className={`text-base md:text-xl leading-relaxed mb-6 font-semibold transition-colors duration-500 text-white`}>
                      {project.challenge.text}
                    </p>
                    <ul className="space-y-4">
                      {project.challenge.list.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span className="w-6 h-6 mt-1 flex items-center justify-center rounded-full bg-[#ff6b2b]/20 text-[#ff6b2b] shrink-0 font-bold text-sm">
                            {idx + 1}
                          </span>
                          <span className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${themeStyles.subText}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${themeStyles.subText} whitespace-pre-wrap`}>
                    {project.challenge}
                  </p>
                )}
              </motion.div>
            )}

            {project.perceptionShift && (
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={Array.isArray(project.perceptionShift) ? 'md:col-span-2 mt-4 md:mt-8' : ''}>
                <h3 className="font-heading text-lg font-black mb-6 uppercase tracking-widest border-l-4 pl-4 transition-colors duration-500 text-white border-[#ff6b2b]">
                  {project.perceptionShiftTitle || "Impact"}
                </h3>
                {Array.isArray(project.perceptionShift) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.perceptionShift.map((item, idx) => (
                      <div key={idx} className={`p-6 md:p-8 rounded-[1.5rem] border transition-all duration-500 ${themeStyles.card} hover:border-[#ff6b2b]/50 group`}>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-3xl transition-all duration-500">{item.icon}</span>
                          <h4 className="font-heading text-xl font-bold text-white tracking-tight leading-tight">{item.title}</h4>
                        </div>
                        <p className={`text-base leading-relaxed transition-colors duration-500 ${themeStyles.subText}`}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${themeStyles.subText} whitespace-pre-wrap`}>
                    {project.perceptionShift}
                  </p>
                )}
              </motion.div>
            )}
            
            {project.creativeExecution && (
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={Array.isArray(project.creativeExecution) ? 'md:col-span-2 mt-4 md:mt-8' : ''}>
                <h3 className="font-heading text-lg font-black mb-6 uppercase tracking-widest border-l-4 pl-4 transition-colors duration-500 text-white border-[#ff6b2b]">Creative Execution</h3>
                {Array.isArray(project.creativeExecution) ? (
                  <div className={`p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-500 bg-gradient-to-br from-[#111] to-[#0a0a0a] border-white/5 hover:border-[#ff6b2b]/50 group`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {project.creativeExecution.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 group">
                          <span className="w-6 h-6 mt-1 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-white/10 group-hover:border-[#ff6b2b]/50 group-hover:bg-[#ff6b2b]/10 transition-all duration-300 text-green-500 shrink-0 text-sm">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </span>
                          <span className={`text-base md:text-lg font-medium leading-snug transition-colors duration-500 text-gray-300 group-hover:text-white`}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${themeStyles.subText} whitespace-pre-wrap`}>
                    {project.creativeExecution}
                  </p>
                )}
              </motion.div>
            )}

            {project.deliverables && (
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={Array.isArray(project.deliverables) ? 'md:col-span-2 mt-4 md:mt-8' : ''}>
                <h3 className="font-heading text-lg font-black mb-6 uppercase tracking-widest border-l-4 pl-4 transition-colors duration-500 text-white border-[#ff6b2b]">Deliverables</h3>
                {Array.isArray(project.deliverables) ? (
                  <div className={`p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-500 bg-gradient-to-br from-[#111] to-[#0a0a0a] border-white/5 hover:border-[#ff6b2b]/50 group`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {project.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 group">
                          <span className="w-6 h-6 mt-1 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-white/10 group-hover:border-[#ff6b2b]/50 group-hover:bg-[#ff6b2b]/10 transition-all duration-300 text-green-500 shrink-0 text-sm">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </span>
                          <span className={`text-base md:text-lg font-medium leading-snug transition-colors duration-500 text-gray-300 group-hover:text-white`}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${themeStyles.subText} whitespace-pre-wrap`}>
                    {project.deliverables}
                  </p>
                )}
              </motion.div>
            )}

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-500 ${themeStyles.card} hover:border-[#ff6b2b]/50 group`}>
            <h3 className="font-heading text-base md:text-xl font-black mb-6 uppercase flex items-center gap-4 transition-colors duration-500 text-white">
              <span className="w-8 md:w-12 h-px bg-[#ff6b2b]"></span>
              Impact
            </h3>
            <p className="text-lg md:text-2xl leading-relaxed font-medium transition-colors duration-500 text-gray-300">
              {project.endorsement}
            </p>
          </motion.div>
        </div>



        {/* --- SERVICES LIST --- */}
        <section className="mt-24 md:mt-32 border-t pt-8 md:pt-12 transition-colors duration-500 border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-8">
              <h3 className="font-heading text-[10px] font-black mb-3 md:mb-4 uppercase transition-colors duration-500 text-[#ff6b2b]">Services Provided</h3>
              <p className="text-lg md:text-xl font-bold leading-relaxed tracking-tight transition-colors duration-500 text-white">
                {project.services}
              </p>
            </div>
            <div className="md:col-span-4 space-y-6">
              <div>
                <h3 className="font-heading text-[10px] font-black mb-3 md:mb-4 uppercase transition-colors duration-500 text-[#ff6b2b]">Sector</h3>
                <p className="text-xl font-bold uppercase transition-colors duration-500 text-white">{project.industry}</p>
              </div>
              {project.targetAudience && (
                <div>
                  <h3 className="font-heading text-[10px] font-black mb-3 md:mb-4 uppercase tracking-[0.3em] transition-colors duration-500 text-[#ff6b2b]">Target Audience</h3>
                  <p className="text-xl font-bold uppercase transition-colors duration-500 text-white">{project.targetAudience}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <GalleryMosaic images={project.gallery} layout={project.galleryLayout} />

        {/* --- SIMILAR PROJECTS (INFINITE SCROLL) --- */}
        <section className="mt-8 md:mt-12 pt-8 md:pt-12 border-t overflow-hidden transition-colors duration-500 border-white/5">
          <div className="flex items-center justify-between mb-8 md:mb-16">
            <h2 className="font-heading text-2xl md:text-5xl font-black uppercase transition-colors duration-500 text-white">Related Works</h2>
          </div>

          <div 
            ref={scrollRef}
            className="relative w-full overflow-x-auto py-10 flex flex-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
            onMouseEnter={() => (isHovered.current = true)}
            onMouseLeave={() => (isHovered.current = false)}
            onTouchStart={() => (isHovered.current = true)}
            onTouchEnd={() => (isHovered.current = false)}
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div ref={halfContainerRef} className="flex flex-nowrap gap-12 md:gap-20 w-max pr-12 md:pr-20 shrink-0">
              {othersProjects.map((proj, i) => (
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
                  <h4 className="font-heading text-xl md:text-2xl font-black mb-2 flex items-center justify-between uppercase pr-4 transition-colors duration-500 text-white group-hover:text-[#ff6b2b]">
                    {proj.title}
                    <ArrowUpRight size={24} className="hidden md:block translate-y-2 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed whitespace-normal pr-8 transition-colors duration-500 text-gray-500">
                    {proj.type}
                  </p>
                </Link>
              ))}
            </div>

            <div className="flex flex-nowrap gap-12 md:gap-20 w-max pr-12 md:pr-20 shrink-0">
              {othersProjects.map((proj, i) => (
                <Link
                  to={`/portfolio/${proj.id}`}
                  key={`clone-${i}`}
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
                  <h4 className="font-heading text-xl md:text-2xl font-black mb-2 flex items-center justify-between uppercase pr-4 transition-colors duration-500 text-white group-hover:text-[#ff6b2b]">
                    {proj.title}
                    <ArrowUpRight size={24} className="hidden md:block translate-y-2 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed whitespace-normal pr-8 transition-colors duration-500 text-gray-500">
                    {proj.type}
                  </p>
                </Link>
              ))}
            </div>
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
            <h2 className={`font-heading text-2xl md:text-4xl lg:text-5xl font-black leading-tight uppercase transition-colors duration-500 ${isLight ? 'text-black' : 'text-white'}`}>
              Got big plans for your brand or a <br className="hidden md:block" /> new project? <span className={`transition-colors duration-500 ${isLight ? 'text-[#e31e24]' : 'text-[#ff6b2b]'}`}>Let's chat!</span>
            </h2>

            <div className="space-y-8 md:space-y-12 pt-4 md:pt-6">
              <div className="flex flex-col gap-6">
                <div>
                  <p className={`text-xs uppercase tracking-widest mb-2 ${isLight ? 'text-[#e31e24]' : 'text-[#ff6b2b]'}`}>Business Inquiries</p>
                  <a
                    href="https://wa.me/919662479165?text=Hi%20I%27m%20interested%20in%20discussing%20a%20project%20with%20Kalpnova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-lg md:text-2xl font-bold transition-all duration-500 flex items-center gap-2 ${isLight ? 'text-zinc-500 hover:text-[#e31e24]' : 'text-gray-400 hover:text-white'}`}
                  >
                    Let's Talk Business <ArrowUpRight size={20} />
                  </a>
                </div>

                <div>
                  <p className={`text-xs uppercase tracking-widest mb-2 ${isLight ? 'text-[#e31e24]' : 'text-[#ff6b2b]'}`}>Career</p>
                  <a
                    href="https://wa.me/919662479165?text=Hi%20I%27m%20interested%20in%20joining%20the%20Kalpnova%20team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-lg md:text-2xl font-bold transition-all duration-500 flex items-center gap-2 ${isLight ? 'text-zinc-500 hover:text-[#e31e24]' : 'text-gray-400 hover:text-white'}`}
                  >
                    Join Our Team <ArrowUpRight size={20} />
                  </a>
                </div>

                <div>
                  <p className={`text-xs uppercase tracking-widest mb-2 ${isLight ? 'text-[#e31e24]' : 'text-[#ff6b2b]'}`}>General</p>
                  <Link
                    to="/contact"
                    className={`text-lg md:text-2xl font-bold transition-all duration-500 flex items-center gap-2 ${isLight ? 'text-zinc-500 hover:text-[#e31e24]' : 'text-gray-400 hover:text-white'}`}
                  >
                    Contact Us <ArrowUpRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetail;

