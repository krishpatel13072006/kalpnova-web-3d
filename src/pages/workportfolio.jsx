import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioItems } from '../data/portfolio';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } 
  }
};

export default function WorkPortfolio() {
  return (
    <div className="w-full min-h-screen bg-[#0b0b0b] text-[#f4f4f4] font-sans relative overflow-x-hidden pt-16 md:pt-24">
      
      {/* Background Ambience Optimized */}
      <div className="absolute top-[-20%] left-0 w-[50%] h-[50%] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,43,0.08) 0%, rgba(255,107,43,0) 70%)', transform: 'translateZ(0)', willChange: 'transform' }}></div>
      <div className="absolute top-[20%] right-0 w-[40%] h-[60%] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,43,0.08) 0%, rgba(255,107,43,0) 70%)', transform: 'translateZ(0)', willChange: 'transform' }}></div>

      <div className="relative z-10 pt-4 md:pt-8 pb-12">
        {/* Using max-w-[1440px] for a wider, more premium grid */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          <div className="animate-in fade-in duration-500">
            {/* UPDATED GRID: strictly 3 columns on desktop, increased gap spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-12 md:gap-y-24">
              {portfolioItems.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/portfolio/${item.id}`}
                  className="group block cursor-pointer"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {/* DARK FOLDER UI */}
                  <div className="relative flex flex-col mb-6 transition-transform duration-500 group-hover:-translate-y-2" style={{ willChange: 'transform' }}>
                    {/* Folder Tab */}
                    <div className="w-[35%] md:w-[40%] h-8 bg-[#1a1a1a] rounded-t-[12px] relative z-10 flex items-center justify-center border-t border-l border-r border-white/5 group-hover:border-white/10 transition-colors duration-500">
                      {/* Tab Handle */}
                      <div className="w-10 h-[3px] bg-[#333] rounded-full group-hover:bg-[#ff6b2b] transition-colors"></div>
                      {/* Seamless connector to hide the body gap */}
                      <div className="absolute -bottom-[2px] left-[0px] right-[0px] h-[4px] bg-[#1a1a1a]"></div>
                    </div>

                    {/* Folder Body */}
                    <div className="w-full bg-[#1a1a1a] rounded-b-3xl rounded-tr-3xl p-3 md:p-5 relative z-0 border border-white/5 group-hover:border-white/10 shadow-lg group-hover:shadow-[0_20px_50px_-12px_rgba(255,107,43,0.15)] transition-all duration-500">
                      {/* Inset Image */}
                      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative bg-[#050505] shadow-inner">
                        <img 
                          src={item.heroImage || item.image} 
                          alt={item.title} 
                          className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105 opacity-100"
                          loading="lazy"
                        />
                        {/* Premium dark gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
                          <span className="text-[#ff6b2b] font-bold text-sm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            View Case Study →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TYPOGRAPHY - Scaled up to match the larger box size */}
                  <div className="px-2">
                    <h3 className="text-2xl md:text-[28px] font-black mb-2 text-white group-hover:text-[#ff6b2b] transition-colors leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 font-medium leading-relaxed uppercase tracking-widest">
                      {item.type || item.tags}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* --- COMPANY CONTACT DETAILS --- */}
          <section className="mt-20 pt-12 border-t border-white/5 relative z-10">
            <motion.div 
              variants={fadeInUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                Got big plans for your brand or a <br className="hidden md:block"/> new project? <span className="text-[#ff6b2b]">Let's chat!</span>
              </h2>
              
              <div className="space-y-12 pt-6">
                <div>
                  <Link 
                    to="mailto:business@kalpnova.com" 
                    className="text-lg md:text-2xl font-bold text-gray-400 hover:text-white transition-colors tracking-tight"
                  >
                    business@kalpnova.com
                  </Link>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Career</h3>
                  <Link 
                    to="mailto:hr@kalpnova.com" 
                    className="text-lg md:text-2xl font-bold text-gray-400 hover:text-white transition-colors tracking-tight"
                  >
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
