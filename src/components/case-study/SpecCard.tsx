import React from 'react';

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
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 sm:p-8 backdrop-blur-md hover:border-zinc-700 transition-colors space-y-6">
      {/* Category Pills & Micro Label */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat, i) => (
            <span
              key={i}
              className="font-mono text-xs text-zinc-300 bg-zinc-800/60 border border-zinc-700/60 px-2.5 py-0.5 rounded-md uppercase tracking-wider"
            >
              {cat}
            </span>
          ))}
        </div>
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest hidden sm:inline">
          // ENGINEERING SPECIFICATION
        </span>
      </div>

      {/* Main Title & Tagline */}
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 font-sans">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 mt-3 leading-relaxed max-w-3xl">
          {tagline}
        </p>
      </div>

      {/* Tech Stack Pills Row */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider mr-1">
          Stack:
        </span>
        {techStack.map((tech, idx) => (
          <span
            key={idx}
            className="bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 font-mono text-xs px-2.5 py-1 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 font-mono text-xs sm:text-sm font-semibold rounded-lg transition-all"
          >
            <span>Live Demo</span>
            <span className="material-symbols-outlined text-base">open_in_new</span>
          </a>
        )}

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-800/80 border border-zinc-700/80 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100 hover:border-zinc-600 font-mono text-xs sm:text-sm font-semibold rounded-lg transition-all"
        >
          <span>GitHub Repository</span>
          <span className="material-symbols-outlined text-base">code</span>
        </a>
      </div>

      {/* 4-Field Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-zinc-950/60 border border-zinc-800/80 rounded-xl mt-6">
        <div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">
            YOUR ROLE & SCOPE
          </span>
          <span className="text-sm font-sans font-medium text-zinc-200 leading-snug block">
            {role}
          </span>
        </div>

        <div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">
            TIMELINE
          </span>
          <span className="text-sm font-sans font-medium text-zinc-200 leading-snug block">
            {timeline}
          </span>
        </div>

        <div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">
            CORE CONSTRAINTS
          </span>
          <span className="text-sm font-sans font-medium text-zinc-200 leading-snug block">
            {constraints}
          </span>
        </div>

        <div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">
            DEPLOYMENT
          </span>
          <span className="text-sm font-sans font-medium text-zinc-200 leading-snug block">
            {deployment}
          </span>
        </div>
      </div>
    </div>
  );
};
