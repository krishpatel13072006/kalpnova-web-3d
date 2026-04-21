import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CubeGallery from './CubeGallery';


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
// Animation
// ─────────────────────────────────────────────
const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

// ─────────────────────────────────────────────
// Shared tile renderer
// ─────────────────────────────────────────────
const renderTile = (src, extraClass = '', imgClass = 'object-contain') => (
  <motion.div
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    className={`relative flex items-center justify-center overflow-hidden w-full bg-transparent ${extraClass}`}
  >
    <img
      src={src}
      alt="Gallery Content"
      loading="lazy"
      // Default is object-contain to ensure the entire image scales to fit without cutting off the sides
      // Pass 'object-cover' for layouts that require filling the container (e.g., Maruti)
      className={`w-full h-full ${imgClass}`}
    />
  </motion.div>
);

// ─────────────────────────────────────────────
// Layout A — BENTO  (landscape images)
// ─────────────────────────────────────────────
// const renderBento = (items, rowIdx) => {
//   const chunks = [];
//   for (let i = 0; i < items.length; i += 3) chunks.push(items.slice(i, i + 3));

//   return (
//     <div className="space-y-[16px]">
//       {chunks.map((chunk, ci) => {
//         const n = chunk.length;
//         const flip = (rowIdx + ci) % 2 !== 0;

//         if (n === 1) return (
//           <div key={ci} className="w-full aspect-[16/9] overflow-hidden">
//             {renderTile(chunk[0].src, 'w-full h-full')}
//           </div>
//         );

//         if (n === 2) return (
//           <div
//             key={ci}
//             className="grid gap-[16px] aspect-[4/3] md:aspect-[21/9]"
//             style={{ gridTemplateColumns: flip ? '1fr 2fr' : '2fr 1fr' }}
//           >
//             {chunk.map((item, idx) => (
//               <div key={idx} className="overflow-hidden h-full w-full">
//                 {renderTile(item.src, 'w-full h-full')}
//               </div>
//             ))}
//           </div>
//         );

