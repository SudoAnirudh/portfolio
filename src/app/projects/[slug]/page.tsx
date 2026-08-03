import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/caseStudies';

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
    if (!study) return { title: 'Project Not Found' };

    return {
        title: `${study.title} — Case Study | Anirudh S`,
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
            url: "https://portfolio-blue-five-10.vercel.app/"
        },
        keywords: study.techStack.join(", ")
    };

    return (
        <main className="min-h-screen bg-retro-cream dark:bg-zinc-900 py-10 px-4 sm:px-6 md:px-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd).replace(/</g, '\\u003c') }}
            />
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-4">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        <span>Back to All Projects</span>
                    </Link>
                    <div className="flex gap-1.5">
                        {study.category.map((cat, i) => (
                            <span key={i} className="font-pixel text-[10px] bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 rounded font-bold uppercase">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hero Header Card */}
                <div className="bg-zinc-100 dark:bg-zinc-800 bento-card rounded-3xl p-6 sm:p-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-2">
                        <div className="font-pixel text-xs text-retro-orange uppercase font-bold tracking-widest">
                            PROJECT CASE STUDY // TECHNICAL NARRATIVE
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display uppercase tracking-tight text-zinc-900 dark:text-white">
                            {study.title}
                        </h1>
                        <p className="font-body text-base sm:text-xl text-zinc-700 dark:text-zinc-300 font-medium">
                            {study.subtitle}
                        </p>
                    </div>

                    {/* Top Action CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        {study.demo && (
                            <a
                                href={study.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-3 bg-retro-green text-black font-body font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-black hover:bg-emerald-300 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <span>Live Demo</span>
                                <span className="material-symbols-outlined text-base">open_in_new</span>
                            </a>
                        )}

                        <a
                            href={study.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white dark:bg-white dark:text-black font-body font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-black hover:bg-retro-yellow hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <span>GitHub Repository</span>
                            <span className="material-symbols-outlined text-base">code</span>
                        </a>
                    </div>

                    {/* Meta Strip: Role, Timeline, Constraints */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t-2 border-black/10 dark:border-white/10 text-xs font-body">
                        <div className="bg-white dark:bg-zinc-900 border border-black/20 p-3 rounded-xl">
                            <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider block mb-1">YOUR ROLE & SCOPE</span>
                            <span className="font-bold text-zinc-900 dark:text-white">{study.role}</span>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 border border-black/20 p-3 rounded-xl">
                            <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider block mb-1">TIMELINE</span>
                            <span className="font-bold text-zinc-900 dark:text-white">{study.timeline}</span>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 border border-black/20 p-3 rounded-xl">
                            <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider block mb-1">CORE CONSTRAINTS</span>
                            <span className="font-bold text-zinc-900 dark:text-white">{study.constraints}</span>
                        </div>
                    </div>
                </div>

                {/* Section 1: The Problem */}
                <div className="bg-zinc-100 dark:bg-zinc-800 bento-card rounded-3xl p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-retro-orange text-xl">error_outline</span>
                        <h2 className="font-pixel text-xs sm:text-sm uppercase tracking-widest text-zinc-500 font-bold">
                            1. THE PROBLEM
                        </h2>
                    </div>
                    <p className="font-body text-base sm:text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                        {study.problem}
                    </p>
                </div>

                {/* Section 2: Technical Approach & Key Decisions */}
                <div className="bg-zinc-100 dark:bg-zinc-800 bento-card rounded-3xl p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-retro-green text-xl">architecture</span>
                        <h2 className="font-pixel text-xs sm:text-sm uppercase tracking-widest text-zinc-500 font-bold">
                            2. TECHNICAL APPROACH & DECISIONS
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {study.approach.map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-zinc-900 border-2 border-black rounded-2xl p-5 space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="font-display text-lg sm:text-xl uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center font-mono">
                                        {idx + 1}
                                    </span>
                                    <span>{item.title}</span>
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-body pt-1">
                                    <div className="bg-zinc-50 dark:bg-zinc-800 p-3.5 rounded-xl border border-black/10">
                                        <span className="font-pixel text-[9px] text-emerald-600 font-bold uppercase tracking-wider block mb-1">
                                            ✓ DECISION CHOSEN
                                        </span>
                                        <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed">{item.decision}</p>
                                    </div>

                                    <div className="bg-zinc-50 dark:bg-zinc-800 p-3.5 rounded-xl border border-black/10">
                                        <span className="font-pixel text-[9px] text-red-500 font-bold uppercase tracking-wider block mb-1">
                                            ✕ REJECTED ALTERNATIVE
                                        </span>
                                        <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed font-bold mb-1">{item.rejectedAlternative}</p>
                                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.rationale}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 3: Trade-offs & What I'd Do Differently */}
                <div className="bg-zinc-100 dark:bg-zinc-800 bento-card rounded-3xl p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-retro-yellow text-xl">balance</span>
                        <h2 className="font-pixel text-xs sm:text-sm uppercase tracking-widest text-zinc-500 font-bold">
                            3. TRADE-OFFS & HONEST REFLECTION
                        </h2>
                    </div>
                    <p className="font-body text-base sm:text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                        {study.tradeoffs}
                    </p>
                </div>

                {/* Section 4: Concrete Outcome & Metrics */}
                <div className="bg-zinc-100 dark:bg-zinc-800 bento-card rounded-3xl p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-5">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-500 text-xl">task_alt</span>
                        <h2 className="font-pixel text-xs sm:text-sm uppercase tracking-widest text-zinc-500 font-bold">
                            4. CONCRETE OUTCOME & METRICS
                        </h2>
                    </div>

                    <p className="font-body text-base sm:text-lg text-zinc-900 dark:text-white font-bold leading-relaxed">
                        {study.outcome}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {study.metrics.map((m, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900 border border-black/20 p-4 rounded-xl text-center">
                                <span className="font-display text-xl sm:text-2xl text-retro-yellow block">{m.value}</span>
                                <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider block mt-1">{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-black text-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                        <div className="font-display text-lg uppercase">Explore Project Sources</div>
                        <div className="font-body text-xs text-zinc-400">Review live deployment or inspect codebase on GitHub.</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        {study.demo && (
                            <a
                                href={study.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-retro-green text-black font-body font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-black hover:bg-emerald-300 transition-all"
                            >
                                <span>Live Demo</span>
                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                            </a>
                        )}
                        <a
                            href={study.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black font-body font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-black hover:bg-retro-yellow transition-all"
                        >
                            <span>View Source</span>
                            <span className="material-symbols-outlined text-sm">code</span>
                        </a>
                    </div>
                </div>

                {/* Prev / Next Project Navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-black/10 dark:border-white/10">
                    <Link
                        href={`/projects/${prevSlug}`}
                        className="bg-zinc-100 dark:bg-zinc-800 border-2 border-black rounded-2xl p-4 flex items-center gap-3 hover:bg-retro-yellow hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group"
                    >
                        <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">west</span>
                        <div>
                            <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider block">PREVIOUS CASE STUDY</span>
                            <span className="font-display text-base uppercase">{prevStudy.title}</span>
                        </div>
                    </Link>

                    <Link
                        href={`/projects/${nextSlug}`}
                        className="bg-zinc-100 dark:bg-zinc-800 border-2 border-black rounded-2xl p-4 flex items-center justify-end text-right gap-3 hover:bg-retro-yellow hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group"
                    >
                        <div>
                            <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider block">NEXT CASE STUDY</span>
                            <span className="font-display text-base uppercase">{nextStudy.title}</span>
                        </div>
                        <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">east</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
