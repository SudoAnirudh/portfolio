import React from 'react';
import { DecisionItem } from '@/config/projects';

interface DecisionMatrixProps {
  decisions: DecisionItem[];
}

export const DecisionMatrix: React.FC<DecisionMatrixProps> = ({ decisions }) => {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-6">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-emerald-400 text-xl">balance</span>
        <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-400 font-semibold">
          // 03. TECHNICAL APPROACH & DECISION MATRIX
        </h2>
      </div>

      <div className="space-y-6">
        {decisions.map((item, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-100 flex items-center gap-2 font-sans">
              <span className="font-mono text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                0{idx + 1}
              </span>
              <span>{item.decision}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card A: Decision Chosen */}
              <div className="border border-emerald-500/30 bg-emerald-950/10 rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs px-2 py-0.5 rounded font-medium">
                    ✓ DECISION CHOSEN
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-zinc-200 pt-1 font-sans">
                  {item.chosen}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {item.chosenRationale}
                </p>
              </div>

              {/* Card B: Rejected Alternative */}
              <div className="border border-rose-500/30 bg-rose-950/10 rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono text-xs px-2 py-0.5 rounded font-medium">
                    ✕ REJECTED ALTERNATIVE
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-zinc-200 pt-1 font-sans">
                  {item.rejected}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
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
