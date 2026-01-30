"use client";
import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const GOOGLE_FORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdYW6y405M2Jsc_MnYhlQ-sGDVZFwSSbc9EBuW0B2IZRRGKog/formResponse';

        // Form entries
        const formBody = new FormData();
        formBody.append('entry.2005620554', formData.name);
        formBody.append('entry.1045781291', formData.email);
        formBody.append('entry.1495416884', formData.message);

        try {
            await fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formBody
            });

            // Since we use no-cors, we assume success if no network error thrown
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

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
                        <form className="space-y-10" onSubmit={handleSubmit}>
                            <div className="border-b border-gray-200 pb-4">
                                <label className="block text-[11px] uppercase tracking-widest text-muted mb-4 font-semibold">Your Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 placeholder:text-gray-300 focus:outline-none"
                                    placeholder="Jane Doe"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="border-b border-gray-200 pb-4">
                                <label className="block text-[11px] uppercase tracking-widest text-muted mb-4 font-semibold">Email Address</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 placeholder:text-gray-300 focus:outline-none"
                                    placeholder="jane@company.com"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="border-b border-gray-200 pb-4">
                                <label className="block text-[11px] uppercase tracking-widest text-muted mb-4 font-semibold">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 placeholder:text-gray-300 resize-none focus:outline-none"
                                    placeholder="I have an idea..."
                                    rows={3}
                                    required
                                ></textarea>
                            </div>
                            <button
                                className={`bg-black text-white px-12 py-5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                                type="submit"
                                disabled={status === 'submitting' || status === 'success'}
                            >
                                {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Error. Try Again.' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
