"use client";

import React, { useState, useEffect } from 'react';

// Shared Web Audio API caching to prevent crashes and resource leaks
let sharedAudioCtx: AudioContext | null = null;

const getAudioContext = () => {
    if (typeof window === 'undefined') return null;
    if (!sharedAudioCtx) {
        const AudioCtor = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtor) sharedAudioCtx = new AudioCtor();
    }
    if (sharedAudioCtx?.state === 'suspended') sharedAudioCtx.resume();
    return sharedAudioCtx;
};

// Play classic Macintosh startup C-major chime
const playMacChime = () => {
    try {
        const audioCtx = getAudioContext();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        // Classic chime chord: C3, C4, E4, G4, C5
        const notes = [130.81, 261.63, 329.63, 392.00, 523.25];

        notes.forEach((freq, index) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            // Mix wave types to get a rich, warm retro tone
            osc.type = index % 2 === 0 ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq, now);

            // Stagger start times slightly for an arpeggiated strum effect (30ms per note)
            const noteStart = now + index * 0.03;

            gain.gain.setValueAtTime(0, now);
            // Linear fade-in to prevent harsh start clicks
            gain.gain.linearRampToValueAtTime(0.08, noteStart + 0.02);
            // Smooth exponential decay
            gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 2.0);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(noteStart);
            osc.stop(noteStart + 2.0);
        });
    } catch (e) {
        // Fallback silently if audio context is blocked
    }
};

const SARCASTIC_SUBTITLES = [
    "(Now 99.9% bug-free!)",
    "(Compiling excuses...)",
    "(Optimized for dial-up connection)",
    "(AI-powered, whatever that means...)",
    "(Yes, another developer portfolio)",
    "(Loading brain cells...)"
];

