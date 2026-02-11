"use client";
import React, { useEffect, useState, useRef } from 'react';

const TRAIL_LENGTH = 12; // Longer trail for better snake feel

const RetroCursor = () => {
    const [trail, setTrail] = useState<{ x: number, y: number, angle: number }[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Refs for animation loop
    const mousePos = useRef({ x: 0, y: 0 });
    // Track previous position to calculate angle
    const prevMousePos = useRef({ x: 0, y: 0 });
    const currentAngle = useRef(0);

    useEffect(() => {
        // Only run on client and non-touch devices
        if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        setIsVisible(true);
        document.body.classList.add('custom-cursor');

        const updateMousePos = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Interaction Check
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button' ||
                getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isClickable);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Animation loop for smooth trail
        let animationFrameId: number;

        const loop = () => {
            // Calculate angle based on movement
            const dx = mousePos.current.x - prevMousePos.current.x;
            const dy = mousePos.current.y - prevMousePos.current.y;

            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                // Only update angle if moving significantly
                // -90 adjustment because default SVG points up (or 0 points right, let's align our SVG to 0=Right)
                // Actually let's assume 0 deg is pointing RIGHT.
                currentAngle.current = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            }

            prevMousePos.current = { ...mousePos.current };

            setTrail(prevTrail => {
                const newPos = { ...mousePos.current, angle: currentAngle.current };
                // Creating a 'slithering' effect might be too complex for a cursor trail array shift
                // smooth trail follows path exactly
                const newTrail = [newPos, ...prevTrail].slice(0, TRAIL_LENGTH);
                return newTrail;
            });
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

    return (
        <>
            {trail.map((pos, index) => {
                const isHead = index === 0;
                // Head size 24px, body tapers
                const size = isHead ? 24 : 14 - (index * 0.8);

                let color = isHovering
                    ? (isHead ? "#EF4444" : "#F87171")
                    : (isHead ? "#86EFAC" : "#4ADE80");

                const scale = isHead && isClicking ? 0.8 : 1;

                // Only rotate the head used mostly, or body too?
                // Body segments usually just follow position. Integrating rotation into body is tricky without sprite.
                // Let's rotate ONLY the head for now to avoid "spinning dots" visual noise.
                const rotation = isHead ? pos.angle : 0;

                return (
                    <div
                        key={index}
                        className="fixed pointer-events-none z-[9999] mix-blend-exclusion"
                        style={{
                            left: 0,
                            top: 0,
                            width: `${size}px`,
                            height: `${size}px`,
                            // Center the pivot for rotation
                            transform: `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0) rotate(${rotation}deg) scale(${scale})`,
                            willChange: 'transform',
                            opacity: 1 - (index / (TRAIL_LENGTH + 2)),
                            zIndex: 10000 - index, // Head on top
                        }}
                    >
                        {isHead ? (
                            // Pixel Art Head - Pointing UP by default (0 deg rotation needs to match math)
                            // Math.atan2(dy, dx) + 90 assumes 0deg is UP. 
                            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Head Shape */}
                                <rect x="5" y="2" width="6" height="10" fill={color} />
                                <rect x="4" y="4" width="8" height="6" fill={color} />
                                {/* Snout */}
                                <rect x="6" y="0" width="4" height="2" fill={color} />
                                {/* Eyes */}
                                <rect x="4" y="8" width="2" height="2" fill="black" />
                                <rect x="10" y="8" width="2" height="2" fill="black" />
                                {/* Tongue (hover) */}
                                {isHovering && (
                                    <>
                                        <rect x="7" y="-2" width="2" height="2" fill="#EF4444" />
                                        <rect x="5" y="-4" width="2" height="2" fill="#EF4444" />
                                        <rect x="9" y="-4" width="2" height="2" fill="#EF4444" />
                                    </>
                                )}
                            </svg>
                        ) : (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: color,
                                    borderRadius: '50%' // Rounded body segs feel more organic
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default RetroCursor;
