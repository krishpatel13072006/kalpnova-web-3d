export default function ComingSoon() {
    return (
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[160px]" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[160px]" />
        </div>
        {/* Content */}
        <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-[80vh]">
          <span className="mb-6 px-4 py-1 text-sm rounded-full border border-white/20 text-white/70">
            ⭐ Something premium is loading
          </span>
  
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            We’re <span className="text-orange-500">Coming</span> <br />
            Very Soon
          </h1>
  
          <p className="mt-6 max-w-xl text-white/70 text-lg">
            We’re crafting a clean identity and a powerful digital experience.
            Stay tuned — it’s worth the wait.
          </p>
        </main>
      </div>
    );
  }
  