const RetroLoader = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const [helloOffset, setHelloOffset] = useState(400);
    const [helloFilled, setHelloFilled] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [subtitle, setSubtitle] = useState("");

    useEffect(() => {
        // Only run on the very first page load of the session
        const hasBooted = sessionStorage.getItem('portfolio-booted');
        if (hasBooted === 'true') {
            setShowLoader(false);
            return;
        }

        // Pick a random sarcastic subtitle
        const randomSubtitle = SARCASTIC_SUBTITLES[Math.floor(Math.random() * SARCASTIC_SUBTITLES.length)];
        setSubtitle(randomSubtitle);

        // Show the loader and disable scrolling on page body during boot
        setShowLoader(true);
        document.body.classList.add('overflow-hidden');

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            // Calculate mouse position relative to center of screen, bounded between -1 and 1
            const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
            const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Timing flow:
        // Step 1 (Blinking Floppy Disk): 0s - 0.8s
        // Step 2 (Happy Mac + Chime): 0.8s - 1.6s
        // Step 3 (Welcome dialog + Progress Bar): 1.6s - 2.8s
        // Step 4 (Cursive hello draw): 2.8s - 4.2s
        // Step 5 (Fade out): 4.2s - 4.8s

        const t1 = setTimeout(() => {
            setStep(2);
        }, 800);

        const t2 = setTimeout(() => {
            setStep(3);
            playMacChime();
            // Trigger progressive bar filling
            setTimeout(() => setProgress(100), 50);
        }, 1600);

        const t3 = setTimeout(() => {
            setStep(4);
            // Trigger cursive drawing
            setTimeout(() => setHelloOffset(0), 50);
            // Fill cursive text after it finishes drawing the strokes
            setTimeout(() => setHelloFilled(true), 900);
        }, 2800);

        const t4 = setTimeout(() => {
            setIsFading(true);
        }, 4200);

        const t5 = setTimeout(() => {
            sessionStorage.setItem('portfolio-booted', 'true');
            document.body.classList.remove('overflow-hidden');
            setShowLoader(false);
        }, 4800);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    // Get dynamic 3D tilt transform style
    const getTiltStyle = (strength = 1) => {
        const rotateX = -mousePos.y * 15 * strength;
        const rotateY = mousePos.x * 15 * strength;
        return {
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
            transition: 'transform 0.1s ease-out',
            transformStyle: 'preserve-3d' as const,
        };
    };

    if (!showLoader) return null;

    return (
        <div
            className={`fixed inset-0 z-50 bg-retro-charcoal flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
            }`}
        >
            {/* Retro CRT Scanlines & Vignette */}
            <div className="absolute inset-0 pointer-events-none z-40 bg-[linear-gradient(rgba(0,0,0,0.03)_50%,rgba(0,0,0,0.08)_50%)] bg-[length:100%_3px]"></div>
            <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.12)_100%)]"></div>

            {/* Screen Content Window with 3D perspective setup */}
            <div 
                className="relative flex flex-col items-center justify-center w-full h-full select-none"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
                {step === 1 && (
                    <div 
                        style={getTiltStyle(0.8)}
                        className="flex flex-col items-center gap-4 animate-[fadeIn_0.2s_ease-out]"
                    >
                        {/* Neubrutalist Pixel Floppy Disk */}
                        <div 
                            className="w-24 h-24 border-4 border-black bg-retro-white rounded-lg p-2.5 flex flex-col justify-between shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="w-full h-5 border-b-2 border-black flex justify-end px-1" style={{ transform: 'translateZ(10px)' }}>
                                <div className="w-6 h-full bg-retro-yellow rounded-b border-l-2 border-r-2 border-black"></div>
                            </div>
                            <div className="flex-1 flex items-center justify-center" style={{ transform: 'translateZ(20px)' }}>
                                <span className="font-pixel text-4xl font-bold text-black animate-blink">?</span>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div 
                        style={getTiltStyle(0.9)}
                        className="flex flex-col items-center gap-4 animate-[bounce_0.8s_infinite]"
                    >
                        {/* Neubrutalist Smiling Happy Mac */}
                        <div 
                            className="w-28 h-32 border-4 border-black bg-retro-white rounded-lg p-2 flex flex-col items-center justify-between shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div 
                                className="w-full h-16 border-4 border-black bg-retro-cream rounded flex items-center justify-center p-1.5 relative overflow-hidden shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15)]"
                                style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                            >
                                <div className="flex flex-col items-center justify-center gap-1 text-black" style={{ transform: 'translateZ(10px)' }}>
                                    <div className="flex gap-3">
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                    </div>
                                    <div className="w-5 h-2 border-b-2 border-black rounded-b-full"></div>
                                </div>
                            </div>
                            <div className="w-14 h-1.5 bg-black rounded" style={{ transform: 'translateZ(10px)' }}></div>
                            <div className="text-[7.5px] font-mono font-bold tracking-widest text-black/75 uppercase" style={{ transform: 'translateZ(5px)' }}>
                                Mac 128k
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div 
                        style={getTiltStyle(1.2)}
                        className="border-4 border-black p-1 bg-retro-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] animate-[scaleUp_0.25s_cubic-bezier(0.34,1.56,0.64,1)] max-w-sm w-11/12"
                    >
                        <div 
                            className="border-2 border-black p-6 sm:p-8 flex flex-col items-center gap-6 bg-retro-white"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <h1 
                                className="font-display text-xl sm:text-2xl text-black tracking-tight text-center leading-none uppercase"
                                style={{ transform: 'translateZ(20px)' }}
                            >
                                Welcome to Anirudh S.
                            </h1>
                            <p 
                                className="font-pixel text-lg text-black/60 -mt-3 text-center select-none"
                                style={{ transform: 'translateZ(15px)' }}
                            >
                                {subtitle}
                            </p>
                            <div 
                                className="w-full h-6 border-4 border-black bg-retro-cream p-0.5 relative overflow-hidden"
                                style={{ transform: 'translateZ(10px)' }}
                            >
                                <div
                                    className="h-full bg-primary transition-all duration-[1100ms] ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div 
                        style={getTiltStyle(1.0)}
                        className="flex flex-col items-center justify-center w-full max-w-md px-6 animate-[fadeIn_0.3s_ease-out]"
                    >
                        <svg viewBox="0 0 300 120" className="w-full text-retro-yellow overflow-visible font-cursive">
                            <text
                                x="50%"
                                y="60%"
                                textAnchor="middle"
                                fontSize="72"
                                fill={helloFilled ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeDasharray="400"
                                strokeDashoffset={helloOffset}
                                className="transition-all duration-[1100ms] ease-in-out"
                                style={{
                                    transitionProperty: "stroke-dashoffset, fill",
                                    transform: 'translateZ(15px)',
                                }}
                            >
                                hello
                            </text>
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RetroLoader;
