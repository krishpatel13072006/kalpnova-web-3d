import React, { useEffect, useState, useRef } from 'react';
import './InteractiveShowcase.css';

const ThumbnailShowcase = () => {
    const bookRef = useRef(null);
    const [currentSpread, setCurrentSpread] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    // Utilizing all available thumbnail assets
    const allThumbnails = [
        '/clients/thumbnail/1.webp',
        '/clients/thumbnail/2.webp',
        '/clients/thumbnail/71.webp',
        '/clients/thumbnail/72.webp',
        '/clients/thumbnail/73.webp',
        '/clients/thumbnail/81.webp',
        '/clients/thumbnail/82.webp',
        '/clients/thumbnail/84.webp',
        '/clients/thumbnail/103.webp',
        '/clients/thumbnail/136.webp',
        '/clients/thumbnail/Blue and Grey Simple Travel Youtube Thumbnail.webp',
        '/clients/thumbnail/Dark Green and Yellow Simple ASMR Solo Camping Youtube Thumbnail.webp',
        '/clients/thumbnail/PM MODI AT CHHATISHGHAR.webp',
        '/clients/thumbnail/PM Modi roadshow in Jabalpur.webp',
        '/clients/thumbnail/Pm Modi Tamilnadu Road Show.webp',
        '/clients/thumbnail/Raiganj Roadshow.webp',
        '/clients/thumbnail/ram navmi 2024.webp'
    ];

    const bookImages = allThumbnails.slice(0, 7); // First 7 for the 3D book
    const gridImages = allThumbnails.slice(7); // Remaining 10 for the grid boxes

    const boxes = [
        { type: 'crossfade', imgs: [gridImages[0], gridImages[1], gridImages[2]] },
        { type: 'infinite-scroll', imgs: [gridImages[3], gridImages[4], gridImages[5], gridImages[6]] },
        { type: 'slide-lr', imgs: [gridImages[7], gridImages[8], gridImages[9]] },
        { type: 'ken-burns', imgs: [gridImages[0], gridImages[4], gridImages[8]] },
        { type: 'slide-rl', imgs: [gridImages[1], gridImages[5], gridImages[9]] },
        { type: 'slide-tb', imgs: [gridImages[2], gridImages[6], gridImages[3]] },
        { type: 'slide-bt', imgs: [gridImages[7], gridImages[0], gridImages[5]] },
        { type: 'zoom-pulse', imgs: [gridImages[9], gridImages[3], gridImages[7]] }
    ];

    const N = bookImages.length;
    const [flippedStates, setFlippedStates] = useState(new Array(N - 1).fill(false));
    const [zIndices, setZIndices] = useState(new Array(N - 1).fill(0).map((_, i) => N - i));
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSpread();
        }, 4500);
        return () => clearInterval(interval);
    }, [currentSpread]);

    const nextSpread = () => {
        setIsFlipping(true);

        if (currentSpread < N - 1) {
            // Flip the current sheet
            setFlippedStates(prev => {
                const next = [...prev];
                next[currentSpread] = true;
                return next;
            });

            // Halfway through rotation (900ms of 1.8s), swap Z-index
            setTimeout(() => {
                setZIndices(prev => {
                    const next = [...prev];
                    next[currentSpread] = currentSpread + 1;
                    return next;
                });
            }, 900);

            // End flipping state after 1.8s
            setTimeout(() => {
                setIsFlipping(false);
            }, 1800);

            setCurrentSpread(prev => prev + 1);
        } else {
            // Loop reached end. Instantly snap back to start.
            setTransitionEnabled(false);
            setFlippedStates(new Array(N - 1).fill(false));
            setZIndices(new Array(N - 1).fill(0).map((_, i) => N - i));
            setCurrentSpread(0);
            setIsFlipping(false);

            // Re-enable transitions on next tick
            setTimeout(() => {
                setTransitionEnabled(true);
            }, 50);
        }
    };

    const renderGalleryBox = (box, index) => {
        if (box.type === 'infinite-scroll') {
            const scrollImgs = [...box.imgs, ...box.imgs]; // double for seamless infinite loop
            return (
                <div key={index} className={`gallery-box ${box.type}`}>
                    <div className="animate-scroll">
                        {scrollImgs.map((imgUrl, i) => (
                            <div key={i} className="scroll-item" style={{ '--bg-img': `url(${imgUrl})` }}>
                                <img src={imgUrl} alt="thumbnail" className="content-img" />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div key={index} className={`gallery-box ${box.type}`}>
                {box.imgs.map((imgUrl, i) => (
                    <div 
                        key={i} 
                        className={`anim-slide delay-${i * 3}`} 
                        style={{ '--bg-img': `url(${imgUrl})`, animationPlayState: 'running' }}
                    >
                        <img src={imgUrl} alt="thumbnail" className="content-img" />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full bg-[#050505] text-neutral-200 font-sans selection:bg-amber-500 selection:text-neutral-900">
            {/* Top Grid */}
            <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {boxes.slice(0, 4).map((box, i) => renderGalleryBox(box, i))}
                </div>
            </section>

            {/* 3D Book Section */}
            <section className="w-full relative overflow-hidden flex flex-col items-center border-y border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,1)] bg-[#050505]">
                <div className="text-center mt-12 mb-4 relative z-10">
                    <h2 className="text-2xl tracking-widest text-amber-500 font-light uppercase">The Showcase</h2>
                    <p className="text-neutral-500 text-sm mt-2 max-w-xl mx-auto px-4">
                        Continuous Multi-Spread 3D Visualization of Thumbnails
                    </p>
                </div>

                <div className="book-scene">
                    <div ref={bookRef} className={`book ${isFlipping ? 'is-flipping' : ''}`}>
                        <div className="spine-overlay"></div>
                        
                        {/* Base Left Page */}
                        <div 
                            className="absolute top-0 left-0 w-1/2 h-full rounded-l-[8px] z-0 bg-cover"
                            style={{ backgroundImage: `url(${bookImages[0]})`, backgroundPosition: 'left center', backgroundSize: '200% 100%' }}
                        />

                        {/* Base Right Page */}
                        <div 
                            className="absolute top-0 right-0 w-1/2 h-full rounded-r-[8px] z-0 bg-cover"
                            style={{ backgroundImage: `url(${bookImages[N-1]})`, backgroundPosition: 'right center', backgroundSize: '200% 100%' }}
                        />

                        {/* Flipping Sheets */}
                        {Array.from({ length: N - 1 }).map((_, i) => (
                            <div 
                                key={i}
                                className={`book-sheet ${flippedStates[i] ? 'flipped' : ''}`}
                                style={{ 
                                    zIndex: zIndices[i],
                                    transition: transitionEnabled ? '' : 'none'
                                }}
                            >
                                <div 
                                    className="book-face front"
                                    style={{ 
                                        backgroundImage: `url(${bookImages[i]})`,
                                        transition: transitionEnabled ? '' : 'none'
                                    }}
                                />
                                <div 
                                    className="book-face back"
                                    style={{ 
                                        backgroundImage: `url(${bookImages[i+1]})`,
                                        transition: transitionEnabled ? '' : 'none'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Grid */}
            <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {boxes.slice(4, 8).map((box, i) => renderGalleryBox(box, i + 4))}
                </div>
            </section>
        </div>
    );
};

export default ThumbnailShowcase;
