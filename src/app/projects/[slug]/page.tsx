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
    <main className="min-h-screen bg-[#F4F4EE] text-[#0D0D0D] py-8 sm:py-12 px-4 sm:px-6 md:px-8 font-sans selection:bg-[#B5E635] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
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
        <div className="bg-white border-[3px] border-[#0D0D0D] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#0D0D0D] space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-[#FF7A9E] text-[#0D0D0D] border-[2px] border-[#0D0D0D] px-2.5 py-1 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#0D0D0D]">
              PROBLEM
            </span>
            <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#0D0D0D] font-black">
              {"//"} 01. THE PROBLEM
            </h2>
          </div>
          <p className="font-mono text-sm sm:text-base text-zinc-800 leading-relaxed font-medium pt-1">
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
          <div className="bg-white border-[3px] border-[#0D0D0D] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#0D0D0D] space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#FFDE59] text-[#0D0D0D] border-[2px] border-[#0D0D0D] px-2.5 py-1 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#0D0D0D]">
                REFLECTION
              </span>
              <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#0D0D0D] font-black">
                {"//"} 05. TRADE-OFFS &amp; HONEST REFLECTION
              </h2>
            </div>
            <p className="font-mono text-sm sm:text-base text-zinc-800 leading-relaxed font-medium pt-1">
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
