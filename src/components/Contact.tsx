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
    const nameInputRef = React.useRef<HTMLInputElement>(null);
    const [shouldFocus, setShouldFocus] = React.useState(false);

    const disposableDomains = [
        'tempmail.com', 'throwawaymail.com', 'mailinator.com', 'guerrillamail.com', 'yopmail.com',
        'sharklasers.com', 'getnada.com', 'dispostable.com', 'grr.la', 'temp-mail.org'
    ];

    React.useEffect(() => {
        if (status === 'idle' && shouldFocus) {
            const timer = setTimeout(() => {
                nameInputRef.current?.focus();
                setShouldFocus(false);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [status, shouldFocus]);

    const handleReset = () => {
        setShouldFocus(true);
        setStatus('idle');
    };

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
        <section className="max-w-7xl mx-auto mb-6 px-4 md:px-0" id="contact">
            <div className="bg-retro-cream bento-card rounded-3xl p-0 relative overflow-hidden border-4 border-black">
                {/* Mail Window Header */}
                <div className="bg-retro-charcoal p-3 flex items-center justify-between border-b-4 border-black">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-retro-white text-xl">mail</span>
                        <span className="font-pixel text-retro-white text-sm uppercase">COMPOSE MESSAGE</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500 border border-white/20"></div>
                        <div className="w-4 h-4 rounded-full bg-yellow-400 border border-white/20"></div>
                        <div className="w-4 h-4 rounded-full bg-green-500 border border-white/20"></div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2">
                    {/* Information Sidebar */}
                    <div className="bg-zinc-200 p-8 border-r-4 border-black border-dashed flex flex-col justify-between">
                        <div>
                            <div className="mb-8">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1 block">FROM:</label>
                                <div className="font-display text-2xl uppercase">{portfolioData.personal.name}</div>
                                <div className="text-sm font-mono text-zinc-500">{"<"}{portfolioData.personal.email}{">"}</div>
                            </div>

                            <div className="mb-8">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1 block">TO:</label>
                                <div className="font-display text-2xl uppercase">FUTURE EMPLOYER</div>
                                <div className="text-sm font-mono text-zinc-500">{"<"}hiring@manager.com{">"}</div>
                            </div>

                            <div className="mb-8">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1 block">SUBJECT:</label>
                                <div className="font-display text-2xl uppercase">OPPORTUNITY</div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t-2 border-black/10">
                            <h4 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined">alternate_email</span>
                                Connect
                            </h4>
                            <div className="flex gap-4">
                                <a href={portfolioData.personal.social.github} className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">code</span>
                                </a>
                                <a href={portfolioData.personal.social.linkedin} className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">work</span>
                                </a>
                                <a href={`mailto:${portfolioData.personal.email}`} className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">send</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-retro-white p-8">
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
                                <h3 className="text-3xl font-display uppercase tracking-tight mb-2">Sent!</h3>
                                <p className="font-mono text-zinc-500 mb-8">Your message has been dispatched to the server.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="bg-black text-white px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent transition-colors rounded-sm w-max"
                                >
                                    Write New
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        id="name"
                                        ref={nameInputRef}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b-2 border-black/20 p-3 font-body focus:outline-none focus:border-black transition-colors placeholder-zinc-400"
                                        placeholder="ENTER NAME..."
                                        type="text"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full bg-transparent border-b-2 border-black/20 p-3 font-body focus:outline-none focus:border-black transition-colors placeholder-zinc-400 ${emailError ? 'border-red-500' : ''}`}
                                        placeholder="ENTER EMAIL..."
                                        type="email"
                                        required
                                    />
                                    {emailError && <p className="text-red-500 text-xs mt-1 font-bold font-mono">{emailError}</p>}
                                </div>
                                <div>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-50 border-2 border-black p-4 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow resize-none h-48"
                                        placeholder="TYPE YOUR MESSAGE HERE..."
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    className={`bg-black text-white px-12 py-5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:outline-none`}
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
