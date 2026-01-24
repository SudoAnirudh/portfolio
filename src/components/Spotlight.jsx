import React, { useEffect, useState } from 'react';

const Spotlight = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setOpacity(1);
        };

        const handleMouseLeave = () => {
            setOpacity(0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9999, // Below alerts but above most content if needed, but for background glow:
                // Actually, to overlay a glow, we usually want mix-blend-mode.
                // Let's use a lower z-index if we want it to be a background glow, 
                // OR a high z-index with distinct styling for a "flashlight" feel.
                // For a sophisticated "revealer", let's use a radial gradient overlay.
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 210, 255, 0.08), transparent 40%)`,
                opacity: opacity,
                transition: 'opacity 0.3s',
                mixBlendMode: 'screen'
            }}
        />
    );
};

export default Spotlight;
