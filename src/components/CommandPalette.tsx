"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';

interface CommandItem {
    id: string;
    keyShortcut: string;
    title: string;
    category: string;
    icon: string;
    action: () => void;
}

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [copiedMessage, setCopiedMessage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleCopyText = (text: string, label: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        }
        setCopiedMessage(`${label} copied to clipboard!`);
        setTimeout(() => setCopiedMessage(null), 2000);
    };

    const commands: CommandItem[] = [
        {
            id: 'resume',
            keyShortcut: 'R',
            title: 'Download ATS Resume PDF',
            category: 'DOCUMENTATION',
            icon: 'download',
            action: () => {
                window.open('https://drive.google.com/file/d/1V6g7AmD1qLFil0PY0rPI54-Rfp0RgajU/view?usp=drive_link', '_blank');
            }
        },
        {
            id: 'agentkube',
            keyShortcut: 'A',
            title: 'Jump to AgentKube Flagship Case Study',
            category: 'FLAGSHIP PROJECTS',
            icon: 'dns',
            action: () => {
                router.push('/projects/agentkube');
            }
        },
        {
            id: 'hirenix',
            keyShortcut: 'H',
            title: 'Jump to Hirenix AI Platform Case Study',
            category: 'FLAGSHIP PROJECTS',
            icon: 'psychology',
            action: () => {
                router.push('/projects/hirenix');
            }
        },
        {
            id: 'github',
            keyShortcut: 'G',
            title: 'Open GitHub Profile (@SudoAnirudh)',
            category: 'PROFILES & SOCIALS',
            icon: 'code',
            action: () => {
                window.open(portfolioData.personal.social.github, '_blank');
            }
        },
        {
            id: 'linkedin',
            keyShortcut: 'L',
            title: 'Open LinkedIn Profile',
            category: 'PROFILES & SOCIALS',
            icon: 'work',
            action: () => {
                window.open(portfolioData.personal.social.linkedin, '_blank');
            }
        },
        {
            id: 'copy-email',
            keyShortcut: 'C',
            title: 'Copy Contact Email & Phone',
            category: 'CONTACT & OUTREACH',
            icon: 'content_copy',
            action: () => {
                handleCopyText(`${portfolioData.personal.email} | ${portfolioData.personal.phone}`, 'Email & Phone');
            }
        }
    ];

    const filteredCommands = commands.filter(cmd => 
        cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.keyShortcut.toLowerCase() === searchQuery.trim().toLowerCase()
    );

    // Global Keyboard Shortcut Event Listener (⌘K / Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when opened & handle modal key bindings
    useEffect(() => {
        if (isOpen) {
            setSearchQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + (filteredCommands.length || 1)) % (filteredCommands.length || 1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[selectedIndex]) {
                filteredCommands[selectedIndex].action();
                setIsOpen(false);
            }
        }
    };

    return (
        <>
            {/* Floating Retro Dock Trigger Button */}
            <div className="fixed bottom-4 right-4 z-40 hidden sm:block">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-retro-charcoal hover:bg-black text-retro-white border-2 border-black px-3 py-2 rounded-xl font-pixel text-xs tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    title="Open Command Palette (⌘K)"
                >
                    <span className="material-symbols-outlined text-sm text-retro-yellow">terminal</span>
                    <span className="font-bold">⌘K COMMANDS</span>
                </button>
            </div>

            {/* Modal Dialog Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="bg-retro-charcoal text-white border-4 border-black rounded-2xl w-full max-w-xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)] relative"
                        >
                            {/* Terminal Header */}
                            <div className="bg-black p-3 border-b-2 border-white/20 flex items-center justify-between font-pixel text-xs">
                                <div className="flex items-center gap-2 text-retro-green">
                                    <span className="animate-pulse">_</span>
                                    <span className="font-bold uppercase tracking-wider">COMMAND PALETTE // SYSTEM EXEC</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-zinc-400 font-mono">ESC TO CLOSE</span>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="text-zinc-400 hover:text-white font-bold cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Search Input Box */}
                            <div className="p-3 border-b border-white/10 flex items-center gap-3 bg-zinc-900/90">
                                <span className="material-symbols-outlined text-retro-yellow text-xl">search</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => {
                                        setSearchQuery(e.target.value);
                                        setSelectedIndex(0);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a command or jump to target..."
                                    className="bg-transparent text-white font-mono text-sm w-full focus:outline-none placeholder-zinc-500"
                                />
                            </div>

                            {/* Toast Feedback Notification */}
                            {copiedMessage && (
                                <div className="bg-emerald-500 text-black font-pixel text-center py-1.5 px-3 font-bold text-xs">
                                    ✓ {copiedMessage}
                                </div>
                            )}

                            {/* Command Results List */}
                            <div className="max-h-72 overflow-y-auto p-2 space-y-1 font-mono">
                                {filteredCommands.length === 0 ? (
                                    <div className="text-center py-8 text-zinc-500 font-pixel text-sm uppercase">
                                        No matching commands found
                                    </div>
                                ) : (
                                    filteredCommands.map((cmd, idx) => {
                                        const isSelected = idx === selectedIndex;
                                        return (
                                            <div
                                                key={cmd.id}
                                                onClick={() => {
                                                    cmd.action();
                                                    setIsOpen(false);
                                                }}
                                                onMouseEnter={() => setSelectedIndex(idx)}
                                                className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                                                    isSelected 
                                                        ? 'bg-retro-yellow text-black font-bold border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                                                        : 'hover:bg-zinc-800 text-zinc-200 border border-transparent'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`material-symbols-outlined text-lg ${isSelected ? 'text-black' : 'text-zinc-400'}`}>
                                                        {cmd.icon}
                                                    </span>
                                                    <div>
                                                        <div className="text-xs">{cmd.title}</div>
                                                        <div className={`text-[9px] font-pixel uppercase tracking-widest ${isSelected ? 'text-zinc-800' : 'text-zinc-500'}`}>
                                                            {cmd.category}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1 shrink-0">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                                        isSelected 
                                                            ? 'bg-black text-white border-black' 
                                                            : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                                                    }`}>
                                                        [{cmd.keyShortcut}]
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Palette Footer Instructions */}
                            <div className="bg-zinc-950 p-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-pixel text-zinc-400">
                                <div className="flex gap-3">
                                    <span>↑↓ NAVIGATE</span>
                                    <span>↵ SELECT</span>
                                </div>
                                <div className="text-retro-yellow">
                                    ⌘K / CTRL+K
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
