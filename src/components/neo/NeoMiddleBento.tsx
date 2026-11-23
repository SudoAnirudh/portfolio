"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink, Award, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { portfolioData, Project } from "@/data/portfolio";

interface NeoMiddleBentoProps {
  onOpenProjectModal: (project: Project) => void;
  onOpenAllProjects: () => void;
  onOpenCertifications: () => void;
}

export const NeoMiddleBento: React.FC<NeoMiddleBentoProps> = ({
  onOpenProjectModal,
  onOpenAllProjects,
  onOpenCertifications,
}) => {
  // Featured projects for the carousel
  const featuredProjects = portfolioData.projects.filter(p => p.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);

  const activeProject = featuredProjects[currentIndex] || featuredProjects[0];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev === 0 ? featuredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section className="w-full bg-white grid grid-cols-1 lg:grid-cols-12 border-b-[2.5px] border-[#0D0D0D]">
      {/* Left Column (65% width): FEATURED PROJECTS */}
      <div id="projects" className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between border-b-[2.5px] lg:border-b-0 lg:border-r-[2.5px] border-[#0D0D0D]">
        <div>
          {/* Top Header Row with Title, View All, and Arrows */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-200">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-black uppercase text-[#0D0D0D] tracking-tight">
                FEATURED PROJECTS
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ x: -1, y: -1 }}
                whileTap={{ x: 2, y: 2 }}
                onClick={onOpenAllProjects}
                className="bg-white hover:bg-zinc-50 text-[#0D0D0D] font-mono font-bold text-xs uppercase px-3 py-1.5 border-[2px] border-[#0D0D0D] shadow-[2.5px_2.5px_0px_0px_#0D0D0D] active:shadow-none inline-flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>VIEW ALL PROJECTS ({portfolioData.projects.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>

              {/* Arrow Navigation */}
              <div className="flex items-center gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  aria-label="Previous Project"
                  className="w-8 h-8 bg-[#FF7A9E] hover:bg-pink-400 text-[#0D0D0D] border-[2px] border-[#0D0D0D] shadow-[2.5px_2.5px_0px_0px_#0D0D0D] active:shadow-none flex items-center justify-center cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[3]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  aria-label="Next Project"
                  className="w-8 h-8 bg-[#FF7A9E] hover:bg-pink-400 text-[#0D0D0D] border-[2px] border-[#0D0D0D] shadow-[2.5px_2.5px_0px_0px_#0D0D0D] active:shadow-none flex items-center justify-center cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Project Carousel Slide */}
          <div className="relative overflow-hidden min-h-[380px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeProject.slug}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                {/* Visual Box with Pink Border Frame (matching the photo) */}
                <div className="border-[2.5px] border-[#0D0D0D] bg-[#FF7A9E] p-3 sm:p-4 relative shadow-[5px_5px_0px_0px_#0D0D0D] overflow-hidden">
                  <div className="aspect-[16/9] relative bg-[#FFFDF5] border-[2.2px] border-[#0D0D0D] overflow-hidden flex items-center justify-center group shadow-[2px_2px_0px_0px_#0D0D0D]">
                    {activeProject.image ? (
                      <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        fill
                        className="object-cover object-center filter contrast-105 group-hover:scale-[1.02] transition-transform duration-300"
                        sizes="(max-width: 1024px) 100vw, 65vw"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <span className="font-display text-2xl uppercase font-black text-zinc-400">
                          {activeProject.title}
                        </span>
                      </div>
                    )}
                    {/* Corner Tag */}
                    <div className="absolute top-2.5 left-2.5 bg-[#6D4AFF] text-white border-[1.5px] border-black px-2 py-0.5 font-mono text-[10px] font-bold uppercase shadow-[1.5px_1.5px_0px_0px_#0D0D0D] z-10">
                      FLAGSHIP // 0{currentIndex + 1}
                    </div>
                  </div>
                </div>

                {/* Project Meta Info */}
                <div className="space-y-2 pt-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#0D0D0D] tracking-tight">
                      {activeProject.title}
                    </h3>
                  </div>

                  <p className="font-mono text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                    {activeProject.description}
                  </p>

                  {/* Tech Stack Pills (matching photo style) */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeProject.techStack.slice(0, 6).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-white border-[1.8px] border-[#0D0D0D] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#0D0D0D] shadow-[1.5px_1.5px_0px_0px_#0D0D0D]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons: VIEW DETAILS & Links */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-3">
                    <motion.button
                      whileHover={{ x: -1, y: -1 }}
                      whileTap={{ x: 2, y: 2 }}
                      onClick={() => onOpenProjectModal(activeProject)}
                      className="bg-white hover:bg-[#B5E635] text-[#0D0D0D] font-mono font-bold text-xs uppercase px-4 py-2 border-[2px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </motion.button>

                    {activeProject.github && (
                      <motion.a
                        whileHover={{ x: -1, y: -1 }}
                        whileTap={{ x: 2, y: 2 }}
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-zinc-100 text-[#0D0D0D] font-mono font-bold text-xs uppercase px-3 py-2 border-[2px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] inline-flex items-center gap-1.5 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>CODE</span>
                      </motion.a>
                    )}

                    {activeProject.demo && (
                      <motion.a
                        whileHover={{ x: -1, y: -1 }}
                        whileTap={{ x: 2, y: 2 }}
                        href={activeProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#B5E635] hover:bg-lime-400 text-[#0D0D0D] font-mono font-bold text-xs uppercase px-3 py-2 border-[2px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] inline-flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>LIVE DEMO</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {featuredProjects.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => handleDotClick(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`transition-all cursor-pointer ${
                dotIdx === currentIndex
                  ? "w-3 h-3 bg-[#0D0D0D] rounded-full"
                  : "w-2.5 h-2.5 bg-zinc-300 hover:bg-zinc-400 rounded-full"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Column (35% width): CERTIFICATIONS (Acid Lime Background) */}
      <div id="certifications" className="lg:col-span-4 bg-[#B5E635] p-6 sm:p-8 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#0D0D0D]">
            <h2 className="font-display text-xl sm:text-2xl font-black uppercase text-[#0D0D0D] tracking-tight">
              CERTIFICATIONS
            </h2>
            <Award className="w-5 h-5 text-[#0D0D0D]" />
          </div>

          {/* Vertical Stack of Cards (matching photo) */}
          <div className="space-y-3 pt-1">
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -2 }}
              onClick={onOpenCertifications}
              className="bg-white border-[2.2px] border-[#0D0D0D] p-3.5 sm:p-4 shadow-[4px_4px_0px_0px_#0D0D0D] cursor-pointer hover:bg-zinc-50 transition-all select-none"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#6D4AFF] uppercase">
                  IBM CERTIFIED
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <h4 className="font-display text-sm font-bold uppercase text-[#0D0D0D] mt-1">
                Deep Learning With TensorFlow
              </h4>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -2 }}
              onClick={onOpenCertifications}
              className="bg-white border-[2.2px] border-[#0D0D0D] p-3.5 sm:p-4 shadow-[4px_4px_0px_0px_#0D0D0D] cursor-pointer hover:bg-zinc-50 transition-all select-none"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#6D4AFF] uppercase">
                  GOOGLE CLOUD
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <h4 className="font-display text-sm font-bold uppercase text-[#0D0D0D] mt-1">
                Introduction to Generative AI
              </h4>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -2 }}
              onClick={onOpenCertifications}
              className="bg-white border-[2.2px] border-[#0D0D0D] p-3.5 sm:p-4 shadow-[4px_4px_0px_0px_#0D0D0D] cursor-pointer hover:bg-zinc-50 transition-all select-none"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#6D4AFF] uppercase">
                  CERTIPORT, PEARSON
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <h4 className="font-display text-sm font-bold uppercase text-[#0D0D0D] mt-1">
                Artificial Intelligence Certified
              </h4>
            </motion.div>

            {/* Card 4: Research Publication */}
            <motion.div
              whileHover={{ y: -2 }}
              onClick={onOpenCertifications}
              className="bg-white border-[2.2px] border-[#0D0D0D] p-3.5 sm:p-4 shadow-[4px_4px_0px_0px_#0D0D0D] cursor-pointer hover:bg-zinc-50 transition-all select-none"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#FF7A9E] uppercase">
                  RESEARCH PUBLICATION
                </span>
                <span className="text-[9px] bg-black text-white font-mono px-1">JETIR 2025</span>
              </div>
              <h4 className="font-display text-sm font-bold uppercase text-[#0D0D0D] mt-1">
                Quantized Edge AI Cattle Diagnostics
              </h4>
            </motion.div>
          </div>
        </div>

        {/* View All Certifications Button */}
        <motion.button
          whileHover={{ x: -1, y: -1 }}
          whileTap={{ x: 2, y: 2 }}
          onClick={onOpenCertifications}
          className="w-full mt-6 bg-white hover:bg-zinc-50 text-[#0D0D0D] font-mono font-bold text-xs uppercase px-4 py-2.5 border-[2.2px] border-[#0D0D0D] shadow-[3.5px_3.5px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <span>VIEW ALL CERTIFICATIONS</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </motion.button>
      </div>
    </section>
  );
};

export default NeoMiddleBento;
