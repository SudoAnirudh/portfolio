import React from 'react';
import { skills, education } from '../data';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* Education */}
                    <div className="md:col-span-2">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>Education</h3>
                        <div className="grid md:grid-cols-3 gap-2">
                            {education.map((edu, index) => (
                                <div key={index} className="card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{edu.institution}</h4>
                                    <p style={{ color: 'var(--accent)', fontWeight: '500', margin: '0.5rem 0' }}>{edu.degree}</p>
                                    <div className="flex justify-between" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        <span>{edu.duration}</span>
                                        <span>{edu.details}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="md:col-span-2" style={{ marginTop: '1rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent)', textAlign: 'center' }}>Technical Skills</h3>
                        <div className="skills-grid">
                            {skills.map((skillGroup, index) => {
                                const IconComponent = skillGroup.icon;
                                return (
                                    <div key={index} className="skill-category-card">
                                        <div className="skill-category-header">
                                            <IconComponent className="skill-category-icon" size={24} />
                                            <h4 className="skill-category-title">{skillGroup.category}</h4>
                                        </div>
                                        <div className="skill-items">
                                            {skillGroup.items.map((skill, idx) => (
                                                <span key={idx} className="skill-badge">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* GitHub Activity */}
                    <div className="md:col-span-2" style={{ marginTop: '1rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent)', textAlign: 'center' }}>GitHub Activity</h3>
                        <div className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                            {/* Using ghchart.rshah.org API for a lightweight solution without extra dependencies */}
                            <img
                                src="https://ghchart.rshah.org/38bdf8/anirudhsudheer"
                                alt="Anirudh's GitHub Contribution Graph"
                                style={{ maxWidth: '100%', minWidth: '600px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
