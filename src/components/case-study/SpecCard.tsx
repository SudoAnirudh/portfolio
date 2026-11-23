import React from 'react';
import { Code, ExternalLink } from 'lucide-react';

interface SpecCardProps {
  title: string;
  tagline: string;
  categories: string[];
  role: string;
  timeline: string;
  constraints: string;
  deployment: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export const SpecCard: React.FC<SpecCardProps> = ({
  title,
  tagline,
  categories,
  role,
  timeline,
  constraints,
  deployment,
  techStack,
  githubUrl,
  liveUrl,
}) => {
  return (
    <div className="bg-white border-[3px] border-[#0D0D0D] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#0D0D0D] space-y-7 relative overflow-hidden">
      {/* Decorative Corner Starburst / Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFDE59] border-l-[3px] border-b-[3px] border-[#0D0D0D] flex items-center justify-center font-mono font-black text-xs">
        v1.0
      </div>

      {/* Category Pills & Micro Label */}
      <div className="flex items-center justify-between gap-2 pr-16">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat, i) => (
            <span
              key={i}
              className="font-mono text-xs font-bold text-[#0D0D0D] bg-[#FFE8EE] border-[2px] border-[#0D0D0D] px-3 py-1 uppercase tracking-wider shadow-[2px_2px_0px_0px_#0D0D0D]"
            >
              {cat}
            </span>
          ))}
        </div>
        <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest hidden md:inline">
          {"//"} ARCHITECTURE SPECIFICATION
        </span>
      </div>

      {/* Main Title & Tagline */}
      <div className="space-y-3">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#0D0D0D]">
          {title}
        </h1>
        <p className="font-mono text-sm sm:text-base text-zinc-700 leading-relaxed max-w-3xl font-medium">
          {tagline}
        </p>
      </div>

      {/* Tech Stack Pills Row */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="font-mono text-xs font-black text-[#0D0D0D] uppercase tracking-wider mr-1">
          STACK:
        </span>
        {techStack.map((tech, idx) => (
          <span
            key={idx}
            className="bg-[#FFFDF5] border-[2px] border-[#0D0D0D] text-[#0D0D0D] font-mono text-xs font-bold px-3 py-1 shadow-[2px_2px_0px_0px_#0D0D0D]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3.5 pt-2">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#B5E635] border-[2.2px] border-[#0D0D0D] text-[#0D0D0D] hover:bg-lime-300 font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#0D0D0D] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
          >
            <span>LIVE DEMO</span>
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </a>
        )}

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 bg-white border-[2.2px] border-[#0D0D0D] text-[#0D0D0D] hover:bg-zinc-100 font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#0D0D0D] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
        >
          <span>GITHUB REPOSITORY</span>
          <Code className="w-4 h-4 stroke-[2.5]" />
        </a>
      </div>

      {/* 4-Field Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 bg-[#FFFDF5] border-[2.5px] border-[#0D0D0D] shadow-[4px_4px_0px_0px_#0D0D0D] mt-6">
        <div>
          <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            ROLE &amp; SCOPE
          </span>
          <span className="text-sm font-sans font-bold text-[#0D0D0D] leading-snug block">
            {role}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            TIMELINE
          </span>
          <span className="text-sm font-sans font-bold text-[#0D0D0D] leading-snug block">
            {timeline}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            CORE CONSTRAINTS
          </span>
          <span className="text-sm font-sans font-bold text-[#0D0D0D] leading-snug block">
            {constraints}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            DEPLOYMENT
          </span>
          <span className="text-sm font-sans font-bold text-[#0D0D0D] leading-snug block">
            {deployment}
          </span>
        </div>
      </div>
    </div>
  );
};
