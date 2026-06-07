"use client";
import React, { useState, useEffect } from 'react';
import { updateTrashState } from '@/hooks/useSectionVisibility';

const playCrunchSound = () => {
    try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        
        // Synthesize an 8-bit crunch sound (burst of white noise with lowpass decay)
        const bufferSize = ctx.sampleRate * 0.45;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate random noise
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        // Lowpass filter modulation
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.4);
        
        // Rapid volume decay
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        noise.start();
    } catch (e) {
        console.error("Audio Context failed to start:", e);
    }
};

const playRestoreSound = () => {
    try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        
        // Synthesize a retro "success/restore" chime
        const now = ctx.currentTime;
        
        const playTone = (freq: number, startTime: number, duration: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine'; // 8-bit triangle/sine feel
            osc.frequency.setValueAtTime(freq, startTime);
            
            gain.gain.setValueAtTime(0.15, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(startTime);
            osc.stop(startTime + duration);
        };
        
        // Upward arpeggio
        playTone(330, now, 0.15); // E4
        playTone(440, now + 0.08, 0.15); // A4
        playTone(554, now + 0.16, 0.25); // C#5
    } catch (e) {
        console.error("Audio Context failed to start:", e);
    }
};

const RecycleBin = () => {
    const [trashedSections, setTrashedSections] = useState<string[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== 'undefined') {
            const trashed = JSON.parse(localStorage.getItem('trashed-sections') || '[]');
            setTrashedSections(trashed);
            updateTrashState(trashed);
        }

        // Listen for internal resets/modifications
        const syncState = (e: Event) => {
            const trashedIds = (e as CustomEvent).detail.trashedIds;
            setTrashedSections(trashedIds);
            localStorage.setItem('trashed-sections', JSON.stringify(trashedIds));
        };
        window.addEventListener('trash-update', syncState);
        return () => window.removeEventListener('trash-update', syncState);
    }, []);

    if (!isMounted) return null;

    const isEmpty = trashedSections.length === 0;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const sectionId = e.dataTransfer.getData('text/plain');
        
        if (sectionId && !trashedSections.includes(sectionId)) {
            const updated = [...trashedSections, sectionId];
            setTrashedSections(updated);
            localStorage.setItem('trashed-sections', JSON.stringify(updated));
            updateTrashState(updated);
            playCrunchSound();
        }
    };

    const handleEmptyTrash = () => {
        setTrashedSections([]);
        localStorage.setItem('trashed-sections', JSON.stringify([]));
        updateTrashState([]);
        playCrunchSound();
        setIsOpen(false);
    };

    const handleRestoreAll = () => {
        setTrashedSections([]);
        localStorage.setItem('trashed-sections', JSON.stringify([]));
        updateTrashState([]);
        playRestoreSound();
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Recycle Bin Icon in Bottom Left */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 left-6 z-[9990] flex flex-col items-center gap-1.5 p-3 cursor-pointer select-none group transition-all duration-200 border-2 border-dashed ${
                    isDragOver 
                        ? 'border-retro-yellow bg-retro-yellow/10 scale-110 shadow-[0_0_15px_rgba(253,224,71,0.4)]' 
                        : 'border-transparent hover:bg-black/5'
                }`}
            >
                {/* Custom Pixel Art Recycle Bin SVG */}
                <div className={`transition-transform duration-200 ${isDragOver ? 'animate-bounce' : 'group-hover:scale-105'}`}>
                    <svg width="40" height="40" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="pixel-art">
                        {/* Lid Top */}
                        <path d="M6 1h4v1H6V1z" fill="black" />
                        <path d="M5 2h6v1H5V2z" fill={isDragOver ? "#FDE047" : "#E4E4E7"} />
                        {/* Lid Flaps */}
                        <path d="M2 3h12v1H2V3z" fill="black" />
                        <path d="M3 4h10v1H3V4z" fill={isDragOver ? "#FDE047" : "#A1A1AA"} />
                        
                        {/* Can Body Outline */}
                        <path d="M3 5h10v10H3V5z" fill="black" />
                        
                        {/* Can Body Fill */}
                        <path d="M4 6h8v8H4V6z" fill={isDragOver ? "#FEF08A" : "#D4D4D8"} />
                        
                        {/* Metal Ridges */}
                        <path d="M5 8h1v5H5V8z" fill="black" opacity="0.25" />
                        <path d="M7 8h1v5H7V8z" fill="black" opacity="0.25" />
                        <path d="M9 8h1v5H9V8z" fill="black" opacity="0.25" />
                        <path d="M11 8h1v5h-1V8z" fill="black" opacity="0.25" />

                        {/* Paper overflows if trash is NOT empty */}
                        {!isEmpty && (
                            <>
                                <rect x="5" y="0" width="2" height="2" fill="white" stroke="black" strokeWidth="0.5" />
                                <rect x="9" y="1" width="2" height="2" fill="#E4E4E7" stroke="black" strokeWidth="0.5" />
                            </>
                        )}
                    </svg>
                </div>

                <span className="font-pixel text-[10px] sm:text-xs text-black uppercase tracking-wider bg-white/80 px-1 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    Recycle Bin
                </span>

                {/* Counter Badge if full */}
                {!isEmpty && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white font-pixel text-[8px] px-1.5 py-0.5 rounded-full border border-black animate-pulse shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        {trashedSections.length}
                    </div>
                )}
            </div>

            {/* Retro Dialogue Box Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs">
                    <div className="bg-zinc-200 border-4 border-black p-4 max-w-sm w-full mx-4 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                        {/* Window Title Bar */}
                        <div className="bg-retro-charcoal text-white font-pixel text-xs p-2 flex items-center justify-between border-b-4 border-black mb-4 select-none">
                            <span>C:\RECYCLE_BIN.EXE</span>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="w-5 h-5 bg-red-500 border-2 border-white/20 text-white font-bold flex items-center justify-center hover:bg-red-600 active:scale-95"
                            >
                                X
                            </button>
                        </div>

                        {/* Dialogue Body */}
                        <div className="font-pixel text-xs text-black space-y-4 p-2">
                            <div className="flex gap-4 items-start">
                                {/* Large Pixel Art Trash Warning */}
                                <div className="shrink-0">
                                    <svg width="48" height="48" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1" y="1" width="14" height="14" fill="#FBBF24" stroke="black" strokeWidth="1" />
                                        {/* Warning Symbol */}
                                        <rect x="7" y="3" width="2" height="6" fill="black" />
                                        <rect x="7" y="10" width="2" height="2" fill="black" />
                                    </svg>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-sm uppercase">RECYCLE BIN PROPERTIES</h3>
                                    <p>TRASHEED CONTENT: <span className="text-red-600 font-bold">{trashedSections.length} FILE(S)</span></p>
                                    <p className="text-[10px] text-zinc-600 lowercase">
                                        {isEmpty ? "no files are currently in the bin." : trashedSections.map(s => `${s}.sys`).join(', ')}
                                    </p>
                                </div>
                            </div>

                            <p className="border-t-2 border-black/10 pt-3 text-[11px] leading-relaxed">
                                Emptying the recycle bin permanently destroys the sections from your current viewport. Restoring brings them back.
                            </p>

                            {/* Buttons footer */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                <button
                                    onClick={handleEmptyTrash}
                                    disabled={isEmpty}
                                    className="flex-1 px-4 py-2 bg-red-500 text-white border-2 border-black font-bold uppercase hover:bg-red-600 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                >
                                    Empty Trash
                                </button>
                                <button
                                    onClick={handleRestoreAll}
                                    disabled={isEmpty}
                                    className="flex-1 px-4 py-2 bg-retro-green text-black border-2 border-black font-bold uppercase hover:bg-emerald-400 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                >
                                    Restore All
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 bg-zinc-300 text-black border-2 border-black hover:bg-zinc-400 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RecycleBin;
