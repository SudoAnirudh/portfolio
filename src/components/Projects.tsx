"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData, Project } from '@/data/portfolio';
import ProjectModal from './ProjectModal';

const CATEGORIES = [
    { id: 'ALL', label: 'ALL PROJECTS' },
    { id: 'AI & ML', label: 'AI & ML' },
    { id: 'Mobile', label: 'MOBILE & ANDROID' },
    { id: 'Full-Stack', label: 'FULL-STACK' }
];

const Projects = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const filteredProjects = portfolioData.projects.filter(project => {
        if (selectedCategory === 'ALL') return true;
        return project.category?.includes(selectedCategory);
    });

    const getCategoryCount = (catId: string) => {
        if (catId === 'ALL') return portfolioData.projects.length;
        return portfolioData.projects.filter(p => p.category?.includes(catId)).length;
    };

    const handleOpenProject = (project: Project) => {
        const indexInAll = portfolioData.projects.findIndex(p => p.title === project.title);
        setSelectedProject(project);
        setSelectedIndex(indexInAll !== -1 ? indexInAll : 0);
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
                {/* Category Pill Filters */}
                <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 border-b-2 border-black/10 pb-4">
                    <span className="font-pixel text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider mr-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        FILTER:
                    </span>
                    {CATEGORIES.map(cat => {
                        const isActive = selectedCategory === cat.id;
                        const count = getCategoryCount(cat.id);

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3 py-1.5 font-pixel text-[10px] sm:text-xs uppercase tracking-wider border-2 transition-all flex items-center gap-1.5 rounded-sm ${
                                    isActive
                                        ? 'bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] scale-[1.03]'
                                        : 'bg-zinc-100 text-zinc-800 border-black/30 hover:border-black hover:bg-zinc-200'
                                }`}
                            >
                                <span>{cat.label}</span>
                                <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isActive ? 'bg-retro-yellow text-black font-bold' : 'bg-black/10 text-zinc-600'}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => {
                            const statusSpec = project.specs.find(spec => spec.label === "Status");
                            const isOngoing = statusSpec && (
                                statusSpec.value.toLowerCase().includes("ongoing") || 
                                statusSpec.value.toLowerCase().includes("beta")
                            );

                            return (
                                <motion.button
                                    key={project.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.25 }}
                                    className="group cursor-pointer text-left block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-yellow"
                                    onClick={() => handleOpenProject(project)}
                                    aria-label={`View details for ${project.title}`}
                                >
                                    <div className="bg-zinc-100 border-2 border-black p-2 mb-2 group-hover:bg-retro-yellow transition-colors relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        {isOngoing && (
                                            <div className="absolute top-4 right-4 z-10 bg-retro-orange border-2 border-black px-2 py-0.5 text-[8px] font-pixel uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none">
                                                Ongoing
                                            </div>
                                        )}
                                        {project.image ? (
                                            <div className="relative w-full aspect-video border border-black overflow-hidden">
                                                <Image
                                                    src={project.image}
                                                    alt={`Project Thumbnail: ${project.title} - ${project.description.slice(0, 50)}...`}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover grayscale group-hover:grayscale-0 transition-all"
                                                />
                                            </div>
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
                                            <span className="text-xs font-bold uppercase underline hover:text-retro-orange">
                                                Load Cartridge
                                            </span>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

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
