import React from 'react';
import { ProjectStage } from '@/config/projects';

interface ArchitectureFlowProps {
  stages: ProjectStage[];
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ stages }) => {
  return (
    <div className="bg-white border-[3px] border-[#0D0D0D] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#0D0D0D] space-y-6">
      <div className="flex items-center gap-2">
        <span className="bg-[#6D4AFF] text-white border-[2px] border-[#0D0D0D] px-2.5 py-1 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#0D0D0D]">
          FLOW
        </span>
        <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#0D0D0D] font-black">
          {"//"} 02. SYSTEM ARCHITECTURE &amp; PIPELINE FLOW
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className="bg-[#FFFDF5] border-[2.2px] border-[#0D0D0D] p-5 shadow-[4px_4px_0px_0px_#0D0D0D] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b-[2px] border-[#0D0D0D] mb-3">
                <span className="font-mono text-xs font-black text-[#6D4AFF] tracking-wider">
                  STAGE 0{stage.step}
                </span>
                <span className="font-mono text-[10px] font-bold text-[#0D0D0D] uppercase tracking-wider bg-[#FFDE59] px-2 py-0.5 border border-[#0D0D0D]">
                  {stage.name}
                </span>
              </div>
              <h3 className="font-display text-sm font-black text-[#0D0D0D] uppercase tracking-tight">
                {stage.title}
              </h3>
              <p className="font-mono text-xs text-zinc-700 mt-2 leading-relaxed">
                {stage.description}
              </p>
            </div>

            {idx < stages.length - 1 && (
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white border border-black px-1 font-mono text-xs font-black shadow-[1px_1px_0px_0px_#0D0D0D]">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
