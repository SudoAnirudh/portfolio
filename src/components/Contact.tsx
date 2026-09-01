"use client";
import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '@/data/portfolio';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { submitContactForm } from '@/app/actions/contact';

const SUBJECT_OPTIONS = [
    {
        id: 'internship',
        label: 'Job / Internship',
        subject: 'Internship / Full-time Opportunity',
        starter: "Hi Anirudh,\n\nI am reaching out regarding a Job / Internship opportunity at [Company Name] for the role of [Position]. We were impressed by your profile and would love to connect!\n\nBest regards,"
    },
    {
        id: 'collaboration',
        label: 'Collaboration',
        subject: 'Project Collaboration',
        starter: "Hi Anirudh,\n\nI saw your work and would love to collaborate with you on [Project Name / Topic]. Let's discuss how we can work together!\n\nBest regards,"
    },
    {
        id: 'freelance',
        label: 'Freelance',
        subject: 'Freelance / Consulting Project',
        starter: "Hi Anirudh,\n\nI have a project in mind involving [Brief Description] and would like to inquire about your availability and rates.\n\nBest regards,"
    },
    {
        id: 'inquiry',
        label: 'General Inquiry',
        subject: 'General Inquiry',
        starter: "Hi Anirudh,\n\nI wanted to get in touch with you regarding...\n\nBest regards,"
    },
    {
        id: 'other',
        label: 'Other',
        subject: 'Other Inquiry',
        starter: "Hi Anirudh,\n\n"
    }
];

