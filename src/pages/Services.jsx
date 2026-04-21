import WorkPortfolio from "./workportfolio";
import SEO from "../components/SEO";
import FAQ from "../sections/FAQ";
import Contact from "../sections/Contact";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <main className="pt-32 bg-[#0B0B0C]">
      <SEO 
        title="Design & Branding Services in Ahmedabad | Kalpnova"
        description="From branding and social media design to Meta Ads creatives, UI/UX, print media and video editing — explore all design services by Kalpnova, Ahmedabad."
        url="/services"
      />

      {/* SERVICE HERO */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 text-center lg:text-left">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6 px-4 py-1 text-xs tracking-widest rounded-full border border-orange-500/30 text-orange-500 font-medium uppercase"
          >
            Capabilities
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-8 text-[#FFE1C5] uppercase"
          >
            Design & Branding <span className="text-orange-500 italic">Services in Ahmedabad</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed mx-auto lg:mx-0"
          >
            We build premium visual identities and digital assets that make your brand stand out and convert. From strategy to execution, we help businesses in Gujarat and beyond look intentional and feel premium.
          </motion.p>
        </div>
      </section>

      {/* PORTFOLIO SECTION (H2) */}
      <WorkPortfolio headingLevel="h2" />

      {/* FAQ SECTION */}
      <FAQ />

      {/* CTA SECTION */}
      <Contact />
    </main>
  );
}
