"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

interface FaxMachineProps {
    onClose: () => void;
}

const FaxMachine: React.FC<FaxMachineProps> = ({ onClose }) => {
    const prefersReducedMotion = useReducedMotion();
    const [phase, setPhase] = useState<'dialing' | 'handshake' | 'transmitting' | 'complete'>('dialing');
    const [progress, setProgress] = useState(0);
    const [visibleLines, setVisibleLines] = useState<React.ReactNode[]>([]);
    const [isMuted, setIsMuted] = useState(true);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Web Audio API Fax Modem Handshake & Screech Synthesizer
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

    // Synthesize classic 14.4k fax dial tones and screech noise
    const playDialTone = () => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;
        // DTMF Dual Tone Multi-Frequency (Dial Beep)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.frequency.setValueAtTime(941, now); // 941Hz
        osc2.frequency.setValueAtTime(1336, now); // 1336Hz

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.1);
        osc2.stop(now + 0.1);
    };

    const playFaxScreechSound = () => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;
        const duration = 0.15;

        // Carrier frequency pitch sweep screech
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(2100, now);
        osc.frequency.linearRampToValueAtTime(1200, now + duration);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
    };

    const fullFaxDocument: React.ReactNode[] = [
        <div key="h1" className="text-center font-mono font-bold text-sm sm:text-base tracking-widest text-zinc-900 border-b-2 border-black pb-1 mb-2 uppercase">
            *** INCOMING TELEFAX TRANSMISSION ***
        </div>,
        <div key="h2" className="flex justify-between font-mono text-[9px] text-zinc-800 border-b border-zinc-400 pb-1 mb-3">
            <span>TO: RECRUITER / SELECTION COMMITTEE</span>
            <span>DATE: {new Date().toLocaleDateString()}</span>
        </div>,
        <div key="h3" className="flex justify-between font-mono text-[9px] text-zinc-800 border-b border-zinc-400 pb-2 mb-3">
            <span>FROM: ANIRUDH S (+91 AI-ENGINEER)</span>
            <span>PAGES: 01 / 01</span>
        </div>,

        <div key="title" className="text-center font-mono font-extrabold text-lg sm:text-xl text-black tracking-tight my-2 uppercase">
            ANIRUDH S  ·  CURRICULUM VITAE
        </div>,
        <div key="role" className="text-center font-mono text-xs font-bold text-zinc-800 uppercase mb-3">
            {portfolioData.personal.role}  ·  KOZHIKODE, KL
        </div>,

        <div key="sec1" className="font-mono font-bold text-xs bg-black text-white px-2 py-0.5 mb-1 uppercase tracking-wider">
            1. OBJECTIVE & PROFILE
        </div>,
        <div key="summary" className="font-mono text-[10px] text-zinc-900 leading-snug mb-3">
            {portfolioData.hero.subtext}
        </div>,

        <div key="sec2" className="font-mono font-bold text-xs bg-black text-white px-2 py-0.5 mb-1 uppercase tracking-wider">
            2. INTERNSHIPS & WORK HISTORY
        </div>,
        ...portfolioData.experience.map((exp, i) => (
            <div key={`exp_${i}`} className="mb-2 font-mono text-[10px] text-zinc-900">
                <div className="flex justify-between font-bold">
                    <span>{exp.role.toUpperCase()} @ {exp.company.toUpperCase()}</span>
                    <span>{exp.period}</span>
                </div>
                <div className="text-[9px] text-zinc-700 italic">{exp.description.join(' ')}</div>
            </div>
        )),

        <div key="sec3" className="font-mono font-bold text-xs bg-black text-white px-2 py-0.5 mb-1 mt-2 uppercase tracking-wider">
            3. TECHNICAL COMPETENCIES
        </div>,
        ...portfolioData.skills.slice(0, 3).map((sk, i) => (
            <div key={`sk_${i}`} className="font-mono text-[10px] text-zinc-900 mb-1">
                <span className="font-bold">{sk.category.toUpperCase()}:</span> {sk.items}
            </div>
        )),

        <div key="foot" className="text-center font-mono text-[8px] border-t-2 border-black pt-2 mt-4 text-zinc-700 font-bold uppercase">
            ================ TELEFAX END OF TRANSMISSION · 200x200 FINE DPI ================
        </div>
    ];

    useEffect(() => {
        const hasFaxed = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('fax-received') === 'true';

        if (prefersReducedMotion || hasFaxed) {
            setPhase('complete');
            setProgress(100);
            setVisibleLines(fullFaxDocument);
            return;
        }

        // Phase 1: Dialing (0 - 1.2s)
        const dialTimer = setTimeout(() => {
            playDialTone();
            setPhase('handshake');
        }, 1200);

        // Phase 2: Handshake screech (1.2s - 2.5s)
        const handshakeTimer = setTimeout(() => {
            playFaxScreechSound();
            setPhase('transmitting');
        }, 2500);

        return () => {
            clearTimeout(dialTimer);
            clearTimeout(handshakeTimer);
        };
    }, [prefersReducedMotion]);

    // Phase 3: Transmitting lines
    useEffect(() => {
        if (phase !== 'transmitting') return;

        let lineIdx = 0;
        const total = fullFaxDocument.length;

        const interval = setInterval(() => {
            if (lineIdx < total) {
                setVisibleLines(prev => [...prev, fullFaxDocument[lineIdx]]);
                playFaxScreechSound();
                lineIdx++;
                setProgress(Math.round((lineIdx / total) * 100));

                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            } else {
                clearInterval(interval);
                if (typeof sessionStorage !== 'undefined') {
                    sessionStorage.setItem('fax-received', 'true');
                }
                setPhase('complete');
                setProgress(100);
            }
        }, 200);

        return () => clearInterval(interval);
    }, [phase]);

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
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6"
                onClick={onClose}
            >
                <div
                    className="relative flex flex-col items-center w-full max-w-2xl max-h-[92vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Retro Fax Machine Body Housing */}
                    <div className="w-full bg-zinc-800 text-white border-4 border-black rounded-t-2xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-30 flex flex-col gap-3 shrink-0">
                        {/* Fax Top Bar & LCD Monitor */}
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {/* Telephone Handset Graphic */}
                                <div className="w-8 h-8 bg-zinc-900 rounded-lg border-2 border-zinc-600 flex items-center justify-center text-zinc-300">
                                    <span className="material-symbols-outlined text-lg">call</span>
                                </div>
                                <div>
                                    <h3 className="font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider text-retro-yellow">
                                        PANASONIC KX-FAX 2000
                                    </h3>
                                    <p className="font-mono text-[9px] text-zinc-400">TELEFAX MODEM 14.4k BAUD</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Audio Mute Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setIsMuted(!isMuted)}
                                    className="px-2.5 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-500 rounded text-[10px] font-pixel font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer"
                                    title={isMuted ? "Click to unmute fax modem sounds" : "Mute audio"}
                                >
                                    <span>{isMuted ? '🔇 Muted' : '🔊 Sound On'}</span>
                                </button>

                                <button
                                    onClick={onClose}
                                    className="p-1 bg-red-600 hover:bg-red-700 text-white border border-black rounded transition-colors flex items-center justify-center cursor-pointer"
                                    aria-label="Hang up fax"
                                >
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                        </div>

                        {/* Pixel LCD Display Panel */}
                        <div className="bg-emerald-950 border-2 border-emerald-600 p-2.5 rounded text-emerald-400 font-mono text-xs shadow-inner flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="font-bold tracking-wide uppercase">
                                    {phase === 'dialing' && 'DIALING +91-9000-ANIRUDH...'}
                                    {phase === 'handshake' && 'MODEM HANDSHAKE: 14.4k BAUD OK'}
                                    {phase === 'transmitting' && `RECEIVING FAX... [${progress}%]`}
                                    {phase === 'complete' && 'FAX RECEIVED · 200 DPI OK'}
                                </span>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-bold">{progress}%</span>
                        </div>
                    </div>

                    {/* Thermal Fax Paper Sheet Feeder */}
                    <div
                        ref={scrollRef}
                        className="w-[94%] bg-[#fcfbf7] border-x-4 border-b-4 border-black text-black font-mono text-xs shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative transition-all duration-500 overflow-y-auto min-h-[320px] max-h-[60vh] p-5 sm:p-7 relative"
                    >
                        {/* Laser Scanline Beam Effect */}
                        {phase === 'transmitting' && (
                            <motion.div
                                animate={{ y: [0, 400] }}
                                transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-emerald-500/80 shadow-[0_0_12px_#10b981] z-20 pointer-events-none"
                            />
                        )}

                        {/* Fax Paper High-Contrast Thermal Dither Grid Texture */}
                        <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none"></div>

                        {/* Document Content */}
                        <div className="relative z-10 space-y-1.5">
                            {visibleLines.map((line, idx) => (
                                <div key={idx} className="animate-in fade-in duration-200">
                                    {line}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Fax Machine Tray Controls */}
                    <div className="w-[94%] bg-zinc-800 border-4 border-black border-t-0 p-3 rounded-b-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-30 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px]">
                            <span className="material-symbols-outlined text-sm text-retro-yellow">print</span>
                            <span>THERMAL TELEFAX FEED</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDownload}
                                className="px-5 py-2 bg-retro-yellow hover:bg-yellow-400 text-black border-2 border-black font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] flex items-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-sm">download</span>
                                <span>Grab Faxed CV</span>
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-zinc-700 text-white hover:bg-zinc-600 border-2 border-black font-pixel text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                            >
                                Hang Up
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FaxMachine;
