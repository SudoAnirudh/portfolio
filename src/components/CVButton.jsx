import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check, Loader2, Cpu } from 'lucide-react';

const CVButton = ({ href }) => {
    const [status, setStatus] = useState('idle'); // idle, establishing, transferring, completed
    const [phase, setPhase] = useState(0); // For multi-step labeling

    const handleDownload = (e) => {
        if (status !== 'idle') return;

        setStatus('establishing');

        // Step 1: Establishing Link
        setTimeout(() => {
            setStatus('transferring');

            // Step 2: Transferring (actual download trigger at end)
            setTimeout(() => {
                setStatus('completed');

                // Trigger actual download
                const link = document.createElement('a');
                link.href = href;
                link.download = 'Anirudh_CV_ML.pdf';
                link.target = "_blank";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Reset after some time
                setTimeout(() => {
                    setStatus('idle');
                }, 4000);
            }, 2000);
        }, 1000);
    };

    return (
        <button
            onClick={handleDownload}
            className={`cv-download-btn ${status} focus-ring`}
            disabled={status !== 'idle'}
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.8rem 2.2rem',
                borderRadius: '50px',
                border: '1px solid var(--card-border)',
                background: status === 'completed' ? 'rgba(35, 165, 90, 0.1)' : 'var(--card-bg)',
                color: status === 'completed' ? '#23a55a' : 'var(--text-primary)',
                cursor: status === 'idle' ? 'pointer' : 'default',
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                fontWeight: '600',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                overflow: 'hidden',
                fontFamily: "'JetBrains Mono', monospace"
            }}
        >
            {/* Ambient Background Glow during transfer */}
            {(status === 'establishing' || status === 'transferring') && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    style={{ position: 'absolute', inset: 0, background: 'var(--accent)' }}
                />
            )}

            {/* Binary Shards Drifting across button */}
            {status === 'transferring' && (
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.4 }}>
                    {[...Array(6)].map((_, i) => (
                        <motion.span
                            key={i}
                            initial={{ x: -20, y: Math.random() * 40, opacity: 0 }}
                            animate={{ x: 200, opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                            style={{ position: 'absolute', fontSize: '10px', color: 'var(--accent)' }}
                        >
                            {Math.random() > 0.5 ? '1' : '0'}
                        </motion.span>
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                    >
                        ACCESS_CV <Download size={16} />
                    </motion.div>
                )}
                {status === 'establishing' && (
                    <motion.div
                        key="establishing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                    >
                        ESTABLISHING_LINK... <Loader2 size={16} className="animate-spin text-accent" />
                    </motion.div>
                )}
                {status === 'transferring' && (
                    <motion.div
                        key="transferring"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                    >
                        TRANSFERRING_DATA... <Cpu size={16} className="text-accent" />
                    </motion.div>
                )}
                {status === 'completed' && (
                    <motion.div
                        key="completed"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                    >
                        PAYLOAD_RECEIVED <Check size={18} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Neural Progress Bar */}
            {status === 'transferring' && (
                <motion.div
                    className="neural-progress"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '2px',
                        background: 'var(--accent)',
                        boxShadow: '0 0 15px var(--accent)'
                    }}
                />
            )}

            {/* Completion Pulse Pulse */}
            <AnimatePresence>
                {status === 'completed' && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50px',
                            border: '2px solid #23a55a',
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>
        </button>
    );
};

export default CVButton;
