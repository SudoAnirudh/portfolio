"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Cpu,
  Trophy,
} from "lucide-react";
import { GithubIcon } from "./neo/SocialIcons";
import { Project } from "@/data/portfolio";

interface ProjectModalProps {
  project: Project | null;
  currentIndex?: number | null;
  totalProjects?: number;
  onClose: () => void;
  onNavigate?: (direction: "prev" | "next") => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  currentIndex = 0,
  totalProjects = 9,
  onClose,
  onNavigate,
}) => {
  // Keyboard navigation: Escape to close, Arrow keys to navigate
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onNavigate) {
        onNavigate("prev");
      } else if (e.key === "ArrowRight" && onNavigate) {
        onNavigate("next");
      }
    },
    [onClose, onNavigate]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  const currentIdxDisplay =
    typeof currentIndex === "number" ? currentIndex + 1 : 1;
  const totalIdxDisplay = totalProjects || 9;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto">
        {/* Backdrop Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0D0D0D]/75 backdrop-blur-sm cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.25, bounce: 0.1 }}
          className="relative w-full max-w-4xl bg-[#F4F4EE] border-[3px] border-[#0D0D0D] shadow-[8px_8px_0px_0px_#0D0D0D] sm:shadow-[12px_12px_0px_0px_#0D0D0D] overflow-hidden my-auto z-10 flex flex-col max-h-[92vh]"
        >
          {/* Top Window Bar (Electric Violet) */}
          <div className="bg-[#6D4AFF] text-white border-b-[2.5px] border-[#0D0D0D] px-3 sm:px-5 py-2.5 flex items-center justify-between gap-3 shrink-0 select-none">
            {/* Left: Window Pill & Category */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="bg-[#B5E635] text-black font-mono text-[10px] sm:text-xs font-black px-2 py-0.5 border-[2px] border-[#0D0D0D] uppercase shadow-[2px_2px_0px_0px_#0D0D0D]">
                PROJECT SPEC #{String(currentIdxDisplay).padStart(2, "0")}
              </span>
              {project.category && project.category.length > 0 && (
                <span className="hidden sm:inline-block font-mono text-[10px] font-bold uppercase tracking-wider text-white/90">
                  {project.category.join(" • ")}
                </span>
              )}
            </div>

            {/* Right: Counter, Nav Arrows & Close Button */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-[11px] sm:text-xs font-bold text-white/80 mr-1 hidden xs:inline">
                {currentIdxDisplay} / {totalIdxDisplay}
              </span>

              {onNavigate && (
                <div className="flex items-center gap-1 mr-1">
                  <button
                    onClick={() => onNavigate("prev")}
                    aria-label="Previous Project"
                    className="w-7 h-7 bg-white text-black border-[2px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center hover:bg-[#FFDE59] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    onClick={() => onNavigate("next")}
                    aria-label="Next Project"
                    className="w-7 h-7 bg-white text-black border-[2px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center hover:bg-[#FFDE59] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                aria-label="Close Project Modal"
                className="w-8 h-8 bg-[#FF7A9E] text-black border-[2px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center hover:bg-rose-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
            {/* Top Row: Hero Artwork + Title & Action Strip */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start bg-white border-[2.5px] border-[#0D0D0D] p-4 sm:p-6 shadow-[5px_5px_0px_0px_#0D0D0D]">
              {/* Left: Project Artwork */}
              <div className="lg:col-span-5 w-full aspect-[16/10] bg-[#F4F4EE] border-[2.5px] border-[#0D0D0D] shadow-[4px_4px_0px_0px_#0D0D0D] relative overflow-hidden flex items-center justify-center">
                <Image
                  src={project.image || "/projects/agentkube.svg"}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  priority
                />
              </div>

              {/* Right: Title, Description, Actions & Tech Stack */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#0D0D0D] tracking-tight leading-none">
                      {project.title}
                    </h2>
                    {project.featured && (
                      <span className="bg-[#FFDE59] text-black border-[1.8px] border-[#0D0D0D] px-2 py-0.5 font-mono text-[9px] font-black uppercase shadow-[2px_2px_0px_0px_#0D0D0D]">
                        FLAGSHIP
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>

                {/* Action Buttons: Live Demo & GitHub */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#B5E635] text-black font-mono font-bold text-xs uppercase px-4 py-2 border-[2px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 inline-flex items-center gap-1.5 transition-all hover:bg-lime-300"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black font-mono font-bold text-xs uppercase px-4 py-2 border-[2px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 inline-flex items-center gap-1.5 transition-all hover:bg-zinc-100"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>SOURCE CODE</span>
                    </a>
                  )}
                </div>

                {/* Tech Stack Pills */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="pt-2 border-t border-zinc-200">
                    <div className="font-mono text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-2">
                      TECH STACK //
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-[#F4F4EE] text-[#0D0D0D] border-[1.8px] border-[#0D0D0D] px-2 py-0.5 font-mono text-[10px] font-bold shadow-[2px_2px_0px_0px_#0D0D0D]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Middle Row: The 3 Core Engineering Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pillar 1: The Problem */}
              <div className="bg-white border-[2.5px] border-[#0D0D0D] p-4 sm:p-5 shadow-[4px_4px_0px_0px_#0D0D0D] space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-[#FF7A9E] text-black border-[1.8px] border-[#0D0D0D] px-2 py-0.5 font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_#0D0D0D]">
                  <AlertCircle className="w-3 h-3 stroke-[2.5]" />
                  <span>01. THE PROBLEM</span>
                </div>
                <p className="font-mono text-xs text-zinc-800 leading-relaxed font-medium">
                  {project.problem ||
                    "Solving fundamental scalability and latency bottlenecks under high operational throughput."}
                </p>
              </div>

              {/* Pillar 2: Architecture & Approach */}
              <div className="bg-white border-[2.5px] border-[#0D0D0D] p-4 sm:p-5 shadow-[4px_4px_0px_0px_#0D0D0D] space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-[#6D4AFF] text-white border-[1.8px] border-[#0D0D0D] px-2 py-0.5 font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_#0D0D0D]">
                  <Cpu className="w-3 h-3 stroke-[2.5]" />
                  <span>02. ARCHITECTURE</span>
                </div>
                <p className="font-mono text-xs text-zinc-800 leading-relaxed font-medium">
                  {project.approach ||
                    "Engineered modular asynchronous microservices with resilient retry loops and vector caching."}
                </p>
              </div>

              {/* Pillar 3: Measured Outcomes */}
              <div className="bg-white border-[2.5px] border-[#0D0D0D] p-4 sm:p-5 shadow-[4px_4px_0px_0px_#0D0D0D] space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-[#B5E635] text-black border-[1.8px] border-[#0D0D0D] px-2 py-0.5 font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_#0D0D0D]">
                  <Trophy className="w-3 h-3 stroke-[2.5]" />
                  <span>03. IMPACT & RESULTS</span>
                </div>
                <p className="font-mono text-xs text-zinc-800 leading-relaxed font-medium">
                  {project.outcome ||
                    "Achieved 100% test pass rate, deterministic outputs, and sustained sub-second API execution."}
                </p>
              </div>
            </div>

            {/* Bottom Row: Key Engineering Specifications Bento */}
            {project.specs && project.specs.length > 0 && (
              <div className="bg-white border-[2.5px] border-[#0D0D0D] p-4 sm:p-5 shadow-[5px_5px_0px_0px_#0D0D0D] space-y-3">
                <div className="font-mono text-xs font-black uppercase tracking-wider text-[#0D0D0D] flex items-center justify-between pb-2 border-b border-zinc-200">
                  <span>SYSTEM SPECIFICATIONS &amp; BENCHMARKS</span>
                  <span className="text-[#6D4AFF]">⚡ HARDWARE / CLOUD</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {project.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-[#F4F4EE] border-[2px] border-[#0D0D0D] p-3 shadow-[3px_3px_0px_0px_#0D0D0D]"
                    >
                      <div className="font-mono text-[10px] font-black text-zinc-500 uppercase tracking-wider">
                        {spec.label}
                      </div>
                      <div className="font-mono text-xs sm:text-sm font-bold text-[#0D0D0D] mt-1 break-words">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Strip */}
          {onNavigate && (
            <div className="bg-white border-t-[2.5px] border-[#0D0D0D] px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
              <button
                onClick={() => onNavigate("prev")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F4EE] hover:bg-zinc-200 border-[2px] border-[#0D0D0D] font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden xs:inline">PREVIOUS PROJECT</span>
                <span className="xs:hidden">PREV</span>
              </button>

              <button
                onClick={onClose}
                className="font-mono text-xs font-black uppercase text-zinc-500 hover:text-black underline underline-offset-4 cursor-pointer"
              >
                CLOSE [ESC]
              </button>

              <button
                onClick={() => onNavigate("next")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B5E635] hover:bg-lime-400 border-[2px] border-[#0D0D0D] font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span className="hidden xs:inline">NEXT PROJECT</span>
                <span className="xs:hidden">NEXT</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
