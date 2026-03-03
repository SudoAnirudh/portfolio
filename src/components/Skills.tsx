"use client";
import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Skills = () => {
    // Helper to extract items string into array
    const getItems = (category: string) => {
        const skillFunc = portfolioData.skills.find(s => s.category === category);
        return skillFunc ? skillFunc.items.split(', ') : [];
    };

    const languages = getItems("Languages");
    const frameworks = getItems("Frameworks & Libraries");
    const tools = getItems("Tools & Platforms");
    const softSkills = getItems("Soft Skills");

    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0" id="skills">
            <div className="w-full">
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
                            <div className="bg-blue-900 min-h-[220px] sm:aspect-video border-4 border-zinc-800 p-3 sm:p-4 grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 overflow-y-auto custom-scrollbar content-start">
                                {[...languages, ...frameworks, ...tools].map((skill, i) => {
                                    // Simple mapping for icons
                                    const iconMap: { [key: string]: string } = {
                                        "Python": "python",
                                        "C": "c",
                                        "Java": "java",
                                        "Dart": "dart",
                                        "PHP": "php",
                                        "Django": "django",
                                        "Flask": "flask",
                                        "NumPy": "numpy",
                                        "Pandas": "pandas",
                                        "Matplotlib": "matplotlib", // might fallback text
                                        "Seaborn": "python", // fallback
                                        "scikit-learn": "scikitlearn",
                                        "Flutter": "flutter",
                                        "Git": "git",
                                        "VS Code": "visualstudiocode",
                                        "Jupyter": "jupyter",
                                        "Anaconda": "anaconda",
                                        "Excel": "microsoftexcel",
                                        "Power BI": "powerbi",
                                        "Tableau": "tableau",
                                        "SQL": "sqlite",
                                        "MongoDB": "mongodb"
                                    };

                                    const slug = iconMap[skill] || skill.toLowerCase().replace(/ /g, "");
                                    const iconUrl = `https://cdn.simpleicons.org/${slug}/white`;

                                    return (
                                        <div key={i} className="flex flex-col items-center justify-center gap-1 group">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-zinc-800 border-2 border-zinc-600 rounded p-1 group-hover:scale-110 transition-transform cursor-help relative" title={skill}>
                                                <img
                                                    src={iconUrl}
                                                    alt={skill}
                                                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100"
                                                    onError={(e) => {
                                                        // Fallback to text if icon fails
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                                <span className="hidden text-[8px] text-white font-bold leading-none">{skill.substring(0, 2)}</span>
                                            </div>
                                            <span className="text-[8px] font-pixel text-zinc-300 uppercase tracking-wider text-center hidden md:block">{skill}</span>
                                        </div>
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
        </section>
    );
};

export default Skills;
