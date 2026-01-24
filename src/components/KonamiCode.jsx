import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const KonamiCode = () => {
    const [input, setInput] = useState([]);
    const code = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a"
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            setInput((prev) => {
                const newInput = [...prev, e.key];
                if (newInput.length > code.length) {
                    newInput.shift();
                }
                return newInput;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (input.join('') === code.join('')) {
            triggerEasterEgg();
            setInput([]);
        }
    }, [input]);

    const triggerEasterEgg = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        // Optional: Show a "Secret Unlocked" toast or message
    };

    return null; // Invisible component
};

export default KonamiCode;
