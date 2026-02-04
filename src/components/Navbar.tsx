"use client";
import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Navbar = () => {
    const [scrollProgress, setScrollProgress] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <div className="absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }}></div>
        </nav>
    );
};

export default Navbar;
