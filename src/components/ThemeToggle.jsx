import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
            style={{
                position: 'fixed',
                top: '100px',
                right: '2rem',
                zIndex: 1000,
                background: 'var(--card-bg)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--card-border)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
                e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.borderColor = 'var(--card-border)';
            }}
        >
            {theme === 'dark' ? (
                <Sun size={24} color="var(--accent)" style={{ animation: 'spin-in 0.5s ease' }} />
            ) : (
                <Moon size={24} color="var(--accent)" style={{ animation: 'spin-in 0.5s ease' }} />
            )}
        </button>
    );
};

export default ThemeToggle;
