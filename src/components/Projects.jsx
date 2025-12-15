import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data';
import { Github } from 'lucide-react';

const Projects = () => {
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
        <section ref={sectionRef} id="projects" className="section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                        <div
                            key={`${project.title}-${index}`}
                            className="card flex flex-col justify-between group project-card"
                            style={{
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                transformStyle: 'preserve-3d',
                                perspective: '1000px',
                                opacity: 0,
                                animation: isVisible ? `fadeInUp 0.6s ease ${index * 0.1}s forwards` : 'none',
                            }}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                const centerX = rect.width / 2;
                                const centerY = rect.height / 2;
                                const rotateX = (y - centerY) / 30; // Reduced rotation
                                const rotateY = (centerX - x) / 30;

                                e.currentTarget.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
                            }}
                        >
                            <div>
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

                            <div className="flex gap-2" style={{ marginTop: 'auto' }}>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
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
                    ))}
                </div>
            </div>

            <div style={{
                textAlign: 'center',
                marginTop: '4rem',
                opacity: 0,
                animation: isVisible ? 'fadeInUp 0.6s ease 0.6s forwards' : 'none',
            }}>
                <a
                    href="https://github.com/SudoAnirudh?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{
                        padding: '0.8rem 2rem',
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
