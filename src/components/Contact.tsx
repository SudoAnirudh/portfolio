import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Contact = () => {
    return (
        <section className="py-32 px-8 section-border" id="contact">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-24">
                    <div>
                        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-muted mb-12">Contact / Collaboration</h2>
                        <h3 className="text-5xl md:text-6xl font-light tracking-tighter mb-12 leading-[1.1]">Let&apos;s build something <span className="italic text-accent">meaningful</span> together.</h3>
                        <div className="space-y-4">
                            <p className="text-muted font-light">Based in {portfolioData.personal.location}.</p>
                            <a className="block text-xl font-light border-b border-black inline-block py-1" href={`mailto:${portfolioData.personal.email}`}>{portfolioData.personal.email}</a>
                            <p className="text-muted font-light mt-2">{portfolioData.personal.phone}</p>
                        </div>
                    </div>
                    <div>
                        <form className="space-y-10">
                            <div className="border-b border-gray-200 pb-4">
                                <label className="block text-[11px] uppercase tracking-widest text-muted mb-4 font-semibold">Your Name</label>
                                <input className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 placeholder:text-gray-300 focus:outline-none" placeholder="Jane Doe" type="text" />
                            </div>
                            <div className="border-b border-gray-200 pb-4">
                                <label className="block text-[11px] uppercase tracking-widest text-muted mb-4 font-semibold">Email Address</label>
                                <input className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 placeholder:text-gray-300 focus:outline-none" placeholder="jane@company.com" type="email" />
                            </div>
                            <div className="border-b border-gray-200 pb-4">
                                <label className="block text-[11px] uppercase tracking-widest text-muted mb-4 font-semibold">Message</label>
                                <textarea className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 placeholder:text-gray-300 resize-none focus:outline-none" placeholder="I have an idea..." rows={3}></textarea>
                            </div>
                            <button className="bg-black text-white px-12 py-5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent transition-colors rounded-sm" type="submit">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
