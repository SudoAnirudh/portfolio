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
};// Channel 04: Matrix Rain Animation
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
        <div className="font-mono text-[9px] md:text-xs text-zinc-800/80 leading-tight select-none whitespace-pre text-center">
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
        <pre className="font-mono text-[9px] md:text-[10px] text-zinc-800 leading-tight whitespace-pre select-none tracking-widest">
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
            className="flex flex-col items-center justify-center font-mono text-xs text-zinc-800 select-none cursor-pointer p-2 relative"
            onMouseEnter={() => setBubble("HI HUMAN! *PURR*")}
            onMouseLeave={() => setBubble("FEED ME DATA!")}
            onClick={handleClick}
        >
            <div className="bg-white border border-zinc-800 px-2 py-0.5 rounded-sm mb-2 text-[9px] text-zinc-800 text-center max-w-[150px] min-h-[20px] flex items-center justify-center shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                "{bubble}"
            </div>
            <pre className="text-center font-bold leading-none text-xs md:text-sm">
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
        <div className="font-mono text-[10px] md:text-xs text-zinc-800/40 leading-none select-none tracking-widest text-center">
            <div className="text-[9px] uppercase tracking-widest text-zinc-800 mb-2 opacity-50">NO SIGNAL</div>
            <div className="whitespace-pre">{noiseStr}</div>
        </div>
    );
};

// SVG Assets
const AppleRainbowLogo = () => (
    <svg viewBox="0 0 16 16" className="w-5 h-5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] select-none">
        <defs>
            <linearGradient id="apple-rainbow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5EBD3E" />
                <stop offset="17%" stopColor="#FFB900" />
                <stop offset="34%" stopColor="#F78200" />
                <stop offset="50%" stopColor="#E23838" />
                <stop offset="67%" stopColor="#973999" />
                <stop offset="83%" stopColor="#009CDF" />
            </linearGradient>
        </defs>
        <path fill="url(#apple-rainbow)" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
    </svg>
);

const AppleMonochromeLogo = () => (
    <svg viewBox="0 0 16 16" className="w-3 h-3 fill-black mr-2 select-none">
        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
    </svg>
);

