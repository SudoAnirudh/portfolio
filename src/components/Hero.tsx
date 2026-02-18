"use client";
import React, { useEffect, useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import HelloWorld from './HelloWorld';
import ReceiptPrinter from './ReceiptPrinter';

const Hero = () => {
    const [showReceipt, setShowReceipt] = useState(false);

    const handleActionClick = (e: React.MouseEvent, action: any) => {
        if (action.text === "Download CV") {
            e.preventDefault();
            setShowReceipt(true);
        }
    };
    return (
        <section className="max-w-7xl mx-auto space-y-6 pt-20 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-8 bg-retro-white dark:bg-zinc-100 bento-card rounded-2xl p-6 relative overflow-hidden retro-grain border-4 border-black/5">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3 space-y-4">
                            <div className="aspect-square bg-zinc-300 rounded-xl overflow-hidden border-4 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <img
                                    alt="Profile"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    src={portfolioData.about.image}
                                />
                            </div>
                            <div className="bg-primary text-black font-display text-center py-2 rounded-full text-sm border-2 border-black font-bold uppercase tracking-widest hover:bg-retro-yellow transition-colors">
                                {portfolioData.hero.status}
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 space-y-4">
                            <div className="flex justify-between items-start">
                                <h1 className="text-6xl md:text-7xl font-display uppercase tracking-tighter leading-none text-zinc-900">
                                    ANIRUDH S
                                </h1>
                                <div className="text-4xl text-zinc-900">
                                    <span className="material-symbols-outlined text-5xl">sentiment_satisfied</span>
                                </div>
                            </div>
                            <p className="text-sm md:text-base font-medium leading-relaxed max-w-lg font-body text-zinc-700">
                                {portfolioData.hero.subtext}
                            </p>

                            {/* Retro Data Grid */}
                            <div className="grid grid-cols-3 gap-0 border-2 border-black text-[10px] md:text-xs font-bold uppercase bg-zinc-50 font-pixel tracking-widest">
                                <div className="border-r-2 border-b-2 border-black p-2">Location</div>
                                <div className="border-r-2 border-b-2 border-black p-2">Role</div>
                                <div className="border-b-2 border-black p-2">Focus</div>
                                <div className="border-r-2 border-black p-2 truncate">India</div>
                                <div className="border-r-2 border-black p-2 truncate">AI Engineer</div>
                                <div className="p-2 truncate">AI/ML Developer</div>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <div className="flex gap-3">
                                    {portfolioData.hero.actions.map((action, index) => (
                                        <a
                                            key={index}
                                            href={action.href}
                                            target={!action.primary ? "_blank" : undefined}
                                            onClick={(e) => handleActionClick(e, action)}
                                            className="flex items-center gap-2 group cursor-pointer"
                                        >
                                            <span className="bg-black text-white px-2 py-1 rounded text-[10px] font-bold group-hover:bg-primary group-hover:text-black transition-colors uppercase">
                                                {action.text}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                                <div className="w-12 h-12 bg-white border-2 border-black p-1 hidden md:block">
                                    {/* QR Placeholder or decorative */}
                                    <div className="w-full h-full bg-black/10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hello World / Game Card */}
                <div className="lg:col-span-4 bg-zinc-200 bento-card rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden retro-grain border-4 border-zinc-300">
                    <div className="w-full aspect-square relative rounded-lg overflow-hidden flex flex-col border-2 border-black bg-retro-cream">
                        <HelloWorld />
                    </div>
                </div>
            </div>
            {showReceipt && <ReceiptPrinter onClose={() => setShowReceipt(false)} />}
        </section>
    );
};

export default Hero;
