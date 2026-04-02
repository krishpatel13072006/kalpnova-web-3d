import { useEffect, useRef } from "react";
import gsap from "../lib/gsap";

export default function StorySection({ title, subtitle, image, reverse }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        y: 120,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(textRef.current.children, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center px-6 md:px-16"
    >
      <div
        className={`grid md:grid-cols-2 gap-12 items-center w-full ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Image */}
        <div
          ref={imageRef}
          className="rounded-xl overflow-hidden shadow-2xl"
        >
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            {title}
          </h2>
          <p className="text-muted text-lg max-w-md">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
