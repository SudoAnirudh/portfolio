"use client";
import React, { useEffect, useState } from 'react';
import { portfolioData } from '@/data/portfolio';

interface ContributionDay {
    color: string;
    contributionCount: number;
    contributionLevel: string;
    date: string;
    intensity: number;
}

const Contribution = () => {
    const [squaresData, setSquaresData] = useState<ContributionDay[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalContributions, setTotalContributions] = useState<number | null>(null);
    const [status, setStatus] = useState<'live' | 'offline'>('offline');
    const [activeTheme, setActiveTheme] = useState<string>('green');

    const githubUrl = portfolioData.personal.social.github;
    const username = githubUrl.split('/').pop() || 'SudoAnirudh';

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const res = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
                if (!res.ok) throw new Error("Failed to fetch contribution data");
                const data = await res.json();
                
                if (data && data.contributions) {
                    const flatDays = data.contributions.flat().map((day: any) => {
                        let intensity = 0;
                        switch (day.contributionLevel) {
                            case 'FOURTH_QUARTILE': intensity = 4; break;
                            case 'THIRD_QUARTILE': intensity = 3; break;
                            case 'SECOND_QUARTILE': intensity = 2; break;
                            case 'FIRST_QUARTILE': intensity = 1; break;
                            default: intensity = 0;
                        }
                        return {
                            ...day,
                            intensity
                        };
                    });
                    setSquaresData(flatDays);
                    setTotalContributions(data.totalContributions || 0);
                    setStatus('live');
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (e) {
                console.warn("Using offline mock contributions due to error:", e);
                // Fallback mock data: 364 days
                const mockSquares = Array.from({ length: 364 }).map(() => Math.floor(Math.random() * 5));
                const mockDays = mockSquares.map((intensity, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (363 - index));
                    return {
                        color: '#ebedf0',
                        contributionCount: intensity > 0 ? intensity * 2 + 1 : 0,
                        contributionLevel: intensity === 4 ? 'FOURTH_QUARTILE' : intensity === 3 ? 'THIRD_QUARTILE' : intensity === 2 ? 'SECOND_QUARTILE' : intensity === 1 ? 'FIRST_QUARTILE' : 'NONE',
                        date: date.toISOString().split('T')[0],
                        intensity
                    };
                });
                setSquaresData(mockDays);
                setTotalContributions(1142); // Realistic static total
                setStatus('offline');
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, [username]);

    const playSound = (freq = 600, duration = 0.08) => {
        try {
            const AudioCtor = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioCtor) return;
            const ctx = new AudioCtor();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            console.error(e);
        }
    };

    const themePalettes: Record<string, string[]> = {
        green: [
            'bg-zinc-800 border-zinc-900',
            'bg-emerald-950 border-emerald-900/60',
            'bg-emerald-800 border-emerald-700/60',
            'bg-emerald-600 border-emerald-500/60',
            'bg-emerald-400 border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
        ],
        amber: [
            'bg-zinc-800 border-zinc-900',
            'bg-amber-950 border-amber-900/60',
            'bg-amber-800 border-amber-700/60',
            'bg-amber-600 border-amber-550/60',
            'bg-amber-400 border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.3)]'
        ],
        cyan: [
            'bg-zinc-800 border-zinc-900',
            'bg-cyan-950 border-cyan-900/60',
            'bg-cyan-800 border-cyan-700/60',
            'bg-cyan-600 border-cyan-500/60',
            'bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]'
        ],
        vapor: [
            'bg-zinc-800 border-zinc-900',
            'bg-fuchsia-950 border-fuchsia-900/60',
            'bg-fuchsia-850 border-fuchsia-750/60',
            'bg-fuchsia-600 border-fuchsia-500/60',
            'bg-fuchsia-400 border-fuchsia-300 shadow-[0_0_8px_rgba(232,121,249,0.3)]'
        ]
    };

    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0">
            <div className="bg-zinc-100 bento-card rounded-3xl p-5 sm:p-8 relative overflow-hidden retro-grain border-4 border-black/10">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
                    <h2 className="text-xl sm:text-2xl font-display uppercase tracking-tighter text-retro-charcoal flex items-center gap-2">
                        Github <span className="text-retro-green">Activity</span>
                        {totalContributions !== null && (
                            <span className="text-[10px] font-pixel bg-emerald-500/10 text-emerald-700 px-2 py-0.5 border border-emerald-500/25 rounded-none uppercase">
                                {totalContributions} Commits
                            </span>
                        )}
                    </h2>
                    
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${status === 'live' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500 animate-pulse'}`}></span>
                            <span className="font-pixel text-[8px] sm:text-[9px] text-zinc-500">
                                {status === 'live' ? 'API_CONNECTED' : 'API_LOCAL_FALLBACK'}
                            </span>
                        </div>
                        <div className="font-pixel text-xs uppercase bg-black text-white px-2 py-1">
                            {username}_OS // GIT_MONITOR
                        </div>
                    </div>
                </div>

                {/* Grid Container */}
                <div className="p-4 bg-zinc-950 border-4 border-black rounded shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] relative overflow-hidden select-none min-h-[120px] flex items-center justify-center">
                    {/* CRT monitor overlays */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-30"></div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-6 gap-3 relative z-20">
                            <div className="font-pixel text-[10px] sm:text-xs text-retro-green animate-pulse tracking-wider">
                                CONNECTING TO GITHUB SERVER...
                            </div>
                            <div className="w-48 h-3 bg-zinc-900 border border-zinc-800 p-0.5 rounded-none">
                                <div className="h-full bg-retro-green animate-[pulse_1.2s_infinite]"></div>
                            </div>
                        </div>
                    ) : (
                        /* Scrollable Container */
                        <div className="w-full overflow-x-auto custom-scrollbar pb-2 relative z-20">
                            <div className="grid grid-rows-7 grid-flow-col gap-1 md:gap-1.5 min-w-[700px] justify-start md:justify-center">
                                {squaresData.map((day, index) => {
                                    const dateString = new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                                    return (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 border ${themePalettes[activeTheme][day.intensity]} transition-all duration-300 hover:scale-125 hover:z-20 cursor-crosshair relative group`}
                                        >
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-retro-charcoal text-white text-[8px] font-pixel px-2 py-1 rounded border border-black z-30 whitespace-nowrap shadow-md pointer-events-none uppercase">
                                                {day.contributionCount === 0 ? 'No commits' : `${day.contributionCount} ${day.contributionCount === 1 ? 'commit' : 'commits'}`} on {dateString}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Dashboard Controls Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                    {/* Legend */}
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase font-body text-zinc-500">
                        <span>Less</span>
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 bg-zinc-200 border border-black"></div>
                            <div className={`w-3 h-3 border border-black ${themePalettes[activeTheme][1]}`}></div>
                            <div className={`w-3 h-3 border border-black ${themePalettes[activeTheme][2]}`}></div>
                            <div className={`w-3 h-3 border border-black ${themePalettes[activeTheme][3]}`}></div>
                            <div className={`w-3 h-3 border border-black ${themePalettes[activeTheme][4]}`}></div>
                        </div>
                        <span>More</span>
                    </div>

                    {/* Actions and Theme Selector */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Theme Controls */}
                        <div className="flex items-center gap-2 text-[10px] font-pixel uppercase tracking-widest text-retro-charcoal">
                            <span>Theme:</span>
                            <div className="flex gap-1">
                                {Object.keys(themePalettes).map((theme) => (
                                    <button
                                        key={theme}
                                        onClick={() => {
                                            setActiveTheme(theme);
                                            playSound(650, 0.05);
                                        }}
                                        className={`px-1.5 py-0.5 border border-black font-pixel text-[8px] uppercase cursor-pointer transition-all ${
                                            activeTheme === theme
                                                ? 'bg-retro-charcoal text-white translate-y-[1px]'
                                                : 'bg-white text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none'
                                        }`}
                                    >
                                        {theme}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contribution;
