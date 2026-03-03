import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Experience = () => {
    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0" id="experience">
            <div className="bg-retro-charcoal bento-card rounded-3xl p-5 sm:p-8 relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                {/* CRT Screen Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-10 bg-[length:100%_4px]"></div>

                {/* Terminal Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 border-b border-retro-green/30 pb-4">
                    <h2 className="text-base sm:text-xl md:text-2xl font-pixel uppercase tracking-wider sm:tracking-widest text-retro-green flex items-center gap-2 break-words">
                        <span className="animate-pulse">_</span> SYSTEM_BOOT_LOG: CAREER_HISTORY
                    </h2>
                    <div className="text-[10px] sm:text-xs font-pixel text-retro-green/50">
                        v2.0.24 [STABLE]
                    </div>
                </div>

                <div className="space-y-6 sm:space-y-8 font-pixel text-base sm:text-lg">
                    {portfolioData.experience.map((exp, index) => (
                        <div key={index} className="group relative pl-6 border-l border-retro-green/20 hover:border-retro-green transition-colors duration-300">
                            {/* Timestamp */}
                            <div className="text-xs text-retro-green/60 mb-1">
                                [{exp.period}] :: PROCESS_ID_{1000 + index}
                            </div>

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                                <span className="text-retro-yellow font-bold uppercase">
                                    &gt; EXECUTE ROLE:
                                </span>
                                <h3 className="text-xl text-retro-white uppercase tracking-wider glow-text">
                                    {exp.role}
                                </h3>
                                <span className="text-retro-green/50 hidden md:inline">@</span>
                                <span className="text-retro-green font-bold uppercase">{exp.company}</span>
                            </div>

                            <p className="text-retro-green/80 leading-relaxed max-w-4xl font-mono text-sm md:text-base border-l-2 border-transparent group-hover:border-retro-yellow pl-4 transition-all">
                                <span className="text-retro-yellow mr-2">$</span>
                                {exp.description}
                                <span className="animate-pulse inline-block ml-1 w-2 h-4 bg-retro-green align-middle opacity-0 group-hover:opacity-100"></span>
                            </p>
                        </div>
                    ))}

                    <div className="text-retro-green/40 text-sm animate-pulse mt-8">
                        &gt; AWAITING NEXT COMMAND...
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
