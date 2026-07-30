"use client";
import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

const skillDetails: Record<string, string> = {
    "Python": "Primary language for ML & backend. Developed PashuSwasthya offline DL disease models, engineered Hirenix FastAPI scoring backend, and built Flask-based Intrusion Detection Systems.",
    "PyTorch": "Used for deep learning model training, tensor manipulations, CNN feature layer extraction, and custom loss optimization across computer vision pipelines.",
    "Ollama": "Deployed for local LLM inference (Llama 3, Qwen, Mistral) in privacy-focused, zero-latency local development environments.",
    "Cursor": "AI-native IDE used for agentic pair programming, multi-file code transformations, and rapid codebase exploration.",
    "Claude Code": "Anthropic CLI agent used for autonomous terminal tasks, system debugging, automated refactoring, and code reviews.",
    "Antigravity": "Google DeepMind agentic AI IDE used for multi-agent orchestration, pair programming, and structured task execution.",
    "OpenAI Codex": "Utilized for AI-driven code generation, automated docstring synthesis, and function implementation.",
    "Gemini CLI": "Google Gemini terminal tools used for quick LLM querying, multi-file code summarization, and prompt prototyping.",
    "Hermes": "Nous Research Hermes agentic reasoning models and function-calling framework for complex tool-use workflows.",
    "OpenClaw": "Autonomous AI agent and web intelligence automation tool for extracting structured web data.",
    "JavaScript": "Used in Next.js development. Built user interface components and client-side interactions for Hirenix career intelligence SaaS and portfolio widgets.",
    "TypeScript": "Utilized in building type-safe UI modules and page routing for the Hirenix candidate portal, ensuring code consistency and robust schema design.",
    "Kotlin": "Android Intern at MindMatrix. Developed 'Nimma-Guru' mentorship app connecting students with local mentors, retired teachers, and professionals.",
    "SQL": "Designed relational schemas, optimized index queries, and configured structured database triggers for candidate trackers and student analytics.",
    "scikit-learn": "HeproAI Intern: Applied K-Means clustering for behavioral cohort segmentation of 200+ profiles. Used for threat profiling in Intrusion Detection System.",
    "TensorFlow": "Trained Convolutional Neural Networks (CNN) for image classifications. Built 'CNN Visualizer' web tool to analyze filter activations.",
    "TensorFlow Lite": "PashuSwasthya project: Deployed on-device CNN models for cattle breed & disease detection, optimized for low-connectivity rural areas.",
    "LangChain": "Used for LLM orchestration, structured data parsing, prompt engineering, and semantic query routing in career intelligence tools.",
    "ChromaDB": "Created local vector database embeddings for candidate resume search and similarity-based retrieval.",
    "pgvector": "Hirenix: Configured pgvector in Supabase to power semantic resume-to-job similarity search and career roadmap matching.",
    "NVIDIA NIM": "Hirenix: Integrated NIM microservices (embeddings) for scalable, sub-200ms career compatibility scoring.",
    "Gemini API": "MindMatrix Intern: Integrated Gemini 2.0 Flash into Nimma-Guru for voice-assisted commands and AI-powered mentor recommendations.",
    "FastAPI": "Hirenix backend: Developed async API endpoints handling resume parsing and candidate indexing under 200ms latency.",
    "Flask": "Built backend routing, data validation, and real-time inference endpoints for the Network Intrusion Detection System.",
    "Django": "Used for building structured backend panels and administering model database records.",
    "Firebase": "MindMatrix: Implemented real-time sessions scheduling, user profiles database, and multilingual content management for Nimma-Guru.",
    "Supabase": "Hirenix backend: Managed authentication, candidate database, and pgvector semantic query execution.",
    "MongoDB": "Stored semi-structured document payloads, resume parse results, and logging outputs.",
    "PostgreSQL": "Engineered database schemas and index optimizations. Integrated pgvector plugin in production DB.",
    "React": "Used for frontends of Hirenix and the portfolio. Crafted highly responsive, animated UI panels.",
    "Next.js": "Hirenix frontend: Designed dynamic search interfaces, real-time interview simulator dashboard, and metrics visualization.",
    "Jetpack Compose": "MindMatrix: Developed 10+ responsive screens following Material 3 guidelines for community mentorship features.",
    "Flutter": "PashuSwasthya: Designed the multilingual, offline-capable mobile app featuring voice symptom input and local storage.",
    "Git": "Managed project branches and PR workflows. Merged 5+ contributions during GSSoC '25 and Hacktoberfest 2025.",
    "Docker": "Containerized FastAPI and Node.js backend/frontend services for Hirenix production deployments.",
    "Google Cloud": "MindMatrix: Utilized Google Cloud Labs and Google AI Studio platforms for training models and API configurations.",
    "Android Studio": "MindMatrix: Primary IDE for building and debugging Nimma-Guru Android client application with Jetpack Compose.",
    "Jupyter": "Used for exploratory data analysis, plotting training loss curves, and testing cluster algorithms (K-Means).",
    "Power BI": "HeproAI: Engineered interactive analytical dashboards for student wellness, productivity, and academic metrics across 200+ profiles with real-time risk indicators.",
    "VS Code": "Primary workspace environment & IDE for Python backend, Next.js frontend, Docker orchestration, and Git version control across all production projects."
};

