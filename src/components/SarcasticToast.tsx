"use client";

import React, { useEffect, useState } from 'react';

type ToastProps = {
    message: string | null;
    onClose: () => void;
};

const SarcasticToast = ({ message, onClose }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300); // Wait for animation to finish before clearing
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message && !isVisible) return null;

    return (
        <div
            className={`
                fixed bottom-4 right-4 z-[9999] max-w-xs md:max-w-sm
                transition-all duration-300 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
        >
            <div className="bg-zinc-900 border-2 border-retro-charcoal shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-1">
                {/* Header */}
                <div className="bg-retro-charcoal text-retro-white text-[10px] uppercase font-bold px-2 py-1 flex justify-between items-center mb-1 font-pixel">
                    <span>System_Message</span>
                    <button onClick={() => setIsVisible(false)} className="hover:text-retro-orange">X</button>
                </div>

                {/* Content */}
                <div className="bg-retro-white p-3 flex gap-3 items-start">
                    <span className="text-2xl pt-1">🤖</span>
                    <div>
                        <p className="text-retro-charcoal font-bold text-xs font-mono uppercase mb-1">Observation:</p>
                        <p className="text-zinc-700 text-sm font-medium leading-snug">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SarcasticToast;
