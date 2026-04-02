import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { X, Expand } from 'lucide-react';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Classify an image by aspect ratio */
const classifyRatio = (w, h) => {
  const r = w / h;
  if (r > 1.35) return 'landscape'; // wider than 4:3 → Bento
  if (r < 0.78) return 'portrait';  // taller than 4:5 → Masonry
  return 'square';                   // everything else → Duo
};

/** Group consecutive items of the same type into runs */
const toRows = (list) => {
  const rows = [];
  let i = 0;
  while (i < list.length) {
    const type = list[i].type;
    const batch = [];
    while (i < list.length && list[i].type === type) batch.push(list[i++]);
    rows.push({ type, items: batch });
  }
  return rows;
};

// ─────────────────────────────────────────────
// Animation
// ─────────────────────────────────────────────
const fadeIn = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

// ─────────────────────────────────────────────
// Shared tile renderer (function, not component)
// ─────────────────────────────────────────────
const makeTile = (cardBg, onOpen) => (src, extraClass = '') => (
  <motion.div
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    onClick={() => onOpen(src)}
    className={`relative overflow-hidden group cursor-zoom-in ${cardBg} ${extraClass}`}
  >
    <img
      src={src}
      alt=""
      loading="lazy"
      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    />
    {/* Hover overlay */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center pointer-events-none">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
        <Expand size={20} className="text-white" />
      </div>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────
// Layout A — BENTO  (landscape images)
// Alternates between two patterns every chunk:
//   Even:  [full-width hero] + [duo below]
//   Odd:   [big left 2fr | 2 stacked right 1fr]
// ─────────────────────────────────────────────
const renderBento = (items, rowIdx, Tile) => {
  // Split into chunks of 3
  const chunks = [];
  for (let i = 0; i < items.length; i += 3) chunks.push(items.slice(i, i + 3));

  return (
    <div className="space-y-3 md:space-y-4">
      {chunks.map((chunk, ci) => {
        const n = chunk.length;
        const flip = (rowIdx + ci) % 2 !== 0;

        /* ── 1 image ── */
        if (n === 1) return (
          <div key={ci} className="w-full aspect-[21/9] rounded-2xl md:rounded-[2.5rem] overflow-hidden">
            {Tile(chunk[0].src, 'w-full h-full rounded-2xl md:rounded-[2.5rem]')}
          </div>
        );

        /* ── 2 images ── asymmetric 2fr/1fr */
        if (n === 2) return (
          <div
            key={ci}
            className="grid gap-3 md:gap-4 h-[240px] md:h-[400px]"
            style={{ gridTemplateColumns: flip ? '1fr 2fr' : '2fr 1fr' }}
          >
            {chunk.map((item, idx) => (
              <div key={idx} className="rounded-2xl md:rounded-[2.5rem] overflow-hidden h-full">
                {Tile(item.src, 'w-full h-full rounded-2xl md:rounded-[2.5rem]')}
              </div>
            ))}
          </div>
        );

        /* ── 3 images ── two alternating bento patterns */
        if (flip) {
          // BIG left (2fr) | 2 stacked right (1fr)
          return (
            <div
              key={ci}
              className="grid gap-3 md:gap-4 h-[300px] md:h-[520px]"
              style={{ gridTemplateColumns: '2fr 1fr', gridTemplateRows: '1fr 1fr' }}
            >
              <div className="row-span-2 rounded-2xl md:rounded-[2.5rem] overflow-hidden">
                {Tile(chunk[0].src, 'w-full h-full rounded-2xl md:rounded-[2.5rem]')}
              </div>
              <div className="rounded-2xl md:rounded-[2.5rem] overflow-hidden">
                {Tile(chunk[1].src, 'w-full h-full rounded-2xl md:rounded-[2.5rem]')}
              </div>
              <div className="rounded-2xl md:rounded-[2.5rem] overflow-hidden">
                {Tile(chunk[2].src, 'w-full h-full rounded-2xl md:rounded-[2.5rem]')}
              </div>
            </div>
          );
        } else {
          // Full-width hero on top + duo below
          return (
            <div key={ci} className="flex flex-col gap-3 md:gap-4">
              <div className="w-full aspect-[21/9] rounded-2xl md:rounded-[2.5rem] overflow-hidden">
                {Tile(chunk[0].src, 'w-full h-full rounded-2xl md:rounded-[2.5rem]')}
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[chunk[1], chunk[2]].map((item, idx) => item && (
                  <div key={idx} className="aspect-[4/3] rounded-2xl md:rounded-[2.5rem] overflow-hidden">
                    {Tile(item.src, 'w-full h-full rounded-2xl md:rounded-[2.5rem]')}
                  </div>
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

// ─────────────────────────────────────────────
// Layout B — DUO  (square images)
// Pairs of 2 in an equal 2-column grid
// ─────────────────────────────────────────────
const renderDuo = (items, Tile) => {
  const pairs = [];
  for (let i = 0; i < items.length; i += 2) pairs.push(items.slice(i, i + 2));

  return (
    <div className="space-y-3 md:space-y-4">
      {pairs.map((pair, pi) => (
        <div key={pi} className="grid grid-cols-2 gap-3 md:gap-4">
          {pair.map((item, idx) => (
            <div key={idx} className="aspect-square rounded-2xl md:rounded-[2.5rem] overflow-hidden">
              {Tile(item.src, 'w-full h-full rounded-2xl md:rounded-[2.5rem]')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// Layout C — MASONRY  (portrait images)
// CSS columns — images flow naturally by height
// ─────────────────────────────────────────────
const renderMasonry = (items, cardBg, onOpen) => (
  <div
    className="columns-2 md:columns-3"
    style={{ columnGap: '0.75rem' }}
  >
    {items.map((item, idx) => (
      <motion.div
        key={idx}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        onClick={() => onOpen(item.src)}
        className={`break-inside-avoid mb-3 md:mb-4 relative overflow-hidden group cursor-zoom-in rounded-2xl md:rounded-[2.5rem] ${cardBg}`}
      >
        <img
          src={item.src}
          alt=""
          loading="lazy"
          className="w-full h-auto block object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
            <Expand size={18} className="text-white" />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const GalleryMosaic = ({ images }) => {
  const { isLight } = useTheme();
  const [lightbox, setLightbox]   = useState(null);
  const [classified, setClassified] = useState([]);
  const [ready, setReady]         = useState(false);

  // ── Measure each image's natural dimensions
  useEffect(() => {
    if (!images?.length) return;
    setReady(false);
    const results = new Array(images.length).fill(null);
    let done = 0;

    const finish = () => {
      done++;
      if (done === images.length) {
        setClassified(results);
        setReady(true);
      }
    };

    images.forEach((src, i) => {
      const img = new window.Image();
      img.onload = () => {
        results[i] = { src, type: classifyRatio(img.naturalWidth, img.naturalHeight) };
        finish();
      };
      img.onerror = () => {
        results[i] = { src, type: 'square' }; // safe fallback
        finish();
      };
      img.src = src;
    });
  }, [images]);

  const openLightbox = useCallback((src) => setLightbox(src), []);
  const rows = ready ? toRows(classified) : [];

  // Theme
  const dark    = !isLight;
  const cardBg  = dark ? 'bg-[#111]' : 'bg-zinc-100';
  const textCol = dark ? 'text-white' : 'text-black';
  const accent  = dark ? 'text-[#ff6b2b]' : 'text-[#e31e24]';
  const sub     = dark ? 'text-gray-500' : 'text-zinc-500';

  // Build the Tile renderer once per open-lightbox reference
  const Tile = makeTile(cardBg, openLightbox);

  if (!images?.length) return null;

  return (
    <>
      {/* ── LIGHTBOX OVERLAY ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-md p-8 md:p-16"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </button>
            <motion.img
              src={lightbox}
              alt="Full view"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[82vw] max-h-[78vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GALLERY SECTION ── */}
      <section className={`py-16 md:py-24 ${dark ? 'bg-[#0b0b0b]' : 'bg-white'} overflow-hidden`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10 mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-none ${textCol}`}>
                Case <span className={accent}>Study</span>
              </h2>
            </motion.div>
            <div className="max-w-xs md:text-right">
              <p className={`text-xs md:text-sm font-bold uppercase tracking-[0.3em] leading-relaxed ${sub}`}>
                Visual Narratives &<br />Product Excellence
              </p>
            </div>
          </div>

          {/* Loading skeleton */}
          {!ready && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
              {images.map((_, i) => (
                <div key={i} className={`aspect-[4/3] rounded-2xl ${cardBg}`} />
              ))}
            </div>
          )}

          {/* ── Adaptive rows ── */}
          {ready && (
            <div className="space-y-4 md:space-y-5">
              {rows.map((row, rowIdx) => (
                <div key={rowIdx}>
                  {/* Layout A: Bento — landscape */}
                  {row.type === 'landscape' && renderBento(row.items, rowIdx, Tile)}

                  {/* Layout B: Duo — square */}
                  {row.type === 'square' && renderDuo(row.items, Tile)}

                  {/* Layout C: Masonry — portrait */}
                  {row.type === 'portrait' && renderMasonry(row.items, cardBg, openLightbox)}
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default GalleryMosaic;
