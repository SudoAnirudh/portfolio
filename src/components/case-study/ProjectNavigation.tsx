import React from 'react';
import Link from 'next/link';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/80">
      {prevProject ? (
        <Link
          href={`/projects/${prevProject.slug}`}
          className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors backdrop-blur-md group flex flex-col justify-between"
        >
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block mb-1">
            ← PREVIOUS CASE STUDY
          </span>
          <span className="text-base font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors font-sans">
            {prevProject.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextProject ? (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors backdrop-blur-md group flex flex-col justify-between text-right sm:text-right"
        >
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block mb-1">
            NEXT CASE STUDY →
          </span>
          <span className="text-base font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors font-sans">
            {nextProject.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};
