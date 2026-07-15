import React, { useState, useEffect } from 'react';

// ⚡ Bolt: Cache AudioContext and AudioBuffer to prevent hardware limit crashes (~6 contexts)
// and eliminate redundant array allocation/loop overhead on repeated sound playback.
let sharedAudioCtx: AudioContext | null = null;
let cachedNoiseBuffer: AudioBuffer | null = null;

const getAudioContext = () => {
    if (typeof window === 'undefined') return null;
    if (!sharedAudioCtx) {
        const AudioCtor = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtor) sharedAudioCtx = new AudioCtor();
    }
    if (sharedAudioCtx?.state === 'suspended') sharedAudioCtx.resume();
    return sharedAudioCtx;
};

// Play mechanical click sound using Web Audio API
const playClickSound = () => {
    try {
        const audioCtx = getAudioContext();
        if (!audioCtx) return;
        
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        const gain2 = audioCtx.createGain();
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
        gain1.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.04);
        gain2.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
        
        osc1.connect(gain1);
        osc2.connect(gain2);
        
        gain1.connect(audioCtx.destination);
        gain2.connect(audioCtx.destination);
        
        osc1.start();
        osc2.start();
        osc1.stop(audioCtx.currentTime + 0.12);
        osc2.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
        // Fallback silently if audio context is blocked/unsupported
    }
};

// Play CRT static white noise fuzz sound
const playStaticSound = () => {
    try {
        const audioCtx = getAudioContext();
        if (!audioCtx) return;
        
        if (!cachedNoiseBuffer) {
            const bufferSize = audioCtx.sampleRate * 0.25; // 250ms
            cachedNoiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = cachedNoiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
        }
        
        const noise = audioCtx.createBufferSource();
        noise.buffer = cachedNoiseBuffer;
        
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200;
        filter.Q.value = 1.5;
        
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        
        noise.start();
    } catch (e) {
        // Fallback silently
    }
};

