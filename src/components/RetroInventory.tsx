"use client";

import React, { useState } from 'react';

const ITEMS = [
    {
        id: 'coffee',
        icon: '☕',
        name: 'Infinite Coffee',
        desc: 'Restores 50 MP. Side effect: Jitters.',
        rarity: 'common'
    },
    {
        id: 'keyboard',
        icon: '⌨️',
        name: 'Mech Keyboard',
        desc: '+10 Typing Speed. -5 Stealth (Loud).',
        rarity: 'rare'
    },
    {
        id: 'duck',
        icon: '🦆',
        name: 'Debug Duck',
        desc: '+100 Wisdom. Excellent listener.',
        rarity: 'legendary'
    },
    {
        id: 'bug',
        icon: '🐛',
        name: 'Feature?',
        desc: 'It is not a bug. It is a feature.',
        rarity: 'common'
    }
];

const RetroInventory = () => {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="w-full mt-6 bg-zinc-800/50 border-2 border-black p-4 font-pixel shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
            <h3 className="text-zinc-500 uppercase tracking-widest text-xs mb-3 text-center border-b-2 border-zinc-700/50 pb-2">Quick Inventory</h3>

            {/* Inventory Slots */}
            <div className="flex justify-center gap-3">
                {ITEMS.map((item, index) => (
                    <div
                        key={item.id}
                        className={`
                        w-12 h-12 md:w-14 md:h-14 bg-zinc-900 border-2 
                        flex items-center justify-center text-2xl cursor-pointer
                        transition-transform hover:scale-105 active:scale-95 relative group
                        ${selected === index ? 'border-retro-orange bg-retro-orange/10' : 'border-zinc-600'}
                    `}
                        onClick={() => setSelected(index === selected ? null : index)}
                        onMouseEnter={() => setSelected(index)}
                        onMouseLeave={() => setSelected(null)}
                    >
                        {item.icon}

                        {/* Rarity Indicator */}
                        <div className={`absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full
                        ${item.rarity === 'legendary' ? 'bg-yellow-500 shadow-[0_0_5px_yellow]' :
                                item.rarity === 'rare' ? 'bg-blue-500' : 'bg-zinc-500'}
                    `}></div>
                    </div>
                ))}
            </div>

            {/* Description Box */}
            <div className="mt-3 h-16 bg-black/20 border border-black/10 p-2 rounded text-center flex items-center justify-center">
                {selected !== null ? (
                    <div className="animate-in fade-in slide-in-from-bottom-1 duration-200">
                        <p className="text-retro-white text-xs font-bold uppercase mb-1 text-retro-gold">{ITEMS[selected].name}</p>
                        <p className="text-zinc-400 text-[10px] leading-tight">{ITEMS[selected].desc}</p>
                    </div>
                ) : (
                    <p className="text-zinc-600 text-[10px] italic">Hover items to inspect...</p>
                )}
            </div>
        </div>
    );
};

export default RetroInventory;