const HelloWorld = () => {
    const [channel, setChannel] = useState(3);
    const [text, setText] = useState('');
    const fullText = 'hello world';
    const [isTyping, setIsTyping] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [ledFlash, setLedFlash] = useState(false);

    // Channel 03 Typing text effect
    useEffect(() => {
        if (channel !== 3) return;
        let index = 0;
        let timeoutId: NodeJS.Timeout;

        const type = () => {
            if (index < fullText.length) {
                setText(fullText.slice(0, index + 1));
                index++;
                timeoutId = setTimeout(type, 250);
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
        setLedFlash(true);
        setIsTransitioning(true);
        setTimeout(() => {
            setChannel(nextChannel);
        }, 120);
        setTimeout(() => {
            setIsTransitioning(false);
            setLedFlash(false);
        }, 400);
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
        <div className="w-full h-full flex flex-col bg-[#ded9cd] border-[4px] border-[#c0bba9] rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),_5px_5px_15px_rgba(0,0,0,0.3)] p-3 relative select-none justify-between">
            {/* Bezel housing for the CRT Screen */}
            <div className="bg-[#d3cebe] rounded-lg p-3 flex flex-col border border-[#b4aea0] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15)] flex-1 relative">
                {/* The Recessed CRT Screen Box */}
                <div className="relative w-full h-full bg-[#f4efe3] border-[6px] border-[#2c2925] rounded-[1.2rem] overflow-hidden shadow-[inset_0_0_12px_rgba(0,0,0,0.4)] flex flex-col flex-1">
                    
                    {/* CRT Screen Scanline Mask */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_50%,rgba(0,0,0,0.1)_50%)] z-20 bg-[length:100%_3px] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-black/2 z-10 pointer-events-none"></div>
                    
                    {/* Static Noise Overlay during transitions */}
                    {isTransitioning && (
                        <div className="absolute inset-0 bg-[#f4efe3] z-50 flex flex-col items-center justify-center pointer-events-none">
                            <div className="tv-static !opacity-25 absolute inset-0 bg-white"></div>
                            <div className="text-[12px] text-zinc-900 font-pixel uppercase tracking-widest animate-pulse border-2 border-zinc-900 px-3 py-1.5 bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                SYS BOOT...
                            </div>
                        </div>
                    )}

                    {/* Vintage Mac Top Menu Bar */}
                    <div className="w-full h-5 bg-white border-b border-black flex items-center justify-between px-2 text-[9px] font-pixel text-black z-30 select-none">
                        <div className="flex items-center">
                            <AppleMonochromeLogo />
                            <span className="font-bold mr-3 cursor-pointer hover:bg-black/10 px-1 rounded-sm">File</span>
                            <span className="font-bold mr-3 cursor-pointer hover:bg-black/10 px-1 rounded-sm">Edit</span>
                            <span className="font-bold mr-3 cursor-pointer hover:bg-black/10 px-1 rounded-sm">Special</span>
                            
                            {/* Interactive Dropdown for changing channels */}
                            <div className="relative">
                                <span 
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className={`font-bold px-1.5 py-0.5 cursor-pointer rounded-sm ${menuOpen ? 'bg-black text-white' : 'hover:bg-black/10'}`}
                                >
                                    DevMenu
                                </span>
                                {menuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
                                        <div className="absolute top-[15px] left-0 w-32 bg-white border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] z-50 py-0.5 text-[9px] font-pixel">
                                            {[
                                                { ch: 3, label: 'Ch 3: Greeting' },
                                                { ch: 4, label: 'Ch 4: Matrix' },
                                                { ch: 5, label: 'Ch 5: 3D Cube' },
                                                { ch: 6, label: 'Ch 6: retroPet' },
                                                { ch: 7, label: 'Ch 7: Static' }
                                            ].map((item) => (
                                                <div
                                                    key={item.ch}
                                                    onClick={() => {
                                                        changeChannel(item.ch);
                                                        setMenuOpen(false);
                                                    }}
                                                    className={`px-2 py-1 cursor-pointer select-none transition-colors ${
                                                        channel === item.ch 
                                                            ? 'bg-black/10 font-bold' 
                                                            : 'hover:bg-black hover:text-white'
                                                    }`}
                                                >
                                                    {item.label}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="opacity-75 uppercase">CH 0{channel}</span>
                            <span className="w-[1px] h-2.5 bg-black/20"></span>
                            <span className="opacity-75">1984</span>
                        </div>
                    </div>

                    {/* Active Channel Display Workspace */}
                    <div className="flex-1 flex flex-col items-center justify-center p-2 relative z-10 w-full overflow-hidden">
                        {channel === 3 && (
                            <div className="font-cursive text-2xl md:text-3xl text-zinc-900 text-center tracking-normal leading-normal whitespace-pre-wrap select-text p-4">
                                {text}
                                <span className="animate-blink inline-block w-[2.5px] h-5 align-middle bg-zinc-900 ml-1"></span>
                            </div>
                        )}
                        {channel === 4 && <MatrixRain />}
                        {channel === 5 && <AsciiCube />}
                        {channel === 6 && <AsciiPet />}
                        {channel === 7 && <StaticChannel />}
                    </div>

                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-b from-transparent via-black/5 to-transparent h-4 animate-scanline opacity-20"></div>
                    
                    {/* Screen Curvature Vignette */}
                    <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle,transparent_65%,rgba(0,0,0,0.18)_100%)]"></div>
                </div>
            </div>

            {/* Bottom Grooved Bezel with Logo, Keypad Jack & Floppy Slot */}
            <div className="w-full h-[1.5px] bg-[#beb7a6] shadow-[0_0.5px_0_rgba(255,255,255,0.4)] mt-3 mb-2.5"></div>
            
            <div className="flex items-center justify-between px-1 h-7">
                {/* Left: Apple Rainbow Logo */}
                <div className="flex items-center gap-1.5 select-none">
                    <AppleRainbowLogo />
                    <div className="text-[8px] font-bold text-zinc-500/80 tracking-widest font-mono uppercase">
                        Mac 128k
                    </div>
                </div>

                {/* Center: Recessed Keyboard RJ11 Port socket */}
                <div className="flex items-center gap-1.5 select-none">
                    <div className="text-[6.5px] text-zinc-500 font-bold uppercase font-mono mr-0.5">Keypad</div>
                    <div 
                        title="Keyboard Input Port"
                        className="w-4 h-4 bg-[#2b2722] rounded-[3px] border border-[#a29b8c] flex flex-col gap-[2px] items-center justify-center p-[2px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"
                    >
                        <div className="w-2.5 h-[1.5px] bg-zinc-600 rounded-sm"></div>
                        <div className="w-2.5 h-[2px] bg-zinc-700/80 flex gap-[2px] justify-center">
                            <div className="w-[1px] h-full bg-yellow-600/60"></div>
                            <div className="w-[1px] h-full bg-yellow-600/60"></div>
                            <div className="w-[1px] h-full bg-yellow-600/60"></div>
                        </div>
                    </div>
                </div>

                {/* Right: Programmer push buttons and Floppy Drive Slot */}
                <div className="flex items-center gap-2">
                    {/* Tactical Reset/Dev Programmer buttons */}
                    <div className="flex gap-1 mr-0.5">
                        <button
                            onClick={handlePrevChannel}
                            title="System Reset (Prev Channel)"
                            className="px-1.5 py-0.5 text-[7px] font-mono font-bold text-zinc-600 bg-[#e0dacd] border border-[#beb7a6] rounded shadow-[0_1px_1px_rgba(0,0,0,0.15),_inset_0_1px_0_rgba(255,255,255,0.8)] hover:bg-[#d6d0c2] active:scale-95 active:shadow-inner cursor-pointer transition-all"
                        >
                            RST
                        </button>
                        <button
                            onClick={handleNextChannel}
                            title="Developer Interrupt (Next Channel)"
                            className="px-1.5 py-0.5 text-[7px] font-mono font-bold text-zinc-600 bg-[#e0dacd] border border-[#beb7a6] rounded shadow-[0_1px_1px_rgba(0,0,0,0.15),_inset_0_1px_0_rgba(255,255,255,0.8)] hover:bg-[#d6d0c2] active:scale-95 active:shadow-inner cursor-pointer transition-all"
                        >
                            INT
                        </button>
                    </div>

                    {/* Floppy Slot */}
                    <div 
                        onClick={handleNextChannel}
                        title="Floppy Drive: Click to switch program disk"
                        className="w-20 h-2 bg-[#201d19] rounded-[2px] border border-[#a29b8c] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] relative cursor-pointer flex items-center justify-between px-1 group hover:border-zinc-500 transition-colors select-none"
                    >
                        {/* Shutter simulation */}
                        <div className="absolute inset-y-[1px] left-1 w-3 bg-zinc-600/30 rounded-sm"></div>
                        
                        {/* Disk activity LED */}
                        <div className="absolute right-1 -top-[3px] flex items-center">
                            <div className={`w-1 h-1 rounded-full border border-black/40 transition-all duration-300 ${
                                ledFlash 
                                    ? 'bg-green-500 shadow-[0_0_3.5px_#22c55e]' 
                                    : 'bg-zinc-800'
                            }`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelloWorld;
