const products = [
    {
      name: "NFC Products",
      desc: "We design and deliver modern and attractive NFC products.",
    },
  ];
  
  export default function ProductList() {
    return (
      <section className="max-w-6xl mx-auto px-6">
        <h1 className="text-section font-bold mb-16 text-[#FFE1C5]">
          Our <span className="accent">Products</span>
        </h1>
  
        <div className="space-y-8">
          {products.map(p => (
            <div
              key={p.name}
              className="p-8 rounded-2xl bg-[#141414]
                         border border-white/10 "
            >
              <h3 className="text-xl font-semibold text-[#FFE1C5]">{p.name}</h3>
              <p className="mt-2 text-[#FFE1C5]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  