import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrambleTitle = ({ title, className = "section-title", style = {} }) => {
    const [displayText, setDisplayText] = useState("");
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef(null);
    const iterationRef = useRef(0);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const chars = "01"; // Binary theme

    const startScramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);
        iterationRef.current = 0;

        intervalRef.current = setInterval(() => {
            setDisplayText(
                title.split("")
                    .map((char, index) => {
                        if (index < iterationRef.current) {
                            return title[index];
                        }
                        if (char === " ") return " ";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iterationRef.current >= title.length) {
                clearInterval(intervalRef.current);
                setIsScrambling(false);
            }

            iterationRef.current += 1 / 3; // Controls speed of reveal
        }, 30);
    };

    useEffect(() => {
        if (isInView) {
            startScramble();
        }
    }, [isInView]);

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <motion.h2
            ref={containerRef}
            className={className}
            style={{ cursor: 'default', ...style }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
            {displayText || " "}
        </motion.h2>
    );
};

export default ScrambleTitle;
