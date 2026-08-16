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
        <main className="min-h-screen bg-retro-charcoal py-6 px-3 sm:px-4 md:px-6 lg:px-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd).replace(/</g, '\\u003c') }}
            />
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">

                {/* ── Top Navigation Bar ─ same pattern as Projects.tsx header frame ── */}
                <div className="bg-zinc-200 bento-card rounded-t-2xl rounded-b-none border-4 border-black border-b-0 p-4 flex items-center justify-between gap-2 flex-wrap">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-700 hover:text-black transition-colors group"
                    >
                        <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span>All Projects</span>
                    </Link>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-pixel text-[10px] text-zinc-600 uppercase hidden sm:inline">
                            CASE STUDY // TECHNICAL NARRATIVE
                        </span>
                        {study.category.map((cat, i) => (
                            <span key={i} className="font-pixel text-[10px] bg-black text-retro-yellow px-2 py-0.5 rounded font-bold uppercase border border-black">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Hero Card ── */}
                <div className="bg-retro-white border-4 border-black border-t-0 p-5 sm:p-8 rounded-b-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">

                    {/* Title block */}
                    <div className="space-y-2">
                        <div className="font-pixel text-xs text-retro-orange uppercase font-bold tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-retro-orange inline-block animate-pulse" />
                            PROJECT CASE STUDY
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-tighter leading-none text-zinc-900">
                            {study.title}
                        </h1>
                        <p className="font-body text-base sm:text-lg text-zinc-700 font-medium leading-relaxed max-w-3xl">
                            {study.subtitle}
                        </p>
                    </div>

                    {/* Tech Stack Chips — same style as project cards */}
                    <div className="flex flex-wrap gap-1.5">
                        {study.techStack.map((tech, i) => (
                            <span
                                key={i}
                                className="text-[10px] font-pixel px-2 py-0.5 border border-black/20 rounded font-bold uppercase bg-zinc-200 text-zinc-800"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t-2 border-black/10">
                        {study.demo && (
                            <a
                                href={study.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-3 bg-retro-green text-black font-body font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-black hover:bg-emerald-300 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <span>Live Demo</span>
                                <span className="material-symbols-outlined text-base">open_in_new</span>
                            </a>
                        )}
                        <a
                            href={study.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white font-body font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-black hover:bg-retro-yellow hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <span>GitHub Source</span>
                            <span className="material-symbols-outlined text-base">code</span>
                        </a>
                    </div>

                    {/* Meta Strip: Role / Timeline / Constraints — retro terminal key-value style */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { label: 'ROLE & SCOPE', value: study.role, icon: 'person' },
                            { label: 'TIMELINE', value: study.timeline, icon: 'schedule' },
                            { label: 'CORE CONSTRAINT', value: study.constraints, icon: 'warning' },
                        ].map((item, i) => (
                            <div key={i} className="bg-zinc-100 border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex items-center gap-1 mb-1">
                                    <span className="material-symbols-outlined text-sm text-zinc-500">{item.icon}</span>
                                    <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider">{item.label}</span>
                                </div>
                                <span className="font-body text-xs font-bold text-zinc-900 leading-snug">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Project Image ── */}
                {study.image && (
                    <div className="relative w-full aspect-video border-4 border-black rounded-2xl overflow-hidden bg-zinc-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <Image
                            src={study.image}
                            alt={`${study.title} project screenshot`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 960px"
                            className="object-cover"
                            priority
                        />
                        {/* Scanline overlay for retro look */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_50%,rgba(0,0,0,0.07)_50%)] [background-size:100%_4px] pointer-events-none z-10" />
                    </div>
                )}

                {/* ── Section 1: The Problem ── */}
                <div className="space-y-0">
                    {/* Section header frame — same as Projects.tsx */}
                    <div className="bg-zinc-200 bento-card rounded-t-2xl rounded-b-none border-4 border-black border-b-0 p-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-retro-orange text-xl">error_outline</span>
                        <span className="font-pixel text-xs sm:text-sm uppercase tracking-wider font-bold">01 // THE PROBLEM</span>
                    </div>
                    <div className="bg-retro-white border-4 border-black border-t-0 p-6 sm:p-8 rounded-b-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <p className="font-body text-base sm:text-xl text-zinc-800 leading-relaxed font-medium">
                            {study.problem}
                        </p>
                    </div>
                </div>

                {/* ── Section 2: Technical Approach & Key Decisions ── */}
                <div className="space-y-0">
                    <div className="bg-zinc-200 bento-card rounded-t-2xl rounded-b-none border-4 border-black border-b-0 p-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-retro-green text-xl">architecture</span>
                        <span className="font-pixel text-xs sm:text-sm uppercase tracking-wider font-bold">02 // TECHNICAL APPROACH & DECISIONS</span>
                    </div>
                    <div className="bg-retro-white border-4 border-black border-t-0 p-6 sm:p-8 rounded-b-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-5">
                        {study.approach.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-zinc-50 border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4"
                            >
                                {/* Decision title */}
                                <h3 className="font-display text-lg sm:text-xl uppercase tracking-tight text-zinc-900 flex items-center gap-3">
                                    <span className="w-7 h-7 rounded-lg bg-black text-retro-yellow text-xs flex items-center justify-center font-mono font-bold shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                                        {idx + 1}
                                    </span>
                                    {item.title}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Chosen */}
                                    <div className="bg-emerald-50 border-2 border-emerald-600 p-4 rounded-xl">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <span className="w-4 h-4 bg-emerald-500 rounded-sm flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white text-xs">check</span>
                                            </span>
                                            <span className="font-pixel text-[9px] text-emerald-700 font-bold uppercase tracking-wider">
                                                DECISION CHOSEN
                                            </span>
                                        </div>
                                        <p className="font-body text-xs sm:text-sm text-zinc-800 leading-relaxed">{item.decision}</p>
                                    </div>

                                    {/* Rejected */}
                                    <div className="bg-red-50 border-2 border-red-400 p-4 rounded-xl">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <span className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white text-xs">close</span>
                                            </span>
                                            <span className="font-pixel text-[9px] text-red-600 font-bold uppercase tracking-wider">
                                                REJECTED ALTERNATIVE
                                            </span>
                                        </div>
                                        <p className="font-body text-xs sm:text-sm font-bold text-zinc-800 mb-1">{item.rejectedAlternative}</p>
                                        <p className="font-body text-xs text-zinc-600 leading-relaxed">{item.rationale}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Section 3: Trade-offs ── */}
                <div className="space-y-0">
                    <div className="bg-zinc-200 bento-card rounded-t-2xl rounded-b-none border-4 border-black border-b-0 p-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-retro-yellow text-xl">balance</span>
                        <span className="font-pixel text-xs sm:text-sm uppercase tracking-wider font-bold">03 // TRADE-OFFS & HONEST REFLECTION</span>
                    </div>
                    <div className="bg-retro-white border-4 border-black border-t-0 p-6 sm:p-8 rounded-b-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        {/* Retro terminal quote-style block */}
                        <div className="border-l-4 border-retro-yellow pl-5 py-1">
                            <p className="font-body text-base sm:text-lg text-zinc-800 leading-relaxed font-medium">
                                {study.tradeoffs}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Section 4: Outcome & Metrics ── */}
                <div className="space-y-0">
                    <div className="bg-zinc-200 bento-card rounded-t-2xl rounded-b-none border-4 border-black border-b-0 p-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-retro-green text-xl">task_alt</span>
                        <span className="font-pixel text-xs sm:text-sm uppercase tracking-wider font-bold">04 // CONCRETE OUTCOME & METRICS</span>
                    </div>
                    <div className="bg-retro-white border-4 border-black border-t-0 p-6 sm:p-8 rounded-b-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
                        <p className="font-body text-base sm:text-xl text-zinc-900 font-bold leading-relaxed">
                            {study.outcome}
                        </p>

                        {/* Metrics — retro stat cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {study.metrics.map((m, i) => (
                                <div
                                    key={i}
                                    className="bg-black text-white border-2 border-black rounded-xl p-5 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-1 retro-grain"
                                >
                                    <span className="font-display text-2xl sm:text-3xl text-retro-yellow leading-none">
                                        {m.value}
                                    </span>
                                    <span className="font-pixel text-[9px] text-zinc-400 uppercase tracking-wider">
                                        {m.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Bottom CTA Bar ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 bg-black text-white rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] retro-grain">
                    <div>
                        <div className="font-display text-xl sm:text-2xl uppercase tracking-tight">Explore Project Sources</div>
                        <div className="font-body text-xs text-zinc-400 mt-0.5">Review the live deployment or inspect the full codebase.</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        {study.demo && (
                            <a
                                href={study.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-retro-green text-black font-body font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-black hover:bg-emerald-300 transition-all shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)]"
                            >
                                <span>Live Demo</span>
                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                            </a>
                        )}
                        <a
                            href={study.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-retro-yellow text-black font-body font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-black hover:bg-yellow-400 transition-all shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)]"
                        >
                            <span>View Source</span>
                            <span className="material-symbols-outlined text-sm">code</span>
                        </a>
                    </div>
                </div>

                {/* ── Prev / Next Navigation — same bento hover style ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href={`/projects/${prevSlug}`}
                        className="bg-zinc-100 border-2 border-black rounded-2xl p-4 sm:p-5 flex items-center gap-3 hover:bg-retro-yellow hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group"
                    >
                        <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform shrink-0">west</span>
                        <div className="min-w-0">
                            <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider block">PREVIOUS</span>
                            <span className="font-display text-base sm:text-lg uppercase tracking-tight truncate block">{prevStudy.title}</span>
                        </div>
                    </Link>

                    <Link
                        href={`/projects/${nextSlug}`}
                        className="bg-zinc-100 border-2 border-black rounded-2xl p-4 sm:p-5 flex items-center justify-end text-right gap-3 hover:bg-retro-yellow hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group"
                    >
                        <div className="min-w-0">
                            <span className="font-pixel text-[9px] text-zinc-500 uppercase tracking-wider block">NEXT</span>
                            <span className="font-display text-base sm:text-lg uppercase tracking-tight truncate block">{nextStudy.title}</span>
                        </div>
                        <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform shrink-0">east</span>
                    </Link>
                </div>

            </div>
        </main>
    );
}
