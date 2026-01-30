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
                        <div key={index} className="group flex flex-col h-full">
                            <div className={`aspect-video bg-white thin-border rounded-sm overflow-hidden mb-8 flex items-center justify-center bg-gray-100 transform hover:shadow-lg transition-all duration-500 ${index % 2 === 0 ? 'hover:-rotate-1' : 'hover:rotate-1'} relative`}>
                                {(project as any).image ? (
                                    <img
                                        src={(project as any).image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                ) : (
                                    <span className="material-symbols-outlined text-4xl text-gray-300">{project.icon}</span>
                                )}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                            <p className="text-muted text-sm font-light mb-auto">{project.description}</p>
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <a href={(project as any).github} className="inline-flex items-center text-[11px] font-bold tracking-[0.2em] uppercase text-black hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-4 h-4 mr-2 opacity-80" alt="GitHub" />
                                    View Code
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <a href={portfolioData.personal.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-accent transition-colors group">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-5 h-5 mr-3 invert" alt="GitHub" />
                        Explore More Projects
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
