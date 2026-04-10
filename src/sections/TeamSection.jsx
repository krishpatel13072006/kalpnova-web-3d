import React from 'react';
import { motion } from 'framer-motion';

// Reusable SVG Icon Components adapted to theme
const LinkedInIcon = () => (
  <svg className="w-6 h-6 hover:text-orange-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6 hover:text-orange-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XTwitterIcon = () => (
  <svg className="w-6 h-6 hover:text-orange-500 transition-colors" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.5h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-6 h-6 hover:text-orange-500 transition-colors" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-6 h-6 hover:text-orange-500 transition-colors" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const EmailIcon = () => (
  <svg className="w-6 h-6 hover:text-orange-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// Quote Graphic Component adapted with orange bars
const QuoteGraphic = () => (
  <div className="flex gap-[6px] mb-6">
    <div className="w-3.5 h-10 bg-orange-500/80 skew-x-[-15deg]"></div>
    <div className="w-3.5 h-10 bg-orange-500/80 skew-x-[-15deg]"></div>
  </div>
);

const teamMembers = [
  {
    id: 1,
    role: "Owner",
    name: "Shivam Patel",
    image: "/clients/Team/ceo.jpeg",
    quote: '"Kalpnova" is more than just a name, it\'s a promise to reflect a brand\'s essence and vision through thoughtful, creative solutions.',
    paragraphs: [
      "I believe brands, like people, have unique stories and personalities. That's why we work as an extended in-house team, fostering deep collaboration, because building something meaningful takes time and collective effort.",
      "Every brand we work with becomes a part of our journey, just as we become a part of theirs. It's this trust that make our work meaningful, and I'm grateful for every brand we get to be a part of."
    ],
    socials: { linkedin: "#", instagram: "#", whatsapp: "#", twitter: "#", github: "#", email: "mailto:#" }
  },
  {
    id: 2,
    role: "Manager",
    name: "Vishal Patel",
    image: "/clients/Team/manager.jpeg",
    quote: '"Efficiency is doing things right; effectiveness is doing the right things. I strive to bring both to our daily operations."',
    paragraphs: [
      "Managing our daily operations is about empowering our creative minds. By streamlining workflows and optimizing our resources, I ensure our team can focus entirely on what they do best: creating exceptional brand experiences.",
      "We ensure seamless execution from concept to delivery. Every project is a new puzzle, and organizing the pieces so they fit perfectly together is where the true operational magic happens."
    ],
    socials: { linkedin: "#", instagram: "#", whatsapp: "#", twitter: "#", github: "#", email: "mailto:#" }
  },
  {
    id: 3,
    role: "Developer",
    name: "Krish Patel",
    image: "/clients/Team/developer.jpeg",
    quote: '"Code is poetry written for machines to build human experiences. Functionality should always feel natural and intuitive."',
    paragraphs: [
      "Translating beautiful designs into robust, functional code is my passion. The intersection of aesthetics and technology is where the best digital products are born, and I work tirelessly to bridge that gap.",
      "Performance, accessibility, and scalability are always at the forefront of my development process. A great brand deserves a digital presence that not only looks stunning but performs flawlessly under any condition."
    ],
    socials: { linkedin: "#", instagram: "#", whatsapp: "#", twitter: "#", github: "#", email: "mailto:#" }
  }
];

export default function TeamSection() {
  return (
    <section className="bg-black text-[#FFE1C5] font-sans pb-32 px-6 md:px-12 lg:px-24">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20 text-center md:text-left">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight"
        >
          Meet the <span className="font-serif italic text-orange-500">team</span>
        </motion.h2>
      </div>

      {/* Team Members List */}
      <div className="max-w-7xl mx-auto space-y-32">
        {teamMembers.map((member, index) => {
          const isImageRight = index % 2 !== 0;

          return (
            <motion.div 
              key={member.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col gap-10 lg:gap-20 items-stretch ${
                isImageRight ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
            >
              
              {/* Image Section */}
              <div className="w-full lg:w-1/3 flex-shrink-0 flex items-start">
                <div className="w-full aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl border border-white/5 bg-[#111]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
              </div>

              {/* Text Content Section */}
              <div className="w-full lg:w-2/3 flex flex-col justify-between py-4">
                
                {/* Top: Quote and Paragraphs */}
                <div className="space-y-6">
                  <QuoteGraphic />
                  
                  <div className="space-y-6 text-[#FFE1C5]/90 leading-relaxed md:text-lg">
                    <p className="font-medium text-white italic">
                      {member.quote}
                    </p>
                    
                    {member.paragraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Bottom: Name, Role, and Socials */}
                <div className="mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-t border-orange-500/20 pt-8">
                  <div>
                    <h3 className="font-serif italic text-3xl mb-1 text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-orange-500 font-medium uppercase tracking-widest">
                      {member.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-[#FFE1C5]">
                    {Object.entries(member.socials).map(([platform, url]) => {
                      const Icon = {
                        linkedin: <LinkedInIcon />,
                        instagram: <InstagramIcon />,
                        whatsapp: <WhatsAppIcon />,
                        twitter: <XTwitterIcon />,
                        github: <GitHubIcon />,
                        email: <EmailIcon />
                      }[platform];

                      return (
                        <a 
                          key={platform} 
                          href={url} 
                          target={platform === 'email' ? '_self' : '_blank'} 
                          rel="noopener noreferrer" 
                          className="hover:text-orange-500 hover:-translate-y-1 transition-all duration-300"
                        >
                          {Icon}
                        </a>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
