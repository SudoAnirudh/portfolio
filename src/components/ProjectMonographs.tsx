"use client";

import React, { useState } from "react";
import { caseStudies } from "@/data/caseStudies";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { useMarginalia } from "@/context/MarginaliaContext";

export default function ProjectMonographs() {
  const { setActiveNote } = useMarginalia();
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const projectsList = Object.values(caseStudies);

  const handleCopyCode = (code: string, slug: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <section id="monographs" className="space-y-24 pt-4 border-b border-subtle pb-20">
      {/* Chapter Section Title */}
      <div className="border-b border-subtle pb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
        <span>§02 PROJECT MONOGRAPHS & CASE STUDIES</span>
        <span>RESEARCH CHAPTERS 01–{projectsList.length.toString().padStart(2, "0")}</span>
      </div>

      {projectsList.map((cs, idx) => {
        const chapterNum = (idx + 1).toString().padStart(2, "0");

        return (
          <article
            key={cs.slug}
            id={`chapter-${cs.slug}`}
            className="space-y-8 pt-6 first:pt-0 border-b border-subtle last:border-b-0 pb-16"
          >
            {/* Chapter Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent-editorial)] uppercase tracking-widest">
                <span>CHAPTER {chapterNum}</span>
                <span className="text-[var(--text-secondary)]">—</span>
                <span>{cs.category.join(" / ")}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text-primary)] tracking-tight">
                {cs.title}
              </h2>
              <p className="font-serif text-lg italic text-[var(--text-secondary)]">
                {cs.subtitle}
              </p>
            </div>

            {/* Publication Specs Bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[var(--text-secondary)] border-y border-subtle py-2.5 bg-[var(--bg-surface)] px-4">
              <div><span className="uppercase text-[10px]">ROLE:</span> <span className="text-[var(--text-primary)]">{cs.role}</span></div>
              <div><span className="uppercase text-[10px]">TIMELINE:</span> <span className="text-[var(--text-primary)]">{cs.timeline}</span></div>
              <div><span className="uppercase text-[10px]">CONSTRAINTS:</span> <span className="text-[var(--text-primary)]">{cs.constraints}</span></div>
            </div>

            {/* 1. Abstract & Engineering Thesis */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-1">
                1. Abstract & Problem Formulation
              </h3>
              <p className="font-serif text-lg leading-relaxed text-[var(--text-primary)] max-w-prose">
                {cs.problem}
              </p>
            </div>

            {/* 2. System Architecture Diagram */}
            {cs.architectureFlow && (
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-1">
                  2. System Architecture & Control Loop Flow
                </h3>
                <ArchitectureDiagram slug={cs.slug} flow={cs.architectureFlow} />
              </div>
            )}

            {/* 3. Technical Specs Monospace Table */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-1">
                3. Technical Specifications & Benchmark Metrics
              </h3>
              <div className="overflow-x-auto border border-subtle bg-[var(--bg-surface)]">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-subtle text-[var(--text-secondary)] text-[10px] uppercase tracking-widest bg-[var(--bg-primary)]">
                      <th className="p-3">Specification</th>
                      <th className="p-3">Implementation Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-primary)]">
                    <tr>
                      <td className="p-3 font-semibold text-[var(--text-secondary)]">STACK & FRAMEWORKS</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1.5">
                          {cs.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 bg-[var(--bg-primary)] border border-subtle text-[11px]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                    {cs.metrics.map((m) => (
                      <tr key={m.label}>
                        <td className="p-3 font-semibold text-[var(--text-secondary)] uppercase">{m.label}</td>
                        <td className="p-3 font-bold text-[var(--accent-editorial)]">{m.value}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="p-3 font-semibold text-[var(--text-secondary)]">VERIFICATION OUTCOME</td>
                      <td className="p-3 font-serif italic text-sm">{cs.outcome}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Marginalia Notes & Trade-Off Decisions */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-1">
                4. Engineering Trade-offs & Architectural Decisions
              </h3>
              <div className="space-y-4">
                {cs.approach.map((app, aIdx) => (
                  <div
                    key={aIdx}
                    onMouseEnter={() =>
                      setActiveNote({
                        id: `${cs.slug}-${aIdx}`,
                        number: aIdx + 1,
                        title: app.title,
                        text: app.rationale,
                        tradeoff: app.rejectedAlternative,
                      })
                    }
                    className="p-4 bg-[var(--bg-surface)] border border-subtle space-y-2 group hover:border-[var(--accent-editorial)] transition-colors duration-200"
                  >
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-serif text-lg font-medium text-[var(--text-primary)]">
                        {app.title}{" "}
                        <span className="font-mono text-xs text-[var(--accent-editorial)] italic">
                          [{aIdx + 1}]
                        </span>
                      </h4>
                      <span className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">
                        Decision Node
                      </span>
                    </div>
                    <p className="font-serif text-base text-[var(--text-primary)]">
                      <strong className="font-semibold text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">Decision: </strong>
                      {app.decision}
                    </p>
                    <div className="font-mono text-xs text-[var(--text-secondary)] pt-1 border-t border-subtle flex flex-wrap items-center justify-between gap-2">
                      <span>Rejected Alternative: <span className="line-through">{app.rejectedAlternative}</span></span>
                      <span className="text-[var(--accent-editorial)] font-serif italic">See right margin note [{aIdx + 1}]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Representative Code Artifact */}
            {cs.codeSnippet && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-subtle pb-1">
                  <h3 className="font-serif text-xl font-medium italic text-[var(--text-primary)]">
                    5. Primary Code Implementation
                  </h3>
                  <button
                    onClick={() => handleCopyCode(cs.codeSnippet!.code, cs.slug)}
                    className="font-mono text-xs text-[var(--accent-editorial)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined !text-sm">
                      {copiedSlug === cs.slug ? "check" : "content_copy"}
                    </span>
                    {copiedSlug === cs.slug ? "Copied to Clipboard" : "Copy Code"}
                  </button>
                </div>
                <div className="bg-[var(--bg-surface)] border border-subtle overflow-hidden">
                  <div className="px-4 py-2 bg-[var(--bg-primary)] border-b border-subtle flex items-center justify-between font-mono text-xs text-[var(--text-secondary)]">
                    <span>{cs.codeSnippet.filename}</span>
                    <span className="uppercase text-[10px] text-[var(--accent-editorial)]">{cs.codeSnippet.language}</span>
                  </div>
                  <p className="p-3 font-serif text-sm italic text-[var(--text-secondary)] border-b border-subtle">
                    {cs.codeSnippet.explanation}
                  </p>
                  <pre className="p-4 font-mono text-xs overflow-x-auto text-[var(--text-primary)] leading-relaxed bg-[var(--bg-surface)]">
                    <code>{cs.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Chapter Footer Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
              <a
                href={cs.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[var(--bg-surface)] text-[var(--text-primary)] border border-subtle hover:border-[var(--accent-editorial)] hover:text-[var(--accent-editorial)] transition-colors duration-200 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined !text-sm">code</span>
                Inspect Source Code (GitHub)
              </a>
              {cs.demo && (
                <a
                  href={cs.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[var(--accent-editorial)] text-[var(--bg-primary)] font-medium hover:opacity-90 transition-opacity duration-200 flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined !text-sm">open_in_new</span>
                  Launch Interactive Demo
                </a>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
