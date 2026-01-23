import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [cursorVariant, setCursorVariant] = useState('default');

    // Mouse position state
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring configuration for smooth follow effect
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Allow pointer events to pass through and detect active element
            const target = e.target;

            // Check efficient properties first to avoid layout thrashing
            if (target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer') {
                setCursorVariant('pointer');
            } else {
                setCursorVariant('default');
            }
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    const variants = {
        default: {
            width: 16,
            height: 16,
            backgroundColor: "var(--text-primary)",
            mixBlendMode: "difference",
            x: "-50%",
            y: "-50%"
        },
        pointer: {
            width: 64,
            height: 64,
            backgroundColor: "var(--text-primary)",
            mixBlendMode: "difference",
            x: "-50%",
            y: "-50%"
        }
    };

    return (
        <motion.div
            className="custom-cursor"
            variants={variants}
            animate={cursorVariant}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 9999,
                pointerEvents: 'none',
                borderRadius: '50%',
            }}
        />
    );
};

export default CustomCursor;
