"use client";
import React, { useEffect, useState, useRef } from 'react';

const TRAIL_LENGTH = 10; // 1 Head, 8 Body segments, 1 Tail

const RetroCursor = () => {
    const [trail, setTrail] = useState<{ x: number; y: number; angle: number }[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mousePos = useRef({ x: 0, y: 0 });
    const lastTargetRef = useRef<EventTarget | null>(null);

    useEffect(() => {
        // Only run on client and non-touch devices
        if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        setIsVisible(true);
        document.body.classList.add('custom-cursor');

        // Initialize segments inside the window bounds
        const segs = Array.from({ length: TRAIL_LENGTH }).map(() => ({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            angle: 0
        }));

        const updateMousePos = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Optimization: Skip expensive DOM/style checks if target hasn't changed
            if (e.target === lastTargetRef.current) {
                return;
            }
            lastTargetRef.current = e.target;

            // Interaction Check for clickable items
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

        // Animation loop for smooth slither trail
        let animationFrameId: number;

        const loop = () => {
            // 1. Head (index 0) eases toward mouse position
            const head = segs[0];
            const dxHead = mousePos.current.x - head.x;
            const dyHead = mousePos.current.y - head.y;

            let headAngle = head.angle;
            if (Math.hypot(dxHead, dyHead) > 0.5) {
                // Calculate rotation angle. Add 90 deg because default SVG faces UP
                headAngle = Math.atan2(dyHead, dxHead) * (180 / Math.PI) + 90;
            }

            head.x += dxHead * 0.25; // Easing speed
            head.y += dyHead * 0.25;
            head.angle = headAngle;

            // 2. Follow-the-leader lerping for body and tail segments
            for (let i = 1; i < TRAIL_LENGTH; i++) {
                const current = segs[i];
                const prev = segs[i - 1];

                const dx = prev.x - current.x;
                const dy = prev.y - current.y;

                let angle = current.angle;
                if (Math.hypot(dx, dy) > 0.5) {
                    angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
                }

                // Smoothly pull segment toward the one in front of it
                current.x += dx * 0.45;
                current.y += dy * 0.45;
                current.angle = angle;
            }

            // Sync updated positions to component state
            setTrail(segs.map(s => ({ ...s })));
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

    if (!isVisible || trail.length === 0) return null;

    return (
        <>
            {trail.map((pos, index) => {
                const isHead = index === 0;
                const isTail = index === TRAIL_LENGTH - 1;

                // Taper sizes: Head is 24px, body is 18px tapering to 11px, tail is 14px
                const size = isHead ? 24 : (isTail ? 14 : 18 - (index * 0.8));

                const color = isHovering
                    ? (isHead ? "#EF4444" : "#F87171")
                    : (isHead ? "#86EFAC" : "#4ADE80");

                const scale = isHead && isClicking ? 0.75 : 1;

                return (
                    <div
                        key={index}
                        className="fixed pointer-events-none z-[9999] will-change-transform"
                        style={{
                            left: 0,
                            top: 0,
                            width: `${size}px`,
                            height: `${size}px`,
                            transform: `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0) rotate(${pos.angle}deg) scale(${scale})`,
                            opacity: isHead ? 1 : 1 - (index / (TRAIL_LENGTH + 1)),
                            zIndex: 10000 - index,
                        }}
                    >
                        {isHead ? (
                            // Pixel Art Snake Head SVG (Points UP)
                            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="2" width="6" height="10" fill={color} />
                                <rect x="4" y="4" width="8" height="6" fill={color} />
                                <rect x="6" y="0" width="4" height="2" fill={color} />
                                {/* Eyes */}
                                <rect x="4" y="7" width="2" height="2" fill="#000000" />
                                <rect x="10" y="7" width="2" height="2" fill="#000000" />
                                {/* White highlight inside eyes */}
                                <rect x="5" y="7" width="1" height="1" fill="#FFFFFF" />
                                <rect x="11" y="7" width="1" height="1" fill="#FFFFFF" />
                                {/* Flicking tongue when hovering links */}
                                {isHovering && (
                                    <>
                                        <rect x="7" y="-2" width="2" height="2" fill="#EF4444" />
                                        <rect x="6" y="-4" width="1" height="2" fill="#EF4444" />
                                        <rect x="9" y="-4" width="1" height="2" fill="#EF4444" />
                                    </>
                                )}
                            </svg>
                        ) : isTail ? (
                            // Pixel Art Snake Tail SVG (Points UP/FORWARD, matching segment angle direction)
                            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="0" width="6" height="4" fill={color} />
                                <rect x="6" y="4" width="4" height="4" fill={color} />
                                <rect x="7" y="8" width="2" height="4" fill={color} />
                                {/* Rattle tip */}
                                <rect x="7" y="12" width="2" height="4" fill={isHovering ? "#FEE2E2" : "#DCFCE7"} />
                            </svg>
                        ) : (
                            // Pixel Art Snake Body Segment SVG (Points UP)
                            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="1" width="8" height="14" fill={color} />
                                <rect x="3" y="3" width="10" height="10" fill={color} />
                                {/* Scale details */}
                                <rect x="6" y="5" width="4" height="6" fill={isHovering ? "#EF4444" : "#22C55E"} opacity="0.6" />
                                <rect x="7" y="7" width="2" height="2" fill={isHovering ? "#F87171" : "#86EFAC"} />
                            </svg>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default RetroCursor;
