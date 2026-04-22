import React, { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioItems } from '../data/portfolio';

// ─── Category map: match each project by id to a category ───────────────────
const categoryMap = {
  8: 'Digital',
  9: 'Branding',
  10: 'Branding',
  11: 'Branding',
  12: 'Branding',
  13: 'Packaging',
  14: 'Digital',
  15: 'Social Media',
  16: 'Branding',
  18: 'Branding',
  19: 'Social Media',
  20: 'Branding',
  21: 'Social Media',
  22: 'Branding',
};

const CATEGORIES = ['All', 'Branding', 'Packaging', 'Social Media', 'Digital'];

// ─── Category description strings ────────────────────────────────────────────
const categoryDescriptions = {
  All: 'We craft end-to-end brand experiences — from deep strategy and sharp identity to print, digital, and motion.',
  Branding: 'Branding goes beyond logos and colours. It\'s about defining your brand\'s personality. We build each brand from the ground up, shaping it into a distinct character that communicates clearly who you are.',
  Packaging: 'Great packaging is a silent salesperson. We design packaging that commands shelf presence, tells a story, and converts browsers into buyers.',
  'Social Media': 'Scroll-stopping creatives and content systems built for engagement. Every post is a strategic asset — designed to grow brand recall and drive real interaction.',
  Digital: 'High-performance digital experiences: websites, apps, and dashboards crafted for clarity, speed, and conversion. We turn complex problems into elegant solutions.',
};

// ─── Animation Presets (Exact original parameters) ───────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } },
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    }
  }
};

const cardMotion = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } 
  },
};

// ─── Memoized Portfolio Card ──────────────────────────────────────────────────
const PortfolioCard = memo(({ item }) => {
  return (
    <motion.div
      variants={cardMotion}
    >
      <Link
        to={`/portfolio/${item.id}`}
        className="group block cursor-pointer"
      >
        {/* Folder UI */}
        <div className="relative flex flex-col mb-6 transition-transform duration-500 group-hover:-translate-y-2">
          {/* Tab */}
          <div className="w-[35%] md:w-[40%] h-8 bg-[#1a1a1a] rounded-t-[12px] relative z-10 flex items-center justify-center border-t border-l border-r border-white/5 group-hover:border-white/10 transition-colors duration-500">
            <div className="w-10 h-[3px] bg-[#333] rounded-full group-hover:bg-[#ff6b2b] transition-colors" />
            <div className="absolute -bottom-[2px] left-0 right-0 h-[4px] bg-[#1a1a1a]" />
          </div>
          {/* Body */}
          <div 
            className="w-full bg-[#1a1a1a] rounded-b-3xl rounded-tr-3xl p-3 md:p-5 relative z-0 border border-white/5 group-hover:border-white/10 shadow-lg group-hover:shadow-[0_20px_50px_-12px_rgba(255,107,43,0.15)]"
            style={{ 
              transition: 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease',
              transform: 'translateZ(0)'
            }}
          >
            <div className="w-full aspect-video rounded-2xl overflow-hidden relative bg-[#050505] shadow-inner">
              <img
                src={item.heroImage || item.image || '/placeholder.jpg'}
                alt={item.title}
                className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-[#ff6b2b] font-bold text-sm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  View Case Study →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category pill */}
        <div className="px-2 mb-2 flex justify-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#ff6b2b] border border-[#ff6b2b]/30 rounded-full px-2.5 py-0.5">
            {categoryMap[item.id] || 'Work'}
          </span>
        </div>

        {/* Title */}
        <div className="px-2 text-center">
          <h3 className="font-heading text-xl md:text-2xl font-black mb-3 text-white group-hover:text-[#ff6b2b] transition-colors uppercase tracking-tighter">
            {item.title}
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.1em] leading-relaxed text-gray-500">
            {item.type || item.tags}
          </p>
        </div>
      </Link>
    </motion.div>
  );
});

export default function WorkPortfolio({ headingLevel = "h1" }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const HeadingTag = headingLevel;

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return portfolioItems;
    return portfolioItems.filter(item => categoryMap[item.id] === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full min-h-screen bg-[#0b0b0b] text-[#f4f4f4]  relative overflow-x-hidden pt-0 selection:bg-[#ff6b2b] selection:text-white">
      <div className="relative z-10 pb-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">

          {/* ── PAGE HEADER ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeInUp} initial="hidden" animate="visible"
            className="pt-0 pb-8"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#ff6b2b] mb-3">
              Work Portfolio
            </p>
            <HeadingTag className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-white">
              Our Work
            </HeadingTag>
          </motion.div>

          {/* ── CATEGORY FILTER TABS ────────────────────────────────── */}
          <motion.div
            variants={fadeInUp} initial="hidden" animate="visible"
            className="flex flex-wrap gap-3 mb-6"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all duration-300
                  ${activeCategory === cat
                    ? 'bg-[#ff6b2b] border-[#ff6b2b] text-white shadow-[0_0_20px_rgba(255,107,43,0.4)]'
                    : 'bg-transparent border-white/20 text-white/60 hover:border-white/50 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* ── ACTIVE CATEGORY DESCRIPTION ─────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end gap-4 md:gap-16 border-b border-white/5 pb-10"
            >
              <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-white shrink-0 italic">
                {activeCategory}
              </h2>
              <p className="text-sm md:text-base text-white/50 max-w-xl leading-relaxed">
                {categoryDescriptions[activeCategory]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* ── PROJECT GRID / TERMINAL ─────────────────────────────── */}
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-12 md:gap-y-24"
          >
            {filteredItems.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </motion.div>

          {/* ── CONTACT SECTION ─────────────────────────────────────── */}
          <section className="mt-24 pt-12 border-t border-white/5 relative z-10">
            <motion.div
              variants={fadeInUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-8"
            >
              <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                Got big plans for your brand or a <br className="hidden md:block" /> new project?{' '}
                <span className="text-[#ff6b2b]">Let's chat!</span>
              </h2>
              <div className="space-y-12 pt-6">
                <div>
                  <Link to="mailto:business@kalpnova.com" className="text-lg md:text-2xl font-bold text-gray-400 hover:text-white transition-colors tracking-tight">
                    business@kalpnova.com
                  </Link>
                </div>
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Career</h3>
                  <Link to="mailto:hr@kalpnova.com" className="text-lg md:text-2xl font-bold text-gray-400 hover:text-white transition-colors tracking-tight">
                    hr@kalpnova.com
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </div>
    </div>
  );
}

