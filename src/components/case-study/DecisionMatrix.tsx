import React from 'react';
import { DecisionItem } from '@/config/projects';

interface DecisionMatrixProps {
  decisions: DecisionItem[];
}

export const DecisionMatrix: React.FC<DecisionMatrixProps> = ({ decisions }) => {
  return (
    <div className="bg-white border-[3px] border-[#0D0D0D] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#0D0D0D] space-y-6">
      <div className="flex items-center gap-2">
        <span className="bg-[#B5E635] text-[#0D0D0D] border-[2px] border-[#0D0D0D] px-2.5 py-1 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#0D0D0D]">
          TRADE-OFFS
        </span>
        <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#0D0D0D] font-black">
          {"//"} 03. TECHNICAL APPROACH &amp; DECISION MATRIX
        </h2>
      </div>

      <div className="space-y-6">
        {decisions.map((item, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-base sm:text-lg font-black text-[#0D0D0D] flex items-center gap-2.5 font-display uppercase tracking-tight">
              <span className="font-mono text-xs font-black text-white bg-[#0D0D0D] px-2.5 py-0.5 border border-[#0D0D0D]">
                0{idx + 1}
              </span>
              <span>{item.decision}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card A: Decision Chosen */}
              <div className="border-[2.5px] border-[#0D0D0D] bg-[#F4FCE3] p-5 space-y-2 shadow-[4px_4px_0px_0px_#0D0D0D]">
                <div className="flex items-center justify-between">
                  <span className="bg-[#B5E635] text-[#0D0D0D] border-[2px] border-[#0D0D0D] font-mono text-xs px-2.5 py-0.5 font-black uppercase shadow-[1.5px_1.5px_0px_0px_#0D0D0D]">
                    ✓ DECISION CHOSEN
                  </span>
                </div>
                <h4 className="text-sm font-black text-[#0D0D0D] pt-1 font-sans">
                  {item.chosen}
                </h4>
                <p className="font-mono text-xs text-zinc-800 leading-relaxed">
                  {item.chosenRationale}
                </p>
              </div>

              {/* Card B: Rejected Alternative */}
              <div className="border-[2.5px] border-[#0D0D0D] bg-[#FFF0F3] p-5 space-y-2 shadow-[4px_4px_0px_0px_#0D0D0D]">
                <div className="flex items-center justify-between">
                  <span className="bg-[#FF7A9E] text-[#0D0D0D] border-[2px] border-[#0D0D0D] font-mono text-xs px-2.5 py-0.5 font-black uppercase shadow-[1.5px_1.5px_0px_0px_#0D0D0D]">
                    ✕ REJECTED ALTERNATIVE
                  </span>
                </div>
                <h4 className="text-sm font-black text-[#0D0D0D] pt-1 font-sans">
                  {item.rejected}
                </h4>
                <p className="font-mono text-xs text-zinc-800 leading-relaxed">
                  {item.rejectedRationale}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
