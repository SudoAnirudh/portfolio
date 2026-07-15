"use client";
import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

// ⚡ Bolt: Hoisted static arrays and large configuration objects outside of the component.
// This optimization eliminates redundant array allocations (flatMap, split) and the creation
// of `skillDetails` and `iconMap` objects on every render cycle.
const skillsList = portfolioData.skills.flatMap(s => s.items.split(', '));

const skillDetails: Record<string, string> = {
    "Python": "Primary language for ML & backend. Developed PashuSwasthya offline DL disease models, engineered Hirenix FastAPI scoring backend, and built Flask-based Intrusion Detection Systems.",
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
    "Power BI": "HeproAI: Built interactive analytical dashboards for student wellness, productivity, and academic metrics.",
    "VS Code": "Primary text editor and workspace environment for Python backend and web projects."
};

const iconMap: Record<string, string> = {
    "Python": "python",
    "JavaScript": "javascript",
    "TypeScript": "typescript",
    "Kotlin": "kotlin",
    "SQL": "sqlite",
    "scikit-learn": "scikitlearn",
    "TensorFlow": "tensorflow",
    "TensorFlow Lite": "tensorflow",
    "LangChain": "langchain",
    "ChromaDB": "chromadb",
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
    "Jetpack Compose": "jetpackcompose",
    "Flutter": "flutter",
    "Git": "git",
    "Docker": "docker",
    "Google Cloud": "googlecloud",
    "Android Studio": "androidstudio",
    "Jupyter": "jupyter",
    "Power BI": "powerbi",
    "VS Code": "visualstudiocode"
};

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
                {/* Software Skills - Green Card */}
                <div className="bg-retro-green bento-card rounded-3xl p-5 sm:p-8 relative overflow-hidden retro-grain h-full">
                    <div className="relative z-20 flex flex-col items-end h-full">
                        <div className="w-full flex justify-between items-start gap-3 mb-8 sm:mb-12">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 border-2 border-black flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-3xl sm:text-4xl text-retro-charcoal">terminal</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display leading-[0.9] text-right uppercase tracking-tighter text-retro-charcoal">
                                Tech<br />Stack
                            </h2>
                        </div>

                        {/* Fake Retro UI for Skills */}
                        <div className="w-full bg-zinc-300 border-4 border-black p-3 sm:p-4 shadow-[6px_6px_0px_#000] sm:shadow-[10px_10px_0px_#000] relative">
                            <div className="bg-blue-900 min-h-[220px] sm:aspect-video border-4 border-zinc-800 p-3 sm:p-4 grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 overflow-y-auto custom-scrollbar content-start relative overflow-hidden">
                                {/* CRT Screen scanlines */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-60"></div>

                                {skillsList.map((skill, i) => {
                                    const slug = iconMap[skill] || skill.toLowerCase().replace(/ /g, "");
                                    const iconUrl = `https://cdn.simpleicons.org/${slug}/white`;

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setSelectedSkill(skill);
                                                setIsModalOpen(true);
                                            }}
                                            className="flex flex-col items-center justify-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-yellow cursor-pointer relative z-20 rounded"
                                            aria-label={`Inspect details for ${skill}`}
                                        >
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-zinc-800 border-2 border-zinc-600 rounded p-1.5 group-hover:scale-110 group-hover:border-retro-yellow group-hover:shadow-[0_0_12px_rgba(253,224,71,0.4)] transition-all cursor-help relative" title={skill}>
                                                <img
                                                    src={iconUrl}
                                                    alt={skill}
                                                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                                    onError={(e) => {
                                                        // Fallback to text if icon fails
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                                <span className="hidden text-[8px] text-white font-bold leading-none">{skill.substring(0, 2)}</span>
                                            </div>
                                            <span className="text-[8px] font-pixel text-zinc-300 uppercase tracking-wider text-center hidden md:block group-hover:text-retro-yellow transition-colors">{skill}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="h-6 mt-2 flex items-center justify-end gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <div className="w-12 h-1 bg-zinc-400"></div>
                            </div>
                        </div>

                        <div className="mt-8 text-right w-full">
                            <p className="text-[10px] font-pixel text-black tracking-widest uppercase">System Operational // Ready</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Refined Retro Skill Modal */}
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
                            className="bg-retro-white border-4 border-black p-0 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative flex flex-col overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.96, y: 14, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.98, y: 8, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {/* Header */}
                            <div className="bg-retro-charcoal text-white p-2 flex justify-between items-center gap-2 border-b-4 border-black">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="material-symbols-outlined text-sm">terminal</span>
                                    <span className="font-pixel text-[10px] sm:text-xs tracking-wider truncate uppercase">SKILL_INSPECTOR://{selectedSkill.toUpperCase().replace(/\s+/g, "_")}</span>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="hover:bg-red-500 p-1 rounded-none transition-colors flex items-center justify-center cursor-pointer"
                                    aria-label="Close modal"
                                >
                                    <span className="material-symbols-outlined text-sm block">close</span>
                                </button>
                            </div>

                            {/* Body content */}
                            <div className="p-4 sm:p-6 bg-retro-cream overflow-y-auto font-body">
                                <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                                    {/* Skill Header */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-retro-charcoal border-2 border-black p-2 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <img
                                                src={`https://cdn.simpleicons.org/${iconMap[selectedSkill] || selectedSkill.toLowerCase().replace(/ /g, "")}/white`}
                                                alt={selectedSkill}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                }}
                                            />
                                            <span className="hidden text-xs text-white font-pixel font-bold">{selectedSkill.substring(0, 2)}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-display text-xl sm:text-2xl text-retro-charcoal leading-none tracking-tight uppercase truncate">
                                                {selectedSkill}
                                            </h3>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                                <p className="text-[9px] font-pixel text-zinc-500 tracking-wider uppercase">OPERATIONAL</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-0.5 border-t-2 border-dashed border-black/15 my-1" />

                                    {/* Skill Description */}
                                    <div className="text-zinc-700 font-body text-sm leading-relaxed text-left">
                                        {skillDetails[selectedSkill]}
                                    </div>

                                    {/* Footer Info */}
                                    <div className="flex items-center justify-between text-[9px] font-pixel text-zinc-500 uppercase pt-2 border-t border-black/10">
                                        <span>BUILD: STABLE</span>
                                        <span>SLOT: B2</span>
                                    </div>
                                </div>

                                {/* Close Eject Button */}
                                <div className="mt-5 flex justify-end">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-retro-yellow border-2 border-black font-pixel text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black cursor-pointer"
                                    >
                                        Eject
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
