import WorkPortfolio from "./workportfolio";
import SEO from "../components/SEO";
import FAQ from "../sections/FAQ";

import { motion } from "framer-motion";

export default function Services() {
  return (
    <main className="pt-12 bg-[#0B0B0C]">
      <SEO
        title="Design & Branding Services in Ahmedabad | Kalpnova"
        description="From branding and social media design to Meta Ads creatives, UI/UX, print media and video editing — explore all design services by Kalpnova, Ahmedabad."
        url="/services"
      />

      {/* SERVICE HERO */}
      <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center justify-center px-5 h-8 text-[10px] tracking-[0.3em] rounded-full border border-orange-500/20 
                             bg-orange-500/5 text-orange-500 font-bold uppercase backdrop-blur-sm
                             shadow-[0_0_20px_rgba(255,107,43,0.1)] pt-[2px]">
              Capabilities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-10 text-[#FFE1C5] uppercase"
          >
            Design & Branding <br className="hidden md:block" />
            <span className="text-orange-500 italic">Services in Ahmedabad</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-400 max-w-3xl leading-relaxed mx-auto font-medium"
          >
            We build premium visual identities and digital assets that make your brand stand out and convert. From strategy to execution, we help businesses look intentional and feel premium.
          </motion.p>
        </div>
      </section>

      {/* PORTFOLIO SECTION (H2) */}
      <WorkPortfolio headingLevel="h2" />

      {/* FAQ SECTION */}
      <FAQ />


    </main>
  );
}
