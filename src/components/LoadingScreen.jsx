import React, { useState, useEffect } from 'react';
import { Code } from 'lucide-react';

const LoadingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 30;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    if (!isLoading) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'var(--bg-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                transition: 'opacity 0.5s ease',
                opacity: progress >= 100 ? 0 : 1,
            }}
        >
            <div style={{
                marginBottom: '2rem',
                animation: 'pulse 2s ease-in-out infinite',
            }}>
                <Code size={64} color="var(--accent)" strokeWidth={2} />
            </div>

            <h2 style={{
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                marginBottom: '2rem',
                fontWeight: '600',
            }}>
                Loading Portfolio...
            </h2>

            <div style={{
                width: '300px',
                height: '4px',
                background: 'var(--bg-secondary)',
                borderRadius: '10px',
                overflow: 'hidden',
            }}>
                <div style={{
                    width: `${Math.min(progress, 100)}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--accent), #818cf8)',
                    borderRadius: '10px',
                    transition: 'width 0.3s ease',
                    boxShadow: '0 0 10px var(--accent-glow)',
                }}></div>
            </div>

            <p style={{
                marginTop: '1rem',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
            }}>
                {Math.floor(progress)}%
            </p>
        </div>
    );
};

export default LoadingScreen;
