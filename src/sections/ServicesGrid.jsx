const services = [
    { title: "Branding & Identity", desc: "Logos, brand guidelines, colour palettes, and typography systems — everything you need to look consistent and premium across every platform." },
    { title: "Social Media Design", desc: "Scroll-stopping posts, carousels, reels thumbnails, and story templates designed to grow your brand and your audience." },
    { title: "Meta Ads Creative Design", desc: "High-converting ad creatives for Facebook and Instagram campaigns — designed to stop the scroll and drive real results." },
    { title: "Web & App UI/UX Design", desc: "Clean, intuitive interfaces designed for real users. From wireframes to final screens — we design experiences that convert." },
    { title: "Print Media", desc: "Business cards, brochures, hoarding designs, and packaging — professional print collateral that leaves a lasting impression." },
    { title: "Video Editing", desc: "Brand videos, product reels, social cuts — edited for impact and optimised for the platforms your audience actually uses." },
  ];
  
  export default function ServicesGrid() {
    return (
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <h1 className="text-section font-bold mb-16 text-[#FFE1C5]">
          What we do <span className="accent">best</span>
        </h1>
  
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => (
            <div
              key={s.title}
              className="p-6 rounded-2xl bg-[#141414]
                         border border-white/10
                         hover:border-orange-500/40
                         transition"
            >
              <h3 className="font-semibold mb-2 text-[#FFE1C5]">{s.title}</h3>
              <p className="text-sm text-[#FFE1C5]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  