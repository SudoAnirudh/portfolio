import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavItem {
  slug: string;
  title: string;
}

interface ProjectNavigationProps {
  prevProject?: NavItem;
  nextProject?: NavItem;
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  prevProject,
  nextProject,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t-[2.5px] border-[#0D0D0D]">
      {prevProject ? (
        <Link
          href={`/projects/${prevProject.slug}`}
          className="bg-white border-[2.5px] border-[#0D0D0D] p-5 shadow-[4px_4px_0px_0px_#0D0D0D] hover:bg-[#FFE8EE] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all group flex flex-col justify-between"
        >
          <span className="font-mono text-xs font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5] group-hover:-translate-x-1 transition-transform" />
            <span>PREVIOUS CASE STUDY</span>
          </span>
          <span className="font-display text-base sm:text-lg font-black uppercase text-[#0D0D0D] tracking-tight">
            {prevProject.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextProject ? (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="bg-white border-[2.5px] border-[#0D0D0D] p-5 shadow-[4px_4px_0px_0px_#0D0D0D] hover:bg-[#B5E635] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all group flex flex-col justify-between text-right"
        >
          <span className="font-mono text-xs font-bold text-zinc-600 uppercase tracking-wider flex items-center justify-end gap-1.5 mb-1">
            <span>NEXT CASE STUDY</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="font-display text-base sm:text-lg font-black uppercase text-[#0D0D0D] tracking-tight">
            {nextProject.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};
