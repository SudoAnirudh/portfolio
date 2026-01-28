import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data';
import { Github } from 'lucide-react';
import { Tilt } from 'react-tilt';
import ScrambleTitle from './ScrambleTitle';

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="container">
                <ScrambleTitle title="Featured Projects" />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                        <motion.div
                            key={`${project.title}-${index}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Tilt className="Tilt" options={{ max: 15, scale: 1.05, speed: 400, glitch: true }}>
                                <div className="card flex flex-col justify-between group project-card h-full overflow-hidden"
                                    style={{ transformStyle: "preserve-3d" }}>
                                    <div className="attention-grid"></div>
                                    <div className="attention-heatmap"></div>
                                    <div style={{ position: 'relative', zIndex: 2, transform: "translateZ(30px)" }}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 style={{
                                                fontSize: '1.25rem',
                                                fontWeight: '600',
                                                marginBottom: '0.8rem',
                                                color: 'var(--text-primary)',
                                            }}>{project.title}</h3>
                                        </div>

                                        <p style={{
                                            color: 'var(--text-secondary)',
                                            marginBottom: '1.5rem',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.6',
                                            fontWeight: '400'
                                        }}>
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex gap-2" style={{ marginTop: 'auto', position: 'relative', zIndex: 2, transform: "translateZ(30px)" }}>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline focus-ring"
                                            style={{
                                                width: '100%',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                fontSize: '0.9rem',
                                                padding: '0.6rem 0'
                                            }}
                                        >
                                            <Github size={16} /> View Code
                                        </a>
                                    </div>
                                </div>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                    textAlign: 'center',
                    marginTop: '4rem',
                }}
            >
                <a
                    href="https://github.com/SudoAnirudh?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline focus-ring"
                    style={{
                        padding: '0.8rem 2rem',
                        gap: '0.5rem',
                        borderRadius: '50px',
                    }}
                >
                    <Github size={20} /> Explore More Projects
                </a>
            </motion.div>
        </section>
    );
};

export default Projects;
