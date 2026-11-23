"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface NeoSkillsStripProps {
  onOpenSkills: (initialSkill?: string) => void;
}

export const NeoSkillsStrip: React.FC<NeoSkillsStripProps> = ({
  onOpenSkills,
}) => {
  const featuredSkills = [
    {
      name: "Python",
      accent: "#FFDE59",
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 48 48" fill="none">
          {/* Top Yellow Half */}
          <path
            d="M23.5 4C14.5 4 15 8 15 8L15.01 12H24V14H10C10 14 4 13.5 4 23C4 32.5 9 32 9 32H12V27.5C12 22 17.5 22 17.5 22H26.5C31.5 22 32 17.5 32 17.5V8.5C32 8.5 32.5 4 23.5 4Z"
            fill="#38BDF8"
            stroke="#0D0D0D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="8.5" r="1.5" fill="#0D0D0D" />
          {/* Bottom Blue Half */}
          <path
            d="M24.5 44C33.5 44 33 40 33 40L32.99 36H24V34H38C38 34 44 34.5 44 25C44 15.5 39 16 39 16H36V20.5C36 26 30.5 26 30.5 26H21.5C16.5 26 16 30.5 16 30.5V39.5C16 39.5 15.5 44 24.5 44Z"
            fill="#FFDE59"
            stroke="#0D0D0D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="30" cy="39.5" r="1.5" fill="#0D0D0D" />
        </svg>
      ),
    },
    {
      name: "FastAPI",
      accent: "#B5E635",
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="#0D9488" stroke="#0D0D0D" strokeWidth="2.5" />
          <path
            d="M26 10L14 26H23L21 38L34 22H25L26 10Z"
            fill="#FFFFFF"
            stroke="#0D0D0D"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Next.js",
      accent: "#0D0D0D",
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="#0D0D0D" stroke="#0D0D0D" strokeWidth="2.5" />
          <path
            d="M33 34.5L19.5 17H16V31H19.5V22.2L30.8 36.8C31.56 36.1 32.32 35.33 33 34.5Z"
            fill="#FFFFFF"
          />
          <rect x="29" y="17" width="3.5" height="10" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: "PyTorch",
      accent: "#FF7A9E",
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 48 48" fill="none">
          {/* Outer circle subtle */}
          <circle cx="24" cy="24" r="20" fill="#FFF5F7" stroke="#0D0D0D" strokeWidth="2.5" />
          {/* Flame Icon */}
          <path
            d="M24 10C24 10 20 16 20 20C20 22.2 21.8 24 24 24C26.2 24 28 22.2 28 20C28 16 24 10 24 10Z"
            fill="#EE4C2C"
            stroke="#0D0D0D"
            strokeWidth="2"
          />
          <path
            d="M24 14C17.4 14 12 19.4 12 26C12 32.6 17.4 38 24 38C30.6 38 36 32.6 36 26C36 23.5 35.2 21.2 33.8 19.3L30.9 22.2C31.6 23.3 32 24.6 32 26C32 30.4 28.4 34 24 34C19.6 34 16 30.4 16 26C16 21.6 19.6 18 24 18V14Z"
            fill="#EE4C2C"
            stroke="#0D0D0D"
            strokeWidth="2"
          />
          <circle cx="33" cy="15" r="2.5" fill="#EE4C2C" stroke="#0D0D0D" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "pgvector",
      accent: "#38BDF8",
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 48 48" fill="none">
          {/* Vector Database Cube / Cylinder */}
          <rect x="8" y="10" width="32" height="28" rx="6" fill="#336791" stroke="#0D0D0D" strokeWidth="2.5" />
          <ellipse cx="24" cy="18" rx="12" ry="5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="2" />
          <path d="M12 18 V28 C12 30.7 17.4 33 24 33 C30.6 33 36 30.7 36 28 V18" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          {/* Vector Sparkle */}
          <polygon points="34,8 36,12 40,14 36,16 34,20 32,16 28,14 32,12" fill="#B5E635" stroke="#0D0D0D" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "Docker / K8s",
      accent: "#6D4AFF",
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="#0284C7" stroke="#0D0D0D" strokeWidth="2.5" />
          {/* Container Stack */}
          <rect x="15" y="19" width="4" height="4" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1" />
          <rect x="20" y="19" width="4" height="4" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1" />
          <rect x="25" y="19" width="4" height="4" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1" />
          <rect x="20" y="14" width="4" height="4" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1" />
          <rect x="25" y="14" width="4" height="4" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1" />
          {/* Whale Body */}
          <path
            d="M37 24C35.5 24 34.5 25 34 25.5C31.5 23 27 23 24 24H12C11 24 10 25 10 26C10 30 14 34 24 34C32 34 36 30 38 27C38.5 27 40 26.5 41 24.5C40 24 38.5 24 37 24Z"
            fill="#FFFFFF"
            stroke="#0D0D0D"
            strokeWidth="2"
          />
          <circle cx="15" cy="27" r="1.5" fill="#0D0D0D" />
        </svg>
      ),
    },
  ];

  return (
    <section id="skills" className="w-full bg-white border-y-[2.5px] border-[#0D0D0D] flex flex-col md:flex-row overflow-x-auto scrollbar-none">
      {/* Left Purple Block: SKILLS → */}
      <motion.button
        whileHover={{ backgroundColor: "#5835E6" }}
        onClick={() => onOpenSkills()}
        className="bg-[#6D4AFF] text-white p-5 sm:p-6 flex items-center justify-between gap-3 shrink-0 md:w-56 border-b-[2.5px] md:border-b-0 md:border-r-[2.5px] border-[#0D0D0D] cursor-pointer group select-none transition-colors"
      >
        <div className="flex flex-col text-left">
          <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight">
            SKILLS
          </span>
          <span className="font-mono text-[10px] text-white/80 uppercase font-medium">
            46 TECH ASSETS
          </span>
        </div>
        <div className="w-9 h-9 rounded-none bg-white text-[#6D4AFF] border-[2px] border-[#0D0D0D] flex items-center justify-center shadow-[2.5px_2.5px_0px_0px_#0D0D0D] group-hover:translate-x-0.5 transition-transform">
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </div>
      </motion.button>

      {/* Interactive Tech Tiles Row (matching reference photo style) */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x-[2.5px] divide-y-[2.5px] sm:divide-y-0 divide-[#0D0D0D]">
        {featuredSkills.map((skill, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -3, backgroundColor: "#FAF9F6" }}
            onClick={() => onOpenSkills(skill.name)}
            className="py-5 px-3 sm:py-6 bg-white flex flex-col items-center justify-center text-center gap-2 cursor-pointer group transition-all select-none hover:shadow-[inset_0_-4px_0_0_#0D0D0D]"
          >
            <div className="group-hover:scale-110 transition-transform drop-shadow-[2px_2px_0px_rgba(13,13,13,0.3)]">
              {skill.icon}
            </div>
            <div className="font-mono text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#0D0D0D] mt-1">
              {skill.name}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NeoSkillsStrip;
