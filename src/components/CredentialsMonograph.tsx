"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";

export default function CredentialsMonograph() {
  const { education, certifications, achievements } = portfolioData;

  return (
    <section id="credentials" className="space-y-8 border-b border-subtle pb-20 pt-4">
      {/* Section Header */}
      <div className="border-b border-subtle pb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
        <span>§05 CREDENTIALS & ACADEMIC STANDING</span>
        <span>QUALIFICATIONS</span>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--text-primary)]">
          Academic Degrees & Verified Certifications
        </h2>
      </div>

      {/* Grid: Education + Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        <div className="space-y-4 p-6 bg-[var(--bg-surface)] border border-subtle">
          <h3 className="font-serif text-xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-2">
            Higher Education
          </h3>
          {education.map((edu, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-baseline justify-between font-mono text-xs text-[var(--text-secondary)]">
                <span>{edu.period}</span>
                <span className="text-[var(--accent-editorial)] font-semibold">CGPA: {edu.cgpa}</span>
              </div>
              <h4 className="font-serif text-lg font-medium text-[var(--text-primary)]">
                {edu.degree}
              </h4>
              <p className="font-serif text-sm italic text-[var(--text-secondary)]">
                {edu.institution}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications & Badges */}
        <div className="space-y-4 p-6 bg-[var(--bg-surface)] border border-subtle">
          <h3 className="font-serif text-xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-2">
            Verified Certifications
          </h3>
          <ul className="space-y-3 font-mono text-xs">
            {certifications.map((cert, idx) => (
              <li key={idx} className="flex items-start justify-between border-b border-subtle pb-2 last:border-b-0">
                <span className="font-serif text-sm text-[var(--text-primary)] font-medium">
                  {cert.title}
                </span>
                <span className="text-[11px] text-[var(--text-secondary)] uppercase pl-2">
                  {cert.issuer}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Achievements Callout */}
      {achievements && achievements.length > 0 && (
        <div className="p-6 bg-[var(--bg-surface)] border border-subtle space-y-3">
          <h3 className="font-serif text-xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-2">
            Selected Technical Honors
          </h3>
          <ul className="space-y-2 font-serif text-base text-[var(--text-primary)] list-disc list-inside">
            {achievements.map((ach, idx) => (
              <li key={idx} className="marker:text-[var(--accent-editorial)]">
                {ach}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
