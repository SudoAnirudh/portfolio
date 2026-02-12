"use client";
import React, { useEffect } from 'react';
import { Project } from '@/data/portfolio';

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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-charcoal/80 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-retro-white border-4 border-black p-0 max-w-2xl w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative flex flex-col max-h-[90vh] overflow-hidden animate-zoom-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Retro Window Header */}
                <div className="bg-retro-charcoal text-white p-2 flex justify-between items-center border-b-4 border-black">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">terminal</span>
                        <span className="font-pixel text-sm tracking-wider">{project.title.toUpperCase()}.EXE</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:bg-red-500 p-1 rounded-none transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm block">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto font-body">
                    {project.image ? (
                        <div className="border-4 border-black mb-6 relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-2 pointer-events-none">
                                <span className="font-pixel text-white text-xs">PREVIEW MODE</span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full aspect-video flex items-center justify-center bg-retro-charcoal/5 border-4 border-black mb-6">
                            <span className="material-symbols-outlined text-6xl text-retro-charcoal/20">{project.icon}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-pixel text-xl uppercase mb-2 border-b-2 border-black inline-block">/// DESCRIPTION</h3>
                            <p className="text-zinc-700 leading-relaxed text-lg">
                                {project.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-pixel text-xl uppercase mb-3 border-b-2 border-black inline-block">/// TECH STACK</h3>
                            <div className="flex flex-wrap gap-3">
                                {project.techStack?.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-retro-yellow border-2 border-black font-pixel text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t-2 border-black/10 flex justify-end gap-4">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-zinc-200 border-2 border-black font-pixel text-sm uppercase hover:bg-zinc-300 transition-colors"
                            >
                                Close
                            </button>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-retro-green border-2 border-black font-pixel text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">code</span>
                                View Source
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
