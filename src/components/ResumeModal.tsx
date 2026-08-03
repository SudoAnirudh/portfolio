"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl?: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({
    isOpen,
    onClose,
    pdfUrl = "https://drive.google.com/file/d/1V6g7AmD1qLFil0PY0rPI54-Rfp0RgajU/view?usp=drive_link"
}) => {
    const [viewerSource, setViewerSource] = React.useState<'drive' | 'local'>('drive');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const driveEmbedSrc = pdfUrl.includes('drive.google.com/file/d/')
        ? pdfUrl.replace(/\/view(\?.*)?$/, '/preview').replace(/\/edit(\?.*)?$/, '/preview')
        : pdfUrl;

    const currentSrc = viewerSource === 'drive' ? driveEmbedSrc : "/Anirudh_S.pdf";

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.95, y: 20, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-retro-white border-4 border-black w-full max-w-4xl h-[85vh] rounded-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Retro Window Header */}
                    <div className="bg-black text-white p-3 flex flex-wrap items-center justify-between gap-2 border-b-4 border-black shrink-0">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-retro-yellow text-lg">description</span>
                            <span className="font-pixel text-xs sm:text-sm tracking-wider uppercase font-bold">
                                RESUME_PREVIEW://ANIRUDH_S.PDF
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                            {/* Source Toggle Controls */}
                            <div className="flex items-center bg-zinc-800 p-0.5 border border-zinc-600 rounded">
                                <button
                                    onClick={() => setViewerSource('drive')}
                                    className={`px-2 py-0.5 font-pixel text-[10px] uppercase font-bold rounded transition-colors ${
                                        viewerSource === 'drive' ? 'bg-retro-yellow text-black' : 'text-zinc-300 hover:text-white'
                                    }`}
                                >
                                    Google Drive
                                </button>
                                <button
                                    onClick={() => setViewerSource('local')}
                                    className={`px-2 py-0.5 font-pixel text-[10px] uppercase font-bold rounded transition-colors ${
                                        viewerSource === 'local' ? 'bg-retro-yellow text-black' : 'text-zinc-300 hover:text-white'
                                    }`}
                                >
                                    Local PDF
                                </button>
                            </div>

                            <a
                                href={viewerSource === 'drive' ? pdfUrl : "/Anirudh_S.pdf"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 bg-retro-green text-black border border-black rounded text-[10px] font-pixel uppercase font-bold hover:bg-emerald-300 transition-colors flex items-center gap-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                title="Open PDF in new browser tab"
                            >
                                <span className="material-symbols-outlined text-xs">open_in_new</span>
                                <span>Open Fullscreen</span>
                            </a>

                            <button
                                onClick={onClose}
                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white border border-black rounded text-[10px] font-pixel font-bold uppercase transition-colors flex items-center justify-center cursor-pointer"
                                aria-label="Close modal"
                            >
                                <span className="material-symbols-outlined text-xs">close</span>
                            </button>
                        </div>
                    </div>

                    {/* PDF Frame Viewer */}
                    <div className="flex-1 bg-zinc-900 relative w-full h-full">
                        <iframe
                            src={currentSrc}
                            className="w-full h-full border-none"
                            title="Resume PDF Preview"
                            allow="autoplay"
                        />
                    </div>

                    {/* Footer Controls */}
                    <div className="bg-zinc-100 border-t-2 border-black p-3 flex flex-wrap items-center justify-between text-xs font-pixel text-zinc-600 uppercase gap-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>
                                {viewerSource === 'drive' ? 'VIEWING VIA GOOGLE DRIVE PREVIEW' : 'VIEWING LOCAL PDF ASSET'}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                                If Drive displays &quot;Content is blocked&quot;, set Drive file to &quot;Anyone with the link&quot; or switch to Local PDF.
                            </span>
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-900 font-bold hover:underline flex items-center gap-1 shrink-0"
                            >
                                <span>Direct Drive Link</span>
                                <span className="material-symbols-outlined text-xs">open_in_new</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ResumeModal;
