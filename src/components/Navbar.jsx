// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import gsap from "../lib/gsap";

// import logo from "../assets/kalpnova.png"; // 👈 update path if needed

// const links = [
//   { label: "Home", to: "/" },
//   { label: "About", to: "/about" },
//   { label: "Services", to: "/services" },
//   { label: "Products", to: "/products" },
//   { label: "Contact", to: "/contact" },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const overlayRef = useRef(null);
//   const itemsRef = useRef([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!open) return;

//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         overlayRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 0.4, ease: "power2.out" }
//       );

//       gsap.from(itemsRef.current, {
//         y: 40,
//         opacity: 0,
//         stagger: 0.12,
//         duration: 0.6,
//         ease: "power3.out",
//         delay: 0.1,
//       });
//     });

//     return () => ctx.revert();
//   }, [open]);

//   const handleNav = (to) => {
//     setOpen(false);
//     setTimeout(() => navigate(to), 80);
//   };

//   return (
//     <>
//       {/* NAV BAR */}
//       <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
//   <div className="max-w-7xl mx-auto flex items-center justify-between">

//     {/* LOGO */}
//     <button
//       onClick={() => handleNav("/")}
//       className="flex items-center gap-2"
//     >
//       <img
//         src={logo}
//         alt="Imagine logo"
//         className="h-8 md:h-10 w-auto"
//       />
//     </button>

//     {/* DESKTOP LINKS */}
//     <div className="hidden md:flex items-center gap-8 text-sm text-[#FFE1C5]">
//       {links.map((item) => (
//         <button
//           key={item.label}
//           onClick={() => handleNav(item.to)}
//           className="group flex items-center gap-1 hover:text-orange-600 transition"
//         >
//           {item.label}
//           <span className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
//             ↗
//           </span>
//         </button>
//       ))}
//     </div>

//     {/* RIGHT ACTIONS */}
//     <div className="flex items-center gap-4">
//     <a
//   href="/cs"
//   // download
//   className="hidden md:inline-flex items-center gap-2
//   px-5 py-2 rounded-full
//   bg-gradient-to-r from-[#FF8A00] to-[#E24A2B]
//   text-[#FFE1C5] text-sm font-medium
//   hover:scale-[1.04] hover:shadow-[0_0_45px_rgba(255,138,0,0.6)]
//   active:scale-[0.97] transition"
// >
//   Inside Kalpnova
//   <span className="text-xs"></span>
// </a>


//       {/* MOBILE MENU */}
//       <button
//         onClick={() => setOpen(true)}
//         className="md:hidden text-sm tracking-widest hover:text-orange-500 transition"
//       >
//         MENU
//       </button>
//     </div>

//   </div>
// </nav>


//       {/* OVERLAY */}
//       {open && (
//         <div
//           ref={overlayRef}
//           className="fixed inset-0 bg-bg z-50 flex items-center justify-center"
//         >
//           <button
//             onClick={() => setOpen(false)}
//             className="absolute top-6 right-6 text-sm tracking-widest hover:text-orange-500 transition"
//           >
//             CLOSE
//           </button>

