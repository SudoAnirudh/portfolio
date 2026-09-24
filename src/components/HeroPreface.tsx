"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";

export default function HeroPreface() {
  const { personal, hero } = portfolioData;

  return (
    <header id="preface" className="space-y-8 border-b border-subtle pb-16 pt-2">
      {/* Editorial Header Meta */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[var(--text-secondary)] tracking-widest uppercase border-b border-subtle pb-3">
        <span>PREFACE & EDITORIAL ABSTRACT</span>
        <span>ISSUE 2026.09</span>
      </div>

      {/* Folio Title */}
      <div className="space-y-4">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight italic text-[var(--text-primary)] leading-[1.1]">
          {personal.name}
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-editorial)] font-medium">
          {personal.role}
        </p>
      </div>

      {/* Editorial Abstract Quote */}
      <blockquote className="border-l-2 border-[var(--accent-editorial)] pl-6 py-1 italic font-serif text-xl sm:text-2xl text-[var(--text-primary)] leading-relaxed">
        &ldquo;Anirudh S — AI Systems Engineer & Builder. A compendium of production autonomous agents, semantic retrieval pipelines, and full-stack software architectures.&rdquo;
      </blockquote>

      {/* Narrative Abstract Body */}
      <div className="font-serif text-lg leading-relaxed text-[var(--text-primary)] space-y-4 max-w-prose">
        <p>
          This monograph documents production-grade AI systems engineered from first principles — combining asynchronous backends (FastAPI), high-dimensional vector search engines (pgvector, ChromaDB), ReAct agent control loops, and edge ML deployments (TensorFlow Lite, Jetpack Compose).
        </p>
        <p>
          The work prioritizes measurable engineering discipline: minimizing latency budgets, enforcing strict context isolation, preventing agentic hallucination loops, and maintaining zero-downtime execution environments.
        </p>
      </div>

      {/* Key Metric Highlights & Publication Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-subtle font-mono text-xs">
        <div className="p-3 bg-[var(--bg-surface)] border border-subtle">
          <div className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wider">PRIMARY DOMAIN</div>
          <div className="text-[var(--text-primary)] font-semibold mt-0.5">Agentic Systems & GenAI</div>
        </div>
        <div className="p-3 bg-[var(--bg-surface)] border border-subtle">
          <div className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wider">CORE BACKEND</div>
          <div className="text-[var(--text-primary)] font-semibold mt-0.5">FastAPI & pgvector</div>
        </div>
        <div className="p-3 bg-[var(--bg-surface)] border border-subtle">
          <div className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wider">PUBLICATIONS / MONOGRAPHS</div>
          <div className="text-[var(--accent-editorial)] font-semibold mt-0.5">8 Production Systems</div>
        </div>
      </div>

      {/* Direct Quick Actions */}
      <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
        <a
          href="#monographs"
          className="px-5 py-2.5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium hover:bg-[var(--accent-editorial)] transition-colors duration-200"
        >
          Explore Monographs (§02)
        </a>
        <a
          href="https://drive.google.com/file/d/1V6g7AmD1qLFil0PY0rPI54-Rfp0RgajU/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-[var(--bg-surface)] text-[var(--text-primary)] border border-subtle hover:border-[var(--accent-editorial)] hover:text-[var(--accent-editorial)] transition-colors duration-200 flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined !text-sm">download</span>
          Curriculum Vitae (PDF)
        </a>
      </div>
    </header>
  );
}
