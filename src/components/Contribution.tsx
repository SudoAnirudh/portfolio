"use client";
import React, { useEffect, useState } from 'react';

const Contribution = () => {
    const [squares, setSquares] = useState<number[]>([]);

    useEffect(() => {
        // Generate random intensity levels for the squares on the client side only
        const newSquares = Array.from({ length: 160 }).map(() => Math.floor(Math.random() * 5));
        const timer = setTimeout(() => {
            setSquares(newSquares);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const colors = [
        'bg-zinc-200 border-transparent',
        'bg-green-200 border-black',
        'bg-green-400 border-black',
        'bg-green-600 border-black',
        'bg-green-800 border-black'
    ];

    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0">
            <div className="bg-zinc-100 bento-card rounded-3xl p-5 sm:p-8 relative overflow-hidden retro-grain border-4 border-black/10">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
                    <h2 className="text-xl sm:text-2xl font-display uppercase tracking-tighter text-retro-charcoal">
                        Github <span className="text-retro-green">Activity</span>
                    </h2>
                    <div className="font-pixel text-xs uppercase bg-black text-white px-2 py-1">
                        System.Log
                    </div>
                </div>

                <div className="bg-retro-charcoal p-3 sm:p-4 rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-wrap gap-1 justify-center">
                        {squares.length > 0 ? squares.map((intensity, index) => (
                            <div key={index} className={`w-3 h-3 md:w-4 md:h-4 border ${colors[intensity]} transition-all duration-500 hover:scale-125`}></div>
                        )) : (
                            Array.from({ length: 160 }).map((_, i) => (
                                <div key={i} className="w-3 h-3 md:w-4 md:h-4 bg-zinc-800 border-zinc-700 border"></div>
                            ))
                        )}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2 text-[10px] font-bold uppercase font-body">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-zinc-200 border border-black"></div>
                        <div className="w-3 h-3 bg-green-200 border border-black"></div>
                        <div className="w-3 h-3 bg-green-400 border border-black"></div>
                        <div className="w-3 h-3 bg-green-600 border border-black"></div>
                        <div className="w-3 h-3 bg-green-800 border border-black"></div>
                    </div>
                    <span>More</span>
                </div>
            </div>
        </section>
    );
};

export default Contribution;
