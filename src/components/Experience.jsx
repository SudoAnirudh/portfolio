import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data';
import ScrambleTitle from './ScrambleTitle';

const Experience = () => {
    return (
        <section id="experience" className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <ScrambleTitle title="Experience" />

                <div className="timeline">
                    {/* Vertical Line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        className="timeline-line"
                    ></motion.div>

                    {experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="timeline-item"
                        >
                            {/* Dot */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                                className="timeline-dot"
                            ></motion.div>

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
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