//           <div className="text-center space-y-6">
//             {links.map((item, i) => (
//               <div
//                 key={item.label}
//                 ref={(el) => (itemsRef.current[i] = el)}
//                 onClick={() => handleNav(item.to)}
//                 className="
//                   text-4xl md:text-5xl font-semibold cursor-pointer
//                   transition-colors duration-300
//                   hover:text-orange-500
//                 "
//               >
//                 {item.label}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import logo from "../assets/kalpnova.png"; // 👈 update path if needed

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Work Portfolio", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clickedPath, setClickedPath] = useState(null);
  const location = useLocation();
  // Handle scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(prev => {
        if (prev !== isScrolled) return isScrolled;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle entry animation when menu opens
  useEffect(() => {
    if (open) {
      // Small delay ensures display: block is processed before opacity transitions
      const timer = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(timer);
    } else {
      setMounted(false);
    }
  }, [open]);

  const handleClose = () => {
    setMounted(false);
    setTimeout(() => setOpen(false), 300); // Wait for CSS transition to finish before unmounting
  };

  const handleNav = (to) => {
    if (open) {
      setMounted(false);
      setTimeout(() => {
        setOpen(false);
        // Direct navigation to avoid requiring a <Router> provider
        window.location.href = to;
      }, 300);
      return;
    }

    setClickedPath(to);
    setTimeout(() => {
      window.location.href = to;
    }, 800); // Wait 800ms to allow the slow background expansion animation out to full width
  };

  return (
    <>
      {/* NAV BAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 ${scrolled || location.pathname === '/pavilion'
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent border-b border-transparent py-5"
          }`}
        style={{
          transition: 'background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, padding 0.5s ease',
          transform: 'translateZ(0)'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() => handleNav("/")}
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="Kalpnova - Premium Web Design & Digital Growth Agency Logo"
              className="h-8 md:h-10 w-auto"
            />
          </button>


          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-2 text-sm relative z-10 p-1">
            {/* The expanded background container */}
            {clickedPath && (
              <motion.div
                layoutId="active-bg"
                className="absolute inset-0 bg-[#1a1a1a] border border-[#FF8A00] shadow-[0_0_20px_rgba(255,138,0,0.3)] rounded-full z-0"
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              />
            )}

            {links.map((item) => {
              const isActive = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
              const isClicked = clickedPath === item.to;

              let textColorClass = "text-[#FFE1C5] hover:text-orange-400";
              if (clickedPath) {
                textColorClass = isClicked ? "text-orange-500" : "text-white";
              } else if (isActive) {
                textColorClass = "text-orange-500";
              }

              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.to)}
                  className={`group relative flex items-center gap-1 px-4 py-2 rounded-full transition-colors duration-300 ${textColorClass} z-10`}
                >
                  {/* The single link background */}
                  {(isActive && !clickedPath) && (
                    <motion.div
                      layoutId="active-bg"
                      className="absolute inset-0 bg-[#1a1a1a] border border-[#FF8A00] shadow-[0_0_20px_rgba(255,138,0,0.3)] rounded-full z-0"
                      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  <span className={`relative z-10 text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isActive || isClicked ? 'text-orange-500' : 'opacity-70 group-hover:opacity-100'}`}>
                    ↗
                  </span>
                </button>
              );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            <a
              href="/insidekalpnova"
              className="hidden md:inline-flex items-center gap-2
              px-5 py-2 rounded-full
              bg-gradient-to-r from-[#FF8A00] to-[#E24A2B]
              text-[#FFE1C5] text-sm font-medium
              hover:scale-[1.04] hover:shadow-[0_0_45px_rgba(255,138,0,0.6)]
              active:scale-[0.97] transition"
            >
              Inside Kalpnova
              <span className="text-xs"></span>
            </a>



            {/* MOBILE MENU */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-sm tracking-widest text-[#FFE1C5] hover:text-orange-500 transition"
            >
              MENU
            </button>
          </div>

        </div>
      </nav>

      {/* OVERLAY */}
      {open && (
        <div
          className={`fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300 ease-out ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-sm tracking-widest text-[#FFE1C5] hover:text-orange-500 transition"
          >
            CLOSE
          </button>

          <div className="text-center space-y-6 flex flex-col items-center">
            {links.map((item, i) => {
              const isActive = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);

              return (
                <div
                  key={item.label}
                  onClick={() => handleNav(item.to)}
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(40px)",
                    transition: `all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) ${0.1 + i * 0.12}s`
                  }}
                  className={`
                    text-4xl md:text-5xl font-semibold cursor-pointer px-6 py-2 rounded-2xl
                    ${isActive ? "bg-white/10 text-orange-500" : "text-[#FFE1C5] hover:text-orange-500"}
                  `}
                >
                  {item.label}
                </div>
              );
            })}

            {/* INSIDE KALPNOVA MOBILE link */}
            <div
              onClick={() => handleNav("/insidekalpnova")}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) ${0.1 + links.length * 0.12}s`
              }}
              className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#E24A2B] text-[#FFE1C5] text-xl font-medium shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Inside Kalpnova
            </div>
          </div>
        </div>
      )}
    </>
  );
}