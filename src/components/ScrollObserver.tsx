"use client";

import { useEffect } from "react";

const ScrollObserver = () => {
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
        if (!elements.length) {
            return;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            elements.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    return null;
};

export default ScrollObserver;
