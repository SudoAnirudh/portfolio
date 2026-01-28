import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Education = () => {
    return (
        <section className="py-32 px-8 section-border" id="education">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted mb-20 text-center">Education</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {portfolioData.education.map((edu, index) => (
                        <div key={index} className={`bg-white p-8 thin-border rounded-sm hover:shadow-lg transition-shadow duration-300 transform ${index % 2 === 0 ? 'hover:-rotate-1' : 'hover:rotate-1'}`}>
                            <div className="text-[10px] font-bold tracking-widest uppercase text-accent mb-4">{edu.period}</div>
                            <h3 className="text-xl font-medium mb-2">{edu.degree}</h3>
                            <div className="text-muted font-light mb-4">{edu.institution}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
