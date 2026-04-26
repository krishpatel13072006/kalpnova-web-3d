import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { portfolioItems } from '../data/portfolio';
import GalleryMosaic from '../components/GalleryMosaic';

/**
 * SUB-COMPONENTS
 */
const ProjectCard = ({ proj }) => (
  <Link
    to={`/portfolio/${proj.id}`}
    className="w-[280px] md:w-[480px] shrink-0 group cursor-pointer flex flex-col"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <div className="relative flex flex-col mb-6 transition-transform duration-500 group-hover:-translate-y-2">
      <div className="w-[35%] md:w-[40%] h-8 bg-[#1a1a1a] rounded-t-[12px] relative z-10 flex items-center justify-center border-t border-l border-r border-white/5 group-hover:border-white/10 transition-colors duration-500">
        <div className="w-10 h-[3px] bg-[#333] rounded-full group-hover:bg-[#ff6b2b] transition-colors" />
        <div className="absolute -bottom-[2px] left-0 right-0 h-[4px] bg-[#1a1a1a]" />
      </div>
      <div className="w-full bg-[#1a1a1a] rounded-b-3xl rounded-tr-3xl p-3 md:p-5 relative z-0 border border-white/5 group-hover:border-white/10 shadow-lg group-hover:shadow-[0_20px_50px_-12px_rgba(255,107,43,0.15)] transition-all duration-500">
        <div className="w-full aspect-video rounded-2xl overflow-hidden relative bg-[#050505] shadow-inner">
          <img
            src={proj.heroImage || proj.image}
            alt={proj.title}
            className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <span className="text-[#ff6b2b] font-bold text-sm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              View Case Study →
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="px-2 mb-2">
      <span className="text-[9px] font-black uppercase tracking-widest text-[#ff6b2b] border border-[#ff6b2b]/30 rounded-full px-2.5 py-0.5">
        {proj.category || 'Work'}
      </span>
    </div>
    <div className="px-2">
      <h3 className="font-heading text-xl md:text-2xl font-black mb-3 text-white group-hover:text-[#ff6b2b] transition-colors uppercase truncate">
        {proj.title}
      </h3>
      <p className="text-[10px] font-black uppercase leading-relaxed text-gray-500">
        {proj.type}
      </p>
    </div>
  </Link>
);

