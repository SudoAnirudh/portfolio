"use client";
import React, { useEffect, useState, useRef } from 'react';

const MAX_TRAIL_LENGTH = 10;
const LOW_POWER_TRAIL_LENGTH = 6;

const RetroCursor = () => {
    const [reducedMotion, setReducedMotion] = useState(false);
    const [isTextInput, setIsTextInput] = useState(false);
    const [hoverType, setHoverType] = useState<'none' | 'link' | 'project'>('none');
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [segmentCount, setSegmentCount] = useState(MAX_TRAIL_LENGTH);
    const [staticPos, setStaticPos] = useState({ x: -100, y: -100 });

    const mousePos = useRef({ x: -100, y: -100 });
    const lastMoveTime = useRef(Date.now());
    const hoverTypeRef = useRef<'none' | 'link' | 'project'>('none');
    const isClickingRef = useRef(false);
    const isTextInputRef = useRef(false);
    const segsRef = useRef<{ x: number; y: number; angle: number }[]>([]);
    const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Keep refs in sync with state for rAF loop
    useEffect(() => {
        hoverTypeRef.current = hoverType;
    }, [hoverType]);

    useEffect(() => {
        isClickingRef.current = isClicking;
    }, [isClicking]);

    useEffect(() => {
        isTextInputRef.current = isTextInput;
    }, [isTextInput]);

    useEffect(() => {
        // Detect prefers-reduced-motion
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);

        const handleMotionChange = (e: MediaQueryListEvent) => {
            setReducedMotion(e.matches);
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMotionChange);
        } else {
            mediaQuery.addListener(handleMotionChange);
        }

        // Hardware concurrency check for mid-range / lower-spec devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
            setSegmentCount(LOW_POWER_TRAIL_LENGTH);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleMotionChange);
            } else {
                mediaQuery.removeListener(handleMotionChange);
            }
        };
    }, []);

    useEffect(() => {
        // Only run on client and non-touch devices
        if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        setIsVisible(true);
        document.body.classList.add('custom-cursor');

        // Initialize segments at center or current mouse pos
        const initialCount = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 
            ? LOW_POWER_TRAIL_LENGTH 
            : MAX_TRAIL_LENGTH;

        const initialX = window.innerWidth / 2;
        const initialY = window.innerHeight / 2;

        segsRef.current = Array.from({ length: initialCount }).map(() => ({
            x: initialX,
            y: initialY,
            angle: 0
        }));

        let lastTarget: EventTarget | null = null;
        let staticPosRafId: number;

        const updateMousePos = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            lastMoveTime.current = Date.now();

            if (reducedMotion) {
                // PERFORMANCE: Throttle high-frequency React state updates to prevent layout thrashing
                if (staticPosRafId) cancelAnimationFrame(staticPosRafId);
                staticPosRafId = requestAnimationFrame(() => {
                    setStaticPos({ x: e.clientX, y: e.clientY });
                });
            }

            // Target context detection
            const target = e.target as HTMLElement;

            if (target && target !== lastTarget) {
                lastTarget = target;

                // 1. Text input & selection context check
                const isInput = !!(
                    target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.tagName === 'SELECT' ||
                    target.isContentEditable ||
                    target.closest('input, textarea, select, [contenteditable]') ||
                    target.getAttribute('data-native-cursor') === 'true' ||
                    getComputedStyle(target).cursor === 'text'
                );

                if (isInput) {
                    setIsTextInput(true);
                    document.body.classList.add('custom-cursor-text');
                    setHoverType('none');
                    return;
                } else {
                    setIsTextInput(false);
                    document.body.classList.remove('custom-cursor-text');
                }

                // 2. Project Card specific hover vs general link hover
                const isProjectCard = !!(
                    target.closest('[data-project-card="true"]') ||
                    target.closest('[data-project="true"]')
                );

                if (isProjectCard) {
                    setHoverType('project');
                } else {
                    const isClickable = !!(
                        target.tagName === 'A' ||
                        target.tagName === 'BUTTON' ||
                        target.closest('a') ||
                        target.closest('button') ||
                        target.getAttribute('role') === 'button' ||
                        getComputedStyle(target).cursor === 'pointer'
                    );

                    setHoverType(isClickable ? 'link' : 'none');
                }
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        let animationFrameId: number;

        // High-performance rAF loop updating DOM transforms directly via refs
        const loop = () => {
            if (!reducedMotion && segsRef.current.length > 0) {
                const now = Date.now();
                const idleDuration = now - lastMoveTime.current;
                const isIdle = idleDuration > 2000;

                const head = segsRef.current[0];

                if (head) {
                    const dxHead = mousePos.current.x - head.x;
                    const dyHead = mousePos.current.y - head.y;

                    let headAngle = head.angle;
                    if (Math.hypot(dxHead, dyHead) > 0.5) {
                        headAngle = Math.atan2(dyHead, dxHead) * (180 / Math.PI) + 90;
                    }

                    // Smooth easing toward mouse position
                    head.x += dxHead * 0.28;
                    head.y += dyHead * 0.28;
                    head.angle = headAngle;

                    // Tightened coil lerp when hovering project cards (0.72 vs 0.45)
                    const lerpSpeed = hoverTypeRef.current === 'project' ? 0.72 : 0.45;

                    for (let i = 1; i < segsRef.current.length; i++) {
                        const current = segsRef.current[i];
                        const prev = segsRef.current[i - 1];

                        const dx = prev.x - current.x;
                        const dy = prev.y - current.y;

                        let angle = current.angle;
                        if (Math.hypot(dx, dy) > 0.5) {
                            angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
                        }

                        // Subtle idle tail sway
                        if (isIdle && i === segsRef.current.length - 1) {
                            angle += Math.sin(now * 0.002) * 4;
                        }

                        current.x += dx * lerpSpeed;
                        current.y += dy * lerpSpeed;
                        current.angle = angle;
                    }

                    // Directly update DOM element styles for zero React re-render overhead
                    for (let i = 0; i < segsRef.current.length; i++) {
                        const el = segmentRefs.current[i];
                        if (!el) continue;

                        const pos = segsRef.current[i];
                        const isHead = i === 0;
                        const isTail = i === segsRef.current.length - 1;

                        const size = isHead ? 24 : (isTail ? 14 : 18 - (i * 0.8));

                        let scale = 1;
                        if (isHead && isClickingRef.current) {
                            scale = 0.75;
                        } else if (isHead && isIdle) {
                            // Gentle sub-perceptual idle breathing
                            scale = 1 + 0.04 * Math.sin(now * 0.003);
                        } else if (isHead && hoverTypeRef.current === 'project') {
                            scale = 1.1;
                        }

                        el.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0) rotate(${pos.angle}deg) scale(${scale})`;
                        el.style.opacity = isTextInputRef.current ? '0' : (isHead ? '1' : `${1 - (i / (segsRef.current.length + 1))}`);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', updateMousePos);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        loop();

        return () => {
            document.body.classList.remove('custom-cursor');
            document.body.classList.remove('custom-cursor-text');
            window.removeEventListener('mousemove', updateMousePos);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animationFrameId);
            if (staticPosRafId) cancelAnimationFrame(staticPosRafId);
        };
    }, [reducedMotion]);

    if (!isVisible) return null;

    // 1. Accessibility Fallback: Simple static dot cursor for reduced motion
    if (reducedMotion) {
        if (isTextInput) return null;

        return (
            <div
                className="fixed pointer-events-none z-[9999] rounded-full bg-retro-green border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform duration-75"
                style={{
                    left: 0,
                    top: 0,
                    width: hoverType === 'project' ? '16px' : hoverType === 'link' ? '14px' : '10px',
                    height: hoverType === 'project' ? '16px' : hoverType === 'link' ? '14px' : '10px',
                    transform: `translate3d(${staticPos.x - 5}px, ${staticPos.y - 5}px, 0)`,
                    backgroundColor: hoverType === 'project' ? '#FACC15' : hoverType === 'link' ? '#EF4444' : '#86EFAC',
                }}
            />
        );
    }

    // 2. Full Retro Pixel Snake Cursor
    const count = segmentCount;

    return (
        <div className={`transition-opacity duration-200 ${isTextInput ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {Array.from({ length: count }).map((_, index) => {
                const isHead = index === 0;
                const isTail = index === count - 1;

                const size = isHead ? 24 : (isTail ? 14 : 18 - (index * 0.8));

                // Color Palette: Retro Terminal Green (default), Red (link hover), Golden Yellow (project card hover)
                const mainColor = hoverType === 'project'
                    ? (isHead ? "#FACC15" : "#FDE047")
                    : hoverType === 'link'
                    ? (isHead ? "#EF4444" : "#F87171")
                    : (isHead ? "#86EFAC" : "#4ADE80");

                const scaleDetailColor = hoverType === 'project'
                    ? "#EAB308"
                    : hoverType === 'link'
                    ? "#DC2626"
                    : "#22C55E";

                const highlightColor = hoverType === 'project'
                    ? "#FEF08A"
                    : hoverType === 'link'
                    ? "#FEE2E2"
                    : "#DCFCE7";

                return (
                    <div
                        key={index}
                        ref={(el) => { segmentRefs.current[index] = el; }}
                        className="fixed pointer-events-none z-[9999] will-change-transform transition-opacity duration-150"
                        style={{
                            left: 0,
                            top: 0,
                            width: `${size}px`,
                            height: `${size}px`,
                            zIndex: 10000 - index,
                        }}
                    >
                        {isHead ? (
                            // Pixel Art Snake Head SVG
                            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="2" width="6" height="10" fill={mainColor} />
                                <rect x="4" y="4" width="8" height="6" fill={mainColor} />
                                <rect x="6" y="0" width="4" height="2" fill={mainColor} />
                                
                                {/* Eyes */}
                                <rect x="4" y="7" width="2" height="2" fill="#000000" />
                                <rect x="10" y="7" width="2" height="2" fill="#000000" />
                                
                                {/* Eye highlights */}
                                <rect x="5" y="7" width="1" height="1" fill={hoverType === 'project' ? "#10B981" : "#FFFFFF"} />
                                <rect x="11" y="7" width="1" height="1" fill={hoverType === 'project' ? "#10B981" : "#FFFFFF"} />

                                {/* Tongue animation on link & project hover */}
                                {hoverType !== 'none' && (
                                    <>
                                        {/* Main tongue stem */}
                                        <rect x="7" y="-2" width="2" height="2" fill={hoverType === 'project' ? "#10B981" : "#EF4444"} />
                                        {/* Forked tips with rapid flick effect on project hover */}
                                        <rect x="6" y="-4" width="1" height="2" fill={hoverType === 'project' ? "#10B981" : "#EF4444"} />
                                        <rect x="9" y="-4" width="1" height="2" fill={hoverType === 'project' ? "#10B981" : "#EF4444"} />
                                        
                                        {/* Extra project card coil tongue extension */}
                                        {hoverType === 'project' && (
                                            <>
                                                <rect x="5" y="-5" width="1" height="1" fill="#FACC15" />
                                                <rect x="10" y="-5" width="1" height="1" fill="#FACC15" />
                                            </>
                                        )}
                                    </>
                                )}
                            </svg>
                        ) : isTail ? (
                            // Pixel Art Snake Tail SVG
                            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="0" width="6" height="4" fill={mainColor} />
                                <rect x="6" y="4" width="4" height="4" fill={mainColor} />
                                <rect x="7" y="8" width="2" height="4" fill={mainColor} />
                                {/* Rattle tip */}
                                <rect x="7" y="12" width="2" height="4" fill={highlightColor} />
                            </svg>
                        ) : (
                            // Pixel Art Snake Body Segment SVG
                            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="1" width="8" height="14" fill={mainColor} />
                                <rect x="3" y="3" width="10" height="10" fill={mainColor} />
                                {/* Scale details */}
                                <rect x="6" y="5" width="4" height="6" fill={scaleDetailColor} opacity="0.7" />
                                <rect x="7" y="7" width="2" height="2" fill={highlightColor} />
                            </svg>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default RetroCursor;
