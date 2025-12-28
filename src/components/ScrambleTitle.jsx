import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ScrambleTitle = ({ title, className = "section-title" }) => {
    const [displayText, setDisplayText] = useState(title);
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef(null);
    const iterationRef = useRef(0);

    const chars = "01"; // Binary theme

    const startScramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);
        iterationRef.current = 0;

        intervalRef.current = setInterval(() => {
            setDisplayText(prev =>
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

    const stopScramble = () => {
        clearInterval(intervalRef.current);
        setDisplayText(title);
        setIsScrambling(false);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <motion.h2
            className={className}
            onMouseEnter={startScramble}
            onMouseLeave={stopScramble}
            style={{ cursor: 'default' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {displayText}
        </motion.h2>
    );
};

export default ScrambleTitle;
