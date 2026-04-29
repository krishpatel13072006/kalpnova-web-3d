import React from 'react';
import ThumbnailShowcase from '../components/ThumbnailShowcase';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThumbnailShowcasePage = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <header className="w-full py-16 px-6 flex flex-col items-center justify-center text-center relative z-10 border-b border-white/5">
                <Link to="/portfolio/21" className="absolute top-8 left-8 flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors">
                    <ArrowLeft size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Back to Project</span>
                </Link>
                <h1 className="text-4xl md:text-5xl font-light tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-400 to-amber-200 mb-4 uppercase">
                    THUMBNAIL SHOWCASE
                </h1>
                <p className="text-neutral-400 max-w-2xl text-sm md:text-base font-light tracking-wide">
                    Realistic Adaptive Gallery & 3D Book Layout. <br/>
                    Showcasing high-converting thumbnail designs and strategies.
                </p>
            </header>

            <main>
                <ThumbnailShowcase />
            </main>

            <footer className="text-center py-12 text-neutral-600 text-sm tracking-widest border-t border-white/5">
                &copy; {new Date().getFullYear()} THUMBNAIL DESIGN SHOWCASE.
            </footer>
        </div>
    );
};

export default ThumbnailShowcasePage;
