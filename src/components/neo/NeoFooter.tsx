"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code2, Mail, Coffee } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { portfolioData } from "@/data/portfolio";

interface NeoFooterProps {
  onOpenContact: () => void;
}

export const NeoFooter: React.FC<NeoFooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="w-full bg-white border-t-[2.5px] border-[#0D0D0D] px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
      {/* Left: </> ANIRUDH S */}
      <div className="bg-[#B5E635] text-[#0D0D0D] border-[2px] border-[#0D0D0D] px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_#0D0D0D] flex items-center gap-1.5">
        <Code2 className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>ANIRUDH S</span>
      </div>

      {/* Center: Copyright & Availability */}
      <div className="font-mono text-xs text-zinc-600 text-center font-medium">
        © 2026 Anirudh S. All rights reserved. · Kozhikode, India
      </div>

      {/* Right: Square Social Buttons */}
      <div className="flex items-center gap-2">
        <motion.a
          whileHover={{ x: -1, y: -1 }}
          whileTap={{ x: 1, y: 1 }}
          href={portfolioData.personal.social.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="w-8 h-8 bg-white border-[1.8px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none flex items-center justify-center text-[#0D0D0D] hover:bg-[#B5E635] transition-colors"
        >
          <GithubIcon className="w-4 h-4" />
        </motion.a>

        <motion.a
          whileHover={{ x: -1, y: -1 }}
          whileTap={{ x: 1, y: 1 }}
          href={portfolioData.personal.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="w-8 h-8 bg-white border-[1.8px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none flex items-center justify-center text-[#0D0D0D] hover:bg-[#6D4AFF] hover:text-white transition-colors"
        >
          <LinkedinIcon className="w-4 h-4" />
        </motion.a>

        <motion.button
          whileHover={{ x: -1, y: -1 }}
          whileTap={{ x: 1, y: 1 }}
          onClick={onOpenContact}
          aria-label="Send Email / Contact"
          className="w-8 h-8 bg-white border-[1.8px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none flex items-center justify-center text-[#0D0D0D] hover:bg-[#FF7A9E] transition-colors cursor-pointer"
        >
          <Mail className="w-4 h-4" />
        </motion.button>

        {portfolioData.personal.social.buyMeACoffee && (
          <motion.a
            whileHover={{ x: -1, y: -1 }}
            whileTap={{ x: 1, y: 1 }}
            href={portfolioData.personal.social.buyMeACoffee}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy Me a Coffee"
            className="w-8 h-8 bg-white border-[1.8px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none flex items-center justify-center text-[#0D0D0D] hover:bg-yellow-300 transition-colors"
          >
            <Coffee className="w-4 h-4" />
          </motion.a>
        )}
      </div>
    </footer>
  );
};

export default NeoFooter;
