import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Footer = () => {
    return (
        <footer className="py-16 px-8 section-border bg-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                <div className="text-[11px] tracking-widest text-muted uppercase font-medium">
                    {portfolioData.footer.copyright}
                </div>
                <div className="flex space-x-12">
                    <a className="text-[11px] tracking-widest text-muted uppercase font-bold hover:text-black transition-colors" href={portfolioData.personal.social.github} target="_blank">GitHub</a>
                    <a className="text-[11px] tracking-widest text-muted uppercase font-bold hover:text-black transition-colors" href={portfolioData.personal.social.linkedin} target="_blank">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
