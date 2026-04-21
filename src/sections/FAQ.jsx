import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Do you work with clients outside Ahmedabad?",
    a: "Yes. While we are based in Ahmedabad, Gujarat, we work with clients across India remotely. All projects are handled digitally with regular check-ins and clear timelines."
  },
  {
    q: "Can I hire Kalpnova for just one service?",
    a: "Absolutely. You can engage us for a single service — a logo, a set of ad creatives, or monthly social media design — without committing to a full package."
  },
  {
    q: "How long does a branding project take?",
    a: "A full brand identity project typically takes 2 to 3 weeks depending on revisions. Social media design retainers run on a monthly cycle. We share clear timelines before starting every project."
  },
  {
    q: "What makes Kalpnova different from other design agencies in Ahmedabad?",
    a: "We combine design expertise with a marketing-first mindset. Every design we produce is built to perform — not just to look good. We are a boutique studio, which means faster communication, more accountability, and a team that actually cares about your results."
  }
];

function FAQItem({ faq, isOpen, toggle }) {
  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <button
        onClick={toggle}
        className="w-full py-8 flex items-center justify-between text-left group transition-all duration-300"
      >
        <h3 className={`font-heading text-xl md:text-2xl font-bold transition-colors duration-300 ${isOpen ? 'text-orange-500' : 'text-[#FFE1C5] group-hover:text-white'}`}>
          {faq.q}
        </h3>
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${isOpen ? 'border-orange-500 bg-orange-500 text-black rotate-45' : 'border-white/10 text-white group-hover:border-orange-500/50'}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="pb-8 text-zinc-400 leading-relaxed italic text-sm md:text-base max-w-3xl">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-6 bg-[#0B0B0C] border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1 text-xs tracking-widest
                           rounded-full border border-orange-500/30
                           text-orange-500 font-medium">
            HELP CENTER
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#FFE1C5]">
            Frequently asked <span className="text-orange-500 italic">questions</span>
          </h2>
        </div>

        <div className="bg-[#111112] rounded-[2.5rem] p-4 md:p-10 border border-white/5 relative overflow-hidden">
           {/* Subtle gradient background */}
           <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
           
          <div className="relative z-10">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                toggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
