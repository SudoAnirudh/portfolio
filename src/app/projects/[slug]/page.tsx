import React from 'react';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/config/projects';
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader';
import { SpecCard } from '@/components/case-study/SpecCard';
import { ArchitectureFlow } from '@/components/case-study/ArchitectureFlow';
import { DecisionMatrix } from '@/components/case-study/DecisionMatrix';
import { CodeWindow } from '@/components/case-study/CodeWindow';
import { MetricBento } from '@/components/case-study/MetricBento';
import { ProjectNavigation } from '@/components/case-study/ProjectNavigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS[slug];
  if (!project) return { title: 'Project Not Found | Anirudh S' };

  return {
    title: `${project.title} — Technical Case Study | Anirudh S`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS[slug];

  if (!project) {
    notFound();
  }

  // Calculate prev and next projects if not explicitly set
  const allSlugs = Object.keys(PROJECTS);
  const currentIndex = allSlugs.indexOf(slug);
  const prevSlug = project.prevProject?.slug || allSlugs[(currentIndex - 1 + allSlugs.length) % allSlugs.length];
  const nextSlug = project.nextProject?.slug || allSlugs[(currentIndex + 1) % allSlugs.length];

  const prevProj = PROJECTS[prevSlug] ? { slug: prevSlug, title: PROJECTS[prevSlug].title } : undefined;
  const nextProj = PROJECTS[nextSlug] ? { slug: nextSlug, title: PROJECTS[nextSlug].title } : undefined;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.tagline,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Anirudh S",
      url: "https://sudoanirudh.vercel.app/"
    },
    keywords: project.techStack.join(", ")
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 md:px-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
        {/* Header & Navigation Bar */}
        <CaseStudyHeader categories={project.categories} />

        {/* Engineering Spec Card (Hero) */}
        <SpecCard
          title={project.title}
          tagline={project.tagline}
          categories={project.categories}
          role={project.role}
          timeline={project.timeline}
          constraints={project.constraints}
          deployment={project.deployment}
          techStack={project.techStack}
          githubUrl={project.githubUrl}
          liveUrl={project.liveUrl}
        />

        {/* Section 1: The Problem */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-400 text-xl">error_outline</span>
            <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-400 font-semibold">
              // 01. THE PROBLEM
            </h2>
          </div>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            {project.problem}
          </p>
        </div>

        {/* Section 2: System Architecture & Pipeline Flow */}
        {project.stages && project.stages.length > 0 && (
          <ArchitectureFlow stages={project.stages} />
        )}

        {/* Section 3: Technical Approach & Decision Matrix */}
        {project.decisions && project.decisions.length > 0 && (
          <DecisionMatrix decisions={project.decisions} />
        )}

        {/* Section 4: Core Architectural Logic (IDE Code Window) */}
        {project.codeSnippet && (
          <CodeWindow snippet={project.codeSnippet} />
        )}

        {/* Section 5: Trade-Offs & Honest Reflection */}
        {project.tradeoffs && (
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-xl">task_alt</span>
              <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-400 font-semibold">
                // 05. TRADE-OFFS & HONEST REFLECTION
              </h2>
            </div>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
              {project.tradeoffs}
            </p>
          </div>
        )}

        {/* Section 6: Concrete Outcomes & Verified Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <MetricBento metrics={project.metrics} />
        )}

        {/* Section 7: Next / Previous Case Study Navigation */}
        <ProjectNavigation prevProject={prevProj} nextProject={nextProj} />
      </div>
    </main>
  );
}