const iconMap: Record<string, string> = {
    "Python": "python",
    "PyTorch": "pytorch",
    "Ollama": "ollama",
    "Cursor": "cursor",
    "Claude Code": "anthropic",
    "Antigravity": "googlegemini",
    "OpenAI Codex": "openai",
    "Gemini CLI": "googlegemini",
    "Hermes": "openai",
    "OpenClaw": "github",
    "JavaScript": "javascript",
    "TypeScript": "typescript",
    "Kotlin": "kotlin",
    "SQL": "sqlite",
    "scikit-learn": "scikitlearn",
    "TensorFlow": "tensorflow",
    "TensorFlow Lite": "tensorflow",
    "LangChain": "langchain",
    "ChromaDB": "postgresql",
    "pgvector": "postgresql",
    "NVIDIA NIM": "nvidia",
    "Gemini API": "googlegemini",
    "FastAPI": "fastapi",
    "Flask": "flask",
    "Django": "django",
    "Firebase": "firebase",
    "Supabase": "supabase",
    "MongoDB": "mongodb",
    "PostgreSQL": "postgresql",
    "React": "react",
    "Next.js": "nextdotjs",
    "Jetpack Compose": "android",
    "Flutter": "flutter",
    "Git": "git",
    "Docker": "docker",
    "Google Cloud": "googlecloud",
    "Android Studio": "androidstudio",
    "Jupyter": "jupyter",
    "Power BI": "powerbi",
    "VS Code": "visualstudiocode"
};

