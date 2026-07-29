import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Experience = () => {
    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0" id="experience">
            <div className="bg-retro-charcoal bento-card rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                {/* CRT Screen Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-10 bg-[length:100%_4px]"></div>

                {/* Terminal Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8 border-b border-retro-green/30 pb-4">
                    <h2 className="text-base sm:text-lg md:text-xl font-pixel uppercase tracking-widest text-retro-green flex items-center gap-2">
                        <span className="animate-pulse">_</span> SYSTEM_BOOT_LOG // CAREER_HISTORY
                    </h2>
                    <div className="text-[10px] sm:text-xs font-pixel text-retro-green/50">
                        STATUS: OPERATIONAL
                    </div>
                </div>

                <div className="space-y-8">
                    {portfolioData.experience.map((exp, index) => (
                        <div key={index} className="group relative pl-6 border-l-2 border-retro-green/30 hover:border-retro-yellow transition-colors duration-300">
                            {/* Process ID & Period */}
                            <div className="text-xs font-pixel text-retro-green/70 mb-1">
                                [{exp.period}] :: PROCESS_ID_{1000 + index}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                                <h3 className="text-xl sm:text-2xl font-display text-white uppercase tracking-tight">
                                    {exp.role}
                                </h3>
                                <span className="text-retro-yellow font-body font-bold text-sm uppercase">
                                    @ {exp.company}
                                </span>
                            </div>

                            <div className="text-zinc-300 font-body text-sm sm:text-base leading-relaxed max-w-4xl space-y-2">
                                <ul className="space-y-2 list-none">
                                    {exp.description.map((bullet, bulletIdx) => (
                                        <li key={bulletIdx} className="flex items-start gap-2.5">
                                            <span className="text-retro-green font-pixel text-xs mt-1">▶</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    <div className="text-retro-green/40 font-pixel text-xs animate-pulse pt-4 border-t border-retro-green/20">
                        &gt; AWAITING NEXT ENGINEERING ROLE...
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;

