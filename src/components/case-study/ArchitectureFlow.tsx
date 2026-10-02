import React from 'react';
import { ProjectStage } from '@/config/projects';

interface ArchitectureFlowProps {
  stages: ProjectStage[];
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ stages }) => {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-6">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-cyan-400 text-xl">account_tree</span>
        <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-400 font-semibold">
          // 02. SYSTEM ARCHITECTURE & PIPELINE FLOW
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors flex flex-col justify-between relative group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider">
                  STAGE {stage.step}
                </span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  {stage.name}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-zinc-100 mt-3 font-sans">
                {stage.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                {stage.description}
              </p>
            </div>

            {idx < stages.length - 1 && (
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-zinc-600 font-mono text-xs">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