const CUSTOM_ICONS: Record<string, (props: { className?: string; isWhite?: boolean }) => React.ReactNode> = {
    "VS Code": ({ className = "w-3.5 h-3.5", isWhite = false }) => (
        <svg className={className} viewBox="0 0 24 24" fill={isWhite ? "#ffffff" : "#007ACC"}>
            <path d="M23.15 2.587L17.21.213a1.44 1.44 0 0 0-1.72.39L.85 13.413a.72.72 0 0 0 0 1.174l14.64 12.81a1.44 1.44 0 0 0 1.72.39l5.94-2.374a.72.72 0 0 0 .45-.668V3.255a.72.72 0 0 0-.45-.668zm-6.35 15.34L6.96 14 16.8 6.07v11.85z"/>
        </svg>
    ),
    "Power BI": ({ className = "w-3.5 h-3.5", isWhite = false }) => (
        <svg className={className} viewBox="0 0 24 24" fill={isWhite ? "#ffffff" : "#F2C811"}>
            <path d="M18 20V8h4v12h-4zm-7 0V4h4v16h-4zM4 20v-8h4v8H4z" />
        </svg>
    ),
    "Antigravity": ({ className = "w-3.5 h-3.5", isWhite = false }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={isWhite ? "#ffffff" : "#A855F7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 22 22 22" fill={isWhite ? "#ffffff" : "#A855F7"} fillOpacity="0.3"/>
            <circle cx="12" cy="12" r="3" fill={isWhite ? "#ffffff" : "#A855F7"} />
        </svg>
    ),
    "Claude Code": ({ className = "w-3.5 h-3.5", isWhite = false }) => (
        <svg className={className} viewBox="0 0 24 24" fill={isWhite ? "#ffffff" : "#D97706"}>
            <path d="M12 2L9 9L2 12L9 15L12 22L15 15L22 12L15 9L12 2z"/>
        </svg>
    ),
    "Cursor": ({ className = "w-3.5 h-3.5", isWhite = false }) => (
        <svg className={className} viewBox="0 0 24 24" fill={isWhite ? "#ffffff" : "#3B82F6"}>
            <path d="M3 3l7 18 3-7 7-3L3 3z"/>
        </svg>
    ),
    "Hermes": ({ className = "w-3.5 h-3.5", isWhite = false }) => (
        <svg className={className} viewBox="0 0 24 24" fill={isWhite ? "#ffffff" : "#EC4899"}>
            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.8L18 8v8l-6 3.75L6 16V8l6-3.2z"/>
        </svg>
    ),
    "OpenClaw": ({ className = "w-3.5 h-3.5", isWhite = false }) => (
        <svg className={className} viewBox="0 0 24 24" fill={isWhite ? "#ffffff" : "#F97316"}>
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
        </svg>
    )
};

const TOP_SKILLS = new Set([
    "Python", "PyTorch", "FastAPI", "LangChain", "Antigravity", "Claude Code", "Cursor", "pgvector", "TensorFlow Lite", "Kotlin", "Next.js", "Docker"
]);

const SkillIcon = ({ skill, isTop }: { skill: string; isTop: boolean }) => {
    const [failed, setFailed] = useState(false);
    
    if (CUSTOM_ICONS[skill]) {
        const CustomIcon = CUSTOM_ICONS[skill];
        return <CustomIcon className="w-3.5 h-3.5" isWhite={isTop} />;
    }

    const slug = iconMap[skill] || skill.toLowerCase().replace(/ /g, "").replace(/[^a-z0-9]/g, "");
    const color = isTop ? 'white' : '18181b';

    if (failed) {
        return <span className="material-symbols-outlined text-[13px] opacity-70">code</span>;
    }

    return (
        <img
            src={`https://cdn.simpleicons.org/${slug}/${color}`}
            alt={skill}
            className={`w-3.5 h-3.5 object-contain ${isTop ? 'opacity-100' : 'opacity-80'}`}
            onError={() => setFailed(true)}
        />
    );
};

const SkillModalIcon = ({ skill }: { skill: string }) => {
    const [failed, setFailed] = useState(false);
    
    if (CUSTOM_ICONS[skill]) {
        const CustomIcon = CUSTOM_ICONS[skill];
        return <CustomIcon className="w-full h-full object-contain" isWhite={true} />;
    }

    const slug = iconMap[skill] || skill.toLowerCase().replace(/ /g, "").replace(/[^a-z0-9]/g, "");

    if (failed) {
        return <span className="material-symbols-outlined text-2xl text-white">terminal</span>;
    }

    return (
        <img
            src={`https://cdn.simpleicons.org/${slug}/white`}
            alt={skill}
            className="w-full h-full object-contain"
            onError={() => setFailed(true)}
        />
    );
};

{/* VS Code Architectural Environment Diagram */}
const VsCodeDiagram = () => (
    <div className="mt-4 border-2 border-black bg-zinc-900 rounded-xl p-3.5 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
            <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
                <span className="text-[10px] text-zinc-400 font-sans font-bold ml-2">VS CODE // WORKSPACE REPRESENTATION</span>
            </div>
            <span className="text-[10px] bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded border border-blue-500/40">DEV_ENV_ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
            <div className="bg-zinc-800/80 p-2 rounded border border-zinc-700">
                <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1">Explorer Tree</div>
                <div className="space-y-1 text-[11px] text-zinc-300">
                    <div className="flex items-center gap-1 text-yellow-400 font-bold">📁 backend/</div>
                    <div className="pl-3 text-emerald-400">📄 main.py (FastAPI)</div>
                    <div className="pl-3 text-blue-400">📄 models.py (pgvector)</div>
                    <div className="flex items-center gap-1 text-yellow-400 font-bold">📁 frontend/</div>
                    <div className="pl-3 text-cyan-400">📄 page.tsx (Next.js)</div>
                </div>
            </div>

            <div className="bg-zinc-800/80 p-2 rounded border border-zinc-700 sm:col-span-2">
                <div className="flex justify-between items-center text-[10px] text-zinc-400 uppercase font-bold mb-1 border-b border-zinc-700 pb-1">
                    <span>Active Editor: main.py</span>
                    <span className="text-emerald-400">● Python 3.11</span>
                </div>
                <div className="text-[11px] text-zinc-300 space-y-0.5 leading-snug">
                    <div><span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI</div>
                    <div><span className="text-purple-400">from</span> langchain <span className="text-purple-400">import</span> OpenAIEmbeddings</div>
                    <div className="text-zinc-500"># Async candidate matching endpoint</div>
                    <div><span className="text-blue-400">@app.post</span>(<span className="text-emerald-300">"/api/score"</span>)</div>
                    <div><span className="text-purple-400">async def</span> <span className="text-yellow-300">score_candidate</span>(payload):</div>
                    <div className="pl-3 text-zinc-400"><span className="text-purple-400">return await</span> compute_similarity(payload)</div>
                </div>
            </div>
        </div>

        {/* Extensions & Tooling Row */}
        <div className="border-t border-zinc-800 pt-2.5">
            <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1.5">Configured Workspace Extensions</div>
            <div className="flex flex-wrap gap-1.5">
                {['Pylance', 'Tailwind CSS', 'Prettier', 'GitLens', 'Docker', 'ESLint', 'Jupyter'].map((ext, idx) => (
                    <span key={idx} className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px] px-2 py-0.5 rounded-full font-sans">
                        ⚡ {ext}
                    </span>
                ))}
            </div>
        </div>

        {/* Terminal output */}
        <div className="mt-2.5 bg-black/60 p-2 rounded border border-zinc-800 text-[10px] text-emerald-400 flex items-center justify-between">
            <span className="truncate">➜ portfolio git:(main) uvicorn main:app --reload --port 8000</span>
            <span className="text-zinc-500 text-[9px] shrink-0 font-sans">200 OK (84ms)</span>
        </div>
    </div>
);

