import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Footer = () => {
    return (
        <footer className="max-w-7xl mx-auto px-4 md:px-0 py-12 border-t-2 border-zinc-800/20 mt-12 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-zinc-500 text-xs gap-4 font-bold uppercase tracking-widest">
                <div className="font-display">
                    {portfolioData.footer.copyright}
                </div>

                <div className="flex gap-8">
                    <a className="hover:text-retro-orange transition-colors" href="#projects">Works</a>
                    <a className="hover:text-retro-orange transition-colors" href="#about">About</a>
                    <a className="hover:text-retro-orange transition-colors" href="#contact">Contact</a>
                    <a className="hover:text-retro-orange transition-colors" href={portfolioData.personal.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>

                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-retro-charcoal">AVAILABLE FOR WORK</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
