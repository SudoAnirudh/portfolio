import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus, Square, ChevronRight } from 'lucide-react';
import { projects } from '../data';

const Terminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to Anirudh-OS v1.0.4' },
        { type: 'output', content: 'Type "help" to see available commands.' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', content: input }];

            switch (cmd) {
                case 'help':
                    newHistory.push({ type: 'output', content: 'Available commands: ls, clear, whoami, help, cat brain.exe, contact' });
                    break;
                case 'ls':
                case 'ls projects':
                    newHistory.push({ type: 'output', content: 'Fetching projects...' });
                    projects.forEach(p => {
                        newHistory.push({ type: 'output', content: `> ${p.title} [${p.category}]` });
                    });
                    break;
                case 'whoami':
                    newHistory.push({ type: 'output', content: 'Anirudh S - AI & ML Engineering Student' });
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                case 'cat brain.exe':
                    newHistory.push({ type: 'output', content: '🧠 Error: Brain.exe has stopped responding due to too much caffeine and neural networks.' });
                    break;
                case 'contact':
                    newHistory.push({ type: 'output', content: 'Email: anirudhsudheer@gmail.com' });
                    newHistory.push({ type: 'output', content: 'GitHub: SudoAnirudh' });
                    break;
                case '':
                    break;
                default:
                    newHistory.push({ type: 'output', content: `zsh: command not found: ${cmd}` });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    if (!isOpen) {
        return (
            <motion.button
                className="terminal-toggle-btn"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <TerminalIcon size={20} />
            </motion.button>
        );
    }

    return (
        <motion.div
            drag
            dragMomentum={false}
            className={`terminal-window ${isMinimized ? 'minimized' : ''}`}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
        >
            <div className="terminal-header" onDoubleClick={() => setIsMinimized(!isMinimized)}>
                <div className="header-left">
                    <TerminalIcon size={14} />
                    <span>anirudh@portfolio: ~</span>
                </div>
                <div className="header-right">
                    <button onClick={() => setIsMinimized(!isMinimized)}><Minus size={14} /></button>
                    <button><Square size={12} /></button>
                    <button onClick={() => setIsOpen(false)} className="close-btn"><X size={14} /></button>
                </div>
            </div>

            {!isMinimized && (
                <div className="terminal-body" onClick={() => inputRef.current.focus()}>
                    <div className="terminal-scroll" ref={scrollRef}>
                        {history.map((line, i) => (
                            <div key={i} className={`terminal-line ${line.type}`}>
                                {line.type === 'input' && <span className="prompt">$ </span>}
                                {line.content}
                            </div>
                        ))}
                        <div className="terminal-input-line">
                            <span className="prompt">$ </span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleCommand}
                                autoFocus
                            />
                            <span className="cursor-block"></span>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Terminal;
