"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { portfolioData, HeroAction } from '@/data/portfolio';
import HelloWorld from './HelloWorld';
import ReceiptPrinter from './ReceiptPrinter';
import ResumeModal from './ResumeModal';

const Hero = () => {
    const [showReceipt, setShowReceipt] = useState(false);
    const [showResumeModal, setShowResumeModal] = useState(false);

    useEffect(() => {
        const banner = `
  ____  _   _ ____   ___      _    _   _ ___ ____  _   _ ____  _   _ 
 / ___|| | | |  _ \\ / _ \\    / \\  | \\ | |_ _|  _ \\| | | |  _ \\| | | |
 \\___ \\| | | | | | | | | |  / _ \\ |  \\| || || |_) | | | | | | | |_| |
  ___) | |_| | |_| | |_| | / ___ \\| |\\  || ||  _ <| |_| | |_| |  _  |
 |____/ \\___/|____/ \\___/ /_/   \\_\\_| \\_|___|_| \\_\\\\___/|____/|_| |_|
                                                                     
 > SYSTEM READY. WELCOME TO ANIRUDH S PORTFOLIO!
`;
        console.log('%c' + banner, 'color: #22c55e; font-family: monospace; font-weight: bold; background: #111; padding: 8px; border-radius: 4px;');
    }, []);

    const handleActionClick = (e: React.MouseEvent, action: HeroAction) => {
        if (action.text.includes("Download")) {
            // Keep receipt printer trigger as optional interactive feature or default download behavior
        }
    };

    return (
        <section className="max-w-7xl mx-auto space-y-4 sm:space-y-6 pt-12 sm:pt-16 mb-6 px-3 sm:px-4 md:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                {/* Profile & Value Proposition Card */}
                <div className="lg:col-span-8 bg-retro-white dark:bg-zinc-100 bento-card rounded-3xl p-6 sm:p-8 sm:p-10 relative overflow-hidden retro-grain border-4 border-black/10 flex flex-col justify-between">
                    <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
                        {/* Profile Image & Status Badge */}
                        <div className="w-full md:w-1/3 shrink-0 space-y-3">
                            <div className="aspect-square bg-zinc-300 rounded-2xl overflow-hidden border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative group">
                                <Image
                                    alt={`${portfolioData.personal.name} - ${portfolioData.personal.role}`}
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    src={portfolioData.about.image}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority
                                />
                            </div>
                            <div className="bg-emerald-400 text-black font-pixel text-center py-2 px-3 rounded-md text-[10px] sm:text-xs border-2 border-black font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <span className="w-2 h-2 rounded-full bg-black animate-pulse inline-block"></span>
                                <span>{portfolioData.hero.status}</span>
                            </div>
                        </div>

                        {/* Hero Text Content & CTAs */}
                        <div className="w-full md:w-2/3 space-y-5">
                            <div>
                                <div className="flex items-center gap-2 text-zinc-500 font-pixel text-xs uppercase tracking-widest mb-1">
                                    <span>AI/ML ENGINEER</span>
                                    <span>·</span>
                                    <span>KOZHIKODE, INDIA</span>
                                </div>
                                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display uppercase tracking-tighter leading-none text-zinc-900">
                                    ANIRUDH S
                                </h1>
                            </div>

                            <p className="text-base sm:text-lg font-body font-medium leading-relaxed text-zinc-700 max-w-xl">
                                {portfolioData.hero.subtext}
                            </p>

                            {/* Aligned Key-Value Strip */}
                            <div className="grid grid-cols-3 gap-2 bg-zinc-100 border-2 border-black p-3 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <div>
                                    <div className="font-pixel text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">Location</div>
                                    <div className="font-body text-xs sm:text-sm font-bold text-zinc-900 truncate">Kozhikode, KL</div>
                                </div>
                                <div>
                                    <div className="font-pixel text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">Primary Role</div>
                                    <div className="font-body text-xs sm:text-sm font-bold text-zinc-900 truncate">AI/ML Engineer</div>
                                </div>
                                <div>
                                    <div className="font-pixel text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">Core Focus</div>
                                    <div className="font-body text-xs sm:text-sm font-bold text-zinc-900 truncate">Agentic Systems & RAG</div>
                                </div>
                            </div>

                            {/* Primary & Secondary Action CTAs */}
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                {portfolioData.hero.actions.map((action, index) => (
                                    <a
                                        key={index}
                                        href={action.href}
                                        target={!action.primary && action.href.startsWith("http") ? "_blank" : undefined}
                                        rel={!action.primary && action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        onClick={(e) => handleActionClick(e, action)}
                                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                            action.primary
                                                ? 'bg-black text-white hover:bg-retro-yellow hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white text-black hover:bg-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                        }`}
                                    >
                                        <span>{action.text}</span>
                                        <span className="material-symbols-outlined text-base">{action.icon}</span>
                                    </a>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setShowResumeModal(true)}
                                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-black bg-retro-yellow text-black hover:bg-yellow-400 font-body text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <span>Quick View PDF</span>
                                    <span className="material-symbols-outlined text-base">visibility</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hello World Interactive Sidekick Widget */}
                <div className="lg:col-span-4 bg-zinc-200 bento-card rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden retro-grain border-4 border-black/10">
                    <div className="w-full aspect-square relative rounded-2xl overflow-hidden flex flex-col border-2 border-black bg-retro-cream shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <HelloWorld />
                    </div>
                </div>
            </div>
            {showReceipt && <ReceiptPrinter onClose={() => setShowReceipt(false)} />}
            <ResumeModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
        </section>
    );
};

export default Hero;
