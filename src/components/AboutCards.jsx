import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GridScan from './GridScan';

const AboutCards = () => {
  const cards = [
    {
      id: "01",
      title: "Strategy-First Design",
      description: "We merge design thinking with business goals—every brand identity, social post, and ad creative is engineered for impact, not just impressions.",
      // Using SVGs for the icons 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-[#ff6b2b]">
          <path d="M17.5 2c-1.3 0-2.8.5-4.1 1.5C12 4.5 10.5 5 9.2 5c-2.8 0-5.2-2.1-5.6-4.9l-.1-1.1-1.1.1C2 1.5 0 4.1 0 7c0 3.5 2.5 6.5 6 7.4V22h2v-7.2c2.1-1 4-2.8 5.4-5.3.6-1.1 1-2.2 1.2-3.3 1.3-1 2.8-1.5 4.1-1.5 2.8 0 5.2 2.1 5.6 4.9l.1 1.1 1.1-.1c.4-3.2-1.6-5.8-4.4-6.7C20.6 3 19.1 2 17.5 2z" />
        </svg>
      )
    },
    {
      id: "02",
      title: "Your Growth Partner",
      description: "Long-term growth matters to us. We collaborate as your marketing partner, not a one-off vendor—understanding your brand to scale it consistently.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff6b2b]">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <line x1="14" y1="13" x2="19" y2="18" />
          <line x1="19" y1="13" x2="14" y2="18" />
        </svg>
      )
    },
    {
      id: "03",
      title: "Designs That Convert",
      description: "More than problem-solving, our work combines psychology, platform trends, and storytelling to create designs that build trust and convert audiences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff6b2b]">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative bg-black text-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ width: '100%', height: '100%' }}>
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#cc7533"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">

        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-center mb-12 max-w-2xl uppercase"
        >
          Few things you <span className="font-heading italic text-[#ff6b2b]">should</span> <br className="hidden md:block" />
          <span className="font-heading italic text-[#ff6b2b]">know</span> about us.
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#e6e4dc] text-zinc-900 rounded-[1.5rem] overflow-hidden flex flex-col shadow-xl"
            >
              {/* Card Top Half */}
              <div className="p-6 pb-4 bg-[#eeeadd] flex justify-between items-start">
                <div>
                  <span className="block text-lg font-medium text-zinc-800 mb-1">{card.id}</span>
                  <h3 className="text-xl font-heading font-black italic uppercase">{card.title}</h3>
                </div>
                <div className="mt-1 scale-90 origin-top-right">
                  {card.icon}
                </div>
              </div>

              {/* Subtle Divider */}
              <div className="h-[1px] w-full bg-zinc-300/60"></div>

              {/* Card Bottom Half */}
              <div className="p-6 pt-4 flex-grow">
                <p className="text-sm text-zinc-800 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/contact" className="px-8 py-3.5 bg-[#ff6b2b] text-white rounded-full font-semibold text-sm hover:bg-[#e55a1f] transition-colors">
            Get In Touch
          </Link>
          <Link to="/portfolio" className="px-8 py-3.5 bg-transparent border border-[#ff6b2b] text-[#ff6b2b] rounded-full font-semibold text-sm hover:bg-[#ff6b2b]/10 transition-all">
            View Projects
          </Link>
          <Link to="/live" className="px-8 py-3.5 bg-transparent border border-[#ff6b2b] text-[#ff6b2b] rounded-full font-semibold text-sm hover:bg-[#ff6b2b]/10 transition-all">
            View Website
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutCards;
