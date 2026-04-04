import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ConsultancySection = () => {
  const stats = [
    {
      title: "Brands",
      subtitle: "we've worked with",
      value: "20+"
    },
    {
      title: "Industries",
      subtitle: "we've served for",
      value: "12+"
    },
    {
      title: "Views",
      subtitle: "generated for clients",
      value: "50k"
    }
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  return (
    <section className="bg-[#0a0a0a] text-zinc-100 py-24 md:py-32 px-6 md:px-12 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Main Heading */}
        <motion.h2 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-[56px] leading-[1.2] md:leading-[1.15] font-light text-center max-w-5xl tracking-tight mb-20 md:mb-32"
        >
          We are a <span className="font-serif italic text-[#ff6b2b] font-medium">creative & consultancy</span> studio based out of Ahmedabad, India, specializing in branding, design, and social media, serving clients <span className="font-serif italic text-[#ff6b2b] font-medium">worldwide.</span>
        </motion.h2>

        {/* Stats Row */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row w-full justify-between max-w-5xl gap-12 md:gap-0 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={fadeUp}
              className={`flex flex-col items-center md:items-start w-full md:w-1/3 ${
                index !== 0 ? 'md:pl-12 lg:pl-16 md:border-l border-zinc-800' : 'md:pr-4'
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-normal text-[#ff6b2b] mb-1 text-center md:text-left">
                {stat.title}
              </h3>
              <p className="text-sm md:text-base text-zinc-400 mb-8 md:mb-12 text-center md:text-left">
                {stat.subtitle}
              </p>
              <div className="text-7xl md:text-[100px] lg:text-[120px] font-light tracking-tighter leading-none text-center md:text-left">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8"
        >
          <Link to="/contact" className="px-8 py-3.5 bg-[#ff6b2b] text-white rounded-full font-semibold text-sm hover:bg-[#e55a1f] transition-colors w-full sm:w-auto text-center">
            Get In Touch
          </Link>
          <Link to="/portfolio" className="px-8 py-3.5 bg-transparent border border-zinc-700 text-zinc-300 rounded-full font-semibold text-sm hover:border-[#ff6b2b] hover:text-[#ff6b2b] transition-all w-full sm:w-auto text-center">
            View Projects
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ConsultancySection;