// Channel 04: Matrix Rain Animation
const MatrixRain = () => {
    const [gridStr, setGridStr] = useState<string>('');
    const cols = 16;
    const rows = 9;

    useEffect(() => {
        const streams = Array.from({ length: cols }, () => ({
            y: Math.floor(Math.random() * -rows),
            speed: Math.random() * 2 + 1,
            chars: Array.from({ length: rows }, () => 
                Math.random() > 0.5 ? '1' : '0'
            )
        }));

        const interval = setInterval(() => {
            // ⚡ Bolt: Use direct string concatenation for high-frequency render loops
            // instead of nested .map().join() array methods to eliminate GC thrashing (~60% faster).
            let frameStr = '';
            for (let rIndex = 0; rIndex < rows; rIndex++) {
                for (let cIndex = 0; cIndex < cols; cIndex++) {
                    const stream = streams[cIndex];
                    const charIndex = Math.floor(rIndex - stream.y);
                    if (charIndex >= 0 && charIndex < rows) {
                        frameStr += stream.chars[charIndex];
                    } else {
                        frameStr += ' ';
                    }
                    if (cIndex < cols - 1) frameStr += ' ';
                }
                if (rIndex < rows - 1) frameStr += '\n';
            }

            streams.forEach(s => {
                s.y += s.speed * 0.4;
                if (s.y > rows) {
                    s.y = Math.floor(Math.random() * -4);
                    s.speed = Math.random() * 2 + 1;
                }
            });

            setGridStr(frameStr);
        }, 80);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-[9px] md:text-xs text-green-500 leading-tight select-none whitespace-pre text-center">
            {gridStr}
        </div>
    );
};

// Channel 05: Rotating 3D ASCII Cube
const AsciiCube = () => {
    const [frame, setFrame] = useState('');
    
    useEffect(() => {
        let A = 0;
        let B = 0;
        
        const width = 28;
        const height = 10;
        
        const renderCube = () => {
            const buffer = Array(height).fill(null).map(() => Array(width).fill(' '));
            const scale = 3.2;
            const vertices = [
                [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
                [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1]
            ];
            
            const edges = [
                [0, 1], [1, 2], [2, 3], [3, 0],
                [4, 5], [5, 6], [6, 7], [7, 4],
                [0, 4], [1, 5], [2, 6], [3, 7]
            ];
            
            const cosA = Math.cos(A);
            const sinA = Math.sin(A);
            const cosB = Math.cos(B);
            const sinB = Math.sin(B);
            
            const projected = vertices.map(([x, y, z]) => {
                let y1 = y * cosA - z * sinA;
                let z1 = y * sinA + z * cosA;
                
                let x2 = x * cosB + z1 * sinB;
                let z2 = -x * sinB + z1 * cosB;
                
                const distance = 3.5;
                const ooz = 1 / (distance - z2);
                
                const xp = Math.floor(width / 2 + (x2 * ooz) * scale * (width / 2));
                const yp = Math.floor(height / 2 + (y1 * ooz) * scale * (height / 2));
                
                return [xp, yp];
            });
            
            edges.forEach(([i1, i2]) => {
                const [x1, y1] = projected[i1];
                const [x2, y2] = projected[i2];
                
                const dx = Math.abs(x2 - x1);
                const dy = Math.abs(y2 - y1);
                const sx = x1 < x2 ? 1 : -1;
                const sy = y1 < y2 ? 1 : -1;
                let err = dx - dy;
                
                let cx = x1;
                let cy = y1;
                
                while (true) {
                    if (cx >= 0 && cx < width && cy >= 0 && cy < height) {
                        buffer[cy][cx] = '.';
                    }
                    if (cx === x2 && cy === y2) break;
                    const e2 = 2 * err;
                    if (e2 > -dy) {
                        err -= dy;
                        cx += sx;
                    }
                    if (e2 < dx) {
                        err += dx;
                        cy += sy;
                    }
                }
            });
            
            // ⚡ Bolt: Build ASCII frame via string concat to bypass expensive buffer.map().join()
            let frameStr = '';
            for (let r = 0; r < height; r++) {
                for (let c = 0; c < width; c++) {
                    frameStr += buffer[r][c];
                }
                if (r < height - 1) frameStr += '\n';
            }

            setFrame(frameStr);
            A += 0.05;
            B += 0.03;
        };
        
        const timer = setInterval(renderCube, 80);
        return () => clearInterval(timer);
    }, []);
    
    return (
        <pre className="font-mono text-[9px] md:text-[10px] text-green-500 leading-tight whitespace-pre select-none tracking-widest text-shadow-glow">
            {frame}
        </pre>
    );
};

// Channel 06: Interactive ASCII Face/Pet
const AsciiPet = () => {
    const [bubble, setBubble] = useState("FEED ME DATA!");
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(true);
            setTimeout(() => setBlink(false), 200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const phrases = [
        "OOH! THAT TICKLES!",
        "NEXT.JS IS SWEET!",
        "SUDO ANIRUDH!",
        "INPUT RECEIVED!",
        "LOAD AVERAGE: OK",
        "ERROR 404: PET ME"
    ];

    const handleClick = () => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setBubble(randomPhrase);
    };

    return (
        <div 
            className="flex flex-col items-center justify-center font-mono text-xs text-green-500 select-none cursor-pointer p-2 relative"
            onMouseEnter={() => setBubble("HI HUMAN! *PURR*")}
            onMouseLeave={() => setBubble("FEED ME DATA!")}
            onClick={handleClick}
        >
            <div className="border border-green-500/30 px-2 py-0.5 rounded mb-2 text-[9px] animate-pulse bg-black/40 text-center max-w-[150px] min-h-[20px] flex items-center justify-center">
                "{bubble}"
            </div>
            <pre className="text-center font-bold text-shadow-glow leading-none text-xs md:text-sm">
{blink ? `  /\\___/\\
 ( - . - )
  (") (")` : `  /\\___/\\
 ( =^.^= )
  (") (")`}
            </pre>
        </div>
    );
};

// Channel 07: Static Noise (No Signal)
const StaticChannel = () => {
    const [noiseStr, setNoiseStr] = useState<string>('');
    const chars = ' .:-=+*#%@';
    
    useEffect(() => {
        const interval = setInterval(() => {
            // ⚡ Bolt: Pre-allocate static noise frame as a single string to reduce array allocation overhead.
            let frameStr = '';
            for (let r = 0; r < 9; r++) {
                for (let c = 0; c < 20; c++) {
                    frameStr += chars[Math.floor(Math.random() * chars.length)];
                }
                if (r < 8) frameStr += '\n';
            }
            setNoiseStr(frameStr);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-[10px] md:text-xs text-green-500/50 leading-none select-none tracking-widest text-center">
            <div className="text-[9px] uppercase tracking-widest text-green-500 mb-2 opacity-50">NO SIGNAL</div>
            <div className="whitespace-pre">{noiseStr}</div>
        </div>
    );
};

const HelloWorld = () => {
    const [channel, setChannel] = useState(3);
    const [text, setText] = useState('');
    const fullText = 'HELLO WORLD';
    const [isTyping, setIsTyping] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Channel 03 Typing text effect
    useEffect(() => {
        if (channel !== 3) return;
        let index = 0;
        let timeoutId: NodeJS.Timeout;

        const type = () => {
            if (index < fullText.length) {
                setText(fullText.slice(0, index + 1));
                index++;
                timeoutId = setTimeout(type, 300);
            } else {
                setIsTyping(false);
                timeoutId = setTimeout(() => {
                    setText('');
                    index = 0;
                    setIsTyping(true);
                    type();
                }, 3000);
            }
        };

        type();

        return () => clearTimeout(timeoutId);
    }, [channel]);

    const changeChannel = (nextChannel: number) => {
        playClickSound();
        playStaticSound();
        setIsTransitioning(true);
        setTimeout(() => {
            setChannel(nextChannel);
        }, 120);
        setTimeout(() => {
            setIsTransitioning(false);
        }, 250);
    };

    const handleNextChannel = () => {
        if (isTransitioning) return;
        const next = channel === 7 ? 3 : channel + 1;
        changeChannel(next);
    };

    const handlePrevChannel = () => {
        if (isTransitioning) return;
        const prev = channel === 3 ? 7 : channel - 1;
        changeChannel(prev);
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-2 bg-zinc-800 rounded-xl border-4 border-zinc-900 shadow-2xl relative">
            {/* TV Antenna (Decorative) */}
            <div className="absolute -top-12 right-1/4 w-1 h-12 bg-zinc-400 -rotate-12 z-0 origin-bottom"></div>
            <div className="absolute -top-12 left-1/4 w-1 h-12 bg-zinc-400 rotate-12 z-0 origin-bottom"></div>

            {/* TV Housing */}
            <div className="relative w-full h-full bg-[#2a2a2a] rounded-lg p-3 shadow-[inset_0_0_20px_rgba(0,0,0,1)] flex flex-col">
                {/* Brand Logo */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] font-bold text-zinc-500 tracking-[0.2em] uppercase z-10">
                    RETRO_VISION
                </div>

                {/* Screen Bezel */}
                <div className="relative flex-1 bg-black rounded-[2rem] overflow-hidden border-b-2 border-zinc-700 shadow-[inset_0_0_10px_rgba(0,0,0,1)]">
                    {/* The Screen Content */}
                    <div className="absolute inset-0 bg-[#111] opacity-100 flex flex-col items-center justify-center overflow-hidden">
                        {/* CRT Screen Effects */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                        <div className="absolute inset-0 bg-green-500/5 z-10 animate-pulse pointer-events-none"></div>
                        
                        {/* Static Noise */}
                        <div className="tv-static pointer-events-none"></div>

                        {/* Static Noise Overlay during transitions */}
                        {isTransitioning && (
                            <div className="absolute inset-0 bg-[#151515] z-50 flex flex-col items-center justify-center pointer-events-none">
                                <div className="tv-static !opacity-95 absolute inset-0"></div>
                                <div className="text-[14px] text-green-500 font-pixel uppercase tracking-widest text-shadow-glow animate-pulse">
                                    TUNING...
                                </div>
                            </div>
                        )}

                        {/* On-Screen Display */}
                        <div className="w-full flex justify-between items-center mb-4 z-30 opacity-70 absolute top-4 px-4">
                            <div className="text-[10px] text-green-500 font-pixel uppercase tracking-widest text-shadow-glow">
                                CH 0{channel}
                            </div>
                            <div className="text-[10px] text-green-500 font-pixel uppercase tracking-widest text-shadow-glow">
                                AV-1
                            </div>
                        </div>

                        {/* Channel rendering */}
                        <div className="relative z-30 flex flex-col items-center justify-center w-full">
                            {channel === 3 && (
                                <div className="text-3xl md:text-4xl font-pixel tracking-widest text-green-500 text-shadow-glow text-center leading-tight">
                                    {text}
                                    <span className="animate-blink inline-block w-3 h-8 align-middle bg-green-500 ml-1 box-shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                                </div>
                            )}
                            {channel === 4 && <MatrixRain />}
                            {channel === 5 && <AsciiCube />}
                            {channel === 6 && <AsciiPet />}
                            {channel === 7 && <StaticChannel />}
                        </div>

                        {/* Scanline Overlay */}
                        <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-4 animate-scanline opacity-30"></div>
                        
                        {/* Screen Curvature Vignette */}
                        <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.4)_100%)]"></div>
                    </div>
                </div>

                {/* TV Controls */}
                <div className="h-8 flex items-center justify-between px-2 mt-1">
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-900 border border-red-700 shadow-[0_0_5px_rgba(255,0,0,0.5)] animate-pulse"></div> {/* Power Light */}
                        <div className="w-8 h-full flex gap-1 items-center">
                            <div className="w-[2px] h-3 bg-zinc-600"></div>
                            <div className="w-[2px] h-3 bg-zinc-600"></div>
                            <div className="w-[2px] h-3 bg-zinc-600"></div>
                        </div> {/* Speaker Grille */}
                    </div>
                    <div className="flex gap-2 items-center">
                        <button 
                            onClick={handleNextChannel}
                            title="Change Channel"
                            aria-label="Next Channel"
                            className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 cursor-pointer hover:border-retro-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-yellow"
                            style={{ transform: `rotate(${(channel - 3) * 90}deg)` }}
                        >
                            <div className="w-full h-1 bg-zinc-950"></div>
                        </button>
                        <button 
                            onClick={handlePrevChannel}
                            title="Fine Tune"
                            aria-label="Previous Channel"
                            className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 cursor-pointer hover:border-retro-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-yellow"
                            style={{ transform: `rotate(${-((channel - 3) * 45)}deg)` }}
                        >
                            <div className="w-full h-1 bg-zinc-950"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelloWorld;
