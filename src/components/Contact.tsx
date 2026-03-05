"use client";
import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from '@/app/actions/contact';

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
    const isSaving = status === 'submitting' || status === 'folding' || status === 'sending';

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

        try {
            const result = await submitContactForm(formData);
            
            if (!result.success) {
                throw new Error(result.error || 'Failed to send message');
            }

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
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0 min-h-[520px] sm:min-h-[600px] flex items-center justify-center perspective-[2000px]" id="contact">
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        className="bg-retro-cream bento-card rounded-3xl p-6 sm:p-10 md:p-12 border-4 border-black text-center max-w-2xl w-full"
                        initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }} // Spring-like ease
                        key="success-message"
                    >
                        <motion.div
                            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-100 text-green-600 mb-6 sm:mb-8 border-4 border-black"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <span className="material-symbols-outlined text-5xl">check</span>
                        </motion.div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tighter mb-5 sm:mb-6">Data Saved!</h3>
                        <p className="font-mono text-base sm:text-lg md:text-xl text-zinc-600 mb-8 sm:mb-10 leading-relaxed">
                            Your message has been securely written to disk. I&apos;ll get back to you faster than a dial-up connection!
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="bg-black text-white px-6 sm:px-10 py-4 sm:py-5 text-xs sm:text-sm font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase hover:bg-accent hover:scale-105 transition-all rounded-sm border-2 border-transparent hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                        >
                            Write Another File
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
                        {/* Floppy Disk Animation (Visible only during saving) */}
                        <AnimatePresence>
                            {(status === 'folding' || status === 'sending') && (
                                <motion.div
                                    className="absolute inset-[-4px] bg-zinc-900 border-4 border-black z-50 rounded-3xl overflow-hidden flex items-center justify-center p-4 sm:p-8"
                                    initial={{ y: "-100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "100%" }}
                                    transition={{ duration: 0.7, ease: [0.32, 0, 0.67, 0] }}
                                >
                                    <div className="absolute inset-0 pattern-dots border-4 border-black opacity-10 pointer-events-none"></div>

                                    {/* Floppy Disk Drive Insert */}
                                    <div className="w-full max-w-[280px] sm:max-w-xs aspect-square overflow-hidden bg-blue-600 border-[6px] sm:border-8 border-t-0 border-black rounded-b-xl sm:rounded-b-3xl flex flex-col items-center justify-between p-2 pt-0 sm:p-4 sm:pt-0 relative mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                        
                                        {/* Top metallic slider part */}
                                        <div className="w-[70%] h-[35%] bg-zinc-300 border-x-[6px] sm:border-x-8 border-b-[6px] sm:border-b-8 border-black rounded-b-lg flex justify-end items-center px-2 sm:px-4 shadow-inner">
                                            <div className="w-[30%] h-[60%] bg-zinc-800 rounded-sm shadow-inner relative left-[-10%] sm:left-[-20%]"></div>
                                        </div>

                                        {/* Bottom Label area */}
                                        <div className="w-[90%] h-[50%] bg-zinc-50 border-[6px] sm:border-8 border-b-0 border-black rounded-t-xl p-3 sm:p-5 flex flex-col justify-between shadow-inner relative top-[10px] sm:top-[20px]">
                                            <div className="w-full flex justify-between items-start border-b-4 border-black pb-2 sm:pb-3">
                                                <div className="flex flex-col">
                                                    <span className="font-pixel text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-black">A:\CAPACITY 1.44MB</span>
                                                    <span className="font-pixel text-[7px] sm:text-[8px] uppercase text-zinc-500 mt-1">HD DS DISKETTE</span>
                                                </div>
                                                <span className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full border-[3px] border-black"></span>
                                            </div>

                                            <div className="space-y-2 w-full mt-2 lg:mt-3">
                                                <div className="w-full h-1 sm:h-2 bg-zinc-200 border border-black/10 rounded-sm"></div>
                                                <div className="w-4/5 h-1 sm:h-2 bg-zinc-200 border border-black/10 rounded-sm"></div>
                                                <div className="w-[90%] h-1 sm:h-2 bg-zinc-200 border border-black/10 rounded-sm"></div>
                                                <div className="w-[85%] h-1 sm:h-2 bg-zinc-200 border border-black/10 rounded-sm hidden sm:block"></div>
                                            </div>

                                            <div className="absolute -top-7 -right-2 sm:-top-8 sm:-right-4 flex items-center justify-center bg-retro-yellow border-4 border-black p-2 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 w-[70px] sm:w-[90px]">
                                                <span className="material-symbols-outlined text-black font-bold animate-spin text-sm sm:text-base mr-1">sync</span>
                                                <span className="font-pixel text-[8px] sm:text-[10px] font-bold uppercase text-black tracking-[0.1em] animate-pulse">SAVING</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
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
                                <div className="bg-zinc-200 p-5 sm:p-8 border-b-4 lg:border-b-0 lg:border-r-4 border-black border-dashed flex flex-col z-0">
                                    <div className="mb-8">
                                        <h4 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined">schedule</span>
                                            Availability
                                        </h4>
                                        <div className="bg-retro-cream border-2 border-black p-3 space-y-2 text-[11px] sm:text-xs font-pixel uppercase tracking-wider">
                                            <div className="flex justify-between gap-2">
                                                <span className="text-zinc-600">Status</span>
                                                <span className="text-retro-charcoal text-right">Open for Internships</span>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                <span className="text-zinc-600">Preferred Role</span>
                                                <span className="text-retro-charcoal text-right">AI/ML Intern</span>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                <span className="text-zinc-600">Timezone</span>
                                                <span className="text-retro-charcoal text-right">IST (UTC+5:30)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined">alternate_email</span>
                                            Connect
                                        </h4>
                                        <div className="flex flex-wrap gap-3 sm:gap-4">
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
                                <div className="bg-retro-white p-5 sm:p-8 relative overflow-hidden flex flex-col justify-center min-h-[420px] sm:min-h-[500px]">
                                    <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
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
                                                className="w-full bg-zinc-50 border-2 border-black p-4 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow resize-none h-40 sm:h-48"
                                                placeholder="TYPE YOUR MESSAGE HERE..."
                                                required
                                            ></textarea>
                                        </div>
                                        <button
                                            className={`w-full sm:w-auto bg-black text-white px-6 sm:px-10 py-4 sm:py-5 text-[10px] sm:text-[11px] font-bold tracking-[0.16em] sm:tracking-[0.2em] uppercase hover:bg-accent transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:outline-none`}
                                            type="submit"
                                            disabled={isSaving}
                                        >
                                            <span className="flex items-center justify-center gap-2 sm:gap-3">
                                                <span className={`material-symbols-outlined text-base ${isSaving ? 'animate-pulse' : ''}`}>save</span>
                                                <span>
                                                    {status === 'error' ? 'Disk Error. Retry.' : isSaving ? 'Writing To Disk...' : 'Save to Disk'}
                                                </span>
                                                {isSaving ? (
                                                    <span className="inline-flex items-end gap-[2px] h-3">
                                                        <span className="w-[3px] h-[4px] bg-retro-green animate-pulse"></span>
                                                        <span className="w-[3px] h-[7px] bg-retro-green animate-pulse [animation-delay:120ms]"></span>
                                                        <span className="w-[3px] h-[10px] bg-retro-green animate-pulse [animation-delay:240ms]"></span>
                                                    </span>
                                                ) : null}
                                            </span>
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
