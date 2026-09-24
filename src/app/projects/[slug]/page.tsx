import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return { title: "Monograph Not Found" };

  return {
    title: `${study.title} — Monograph Chapter | Anirudh S`,
    description: study.subtitle,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    notFound();
  }

  const slugs = Object.keys(caseStudies);
  const currentIndex = slugs.indexOf(slug);
  const prevSlug = slugs[(currentIndex - 1 + slugs.length) % slugs.length];
  const nextSlug = slugs[(currentIndex + 1) % slugs.length];

  const prevStudy = caseStudies[prevSlug];
  const nextStudy = caseStudies[nextSlug];

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: study.title,
    description: study.subtitle,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Anirudh S",
      url: "https://sudoanirudh.vercel.app/"
    },
    keywords: study.techStack.join(", ")
  };

  return (
    <main className="min-h-screen paper-texture py-12 px-4 sm:px-6 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Top Monograph Header Navigation */}
        <div className="flex flex-wrap items-center justify-between border-b border-subtle pb-4 font-mono text-xs">
          <Link
            href="/#monographs"
            className="inline-flex items-center gap-1.5 text-[var(--accent-editorial)] hover:underline"
          >
            <span className="material-symbols-outlined !text-sm">arrow_back</span>
            <span>Return to Monograph Index (§02)</span>
          </Link>
          <div className="flex gap-2 text-[var(--text-secondary)] uppercase">
            {study.category.map((cat, i) => (
              <span key={i} className="px-2 py-0.5 bg-[var(--bg-surface)] border border-subtle text-[11px]">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Monograph Header */}
        <div className="space-y-4 border-b border-subtle pb-8">
          <div className="font-mono text-xs text-[var(--accent-editorial)] uppercase tracking-widest">
            RESEARCH MONOGRAPH // CHAPTER DETAILED SPECIFICATION
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[var(--text-primary)] tracking-tight">
            {study.title}
          </h1>
          <p className="font-serif text-xl italic text-[var(--text-secondary)] leading-relaxed">
            {study.subtitle}
          </p>
        </div>

        {/* Specs Meta Table */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 bg-[var(--bg-surface)] border border-subtle">
            <span className="text-[var(--text-secondary)] uppercase text-[10px]">ROLE</span>
            <div className="font-semibold text-[var(--text-primary)]">{study.role}</div>
          </div>
          <div className="p-4 bg-[var(--bg-surface)] border border-subtle">
            <span className="text-[var(--text-secondary)] uppercase text-[10px]">TIMELINE</span>
            <div className="font-semibold text-[var(--text-primary)]">{study.timeline}</div>
          </div>
          <div className="p-4 bg-[var(--bg-surface)] border border-subtle">
            <span className="text-[var(--text-secondary)] uppercase text-[10px]">SYSTEM CONSTRAINTS</span>
            <div className="font-semibold text-[var(--accent-editorial)]">{study.constraints}</div>
          </div>
        </div>

        {/* Problem & Abstract */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-1">
            Problem Statement & Engineering Thesis
          </h2>
          <p className="font-serif text-lg leading-relaxed text-[var(--text-primary)] max-w-prose">
            {study.problem}
          </p>
        </div>

        {/* Architecture Diagram */}
        {study.architectureFlow && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-1">
              System Architecture & Data Control Flow
            </h2>
            <ArchitectureDiagram slug={study.slug} flow={study.architectureFlow} />
          </div>
        )}

        {/* Tradeoffs & Decisions */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-1">
            Architectural Decisions & Trade-offs
          </h2>
          <div className="space-y-4">
            {study.approach.map((app, idx) => (
              <div key={idx} className="p-5 bg-[var(--bg-surface)] border border-subtle space-y-2">
                <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                  {app.title}
                </h3>
                <p className="font-serif text-base text-[var(--text-primary)]">
                  <strong className="font-mono text-xs uppercase text-[var(--text-secondary)]">Decision: </strong>
                  {app.decision}
                </p>
                <p className="font-serif text-sm text-[var(--text-secondary)] italic">
                  <strong>Rationale: </strong>{app.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Representative Code Snippet */}
        {study.codeSnippet && (
          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-1">
              Primary Code Implementation
            </h2>
            <div className="bg-[var(--bg-surface)] border border-subtle overflow-hidden">
              <div className="px-4 py-2 bg-[var(--bg-primary)] border-b border-subtle flex justify-between font-mono text-xs text-[var(--text-secondary)]">
                <span>{study.codeSnippet.filename}</span>
                <span className="uppercase text-[var(--accent-editorial)]">{study.codeSnippet.language}</span>
              </div>
              <p className="p-3 font-serif text-sm italic text-[var(--text-secondary)] border-b border-subtle">
                {study.codeSnippet.explanation}
              </p>
              <pre className="p-4 font-mono text-xs overflow-x-auto text-[var(--text-primary)] leading-relaxed bg-[var(--bg-surface)]">
                <code>{study.codeSnippet.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Outcomes & Metrics */}
        <div className="p-6 bg-[var(--bg-surface)] border border-subtle space-y-4">
          <h2 className="font-serif text-2xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-2">
            Verification Outcome & Metrics
          </h2>
          <p className="font-serif text-lg italic text-[var(--text-primary)]">
            {study.outcome}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {study.metrics.map((m) => (
              <div key={m.label} className="p-3 bg-[var(--bg-primary)] border border-subtle font-mono text-xs">
                <div className="text-[var(--text-secondary)] text-[10px] uppercase">{m.label}</div>
                <div className="font-bold text-[var(--accent-editorial)] mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Next / Previous Chapter Navigation */}
        <div className="flex flex-wrap items-center justify-between border-t border-subtle pt-6 font-mono text-xs">
          {prevStudy && (
            <Link
              href={`/projects/${prevSlug}`}
              className="inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent-editorial)]"
            >
              <span className="material-symbols-outlined !text-sm">arrow_back</span>
              <span>Prev: {prevStudy.title}</span>
            </Link>
          )}
          {nextStudy && (
            <Link
              href={`/projects/${nextSlug}`}
              className="inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent-editorial)] ml-auto"
            >
              <span>Next: {nextStudy.title}</span>
              <span className="material-symbols-outlined !text-sm">arrow_forward</span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
