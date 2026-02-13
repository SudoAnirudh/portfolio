"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

const MESSAGES = {
    idle: [
        "Are you still there? Or did you find a better portfolio?",
        "I'm billing you for this server time.",
        "Take your time. It's not like I have calculations to do.",
        "Hello? Is it me you're looking for?",
        "Did you fall asleep on the keyboard?"
    ],
    scrollFast: [
        "Slow down, speed racer.",
        "You're scrolling faster than I can render.",
        "Trying to speedrun my life functionality?",
        "Whoa there, let the pixels buffer.",
        "My GPU is filing a complaint."
    ],
    copy: [
        "Nice try. Write your own code.",
        "Ctrl+C is not a design pattern.",
        "I saw that.",
        "Plagiarism is the highest form of flattery, I guess.",
        "This code is cursed. Good luck."
    ],
    generic: [
        "Why did you click that?",
        "Systems nominal... unlike your attention span.",
        "Downloading more RAM...",
        "Error 418: I'm a teapot."
    ]
};

export const useSarcasticObserver = () => {
    const [message, setMessage] = useState<string | null>(null);
    const lastScrollY = useRef(0);
    const idleTimer = useRef<NodeJS.Timeout>(null);

    const triggerMessage = useCallback((category: keyof typeof MESSAGES) => {
        // 30% chance to actually show a message to not be too annoying
        if (Math.random() > 0.3) return;

        const options = MESSAGES[category];
        const randomMsg = options[Math.floor(Math.random() * options.length)];
        setMessage(randomMsg);
    }, []);

    // Idle Detection
    const resetIdleTimer = useCallback(() => {
        if (idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
            triggerMessage('idle');
        }, 15000); // 15 seconds idle
    }, [triggerMessage]);

    useEffect(() => {
        // Scroll Detection
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = Math.abs(currentScrollY - lastScrollY.current);

            if (delta > 150) { // Fast scroll threshold
                triggerMessage('scrollFast');
            }

            lastScrollY.current = currentScrollY;
            resetIdleTimer();
        };

        // Copy Detection
        const handleCopy = () => {
            const options = MESSAGES.copy;
            // Always trigger on copy
            setMessage(options[Math.floor(Math.random() * options.length)]);
        };

        // Activity Listeners for Idle Reset
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', resetIdleTimer);
        window.addEventListener('keydown', resetIdleTimer);
        window.addEventListener('copy', handleCopy);

        // Init timer
        resetIdleTimer();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', resetIdleTimer);
            window.removeEventListener('keydown', resetIdleTimer);
            window.removeEventListener('copy', handleCopy);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, [resetIdleTimer, triggerMessage]);

    const clearMessage = () => setMessage(null);

    return { message, clearMessage };
};
