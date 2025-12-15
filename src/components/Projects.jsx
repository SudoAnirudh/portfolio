import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data';
import { Github } from 'lucide-react';

const Projects = () => {
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
        <section ref={sectionRef} id="projects" className="section">
            <div className="container">
                <h2 className="section-title" style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease',
                }}>Featured Projects</h2>

                <div className="grid md:grid-cols-2 md:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                        <div
                            key={`${project.title}-${index}`}
                            className="card flex flex-col justify-between group project-card"
                            style={{
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                transformStyle: 'preserve-3d',
                                perspective: '1000px',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transitionDelay: `${0.4 + index * 0.1}s`,
                            }}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                const centerX = rect.width / 2;
                                const centerY = rect.height / 2;
                                const rotateX = (y - centerY) / 20;
                                const rotateY = (centerX - x) / 20;

                                e.currentTarget.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
                            }}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 style={{
                                        fontSize: '1.3rem',
                                        fontWeight: '700',
                                        marginBottom: '0.5rem',
                                        background: 'linear-gradient(135deg, var(--text-primary), var(--accent))',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}>{project.title}</h3>

                                </div>

                                <p style={{
                                    color: 'var(--text-secondary)',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                }}>
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex gap-2" style={{ marginTop: 'auto' }}>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                    style={{
                                        padding: '0.6rem 1.2rem',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        flex: 1,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Github size={16} /> View Code
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                textAlign: 'center',
                marginTop: '3rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.6s',
            }}>
                <a
                    href="https://github.com/SudoAnirudh?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{
                        padding: '0.8rem 2rem',
                        fontSize: '1rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        borderRadius: '50px',
                    }}
                >
                    <Github size={20} /> Explore More Projects
                </a>
            </div>
        </section>
    );
};

export default Projects;
