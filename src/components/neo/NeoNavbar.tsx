"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";

interface NeoNavbarProps {
  onOpenContact: () => void;
  onOpenSkills: () => void;
  onOpenResearch: () => void;
  onScrollTo: (sectionId: string) => void;
}

export const NeoNavbar: React.FC<NeoNavbarProps> = ({
  onOpenContact,
  onOpenSkills,
  onOpenResearch,
  onScrollTo,
}) => {
  return (
    <header className="w-full bg-white border-b-[2.5px] border-[#0D0D0D] sticky top-0 z-40">
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-6">
        {/* Left Badge: </> ANIRUDH S */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onScrollTo("hero")}
          className="bg-[#B5E635] text-[#0D0D0D] border-[2.2px] border-[#0D0D0D] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-none shadow-[2px_2px_0px_0px_#0D0D0D] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1.5 cursor-pointer select-none"
        >
          <Code2 className="w-4 h-4 stroke-[2.5]" />
          <span>ANIRUDH S</span>
        </motion.div>

        {/* Center Navigation Links (Hidden on small screens, shown on md+) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs lg:text-sm font-bold tracking-wider text-[#0D0D0D]">
          <button
            onClick={() => onOpenSkills()}
            className="hover:text-[#6D4AFF] hover:underline decoration-2 underline-offset-4 cursor-pointer transition-colors"
          >
            SKILLS
          </button>
          <button
            onClick={() => onScrollTo("projects")}
            className="hover:text-[#6D4AFF] hover:underline decoration-2 underline-offset-4 cursor-pointer transition-colors"
          >
            PROJECTS
          </button>
          <button
            onClick={() => onScrollTo("experience")}
            className="hover:text-[#6D4AFF] hover:underline decoration-2 underline-offset-4 cursor-pointer transition-colors"
          >
            EXPERIENCE
          </button>
          <button
            onClick={() => onScrollTo("certifications")}
            className="hover:text-[#6D4AFF] hover:underline decoration-2 underline-offset-4 cursor-pointer transition-colors"
          >
            CERTIFICATIONS
          </button>
          <button
            onClick={onOpenResearch}
            className="hover:text-[#6D4AFF] hover:underline decoration-2 underline-offset-4 cursor-pointer transition-colors flex items-center gap-1"
          >
            <span>RESEARCH</span>
            <span className="text-[10px] bg-[#B5E635] border border-black px-1 py-0.2 text-black font-mono">
              2025
            </span>
          </button>
        </nav>

        {/* Right CTA Button: CONTACT ME → */}
        <motion.button
          whileHover={{ x: -1, y: -1 }}
          whileTap={{ x: 2, y: 2 }}
          onClick={onOpenContact}
          className="bg-[#6D4AFF] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-3.5 py-1.5 sm:px-5 sm:py-2 border-[2.2px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] flex items-center gap-1.5 cursor-pointer transition-all"
        >
          <span>CONTACT ME</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </motion.button>
      </div>
    </header>
  );
};

export default NeoNavbar;
