"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";

export default function ExperienceMonograph() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="space-y-8 border-b border-subtle pb-20 pt-4">
      {/* Section Header */}
      <div className="border-b border-subtle pb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
        <span>§04 RESEARCH & PROFESSIONAL WORK LOG</span>
        <span>CAREER HISTORY</span>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--text-primary)]">
          Engineering & Research Roles
        </h2>
        <p className="font-serif text-lg leading-relaxed text-[var(--text-primary)] max-w-prose">
          Chronological record of production engineering appointments, AI integration work, and analytical framework deployments.
        </p>
      </div>

      {/* Editorial Timeline */}
      <div className="space-y-8">
        {experience.map((exp, idx) => (
          <div
            key={idx}
            className="p-6 bg-[var(--bg-surface)] border border-subtle space-y-4 hover:border-[var(--accent-editorial)] transition-colors duration-200"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-subtle pb-3">
              <div>
                <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
                  {exp.role}
                </h3>
                <p className="font-serif text-base italic text-[var(--accent-editorial)]">
                  {exp.company}
                </p>
              </div>
              <span className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider bg-[var(--bg-primary)] px-3 py-1 border border-subtle">
                {exp.period}
              </span>
            </div>

            <ul className="space-y-2 font-serif text-base text-[var(--text-primary)] leading-relaxed list-disc list-inside">
              {exp.description.map((bullet, bIdx) => (
                <li key={bIdx} className="marker:text-[var(--accent-editorial)]">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
