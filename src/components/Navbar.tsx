"use client";
import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Navbar = () => {
    const [scrollProgress, setScrollProgress] = React.useState(0);
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

    React.useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        localStorage.setItem('portfolio-theme', nextTheme);
        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    React.useEffect(() => {
        let ticking = false;
        let animationFrameId: number | null = null;
        const handleScroll = () => {
            if (!ticking) {
                animationFrameId = window.requestAnimationFrame(() => {
                    const totalScroll = document.documentElement.scrollTop;
                    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scroll = `${totalScroll / windowHeight}`;
                    setScrollProgress(Number(scroll));
                    ticking = false;
                });
                ticking = true;
            }
        }

        // PERFORMANCE: Throttled scroll listener using requestAnimationFrame and { passive: true } to prevent main thread blocking during high-frequency events.
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-zinc-900/90 dark:text-white backdrop-blur-sm border-b border-gray-200 dark:border-zinc-800 transition-colors">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-6 focus:py-3 focus:font-bold focus:shadow-xl focus:ring-2 focus:ring-accent rounded-sm"
            >
                Skip to content
            </a>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
                <div className="flex items-center">
                    <span className="font-semibold tracking-tight text-base sm:text-xl font-display uppercase">{portfolioData.personal.name}</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center space-x-8 text-[13px] font-medium tracking-widest uppercase">
                        <a className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm" href="#">Home</a>
                        <a className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm" href="#about">About</a>
                        <a className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm" href="#experience">Experience</a>
                        <a className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm" href="#projects">Work</a>
                        <a className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm" href="#contact">Contact</a>
                    </div>
                    
                    {/* Retro Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Light/Dark Theme"
                        title={`Switch to ${theme === 'light' ? 'Retro Dark' : 'Retro Light'} theme`}
                        className="px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-2 border-black dark:border-zinc-700 rounded-lg text-xs font-pixel uppercase font-bold tracking-wider hover:bg-retro-yellow dark:hover:bg-amber-400 hover:text-black transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-base">
                            {theme === 'light' ? 'dark_mode' : 'light_mode'}
                        </span>
                        <span className="hidden sm:inline">{theme === 'light' ? 'Retro Dark' : 'Retro Light'}</span>
                    </button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 h-[2px] bg-black dark:bg-retro-yellow transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }}></div>
        </nav>
    );
};

export default Navbar;
