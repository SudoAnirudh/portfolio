"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";

export default function EngineeringCore() {
  const { skills } = portfolioData;

  return (
    <section id="core" className="space-y-8 border-b border-subtle pb-20 pt-4">
      {/* Section Header */}
      <div className="border-b border-subtle pb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
        <span>§03 ENGINEERING CORE & CAPABILITIES</span>
        <span>SYSTEM MATRIX</span>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--text-primary)]">
          Technical Stack & Tooling Matrix
        </h2>
        <p className="font-serif text-lg leading-relaxed text-[var(--text-primary)] max-w-prose">
          A breakdown of technical competencies, domain frameworks, agentic orchestration suites, and core infrastructure toolsets.
        </p>
      </div>

      {/* Typographic Technical Table */}
      <div className="border border-subtle overflow-hidden bg-[var(--bg-surface)]">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-subtle text-[var(--text-secondary)] text-[10px] uppercase tracking-widest bg-[var(--bg-primary)]">
              <th className="p-4 border-r border-subtle w-1/3">Domain Category</th>
              <th className="p-4">Technologies & Tooling</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-primary)]">
            {skills.map((skill, idx) => (
              <tr key={idx} className="hover:bg-[var(--bg-primary)] transition-colors duration-150">
                <td className="p-4 border-r border-subtle font-serif text-base font-medium text-[var(--text-primary)]">
                  {skill.category}
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {skill.items.split(", ").map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 bg-[var(--bg-primary)] border border-subtle text-[11px] font-mono text-[var(--text-primary)] hover:border-[var(--accent-editorial)] transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
