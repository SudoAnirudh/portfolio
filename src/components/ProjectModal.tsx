"use client";
import React, { useEffect } from 'react';
import { Project } from '@/data/portfolio';
import { motion } from 'framer-motion';

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!project) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-charcoal/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className="bg-retro-white border-4 border-black p-0 max-w-3xl w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative flex flex-col max-h-[90vh] overflow-hidden animate-zoom-in"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.96, y: 14, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.98, y: 8, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                <div className="bg-retro-charcoal text-white p-2 flex justify-between items-center border-b-4 border-black">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">deployed_code</span>
                        <span className="font-pixel text-sm tracking-wider">CARTRIDGE_SLOT_A://{project.title.toUpperCase()}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:bg-red-500 p-1 rounded-none transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm block">close</span>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto font-body">
                    <div className="border-4 border-black bg-zinc-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="grid lg:grid-cols-12">
                            <div className="lg:col-span-5 p-4 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-retro-cream">
                                <div className="font-pixel text-xs uppercase tracking-wider bg-black text-white inline-block px-2 py-1 mb-3">
                                    Project Cartridge
                                </div>

                                <motion.div
                                    className="border-4 border-black bg-white mb-4"
                                    initial={{ opacity: 0, x: -14 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.08 }}
                                >
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                        />
                                    ) : (
                                        <div className="w-full aspect-video flex items-center justify-center bg-retro-charcoal/5">
                                            <span className="material-symbols-outlined text-6xl text-retro-charcoal/30">{project.icon}</span>
                                        </div>
                                    )}
                                </motion.div>

                                <motion.div
                                    className="font-pixel text-[11px] uppercase tracking-wider text-zinc-700 space-y-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.25, delay: 0.15 }}
                                >
                                    <div>Slot: A1</div>
                                    <div>File: {project.title.toUpperCase().replace(/\s+/g, "_")}.CRT</div>
                                    <div>Build: Stable</div>
                                </motion.div>
                            </div>

                            <motion.div
                                className="lg:col-span-7 p-4 bg-retro-white"
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.05 }}
                            >
                                <motion.h2
                                    className="font-display text-3xl uppercase tracking-tight leading-none mb-3 text-retro-charcoal"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: 0.12 }}
                                >
                                    {project.title}
                                </motion.h2>
                                <motion.p
                                    className="text-zinc-700 leading-relaxed mb-5"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: 0.17 }}
                                >
                                    {project.description}
                                </motion.p>

                                <div className="mb-5">
                                    <h3 className="font-pixel text-sm uppercase mb-2 border-b-2 border-black inline-block">Specs</h3>
                                    <div className="grid sm:grid-cols-2 gap-2 text-xs">
                                        {project.specs.map((spec, index) => (
                                            <motion.div
                                                key={`${spec.label}-${spec.value}`}
                                                className="border-2 border-black bg-zinc-100 px-3 py-2"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2, delay: 0.2 + index * 0.05 }}
                                                whileHover={{ y: -2, x: -2 }}
                                            >
                                                <div className="font-pixel uppercase text-zinc-500 tracking-wider">{spec.label}</div>
                                                <div className="font-body text-sm text-zinc-800">{spec.value}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <h3 className="font-pixel text-sm uppercase mb-2 border-b-2 border-black inline-block">Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack?.map((tech, index) => (
                                            <motion.span
                                                key={tech}
                                                className="px-2 py-1 bg-retro-yellow border-2 border-black font-pixel text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.18, delay: 0.22 + index * 0.04 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2 flex flex-wrap gap-3">
                                    {project.demo ? (
                                        <motion.a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-retro-orange border-2 border-black font-pixel text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: 0.3 }}
                                            whileHover={{ y: -1 }}
                                        >
                                            <span className="material-symbols-outlined text-sm">sports_esports</span>
                                            Launch Demo
                                        </motion.a>
                                    ) : (
                                        <motion.span
                                            className="px-4 py-2 bg-zinc-200 border-2 border-black font-pixel text-xs uppercase text-zinc-600"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: 0.3 }}
                                        >
                                            Demo Unavailable
                                        </motion.span>
                                    )}

                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-retro-green border-2 border-black font-pixel text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: 0.35 }}
                                        whileHover={{ y: -1 }}
                                    >
                                        <span className="material-symbols-outlined text-sm">code</span>
                                        View Source
                                    </motion.a>

                                    <motion.button
                                        onClick={onClose}
                                        className="px-4 py-2 bg-zinc-100 border-2 border-black font-pixel text-xs uppercase hover:bg-zinc-200 transition-colors"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: 0.4 }}
                                        whileHover={{ y: -1 }}
                                    >
                                        Eject
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
