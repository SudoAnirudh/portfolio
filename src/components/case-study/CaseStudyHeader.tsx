import React from 'react';
import Link from 'next/link';

interface CaseStudyHeaderProps {
  categories: string[];
}

export const CaseStudyHeader: React.FC<CaseStudyHeaderProps> = ({ categories }) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
      <div className="flex items-center gap-3">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors group"
        >
          <span className="text-zinc-500 group-hover:-translate-x-0.5 transition-transform">←</span>
          <span>Back to Works / Projects</span>
        </Link>
        <span className="text-zinc-700 hidden sm:inline">•</span>
        <span className="font-mono text-xs text-zinc-500 tracking-wider uppercase hidden sm:inline">
          // PROJECT CASE STUDY
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 bg-zinc-900/80 border border-zinc-800 px-3 py-1 rounded-full">
          {categories.map((cat, idx) => (
            <span key={idx} className="uppercase tracking-wider">
              {idx > 0 && <span className="text-zinc-600 mr-1.5 ml-0.5">//</span>}
              {cat}
            </span>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE SYSTEM</span>
        </div>
      </div>
    </header>
  );
};
