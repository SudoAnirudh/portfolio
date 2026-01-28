import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Projects = () => {
    return (
        <section className="py-32 px-8 section-border bg-gray-50/30" id="projects">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-end justify-between mb-20">
                    <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted">Selected Projects</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {portfolioData.projects.map((project, index) => (
                        <div key={index} className="group">
                            <div className={`aspect-video bg-white thin-border rounded-sm overflow-hidden mb-8 flex items-center justify-center bg-gray-100 transform hover:shadow-lg transition-all duration-500 ${index % 2 === 0 ? 'hover:-rotate-1' : 'hover:rotate-1'}`}>
                                <span className="material-symbols-outlined text-4xl text-gray-300">{project.icon}</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                            <p className="text-muted text-sm font-light mb-6">{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
