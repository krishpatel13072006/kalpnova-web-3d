import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: "I",
    title: "Branding",
    description: "We build dynamic brands through thoughtful design and strategic positioning.",
    image: "/clients/kalpnova/Artboard 1.webp",
    subServices: [
      "Logo design", "Brand Strategy", "Print Collateral Designs", 
      "Brand Imagery", "Brand Consultation", "Event Identity Design", "Launch Event Design"
    ]
  },
  {
    id: "II",
    title: "Packaging",
    description: "Creating physical and digital packaging that stands out on the shelf and in the mind.",
    image: "/clients/London Coffee/banner.webp",
    subServices: [
      "Product Packaging", "Label & Box Design", "Unboxing Experience", 
      "Sustainable Packaging", "3D Mockups"
    ]
  },
  {
    id: "III",
    title: "Social Media",
    description: "Engaging your audience with compelling content and strategic campaign execution.",
    image: "/clients/Pixal Plus/2.webp",
    subServices: [
      "Content Strategy", "Grid Design", "Motion Graphics", 
      "Campaign Planning", "Community Management"
    ]
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#0a0a0a] text-zinc-100 min-h-screen lg:h-screen w-full flex flex-col justify-center px-6 md:px-12 py-20 lg:py-0 overflow-hidden  relative">
       {/* Background subtle texture/grid if needed, but keeping it clean as per request */}
      <div className="max-w-[1440px] w-full mx-auto relative z-10">
        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* LEFT COLUMN: Fixed Image & Details */}
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col"
              >
                {/* Image Container */}
                <div className="w-full max-w-[320px] aspect-square rounded-[2rem] overflow-hidden mb-8 relative bg-zinc-900 shadow-2xl mx-auto lg:mx-0">
                  <img 
                    src={services[activeIndex].image} 
                    alt={services[activeIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-0 w-full text-center">
                    <p className="text-xs font-bold tracking-widest uppercase text-white/90">Kalpnova Group</p>
                  </div>
                </div>

                {/* Sub-services List */}
                <div className="min-h-[160px] text-center lg:text-left">
                  <h3 className="font-heading text-lg font-medium text-white mb-4 uppercase">
                    {services[activeIndex].title}
                  </h3>
                  <ul className="space-y-3 inline-block lg:block text-left">
                    {services[activeIndex].subServices.map((sub, i) => (
                      <li key={i} className="text-zinc-300 text-sm md:text-base flex items-center gap-3 font-medium">
                        <span className="text-[#ff6b2b]">→</span> {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Fixed Height Accordion Items */}
          <div className="lg:col-span-8 flex flex-col justify-center order-1 lg:order-2">
            {services.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <div 
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className="flex flex-row items-center border-b border-zinc-800 h-[100px] md:h-[140px] cursor-pointer transition-all duration-500 w-full relative group"
                >
                  {/* Title & Roman Numeral */}
                  <div className="flex items-start z-10 w-full lg:w-1/2">
                    <h2 
                      className={`transition-all duration-500 ease-in-out whitespace-nowrap uppercase ${
                        isActive 
                          ? 'text-white font-heading italic text-4xl md:text-6xl lg:text-[80px] tracking-tight transform translate-x-2' 
                          : 'text-zinc-600 font-heading font-medium text-3xl md:text-5xl lg:text-7xl tracking-tighter group-hover:text-zinc-400'
                      }`}
                    >
                      {service.title}
                    </h2>
                    
                    <span 
                      className={`ml-4 md:ml-8 text-[10px] md:text-sm font-semibold tracking-widest uppercase mt-2 md:mt-5 transition-all duration-500 ${
                        isActive ? 'text-[#ff6b2b] opacity-100' : 'text-zinc-700 opacity-50'
                      }`}
                    >
                      — {service.id}
                    </span>
                  </div>

                  {/* Description - visible only on larger screens when active */}
                  <div className="hidden lg:w-1/2 lg:flex justify-end">
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="max-w-xs"
                        >
                          <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal">
                            {service.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

