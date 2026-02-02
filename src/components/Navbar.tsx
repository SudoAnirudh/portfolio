import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-6 focus:py-3 focus:font-bold focus:shadow-xl focus:ring-2 focus:ring-accent rounded-sm"
            >
                Skip to content
            </a>
            <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="font-semibold tracking-tight text-xl">{portfolioData.personal.name}</span>
                </div>
                <div className="hidden md:flex items-center space-x-10 text-[13px] font-medium tracking-widest uppercase">
                    <a className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm" href="#">Home</a>
                    <a className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm" href="#about">About</a>
                    <a className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm" href="#experience">Experience</a>
                    <a className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm" href="#projects">Work</a>
                    <a className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm" href="#contact">Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
