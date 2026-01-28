import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Certifications = () => {
    return (
        <section className="py-32 px-8 section-border">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted mb-20 text-center">Certifications &amp; Achievements</h2>
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-8">Certifications</h3>
                        <ul className="space-y-4 text-muted font-light">
                            {portfolioData.certifications.map((cert, index) => (
                                <li key={index} className="flex items-start"><span className="mr-3 text-accent">•</span> {cert}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-8">Achievements</h3>
                        <ul className="space-y-4 text-muted font-light">
                            {portfolioData.achievements.map((achm, index) => (
                                <li key={index} className="flex items-start"><span className="mr-3 text-accent">•</span> {achm}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
