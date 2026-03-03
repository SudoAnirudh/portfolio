"use client";
import React, { useState } from 'react';
import { portfolioData, Project } from '@/data/portfolio';
import ProjectModal from './ProjectModal';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleOpenProject = (project: Project, index: number) => {
        setSelectedProject(project);
        setSelectedIndex(index);
    };

    const handleCloseProject = () => {
        setSelectedProject(null);
        setSelectedIndex(null);
    };

    const handleNavigateProject = (direction: 'prev' | 'next') => {
        if (selectedIndex === null) return;
        const total = portfolioData.projects.length;
        const nextIndex =
            direction === 'next'
                ? (selectedIndex + 1) % total
                : (selectedIndex - 1 + total) % total;

        setSelectedIndex(nextIndex);
        setSelectedProject(portfolioData.projects[nextIndex]);
    };

    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0" id="projects">
            <div className="bg-zinc-200 bento-card rounded-t-xl rounded-b-none border-4 border-black border-b-0 p-3 sm:p-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-retro-charcoal">folder_open</span>
                    <span className="font-pixel text-[10px] sm:text-sm uppercase break-all">C:\USERS\ANIRUDH\PROJECTS</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-4 h-4 bg-retro-charcoal border border-white"></div>
                    <div className="w-4 h-4 bg-retro-charcoal border border-white"></div>
                    <div className="w-4 h-4 bg-red-500 border border-white/20"></div>
                </div>
            </div>

            <div className="bg-retro-white border-4 border-black p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                    {portfolioData.projects.map((project, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer"
                            onClick={() => handleOpenProject(project, index)}
                        >
                            <div className="bg-zinc-100 border-2 border-black p-2 mb-2 group-hover:bg-retro-yellow transition-colors relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full aspect-video object-cover border border-black grayscale group-hover:grayscale-0 transition-all"
                                    />
                                ) : (
                                    <div className="w-full aspect-video flex items-center justify-center bg-retro-charcoal/5 border border-black">
                                        <span className="material-symbols-outlined text-6xl text-retro-charcoal/20 group-hover:text-retro-charcoal transition-colors">{project.icon}</span>
                                    </div>
                                )}
                            </div>

                            <div className="text-center">
                                <h3 className="font-pixel text-sm uppercase tracking-wider mb-1 px-2 bg-black text-white inline-block">
                                    {project.title}
                                </h3>
                                <div className="text-xs font-body text-zinc-500 truncate px-2">
                                    {project.title.toLowerCase()}.exe
                                </div>
                                <div className="flex justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-xs font-bold uppercase underline hover:text-retro-orange">
                                        Load Cartridge
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8 sm:mt-12">
                    <a
                        href={portfolioData.personal.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-retro-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-center"
                    >
                        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">rocket_launch</span>
                        <span className="font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider">Explore More Projects</span>
                    </a>
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                currentIndex={selectedIndex}
                totalProjects={portfolioData.projects.length}
                onClose={handleCloseProject}
                onNavigate={handleNavigateProject}
            />
        </section>
    );
};

export default Projects;
