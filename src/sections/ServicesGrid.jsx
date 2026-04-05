const services = [
    { title: "Branding & Identity", desc: "We shape your brand’s positioning, voice, and visual identity to create lasting recognition." },
    { title: "Social Media Design", desc: "Scroll-stopping creatives and content systems designed to grow engagement and brand recall." },
    { title: "Web & App", desc: "High-performance, conversion-focused websites and apps with a cinematic user experience." },
    { title: "Print Media Design", desc: "Impactful offline designs—from brochures to hoardings—crafted for clarity and recall." },
    { title: "Meta Ads", desc: "Data-driven ad creatives optimized for attention, clicks, and measurable conversions." },
    { title: "Video Editing", desc: "Dynamic video edits that tell your story, hold attention, and elevate your brand presence." },
  ];
  
  export default function ServicesGrid() {
    return (
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <h1 className="text-section font-bold mb-16 text-[#FFE1C5]">
          Our <span className="accent">Services</span>
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
  