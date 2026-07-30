"use client";
import React from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="max-w-7xl mx-auto px-3 sm:px-4 md:px-0 mt-16 mb-10">
            {/* Top Chrome Header Bar */}
            <div className="bg-zinc-200 bento-card rounded-t-2xl border-4 border-black border-b-0 p-3 sm:p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="font-pixel text-[11px] sm:text-xs uppercase tracking-wider font-bold text-zinc-800">
                        SYSTEM OPERATIONAL // OPEN FOR FULL-TIME ROLES
                    </span>
                </div>

                <button
                    onClick={scrollToTop}
                    className="font-pixel text-[11px] sm:text-xs uppercase tracking-wider font-bold bg-white hover:bg-black hover:text-white transition-all px-3 py-1 rounded border-2 border-black flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                    <span>RETURN TO TOP</span>
                    <span className="material-symbols-outlined text-sm">arrow_upward</span>
                </button>
            </div>

            {/* Main Bento Body */}
            <div className="bg-retro-cream border-4 border-black rounded-b-2xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Column 1: Identity & Brand (5 Cols) */}
                <div className="md:col-span-5 space-y-4">
                    <div className="space-y-1">
                        <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-retro-charcoal">
                            {portfolioData.personal.name}
                        </h2>
                        <div className="font-pixel text-xs sm:text-sm uppercase tracking-widest text-retro-orange font-bold">
                            {portfolioData.personal.role}
                        </div>
                    </div>

                    <p className="font-body text-xs sm:text-sm text-zinc-700 leading-relaxed max-w-md">
                        Building pragmatic AI/ML systems, quantized on-device neural models, and high-throughput full-stack web applications.
                    </p>

                    <div className="pt-2 text-xs font-mono text-zinc-500">
                        © 2026 Anirudh S · All Rights Reserved.
                    </div>
                </div>

                {/* Column 2: Quick Navigation (3 Cols) */}
                <div className="md:col-span-3 space-y-3">
                    <div className="font-pixel text-xs uppercase tracking-widest text-zinc-500 font-bold border-b border-black/10 pb-2">
                        // NAVIGATION
                    </div>

                    <ul className="space-y-2 font-body text-xs sm:text-sm font-bold uppercase tracking-wider">
                        <li>
                            <a href="#projects" className="hover:text-retro-orange transition-colors flex items-center gap-1.5 text-zinc-800">
                                <span className="material-symbols-outlined text-sm text-zinc-400">folder_special</span>
                                Works / Projects
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="hover:text-retro-orange transition-colors flex items-center gap-1.5 text-zinc-800">
                                <span className="material-symbols-outlined text-sm text-zinc-400">person</span>
                                About & Skills
                            </a>
                        </li>
                        <li>
                            <a href="#experience" className="hover:text-retro-orange transition-colors flex items-center gap-1.5 text-zinc-800">
                                <span className="material-symbols-outlined text-sm text-zinc-400">terminal</span>
                                Boot Log / Timeline
                            </a>
                        </li>
                        <li>
                            <a href="#credentials" className="hover:text-retro-orange transition-colors flex items-center gap-1.5 text-zinc-800">
                                <span className="material-symbols-outlined text-sm text-zinc-400">workspace_premium</span>
                                Credentials & Certs
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-retro-orange transition-colors flex items-center gap-1.5 text-zinc-800">
                                <span className="material-symbols-outlined text-sm text-zinc-400">mail</span>
                                Contact Me
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Connect & Support (4 Cols) */}
                <div className="md:col-span-4 space-y-3">
                    <div className="font-pixel text-xs uppercase tracking-widest text-zinc-500 font-bold border-b border-black/10 pb-2">
                        // CONNECT & SUPPORT
                    </div>

                    <div className="flex flex-col gap-2.5 font-body text-xs font-bold">
                        <a
                            href={portfolioData.personal.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border-2 border-black rounded-lg p-2.5 flex items-center justify-between hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-zinc-900"
                        >
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">code</span>
                                GitHub Repository
                            </span>
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>

                        <a
                            href={portfolioData.personal.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border-2 border-black rounded-lg p-2.5 flex items-center justify-between hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-zinc-900"
                        >
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">work</span>
                                LinkedIn Profile
                            </span>
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>

                        {portfolioData.personal.social.buyMeACoffee && (
                            <a
                                href={portfolioData.personal.social.buyMeACoffee}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-retro-yellow text-black border-2 border-black rounded-lg p-2.5 flex items-center justify-between hover:bg-amber-300 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold uppercase tracking-wider"
                            >
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base text-amber-800">local_cafe</span>
                                    Buy Me A Coffee
                                </span>
                                <span className="material-symbols-outlined text-sm">favorite</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Terminal Footnote */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] font-pixel text-zinc-500 uppercase tracking-widest gap-2 text-center sm:text-left px-2">
                <div>KOZHIKODE, INDIA · IST (UTC+5:30)</div>
                <div className="flex items-center gap-1.5 hover:text-retro-green transition-colors cursor-help border border-transparent hover:border-black/20 rounded px-1.5 py-0.5" title="Snake Status: 2,847 pixels eaten today">
                    <span className="inline-block animate-pulse">🐍</span>
                    <span>PIXEL SNAKE: ATE 2,847 PIXELS TODAY</span>
                </div>
                <div>BUILT WITH NEXT.JS 16 & TAILWIND CSS</div>
            </div>
        </footer>
    );
};

export default Footer;
