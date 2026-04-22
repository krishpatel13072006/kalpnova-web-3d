import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Briefcase, Layout, MessageCircle, ArrowRight, ExternalLink } from 'lucide-react';
import logo from "../assets/kalpnova.png";
import GrainOverlay from "../components/GrainOverlay";

const Instagram = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Linkedin = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const links = [
  {
    title: "Visit Our Website",
    url: "/",
    icon: <Globe className="w-5 h-5" />,
    description: "Explore our premium design & digital growth solutions.",
    color: "from-[#FF8A00] to-[#E24A2B]",
    primary: true
  },
  {
    title: "Work Portfolio",
    url: "/portfolio",
    icon: <Briefcase className="w-5 h-5" />,
    description: "See how we help brands look intentional.",
    color: "from-zinc-800 to-zinc-900"
  },
  {
    title: "Inside Kalpnova (The Hub)",
    url: "/insidekalpnova",
    icon: <Layout className="w-5 h-5" />,
    description: "Go behind the scenes of our creative studio.",
    color: "from-zinc-800 to-zinc-900"
  },
  {
    title: "Get In Touch",
    url: "/contact",
    icon: <MessageCircle className="w-5 h-5" />,
    description: "Let's discuss your next premium project.",
    color: "from-zinc-800 to-zinc-900"
  },
  {
    title: "Follow on Instagram",
    url: "https://www.instagram.com/kalpnova/",
    icon: <Instagram className="w-5 h-5" />,
    description: "@kalpnova - Daily design inspiration.",
    color: "from-zinc-800 to-zinc-900",
    external: true
  },
  {
    title: "Connect on LinkedIn",
    url: "https://www.linkedin.com/company/kalpnova/",
    icon: <Linkedin className="w-5 h-5" />,
    description: "Professional updates and insights.",
    color: "from-zinc-800 to-zinc-900",
    external: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Links() {
  return (
    <div className="relative min-h-screen bg-[#0B0B0C] text-[#F5F5F5] font-body overflow-x-hidden selection:bg-orange-500/30">
      <GrainOverlay />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <main className="relative z-10 max-w-md mx-auto px-6 pt-20 pb-16">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_0_30px_rgba(255,138,0,0.3)]">
              <div className="bg-[#0B0B0C] rounded-[calc(1.5rem-2px)] p-4">
                <img 
                  src={logo} 
                  alt="Kalpnova Logo" 
                  className="h-12 w-auto"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-3xl font-bold tracking-tight text-[#FFE1C5] mb-2"
          >
            Kalpnova <span className="text-orange-500">Design Studio</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-400 text-sm max-w-[280px]"
          >
            Stop Looking Random. Start Looking Premium. <br/> Ahmedabad's Choice for Growth Design.
          </motion.p>
        </div>

        {/* Links List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : ""}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex items-center p-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
                link.primary 
                ? `bg-gradient-to-r ${link.color} border-transparent shadow-lg shadow-orange-600/20` 
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-500/30"
              }`}
            >
              {/* Shine effect for hover */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                link.primary ? "bg-white/20" : "bg-orange-500/10 text-orange-500"
              }`}>
                {link.icon}
              </div>
              
              <div className="flex-grow">
                <h2 className={`font-semibold text-base leading-tight ${link.primary ? "text-white" : "text-[#FFE1C5]"}`}>
                  {link.title}
                </h2>
                <p className={`text-xs mt-1 ${link.primary ? "text-white/80" : "text-zinc-500"}`}>
                  {link.description}
                </p>
              </div>
              
              <div className={`ml-2 opacity-0 group-hover:opacity-100 transition-opacity ${link.primary ? "text-white" : "text-orange-500"}`}>
                {link.external ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://www.instagram.com/kalpnova/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-orange-500 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/company/kalpnova/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-orange-500 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:hello@kalpnova.com" className="text-zinc-500 hover:text-orange-500 transition-colors">
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-medium">
            © {new Date().getFullYear()} Kalpnova Design Studio
          </p>
        </motion.div>
      </main>
    </div>
  );
}
