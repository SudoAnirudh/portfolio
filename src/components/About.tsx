import React from 'react';
import { portfolioData } from '@/data/portfolio';

const About = () => {
    return (
        <section className="max-w-7xl mx-auto mb-6 px-4 md:px-0" id="about">
            <div className="bg-retro-white bento-card rounded-3xl p-8 relative overflow-hidden retro-grain border-4 border-black/10 h-full flex flex-col justify-between">
                <div className="flex flex-col items-start gap-8">
                    <div className="w-full">
                        <h2 className="text-5xl md:text-6xl font-display uppercase tracking-tighter mb-8 text-retro-charcoal">
                            About <span className="text-stroke-black text-transparent">Me</span>
                        </h2>
                        <div className="text-lg md:text-xl font-medium leading-relaxed font-body text-zinc-700 space-y-6 max-w-4xl">
                            <p>{portfolioData.about.bio}</p>
                        </div>
                    </div>
                </div>

                {/* Quick Stats / Footer for About Card */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 border-t-2 border-black/10 pt-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-retro-yellow border-2 border-black flex items-center justify-center rounded-full">
                            <span className="material-symbols-outlined text-retro-charcoal">location_on</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase text-retro-charcoal/60">Base</p>
                            <p className="font-display text-lg text-retro-charcoal">{portfolioData.personal.location.split(',')[0]}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-retro-green border-2 border-black flex items-center justify-center rounded-full">
                            <span className="material-symbols-outlined text-retro-charcoal">terminal</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase text-retro-charcoal/60">Exp</p>
                            <p className="font-display text-lg text-retro-charcoal">2+ Years</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-retro-orange border-2 border-black flex items-center justify-center rounded-full">
                            <span className="material-symbols-outlined text-retro-charcoal">bolt</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase text-retro-charcoal/60">Status</p>
                            <p className="font-display text-lg text-retro-charcoal">Open for Work</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
