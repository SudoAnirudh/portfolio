import React, { useState, useEffect, useRef } from 'react';
import { experience } from '../data';

const Experience = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 className="section-title">Experience</h2>

                <div className="timeline">
                    {/* Vertical Line */}
                    <div className="timeline-line"></div>

                    {experience.map((exp, index) => (
                        <div
                            key={index}
                            className="timeline-item"
                            style={{
                                animation: isVisible ? `fadeInUp 0.6s ease ${0.4 + index * 0.15}s forwards` : 'none',
                                opacity: 0
                            }}
                        >
                            {/* Dot */}
                            <div className="timeline-dot"></div>

                            <div className="card timeline-content">
                                <div style={{
                                    display: 'inline-block',
                                    marginBottom: '1rem',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    fontWeight: '500',
                                    letterSpacing: '0.05em'
                                }}>
                                    {exp.duration}
                                </div>
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '600',
                                    marginBottom: '0.2rem',
                                    color: 'var(--text-primary)'
                                }}>{exp.role}</h3>
                                <p style={{
                                    fontSize: '1rem',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '1rem',
                                    fontWeight: '500'
                                }}>{exp.company}</p>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                    opacity: 0.9
                                }}>{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
