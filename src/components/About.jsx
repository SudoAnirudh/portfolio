import React from 'react';
import { motion } from 'framer-motion';
import { education, profile } from '../data';
// import TechMarquee from './TechMarquee';
import SkillSphere from './SkillSphere';
import JupyterAbout from './JupyterAbout';
import ScrambleTitle from './ScrambleTitle';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <ScrambleTitle title="About Me" />

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
                        style={{ flex: 1, width: '100%' }}
                    >
                        <JupyterAbout />
                    </motion.div>
                </div>

                <div style={{ marginBottom: '4rem' }}>
                    <ScrambleTitle title="Education" className="subsection-title-center" />
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

                <div style={{ marginBottom: '4rem' }}>
                    <ScrambleTitle title="Technical Skills" className="subsection-title-center" />
                    <SkillSphere />
                </div>
            </div>
        </section>
    );
};

export default About;

