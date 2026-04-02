export default function ContactForm() {
    return (
      <section className="max-w-xl mx-auto px-6">
        <h1 className="text-section font-bold mb-10 text-[#FFE1C5]">
          Let’s <span className="accent">Talk</span>
        </h1>
  
        <form className="space-y-6">
          <input
            placeholder="Your name"
            className="w-full p-4 rounded-xl bg-[#141414] border border-white/10 "
          />
          <input
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-[#141414] border border-white/10"
          />
          <textarea
            rows="4"
            placeholder="Tell us about your project"
            className="w-full p-4 rounded-xl bg-[#141414] border border-white/10"
          />
          <button
            className="px-6 py-3 rounded-xl bg-orange-500 text-black font-medium text-[#FFE1C5]"
          >
            Send message →
          </button>
        </form>
      </section>
    );
  }
  