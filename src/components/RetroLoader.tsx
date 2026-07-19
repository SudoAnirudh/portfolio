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

            // Mix wave types to get a rich, slightly organ-like retro tone
            osc.type = index % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            // Decay envelope
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now);
            osc.stop(now + 1.8);
        });
    } catch (e) {
        // Fallback silently if audio context is blocked
    }
};

const RetroLoader = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const [helloOffset, setHelloOffset] = useState(400);
    const [helloFilled, setHelloFilled] = useState(false);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Only run on the very first page load of the session
        const hasBooted = sessionStorage.getItem('portfolio-booted');
        if (hasBooted === 'true') {
            setShowLoader(false);
            return;
        }

        // Show the loader and disable scrolling on page body during boot
        setShowLoader(true);
        document.body.classList.add('overflow-hidden');

        // Timing flow:
        // Step 1 (Blinking Floppy Disk): 0s - 0.8s
        // Step 2 (Happy Mac + Chime): 0.8s - 1.6s
        // Step 3 (Welcome dialog + Progress Bar): 1.6s - 2.8s
        // Step 4 (Cursive hello draw): 2.8s - 4.2s
        // Step 5 (Fade out): 4.2s - 4.8s

        const t1 = setTimeout(() => {
            setStep(2);
            playMacChime();
        }, 800);

        const t2 = setTimeout(() => {
            setStep(3);
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
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    if (!showLoader) return null;

    return (
        <div
            className={`fixed inset-0 z-50 bg-[#e0dbcd] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
            }`}
        >
            {/* Retro CRT Scanlines & Vignette */}
            <div className="absolute inset-0 pointer-events-none z-40 bg-[linear-gradient(rgba(0,0,0,0.03)_50%,rgba(0,0,0,0.08)_50%)] bg-[length:100%_3px]"></div>
            <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.12)_100%)]"></div>

            {/* Screen Content Window */}
            <div className="relative flex flex-col items-center justify-center w-full h-full select-none">
                {step === 1 && (
                    <div className="flex flex-col items-center gap-4 animate-[fadeIn_0.2s_ease-out]">
                        {/* Neubrutalist Pixel Floppy Disk */}
                        <div className="w-24 h-24 border-4 border-black bg-[#f4efe3] rounded-lg p-2.5 flex flex-col justify-between shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                            <div className="w-full h-5 border-b-2 border-black flex justify-end px-1">
                                <div className="w-6 h-full bg-black rounded-b"></div>
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <span className="font-pixel text-4xl font-bold text-black animate-blink">?</span>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col items-center gap-4 animate-[bounce_0.8s_infinite]">
                        {/* Neubrutalist Smiling Happy Mac */}
                        <div className="w-28 h-32 border-4 border-black bg-[#ded9cd] rounded-lg p-2 flex flex-col items-center justify-between shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                            <div className="w-full h-16 border-4 border-black bg-[#f4efe3] rounded flex items-center justify-center p-1.5 relative overflow-hidden shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15)]">
                                <div className="flex flex-col items-center justify-center gap-1 text-black">
                                    <div className="flex gap-3">
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                    </div>
                                    <div className="w-5 h-2 border-b-2 border-black rounded-b-full"></div>
                                </div>
                            </div>
                            <div className="w-14 h-1.5 bg-black rounded"></div>
                            <div className="text-[7.5px] font-mono font-bold tracking-widest text-black/75 uppercase">
                                Mac 128k
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="border-4 border-black p-1 bg-[#ded9cd] shadow-[6px_6px_0_0_rgba(0,0,0,1)] animate-[scaleUp_0.25s_cubic-bezier(0.34,1.56,0.64,1)] max-w-sm w-11/12">
                        <div className="border-2 border-black p-6 sm:p-8 flex flex-col items-center gap-6 bg-[#ded9cd]">
                            <h1 className="font-pixel text-3xl sm:text-4xl text-black tracking-tight text-center leading-none">
                                Welcome to Macintosh.
                            </h1>
                            <div className="w-full h-6 border-4 border-black bg-white p-0.5 relative overflow-hidden">
                                <div
                                    className="h-full bg-black transition-all duration-[1100ms] ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="flex flex-col items-center justify-center w-full max-w-md px-6 animate-[fadeIn_0.3s_ease-out]">
                        <svg viewBox="0 0 300 120" className="w-full text-black overflow-visible font-cursive">
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
