"use client";
import React, { useEffect, useState } from 'react';
import { portfolioData } from '@/data/portfolio';

const Hero = () => {
    const [tagline, setTagline] = useState(portfolioData.hero.taglines[0]);

    useEffect(() => {
        const day = new Date().getDay();
        const timer = setTimeout(() => {
            setTagline(portfolioData.hero.taglines[day]);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <header id="main-content" className="relative min-h-screen flex items-center px-8 pt-20 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 flex justify-center" aria-hidden="true">
                <div className="w-full max-w-6xl border-l border-gray-100/80"></div>
            </div>
            <div className="max-w-6xl mx-auto w-full py-24 relative">
                <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.3em] text-muted mb-10">
                    <span className="font-semibold text-black">{portfolioData.personal.role}</span>
                    <span className="h-[1px] w-10 bg-gray-200"></span>
                    <span>{portfolioData.personal.location}</span>
                </div>
                <div className="inline-block border border-gray-200 px-3 py-1 text-[11px] tracking-[0.2em] font-medium text-muted uppercase mb-12 rounded-sm">
                    {portfolioData.hero.status}
                </div>
                <h1 className="text-7xl md:text-[80px] leading-[0.9] font-light tracking-tighter mb-12 max-w-4xl">
                    {tagline.split(" ").map((word, index) => {
                        if (["intelligent", "learn", "insights", "neural", "Deeper", "deployment", "future"].some(k => word.includes(k))) {
                            return <span key={index} className="text-accent italic">{word} </span>
                        }
                        return word + " ";
                    })}
                </h1>
                <p className="text-xl md:text-2xl text-muted font-light max-w-2xl leading-relaxed mb-16">
                    {portfolioData.hero.subtext}
                </p>
                <div className="flex flex-wrap gap-8">
                    {portfolioData.hero.actions.map((action, index) => (
                        <a
                            key={index}
                            className="text-sm font-semibold tracking-widest uppercase flex items-center group"
                            href={action.href}
                            target={!action.primary ? "_blank" : undefined}
                            rel={!action.primary ? "noopener noreferrer" : undefined}
                        >
                            {action.text}
                            <span className={`material-symbols-outlined ml-2 text-sm ${action.primary ? "group-hover:translate-x-1 transition-transform" : ""}`}>
                                {action.icon}
                            </span>
                        </a>
                    ))}
                </div>
                <div className="mt-16 flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-muted">
                    <span>Scroll</span>
                    <span className="h-[1px] w-16 bg-gray-200"></span>
                    <span className="text-black/60">01</span>
                </div>
            </div>
        </header>
    );
};

export default Hero;
