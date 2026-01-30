"use client";
import React, { useEffect, useState } from 'react';
import { portfolioData } from '@/data/portfolio';

const Hero = () => {
    const [tagline, setTagline] = useState(portfolioData.hero.taglines[0]);

    useEffect(() => {
        const day = new Date().getDay();
        setTagline(portfolioData.hero.taglines[day]);
    }, []);

    return (
        <header className="min-h-screen flex items-center px-8 pt-20">
            <div className="max-w-6xl mx-auto w-full py-24">
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
            </div>
        </header>
    );
};

export default Hero;
