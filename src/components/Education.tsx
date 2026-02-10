import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Education = () => {
    return (
        <section className="max-w-7xl mx-auto mb-6 px-4 md:px-0" id="education">
            <div className="bg-retro-yellow bento-card rounded-3xl p-8 md:p-12 relative overflow-hidden retro-grain border-4 border-black/10">
                <div className="relative z-20 w-full">
                    <h2 className="text-7xl md:text-9xl font-display tracking-tighter uppercase mb-12 text-retro-charcoal opacity-90 text-center lg:text-left">Education</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {portfolioData.education.map((edu, index) => (
                            <div key={index} className="flex flex-col justify-between border-4 border-black bg-white/20 p-6 rounded-xl hover:scale-105 transition-transform">
                                <div>
                                    <h3 className="text-2xl font-display tracking-tight text-retro-charcoal leading-none mb-2">{edu.institution}</h3>
                                    <p className="text-lg font-bold font-body text-retro-charcoal/80 mb-4">{edu.degree}</p>
                                </div>
                                <div className="text-xl font-bold font-body text-retro-charcoal border-t-2 border-black pt-2">{edu.period}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decorative Pixel Art Image */}
                <div className="absolute right-0 top-0 w-64 opacity-20 pointer-events-none">
                    <img
                        alt="Pixel Art PC"
                        className="w-full grayscale brightness-110 drop-shadow-2xl rendering-pixelated"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb-RryyFtosf3IpAzU_ANNGpKfwtw2iqY6XyyAEe2LW7cOm9f71KXye2Mv-l0scjlMxMj9OKPOEKpvnlNdsUvoeP-vtHKJpUdr7GqKlnfHKdO7DCNeXz2RtA5T_IpRZkIR1al5HRPywWX_7fXXekB7WyDsnCwKdRpx75u8FGk9D35aemXZpoV7tcEyPJdoWWrjaT4f_92uigb3A3qpiZwcDFlrCu6N-U1Ysice7fWcIO_rVTWBdRY3L1pwf-Sq5aJBvEnI2jpE-JzQ"
                    />
                </div>
            </div>
        </section>
    );
};

export default Education;