const Contact = () => {
    const prefersReducedMotion = useReducedMotion();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'folding' | 'sending' | 'success' | 'error'>('idle');
    const [emailError, setEmailError] = useState('');
    const [toastData, setToastData] = useState<{ title: string; text: string } | null>(null);
    const [hasSubmittedInSession, setHasSubmittedInSession] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [shouldFocus, setShouldFocus] = useState(false);
    const isSaving = status === 'submitting' || status === 'folding' || status === 'sending';

    const handleCopy = (text: string, label: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }
        setToastData({ title: `${label} COPIED TO CLIPBOARD!`, text });
        setTimeout(() => setToastData(null), 2500);
    };

    const disposableDomains = [
        'tempmail.com', 'throwawaymail.com', 'mailinator.com', 'guerrillamail.com', 'yopmail.com',
        'sharklasers.com', 'getnada.com', 'dispostable.com', 'grr.la', 'temp-mail.org'
    ];

    useEffect(() => {
        const handleCopyEmailEvent = () => {
            handleCopy(portfolioData.personal.email, "EMAIL");
        };
        window.addEventListener('copy-email', handleCopyEmailEvent);
        return () => window.removeEventListener('copy-email', handleCopyEmailEvent);
    }, []);

    useEffect(() => {
        if (status === 'idle' && shouldFocus) {
            const timer = setTimeout(() => {
                nameInputRef.current?.focus();
                setShouldFocus(false);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [status, shouldFocus]);

    const handleReset = () => {
        setStatus('idle');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSelectedSubjectId('');
        setShouldFocus(true);
    };

    const handleSubjectSelect = (option: typeof SUBJECT_OPTIONS[number]) => {
        setSelectedSubjectId(option.id);
        setFormData(prev => {
            const isStarterOrEmpty = prev.message === '' ||
                SUBJECT_OPTIONS.some(opt => opt.starter === prev.message) ||
                prev.message.startsWith('Hi Anirudh,');

            return {
                ...prev,
                subject: option.subject,
                message: isStarterOrEmpty ? option.starter : prev.message
            };
        });
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

            // Fast path for reduced motion or subsequent submissions in the same session
            if (prefersReducedMotion || hasSubmittedInSession) {
                setStatus('success');
                setHasSubmittedInSession(true);
                return;
            }

            // First submission per session: Ceremonial 3D origami sequence
            setHasSubmittedInSession(true);
            setStatus('folding');

            setTimeout(() => {
                setStatus('sending');
                setTimeout(() => {
                    setStatus('success');
                }, 800); // Scaled flight duration
            }, 1200); // Scaled fold duration

        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0 min-h-[520px] sm:min-h-[600px] flex items-center justify-center perspective-[2000px]" id="contact">
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        className="bg-retro-cream bento-card rounded-3xl p-6 sm:p-10 md:p-12 border-4 border-black text-center max-w-2xl w-full relative overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                        key="success-message"
                    >
                        {/* Air Mail Diagonal Stripes Border at Top */}
                        <div className="absolute top-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_15px,#ffffff_15px,#ffffff_30px,#3b82f6_30px,#3b82f6_45px,#ffffff_45px,#ffffff_60px)] border-b-2 border-black"></div>

                        <motion.div
                            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-700 mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 15 }}
                        >
                            <span className="material-symbols-outlined text-4xl">mark_email_read</span>
                        </motion.div>
                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight mb-3">Message Sent — Airmail Transmitted!</h3>
                        <p className="font-body font-medium text-sm sm:text-base md:text-lg text-zinc-700 mb-6 max-w-xl mx-auto leading-relaxed">
                            Your message has landed in my inbox. I reply to all engineering and recruitment inquiries within <strong className="text-black">24 hours</strong>.
                        </p>
                        <button
                            onClick={handleReset}
                            className="bg-black text-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-body font-bold tracking-wider uppercase hover:bg-retro-yellow hover:text-black transition-all rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 mx-auto cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-base">drafts</span>
                            <span>Send Another Message</span>
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        className="w-full relative z-10"
                        key="contact-form"
                        initial={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotateZ: 0 }}
                        exit={{
                            x: typeof window !== 'undefined' && window.innerWidth < 640 ? 280 : 650,
                            y: typeof window !== 'undefined' && window.innerWidth < 640 ? -350 : -550,
                            scale: 0.35,
                            opacity: 0,
                            rotateX: 10,
                            rotateZ: 15,
                            transition: {
                                duration: 0.7,
                                ease: [0.32, 0, 0.67, 0]
                            }
                        }}
                    >
                        {/* Paper Airplane Launch Animation Overlay */}
                        <AnimatePresence>
                            {(status === 'folding' || status === 'sending') && (
                                <motion.div
                                    className="absolute inset-[-4px] bg-retro-charcoal/95 border-4 border-black z-50 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-md"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="absolute inset-0 pattern-dots border-4 border-black opacity-15 pointer-events-none"></div>

                                    <div className="relative flex flex-col items-center justify-center">
                                        {/* Pixel Particle Trail */}
                                        <AnimatePresence>
                                            {status === 'sending' && (
                                                <motion.div 
                                                    className="absolute -bottom-10 -left-14 flex gap-2 pointer-events-none"
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1.2 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    <motion.span 
                                                        animate={{ y: [0, 30, 60], x: [0, -10, -20], opacity: [1, 0.7, 0], scale: [1, 1.8, 2.5] }} 
                                                        transition={{ repeat: Infinity, duration: 0.5, ease: "easeOut" }} 
                                                        className="w-4 h-4 bg-retro-cream border-2 border-black rounded-full block" 
                                                    />
                                                    <motion.span 
                                                        animate={{ y: [0, 35, 70], x: [0, -15, -30], opacity: [1, 0.6, 0], scale: [0.8, 1.5, 2.2] }} 
                                                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.08, ease: "easeOut" }} 
                                                        className="w-5 h-5 bg-retro-yellow border-2 border-black rounded-full block" 
                                                    />
                                                    <motion.span 
                                                        animate={{ y: [0, 40, 80], x: [0, -20, -40], opacity: [1, 0.5, 0], scale: [0.6, 1.3, 2.0] }} 
                                                        transition={{ repeat: Infinity, duration: 0.7, delay: 0.16, ease: "easeOut" }} 
                                                        className="w-4 h-4 bg-red-400 border-2 border-black rounded-full block" 
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* 3D Origami Paper Airplane Folding & Launch Animation */}
                                        <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
                                            {status === 'folding' ? (
                                                <motion.div
                                                    className="w-full h-full flex items-center justify-center"
                                                    initial={{ scale: 0.9, rotateX: 20 }}
                                                    animate={{
                                                        scale: [0.9, 1, 0.95, 1],
                                                        rotateX: [20, 45, 15, 0],
                                                        rotateZ: [0, -10, 5, 0]
                                                    }}
                                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                                >
                                                    <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[8px_8px_0px_rgba(0,0,0,0.8)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        {/* Airmail Stripes near tail edge (fades in as paper folds) */}
                                                        <motion.g
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: [0, 0, 1, 1] }}
                                                            transition={{ duration: 1.5, times: [0, 0.5, 0.8, 1] }}
                                                        >
                                                            <path d="M 30 110 L 48 150 L 58 145 L 40 105 Z" fill="#EF4444" stroke="#000" strokeWidth="2" />
                                                            <path d="M 40 105 L 58 145 L 68 140 L 50 100 Z" fill="#3B82F6" stroke="#000" strokeWidth="2" />
                                                        </motion.g>
                                                        
                                                        {/* Shaded Left Wing Fold */}
                                                        <motion.path 
                                                            animate={{
                                                                d: [
                                                                    "M 30 30 L 30 170 L 170 170 L 170 30 Z", // Step 1: Flat Document Sheet
                                                                    "M 100 25 L 30 100 L 100 170 L 170 30 Z", // Step 2: Top Corners Fold Inward
                                                                    "M 175 40 L 25 105 L 90 140 Z"           // Step 3: Airplane Left Wing
                                                                ]
                                                            }}
                                                            transition={{ duration: 1.5, times: [0, 0.45, 0.9], ease: "easeInOut" }}
                                                            fill="#E5E0D8" 
                                                            stroke="#000" 
                                                            strokeWidth="5" 
                                                            strokeLinejoin="round" 
                                                        />
                                                        
                                                        {/* Center Keel / Body */}
                                                        <motion.path 
                                                            animate={{
                                                                d: [
                                                                    "M 100 30 L 100 170 L 100 170 L 100 30 Z",
                                                                    "M 100 25 L 100 170 L 100 170 L 100 25 Z",
                                                                    "M 175 40 L 90 140 L 105 175 L 125 130 Z"
                                                                ]
                                                            }}
                                                            transition={{ duration: 1.5, times: [0, 0.45, 0.9], ease: "easeInOut" }}
                                                            fill="#D4CEBF" 
                                                            stroke="#000" 
                                                            strokeWidth="5" 
                                                            strokeLinejoin="round" 
                                                        />

                                                        {/* Highlighted Right Wing */}
                                                        <motion.path 
                                                            animate={{
                                                                d: [
                                                                    "M 100 30 L 170 30 L 170 170 L 100 170 Z",
                                                                    "M 100 25 L 170 100 L 170 170 L 100 170 Z",
                                                                    "M 175 40 L 125 130 L 170 110 Z"
                                                                ]
                                                            }}
                                                            transition={{ duration: 1.5, times: [0, 0.45, 0.9], ease: "easeInOut" }}
                                                            fill="#FFFDF5" 
                                                            stroke="#000" 
                                                            strokeWidth="5" 
                                                            strokeLinejoin="round" 
                                                        />

                                                        {/* Center Crease Line */}
                                                        <motion.path 
                                                            d="M 175 40 L 90 140" 
                                                            stroke="#000" 
                                                            strokeWidth="4" 
                                                            strokeLinecap="round"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: [0, 0.4, 1] }}
                                                            transition={{ duration: 1.5 }}
                                                        />

                                                        {/* Text lines on initial flat letter sheet */}
                                                        <motion.g
                                                            initial={{ opacity: 1 }}
                                                            animate={{ opacity: [1, 0.5, 0, 0] }}
                                                            transition={{ duration: 1.5, times: [0, 0.35, 0.6, 1] }}
                                                        >
                                                            <line x1="50" y1="65" x2="150" y2="65" stroke="#71717A" strokeWidth="4" strokeDasharray="6 4" strokeLinecap="round" />
                                                            <line x1="50" y1="90" x2="135" y2="90" stroke="#71717A" strokeWidth="4" strokeDasharray="6 4" strokeLinecap="round" />
                                                            <line x1="50" y1="115" x2="155" y2="115" stroke="#71717A" strokeWidth="4" strokeDasharray="6 4" strokeLinecap="round" />
                                                            <line x1="50" y1="140" x2="110" y2="140" stroke="#71717A" strokeWidth="4" strokeDasharray="6 4" strokeLinecap="round" />
                                                        </motion.g>
                                                    </svg>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    className="w-full h-full flex items-center justify-center"
                                                    animate={{
                                                        x: [0, -40, 650],
                                                        y: [0, 30, -550],
                                                        rotateZ: [-10, -30, 35],
                                                        scale: [1, 1.15, 0.4],
                                                        opacity: [1, 1, 0]
                                                    }}
                                                    transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
                                                >
                                                    <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[8px_8px_0px_rgba(0,0,0,0.8)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M 30 110 L 48 150 L 58 145 L 40 105 Z" fill="#EF4444" stroke="#000" strokeWidth="2" />
                                                        <path d="M 40 105 L 58 145 L 68 140 L 50 100 Z" fill="#3B82F6" stroke="#000" strokeWidth="2" />
                                                        <path d="M 175 40 L 25 105 L 90 140 Z" fill="#E5E0D8" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
                                                        <path d="M 175 40 L 90 140 L 105 175 L 125 130 Z" fill="#D4CEBF" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
                                                        <path d="M 175 40 L 125 130 L 170 110 Z" fill="#FFFDF5" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
                                                        <path d="M 175 40 L 90 140" stroke="#000" strokeWidth="4" strokeLinecap="round" />
                                                    </svg>
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Status Badge */}
                                        <motion.div 
                                            className="mt-6 bg-retro-cream border-4 border-black px-5 py-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 z-10"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                        >
                                            <span className="material-symbols-outlined text-black font-bold animate-spin text-xl">
                                                {status === 'sending' ? 'near_me' : 'flight_takeoff'}
                                            </span>
                                            <span className="font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider text-black">
                                                {status === 'sending' ? 'AIRMAIL IN FLIGHT...' : 'FOLDING PAPER AIRPLANE...'}
                                            </span>
                                        </motion.div>
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
                                    <div className="space-y-6">
                                        {/* Availability & Telemetry */}
                                        <div>
                                            <h4 className="font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-xs sm:text-sm">
                                                <span className="material-symbols-outlined text-base">schedule</span>
                                                Availability & Signals
                                            </h4>
                                            <div className="bg-retro-cream border-2 border-black p-3.5 space-y-2 text-[11px] sm:text-xs font-pixel uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                <div className="flex justify-between gap-2 border-b border-black/10 pb-1.5">
                                                    <span className="text-zinc-600">Status</span>
                                                    <span className="text-retro-charcoal font-bold text-right flex items-center gap-1">
                                                        <span className="w-2 h-2 rounded-full bg-retro-green animate-pulse inline-block"></span>
                                                        Open for Internships
                                                    </span>
                                                </div>
                                                <div className="flex justify-between gap-2 border-b border-black/10 pb-1.5">
                                                    <span className="text-zinc-600">Preferred Role</span>
                                                    <span className="text-retro-charcoal text-right font-bold">AI/ML Intern</span>
                                                </div>
                                                <div className="flex justify-between gap-2 border-b border-black/10 pb-1.5">
                                                    <span className="text-zinc-600">Location</span>
                                                    <span className="text-retro-charcoal text-right">Kozhikode, KL 🇮🇳</span>
                                                </div>
                                                <div className="flex justify-between gap-2">
                                                    <span className="text-zinc-600">Response Rate</span>
                                                    <span className="text-retro-charcoal text-right">&lt; 24 Hours</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Connect & Socials */}
                                        <div>
                                            <h4 className="font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-xs sm:text-sm">
                                                <span className="material-symbols-outlined text-base">alternate_email</span>
                                                Connect & Channels
                                            </h4>
                                            <div className="flex flex-wrap gap-2.5 mb-3">
                                                <a href={portfolioData.personal.social.github} aria-label="GitHub Profile" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" title="GitHub">
                                                    <span className="material-symbols-outlined text-lg" aria-hidden="true">code</span>
                                                </a>
                                                <a href={portfolioData.personal.social.linkedin} aria-label="LinkedIn Profile" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white hover:bg-blue-700 hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" title="LinkedIn">
                                                    <span className="material-symbols-outlined text-lg" aria-hidden="true">work</span>
                                                </a>
                                                <a href={`mailto:${portfolioData.personal.email}`} aria-label="Send an Email" className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white hover:bg-red-500 hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" title="Direct Email">
                                                    <span className="material-symbols-outlined text-lg" aria-hidden="true">send</span>
                                                </a>
                                                {portfolioData.personal.social.buyMeACoffee && (
                                                    <a href={portfolioData.personal.social.buyMeACoffee} aria-label="Buy Me A Coffee" target="_blank" rel="noopener noreferrer" className="h-10 px-3 border-2 border-black flex items-center gap-1.5 bg-retro-yellow hover:bg-yellow-400 transition-all font-pixel text-[10px] uppercase font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" title="Buy Me A Coffee">
                                                        <span className="material-symbols-outlined text-base">local_cafe</span>
                                                        <span>Fuel Code</span>
                                                    </a>
                                                )}
                                            </div>
                                            
                                            {/* Quick Action Buttons */}
                                            <div className="space-y-2">

                                                <button
                                                    type="button"
                                                    onClick={() => handleCopy(portfolioData.personal.phone, "PHONE")}
                                                    className="w-full bg-white hover:bg-retro-yellow border-2 border-black p-2 flex items-center justify-between text-xs font-pixel uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none group"
                                                >
                                                    <span className="truncate mr-2 font-mono text-[11px] text-zinc-700 font-bold group-hover:text-black">
                                                        {portfolioData.personal.phone}
                                                    </span>
                                                    <span className="flex items-center gap-1 bg-black text-white px-2 py-0.5 rounded-xs text-[9px] shrink-0">
                                                        <span className="material-symbols-outlined text-xs">call</span>
                                                        COPY
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Vintage Airmail Stamp & Badge */}
                                        <div className="pt-2 border-t-2 border-black/10 flex items-center justify-between gap-3">
                                            <div className="text-[10px] font-pixel text-zinc-500 uppercase tracking-wider leading-relaxed">
                                                <div className="text-black font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm text-retro-orange">mark_email_read</span>
                                                    AIRMAIL SYSTEM v2.0
                                                </div>
                                                <div>SECURE RSA DIRECT FORM</div>
                                            </div>
                                            <div className="w-16 h-20 border-2 border-dashed border-black/40 bg-retro-white p-1.5 flex flex-col items-center justify-between text-center select-none rotate-2 hover:rotate-0 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
                                                <span className="material-symbols-outlined text-retro-orange text-lg">flight_takeoff</span>
                                                <span className="font-pixel text-[7px] text-zinc-600 uppercase leading-tight font-bold">AIRMAIL<br/>CERTIFIED</span>
                                                <span className="font-mono text-[8px] font-bold text-black border-t border-black/30 w-full pt-0.5">673001</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div className="bg-retro-white p-5 sm:p-8 relative overflow-hidden flex flex-col justify-center min-h-[420px] sm:min-h-[500px]">
                                    {/* SECURITY: Enforce maxLength on form inputs to prevent application-layer DoS via oversized payloads, aligning with server-side validation. */}
                                    <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="name" className="block font-pixel text-xs uppercase tracking-wider text-zinc-600 mb-1">Your Name</label>
                                            <input
                                                id="name"
                                                ref={nameInputRef}
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-zinc-50 border-2 border-black/30 rounded-lg p-3 font-body focus:outline-none focus:border-black focus:bg-white transition-colors text-zinc-900 placeholder-zinc-400"
                                                placeholder="e.g. Sarah Jenkins"
                                                type="text"
                                                maxLength={100}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block font-pixel text-xs uppercase tracking-wider text-zinc-600 mb-1">Your Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full bg-zinc-50 border-2 border-black/30 rounded-lg p-3 font-body focus:outline-none focus:border-black focus:bg-white transition-colors text-zinc-900 placeholder-zinc-400 ${emailError ? 'border-red-500' : ''}`}
                                                placeholder="e.g. sarah@company.com"
                                                type="email"
                                                aria-invalid={!!emailError}
                                                aria-describedby={emailError ? "email-error" : undefined}
                                                maxLength={255}
                                                required
                                            />
                                            {emailError && <p id="email-error" className="text-red-500 text-xs mt-1 font-bold font-mono">{emailError}</p>}
                                        </div>
                                        <div>
                                            <label className="block font-pixel text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-600 mb-2">
                                                SELECT SUBJECT:
                                            </label>
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                                                {SUBJECT_OPTIONS.map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => handleSubjectSelect(opt)}
                                                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono font-bold border-2 transition-all rounded-lg cursor-pointer ${
                                                            selectedSubjectId === opt.id
                                                                ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] scale-[1.02]'
                                                                : 'bg-zinc-100 text-zinc-800 border-black/30 hover:border-black hover:bg-zinc-200'
                                                        }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                            {/* SECURITY: Enforce maxLength on optional subject field to prevent rudimentary DoS via oversized payloads */}
                                            <input
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full bg-zinc-50 border-2 border-black/30 rounded-lg p-3 font-body focus:outline-none focus:border-black focus:bg-white transition-colors text-zinc-900 placeholder-zinc-400 text-sm sm:text-base"
                                                placeholder="Subject details..."
                                                type="text"
                                                maxLength={200}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block font-pixel text-xs uppercase tracking-wider text-zinc-600 mb-1">Your Message</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full bg-zinc-50 border-2 border-black/30 rounded-lg p-3.5 font-body text-sm text-zinc-900 focus:outline-none focus:border-black focus:bg-white transition-all resize-none h-36"
                                                placeholder="Write your message..."
                                                maxLength={5000}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                                            <button
                                                className={`w-full sm:w-auto bg-black text-white px-8 py-4 text-xs font-body font-bold tracking-wider uppercase hover:bg-retro-yellow hover:text-black transition-all rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none cursor-pointer`}
                                                type="submit"
                                                disabled={isSaving}
                                            >
                                                <span className="flex items-center justify-center gap-2">
                                                    <span className={`material-symbols-outlined text-base ${isSaving ? 'animate-pulse' : ''}`}>
                                                        {isSaving ? 'flight_takeoff' : 'send'}
                                                    </span>
                                                    <span>
                                                        {status === 'error' ? 'Transmission Error. Retry.' : isSaving ? 'Folding Airmail...' : 'Send Message'}
                                                    </span>
                                                </span>
                                            </button>

                                            <div className="text-xs font-body text-zinc-600 flex flex-wrap items-center gap-2">
                                                 <span>Prefer direct email?</span>
                                                 <a
                                                     href={`mailto:${portfolioData.personal.email}`}
                                                     className="font-bold text-zinc-900 underline hover:text-blue-600 transition-colors"
                                                 >
                                                     {portfolioData.personal.email} ↗
                                                 </a>
                                                 <button
                                                     type="button"
                                                     onClick={() => handleCopy(portfolioData.personal.email, "EMAIL")}
                                                     className="px-2 py-0.5 bg-black text-white hover:bg-retro-yellow hover:text-black border border-black rounded text-[10px] font-pixel uppercase tracking-wider font-bold transition-all flex items-center gap-1 cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                                 >
                                                     <span className="material-symbols-outlined text-xs">content_copy</span>
                                                     Copy Email
                                                 </button>
                                             </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Retro Copy Toast Alert */}
            <AnimatePresence>
                {toastData && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-50 bg-retro-yellow border-4 border-black px-4 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3"
                    >
                        <span className="material-symbols-outlined text-black font-bold text-xl">content_paste_check</span>
                        <div>
                            <p className="font-pixel text-xs font-bold uppercase text-black">{toastData.title}</p>
                            <p className="font-mono text-[11px] text-zinc-800">{toastData.text}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Contact;
