"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RetroMusicPlayer from './RetroMusicPlayer';

const MusicPlayerWrapper: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Toggle Button */}
            <div className="fixed bottom-6 right-6 z-[9980]">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-retro-yellow border-4 border-black font-pixel text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-black focus:outline-none cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={isOpen ? "Close Winamp Player" : "Open Winamp Player"}
                >
                    <span 
                        className={`material-symbols-outlined text-base ${isOpen ? 'animate-spin' : ''}`}
                        style={{ animationDuration: '3s' }}
                    >
                        album
                    </span>
                    <span className="font-pixel text-xs tracking-wider">
                        {isOpen ? "CLOSE" : "MUSIC"}
                    </span>
                </motion.button>
            </div>

            {/* Floating Draggable Winamp Player */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.15 }}
                    >
                        <RetroMusicPlayer onClose={() => setIsOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MusicPlayerWrapper;
