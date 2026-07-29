import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Credentials = () => {
    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0" id="credentials">
            <div className="bg-retro-charcoal bento-card rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                {/* CRT Screen Accent Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-10 bg-[length:100%_4px]"></div>

                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-retro-yellow text-2xl">workspace_premium</span>
                        <h2 className="text-xl sm:text-2xl font-display uppercase tracking-wider text-white">
                            CREDENTIALS & VERIFICATION
                        </h2>
                    </div>
                    <div className="hidden sm:block font-pixel text-xs text-retro-green/70">
                        VERIFIED_PROFILE // 2026
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Row 1: Education */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-retro-yellow/50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-retro-green text-xl shrink-0 mt-0.5">school</span>
                                <div>
                                    <div className="flex flex-wrap items-baseline gap-2">
                                        <h3 className="text-lg font-display text-white">
                                            {portfolioData.education[0].degree}
                                        </h3>
                                        <span className="bg-retro-yellow/20 text-retro-yellow text-xs font-mono font-bold px-2 py-0.5 rounded border border-retro-yellow/40">
                                            CGPA: {portfolioData.education[0].cgpa}
                                        </span>
                                    </div>
                                    <p className="text-sm font-body text-zinc-300 mt-1">
                                        {portfolioData.education[0].institution}
                                    </p>
                                </div>
                            </div>
                            <div className="text-xs font-pixel text-zinc-400 shrink-0 self-start md:self-center bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                                {portfolioData.education[0].period}
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Certifications Badge Row */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-retro-yellow/50 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-retro-yellow text-lg">verified</span>
                            <h3 className="text-xs font-pixel uppercase tracking-widest text-zinc-400">
                                TECHNICAL CERTIFICATIONS
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {portfolioData.certifications.map((cert, index) => (
                                <div
                                    key={index}
                                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-body font-medium transition-all ${
                                        cert.featured
                                            ? 'bg-retro-yellow/10 border-retro-yellow/40 text-retro-yellow shadow-[2px_2px_0px_0px_rgba(255,204,0,0.1)]'
                                            : 'bg-black/40 border-white/15 text-zinc-200'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-xs">
                                        {cert.issuer === 'IBM' ? 'token' : cert.issuer === 'Google Cloud' ? 'cloud' : 'workspace_premium'}
                                    </span>
                                    <span className="font-bold text-white/90">{cert.issuer}:</span>
                                    <span>{cert.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 3: Achievements */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-retro-yellow/50 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-retro-orange text-lg">military_tech</span>
                            <h3 className="text-xs font-pixel uppercase tracking-widest text-zinc-400">
                                KEY ACHIEVEMENTS & CONTRIBUTIONS
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            {portfolioData.achievements.map((achm, index) => (
                                <div key={index} className="flex items-start gap-2.5 bg-black/40 p-3.5 rounded-xl border border-white/10">
                                    <span className="text-retro-yellow text-xs mt-0.5 font-bold">★</span>
                                    <span className="text-xs sm:text-sm font-body text-zinc-200 leading-relaxed">{achm}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Credentials;
