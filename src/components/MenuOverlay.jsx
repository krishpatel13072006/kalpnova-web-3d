import { useEffect, useRef } from "react";
import gsap from "../lib/gsap";
import { Link } from "react-router-dom";

export default function MenuOverlay({ open, onClose }) {
  const overlayRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!open) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );

      gsap.from(itemsRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
      });
    }, overlayRef);

    return () => ctx.revert();
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-bg z-50 flex flex-col justify-center px-10"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-sm uppercase tracking-widest"
      >
        Close
      </button>

      <div className="space-y-6">
        {["Home", "About", "Services", "Contact"].map((item, i) => (
          <Link
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            onClick={onClose}
            ref={(el) => (itemsRef.current[i] = el)}
            className="text-4xl md:text-6xl font-bold block"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
