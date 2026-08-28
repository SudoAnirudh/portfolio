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
    const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    React.useEffect(() => {
        const handleFilterEvent = (e: Event) => {
            const customEvent = e as CustomEvent<{ skill: string }>;
            if (customEvent.detail?.skill) {
                setSelectedSkillFilter(customEvent.detail.skill);
                setSelectedCategory('ALL');
            }
        };

        window.addEventListener('filter-by-skill', handleFilterEvent);
        return () => {
            window.removeEventListener('filter-by-skill', handleFilterEvent);
        };
    }, []);

    const filteredProjects = portfolioData.projects.filter(project => {
        const matchesCategory = selectedCategory === 'ALL' || project.category?.includes(selectedCategory);
        const matchesSkill = !selectedSkillFilter || project.techStack.some(tech => 
            tech.toLowerCase().includes(selectedSkillFilter.toLowerCase()) || 
            selectedSkillFilter.toLowerCase().includes(tech.toLowerCase())
        );
        return matchesCategory && matchesSkill;
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
                <div className="mb-6 flex flex-wrap items-center gap-2 border-b-2 border-black/10 pb-5">
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

                {/* Active Skill Filter Banner */}
                {selectedSkillFilter && (
                    <div className="mb-8 bg-retro-yellow border-3 border-black p-3.5 rounded-xl flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex flex-wrap items-center gap-2 font-pixel text-xs sm:text-sm text-black font-bold uppercase">
                            <span className="material-symbols-outlined text-lg text-black">psychology</span>
                            <span>FILTERED BY SKILL:</span>
                            <span className="bg-black text-white px-2.5 py-0.5 rounded-md font-mono text-xs">{selectedSkillFilter}</span>
                            <span className="text-[10px] font-mono text-zinc-800 font-normal">
                                ({filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} matched)
                            </span>
                        </div>
                        <button
                            onClick={() => setSelectedSkillFilter(null)}
                            className="px-3 py-1 bg-black text-white hover:bg-red-600 border-2 border-black rounded-lg text-[10px] font-pixel uppercase tracking-wider font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <span className="material-symbols-outlined text-xs">close</span>
                            Clear Skill Filter
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-12 bg-zinc-100 border-2 border-dashed border-black/20 rounded-xl my-6">
                        <span className="material-symbols-outlined text-4xl text-zinc-400 mb-2">search_off</span>
                        <p className="font-pixel text-sm text-zinc-600 uppercase">No projects match the selected criteria</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('ALL');
                                setSelectedSkillFilter(null);
                            }}
                            className="mt-4 px-4 py-2 bg-black text-white font-pixel text-xs uppercase rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-retro-yellow hover:text-black transition-all cursor-pointer font-bold"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}

                {/* Section 1: Tier 1 Flagship Engineering Systems */}
                {featuredProjects.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2.5 h-2.5 rounded-full bg-retro-orange inline-block"></span>
                            <h3 className="font-pixel text-xs sm:text-sm uppercase tracking-widest text-zinc-600 font-bold">
                                TIER 1: FLAGSHIP ENGINEERING SYSTEMS
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
                                >
                                    <article
                                        data-project-card="true"
                                        className="group relative bg-zinc-50 border-3 border-black rounded-2xl p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus-within:ring-2 focus-within:ring-yellow-400 transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
                                    >
                                        {/* Preview Image */}
                                        <Link href={`/projects/${project.slug}`} aria-label={`View full case study for ${project.title}`} className="lg:col-span-5 relative w-full aspect-video border-2 border-black rounded-xl overflow-hidden bg-zinc-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group block cursor-pointer">
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
                                                TIER 1 FLAGSHIP
                                            </div>
                                        </Link>

                                        {/* Project Technical Narrative */}
                                        <div className="lg:col-span-7 space-y-4">
                                            <header className="flex flex-wrap items-center justify-between gap-2">
                                                <h4 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-retro-charcoal hover:text-retro-orange transition-colors">
                                                    <Link href={`/projects/${project.slug}`} className="focus:outline-none" aria-label={`Read ${project.title} technical case study`}>
                                                        {project.title}
                                                    </Link>
                                                </h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {project.techStack.map((tech, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setSelectedSkillFilter(tech)}
                                                            title={`Filter projects by ${tech}`}
                                                            aria-label={`Filter projects by ${tech}`}
                                                            className={`text-[10px] font-pixel px-2 py-0.5 border border-black/20 rounded font-bold uppercase transition-all cursor-pointer ${
                                                                selectedSkillFilter === tech
                                                                    ? 'bg-black text-white border-black'
                                                                    : 'bg-zinc-200 text-zinc-800 hover:bg-retro-yellow hover:text-black hover:border-black'
                                                            }`}
                                                        >
                                                            {tech}
                                                        </button>
                                                    ))}
                                                </div>
                                            </header>

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
                                                        <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider block mb-0.5">TECHNICAL ARCHITECTURE</span>
                                                        <p className="text-zinc-700 leading-snug">{project.approach}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action CTAs */}
                                            <footer className="flex flex-wrap items-center gap-3 pt-2 border-t border-black/10">
                                                <Link
                                                    href={`/projects/${project.slug}`}
                                                    aria-label={`View full case study for ${project.title}`}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-lg border-2 border-black font-body text-xs font-bold uppercase tracking-wider hover:bg-retro-yellow hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                                                >
                                                    <span>View Case Study</span>
                                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </Link>

                                                {project.demo && (
                                                    <a
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`View ${project.title} live production demo`}
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
                                                    aria-label={`Inspect ${project.title} source code on GitHub`}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black rounded-lg border-2 border-black font-body text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                >
                                                    <span>GitHub Repo</span>
                                                    <span className="material-symbols-outlined text-sm">code</span>
                                                </a>
                                            </footer>
                                        </div>
                                    </article>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Section 2: Tier 2 Specialized & Applied AI Systems */}
                {secondaryProjects.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-6 pt-4 border-t-2 border-black/10">
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 inline-block"></span>
                            <h3 className="font-pixel text-xs sm:text-sm uppercase tracking-widest text-zinc-600 font-bold">
                                TIER 2: SPECIALIZED & APPLIED AI SYSTEMS
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
                                        <article
                                            data-project-card="true"
                                            className="group relative bg-zinc-50 border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus-within:ring-2 focus-within:ring-yellow-400 transition-all flex flex-col justify-between h-full"
                                        >
                                            <div>
                                                <header className="flex justify-between items-center mb-3">
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
                                                </header>

                                                <h4 className="font-display text-lg uppercase tracking-tight text-retro-charcoal mb-1 group-hover:text-retro-orange transition-colors">
                                                    <Link href={`/projects/${project.slug}`} className="focus:outline-none" aria-label={`Read ${project.title} project details`}>
                                                        {project.title}
                                                    </Link>
                                                </h4>

                                                <p className="font-body text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-4">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {project.techStack.map((tech, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setSelectedSkillFilter(tech)}
                                                            title={`Filter projects by ${tech}`}
                                                            aria-label={`Filter projects by ${tech}`}
                                                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded border transition-colors cursor-pointer ${
                                                                selectedSkillFilter === tech
                                                                    ? 'bg-black text-white border-black font-bold'
                                                                    : 'text-zinc-600 bg-white border-black/10 hover:border-black hover:bg-retro-yellow hover:text-black'
                                                            }`}
                                                        >
                                                            {tech}
                                                        </button>
                                                    ))}
                                                </div>

                                                <footer className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-black/10">
                                                    <Link
                                                        href={`/projects/${project.slug}`}
                                                        aria-label={`View case study for ${project.title}`}
                                                        className="px-2.5 py-1 bg-black text-white text-[10px] font-pixel uppercase tracking-wider font-bold rounded border border-black hover:bg-retro-yellow hover:text-black transition-all flex items-center gap-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                                    >
                                                        <span>Case Study</span>
                                                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                                    </Link>

                                                    {project.demo && (
                                                        <a
                                                            href={project.demo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={`View ${project.title} live demo`}
                                                            className="px-2 py-1 bg-retro-green text-black text-[10px] font-pixel uppercase tracking-wider font-bold rounded border border-black hover:bg-emerald-300 transition-all flex items-center gap-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                                            title="View Live Demo"
                                                        >
                                                            <span>Live</span>
                                                            <span className="material-symbols-outlined text-xs">open_in_new</span>
                                                        </a>
                                                    )}

                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`View ${project.title} source code on GitHub`}
                                                        className="px-2 py-1 bg-white text-black text-[10px] font-pixel uppercase tracking-wider font-bold rounded border border-black hover:bg-zinc-200 transition-all flex items-center gap-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                                        title="View Source Code on GitHub"
                                                    >
                                                        <span>Code</span>
                                                        <span className="material-symbols-outlined text-xs">code</span>
                                                    </a>
                                                </footer>
                                            </div>
                                        </article>
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

