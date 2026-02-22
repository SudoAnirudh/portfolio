"use client";
import React, { useMemo, useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import { useRouter } from 'next/navigation';

const toSlug = (value: string) => value.toLowerCase().replace(/\s+/g, '-');

const Projects = () => {
    const router = useRouter();
    const [insertingSlug, setInsertingSlug] = useState<string | null>(null);

    const insertingProject = useMemo(
        () => portfolioData.projects.find((project) => toSlug(project.title) === insertingSlug) ?? null,
        [insertingSlug]
    );

    const handleInsert = (slug: string) => {
        setInsertingSlug(slug);
        setTimeout(() => {
            router.push(`/project/${slug}`);
        }, 1200);
    };

    return (
        <section className="max-w-7xl mx-auto mb-6 px-4 md:px-0" id="projects">
            <div className="bg-zinc-200 bento-card rounded-t-xl rounded-b-none border-4 border-black border-b-0 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-retro-charcoal">folder_open</span>
                    <span className="font-pixel text-sm uppercase">C:\USERS\ANIRUDH\PROJECTS</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-4 h-4 bg-retro-charcoal border border-white"></div>
                    <div className="w-4 h-4 bg-retro-charcoal border border-white"></div>
                    <div className="w-4 h-4 bg-red-500 border border-white/20"></div>
                </div>
            </div>

            <div className="bg-retro-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioData.projects.map((project, index) => {
                        const slug = toSlug(project.title);
                        const isInserting = insertingSlug === slug;

                        return (
                            <article
                                key={index}
                                className="group bg-zinc-200 border-4 border-black p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-retro-yellow/40 transition-all"
                            >
                                <div className="relative bg-zinc-100 border-2 border-black p-2 mb-3">
                                    <div className="absolute top-2 right-2 text-[10px] font-pixel uppercase bg-black text-white px-2 py-0.5 tracking-widest">
                                        cart-{(index + 1).toString().padStart(2, '0')}
                                    </div>
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

                                <h3 className="font-pixel text-sm uppercase tracking-wider mb-2 px-2 py-1 bg-black text-white inline-block">
                                    {project.title}
                                </h3>
                                <p className="text-xs font-body text-zinc-600 line-clamp-2 mb-3 px-1 min-h-9">
                                    {project.description}
                                </p>

                                <div className="flex items-center justify-between border-t-2 border-dashed border-black pt-3">
                                    <span className="text-xs font-pixel uppercase tracking-widest text-zinc-600">{slug}.disk</span>
                                    <button
                                        type="button"
                                        onClick={() => handleInsert(slug)}
                                        disabled={Boolean(insertingSlug)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 border-2 border-black bg-retro-green text-black font-pixel text-xs uppercase tracking-widest hover:bg-retro-orange transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <span className="material-symbols-outlined text-sm">album</span>
                                        {isInserting ? 'Loading' : 'Insert'}
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {insertingProject && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80">
                        <div className="w-[min(90%,520px)] border-4 border-retro-green bg-black text-retro-green p-6 font-pixel uppercase tracking-widest shadow-[0_0_30px_rgba(134,239,172,0.2)]">
                            <p className="text-xs opacity-80 mb-3">Game Deck Loader v1.0</p>
                            <p className="text-lg mb-4">Inserting {toSlug(insertingProject.title)} ...</p>
                            <div className="h-4 border-2 border-retro-green p-0.5 bg-black mb-3 overflow-hidden">
                                <div className="h-full bg-retro-green animate-cartridge-load" />
                            </div>
                            <p className="text-xs animate-pulse">Mounting project cartridge. please wait.</p>
                        </div>
                    </div>
                )}

                <div className="flex justify-center mt-12">
                    <a
                        href={portfolioData.personal.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-6 py-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-retro-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">rocket_launch</span>
                        <span className="font-pixel text-sm font-bold uppercase tracking-wider">Explore More Projects</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
