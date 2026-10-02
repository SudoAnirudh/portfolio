import React from 'react';
import { MetricItem } from '@/config/projects';

interface MetricBentoProps {
  metrics: MetricItem[];
}

export const MetricBento: React.FC<MetricBentoProps> = ({ metrics }) => {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-6">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-emerald-400 text-xl">query_stats</span>
        <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-400 font-semibold">
          // 06. CONCRETE OUTCOMES & VERIFIED METRICS
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-zinc-100">
                {metric.value}
              </div>
              <div className="text-xs uppercase tracking-wider font-mono text-zinc-300 font-medium mt-3">
                {metric.label}
              </div>
            </div>
            <div className="text-xs text-zinc-500 mt-2 font-sans border-t border-zinc-900 pt-2">
              {metric.subtext}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
