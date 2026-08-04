"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

interface DotMatrixPrinterProps {
    onClose: () => void;
}

const DotMatrixPrinter: React.FC<DotMatrixPrinterProps> = ({ onClose }) => {
    const prefersReducedMotion = useReducedMotion();
    const [visibleLines, setVisibleLines] = useState<React.ReactNode[]>([]);
    const [isPrinting, setIsPrinting] = useState(true);
    const [isTorn, setIsTorn] = useState(false);
    const [stripsPeeled, setStripsPeeled] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize Web Audio API synth context
    useEffect(() => {
        const AudioCtor =
            window.AudioContext ||
            (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioCtor) {
            audioContextRef.current = new AudioCtor();
        }
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    // Synthesize 9-Pin Dot-Matrix Printhead Rrrrrrt sound
    const playDotMatrixSound = () => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;
        const duration = 0.12;

        // Oscillators simulating multi-pin hammer strike buzz
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(420 + Math.random() * 80, now);
        osc1.frequency.exponentialRampToValueAtTime(180, now + duration);

        osc2.type = 'square';
        osc2.frequency.setValueAtTime(840 + Math.random() * 120, now);
        osc2.frequency.exponentialRampToValueAtTime(320, now + duration);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration);
        osc2.stop(now + duration);
    };

    // Paper Tear Rip Sound
    const playRipSound = () => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2400;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + 0.2);
    };

    // Dot Matrix Continuous Green Bar Print Lines
    const fullPrintLines: React.ReactNode[] = [
        <div key="h1" className="text-center font-bold text-base sm:text-lg uppercase tracking-wider text-emerald-950 font-mono">
            ====================================================
        </div>,
        <div key="h2" className="text-center font-bold text-lg sm:text-xl uppercase tracking-widest text-emerald-950 font-mono">
            ANIRUDH S  //  AI & ML ENGINEER
        </div>,
        <div key="h3" className="text-center text-[10px] uppercase font-mono tracking-widest text-emerald-800 mb-2">
            LOCATION: KOZHIKODE, KL  ·  DEGREE: B.E. AI & ML (CGPA 7.77)
        </div>,
        <div key="h4" className="text-center font-mono text-[9px] border-b-2 border-emerald-800/40 pb-2 mb-3 text-emerald-900">
            TRACTOR FEED SPOOL #80-COL  ·  {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </div>,

        <div key="sec1" className="font-bold font-mono text-xs text-emerald-950 underline mb-1 uppercase tracking-wider">
            [1. EXECUTIVE SUMMARY]
        </div>,
        <div key="bio" className="text-[11px] font-mono text-emerald-900 leading-snug mb-3">
            {portfolioData.hero.subtext}
        </div>,

        <div key="sec2" className="font-bold font-mono text-xs text-emerald-950 underline mb-1 uppercase tracking-wider">
            [2. EXPERIENCE LOG]
        </div>,
        ...portfolioData.experience.map((exp, i) => (
            <div key={`exp_${i}`} className="mb-2 text-[10px] font-mono leading-tight">
                <div className="flex justify-between font-bold text-emerald-950">
                    <span>{exp.role.toUpperCase()}</span>
                    <span>{exp.period}</span>
                </div>
                <div className="text-emerald-800 font-semibold">{exp.company}</div>
                <ul className="list-disc list-inside text-emerald-900 mt-0.5 space-y-0.5">
                    {exp.description.map((d, idx) => (
                        <li key={idx} className="truncate">{d}</li>
                    ))}
                </ul>
            </div>
        )),

        <div key="sec3" className="font-bold font-mono text-xs text-emerald-950 underline mb-1 mt-2 uppercase tracking-wider">
            [3. CORE TECHNICAL STACK]
        </div>,
        ...portfolioData.skills.slice(0, 3).map((sk, i) => (
            <div key={`sk_${i}`} className="text-[10px] font-mono text-emerald-900 mb-1">
                <span className="font-bold text-emerald-950">{sk.category}:</span> {sk.items}
            </div>
        )),

        <div key="sec4" className="font-bold font-mono text-xs text-emerald-950 underline mb-1 mt-2 uppercase tracking-wider">
            [4. FEATURED PROJECTS]
        </div>,
        ...portfolioData.projects.filter(p => p.featured).map((proj, i) => (
            <div key={`proj_${i}`} className="text-[10px] font-mono text-emerald-900 mb-1.5 border-l-2 border-emerald-700 pl-2">
                <span className="font-bold text-emerald-950">{proj.title}</span> — {proj.description}
                <div className="text-[9px] text-emerald-800">STACK: {proj.techStack.join(', ')}</div>
            </div>
        )),

        <div key="foot1" className="text-center font-mono text-[9px] border-t-2 border-dashed border-emerald-800/40 pt-2 mt-3 text-emerald-950 font-bold">
            *** END OF SPOOL  ·  TOTAL CANDIDATE RECORDS: 001  ·  SYSTEM STATUS: READY ***
        </div>,
        <div key="foot2" className="text-center font-mono text-[8px] opacity-60 text-emerald-900">
            - - - - - - - - - - PERFORATED EDGE  ·  TEAR HERE - - - - - - - - - -
        </div>
    ];

    useEffect(() => {
        const hasPrinted = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('dotmatrix-printed') === 'true';

        if (prefersReducedMotion || hasPrinted) {
            setVisibleLines(fullPrintLines);
            setIsPrinting(false);
            setIsTorn(true);
            return;
        }

        let lineIdx = 0;
        const interval = setInterval(() => {
            if (lineIdx < fullPrintLines.length) {
                setVisibleLines(prev => [...prev, fullPrintLines[lineIdx]]);
                playDotMatrixSound();
                lineIdx++;

                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            } else {
                clearInterval(interval);
                if (typeof sessionStorage !== 'undefined') {
                    sessionStorage.setItem('dotmatrix-printed', 'true');
                }
                setTimeout(() => {
                    setIsPrinting(false);
                    playRipSound();
                    setTimeout(() => setIsTorn(true), 300);
                }, 400);
            }
        }, 160);

        return () => clearInterval(interval);
    }, [prefersReducedMotion]);

    const handleTearStrips = () => {
        playRipSound();
        setStripsPeeled(true);
    };

    const handleDownload = () => {
        const pdfUrl = portfolioData.hero.actions.find(a => !a.primary)?.href || "https://drive.google.com/file/d/1V6g7AmD1qLFil0PY0rPI54-Rfp0RgajU/view?usp=drive_link";
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6"
                onClick={onClose}
            >
                <div
                    className="relative flex flex-col items-center w-full max-w-2xl max-h-[92vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Industrial Dot-Matrix Printer Housing Head */}
                    <div className="w-full bg-zinc-300 dark:bg-zinc-800 border-4 border-black rounded-t-2xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-30 flex items-center justify-between gap-3 shrink-0">
                        <div className="flex items-center gap-3">
                            {/* Feed Knob Graphic */}
                            <div className="w-7 h-7 bg-zinc-700 rounded-full border-2 border-black flex items-center justify-center shadow-inner">
                                <div className="w-1.5 h-4 bg-zinc-400 rounded-xs transform rotate-45"></div>
                            </div>
                            <div>
                                <h3 className="font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 leading-none">
                                    EPSON FX-80 DOT-MATRIX SPOOLER
                                </h3>
                                <p className="font-mono text-[9px] text-zinc-600 dark:text-zinc-400">TRACTOR FEED 9-PIN IMPACT PRINTER</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Audio Mute Control */}
                            <button
                                type="button"
                                onClick={() => setIsMuted(!isMuted)}
                                className="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 hover:bg-retro-yellow hover:text-black text-zinc-900 dark:text-zinc-100 border border-black rounded text-[10px] font-pixel font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer"
                                title={isMuted ? "Unmute mechanical dot-matrix audio" : "Mute audio"}
                            >
                                <span>{isMuted ? '🔇 Muted' : '🔊 Sound On'}</span>
                            </button>

                            {/* Status LEDs */}
                            <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded border border-black text-[9px] font-mono">
                                <span className="text-zinc-400">PWR</span>
                                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]"></span>
                                <span className="text-zinc-400 ml-1">BUSY</span>
                                <span className={`w-2 h-2 rounded-full ${isPrinting ? 'bg-amber-400 animate-ping' : 'bg-zinc-700'}`}></span>
                            </div>

                            <button
                                onClick={onClose}
                                className="p-1 bg-red-600 hover:bg-red-700 text-white border border-black rounded transition-colors flex items-center justify-center cursor-pointer"
                                aria-label="Close printer"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Paper Platen Slot */}
                    <div className="w-[96%] h-3 bg-zinc-900 border-x-4 border-black z-20 shadow-inner flex items-center justify-between px-3">
                        <div className="w-12 h-1 bg-amber-500/80 rounded-full"></div>
                        <div className="w-12 h-1 bg-amber-500/80 rounded-full"></div>
                    </div>

                    {/* Tractor Feed Paper Sheets */}
                    <div
                        ref={scrollRef}
                        className={`w-[92%] sm:w-[94%] bg-[#f4f9f1] border-x-4 border-b-4 border-black text-black font-mono text-xs shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative transition-all duration-500 overflow-y-auto flex flex-col justify-between ${
                            isTorn ? 'translate-y-1' : ''
                        }`}
                        style={{
                            maxHeight: '62vh',
                            minHeight: '340px'
                        }}
                    >
                        {/* Continuous Green Bar Striped Background */}
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#e8f3e5,#e8f3e5_28px,#ffffff_28px,#ffffff_56px)] opacity-90 pointer-events-none z-0"></div>

                        {/* Perforated Tractor Feed Margins */}
                        <div className="flex w-full min-h-full relative z-10">
                            {/* Left Hole Strip */}
                            <div className={`w-6 sm:w-8 border-r border-dashed border-emerald-800/30 flex flex-col items-center py-2 gap-3 shrink-0 select-none bg-emerald-100/50 transition-all duration-500 ${
                                stripsPeeled ? 'opacity-20 translate-x-[-12px]' : 'opacity-100'
                            }`}>
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-950/80 border border-emerald-700/40 shadow-inner"></div>
                                ))}
                            </div>

                            {/* Main Document Content */}
                            <div className="flex-1 p-4 sm:p-6 overflow-x-auto space-y-1 font-mono">
                                {visibleLines.map((line, idx) => (
                                    <div key={idx} className="leading-relaxed">
                                        {line}
                                    </div>
                                ))}
                            </div>

                            {/* Right Hole Strip */}
                            <div className={`w-6 sm:w-8 border-l border-dashed border-emerald-800/30 flex flex-col items-center py-2 gap-3 shrink-0 select-none bg-emerald-100/50 transition-all duration-500 ${
                                stripsPeeled ? 'opacity-20 translate-x-[12px]' : 'opacity-100'
                            }`}>
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-950/80 border border-emerald-700/40 shadow-inner"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Perforated Edge & Interactive Controls */}
                    <div className="w-[92%] sm:w-[94%] bg-zinc-200 border-4 border-black border-t-0 p-3 rounded-b-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-30 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            {!stripsPeeled && isTorn && (
                                <button
                                    onClick={handleTearStrips}
                                    className="px-3 py-1.5 bg-emerald-300 hover:bg-emerald-400 text-black border-2 border-black font-pixel text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer"
                                    title="Peel off tractor feed hole strips"
                                >
                                    <span className="material-symbols-outlined text-sm">content_cut</span>
                                    <span>Peel Tractor Margins</span>
                                </button>
                            )}
                            {stripsPeeled && (
                                <span className="font-pixel text-xs text-emerald-800 font-bold uppercase flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                    Tractor Strips Peeled!
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDownload}
                                className="px-5 py-2 bg-retro-yellow hover:bg-yellow-400 text-black border-2 border-black font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] flex items-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-sm">download</span>
                                <span>Take Printed CV</span>
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-white text-black hover:bg-zinc-100 border-2 border-black font-pixel text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DotMatrixPrinter;
