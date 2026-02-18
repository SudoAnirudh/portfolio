import React, { useState, useEffect } from 'react';

const HelloWorld = () => {
    const [text, setText] = useState('');
    const fullText = 'HELLO WORLD';
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let index = 0;
        let timeoutId: NodeJS.Timeout;

        const type = () => {
            if (index < fullText.length) {
                setText(fullText.slice(0, index + 1));
                index++;
                timeoutId = setTimeout(type, 300); // Typing speed
            } else {
                setIsTyping(false);
                // Optional: Loop the animation
                timeoutId = setTimeout(() => {
                    setText('');
                    index = 0;
                    setIsTyping(true);
                    type();
                }, 3000); // Wait 3 seconds before restarting
            }
        };

        type();

        return () => clearTimeout(timeoutId);
    }, []);

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
                        {/* CRT Screen Effects inside */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                        <div className="absolute inset-0 bg-green-500/5 z-10 animate-pulse pointer-events-none"></div>
                        
                        {/* Static Noise */}
                        <div className="tv-static pointer-events-none"></div>

                        {/* On-Screen Display */}
                        <div className="w-full flex justify-between items-center mb-4 z-30 opacity-70 absolute top-4 px-4">
                            <div className="text-[10px] text-green-500 font-pixel uppercase tracking-widest text-shadow-glow">
                                CH 03
                            </div>
                            <div className="text-[10px] text-green-500 font-pixel uppercase tracking-widest text-shadow-glow">
                                AV-1
                            </div>
                        </div>

                        {/* Main Text Content */}
                        <div className="relative z-30 flex flex-col items-center gap-2">
                             <div className="text-4xl md:text-5xl font-pixel tracking-widest text-green-500 text-shadow-glow text-center leading-tight">
                                {text}
                                <span className="animate-blink inline-block w-3 h-8 align-middle bg-green-500 ml-1 box-shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                            </div>
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
                        <div className="w-2 h-2 rounded-full bg-red-900 border border-red-700 shadow-[0_0_5px_rgba(255,0,0,0.5)]"></div> {/* Power Light */}
                        <div className="w-8 h-full flex gap-1 items-center">
                            <div className="w-[2px] h-3 bg-zinc-600"></div>
                            <div className="w-[2px] h-3 bg-zinc-600"></div>
                            <div className="w-[2px] h-3 bg-zinc-600"></div>
                        </div> {/* Speaker Grille */}
                    </div>
                    <div className="flex gap-2 items-center">
                         <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center transform rotate-45 shadow-lg">
                            <div className="w-full h-1 bg-zinc-950"></div>
                         </div>
                         <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center transform -rotate-12 shadow-lg">
                             <div className="w-full h-1 bg-zinc-950"></div>
                         </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HelloWorld;
