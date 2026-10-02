import { PROJECTS, ProjectData } from '@/config/projects';

export interface CaseStudy {
    slug: string;
    title: string;
    subtitle: string;
    category: string[];
    techStack: string[];
    github: string;
    demo?: string;
    image?: string;
    role: string;
    timeline: string;
    constraints: string;
    problem: string;
    architectureFlow?: {
        step: string;
        title: string;
        description: string;
    }[];
    codeSnippet?: {
        filename: string;
        language: string;
        explanation?: string;
        code: string;
    };
    approach: {
        title: string;
        decision: string;
        rejectedAlternative: string;
        rationale: string;
    }[];
    tradeoffs: string;
    outcome: string;
    metrics: { label: string; value: string }[];
}

export const caseStudies: Record<string, CaseStudy> = Object.fromEntries(
    Object.entries(PROJECTS).map(([key, p]) => [
        key,
        {
            slug: p.slug,
            title: p.title,
            subtitle: p.tagline,
            category: p.categories,
            techStack: p.techStack,
            github: p.githubUrl,
            demo: p.liveUrl,
            role: p.role,
            timeline: p.timeline,
            constraints: p.constraints,
            problem: p.problem,
            architectureFlow: p.stages.map(s => ({
                step: `${s.step}. ${s.name}`,
                title: s.title,
                description: s.description,
            })),
            codeSnippet: p.codeSnippet ? {
                filename: p.codeSnippet.filename,
                language: p.codeSnippet.language,
                explanation: p.codeSnippet.explanation || '',
                code: p.codeSnippet.code,
            } : undefined,
            approach: p.decisions.map(d => ({
                title: d.decision,
                decision: d.chosenRationale ? `${d.chosen}: ${d.chosenRationale}` : d.chosen,
                rejectedAlternative: d.rejected,
                rationale: d.rejectedRationale,
            })),
            tradeoffs: p.tradeoffs,
            outcome: p.metrics.map(m => `${m.label}: ${m.value}`).join(' | '),
            metrics: p.metrics.map(m => ({ label: m.label, value: m.value })),
        }
    ])
);