{/* Power BI Dashboard Interactive Representation */}
const PowerBiDiagram = () => (
    <div className="mt-4 border-2 border-black bg-slate-900 rounded-xl p-3.5 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-sans text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-400 text-black font-bold flex items-center justify-center text-[10px] rounded">BI</div>
                <span className="text-[10px] text-amber-300 font-bold tracking-wider uppercase">HeproAI // Student Wellness & Risk Analytics Dashboard</span>
            </div>
            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">POWER BI REPORT</span>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-slate-800/90 p-2 rounded-lg border border-slate-700 text-center">
                <div className="text-[9px] text-slate-400 uppercase font-bold">Total Profiles</div>
                <div className="text-base font-extrabold text-amber-400">200+</div>
                <div className="text-[8px] text-emerald-400">↑ 12% Cohort Growth</div>
            </div>
            <div className="bg-slate-800/90 p-2 rounded-lg border border-slate-700 text-center">
                <div className="text-[9px] text-slate-400 uppercase font-bold">Inference Speed</div>
                <div className="text-base font-extrabold text-cyan-400">&lt; 100ms</div>
                <div className="text-[8px] text-slate-400">Real-time K-Means</div>
            </div>
            <div className="bg-slate-800/90 p-2 rounded-lg border border-slate-700 text-center">
                <div className="text-[9px] text-slate-400 uppercase font-bold">Risk Model Acc.</div>
                <div className="text-base font-extrabold text-emerald-400">94.2%</div>
                <div className="text-[8px] text-emerald-400">Validated Dataset</div>
            </div>
        </div>

        {/* Charts Representation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
            {/* Cohort Performance Bar Chart */}
            <div className="bg-slate-800/70 p-2.5 rounded-lg border border-slate-700">
                <div className="text-[10px] font-bold text-slate-300 mb-2 flex justify-between">
                    <span>Academic vs Wellness Score</span>
                    <span className="text-[9px] text-amber-400 font-mono">Cohort Clusters</span>
                </div>
                <div className="space-y-2">
                    <div>
                        <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                            <span>High Performers (Cluster 1)</span>
                            <span>92%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full w-[92%]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                            <span>Balanced Learners (Cluster 2)</span>
                            <span>78%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-full rounded-full w-[78%]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                            <span>Intervention Needed (Cluster 3)</span>
                            <span>41%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full w-[41%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Indicator Breakdown */}
            <div className="bg-slate-800/70 p-2.5 rounded-lg border border-slate-700 flex flex-col justify-between">
                <div className="text-[10px] font-bold text-slate-300 mb-1 flex justify-between">
                    <span>Behavioral Risk Distribution</span>
                    <span className="text-[9px] text-emerald-400 font-mono">K-Means Output</span>
                </div>
                <div className="flex items-center justify-around my-1">
                    <div className="text-center">
                        <div className="w-10 h-10 rounded-full border-4 border-emerald-400 flex items-center justify-center font-bold text-xs text-emerald-400">
                            65%
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1 block">Low Risk</span>
                    </div>
                    <div className="text-center">
                        <div className="w-10 h-10 rounded-full border-4 border-amber-400 flex items-center justify-center font-bold text-xs text-amber-400">
                            25%
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1 block">Moderate</span>
                    </div>
                    <div className="text-center">
                        <div className="w-10 h-10 rounded-full border-4 border-rose-500 flex items-center justify-center font-bold text-xs text-rose-400">
                            10%
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1 block">Action Req.</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Live Automated Intervention Alert Footer */}
        <div className="bg-slate-800/90 p-2 rounded border border-slate-700 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>Automated Trigger: 14 Mentor Notifications Dispatched</span>
            </div>
            <span className="text-slate-500 text-[9px]">HeproAI Analytics Engine v2.4</span>
        </div>
    </div>
);

