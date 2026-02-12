"use client";
import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = React.useState<'idle' | 'submitting' | 'folding' | 'sending' | 'success' | 'error'>('idle');
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

            // Start animation sequence
            setStatus('folding');

            setTimeout(() => {
                setStatus('sending');
                setTimeout(() => {
                    setStatus('success');
                    setFormData({ name: '', email: '', message: '' });
                }, 1000); // Increased wait for fly away
            }, 1400); // Increased wait for fold

        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section className="max-w-7xl mx-auto mb-6 px-4 md:px-0 min-h-[600px] flex items-center justify-center perspective-[2000px]" id="contact">
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        className="bg-retro-cream bento-card rounded-3xl p-12 border-4 border-black text-center max-w-2xl w-full"
                        initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }} // Spring-like ease
                        key="success-message"
                    >
                        <motion.div
                            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-8 border-4 border-black"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <span className="material-symbols-outlined text-5xl">check</span>
                        </motion.div>
                        <h3 className="text-4xl md:text-5xl font-display uppercase tracking-tighter mb-6">Message Sent!</h3>
                        <p className="font-mono text-xl text-zinc-600 mb-10 leading-relaxed">
                            Your letter is on its way. I&apos;ll get back to you faster than a dial-up connection!
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="bg-black text-white px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase hover:bg-accent hover:scale-105 transition-all rounded-sm border-2 border-transparent hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                        >
                            Write Another
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        className="w-full relative z-10"
                        key="contact-form"
                        initial={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotateZ: 0 }}
                        exit={{
                            x: 800,
                            y: -600,
                            scale: 0.4,
                            opacity: 0,
                            rotateX: 10,
                            rotateZ: 15,
                            transition: {
                                duration: 0.8,
                                ease: [0.32, 0, 0.67, 0] // easeInCubic for acceleration
                            }
                        }}
                    >
                        {/* Envelope Flaps (Visible only during folding) */}
                        <AnimatePresence>
                            {(status === 'folding' || status === 'sending') && (
                                <>
                                    {/* Top Flap */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-full bg-zinc-200 z-50 origin-top border-b-4 border-black shadow-lg"
                                        style={{
                                            height: '55%',
                                            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                                            backfaceVisibility: 'hidden'
                                        }}
                                        initial={{ rotateX: -180, opacity: 0 }}
                                        animate={{ rotateX: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }} // Bezier for natural fold
                                    />
                                    {/* Bottom Flap */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 w-full bg-zinc-100 z-50 origin-bottom border-t-4 border-black shadow-lg"
                                        style={{
                                            height: '50%',
                                        }}
                                        initial={{ rotateX: 180, opacity: 0 }}
                                        animate={{ rotateX: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
                                    />
                                    {/* Left Side Cosmetic */}
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-zinc-300 z-40"
                                        style={{ width: '50%', clipPath: 'polygon(0% 0%, 0% 100%, 100% 50%)' }}
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                    {/* Right Side Cosmetic */}
                                    <motion.div
                                        className="absolute top-0 right-0 h-full bg-zinc-300 z-40"
                                        style={{ width: '50%', clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)' }}
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </>
                            )}
                        </AnimatePresence>

                        <motion.div
                            className="bg-retro-cream bento-card rounded-3xl p-0 relative overflow-hidden border-4 border-black"
                            animate={{
                                scale: status === 'folding' || status === 'sending' ? 0.95 : 1,
                                rotateX: status === 'folding' ? 5 : 0, // Slight tilt when folding
                                transition: { duration: 0.5 }
                            }}
                        >
                            {/* Mail Window Header */}
                            <div className="bg-retro-charcoal p-3 flex items-center justify-between border-b-4 border-black z-10 relative">
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
                                <div className="bg-zinc-200 p-8 border-r-4 border-black border-dashed flex flex-col justify-between z-0">
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
                                <div className="bg-retro-white p-8 relative overflow-hidden flex flex-col justify-center min-h-[500px]">
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
                                            disabled={status === 'submitting' || status === 'folding' || status === 'sending'}
                                        >
                                            {status === 'submitting' ? 'Sending...' : status === 'folding' ? 'Sealing...' : status === 'sending' ? 'Sending...' : status === 'error' ? 'Error. Try Again.' : 'Send Message'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Contact;
