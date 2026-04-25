import React, { useState, useMemo } from 'react';
import Terminal from '../components/Terminal';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';

const live_sites = [
  { 
    id: 1, 
    name: 'Akshar Live Security', 
    url: 'https://aksharlivesecurity.com/', 
    type: 'Security',
    industry: 'Surveillance & Home Automation',
    description: "Building a robust digital presence for Ahmedabad's leading security experts. We developed a results-driven platform that streamlines lead generation for high-end surveillance and home automation systems.",
    result: 'Optimized for high-intent search traffic'
  },
  { 
    id: 2, 
    name: 'Nilambuj', 
    url: 'https://nilambuj.com/', 
    type: 'Hospitality',
    industry: 'Premium Eco-Resorts',
    description: "Crafting an immersive digital escape for Nilambuj. A visually stunning, high-conversion resort website designed to capture the serenity of nature while driving direct bookings through an intuitive user journey.",
    result: 'Immersive 10/10 user experience'
  },
  { 
    id: 4, 
    name: 'ResourceOS', 
    url: 'https://resourceos.com/', 
    type: 'Enterprise',
    industry: 'IT Infrastructure Management',
    description: "Scaling enterprise efficiency with a clean, high-performance portal. ResourceOS bridges the gap between complex IT infrastructure and user-centric dashboard management.",
    result: 'Streamlined operational clarity'
  },
  { 
    id: 5, 
    name: 'Lioncut', 
    url: 'https://lioncut.co.in/', 
    type: 'Industrial',
    industry: 'Manufacturing & Power Tools',
    description: "Bringing industrial power to the digital shelf. A high-conversion B2B e-commerce experience for hair-cutting technology, optimized for speed and global accessibility.",
    result: 'B2B conversion optimized UI'
  }
];

const CATEGORIES = ['All', 'Security', 'Hospitality', 'Enterprise', 'Industrial'];

export default function LiveLab() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return live_sites.filter(site => {
      const matchesCategory = activeCategory === 'All' || site.type === activeCategory;
      const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            site.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            site.industry.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#060606] text-white pt-32 pb-40 px-6 relative overflow-hidden">
      <SEO 
        title="Digital Lab | Live Showcases & Case Studies | Kalpnova"
        description="Explore our high-performance digital deployments across Security, Hospitality, and Enterprise sectors. See our live work in action."
        url="/live"
      />

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] -z-10" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Page Header */}
        <div className="max-w-4xl mb-12">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-black uppercase text-orange-500 mb-4"
          >
            Digital Case Study Lab
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-8 text-white"
          >
            Live <span className="text-orange-500">Deployments</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed"
          >
            Step into our production environment. We build high-performance digital assets designed to perform, scale, and captivate across every industry.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-6 mb-24 items-center justify-between border-b border-white/5 pb-8"
        >
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase transition-all duration-300 border ${
                  activeCategory === cat 
                  ? 'bg-orange-500 border-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                  : 'bg-white/5 border-white/10 text-zinc-500 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <input
              type="text"
              placeholder="SEARCH PROJECT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-[10px] font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 transition-all font-bold"
            />
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-orange-500 transition-colors" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Gallery Stack */}
        <div className="flex flex-col gap-48">
          <AnimatePresence mode="popLayout text-white">
            {filteredItems.length > 0 ? (
              filteredItems.map((site, index) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, scale: 0.98, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                  className="relative flex flex-col gap-10"
                >
                  {/* PROJECT INFO - SEO TEXT BLOCK (TOP) */}
                  <div className="w-full max-w-4xl">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-black py-1 px-3 bg-orange-500/10 text-orange-500 rounded-full uppercase border border-orange-500/20">
                        {site.type} System
                      </span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-black uppercase text-white mb-2 leading-none">
                      {site.name}
                    </h2>
                    <h3 className="text-zinc-500 text-xs md:text-sm font-bold uppercase mb-6">
                      {site.industry}
                    </h3>
                    <p className="text-zinc-400 text-base md:text-xl leading-relaxed mb-8 max-w-3xl">
                      {site.description}
                    </p>
                    
                    {/* RESULT PILL */}
                    <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 items-center gap-3 group hover:border-orange-500/30 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                      <span className="text-[10px] font-black uppercase text-zinc-500 transition-colors">
                        Result: <span className="text-white">{site.result}</span>
                      </span>
                    </div>
                  </div>

                  {/* PROJECT PREVIEW - CAPSULE (BELOW) */}
                  <div className="w-full relative group">
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-orange-500/10 rounded-tl-3xl -z-10 group-hover:border-orange-500/30 transition-colors duration-500" />
                    <Terminal 
                      url={site.url} 
                      siteName={site.name} 
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-40 text-center"
              >
                <div className="text-5xl font-heading font-black text-white/10 uppercase mb-4 italic">
                  NO MATCHING VIEWPORTS FOUND
                </div>
                <button 
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                  className="text-orange-500 text-[10px] font-black uppercase hover:underline"
                >
                  Reset Terminal Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


