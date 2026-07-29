"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

    const featuredProjects = filteredProjects.filter(p => p.featured);
    const secondaryProjects = filteredProjects.filter(p => !p.featured);

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
            {/* Header Frame */}
            <div className="bg-zinc-200 bento-card rounded-t-2xl rounded-b-none border-4 border-black border-b-0 p-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-retro-charcoal text-xl">folder_special</span>
                    <span className="font-pixel text-xs sm:text-sm uppercase tracking-wider font-bold">PROJECTS & CASE STUDIES</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-pixel text-[10px] text-zinc-600 uppercase hidden sm:inline">03 // PROOF & IMPACT</span>
                </div>
            </div>

            <div className="bg-retro-white border-4 border-black p-5 sm:p-8 rounded-b-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {/* Category Pill Filters */}
                <div className="mb-8 flex flex-wrap items-center gap-2 border-b-2 border-black/10 pb-5">
                    <span className="font-pixel text-xs text-zinc-500 uppercase tracking-wider mr-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        FILTER BY:
                    </span>
                    {CATEGORIES.map(cat => {
                        const isActive = selectedCategory === cat.id;
                        const count = getCategoryCount(cat.id);

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3 py-1.5 font-pixel text-xs uppercase tracking-wider border-2 transition-all flex items-center gap-2 rounded-lg cursor-pointer ${
                                    isActive
                                        ? 'bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] scale-[1.02]'
                                        : 'bg-zinc-100 text-zinc-800 border-black/30 hover:border-black hover:bg-zinc-200'
                                }`}
                            >
                                <span>{cat.label}</span>
                                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${isActive ? 'bg-retro-yellow text-black' : 'bg-black/10 text-zinc-600'}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Section 1: Featured Flagship Projects */}
                {featuredProjects.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2.5 h-2.5 rounded-full bg-retro-orange inline-block"></span>
                            <h3 className="font-pixel text-xs sm:text-sm uppercase tracking-widest text-zinc-600 font-bold">
                                FEATURED FLAGSHIP PROJECTS
                            </h3>
                        </div>

                        <div className="space-y-8">
                            {featuredProjects.map((project) => (
                                <motion.div
                                    key={project.title}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-zinc-50 border-3 border-black rounded-2xl p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
                                >
                                    {/* Preview Image */}
                                    <Link href={`/projects/${project.slug}`} className="lg:col-span-5 relative w-full aspect-video border-2 border-black rounded-xl overflow-hidden bg-zinc-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group block cursor-pointer">
                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={`Project Preview: ${project.title}`}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 40vw"
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-zinc-300">
                                                <span className="material-symbols-outlined text-6xl text-zinc-500">{project.icon}</span>
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 bg-black text-white px-2.5 py-1 rounded-md text-[9px] font-pixel uppercase tracking-wider font-bold">
                                            FEATURED FLAGSHIP
                                        </div>
                                    </Link>

                                    {/* Project Technical Narrative */}
                                    <div className="lg:col-span-7 space-y-4">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <Link href={`/projects/${project.slug}`}>
                                                <h4 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-retro-charcoal hover:text-retro-orange transition-colors">
                                                    {project.title}
                                                </h4>
                                            </Link>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.techStack.map((tech, i) => (
                                                    <span key={i} className="text-[10px] font-pixel bg-zinc-200 text-zinc-800 px-2 py-0.5 border border-black/20 rounded font-bold uppercase">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <p className="font-body text-base text-zinc-700 leading-relaxed font-medium">
                                            {project.description}
                                        </p>

                                        {/* Problem / Approach / Outcome Breakdown */}
                                        {project.problem && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-body bg-white border border-black/20 p-3.5 rounded-xl">
                                                <div>
                                                    <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider block mb-0.5">THE PROBLEM</span>
                                                    <p className="text-zinc-700 leading-snug">{project.problem}</p>
                                                </div>
                                                <div>
                                                    <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider block mb-0.5">TECHNICAL APPROACH</span>
                                                    <p className="text-zinc-700 leading-snug">{project.approach}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action CTAs */}
                                        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-black/10">
                                            <Link
                                                href={`/projects/${project.slug}`}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-lg border-2 border-black font-body text-xs font-bold uppercase tracking-wider hover:bg-retro-yellow hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                                            >
                                                <span>View Full Case Study</span>
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </Link>

                                            {project.demo && (
                                                <a
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-retro-green text-black rounded-lg border-2 border-black font-body text-xs font-bold uppercase tracking-wider hover:bg-emerald-300 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                >
                                                    <span>Live Demo</span>
                                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                </a>
                                            )}

                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black rounded-lg border-2 border-black font-body text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                            >
                                                <span>GitHub Repository</span>
                                                <span className="material-symbols-outlined text-sm">code</span>
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Section 2: Secondary Projects Grid */}
                {secondaryProjects.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-6 pt-4 border-t-2 border-black/10">
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 inline-block"></span>
                            <h3 className="font-pixel text-xs sm:text-sm uppercase tracking-widest text-zinc-600 font-bold">
                                ADDITIONAL PROJECTS & PROTOTYPES
                            </h3>
                        </div>

                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <AnimatePresence mode="popLayout">
                                {secondaryProjects.map((project) => (
                                    <motion.div
                                        key={project.title}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                    >
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className="bg-zinc-50 border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between group cursor-pointer h-full"
                                        >
                                            <div>
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="w-9 h-9 bg-zinc-200 border border-black rounded-lg flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-xl text-retro-charcoal">{project.icon}</span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {project.category?.map((cat, i) => (
                                                            <span key={i} className="text-[9px] font-pixel bg-black/5 text-zinc-600 px-1.5 py-0.5 rounded font-bold uppercase">
                                                                {cat}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <h4 className="font-display text-lg uppercase tracking-tight text-retro-charcoal mb-1 group-hover:text-retro-orange transition-colors">
                                                    {project.title}
                                                </h4>

                                                <p className="font-body text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-4">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {project.techStack.map((tech, i) => (
                                                        <span key={i} className="text-[9px] font-mono text-zinc-500 bg-white border border-black/10 px-1.5 py-0.2 rounded">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center justify-between text-xs font-body font-bold pt-2 border-t border-black/10">
                                                    <span className="text-zinc-800 group-hover:underline flex items-center gap-1">
                                                        View Case Study
                                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                    </span>
                                                    <span
                                                        className="text-zinc-500 hover:text-black"
                                                        title="View Case Study"
                                                    >
                                                        <span className="material-symbols-outlined text-base">read_more</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}

                <div className="flex justify-center mt-10">
                    <a
                        href={portfolioData.personal.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-6 py-3.5 bg-white border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-retro-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-center"
                    >
                        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">rocket_launch</span>
                        <span className="font-body text-xs sm:text-sm font-bold uppercase tracking-wider">Explore All Repositories on GitHub</span>
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

