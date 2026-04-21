import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Branding & Identity Design",
    desc: "Your brand is the first thing people judge. We design logos, brand guidelines, colour systems, and typography that make you look premium across every platform — print, digital, and social.",
    deliverables: "Logo files, brand style guide, colour palette, typography kit, business card design.",
    keywords: "Branding agency Ahmedabad · logo design Gujarat · brand identity design India",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    id: "02",
    title: "Social Media Design & Management",
    desc: "Scroll-stopping posts, carousels, reels thumbnails, and story templates — designed to grow your brand and your audience consistently, every month.",
    deliverables: "Monthly post designs, story templates, carousel layouts, reel covers, content calendar.",
    keywords: "Social media design services India · Instagram design agency · content design Ahmedabad",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 00-2 2z" />
      </svg>
    )
  },
  {
    id: "03",
    title: "Meta Ads Creative Design",
    desc: "High-converting ad creatives for Facebook and Instagram campaigns. We design for performance — stopping the scroll, communicating clearly, and driving real results for your ad spend.",
    deliverables: "Static ad creatives, carousel ads, story ads, video ad thumbnails, A/B variants.",
    keywords: "Meta ads creative design · Facebook ad design agency India · Instagram ad creatives",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    )
  },
  {
    id: "04",
    title: "Web & App Design",
    desc: "Clean, intuitive interfaces designed for real users. From wireframes to pixel-perfect screens — we design web and mobile experiences that look great and convert visitors into customers.",
    deliverables: "Wireframes, UI screens, design system, Figma source files, mobile-responsive designs.",
    keywords: "UI UX design agency Ahmedabad · web design company Gujarat · app design India",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: "05",
    title: "Print Media Design",
    desc: "Professional print collateral designed to leave a lasting impression — from business cards and brochures to hoarding designs and packaging that reflects your brand at every touchpoint.",
    deliverables: "Business cards, brochures, flyers, hoardings, packaging design, print-ready files.",
    keywords: "Print media design Ahmedabad · brochure design Gujarat · packaging design India",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2-2v4a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    )
  },
  {
    id: "06",
    title: "Video Editing",
    desc: "Brand videos, product reels, social cuts — edited for impact and optimised for the platforms your audience actually uses. Fast turnaround, on-brand, built for engagement.",
    deliverables: "Edited reels, brand video, product demo video, short-form social cuts, caption/subtitle files.",
    keywords: "Video editing agency Ahmedabad · reels editing service India · brand video production Gujarat",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    )
  },
];

export default function ServicesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
      <div className="mb-20 text-center lg:text-left">
        <span className="inline-block mb-4 px-4 py-1 text-xs tracking-widest
                         rounded-full border border-orange-500/30
                         text-orange-500 font-medium">
          OUR EXPERTISE
        </span>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-[#FFE1C5] leading-tight">
          What we do <span className="text-orange-500 italic">best</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-8 rounded-[2rem] bg-[#111112]
                       border border-white/5
                       hover:border-orange-500/30 hover:bg-[#161618]
                       transition-all duration-500 relative overflow-hidden"
          >
            {/* Number background */}
            <span className="absolute -right-4 -top-4 text-8xl font-black text-white/[0.02] group-hover:text-orange-500/[0.05] transition-colors duration-500">
              {s.id}
            </span>

            <div className="relative z-10">
              <div className="mb-6 text-orange-500 transform group-hover:scale-110 transition-transform duration-500 ease-out inline-block">
                {s.icon}
              </div>
              
              <h3 className="font-heading text-2xl font-bold mb-4 text-[#FFE1C5] group-hover:text-orange-500 transition-colors">
                {s.title}
              </h3>
              
              <p className="text-zinc-400 mb-6 leading-relaxed text-sm md:text-base group-hover:text-zinc-300 transition-colors">
                {s.desc}
              </p>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-orange-500/80 font-bold mb-2">Deliverables</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed italic">{s.deliverables}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold mb-2">Capabilities</h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-wider">{s.keywords}</p>
                </div>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

  