const RelatedWorksMarquee = ({ othersProjects }) => {
  const scrollRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const animationFrameRef = useRef();
  const lastTimeRef = useRef(0);

  // Auto-scroll speed (pixels per second)
  const speed = 40;

  const animate = (time) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;

    if (scrollRef.current && !isInteracting) {
      scrollRef.current.scrollLeft += speed * deltaTime;

      // Infinite loop reset
      const maxScroll = scrollRef.current.scrollWidth / 2;
      if (scrollRef.current.scrollLeft >= maxScroll) {
        scrollRef.current.scrollLeft -= maxScroll;
      }
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      // Smooth manual scroll injection
      el.scrollLeft += e.deltaY * 0.5;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isInteracting]);

  // Handle manual scroll for infinite effect
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const halfWidth = scrollWidth / 2;

    if (scrollLeft >= halfWidth * 1.5) {
      scrollRef.current.scrollLeft = scrollLeft - halfWidth;
    } else if (scrollLeft <= 0) {
      scrollRef.current.scrollLeft = halfWidth;
    }
  };

  return (
    <div
      className="relative w-screen left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] mt-8 overflow-hidden group select-none"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
    >
      {/* Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar py-12 px-10 cursor-grab active:cursor-grabbing"
      >
        {[...othersProjects, ...othersProjects].map((proj, idx) => (
          <ProjectCard key={`${proj.id}-${idx}`} proj={proj} />
        ))}
      </div>
    </div>
  );
};

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
  const [selectedZoomImg, setSelectedZoomImg] = useState(null);
  const isLight = false; // Fix: Website is now strictly dark mode, resolving ReferenceError

  const project = useMemo(() => portfolioItems.find(p => p.id === parseInt(id)), [id]);

  const othersProjects = useMemo(() => {
    return portfolioItems.filter(p => p.id !== parseInt(id) && !p.isComingSoon);
  }, [id]);

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
      <div className="absolute top-[-10%] left-0 w-[40%] h-[40%] bg-[#ff6b2b]/5 blur-[80px] rounded-full pointer-events-none transition-colors duration-700 will-change-filter"></div>
      <div className="absolute bottom-[10%] right-0 w-[30%] h-[30%] bg-[#ff6b2b]/5 blur-[80px] rounded-full pointer-events-none transition-colors duration-700 will-change-filter"></div>

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
            <p className="text-xl font-bold transition-colors duration-500 text-white mb-6">{project.industry.toUpperCase()}</p>

          </motion.div>
        </div>
      </header>

      {/* --- HERO BANNER --- */}
      <section className="w-full px-4 md:px-6 mb-16 mt-8 relative z-10">
        <div
          className={`max-w-[1440px] mx-auto relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-[750px] overflow-hidden flex items-center justify-center bg-[#0a0a0a] rounded-[1.5rem] md:rounded-[2rem] border shadow-2xl transition-all duration-500 border-white/5 shadow-2xl group`}
        >
          <img
            src={project.heroImage}
            className={`w-full h-full block ${project.id === 17 ? 'object-contain' : 'object-cover'}`}
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-40 from-[#0b0b0b]"></div>
        </div>
      </section>

      {/* --- TEXT CONTENT SECTION --- */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 pb-16 relative z-10">
        <div className="space-y-16 md:space-y-20 max-w-6xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-heading text-2xl md:text-3xl font-black mb-4 uppercase leading-tight transition-colors duration-500 text-[#ff6b2b]">Case Study</h2>
            <p className="text-lg md:text-2xl lg:text-3xl leading-snug font-medium transition-colors duration-500 text-gray-300">
              {project.brandOverview}
            </p>
          </motion.div>

          {project.challenge && (
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={typeof project.challenge === 'object' && project.challenge.list ? 'md:col-span-2' : ''}>
              <h3 className="font-heading text-xl md:text-2xl font-black mb-6 uppercase border-l-4 pl-4 transition-colors duration-500 text-white border-[#ff6b2b]">Challenges</h3>
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
              <h3 className="font-heading text-xl md:text-2xl font-black mb-6 uppercase tracking-widest border-l-4 pl-4 transition-colors duration-500 text-white border-[#ff6b2b]">
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


          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-500 ${themeStyles.card} hover:border-[#ff6b2b]/50 group`}>
            <h3 className="font-heading text-xl md:text-2xl font-black mb-6 uppercase flex items-center gap-4 transition-colors duration-500 text-white">
              <span className="w-8 md:w-12 h-px bg-[#ff6b2b]"></span>
              Impact
            </h3>
            <p className="text-lg md:text-2xl leading-relaxed font-medium transition-colors duration-500 text-gray-300">
              {project.endorsement || (typeof project.perceptionShift === 'string' ? project.perceptionShift : (project.perceptionShift[0]?.desc || "Exceptional results delivered through strategic design and execution."))}
            </p>
          </motion.div>
        </div>



        {/* --- SERVICES LIST --- */}
        <section className="mt-24 md:mt-32 border-t pt-8 md:pt-12 transition-colors duration-500 border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-8">
              <h3 className="font-heading text-base md:text-lg font-black mb-3 md:mb-4 uppercase transition-colors duration-500 text-[#ff6b2b]">Services Provided</h3>
              <p className="text-lg md:text-xl font-bold leading-relaxed tracking-tight transition-colors duration-500 text-white">
                {project.services}
              </p>
            </div>
            <div className="md:col-span-4 space-y-6">
              <div>
                <h3 className="font-heading text-base md:text-lg font-black mb-3 md:mb-4 uppercase transition-colors duration-500 text-[#ff6b2b]">Sector</h3>
                <p className="text-xl font-bold transition-colors duration-500 text-white tracking-wide">{project.industry.toLowerCase()}</p>
              </div>
              {project.targetAudience && (
                <div>
                  <h3 className="font-heading text-base md:text-lg font-black mb-3 md:mb-4 uppercase tracking-[0.3em] transition-colors duration-500 text-[#ff6b2b]">Target Audience</h3>
                  <p className="text-xl font-bold transition-colors duration-500 text-white">{project.targetAudience.toLowerCase()}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- 3D EXHIBITION STALL (Lioncut only) --- */}
        {project.id === 17 && (
          <section className="mt-24 md:mt-32">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff6b2b] block mb-3">Interactive 3D Preview</span>
              <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-white">Exhibition <span className="text-gray-700 italic">Stall</span></h2>
              <p className="text-sm text-gray-500 mt-3">Drag to rotate · Scroll to zoom · Right-click to pan</p>
            </motion.div>
            <div className="w-full h-[500px] md:h-[680px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative">
              <iframe
                src="/clients/lioncut/3D stall.html?v=1.2"
                title="Lioncut 3D Exhibition Stall"
                className="w-full h-full border-0 bg-[#0b0b0b]"
                loading="lazy"
                allow="accelerometer; autoplay"
              />
            </div>
          </section>
        )}

        <GalleryMosaic images={project.gallery} layout={project.galleryLayout} />

        {project.appUrl && (
          <div className="mt-12 flex justify-center">
            <a
              href={project.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-5 bg-[#ff6b2b] text-white rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-[#ff6b2b] transition-all duration-300 shadow-[0_0_30px_rgba(255,107,43,0.3)] hover:shadow-[0_0_50px_rgba(255,107,43,0.6)] group scale-105"
            >
              Download Application
              <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        )}

        {/* --- RELATED PROJECTS (INFINITE SCROLL) --- */}
        <section className="mt-24 pt-24 border-t border-white/5 relative z-10 overflow-hidden">
          <div className="flex items-center justify-between mb-16 px-6">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff6b2b]">
                Next Chapter
              </span>
              <h2 className="font-heading text-4xl md:text-7xl font-black uppercase text-white">
                Related <span className="text-gray-700 italic">Works</span>
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/50 hover:text-[#ff6b2b] transition-colors"
            >
              View Full Portfolio
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <RelatedWorksMarquee othersProjects={othersProjects} />
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

      {/* Lightbox Modal for Hero and other key images */}
      <AnimatePresence>
        {selectedZoomImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedZoomImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-[10000]"
              onClick={(e) => { e.stopPropagation(); setSelectedZoomImg(null); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedZoomImg}
                alt="Fullscreen view"
                className="max-w-[95vw] max-h-[90vh] object-contain rounded-sm shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
