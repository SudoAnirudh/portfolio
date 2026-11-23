import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface CaseStudyHeaderProps {
  categories: string[];
}

export const CaseStudyHeader: React.FC<CaseStudyHeaderProps> = ({ categories }) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b-[2.5px] border-[#0D0D0D] pb-5">
      <div className="flex items-center gap-3">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 bg-white text-[#0D0D0D] border-[2px] border-[#0D0D0D] px-3.5 py-1.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[3px_3px_0px_0px_#0D0D0D] hover:bg-[#B5E635] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all group"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK TO PROJECTS</span>
        </Link>
        <span className="font-mono text-xs text-zinc-500 tracking-wider uppercase hidden sm:inline">
          {"//"} CASE STUDY SPEC
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#0D0D0D] bg-white border-[2px] border-[#0D0D0D] px-3 py-1 shadow-[2px_2px_0px_0px_#0D0D0D]">
          {categories.map((cat, idx) => (
            <span key={idx} className="uppercase tracking-wider">
              {idx > 0 && <span className="text-zinc-400 mr-1.5 ml-0.5">{"//"}</span>}
              {cat}
            </span>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 font-mono text-xs font-black tracking-wider text-[#0D0D0D] bg-[#B5E635] border-[2px] border-[#0D0D0D] px-3 py-1 shadow-[2px_2px_0px_0px_#0D0D0D]">
          <span className="h-2 w-2 rounded-full bg-[#0D0D0D] animate-ping" />
          <span>LIVE SPEC</span>
        </div>
      </div>
    </header>
  );
};
