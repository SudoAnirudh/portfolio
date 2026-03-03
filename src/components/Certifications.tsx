import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Certifications = () => {
    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0" id="certifications">
            <div className="bg-retro-green bento-card rounded-3xl p-5 sm:p-8 relative overflow-hidden retro-grain border-4 border-black/10">
                <div className="relative z-20">
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-retro-white border-2 border-black flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-2xl sm:text-3xl text-retro-charcoal">workspace_premium</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tighter text-retro-charcoal">
                            Credentials
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 sm:gap-8 lg:gap-16">
                        {/* Certifications Column */}
                        <div className="bg-white/50 p-4 sm:p-6 border-2 border-black rounded-xl">
                            <h3 className="text-lg sm:text-xl font-display uppercase tracking-tight mb-4 flex items-center gap-2 text-retro-charcoal">
                                <span className="material-symbols-outlined">verified</span>
                                Certifications
                            </h3>
                            <ul className="space-y-3 font-body font-medium text-retro-charcoal/80">
                                {portfolioData.certifications.map((cert, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-retro-charcoal text-xs mt-1">▶</span>
                                        {cert}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Achievements Column */}
                        <div className="bg-retro-charcoal p-4 sm:p-6 border-2 border-black rounded-xl text-retro-white">
                            <h3 className="text-lg sm:text-xl font-display uppercase tracking-tight mb-4 flex items-center gap-2 text-retro-yellow">
                                <span className="material-symbols-outlined">trophy</span>
                                Achievements
                            </h3>
                            <ul className="space-y-3 font-body font-medium text-retro-white/80">
                                {portfolioData.achievements.map((achm, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-retro-yellow text-xs mt-1">★</span>
                                        {achm}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3">
                    <span className="material-symbols-outlined text-[180px] sm:text-[240px] lg:text-[300px]">military_tech</span>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
