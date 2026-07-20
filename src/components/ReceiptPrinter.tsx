"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

interface ReceiptPrinterProps {
    onClose: () => void;
}

const DISAPPOINTMENT_QUOTES = [
    "FILE UNDER: 'NEVER GONNA HAPPEN.'",
    "RECYCLED INTO OATMEAL CUP HOLDERS.",
    "CANDIDACY STATUS: SENT TO THE SHADOW REALM.",
    "YEET! CAREER STATUS: CANCELLED.",
    "ERROR 404: INTEREST NOT FOUND.",
    "ANOTHER EXCELLENT RESUME DESTROYED.",
    "YOUR CAREER GOALS HAVE BEEN TRASHED."
];

const ReceiptPrinter: React.FC<ReceiptPrinterProps> = ({ onClose }) => {
    const [visibleLines, setVisibleLines] = useState<React.ReactNode[]>([]);
    const [isPrinting, setIsPrinting] = useState(true);
    const [isTorn, setIsTorn] = useState(false);
    const [isDiscarding, setIsDiscarding] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState("");
    const [showTrashBin, setShowTrashBin] = useState(false);
    const [binLidOpen, setBinLidOpen] = useState(false);
    const [showQuote, setShowQuote] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize Audio Context on mount
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

    const playPrintSound = () => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // White noise buffer for "paper friction" sound
        const bufferSize = ctx.sampleRate * 0.1; // 100ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        // Filter to make it sound more mechanical/low-fi
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        filter.Q.value = 1;

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        noise.start();
        noise.stop(ctx.currentTime + 0.1);
    };

    // Synthesize realistic paper crumpling sound
    const playCrumpleSound = () => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;
        
        // Play 6 separate tiny crackle bursts to simulate paper folding/crushing
        for (let i = 0; i < 6; i++) {
            const timeOffset = now + i * 0.08 + Math.random() * 0.04;
            const duration = 0.05 + Math.random() * 0.05;

            const bufferSize = ctx.sampleRate * duration;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let j = 0; j < bufferSize; j++) {
                data[j] = Math.random() * 2 - 1;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 3000 + Math.random() * 2000;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0, timeOffset);
            gain.gain.linearRampToValueAtTime(0.06, timeOffset + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, timeOffset + duration);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(timeOffset);
            noise.stop(timeOffset + duration);
        }
    };

    // Synthesize mechanical lid slam clonk sound
    const playLidSlamSound = () => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;

        // 1. Low-frequency impact thud
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.2);

        oscGain.gain.setValueAtTime(0.3, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);

        // 2. High-frequency Contact rattle
        const bufferSize = ctx.sampleRate * 0.15;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 600;
        filter.Q.value = 2;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.07, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + 0.15);
    };

    // Construct the full receipt content relative to data
    const fullReceiptLines: React.ReactNode[] = [
        // Header
        <div key="head1" className="text-center font-bold text-xl uppercase tracking-wider">ANIRUDH S</div>,
        <div key="head2" className="text-center text-[10px] uppercase tracking-widest mb-2">{portfolioData.personal.role}</div>,
        <div key="head3" className="text-center text-[10px] border-b-2 border-dashed border-black/50 pb-2 mb-2">
            DATE: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </div>,

        // Experience Header
        <div key="exp_title" className="font-bold border-b border-black inline-block mb-2 mt-2">EXPERIENCE LOG</div>,

        // Experience Items
        ...portfolioData.experience.slice(0, 3).map((exp, i) => (
            <div key={`exp_${i}`} className="flex justify-between items-start mb-2 text-[10px] leading-tight group">
                <div className="flex flex-col">
                    <span className="font-bold uppercase">{exp.role}</span>
                    <span className="opacity-75">{exp.company}</span>
                </div>
                <span className="font-mono">{exp.period.split(' ')[0]}</span>
            </div>
        )),

        // Divider
        <div key="div1" className="border-b-2 border-dashed border-black/50 my-2"></div>,

        // Skills
        <div key="skill_title" className="font-bold mb-1">SKILL SET:</div>,
        <div key="skills" className="text-[10px] uppercase leading-relaxed mb-4">
            {portfolioData.skills.slice(0, 2).map((s) => s.items).join(', ')}
        </div>,

        // Footer
        <div key="total" className="flex justify-between font-bold text-sm border-t-2 border-black pt-2 mt-2">
            <span>TOTAL CANDIDATES:</span>
            <span>1</span>
        </div>,
        <div key="thankyou" className="text-center text-[10px] italic mt-4 mb-2">*** THANK YOU FOR VISITING ***</div>,

        // Barcode
        <div key="barcode" className="h-12 w-full bg-black mt-2 mb-2 flex items-center justify-center overflow-hidden mix-blend-multiply">
            <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,white_2px,white_3px)] opacity-50"></div>
        </div>,

        // Cut marker
        <div key="cut" className="text-center text-[8px] opacity-50 mt-2">- - - - - CUT HERE - - - - -</div>
    ];

    useEffect(() => {
        let currentLine = 0;

        const printInterval = setInterval(() => {
            if (currentLine < fullReceiptLines.length) {
                setVisibleLines(prev => [...prev, fullReceiptLines[currentLine]]);
                playPrintSound();
                currentLine++;

                // Auto scroll to bottom
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            } else {
                clearInterval(printInterval);
                setTimeout(() => {
                    setIsPrinting(false);
                    // Trigger tear off sound/animation
                    playPrintSound(); // one last rip
                    setTimeout(() => setIsTorn(true), 500);
                }, 800);
            }
        }, 300); // Speed of printing

        return () => clearInterval(printInterval);
    }, []);

    const handleDownload = () => {
        window.open(portfolioData.hero.actions.find(a => !a.primary)?.href || "#", "_blank", "noopener,noreferrer");
    };

    const handleDiscard = () => {
        const randomQuote = DISAPPOINTMENT_QUOTES[Math.floor(Math.random() * DISAPPOINTMENT_QUOTES.length)];
        setSelectedQuote(randomQuote);
        
        setIsDiscarding(true);
        setShowTrashBin(true);

        // 1. Play paper crumpling sound immediately
        playCrumpleSound();

        // 2. Open bin lid right before ball entry
        setTimeout(() => {
            setBinLidOpen(true);
        }, 500);

        // 3. Slam lid shut and play impact sound
        setTimeout(() => {
            setBinLidOpen(false);
            playLidSlamSound();
        }, 900);

        // 4. Show sarcastic quote alert card *after* paper lands in trash
        setTimeout(() => {
            setShowQuote(true);
        }, 1100);

        // 5. Close modal after sequence concludes
        setTimeout(() => {
            onClose();
        }, 2900);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-3" onClick={isDiscarding ? undefined : onClose}>
            <div className={`relative flex flex-col items-center w-full max-w-sm sm:max-w-none transition-all duration-700 ${isDiscarding ? 'pointer-events-none' : 'opacity-100 scale-100'}`} onClick={(e) => e.stopPropagation()}>

                {/* Printer Mechanism Head */}
                <div className={`w-full sm:w-80 bg-zinc-800 rounded-t-lg rounded-b-sm p-4 shadow-2xl border-b-8 border-zinc-900 relative z-20 flex flex-col items-center transition-all duration-500 ${isDiscarding ? 'opacity-0 -translate-y-24 scale-95' : 'opacity-100'}`}>
                    <div className="w-3/4 h-2 bg-black rounded-full mb-2 shadow-inner"></div> {/* Ejection slot */}
                    <div className="flex justify-between w-full items-center px-4">
                        <div className="text-zinc-500 font-display text-[10px] tracking-widest uppercase">EPSON-ish</div>
                        <div className={`w-2 h-2 rounded-full ${isPrinting ? 'bg-orange-500 animate-pulse' : 'bg-green-500 shadow-[0_0_10px_#22c55e]'}`}></div>
                    </div>
                </div>

                {/* The Paper Wrapper */}
                <motion.div
                    initial={{ y: 0, rotate: 0, scale: 1, borderRadius: "0%" }}
                    animate={isDiscarding ? {
                        y: [0, -60, 200, 480],
                        x: [0, 25, -15, 0],
                        rotate: [0, -180, 540, 1080],
                        scale: [1, 0.5, 0.25, 0.08],
                        borderRadius: ["0%", "20%", "45%", "50%"],
                        skewX: [0, 15, -10, 0]
                    } : {}}
                    transition={{
                        duration: 1.5,
                        times: [0, 0.35, 0.65, 1],
                        ease: "easeInOut"
                    }}
                    className="relative perspective-1000 z-10 w-[88%] sm:w-72"
                >
                    <div
                        ref={scrollRef}
                        className={`
                            bg-[#fffdd0] w-full shadow-lg text-black font-pixel text-xs transition-all duration-700 ease-out origin-top overflow-hidden
                            ${isTorn ? 'translate-y-4 rotate-1 shadow-2xl' : 'translate-y-0'}
                        `}
                        style={{
                            maxHeight: isDiscarding ? '150px' : '65vh',
                            overflowY: 'auto',
                            scrollbarWidth: 'none',
                        }}
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none mix-blend-multiply"></div>

                        {/* Content */}
                        <div className={`p-6 flex flex-col gap-1 min-h-[300px] transition-opacity duration-300 ${isDiscarding ? 'opacity-0' : 'opacity-100'}`}>
                            {visibleLines.map((line, idx) => (
                                <div key={idx} className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    {line}
                                </div>
                            ))}
                            {/* Extra padding at bottom for physics feel */}
                            <div className="h-12 w-full"></div>
                        </div>

                        {/* Wrinkled Crumpled Ball Overlay */}
                        {isDiscarding && (
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-white/50 to-black/40 pointer-events-none mix-blend-overlay"></div>
                        )}

                        {/* Jagged Bottom */}
                        <div className="sticky bottom-0 left-0 w-full h-4 bg-[#fffdd0] z-20" style={{
                            maskImage: 'linear-gradient(45deg, transparent 33.33%, #000 33.33%, #000 66.67%, transparent 66.67%), linear-gradient(-45deg, transparent 33.33%, #000 33.33%, #000 66.67%, transparent 66.67%)',
                            maskSize: '12px 24px',
                            WebkitMaskImage: 'linear-gradient(45deg, transparent 33.33%, #000 33.33%, #000 66.67%, transparent 66.67%), linear-gradient(-45deg, transparent 33.33%, #000 33.33%, #000 66.67%, transparent 66.67%)',
                            WebkitMaskSize: '12px 24px',
                            transform: 'rotate(180deg) translateY(2px)' // push it down slightly
                        }}></div>
                    </div>
                </motion.div>

                {/* Action Buttons (Appear after tear) */}
                {isTorn && !isDiscarding && (
                    <div className="mt-8 flex flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full justify-center px-4 relative z-30">
                        <button
                            onClick={handleDownload}
                            className="bg-primary text-black px-6 py-3 font-display uppercase font-bold text-xs sm:text-sm border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xl"
                        >
                            <span className="material-symbols-outlined text-sm sm:text-base">download</span>
                            Take It
                        </button>
                        <button
                            onClick={handleDiscard}
                            className="bg-white text-black px-6 py-3 font-display uppercase font-bold text-xs sm:text-sm border-2 border-black hover:bg-zinc-100 transition-colors whitespace-nowrap shadow-lg hover:shadow-xl"
                        >
                            Discard
                        </button>
                    </div>
                )}

                {/* Sarcastic Disappointment Modal Dialog Overlay */}
                <AnimatePresence>
                    {showQuote && selectedQuote && (
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                        >
                            <div className="bg-retro-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-3 max-w-xs text-center transform -rotate-1">
                                <span className="material-symbols-outlined text-4xl text-retro-orange animate-bounce">delete</span>
                                <h3 className="font-display font-bold text-sm uppercase tracking-tighter text-zinc-900 leading-none">
                                    Candidacy Rejected
                                </h3>
                                <p className="font-body text-xs font-semibold text-zinc-700">
                                    {selectedQuote}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Trash Can Overlay */}
                <AnimatePresence>
                    {showTrashBin && (
                        <motion.div
                            initial={{ y: 150, opacity: 0, x: "-50%" }}
                            animate={{ y: 0, opacity: 1, x: "-50%" }}
                            exit={{ y: 150, opacity: 0, x: "-50%" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="fixed bottom-6 left-1/2 z-40 flex flex-col items-center select-none"
                        >
                            {/* Lid */}
                            <motion.div
                                animate={binLidOpen ? { rotate: -45, y: -12, x: -12 } : { rotate: 0, y: 0, x: 0 }}
                                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                                className="w-20 h-4 bg-retro-white border-4 border-black rounded-t shadow-[2px_2px_0_0_rgba(0,0,0,1)] relative origin-bottom-left"
                            >
                                <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-6 h-2 bg-black"></div>
                            </motion.div>
                            
                            {/* Bin Body */}
                            <div className="w-18 h-20 bg-retro-white border-4 border-black rounded-b-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative flex items-center justify-center overflow-hidden">
                                {/* Neubrutalist Vertical Stripes */}
                                <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,black_6px,black_8px)] opacity-10"></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ReceiptPrinter;
