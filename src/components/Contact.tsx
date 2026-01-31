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
    const [emailError, setEmailError] = React.useState('');

    const disposableDomains = [
        'tempmail.com', 'throwawaymail.com', 'mailinator.com', 'guerrillamail.com', 'yopmail.com',
        'sharklasers.com', 'getnada.com', 'dispostable.com', 'grr.la', 'temp-mail.org'
    ];

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, error: 'Please enter a valid email address.' };
        }

        const domain = email.split('@')[1];
        if (disposableDomains.some(d => domain.includes(d))) {
            return { isValid: false, error: 'Please use a permanent email address (Gmail, Outlook, etc.).' };
        }

        return { isValid: true, error: '' };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'email') {
            setEmailError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validateEmail(formData.email);
        if (!validation.isValid) {
            setEmailError(validation.error);
            return;
        }

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
                        {status === 'success' ? (
                            <div className="h-full flex flex-col justify-center animate-in fade-in duration-500">
                                <div className="mb-8">
                                    <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                                        <span className="material-symbols-outlined text-3xl">check</span>
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">Message sent successfully!</h3>
                                    <p className="text-muted text-lg font-light leading-relaxed">
                                        Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="bg-black text-white px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent transition-colors rounded-sm w-max"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-10" onSubmit={handleSubmit}>
                                <div className="border-b border-gray-200 pb-4">
                                    <label htmlFor="name" className="block text-[11px] uppercase tracking-widest text-muted mb-4 font-semibold">Your Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-none p-0 text-xl font-light placeholder:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                                        placeholder="Jane Doe"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="border-b border-gray-200 pb-4">
                                    <label htmlFor="email" className="block text-[11px] uppercase tracking-widest text-muted mb-4 font-semibold">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full bg-transparent border-none p-0 text-xl font-light placeholder:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${emailError ? 'text-red-500' : ''}`}
                                        placeholder="jane@company.com"
                                        type="email"
                                        required
                                    />
                                    {emailError && <p className="text-red-500 text-xs mt-2">{emailError}</p>}
                                </div>
                                <div className="border-b border-gray-200 pb-4">
                                    <label htmlFor="message" className="block text-[11px] uppercase tracking-widest text-muted mb-4 font-semibold">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-none p-0 text-xl font-light placeholder:text-gray-300 resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                                        placeholder="I have an idea..."
                                        rows={3}
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    className={`bg-black text-white px-12 py-5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                                    type="submit"
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? 'Sending...' : status === 'error' ? 'Error. Try Again.' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
