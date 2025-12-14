import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const categories = ['All', 'Machine Learning', 'NLP', 'Computer Vision', 'App Dev'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.category === filter);

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

                {/* Filter Buttons */}
                <div className="flex justify-center gap-2 mb-8 flex-wrap" style={{
                    marginBottom: '3rem',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease 0.2s',
                }}>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            style={{
                                padding: '0.6rem 1.8rem',
                                borderRadius: '50px',
                                border: filter === category ? '2px solid var(--accent)' : '2px solid transparent',
                                background: filter === category ? 'var(--accent)' : 'rgba(56, 189, 248, 0.05)',
                                color: filter === category ? 'var(--bg-color)' : 'var(--text-secondary)',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: filter === category ? '0 0 20px var(--accent-glow)' : 'none',
                                backdropFilter: 'blur(10px)',
                            }}
                            onMouseEnter={(e) => {
                                if (filter !== category) {
                                    e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
                                    e.currentTarget.style.borderColor = 'var(--accent)';
                                    e.currentTarget.style.color = 'var(--accent)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (filter !== category) {
                                    e.currentTarget.style.background = 'rgba(56, 189, 248, 0.05)';
                                    e.currentTarget.style.borderColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProjects.map((project, index) => (
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
        </section>
    );
};

export default Projects;
