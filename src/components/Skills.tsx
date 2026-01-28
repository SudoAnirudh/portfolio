import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Skills = () => {
    return (
        <section className="py-32 px-8 section-border">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted mb-20 text-center">Technical Skills</h2>
                <div className="grid md:grid-cols-2 gap-16">
                    <div className="space-y-12">
                        {portfolioData.skills.slice(0, 2).map((skill, index) => (
                            <div key={index}>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-6">{skill.category}</h3>
                                <p className="text-muted font-light leading-relaxed">{skill.items}</p>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-12">
                        {portfolioData.skills.slice(2, 4).map((skill, index) => (
                            <div key={index}>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-6">{skill.category}</h3>
                                <p className="text-muted font-light leading-relaxed">{skill.items}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
