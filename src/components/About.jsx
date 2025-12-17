import React from 'react';
import { motion } from 'framer-motion';
import { education, profile } from '../data';
import TechMarquee from './TechMarquee';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-title"
                >
                    About Me
                </motion.h2>

                <div className="about-content">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="profile-image-container"
                    >
                        <img src={profile.imgUrl} alt={profile.name} className="profile-image" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="about-text"
                    >
                        <p>{profile.about}</p>
                    </motion.div>
                </div>

                <div style={{ marginBottom: '4rem' }}>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="subsection-title-center"
                        style={{ color: 'var(--text-primary)', fontWeight: '500' }}
                    >
                        Education
                    </motion.h3>
                    <div className="education-list">
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                className="education-item"
                            >
                                <div className="edu-year">{edu.duration}</div>
                                <div className="edu-info">
                                    <h4 className="edu-school">{edu.institution}</h4>
                                    <p className="edu-degree-clean">{edu.degree}</p>
                                    <p className="edu-score">{edu.details}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h3 className="subsection-title-center" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                        Technical Skills
                    </h3>
                    <TechMarquee />
                </motion.div>
            </div>
        </section>
    );
};

export default About;

