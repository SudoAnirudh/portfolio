"use client";
import React, { useEffect, useState, useRef } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    char: string;
    life: number;
}

const RetroCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [companionFrame, setCompanionFrame] = useState(0);
    const [particles, setParticles] = useState<Particle[]>([]);

    // Position and animation refs
    const mousePos = useRef({ x: 0, y: 0 });
    const compPos = useRef({ x: 0, y: 0 });
    const spinAngle = useRef(0);
    const targetSpinAngle = useRef(0);
    const frameCount = useRef(0);

    // Refs to avoid state closures inside the loop
    const isHoveringRef = useRef(false);
    const isClickingRef = useRef(false);

    useEffect(() => {
        // Only run on client and non-touch devices
        if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        setIsVisible(true);
        document.body.classList.add('custom-cursor');

        // Initialize companion position at current screen center
        compPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const updateMousePos = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Interaction check for clickable items
            const target = e.target as HTMLElement;
            const isClickable = !!(
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button' ||
                getComputedStyle(target).cursor === 'pointer'
            );

            if (isHoveringRef.current !== isClickable) {
                isHoveringRef.current = isClickable;
                setIsHovering(isClickable); // Trigger re-render to update SVG styles
            }
        };

        const handleMouseDown = () => {
            isClickingRef.current = true;
            setIsClicking(true);
            targetSpinAngle.current += 360; // Roll companion 360 degrees
        };
        
        const handleMouseUp = () => {
            isClickingRef.current = false;
            setIsClicking(false);
        };

        let animationFrameId: number;

        const loop = () => {
            frameCount.current++;

            // 1. Companion follows cursor with springy delay
            // Positioned offset to the bottom right of the main pointer arrow (+16px, +16px)
            const targetX = mousePos.current.x + 16;
            const targetY = mousePos.current.y + 16;

            const dx = targetX - compPos.current.x;
            const dy = targetY - compPos.current.y;

            compPos.current.x += dx * 0.15; // Smooth springy delay
            compPos.current.y += dy * 0.15;

            // 2. Smoothly rotate companion during click-spins
            const spinDiff = targetSpinAngle.current - spinAngle.current;
            if (spinDiff > 0.5) {
                spinAngle.current += spinDiff * 0.12;
            } else {
                spinAngle.current = targetSpinAngle.current;
            }

            // 3. Update wiggle animation frame (toggles between 0 and 1)
            if (frameCount.current % 12 === 0) {
                setCompanionFrame(prev => (prev === 0 ? 1 : 0));
            }

            // 4. Handle particles when hovering
            if (isHoveringRef.current && Math.random() < 0.2) {
                const pX = compPos.current.x + 8 + (Math.random() * 8 - 4);
                // Offset bounce Y position
                const bounceY = Math.sin(frameCount.current * 0.08) * 3;
                const pY = compPos.current.y + bounceY;
                const chars = ['♥', '✦', '+', '✧', '✨'];
                const char = chars[Math.floor(Math.random() * chars.length)];

                setParticles(prev => [
                    ...prev,
                    {
                        id: Math.random(),
                        x: pX,
                        y: pY,
                        vx: (Math.random() * 0.6 - 0.3),
                        vy: -(Math.random() * 0.6 + 0.4),
                        char,
                        life: 1.0
                    }
                ]);
            }

            // Update drifting particles
            setParticles(prev =>
                prev
                    .map(p => ({
                        ...p,
                        x: p.x + p.vx,
                        y: p.y + p.vy,
                        life: p.life - 0.025 // Fade rate
                    }))
                    .filter(p => p.life > 0)
            );

            animationFrameId = requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', updateMousePos);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        loop();

        return () => {
            document.body.classList.remove('custom-cursor');
            window.removeEventListener('mousemove', updateMousePos);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (!isVisible) return null;

    // Sinusoidal floating bounce for idle animation
    const bounceY = Math.sin(frameCount.current * 0.08) * 3;

    // Ghost Companion colors
    const ghostColor = isHovering ? "#F472B6" : "#22D3EE";
    const highlightColor = isHovering ? "#F472B6" : "#22D3EE";

    return (
        <>
            {/* 1. Main Retro Arrow Cursor Pointer */}
            <div
                className="fixed pointer-events-none z-[10000] will-change-transform"
                style={{
                    left: 0,
                    top: 0,
                    width: '18px',
                    height: '20px',
                    transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`,
                }}
            >
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0V19L5 14L8 20L11 18L8 13L13 13L0 0Z" fill="black" />
                    <path d="M2 3V15L5 12L8 18L9 17L6.5 11.5L10 11.5L2 3Z" fill="white" />
                </svg>
            </div>

            {/* 2. Floating Companion Ghost Sprite */}
            <div
                className="fixed pointer-events-none z-[9999] will-change-transform"
                style={{
                    left: 0,
                    top: 0,
                    width: '24px',
                    height: '24px',
                    transform: `translate3d(${compPos.current.x - 12}px, ${compPos.current.y - 12 + bounceY}px, 0) rotate(${spinAngle.current}deg) scale(${isClicking ? '1.2, 0.7' : '1'})`,
                }}
            >
                <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Outline */}
                    <path d="M5 1h6v1h2v2h1v7h-1v1h-1v1H10v-1H8v1H6v-1H4v1H3v-1H2v-1H1V4h1V2h2V1z" fill="black" />
                    
                    {/* Body Color */}
                    <path d="M6 2h4v1h2v2h1v5h-1V9h-1v1H9v-1H7v1H6v-1H5v1H4v-1H3V5h1V3h2V2z" fill={ghostColor} />
                    
                    {/* Bouncy wave animation (toggles bottom frame) */}
                    {companionFrame === 0 ? (
                        <>
                            <rect x="3" y="10" width="2" height="1" fill={ghostColor} />
                            <rect x="7" y="10" width="2" height="1" fill={ghostColor} />
                            <rect x="11" y="10" width="2" height="1" fill={ghostColor} />
                        </>
                    ) : (
                        <>
                            <rect x="5" y="10" width="2" height="1" fill={ghostColor} />
                            <rect x="9" y="10" width="2" height="1" fill={ghostColor} />
                        </>
                    )}

                    {/* Eyes */}
                    {isHovering ? (
                        // Heart eyes when hovering
                        <>
                            <path d="M4 4h1v1h1V4h1v2H6v1H5V6H4V4z" fill="#FFFFFF" />
                            <path d="M9 4h1v1h1V4h1v2h-1v1h-1V6H9V4z" fill="#FFFFFF" />
                        </>
                    ) : (
                        // Pixel square eyes
                        <>
                            <rect x="4" y="4" width="2" height="2" fill="#000" />
                            <rect x="10" y="4" width="2" height="2" fill="#000" />
                            {/* Cute cheek blush */}
                            <rect x="3" y="6" width="1" height="1" fill="#FF4B91" opacity="0.8" />
                            <rect x="12" y="6" width="1" height="1" fill="#FF4B91" opacity="0.8" />
                        </>
                    )}

                    {/* Mouth */}
                    {isHovering ? (
                        <path d="M7 7h2v1H7V7z" fill="#FFFFFF" />
                    ) : (
                        <rect x="7" y="6" width="2" height="1" fill="#000" />
                    )}
                </svg>
            </div>

            {/* 3. Floating Sparkle Particles */}
            {particles.map(p => (
                <div
                    key={p.id}
                    className="fixed pointer-events-none font-pixel select-none text-[8px] sm:text-[10px]"
                    style={{
                        left: `${p.x}px`,
                        top: `${p.y}px`,
                        color: highlightColor,
                        opacity: p.life,
                        transform: `scale(${p.life})`,
                        zIndex: 9998
                    }}
                >
                    {p.char}
                </div>
            ))}
        </>
    );
};

export default RetroCursor;