const Skills = () => {
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false);
            }
        };
        if (isModalOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isModalOpen]);

    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0 h-full" id="skills">
            <div className="w-full h-full">
                <div className="bg-retro-green bento-card rounded-3xl p-6 sm:p-8 relative overflow-hidden retro-grain border-4 border-black/10 h-full flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start gap-3 mb-6">
                            <div>
                                <div className="flex items-center gap-2 text-zinc-800/70 font-pixel text-xs uppercase tracking-widest mb-1">
                                    <span>02 // CAPABILITIES & STACK</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tighter text-retro-charcoal">
                                    Technical Stack
                                </h2>
                            </div>
                            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <span className="material-symbols-outlined text-xl text-retro-charcoal">terminal</span>
                            </div>
                        </div>

                        {/* Grouped Skills by Category */}
                        <div className="space-y-4">
                            {portfolioData.skills.map((skillCategory, idx) => {
                                const items = skillCategory.items.split(', ');

                                return (
                                    <div key={idx} className="bg-white/80 border-2 border-black p-3.5 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
                                        <h3 className="font-pixel text-xs uppercase tracking-wider text-zinc-600 mb-2.5 flex items-center justify-between">
                                            <span>{skillCategory.category}</span>
                                            <span className="text-[9px] bg-black/10 text-zinc-700 px-1.5 py-0.5 rounded font-mono font-bold">
                                                {items.length}
                                            </span>
                                        </h3>

                                        <div className="flex flex-wrap gap-2">
                                            {items.map((skill, i) => {
                                                const isTop = TOP_SKILLS.has(skill);

                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => {
                                                            setSelectedSkill(skill);
                                                            setIsModalOpen(true);
                                                        }}
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-body font-bold transition-all cursor-pointer ${
                                                            isTop
                                                                ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] hover:bg-retro-yellow hover:text-black'
                                                                : 'bg-zinc-100 text-zinc-800 border-black/30 hover:border-black hover:bg-zinc-200'
                                                        }`}
                                                        title={`Inspect ${skill}`}
                                                    >
                                                        <SkillIcon skill={skill} isTop={isTop} />
                                                        <span>{skill}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-[10px] font-pixel text-retro-charcoal/70 uppercase">
                        <span>Click any skill to view project usage & representations</span>
                        <span>Categorized Stack</span>
                    </div>
                </div>
            </div>

            {/* Skill Inspector Modal */}
            <AnimatePresence>
                {isModalOpen && selectedSkill && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-charcoal/80 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className={`bg-retro-white border-4 border-black p-0 w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative flex flex-col overflow-hidden rounded-2xl max-h-[90vh] ${
                                selectedSkill === 'VS Code' || selectedSkill === 'Power BI' ? 'max-w-xl' : 'max-w-md'
                            }`}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.96, y: 14, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.98, y: 8, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {/* Header */}
                            <div className="bg-retro-charcoal text-white p-3 flex justify-between items-center gap-2 border-b-4 border-black shrink-0">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="material-symbols-outlined text-sm">terminal</span>
                                    <span className="font-pixel text-xs tracking-wider truncate uppercase">SKILL_INSPECTOR://{selectedSkill.toUpperCase().replace(/\s+/g, "_")}</span>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="hover:bg-red-500 p-1 transition-colors flex items-center justify-center cursor-pointer rounded-xs"
                                    aria-label="Close modal"
                                >
                                    <span className="material-symbols-outlined text-sm block">close</span>
                                </button>
                            </div>

                            {/* Body content */}
                            <div className="p-5 bg-retro-cream overflow-y-auto font-body">
                                <div className="border-3 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-retro-charcoal border-2 border-black p-2 flex items-center justify-center shrink-0 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <SkillModalIcon skill={selectedSkill} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-display text-xl text-retro-charcoal leading-none tracking-tight uppercase truncate">
                                                {selectedSkill}
                                            </h3>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                <p className="text-[9px] font-pixel text-zinc-500 tracking-wider uppercase">ACTIVE IN PRODUCTION</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-0.5 border-t border-dashed border-black/15 my-0.5" />

                                    <div className="text-zinc-700 font-body text-sm leading-relaxed text-left">
                                        {skillDetails[selectedSkill] || `${selectedSkill} is part of Anirudh's active software engineering toolchain across AI models, backend services, and user interfaces.`}
                                    </div>
                                </div>

                                {/* Custom Diagrams / Visual Representations for VS Code and Power BI */}
                                {selectedSkill === 'VS Code' && <VsCodeDiagram />}
                                {selectedSkill === 'Power BI' && <PowerBiDiagram />}

                                <div className="mt-5 flex justify-end">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-retro-yellow border-2 border-black font-pixel text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all text-black cursor-pointer rounded-lg font-bold"
                                    >
                                        Close Inspector
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Skills;
