import React, { useState } from 'react';
import { projects } from '../data';
import { Github } from 'lucide-react';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Machine Learning', 'NLP', 'Computer Vision', 'App Dev'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <section id="projects" className="section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>

                {/* Filter Buttons */}
                <div className="flex justify-center gap-2 mb-8 flex-wrap" style={{ marginBottom: '3rem' }}>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            style={{
                                padding: '0.5rem 1.5rem',
                                borderRadius: '50px',
                                border: 'none',
                                background: filter === category ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)',
                                color: filter === category ? 'var(--bg-color)' : 'var(--text-secondary)',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: filter === category ? '0 0 15px var(--accent-glow)' : 'none'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProjects.map((project, index) => (
                        <div key={index} className="card flex flex-col justify-between group" style={{
                            transition: 'all 0.3s ease',
                            transformStyle: 'preserve-3d',
                            perspective: '1000px',
                            animation: 'fadeIn 0.5s ease forwards'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
                                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(56, 189, 248, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>{project.title}</h3>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '10px',
                                        background: 'rgba(56, 189, 248, 0.1)',
                                        color: 'var(--accent)'
                                    }}>
                                        {project.category}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '1rem' }}>{project.tech}</p>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex gap-2" style={{ marginTop: 'auto' }}>
                                <a href={project.link} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Github size={16} /> Code
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
