import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/kalpnova.png";

export default function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative mt-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-3">
        {/* BRAND */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center group"
          >
            <img
              src={logo}
              alt="Imagine logo"
              className="
                h-12 w-auto
                transition-transform duration-300
                group-hover:scale-105
              "
            />
          </button>

          <p className="text-sm max-w-xs text-[#FFE1C5]">
            We help ambitious teams turn clarity into momentum through
            thoughtful design and technology.
          </p>
        </div>

        {/* NAV */}
        <div className="space-y-3">
          <span className="text-xs tracking-widest text-orange-500">
            NAVIGATION
          </span>
          <nav className="flex flex-col gap-2 text-sm text-[#FFE1C5]">
            <NavLink to="/" className="hover:text-orange-500 transition">
              Home
            </NavLink>
            <NavLink to="/about" className="hover:text-orange-500 transition">
              About
            </NavLink>
            <NavLink to="/services" className="hover:text-orange-500 transition">
              Services
            </NavLink>
            <NavLink to="/contact" className="hover:text-orange-500 transition">
              Contact
            </NavLink>
          </nav>
        </div>

        {/* SOCIAL */}
        <div className="space-y-3 text-[#FFE1C5]">
          <span className="text-xs tracking-widest text-orange-500">
            CONNECT
          </span>
          <div className="flex gap-4 text-sm">
            <a
              href="https://www.linkedin.com/company/kalpnova/"
              className="opacity-70 hover:opacity-100 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/kalpnova/"
              className="opacity-70 hover:opacity-100 transition"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/5 ">
        <div className="max-w-7xl mx-auto px-6 py-6 flex text-[#FFE1C5] justify-between items-center text-xs">
          <span>
            © {new Date().getFullYear()} Imagine. All rights reserved.
          </span>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2
                       text-orange-500
                       hover:text-orange-400
                       transition"
          >
            <span className="text-xs">Back to top</span>
            <span
              className="inline-flex items-center justify-center
                         w-8 h-8 rounded-full
                         border border-orange-500/30
                         group-hover:border-orange-500
                         transition"
            >
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
