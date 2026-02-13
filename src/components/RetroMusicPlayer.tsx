"use client";
import React, { useState, useRef, useEffect } from 'react';

const PLAYLIST = [
    {
        title: "Chill Lofi Beat",
        artist: "Retro vibes",
        url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
    },
    {
        title: "Synthwave Night",
        artist: "Neon Runner",
        url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1120f29555.mp3?filename=synthwave-80s-110045.mp3"
    },
    {
        title: "Pixel Adventure",
        artist: "8-bit Hero",
        url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=8-bit-arcade-13833.mp3"
    }
];

const RetroMusicPlayer = ({ embedded = false }: { embedded?: boolean }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMinimized, setIsMinimized] = useState(false);

    // Dragging state (only for floating mode)
    const [position, setPosition] = useState({ x: 20, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!embedded) {
            setPosition({ x: window.innerWidth - 320, y: window.innerHeight - 150 });
        }
    }, [embedded]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Autoplay blocked usually:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, volume, currentTrack]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (embedded || (e.target as HTMLElement).closest('.no-drag')) return;
        setIsDragging(true);
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && !embedded) {
            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
        setIsPlaying(true);
    };

    return (
        <div
            className={`${embedded ? 'w-full mt-6 relative' : 'fixed z-[9990] w-[300px]'} flex flex-col shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] font-pixel group`}
            style={embedded ? {} : {
                left: position.x,
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'auto'
            }}
            onMouseDown={handleMouseDown}
        >
            <audio
                ref={audioRef}
                src={PLAYLIST[currentTrack].url}
                onEnded={nextTrack}
            />

            {/* Header / Title Bar */}
            <div className="h-8 bg-zinc-800 border-2 border-black flex items-center justify-between px-2 cursor-grab active:cursor-grabbing select-none relative">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-700 to-zinc-800 pointer-events-none"></div>
                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-3 h-3 bg-retro-orange rounded-full border border-black animate-pulse"></div>
                    <span className="text-retro-white text-xs tracking-widest uppercase font-bold text-shadow">WINAMP_Clone.exe</span>
                </div>
                <div className="relative z-10 flex gap-1 no-drag">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="w-4 h-4 bg-zinc-400 border border-black hover:bg-zinc-200 flex items-center justify-center text-[8px]"
                    >_</button>
                    <button className="w-4 h-4 bg-red-500 border border-black hover:bg-red-400 flex items-center justify-center text-[8px] text-white">X</button>
                </div>
                {/* Horizontal Scanlines Overlay on bar */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
            </div>

            {/* Main LCD Display Area */}
            {!isMinimized && (
                <div className="bg-zinc-900 border-x-2 border-b-2 border-black p-3 space-y-3 relative overflow-hidden">

                    {/* LCD Screen */}
                    <div className="bg-[#1a1a1a] border-inset border-2 border-zinc-600 p-2 relative h-16 flex items-center justify-center overflow-hidden shadow-inner">
                        <div className="absolute inset-0 bg-retro-green/5 animate-pulse pointer-events-none"></div>
                        <div className="w-full text-center">
                            <p className="text-retro-green font-pixel text-lg tracking-widest animate-marquee whitespace-nowrap">
                                {isPlaying ? `▶ NOW PLAYING: ${PLAYLIST[currentTrack].title} - ${PLAYLIST[currentTrack].artist}` : "|| PAUSED"} ***
                                {isPlaying ? ` ${PLAYLIST[currentTrack].title} ` : ""}
                            </p>
                            <div className="flex justify-between text-[10px] text-retro-green/70 mt-1 uppercase font-mono">
                                <span>{isPlaying ? "STEREO" : "MONO"}</span>
                                <span>128 KBPS</span>
                                <span>44 KHZ</span>
                            </div>
                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between no-drag">
                        {/* Playback Controls */}
                        <div className="flex gap-1">
                            <button onClick={prevTrack} className="w-8 h-8 bg-zinc-300 border-b-4 border-r-4 border-zinc-600 active:border-0 active:translate-y-1 active:bg-zinc-400 flex items-center justify-center hover:bg-white text-zinc-900">
                                <span className="material-symbols-outlined text-lg">skip_previous</span>
                            </button>
                            <button onClick={togglePlay} className="w-10 h-10 bg-zinc-300 border-b-4 border-r-4 border-zinc-600 active:border-0 active:translate-y-1 active:bg-zinc-400 flex items-center justify-center hover:bg-white text-zinc-900">
                                <span className="material-symbols-outlined text-xl">{isPlaying ? "pause" : "play_arrow"}</span>
                            </button>
                            <button onClick={nextTrack} className="w-8 h-8 bg-zinc-300 border-b-4 border-r-4 border-zinc-600 active:border-0 active:translate-y-1 active:bg-zinc-400 flex items-center justify-center hover:bg-white text-zinc-900">
                                <span className="material-symbols-outlined text-lg">skip_next</span>
                            </button>
                        </div>

                        {/* Volume Slider - Retro Bar Style */}
                        <div className="flex flex-col gap-1 w-20">
                            <label className="text-[8px] text-zinc-500 uppercase font-bold">Volume</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-full h-2 bg-zinc-700 appearance-none rounded-none accent-retro-green cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RetroMusicPlayer;
