import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleDotClick = (e) => {
        e.preventDefault();
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF5722', '#76FF03', '#ffffff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.documentElement.style.setProperty('--accent', randomColor);

        // Add a temporary glow effect
        e.target.style.textShadow = `0 0 10px ${randomColor}`;
        setTimeout(() => {
            e.target.style.textShadow = 'none';
        }, 500);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-effect' : 'bg-transparent'}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '1.2rem 0',
                transition: 'all 0.4s ease',
                borderBottom: scrolled ? '1px solid var(--card-border)' : 'none',
                background: scrolled || isMenuOpen ? 'var(--bg-secondary)' : 'transparent'
            }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#" style={{ fontSize: '1.4rem', fontWeight: '600', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    Anirudh<span
                        onClick={handleDotClick}
                        style={{
                            color: 'var(--accent)',
                            cursor: 'pointer',
                            padding: '0 2px',
                            transition: 'all 0.3s ease'
                        }}
                        title="Click for a surprise!"
                    >.</span>
                </a>

                {/* Desktop Menu */}
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="hidden md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                transition: 'color 0.3s'
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                    }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    padding: '2rem',
                    borderBottom: '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    alignItems: 'center',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                }} className="md:hidden animate-fade-in">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.1rem',
                                fontWeight: '500',
                                transition: 'color 0.3s'
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
