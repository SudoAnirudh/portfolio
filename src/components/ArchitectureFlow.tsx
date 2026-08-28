"use client";
import React from 'react';

export interface ArchitectureStep {
    step: string;
    title: string;
    description: string;
    detail?: string;
}

interface ArchitectureFlowProps {
    steps?: ArchitectureStep[];
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ steps }) => {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 bento-card rounded-3xl p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-retro-yellow text-xl">account_tree</span>
                    <h2 className="font-pixel text-xs sm:text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">
                        SYSTEM ARCHITECTURE & PIPELINE FLOW
                    </h2>
                </div>
                <span className="font-mono text-[10px] bg-black text-retro-yellow px-2 py-0.5 rounded uppercase font-bold border border-retro-yellow/30">
                    {steps.length} STAGE PIPELINE
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-zinc-900 border-2 border-black rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative group hover:border-retro-yellow transition-colors"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-pixel text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                                    STAGE {step.step || `0${idx + 1}`}
                                </span>
                                <span className="w-5 h-5 rounded-full bg-retro-yellow text-black text-[10px] font-bold font-mono flex items-center justify-center border border-black">
                                    {idx + 1}
                                </span>
                            </div>
                            <h3 className="font-display text-base uppercase tracking-tight text-zinc-900 dark:text-white font-bold leading-snug">
                                {step.title}
                            </h3>
                            <p className="font-body text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mt-2">
                                {step.description}
                            </p>
                        </div>

                        {step.detail && (
                            <div className="pt-2 border-t border-black/10 dark:border-white/10">
                                <span className="inline-block bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[10px] px-2 py-1 rounded border border-black/10 leading-tight">
                                    {step.detail}
                                </span>
                            </div>
                        )}

                        {/* Connector Arrow for Desktop */}
                        {idx < steps.length - 1 && (
                            <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-black text-white rounded-full items-center justify-center border border-white text-xs shadow-md">
                                <span className="material-symbols-outlined text-sm">east</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
