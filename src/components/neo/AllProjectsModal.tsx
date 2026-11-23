"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { portfolioData, Project } from "@/data/portfolio";

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

const CATEGORIES = ["ALL", "AI & ML", "Mobile", "Full-Stack"];

export const AllProjectsModal: React.FC<AllProjectsModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = portfolioData.projects.filter((p) => {
    const matchesCat =
      selectedCategory === "ALL" || p.category?.includes(selectedCategory);
    const matchesQuery =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white border-[3px] border-[#0D0D0D] shadow-[8px_8px_0px_0px_#0D0D0D] w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden relative"
        >
          {/* Header */}
          <div className="bg-[#B5E635] border-b-[2.5px] border-[#0D0D0D] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-display text-base sm:text-lg font-black uppercase text-[#0D0D0D] tracking-tight">
                ALL PROJECTS ARCHIVE ({portfolioData.projects.length})
              </span>
            </div>
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 bg-white border-[2px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] flex items-center justify-center cursor-pointer hover:bg-red-400 transition-colors"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          </div>

          {/* Filter & Search Bar */}
          <div className="p-4 sm:p-5 border-b-[2px] border-[#0D0D0D] bg-zinc-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-xs uppercase font-bold px-3 py-1.5 border-[2px] border-[#0D0D0D] cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? "bg-[#6D4AFF] text-white shadow-[2px_2px_0px_0px_#0D0D0D]"
                      : "bg-white text-black hover:bg-zinc-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tech..."
                className="w-full bg-white border-[2px] border-[#0D0D0D] pl-8 pr-3 py-1 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]"
              />
            </div>
          </div>

          {/* Project Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 graph-paper">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <div
                  key={project.slug}
                  className="bg-white border-[2.2px] border-[#0D0D0D] shadow-[4px_4px_0px_0px_#0D0D0D] flex flex-col justify-between overflow-hidden group hover:-translate-y-1 transition-transform"
                >
                  {/* Thumbnail / Header */}
                  <div className="aspect-[16/9] relative bg-zinc-100 border-b-[2px] border-[#0D0D0D] overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain object-center group-hover:scale-103 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display text-lg uppercase font-bold text-zinc-400">
                        {project.title}
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-[#B5E635] text-black border border-black font-mono text-[9px] font-bold px-1.5 py-0.5 shadow-[1px_1px_0px_0px_#0D0D0D]">
                        FLAGSHIP
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="font-display text-lg font-black uppercase text-[#0D0D0D] tracking-tight">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="bg-zinc-100 border border-zinc-400 font-mono text-[10px] px-1.5 py-0.2"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="font-mono text-[10px] text-zinc-500 self-center">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-3 border-t-[1.8px] border-[#0D0D0D] bg-zinc-50 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProject(project);
                      }}
                      className="bg-[#B5E635] hover:bg-lime-400 text-[#0D0D0D] font-mono font-bold text-[11px] uppercase px-3 py-1.5 border-[1.8px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>DETAILS</span>
                      <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 bg-white hover:bg-zinc-200 border border-[#0D0D0D] flex items-center justify-center text-[#0D0D0D]"
                          title="View GitHub Repository"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 bg-white hover:bg-zinc-200 border border-[#0D0D0D] flex items-center justify-center text-[#0D0D0D]"
                          title="Open Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AllProjectsModal;
