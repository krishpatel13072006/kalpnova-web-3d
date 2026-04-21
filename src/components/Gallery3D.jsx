import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion';

export default function Gallery3D({ images }) {
  // Guard clause and mapping images to the ICarouselItem format
  if (!images || images.length <= 1) return null;
  const initialItems = images.map((img, idx) => ({ id: idx, title: `Image ${idx + 1}`, image: img }));

  const [currentIndex, setCurrentIndex] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % initialItems.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + initialItems.length) % initialItems.length);
  };

  const visibleIndices = [
    (currentIndex - 1 + initialItems.length) % initialItems.length,
    currentIndex,
    (currentIndex + 1) % initialItems.length,
  ];

  const visibleItems = visibleIndices.map((index) => initialItems[index]);

  return (
    <section className="py-16 md:py-24 relative z-10 w-full overflow-hidden bg-[#0b0b0b]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-8 md:mb-12">
        <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
           Project <span className="text-[#ff6b2b]">Gallery</span>
        </h2>
      </div>

      <div className="flex justify-center items-center px-4 md:px-0 w-full">
        {/* User-provided Carousel Implementation */}
        <div className="carousel-container relative h-[400px] md:h-[600px] w-full max-w-[1000px] overflow-hidden rounded-2xl md:rounded-[2rem] border-2 border-white/10 bg-[#111] p-2 shadow-2xl">
          
          <div
            onClick={handlePrev}
            className="navigation-item-left absolute left-2 md:left-6 top-[50%] z-20 flex h-10 w-10 md:h-12 md:w-12 translate-y-[-50%] cursor-pointer items-center justify-center rounded-lg md:rounded-xl bg-gray-400/40 hover:bg-gray-400/60 transition-colors bg-clip-padding backdrop-blur-sm backdrop-filter"
          >
            <ChevronLeft className="text-white drop-shadow-md" size={24} />
          </div>
          
          <div
            onClick={handleNext}
            className="navigation-item-right absolute right-2 md:right-6 top-[50%] z-20 flex h-10 w-10 md:h-12 md:w-12 translate-y-[-50%] cursor-pointer items-center justify-center rounded-lg md:rounded-xl bg-gray-400/40 hover:bg-gray-400/60 transition-colors bg-clip-padding backdrop-blur-sm backdrop-filter"
          >
            <ChevronRight className="text-white drop-shadow-md" size={24} />
          </div>
          
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute left-[50%] top-[10%] md:top-[15%] z-10 h-[80%] w-[60%] md:h-[70%] md:w-[45%] animate-fadeIn rounded-xl md:rounded-2xl bg-gray-500 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
              style={{
                willChange: "transform, filter",
                backgroundImage: `url(${item.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                transform:
                  index === 1
                    ? "translateX(-50%) scale(1.1)"
                    : index === 0
                      ? "translateX(-150%) rotate(-20deg)"
                      : "translateX(50%) rotate(20deg)",
                transition: "transform 0.5s ease-out, filter 0.5s ease-out",
                filter: index === 1 ? "none" : "blur(4px) brightness(0.6)",
                zIndex: index === 1 ? 3 : 1,
              }}
            >
              {/* View Image Overlay */}
              {index === 1 && (
                <div className="absolute inset-0 group">
                  <div 
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer" 
                    onClick={() => setLightboxIndex(item.id)}
                  >
                     <div className="bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs md:text-sm shadow-xl">
                       <Maximize2 size={16} /> View Image
                     </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / View Image Feature */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center backdrop-blur-xl p-4 md:p-12 cursor-pointer"
            onClick={() => setLightboxIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md z-50 shadow-xl"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
            >
              <X size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={initialItems.find(img => img.id === lightboxIndex)?.image} 
              className="w-auto h-auto max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-[0_0_100px_rgba(255,107,43,0.15)] cursor-default" 
              alt="Fullscreen View"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
