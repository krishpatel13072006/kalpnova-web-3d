export default function AboutNarrative() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* HEADER */}
      <div className="text-center mb-24">
        <span className="inline-block mb-4 px-4 py-1 text-xs tracking-widest
                         rounded-full border border-orange-500/30
                         text-orange-500">
          ABOUT US
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-[#FFE1C5]">
          Our <span className="text-orange-500">Journey</span>
        </h2>
      </div>

      {/* CONTENT GRID */}
      <div className="grid md:grid-cols-2 gap-20">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#FFE1C5]">
            Crafting Digital Excellence
          </h3>

          <p className="leading-relaxed text-[#FFE1C5]">
            At Kalpnova, we believe that great design and technology
            should work together seamlessly to create experiences that matter.
            For over 8 years, we've been partnering with businesses of all sizes
            to bring their visions to life.
          </p>

          <p className="leading-relaxed text-[#FFE1C5]">
            Our multidisciplinary team combines creativity, technical expertise,
            and strategic thinking to deliver solutions that not only look
            beautiful but also drive real business results.
          </p>

          <ul className="space-y-3 pt-6">
            {["Innovation", "Quality", "Collaboration", "Results-Driven"].map(
              (item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-[#FFE1C5]">{item}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* RIGHT TIMELINE */}
        <div className="relative pl-10 space-y-10">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-orange-500/30" />

          {[
            {
              year: "2022",
              title: "Founded",
              desc: "Started with a small team and a big vision to transform digital solutions.",
            },
            {
              year: "2024",
              title: "Growth Phase",
              desc: "Expanded team and began working with international clients and brands.",
            },
            {
              year: "2025",
              title: "Global Presence",
              desc: "Now serving clients across 2 continents with cutting-edge solutions and products.",
            },
          ].map((item) => (
            <div
              key={item.year}
              className="relative bg-[#141414] rounded-xl p-6
                         border border-orange-500/20"
            >
              {/* Dot */}
              <span className="absolute -left-[34px] top-8
                               w-3 h-3 rounded-full bg-orange-500" />

              <span className="text-orange-500 font-semibold">
                {item.year}
              </span>

              <h4 className="text-[#FFE1C5] font-semibold mt-1">
                {item.title}
              </h4>

              <p className="text-[#FFE1C5] text-sm mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
