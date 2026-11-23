import React from 'react';
import { MetricItem } from '@/config/projects';

interface MetricBentoProps {
  metrics: MetricItem[];
}

export const MetricBento: React.FC<MetricBentoProps> = ({ metrics }) => {
  return (
    <div className="bg-white border-[3px] border-[#0D0D0D] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#0D0D0D] space-y-6">
      <div className="flex items-center gap-2">
        <span className="bg-[#B5E635] text-[#0D0D0D] border-[2px] border-[#0D0D0D] px-2.5 py-1 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#0D0D0D]">
          RESULTS
        </span>
        <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#0D0D0D] font-black">
          {"//"} 06. CONCRETE OUTCOMES &amp; VERIFIED METRICS
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-[#FFFDF5] border-[2.5px] border-[#0D0D0D] p-5 shadow-[4px_4px_0px_0px_#0D0D0D] flex flex-col justify-between"
          >
            <div>
              <div className="text-3xl sm:text-4xl font-black font-display text-[#0D0D0D] tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs uppercase tracking-wider font-mono text-[#0D0D0D] font-black mt-3">
                {metric.label}
              </div>
            </div>
            <div className="font-mono text-xs text-zinc-600 mt-2 border-t-[2px] border-[#0D0D0D] pt-2">
              {metric.subtext}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
