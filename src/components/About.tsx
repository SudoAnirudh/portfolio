import React from 'react';
import { portfolioData } from '@/data/portfolio';

const About = () => {
    return (
        <section className="py-32 px-8 section-border" id="about">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-20 items-start">
                    <div className="lg:col-span-5">
                        <div className="aspect-[4/5] bg-gray-50 border border-gray-100 grayscale hover:grayscale-0 transition-all duration-700">
                            <img alt="Portrait" className="w-full h-full object-cover"
                                src={portfolioData.about.image} />
                        </div>
                    </div>
                    <div className="lg:col-span-7 flex flex-col justify-center h-full">
                        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted mb-8">{portfolioData.about.title}</h2>
                        <div className="bg-white thin-border p-8 rounded-sm">
                            <div className="flex items-center space-x-1.5 mb-8 opacity-40">
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                            </div>
                            <pre className="font-mono text-sm leading-relaxed text-black/80">
                                {`class `}<span className="text-accent">{portfolioData.about.pythonClass.className}</span>{`:
    def __init__(self):
        self.role = ${portfolioData.about.pythonClass.attributes[0].value}
        self.stack = ${portfolioData.about.pythonClass.attributes[1].value}
        self.location = ${portfolioData.about.pythonClass.attributes[2].value}
        self.email = ${portfolioData.about.pythonClass.attributes[3].value}
    
    def goal(self):
        return ${portfolioData.about.pythonClass.methods[0].return}`}
                            </pre>
                        </div>
                        <div className="mt-12 text-xl text-muted leading-relaxed font-light">
                            {portfolioData.about.bio}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
