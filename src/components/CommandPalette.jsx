import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, Briefcase, Code, Mail, Github, Linkedin, Terminal, Moon, Sun } from 'lucide-react';
import { profile } from '../data';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Toggle with Cmd+K or Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    const actions = [
        {
            id: 'home',
            label: 'Go to Home',
            icon: Home,
            action: () => scrollToSection('home')
        },
        {
            id: 'about',
            label: 'Go to About',
            icon: User,
            action: () => scrollToSection('about')
        },
        {
            id: 'experience',
            label: 'Go to Experience',
            icon: Briefcase,
            action: () => scrollToSection('experience')
        },
        {
            id: 'projects',
            label: 'Go to Projects',
            icon: Code,
            action: () => scrollToSection('projects')
        },
        {
            id: 'contact',
            label: 'Go to Contact',
            icon: Mail,
            action: () => scrollToSection('contact')
        },
        {
            id: 'github',
            label: 'Visit GitHub',
            icon: Github,
            action: () => window.open(profile.social.github, '_blank')
        },
        {
            id: 'linkedin',
            label: 'Visit LinkedIn',
            icon: Linkedin,
            action: () => window.open(profile.social.linkedin, '_blank')
        },
        {
            id: 'email',
            label: 'Send Email',
            icon: Mail,
            action: () => window.open(profile.social.email, '_blank')
        },
    ];

    const filteredActions = actions.filter(action =>
        action.label.toLowerCase().includes(query.toLowerCase())
    );

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredActions.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredActions[selectedIndex]) {
                    filteredActions[selectedIndex].action();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedIndex, filteredActions]);

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="palette-overlay"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 9999,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            paddingTop: '20vh'
                        }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="palette-modal"
                        style={{
                            position: 'fixed',
                            top: '20vh',
                            left: '50%',
                            x: '-50%', // Framer motion shortcut for translateX
                            width: '90%',
                            maxWidth: '600px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--accent)',
                            borderRadius: '12px',
                            zIndex: 10000,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: '1px solid var(--card-border)',
                            padding: '1rem'
                        }}>
                            <Search size={20} style={{ color: 'var(--text-secondary)', marginRight: '1rem' }} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Type a command or search..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-primary)',
                                    fontSize: '1.1rem',
                                    width: '100%',
                                    outline: 'none'
                                }}
                            />
                            <div style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-secondary)',
                                padding: '0.2rem 0.5rem',
                                border: '1px solid var(--card-border)',
                                borderRadius: '4px'
                            }}>
                                Esc
                            </div>
                        </div>

                        <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '0.5rem' }}>
                            {filteredActions.length === 0 ? (
                                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    No results found.
                                </div>
                            ) : (
                                filteredActions.map((action, index) => (
                                    <button
                                        key={action.id}
                                        onClick={() => {
                                            action.action();
                                            setIsOpen(false);
                                        }}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '0.8rem 1rem',
                                            border: 'none',
                                            background: index === selectedIndex ? 'var(--accent-dim)' : 'transparent',
                                            color: index === selectedIndex ? 'var(--accent)' : 'var(--text-primary)',
                                            borderLeft: index === selectedIndex ? '3px solid var(--accent)' : '3px solid transparent',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            borderRadius: '4px',
                                            transition: 'all 0.1s ease',
                                            gap: '1rem'
                                        }}
                                    >
                                        <action.icon size={18} />
                                        <span>{action.label}</span>
                                        {index === selectedIndex && (
                                            <Terminal size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                                        )}
                                    </button>
                                ))
                            )}
                        </div>

                        <div style={{
                            padding: '0.5rem 1rem',
                            borderTop: '1px solid var(--card-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            background: 'var(--bg-color)'
                        }}>
                            <span>Anirudh's Portfolio</span>
                            <span>Cmd+K / Ctrl+K</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
