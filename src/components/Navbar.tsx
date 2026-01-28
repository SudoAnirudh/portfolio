import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="font-semibold tracking-tight text-xl">{portfolioData.personal.name}</span>
                </div>
                <div className="hidden md:flex items-center space-x-10 text-[13px] font-medium tracking-widest uppercase">
                    <a className="hover:text-accent transition-colors" href="#">Home</a>
                    <a className="hover:text-accent transition-colors" href="#about">About</a>
                    <a className="hover:text-accent transition-colors" href="#experience">Experience</a>
                    <a className="hover:text-accent transition-colors" href="#projects">Work</a>
                    <a className="hover:text-accent transition-colors" href="#contact">Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
