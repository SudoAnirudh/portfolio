"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

interface ReceiptPrinterProps {
    onClose: () => void;
}

const ReceiptPrinter: React.FC<ReceiptPrinterProps> = ({ onClose }) => {
    const prefersReducedMotion = useReducedMotion();
    const [visibleLines, setVisibleLines] = useState<React.ReactNode[]>([]);
    const [faxPhase, setFaxPhase] = useState<'dialing' | 'handshake' | 'receiving' | 'complete'>('dialing');
    const [lcdMessage, setLcdMessage] = useState("DIALING: 1-800-ANIRUDH...");
    const [isMuted, setIsMuted] = useState(true);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize Web Audio API synth
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

    // DTMF Touch-tone dial sound synth
    const playDtmfTone = (f1: number, f2: number) => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.frequency.value = f1;
        osc2.frequency.value = f2;
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.08);
        osc2.stop(now + 0.08);
    };

    // Synthesize fax modem handshake screech (2100Hz CED + noise modulation)
    const playFaxHandshakeSound = () => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;

        // 2100 Hz Answer Tone
        const tone = ctx.createOscillator();
        const toneGain = ctx.createGain();
        tone.type = 'sine';
        tone.frequency.setValueAtTime(2100, now);
        toneGain.gain.setValueAtTime(0.03, now);
        toneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        tone.connect(toneGain);
        toneGain.connect(ctx.destination);
        tone.start(now);
        tone.stop(now + 0.3);

        // Modulated screech noise burst
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1800, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.25);
        filter.Q.value = 4;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, now + 0.1);
        noiseGain.gain.linearRampToValueAtTime(0.035, now + 0.15);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(now + 0.1);
        noise.stop(now + 0.35);
    };

    // Fax scanner line feed chirp
    const playLineChirp = () => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);

        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
    };

    // Construct fax document content
    const faxDocumentLines: React.ReactNode[] = [
        <div key="head1" className="font-mono text-[9px] text-zinc-500 flex justify-between border-b border-zinc-400 pb-1 mb-2">
            <span>[FAX TRANS-REC: #9482-AI]</span>
            <span>PAGE 01 / 01</span>
        </div>,
        <div key="head2" className="font-pixel text-lg font-bold tracking-widest text-zinc-900 text-center uppercase">=== INCOMING FAX TRANSMISSION ===</div>,
        <div key="head3" className="font-pixel text-xs text-zinc-700 text-center uppercase mb-2">SENDER: ANIRUDH S (AI/ML ENGINEER)</div>,
        <div key="line1" className="border-b-2 border-black mb-3"></div>,

        <div key="section_exp" className="font-pixel text-xs font-bold text-zinc-900 uppercase">:: PROFESSIONAL SUMMARY &amp; EXPERIENCE ::</div>,
        ...portfolioData.experience.map((exp, i) => (
            <div key={`exp_${i}`} className="font-mono text-[10px] leading-tight my-1 text-zinc-800">
                <div className="font-bold flex justify-between">
                    <span>• {exp.role}</span>
                    <span className="text-zinc-600">{exp.period.split(' ')[0]}</span>
                </div>
                <div className="text-zinc-600 pl-3">ORGANIZATION: {exp.company}</div>
            </div>
        )),

        <div key="line2" className="border-b border-dashed border-zinc-500 my-2"></div>,
        <div key="section_skills" className="font-pixel text-xs font-bold text-zinc-900 uppercase">:: CORE CAPABILITIES &amp; TECH STACK ::</div>,
        <div key="skills" className="font-mono text-[10px] text-zinc-800 leading-snug">
            Python | PyTorch | TensorFlow | LangChain | FastAPI | Next.js | TypeScript | Kotlin | Docker | Supabase
        </div>,

        <div key="line3" className="border-b border-dashed border-zinc-500 my-2"></div>,
        <div key="total" className="font-mono text-[10px] font-bold flex justify-between text-zinc-900">
            <span>CANDIDATE SUITABILITY MATCH:</span>
            <span>100% [VERIFIED]</span>
        </div>,
        <div key="barcode" className="h-9 w-full bg-zinc-900 my-2 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#fff_2px,#fff_4px)] opacity-90"></div>
        </div>,
        <div key="foot" className="font-mono text-[8px] text-center text-zinc-500 uppercase">*** TRANSMISSION END - 9600 BAUD V.29 OK ***</div>
    ];

    useEffect(() => {
        const hasFaxedInSession = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('fax-printed') === 'true';
        
        if (prefersReducedMotion || hasFaxedInSession) {
            setVisibleLines(faxDocumentLines);
            setFaxPhase('complete');
            setLcdMessage("FAX COMPLETE (100% OK)");
            return;
        }

        // Phase 1: DTMF Dialing Tones
        setFaxPhase('dialing');
        setLcdMessage("DIALING: 1-800-ANIRUDH...");
        playDtmfTone(941, 1336);
        
        const t1 = setTimeout(() => {
            playDtmfTone(770, 1209);
        }, 150);

        const t2 = setTimeout(() => {
            playDtmfTone(852, 1477);
            setFaxPhase('handshake');
            setLcdMessage("CONNECTING (9600 BAUD)...");
            playFaxHandshakeSound();
        }, 400);

        // Phase 2: Receiving & Line-by-Line Sweep
        let currentLine = 0;
        const t3 = setTimeout(() => {
            setFaxPhase('receiving');
            setLcdMessage("RECEIVING PAGE 1/1...");

            const scanInterval = setInterval(() => {
                if (currentLine < faxDocumentLines.length) {
                    setVisibleLines(prev => [...prev, faxDocumentLines[currentLine]]);
                    playLineChirp();
                    currentLine++;

                    if (scrollRef.current) {
                        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                    }
                } else {
                    clearInterval(scanInterval);
                    if (typeof sessionStorage !== 'undefined') {
                        sessionStorage.setItem('fax-printed', 'true');
                    }
                    setTimeout(() => {
                        setFaxPhase('complete');
                        setLcdMessage("FAX RECEIVED (PAGE 1 OK)");
                    }, 300);
                }
            }, 200);
        }, 900);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [prefersReducedMotion]);

    const handleDownload = () => {
        window.open(portfolioData.hero.actions.find(a => !a.primary)?.href || "#", "_blank", "noopener,noreferrer");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3" onClick={onClose}>
            <div className="relative flex flex-col items-center w-full max-w-md" onClick={(e) => e.stopPropagation()}>

                {/* 90s Retro Fax Machine Chassis */}
                <div className="w-full bg-[#36393e] border-4 border-black rounded-t-2xl p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative z-20 flex flex-col gap-3">
                    
                    {/* Fax Control Bar & LCD Screen */}
                    <div className="flex items-center justify-between gap-3 bg-zinc-900 p-3 rounded-xl border-2 border-zinc-700 shadow-inner">
                        
                        {/* Green LCD Backlit Matrix Display */}
                        <div className="flex-1 bg-[#102a1c] border-2 border-[#1f4a32] p-2 rounded flex items-center gap-2 overflow-hidden shadow-inner">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                            <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider truncate">
                                {lcdMessage}
                            </span>
                        </div>

                        {/* Mute Toggle */}
                        <button
                            type="button"
                            onClick={() => setIsMuted(!isMuted)}
                            className="px-2.5 py-1 bg-zinc-800 text-zinc-200 border border-zinc-600 rounded text-[10px] font-pixel uppercase font-bold hover:bg-zinc-700 transition-colors cursor-pointer shrink-0"
                        >
                            {isMuted ? '🔇 Muted' : '🔊 Audio On'}
                        </button>
                    </div>

                    {/* Fax Machine Keypad & Telephone Receiver Indicator */}
                    <div className="flex items-center justify-between text-[9px] font-pixel text-zinc-400 uppercase tracking-widest px-1">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-retro-yellow text-sm">fax</span>
                            <span>PANASONX FAX-3000 // SUPER G3</span>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-[8px] text-emerald-400">
                            <span>ONLINE: 9600 BPS</span>
                        </div>
                    </div>
                </div>

                {/* Fax Receiver Paper Feed Tray */}
                <div className="w-[96%] relative z-10">
                    <div
                        ref={scrollRef}
                        className="bg-[#f7f8fa] border-x-4 border-b-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-300"
                        style={{ maxHeight: '65vh', overflowY: 'auto' }}
                    >
                        {/* Thermal Fax Paper Texture Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-200/40 via-transparent to-zinc-300/30 pointer-events-none"></div>

                        {/* Scanner Laser Sweep Bar (Visible while receiving) */}
                        {faxPhase === 'receiving' && (
                            <motion.div
                                animate={{ y: [0, 400] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 w-full h-1 bg-red-500 shadow-[0_0_12px_#ef4444] z-20 pointer-events-none"
                            />
                        )}

                        {/* Document Content */}
                        <div className="p-6 font-mono relative z-10 space-y-1">
                            {visibleLines.map((line, idx) => (
                                <div key={idx} className="animate-in fade-in duration-200">
                                    {line}
                                </div>
                            ))}
                            <div className="h-6 w-full" />
                        </div>
                    </div>
                </div>

                {/* Completion Action Bar */}
                {faxPhase === 'complete' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 flex flex-wrap items-center justify-center gap-3 z-30 w-full"
                    >
                        <button
                            onClick={handleDownload}
                            className="px-5 py-2.5 bg-retro-yellow text-black font-pixel text-xs sm:text-sm uppercase font-bold border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-1.5"
                        >
                            <span className="material-symbols-outlined text-base">download</span>
                            <span>Take Fax (Download PDF)</span>
                        </button>

                        <button
                            onClick={() => {
                                setVisibleLines([]);
                                setFaxPhase('dialing');
                                if (typeof sessionStorage !== 'undefined') {
                                    sessionStorage.removeItem('fax-printed');
                                }
                            }}
                            className="px-4 py-2.5 bg-retro-green text-black font-pixel text-xs sm:text-sm uppercase font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-1.5"
                        >
                            <span className="material-symbols-outlined text-base">refresh</span>
                            <span>Redial Fax</span>
                        </button>

                        <button
                            onClick={onClose}
                            className="px-4 py-2.5 bg-white text-zinc-900 font-pixel text-xs sm:text-sm uppercase font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-100 transition-all cursor-pointer flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-base">close</span>
                            <span>Close</span>
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ReceiptPrinter;
