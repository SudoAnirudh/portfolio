import React, { useState, useEffect, useRef } from 'react';
import { experience } from '../data';

const Experience = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 className="section-title" style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease',
                }}>Experience</h2>

                <div className="timeline" style={{ position: 'relative', paddingTop: '2rem' }}>
                    {/* Vertical Line */}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'linear-gradient(180deg, transparent, var(--accent), transparent)',
                        transform: 'translateX(-50%)',
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 1s ease 0.3s',
                    }}></div>

                    {experience.map((exp, index) => (
                        <div
                            key={index}
                            className="timeline-item"
                            style={{
                                position: 'relative',
                                display: 'flex',
                                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                                marginBottom: '3rem',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateX(0)' : `translateX(${index % 2 === 0 ? '-50px' : '50px'})`,
                                transition: `all 0.6s ease ${0.4 + index * 0.15}s`,
                            }}
                        >
                            {/* Dot */}
                            <div style={{
                                position: 'absolute',
                                left: '50%',
                                top: '1.5rem',
                                width: '16px',
                                height: '16px',
                                background: 'var(--accent)',
                                borderRadius: '50%',
                                transform: 'translateX(-50%)',
                                boxShadow: '0 0 0 4px var(--bg-secondary), 0 0 20px var(--accent-glow)',
                                zIndex: 2,
                                opacity: isVisible ? 1 : 0,
                                transition: `all 0.6s ease ${0.5 + index * 0.15}s`,
                            }}></div>

                            <div className="card" style={{
                                width: '45%',
                                padding: '1.5rem',
                            }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.3rem 0.8rem',
                                    background: 'rgba(56, 189, 248, 0.1)',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    color: 'var(--accent)',
                                    marginBottom: '1rem',
                                    border: '1px solid rgba(56, 189, 248, 0.2)',
                                }}>
                                    {exp.duration}
                                </div>
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '700',
                                    marginBottom: '0.5rem',
                                    background: 'linear-gradient(135deg, var(--text-primary), var(--accent))',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>{exp.role}</h3>
                                <p style={{
                                    fontSize: '1rem',
                                    color: 'var(--accent)',
                                    marginBottom: '1rem',
                                    fontWeight: '600',
                                }}>{exp.company}</p>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
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
