"use client";
import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>('');
    const [status, setStatus] = React.useState<'idle' | 'submitting' | 'folding' | 'sending' | 'success' | 'unfolding' | 'error'>('idle');
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
        setStatus('unfolding');
        setTimeout(() => {
            setStatus('idle');
            setShouldFocus(true);
        }, 1400);
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

            // Start animation sequence
            setStatus('folding');

            setTimeout(() => {
                setStatus('sending');
                setTimeout(() => {
                    setStatus('success');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    setSelectedSubjectId('');
                }, 1000); // Wait for airplane flight
            }, 1500); // Wait for origami fold animation

        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section className="max-w-7xl mx-auto mb-6 px-3 sm:px-4 md:px-0 min-h-[520px] sm:min-h-[600px] flex items-center justify-center perspective-[2000px]" id="contact">
            <AnimatePresence mode="wait">
                {status === 'unfolding' ? (
                    <motion.div
                        className="bg-retro-cream bento-card rounded-3xl p-6 sm:p-10 border-4 border-black text-center max-w-xl w-full relative overflow-hidden flex flex-col items-center justify-center min-h-[420px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] perspective-[1000px]"
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.5 }}
                        key="unfolding-envelope"
                    >
                        {/* Air Mail Stripes Top & Bottom Border */}
                        <div className="absolute top-0 left-0 right-0 h-3.5 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_15px,#ffffff_15px,#ffffff_30px,#3b82f6_30px,#3b82f6_45px,#ffffff_45px,#ffffff_60px)] border-b-2 border-black"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-3.5 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_15px,#ffffff_15px,#ffffff_30px,#3b82f6_30px,#3b82f6_45px,#ffffff_45px,#ffffff_60px)] border-t-2 border-black"></div>

                        {/* Envelope Shell */}
                        <div className="relative w-full max-w-md aspect-[1.6/1] bg-amber-50 border-4 border-black rounded-2xl flex flex-col justify-end shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden mt-4 mb-2">
                            {/* Inner Envelope Pattern */}
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#ffffff_10px,#ffffff_20px,#3b82f6_20px,#3b82f6_30px,#ffffff_30px,#ffffff_40px)] opacity-15 pointer-events-none"></div>

                            {/* Stamp at Top-Right */}
                            <div className="absolute top-3 right-3 w-11 h-13 bg-red-100 border-2 border-black flex flex-col items-center justify-center rotate-6 shadow-sm z-10">
                                <span className="material-symbols-outlined text-xs text-red-600">local_post_office</span>
                                <span className="font-pixel text-[6px] font-bold uppercase text-red-800">AIRMAIL</span>
                            </div>

                            {/* Postmark Seal in Top-Left */}
                            <div className="absolute top-3 left-4 flex items-center gap-1.5 z-10">
                                <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-black flex items-center justify-center text-white shadow-sm">
                                    <span className="material-symbols-outlined text-[10px]">flight</span>
                                </div>
                                <span className="font-pixel text-[8px] font-bold uppercase tracking-wider text-black">PAR AVION</span>
                            </div>

                            {/* Envelope Top Flap (Opens UP 180 Degrees) */}
                            <motion.div
                                className="absolute top-0 left-0 right-0 h-1/2 bg-amber-100 border-b-4 border-black z-30 origin-top flex items-center justify-center shadow-md"
                                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                                initial={{ rotateX: 0 }}
                                animate={{ rotateX: -180 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                            >
                                {/* Wax Seal Badge on Flap Tip */}
                                <motion.div 
                                    className="w-10 h-10 rounded-full bg-red-600 border-2 border-black shadow-md flex items-center justify-center text-white relative top-2"
                                    animate={{ scale: [1, 1.25, 0.9, 1] }}
                                    transition={{ duration: 0.4, delay: 0.25 }}
                                >
                                    <span className="material-symbols-outlined text-sm">lock_open</span>
                                </motion.div>
                            </motion.div>

                            {/* Fresh Stationery Letter Sheet (Slides Up Out of Envelope) */}
                            <motion.div
                                className="w-[94%] mx-auto h-[90%] bg-retro-cream border-4 border-black rounded-t-xl p-4 flex flex-col justify-between shadow-2xl relative z-20"
                                initial={{ y: 90, opacity: 0, scale: 0.8 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
                            >
                                <div className="flex items-center justify-between border-b-2 border-black/20 pb-2">
                                    <span className="font-pixel text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-black flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                                        STATIONERY UNSEALED
                                    </span>
                                    <span className="font-mono text-[9px] uppercase text-zinc-500">READY</span>
                                </div>

                                <div className="my-3 space-y-2 text-center flex flex-col items-center">
                                    <motion.div
                                        className="w-12 h-12 rounded-full bg-yellow-100 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-1"
                                        animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.8 }}
                                    >
                                        <span className="material-symbols-outlined text-2xl text-yellow-800">edit_note</span>
                                    </motion.div>
                                    <span className="font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider text-black">
                                        OPENING COMPOSE WINDOW...
                                    </span>
                                </div>

                                {/* Simulated Paper Grid Lines */}
                                <div className="space-y-1.5 w-full">
                                    <div className="w-full h-1 bg-zinc-300 rounded-full animate-pulse"></div>
                                    <div className="w-4/5 h-1 bg-zinc-300 rounded-full animate-pulse [animation-delay:150ms]"></div>
                                    <div className="w-11/12 h-1 bg-zinc-300 rounded-full animate-pulse [animation-delay:300ms]"></div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : status === 'success' ? (
                    <motion.div
                        className="bg-retro-cream bento-card rounded-3xl p-6 sm:p-10 md:p-12 border-4 border-black text-center max-w-2xl w-full relative overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                        key="success-message"
                    >
                        {/* Air Mail Diagonal Stripes Border at Top */}
                        <div className="absolute top-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_15px,#ffffff_15px,#ffffff_30px,#3b82f6_30px,#3b82f6_45px,#ffffff_45px,#ffffff_60px)] border-b-2 border-black"></div>

                        <motion.div
                            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-100 text-blue-600 mb-6 sm:mb-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-2"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <span className="material-symbols-outlined text-5xl">mark_email_read</span>
                        </motion.div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tighter mb-5 sm:mb-6">Airmail Transmitted!</h3>
                        <p className="font-mono text-base sm:text-lg md:text-xl text-zinc-600 mb-8 sm:mb-10 leading-relaxed">
                            Your paper airplane has safely landed in my inbox. I&apos;ll inspect your message and get back to you shortly!
                        </p>
                        <button
                            onClick={handleReset}
                            className="bg-black text-white px-6 sm:px-10 py-4 sm:py-5 text-xs sm:text-sm font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase hover:bg-accent hover:scale-105 transition-all rounded-sm border-2 border-transparent hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 mx-auto"
                        >
                            <span className="material-symbols-outlined text-base">drafts</span>
                            <span>Send Another Airmail</span>
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
                                            <a href={portfolioData.personal.social.github} aria-label="GitHub Profile" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                                <span className="material-symbols-outlined" aria-hidden="true">code</span>
                                            </a>
                                            <a href={portfolioData.personal.social.linkedin} aria-label="LinkedIn Profile" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors">
                                                <span className="material-symbols-outlined" aria-hidden="true">work</span>
                                            </a>
                                            <a href={`mailto:${portfolioData.personal.email}`} aria-label="Send an Email" className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                                                <span className="material-symbols-outlined" aria-hidden="true">send</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div className="bg-retro-white p-5 sm:p-8 relative overflow-hidden flex flex-col justify-center min-h-[420px] sm:min-h-[500px]">
                                    <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="name" className="sr-only">Name</label>
                                            <input
                                                id="name"
                                                ref={nameInputRef}
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b-2 border-black/20 p-3 font-body focus:outline-none focus:border-black transition-colors placeholder-zinc-400"
                                                placeholder="ENTER NAME..."
                                                type="text"
                                                required maxLength={100}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="sr-only">Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full bg-transparent border-b-2 border-black/20 p-3 font-body focus:outline-none focus:border-black transition-colors placeholder-zinc-400 ${emailError ? 'border-red-500' : ''}`}
                                                placeholder="ENTER EMAIL..."
                                                type="email"
                                                aria-invalid={!!emailError}
                                                aria-describedby={emailError ? "email-error" : undefined}
                                                required maxLength={255}
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
                                                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono font-bold border-2 transition-all rounded-sm ${
                                                            selectedSubjectId === opt.id
                                                                ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] scale-[1.02]'
                                                                : 'bg-zinc-100 text-zinc-800 border-black/30 hover:border-black hover:bg-zinc-200'
                                                        }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                            <input
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b-2 border-black/20 p-2.5 sm:p-3 font-body focus:outline-none focus:border-black transition-colors placeholder-zinc-400 text-sm sm:text-base"
                                                placeholder="ENTER SUBJECT (OR SELECT ABOVE)..."
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="sr-only">Message</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full bg-zinc-50 border-2 border-black p-4 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow resize-none h-40 sm:h-48"
                                                placeholder="TYPE YOUR MESSAGE HERE..."
                                                required maxLength={5000}
                                            ></textarea>
                                        </div>
                                        <button
                                            className={`w-full sm:w-auto bg-black text-white px-6 sm:px-10 py-4 sm:py-5 text-[10px] sm:text-[11px] font-bold tracking-[0.16em] sm:tracking-[0.2em] uppercase hover:bg-accent transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:outline-none`}
                                            type="submit"
                                            disabled={isSaving}
                                        >
                                            <span className="flex items-center justify-center gap-2 sm:gap-3">
                                                <span className={`material-symbols-outlined text-base ${isSaving ? 'animate-pulse' : ''}`}>
                                                    {isSaving ? 'flight_takeoff' : 'near_me'}
                                                </span>
                                                <span>
                                                    {status === 'error' ? 'Transmission Error. Retry.' : isSaving ? 'Folding Airmail...' : 'Launch Airmail'}
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
