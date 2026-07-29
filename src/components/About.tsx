import React from 'react';
import { portfolioData } from '@/data/portfolio';

const About = () => {
    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0 h-full flex flex-col" id="about">
            <div className="bg-retro-white bento-card rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden retro-grain border-4 border-black/10 flex-1 flex flex-col justify-between">
                <div className="flex flex-col items-start gap-6 flex-1 w-full">
                    <div className="w-full">
                        <div className="flex items-center gap-2 text-zinc-500 font-pixel text-xs uppercase tracking-widest mb-2">
                            <span>01 // IDENTITY & SUMMARY</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tighter mb-6 text-retro-charcoal">
                            About <span className="text-stroke-black text-transparent">Me</span>
                        </h2>
                        <div className="text-base sm:text-lg font-body font-medium leading-relaxed text-zinc-700 max-w-3xl">
                            <p>{portfolioData.about.bio}</p>
                        </div>
                    </div>
                </div>

                {/* Stat Highlights Row */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t-2 border-black/10 pt-6">
                    {portfolioData.about.highlights ? (
                        portfolioData.about.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-zinc-50 border-2 border-black/10 p-3 rounded-xl">
                                <div className="w-9 h-9 bg-retro-yellow border-2 border-black flex items-center justify-center rounded-lg shrink-0">
                                    <span className="material-symbols-outlined text-retro-charcoal text-xl">{item.icon}</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-pixel font-bold uppercase text-zinc-500">{item.label}</p>
                                    <p className="font-body font-bold text-xs sm:text-sm text-retro-charcoal truncate">{item.value}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="flex items-center gap-3 bg-zinc-50 border-2 border-black/10 p-3 rounded-xl">
                                <div className="w-9 h-9 bg-retro-yellow border-2 border-black flex items-center justify-center rounded-lg">
                                    <span className="material-symbols-outlined text-retro-charcoal text-xl">school</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-pixel font-bold uppercase text-zinc-500">Degree</p>
                                    <p className="font-body font-bold text-xs sm:text-sm text-retro-charcoal">B.E. AI & ML (2026)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-zinc-50 border-2 border-black/10 p-3 rounded-xl">
                                <div className="w-9 h-9 bg-retro-green border-2 border-black flex items-center justify-center rounded-lg">
                                    <span className="material-symbols-outlined text-retro-charcoal text-xl">work</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-pixel font-bold uppercase text-zinc-500">Experience</p>
                                    <p className="font-body font-bold text-xs sm:text-sm text-retro-charcoal">2 ML Internships</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-zinc-50 border-2 border-black/10 p-3 rounded-xl">
                                <div className="w-9 h-9 bg-retro-orange border-2 border-black flex items-center justify-center rounded-lg">
                                    <span className="material-symbols-outlined text-retro-charcoal text-xl">bolt</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-pixel font-bold uppercase text-zinc-500">Status</p>
                                    <p className="font-body font-bold text-xs sm:text-sm text-retro-charcoal">Open for Work</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default About;

