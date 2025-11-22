import React from 'react';
import { experience } from '../data';
import { Briefcase } from 'lucide-react';

const Experience = () => {
    return (
        <section id="experience" className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 className="section-title">Experience</h2>

                <div className="timeline" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                    {/* Vertical Line */}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '2px',
                        height: '100%',
                        background: 'var(--accent)',
                        opacity: '0.3'
                    }}></div>

                    {experience.map((exp, index) => (
                        <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} style={{
                            display: 'flex',
                            justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                            paddingBottom: '3rem',
                            width: '100%',
                            position: 'relative'
                        }}>
                            {/* Dot */}
                            <div style={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '16px',
                                height: '16px',
                                background: 'var(--accent)',
                                borderRadius: '50%',
                                border: '4px solid var(--bg-secondary)',
                                zIndex: 1,
                                boxShadow: '0 0 10px var(--accent-glow)'
                            }}></div>

                            {/* Content Card */}
                            <div className="card reveal-section" style={{
                                width: '45%',
                                padding: '1.5rem',
                                position: 'relative'
                            }}>
                                <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{exp.role}</h3>
                                    <span style={{
                                        background: 'rgba(56, 189, 248, 0.1)',
                                        color: 'var(--accent)',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem'
                                    }}>
                                        {exp.duration}
                                    </span>
                                </div>
                                <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                                    {exp.company} • {exp.type}
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
