import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Experience = () => {
    return (
        <section className="py-32 px-8 section-border" id="experience">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted mb-20">Background / Experience</h2>
                <div className="space-y-16">
                    {portfolioData.experience.map((exp, index) => (
                        <div key={index} className="grid md:grid-cols-12 gap-8 border-b border-gray-100 pb-12">
                            <div className="md:col-span-3 text-xs tracking-widest uppercase text-muted font-semibold">{exp.period}</div>
                            <div className="md:col-span-9">
                                <h3 className="text-2xl font-light mb-4 leading-tight">{exp.role} / {exp.company}</h3>
                                <p className="text-muted leading-relaxed font-light">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
