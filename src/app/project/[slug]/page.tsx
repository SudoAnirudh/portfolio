import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
import { notFound } from "next/navigation";


export function generateStaticParams() {
    return portfolioData.projects.map((project) => ({
        slug: project.title.toLowerCase().replace(/\s+/g, '-'),
    }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = portfolioData.projects.find(
        (p) => p.title.toLowerCase().replace(/\s+/g, '-') === params.slug
    );

    if (!project) {
        notFound();
    }

    return (
        <main className="relative min-h-screen pt-20 pb-12">

            <div className="max-w-4xl mx-auto relative z-10 space-y-8">
                {/* Back Navigation */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-retro-charcoal text-white px-4 py-2 font-pixel uppercase text-sm border-2 border-transparent hover:bg-black hover:border-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back to Terminal
                </Link>

                {/* Project Header */}
                <div className="bg-retro-white bento-card rounded-2xl p-8 border-4 border-black relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-zinc-200 border-2 border-black flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl">{project.icon}</span>
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tighter">
                                {project.title}
                            </h1>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {project.techStack.map((tech, idx) => (
                                    <span key={idx} className="bg-zinc-200 px-2 py-1 text-xs font-pixel uppercase tracking-widest border border-black">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="font-body text-zinc-700 text-lg leading-relaxed mb-8">
                        {project.description}
                    </p>

                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-retro-yellow text-black px-6 py-3 font-bold uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-retro-orange hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                        <span className="material-symbols-outlined">code</span>
                        View Source Code
                    </a>
                </div>

                {/* Project Image / Visuals */}
                {project.image && (
                    <div className="bg-zinc-200 bento-card p-4 rounded-2xl border-4 border-black">
                        <div className="w-full flex items-center gap-2 mb-4 px-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 border border-black/20"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black/20"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 border border-black/20"></div>
                            <span className="ml-2 font-pixel text-xs uppercase text-zinc-500 tracking-widest">
                                visual_data.png
                            </span>
                        </div>
                        <img
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            className="w-full h-auto aspect-video object-cover border-2 border-black rounded grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                )}
            </div>
        </main>
    );
}
