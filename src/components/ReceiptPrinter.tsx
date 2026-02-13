"use client";
import React, { useEffect, useState, useRef } from 'react';
import { portfolioData } from '@/data/portfolio';

interface ReceiptPrinterProps {
    onClose: () => void;
}

const ReceiptPrinter: React.FC<ReceiptPrinterProps> = ({ onClose }) => {
    const [visibleLines, setVisibleLines] = useState<React.ReactNode[]>([]);
    const [isPrinting, setIsPrinting] = useState(true);
    const [isTorn, setIsTorn] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize Audio Context on mount
    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playPrintSound = () => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const oscillator = ctx.createOscillator();
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
        window.open(portfolioData.hero.actions.find(a => !a.primary)?.href || "#", "_blank");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>

                {/* Printer Mechanism Head */}
                <div className="w-80 bg-zinc-800 rounded-t-lg rounded-b-sm p-4 shadow-2xl border-b-8 border-zinc-900 relative z-20 flex flex-col items-center">
                    <div className="w-64 h-2 bg-black rounded-full mb-2 shadow-inner"></div> {/* Ejection slot */}
                    <div className="flex justify-between w-full items-center px-4">
                        <div className="text-zinc-500 font-display text-[10px] tracking-widest uppercase">EPSON-ish</div>
                        <div className={`w-2 h-2 rounded-full ${isPrinting ? 'bg-orange-500 animate-pulse' : 'bg-green-500 shadow-[0_0_10px_#22c55e]'}`}></div>
                    </div>
                </div>

                {/* The Paper Wrapper */}
                <div className="relative perspective-1000 z-10 w-72">
                    <div
                        ref={scrollRef}
                        className={`
                            bg-[#fffdd0] w-full shadow-lg text-black font-pixel text-xs transition-all duration-700 ease-out origin-top
                            ${isTorn ? 'translate-y-4 rotate-1 shadow-2xl' : 'translate-y-0'}
                        `}
                        style={{
                            maxHeight: '70vh',
                            overflowY: 'auto',
                            scrollbarWidth: 'none',
                        }}
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none mix-blend-multiply"></div>

                        {/* Content */}
                        <div className="p-6 flex flex-col gap-1 min-h-[300px]">
                            {visibleLines.map((line, idx) => (
                                <div key={idx} className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    {line}
                                </div>
                            ))}
                            {/* Extra padding at bottom for physics feel */}
                            <div className="h-12 w-full"></div>
                        </div>

                        {/* Jagged Bottom */}
                        <div className="sticky bottom-0 left-0 w-full h-4 bg-[#fffdd0] z-20" style={{
                            maskImage: 'linear-gradient(45deg, transparent 33.33%, #000 33.33%, #000 66.67%, transparent 66.67%), linear-gradient(-45deg, transparent 33.33%, #000 33.33%, #000 66.67%, transparent 66.67%)',
                            maskSize: '12px 24px',
                            WebkitMaskImage: 'linear-gradient(45deg, transparent 33.33%, #000 33.33%, #000 66.67%, transparent 66.67%), linear-gradient(-45deg, transparent 33.33%, #000 33.33%, #000 66.67%, transparent 66.67%)',
                            WebkitMaskSize: '12px 24px',
                            transform: 'rotate(180deg) translateY(2px)' // push it down slightly
                        }}></div>
                    </div>
                </div>

                {/* Action Buttons (Appear after tear) */}
                {isTorn && (
                    <div className="absolute -right-32 top-10 flex flex-col gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
                        <button
                            onClick={handleDownload}
                            className="bg-primary text-black px-6 py-3 font-display uppercase text-sm border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">download</span>
                            Take It
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-white text-black px-6 py-2 font-display uppercase text-xs border-2 border-black hover:bg-zinc-100 transition-colors"
                        >
                            Discard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReceiptPrinter;
