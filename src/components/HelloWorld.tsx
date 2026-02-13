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
        <div className="w-full h-full bg-black p-4 font-mono select-none flex flex-col items-center justify-center border-4 border-zinc-900 rounded-lg shadow-inner relative overflow-hidden group">
            {/* CRT Screen Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
            <div className="absolute inset-0 bg-green-500/5 z-10 animate-pulse pointer-events-none"></div>

            {/* Header */}
            <div className="w-full flex justify-between items-center mb-4 z-30 opacity-70 absolute top-4 px-4">
                <div className="text-[10px] text-green-500 font-pixel uppercase tracking-widest">
                    SYSTEM_READY
                </div>
                <div className="text-[10px] text-green-500 font-pixel uppercase tracking-widest">
                    PORT: 3000
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-30 flex flex-col items-center gap-2 group-hover:scale-110 transition-transform duration-500">
                <div className="text-6xl md:text-7xl font-pixel tracking-widest text-green-500 filter drop-shadow-[0_0_15px_rgba(34,197,94,1)]">
                    {text}
                    <span className="animate-blink inline-block w-4 h-12 align-middle bg-green-500 ml-1 box-shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                </div>
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-4 animate-scanline opacity-30"></div>
        </div>
    );
};

export default HelloWorld;