//         if (flip) {
//           return (
//             <div
//               key={ci}
//               className="grid gap-[12px] md:aspect-[22/8]"
//               style={{ gridTemplateColumns: '2fr 1fr', gridTemplateRows: '1fr 1fr' }}
//             >
//               <div className="row-span-2 overflow-hidden h-full w-full">
//                 {renderTile(chunk[0].src, 'w-full h-full')}
//               </div>
//               <div className="overflow-hidden h-full w-full aspect-video md:aspect-auto">
//                 {renderTile(chunk[1].src, 'w-full h-full')}
//               </div>
//               <div className="overflow-hidden h-full w-full aspect-video md:aspect-auto">
//                 {renderTile(chunk[2].src, 'w-full h-full')}
//               </div>
//             </div>
//           );
//         } else {
//           return (
//             <div key={ci} className="flex flex-col gap-[16px]">
//               <div className="w-full aspect-[16/9] overflow-hidden">
//                 {renderTile(chunk[0].src, 'w-full h-full')}
//               </div>
//               <div className="grid grid-cols-2 gap-[16px]">
//                 {[chunk[1], chunk[2]].map((item, idx) => item && (
//                   <div key={idx} className="aspect-[16/9] overflow-hidden">
//                     {renderTile(item.src, 'w-full h-full')}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         }
//       })}
//     </div>
//   );
// };
// ─────────────────────────────────────────────
// Layout A — BENTO  (landscape images)
// ─────────────────────────────────────────────
const renderBento = (items, rowIdx, imgClass) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += 3) chunks.push(items.slice(i, i + 3));

  return (
    <div className="space-y-[16px]">
      {chunks.map((chunk, ci) => {
        const n = chunk.length;
        const flip = (rowIdx + ci) % 2 !== 0;

        if (n === 1) return (
          <div key={ci} className="w-full aspect-[16/9] overflow-hidden">
            {renderTile(chunk[0].src, 'w-full h-full', imgClass)}
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
                {renderTile(item.src, 'w-full h-full', imgClass)}
              </div>
            ))}
          </div>
        );

        if (flip) {
          return (
            <div
              key={ci}
              // 1. Decreased gap from 12px to 6px
              className="grid gap-[6px] md:aspect-[22/8]"
              // 2. Increased left column size from 2fr to 2.8fr
              style={{ gridTemplateColumns: '2.8fr 1fr', gridTemplateRows: '1fr 1fr' }}
            >
              <div className="row-span-2 overflow-hidden h-full w-full">
                {renderTile(chunk[0].src, 'w-full h-full', imgClass)}
              </div>
              <div className="overflow-hidden h-full w-full aspect-video md:aspect-auto">
                {renderTile(chunk[1].src, 'w-full h-full', imgClass)}
              </div>
              <div className="overflow-hidden h-full w-full aspect-video md:aspect-auto">
                {renderTile(chunk[2].src, 'w-full h-full', imgClass)}
              </div>
            </div>
          );
        } else {
          return (
            <div key={ci} className="flex flex-col gap-[6px]"> {/* Decreased vertical gap here too */}
              <div className="w-full aspect-[16/9] overflow-hidden">
                {renderTile(chunk[0].src, 'w-full h-full', imgClass)}
              </div>
              <div className="grid grid-cols-2 gap-[6px]"> {/* Decreased horizontal gap */}
                {[chunk[1], chunk[2]].map((item, idx) => item && (
                  <div key={idx} className="aspect-[16/9] overflow-hidden">
                    {renderTile(item.src, 'w-full h-full', imgClass)}
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
// ─────────────────────────────────────────────
const renderDuo = (items, imgClass) => {
  const pairs = [];
  for (let i = 0; i < items.length; i += 2) pairs.push(items.slice(i, i + 2));

  return (
    <div className="space-y-[16px]">
      {pairs.map((pair, pi) => (
        <div key={pi} className="grid grid-cols-2 gap-[16px] items-start">
          {pair.map((item, idx) => (
            <div key={idx} className="overflow-hidden">
              {renderTile(item.src, 'w-full', imgClass)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// Layout C — MASONRY  (portrait images)
// ─────────────────────────────────────────────
const renderMasonry = (items, imgClass) => (
  <div
    className="columns-2 md:columns-3"
    style={{ columnGap: '16px' }}
  >
    {items.map((item, idx) => (
      <div key={idx} className="mb-[16px] break-inside-avoid overflow-hidden">
        {renderTile(item.src, 'h-auto', imgClass)}
      </div>
    ))}
  </div>
);

const renderMasonry2Col = (items) => (
  <div
    className="columns-2"
    style={{ columnGap: '16px' }}
  >
    {items.map((item, idx) => (
      <div key={idx} className="mb-[16px] break-inside-avoid overflow-hidden">
        {renderTile(item.src, 'h-auto')}
      </div>
    ))}
  </div>
);

const renderSchoolG = (items) => {
  return (
    <div
      className="columns-1 md:columns-3" // Changed from md:columns-2 lg:columns-3 to md:columns-3 to force 3 columns from tablet up
      style={{ columnGap: '12px' }} 
    >
      {items.map((item, idx) => (
        <div key={idx} className="break-inside-avoid overflow-hidden" style={{ marginBottom: '12px' }}> 
          {renderTile(item.src, 'h-auto w-full')}
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// Custom Layout — Maruti (No gap, no crop)
// ─────────────────────────────────────────────
const renderMaruti = (items) => {
  return (
    <div
      className="columns-1 md:columns-2"
      style={{ columnGap: '10px' }}
    >
      {items.map((item, idx) => (
        <div key={idx} className="break-inside-avoid overflow-hidden" style={{ marginBottom: '10px' }}>
          {renderTile(item.src, 'h-auto w-full', 'object-contain !h-auto')}
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// Custom Layout — Lotus Salon (3-column flex masonry)
// ─────────────────────────────────────────────
const renderLotusSalon = (items) => {
  // Mapping items to columns based on the provided layout
  const col1 = items.filter(item => item.src.includes('1 (')); // 1 (1) to 1 (5)
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
      {/* Column 1 */}
      <div className="flex flex-col gap-[20px] flex-1">
        {col1.map((item, idx) => (
          <div key={idx} className="overflow-hidden">
            {renderTile(item.src, 'w-full h-auto block rounded-[4px]')}
          </div>
        ))}
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-[20px] flex-1">
        {col2.map((item, idx) => (
          <div key={idx} className="overflow-hidden">
            {renderTile(item.src, 'w-full h-auto block rounded-[4px]')}
          </div>
        ))}
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-[20px] flex-1">
        {col3.map((item, idx) => (
          <div key={idx} className="overflow-hidden">
            {renderTile(item.src, 'w-full h-auto block rounded-[4px]')}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const GalleryMosaic = ({ images, layout = "auto" }) => {
  const [classified, setClassified] = useState([]);
  const [ready, setReady] = useState(false);

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

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10 mb-12 md:mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className={`text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-none ${textCol}`}>
              Case <span className={accent}>Study</span>
            </h2>
          </motion.div>
        </div>

        {/* Loading skeleton */}
        {!ready && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px] animate-pulse">
            {images.map((_, i) => (
              // REMOVED rounded-lg here
              <div key={i} className="aspect-[4/3] bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        )}

        {/* Rendered Layouts */}
        {ready && (
          <div className="space-y-[16px]">
            {layout === "krushak" ? (
              <>
                <div className="hidden lg:block">
                  <CubeGallery images={images} />
                </div>
                <div className="lg:hidden space-y-[16px]">
                  {rows.map((row, rowIdx) => (
                    <div key={rowIdx}>
                      {row.type === 'landscape' && renderBento(row.items, rowIdx)}
                      {row.type === 'square' && renderDuo(row.items)}
                      {row.type === 'portrait' && renderMasonry(row.items)}
                    </div>
                  ))}
                </div>
              </>
            ) : layout === "londoncoffee" ? (
              <div className="space-y-[16px]">
                {/* Standard grid for London Coffee */}
                {rows.map((row, rowIdx) => (
                  <div key={rowIdx}>
                    {row.type === 'landscape' && renderBento(row.items, rowIdx)}
                    {row.type === 'square' && renderDuo(row.items)}
                    {row.type === 'portrait' && renderMasonry(row.items)}
                  </div>
                ))}
              </div>
            ) : layout === "schoolg" ? ( 
              <div className="space-y-[16px]">
                {renderSchoolG(classified)}
              </div>
            ) : layout === "lotus-salon" ? (
              renderLotusSalon(classified)
            ) : layout === "maruti" ? (
              renderMaruti(classified)
            ) : layout === "2-col" ? (
              <div className="grid grid-cols-2 gap-[16px] items-start">
                {images.map((src, i) => (
                  // REMOVED rounded-2xl here
                  <div key={i} className="overflow-hidden">
                    {renderTile(src, 'w-full')}
                  </div>
                ))}
              </div>
            ) : layout === "masonry-2-col" ? (
              renderMasonry2Col(classified)
            ) : layout === "mobile-2-col-auto" ? (
              <>
                <div className="md:hidden grid grid-cols-2 gap-[16px] items-start">
                  {images.map((src, i) => (
                    // REMOVED rounded-2xl here
                    <div key={i} className="overflow-hidden">
                      {renderTile(src, 'w-full', 'object-cover')}
                    </div>
                  ))}
                </div>
                <div className="hidden md:block space-y-[16px]">
                  {rows.map((row, rowIdx) => (
                    <div key={rowIdx}>
                      {row.type === 'landscape' && renderBento(row.items, rowIdx, 'object-cover')}
                      {row.type === 'square' && renderDuo(row.items, 'object-cover')}
                      {row.type === 'portrait' && renderMasonry(row.items, 'object-cover')}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              rows.map((row, rowIdx) => (
                <div key={rowIdx}>
                  {row.type === 'landscape' && renderBento(row.items, rowIdx)}
                  {row.type === 'square' && renderDuo(row.items)}
                  {row.type === 'portrait' && renderMasonry(row.items)}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryMosaic;
