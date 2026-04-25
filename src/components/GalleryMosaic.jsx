import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// Mocked theme context to ensure successful standalone compilation
const useTheme = () => ({ isLight: false });

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const classifyRatio = (w, h) => {
  const r = w / h;
  if (r > 1.35) return 'landscape';
  if (r < 0.78) return 'portrait';
  return 'square';
};

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
// Shared Animation
// ─────────────────────────────────────────────
const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const GalleryMosaic = ({ images, layout = "auto" }) => {
  const [classified, setClassified] = useState([]);
  const [ready, setReady] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  // Helper to open/close lightbox
  const openLightbox = (src) => setSelectedImg(src);
  const closeLightbox = () => setSelectedImg(null);

  // Tile renderer with click capability
  const renderTileWithClick = (src, extraClass = '', imgClass = 'object-contain', onImageClick) => (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '50px' }}
      className={`relative flex items-center justify-center overflow-hidden w-full bg-transparent cursor-pointer will-change-transform ${extraClass}`}
      onClick={() => (onImageClick ? onImageClick(src) : openLightbox(src))}
    >
      <img
        src={src}
        alt="Gallery Content"
        loading="lazy"
        className={`w-full h-full ${imgClass}`}
      />
    </motion.div>
  );

  // ─────────────────────────────────────────────
  // Layout Renderers (Moved inside component scope)
  // ─────────────────────────────────────────────

  const renderBento = (items, rowIdx, imgClass, onImageClick) => {
    const chunks = [];
    for (let i = 0; i < items.length; i += 3) chunks.push(items.slice(i, i + 3));

    return (
      <div className="space-y-[16px]">
        {chunks.map((chunk, ci) => {
          const n = chunk.length;
          const flip = (rowIdx + ci) % 2 !== 0;

          if (n === 1) return (
            <div key={ci} className="w-full aspect-[16/9] overflow-hidden">
              {renderTileWithClick(chunk[0].src, 'w-full h-full', imgClass, onImageClick)}
            </div>
          );

          if (n === 2) return (
            <div
              key={ci}
              className="grid gap-[16px] aspect-[4/3] md:aspect-[21/9]"
              style={{ gridTemplateColumns: flip ? '1fr 2.8fr' : '2.8fr 1fr' }}
            >
              {chunk.map((item, idx) => (
                <div key={idx} className="overflow-hidden h-full w-full">
                  {renderTileWithClick(item.src, 'w-full h-full', imgClass, onImageClick)}
                </div>
              ))}
            </div>
          );

          if (flip) {
            return (
              <div
                key={ci}
                className="grid gap-[6px] md:aspect-[22/8]"
                style={{ gridTemplateColumns: '2.8fr 1fr', gridTemplateRows: '1fr 1fr' }}
              >
                <div className="row-span-2 overflow-hidden h-full w-full">
                  {renderTileWithClick(chunk[0].src, 'w-full h-full', imgClass, onImageClick)}
                </div>
                <div className="overflow-hidden h-full w-full aspect-video md:aspect-auto">
                  {renderTileWithClick(chunk[1].src, 'w-full h-full', imgClass, onImageClick)}
                </div>
                <div className="overflow-hidden h-full w-full aspect-video md:aspect-auto">
                  {renderTileWithClick(chunk[2].src, 'w-full h-full', imgClass, onImageClick)}
                </div>
              </div>
            );
          } else {
            return (
              <div key={ci} className="flex flex-col gap-[6px]">
                <div className="w-full aspect-[16/9] overflow-hidden">
                  {renderTileWithClick(chunk[0].src, 'w-full h-full', imgClass, onImageClick)}
                </div>
                <div className="grid grid-cols-2 gap-[6px]">
                  {[chunk[1], chunk[2]].map((item, idx) => item && (
                    <div key={idx} className="aspect-[16/9] overflow-hidden">
                      {renderTileWithClick(item.src, 'w-full h-full', imgClass, onImageClick)}
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

  const renderDuo = (items, imgClass, onImageClick) => {
    const pairs = [];
    for (let i = 0; i < items.length; i += 2) pairs.push(items.slice(i, i + 2));

    return (
      <div className="space-y-[16px]">
        {pairs.map((pair, pi) => (
          <div key={pi} className="grid grid-cols-2 gap-[16px] items-start">
            {pair.map((item, idx) => (
              <div key={idx} className="overflow-hidden">
                {renderTileWithClick(item.src, 'w-full', imgClass, onImageClick)}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderMasonry = (items, imgClass, onImageClick) => (
    <div
      className="columns-2 md:columns-3"
      style={{ columnGap: '16px' }}
    >
      {items.map((item, idx) => (
        <div key={idx} className="mb-[16px] break-inside-avoid overflow-hidden">
          {renderTileWithClick(item.src, 'h-auto', imgClass, onImageClick)}
        </div>
      ))}
    </div>
  );

  const renderMasonry2Col = (items, onImageClick) => (
    <div
      className="columns-2"
      style={{ columnGap: '16px' }}
    >
      {items.map((item, idx) => (
        <div key={idx} className="mb-[16px] break-inside-avoid overflow-hidden">
          {renderTileWithClick(item.src, 'h-auto', 'object-contain', onImageClick)}
        </div>
      ))}
    </div>
  );

  const renderSchoolG = (items, onImageClick) => {
    return (
      <div
        className="columns-1 md:columns-3" 
        style={{ columnGap: '12px' }} 
      >
        {items.map((item, idx) => (
          <div key={idx} className="break-inside-avoid overflow-hidden" style={{ marginBottom: '12px' }}> 
            {renderTileWithClick(item.src, 'h-auto w-full', 'object-contain', onImageClick)}
          </div>
        ))}
      </div>
    );
  };

  const renderMaruti = (items, onImageClick) => {
    return (
      <div
        className="columns-1 md:columns-2"
        style={{ columnGap: '10px' }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="break-inside-avoid overflow-hidden" style={{ marginBottom: '10px' }}>
            {renderTileWithClick(item.src, 'h-auto w-full', 'object-contain !h-auto', onImageClick)}
          </div>
        ))}
      </div>
    );
  };

  const renderZeroGrid = (items, columns = "columns-1 md:columns-2", imgClass = "object-contain !h-auto", onImageClick) => {
    return (
      <div
        className={columns}
        style={{ columnGap: '16px' }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="break-inside-avoid overflow-hidden" style={{ marginBottom: '16px' }}>
            {renderTileWithClick(item.src, 'h-auto w-full', imgClass, onImageClick)}
          </div>
        ))}
      </div>
    );
  };

  const renderAMCGrid = (items, onImageClick) => {
    const reordered = [...items];
    if (reordered.length === 5) {
      const last = reordered.pop();
      reordered.splice(2, 0, last);
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        {reordered.map((item, idx) => {
          const isFullWidth = reordered.length === 5 && idx === 2;
          return (
            <div key={idx} className={`overflow-hidden ${isFullWidth ? 'md:col-span-2' : ''}`}>
              {renderTileWithClick(item.src, 'w-full h-auto', 'object-contain !h-auto', onImageClick)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderInvitationGrid = (items) => {
    const layoutConfig = [
      { name: '1 (8)', span: 'col-span-1', aspect: 'aspect-[3/4]' },
      { name: '1 (11)', span: 'col-span-1', aspect: 'aspect-[3/4]' },
      { name: '1-1.png', span: 'col-span-1', aspect: 'aspect-[3/4]' },
      { name: '1-2.png', span: 'col-span-1', aspect: 'aspect-[3/4]' },
      { name: '1 (9)-optimized', span: 'md:col-span-2', aspect: 'aspect-[3/2]' },
      { name: '1 (10)', span: 'md:col-span-2', aspect: 'aspect-[3/2]' },
      { name: '1-3.png', span: 'col-span-1', aspect: 'aspect-[3/4]' },
      { name: '1-4.png', span: 'col-span-1', aspect: 'aspect-[3/4]' },
      { name: '1-5.png', span: 'col-span-1', aspect: 'aspect-[3/4]' },
      { name: '1 (6)', span: 'col-span-1', aspect: 'aspect-[3/4]' },
      { name: '1 (7)', span: 'col-span-1', aspect: 'aspect-[3/4]' },
    ];

    const orderedItems = [];
    layoutConfig.forEach(config => {
      const found = items.find(it => it.src.includes(config.name));
      if (found) orderedItems.push({ ...found, ...config });
    });

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-screen-2xl mx-auto">
        {orderedItems.map((item, idx) => (
          <div 
            key={idx} 
            className={`overflow-hidden rounded-lg shadow-lg group cursor-pointer relative ${item.span} ${item.aspect}`}
            onClick={() => openLightbox(item.src)}
          >
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
              </svg>
            </div>
            <img
              src={item.src}
              alt="Gallery Content"
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        ))}
      </div>
    );
  };

  const renderKrushakGrid = (items, onImageClick) => (
    <div
      className="columns-1 sm:columns-2 lg:columns-3"
      style={{ columnGap: '16px' }}
    >
      {items.map((item, idx) => (
        <div 
          key={idx} 
          className="mb-[16px] break-inside-avoid cursor-pointer group"
          onClick={() => onImageClick(item.src)}
        >
          <img
            src={item.src}
            alt="Krushak Gallery Content"
            loading="lazy"
            className="w-full h-auto block hover:scale-[1.01] transition-transform duration-500 rounded-sm"
          />
        </div>
      ))}
    </div>
  );

  const renderLioncut = (items, onImageClick) => (
    <div
      className="columns-1 md:columns-2 lg:columns-3"
      style={{ columnGap: '12px' }}
    >
      {items.map((item, idx) => (
        <div 
          key={idx} 
          className="break-inside-avoid cursor-pointer mb-[12px]"
          onClick={() => onImageClick(item.src)}
        >
          <img
            src={item.src}
            alt="Lioncut Gallery Content"
            loading="lazy"
            className="w-full h-auto block"
          />
        </div>
      ))}
    </div>
  );

  const renderLotusSalon = (items, onImageClick) => {
    const col1 = items.filter(item => item.src.includes('1 (')); 
    const col2 = items.filter(item =>
      item.src.endsWith('/1.jpg') ||
      item.src.endsWith('/2.jpg') ||
      item.src.endsWith('/3.jpg')
    );
    const col3 = items.filter(item =>
      item.src.endsWith('/4.jpg') ||
      item.src.endsWith('/5.jpg') ||
      item.src.endsWith('/6.jpg')
    );

    return (
      <div className="flex flex-col md:flex-row gap-[20px] w-full max-w-[1800px] mx-auto">
        <div className="flex flex-col gap-[20px] flex-1">
          {col1.map((item, idx) => (
            <div key={idx} className="overflow-hidden">
              {renderTileWithClick(item.src, 'w-full h-auto block rounded-[4px]', 'object-contain', onImageClick)}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[20px] flex-1">
          {col2.map((item, idx) => (
            <div key={idx} className="overflow-hidden">
              {renderTileWithClick(item.src, 'w-full h-auto block rounded-[4px]', 'object-contain', onImageClick)}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[20px] flex-1">
          {col3.map((item, idx) => (
            <div key={idx} className="overflow-hidden">
              {renderTileWithClick(item.src, 'w-full h-auto block rounded-[4px]', 'object-contain', onImageClick)}
            </div>
          ))}
        </div>
      </div>
    );
  };
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
        results[i] = { src, type: 'square' };
        finish();
      };
      img.src = src;
    });
  }, [images]);

  const rows = ready ? toRows(classified) : [];

  const textCol = 'text-white';
  const accent = 'text-[#ff6b2b]';

  if (!images?.length) return null;

  return (
    <section className="pt-16 md:pt-24 pb-8 md:pb-12 bg-[#0b0b0b] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">



        {!ready && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px] animate-pulse">
            {images.map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        )}

        {ready && (
          <div className="space-y-[16px]">
            {layout === "krushak" ? (
              renderKrushakGrid(classified, openLightbox)
            ) : layout === "lioncut" ? (
              renderLioncut(classified, openLightbox)
            ) : layout === "invitation" ? (
              renderInvitationGrid(classified)
            ) : layout === "amc" ? (
              renderAMCGrid(classified, openLightbox)
            ) : layout === "maruti" ? (
              renderMaruti(classified, openLightbox)
            ) : layout === "lotus-salon" ? (
              renderLotusSalon(classified, openLightbox)
            ) : layout === "schoolg" ? (
              renderSchoolG(classified, openLightbox)
            ) : (
              rows.map((row, rowIdx) => (
                <div key={rowIdx}>
                  {row.type === 'landscape' && renderBento(row.items, rowIdx, 'object-contain', openLightbox)}
                  {row.type === 'square' && renderDuo(row.items, 'object-contain', openLightbox)}
                  {row.type === 'portrait' && renderMasonry(row.items, 'object-contain', openLightbox)}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-[10000]"
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImg} 
                alt="Fullscreen view" 
                className="max-w-[95vw] max-h-[90vh] object-contain rounded-sm shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryMosaic;
