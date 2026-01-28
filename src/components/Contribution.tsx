"use client";
import React, { useEffect, useState } from 'react';

const Contribution = () => {
    const [squares, setSquares] = useState<number[]>([]);

    useEffect(() => {
        // Generate random intensity levels for the squares on the client side only
        // to avoid hydration mismatch.
        const newSquares = Array.from({ length: 280 }).map(() => Math.floor(Math.random() * 5));
        setSquares(newSquares);
    }, []);

    const colors = ['bg-gray-50', 'bg-gray-200', 'bg-gray-300', 'bg-slate-400', 'bg-slate-600'];

    return (
        <section className="py-32 px-8 section-border overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted mb-12 text-center">Contribution Graph</h2>
                <div className="bg-white thin-border p-10 rounded-sm">
                    <div className="flex flex-wrap gap-1.5 justify-center">
                        {squares.length > 0 ? squares.map((intensity, index) => (
                            <div key={index} className={`contribution-square rounded-sm ${colors[intensity]}`}></div>
                        )) : (
                            /* Placeholder ensuring layout doesn't jump too much, or just empty until loaded */
                            Array.from({ length: 280 }).map((_, i) => (
                                <div key={i} className="contribution-square rounded-sm bg-gray-50"></div>
                            ))
                        )}
                    </div>
                    <div className="mt-8 flex items-center justify-center space-x-3 text-[10px] text-muted uppercase tracking-widest font-medium">
                        <span>Less</span>
                        <div className="flex space-x-1.5">
                            <div className="contribution-square rounded-sm bg-gray-50 border border-gray-100"></div>
                            <div className="contribution-square rounded-sm bg-gray-200"></div>
                            <div className="contribution-square rounded-sm bg-gray-300"></div>
                            <div className="contribution-square rounded-sm bg-slate-400"></div>
                            <div className="contribution-square rounded-sm bg-slate-600"></div>
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contribution;
