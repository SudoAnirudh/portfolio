"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, BookOpen, Trophy, CheckCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface CertificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificationsModal: React.FC<CertificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white border-[3px] border-[#0D0D0D] shadow-[8px_8px_0px_0px_#0D0D0D] w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden relative"
        >
          {/* Header */}
          <div className="bg-[#B5E635] text-[#0D0D0D] border-b-[2.5px] border-[#0D0D0D] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 stroke-[2.5]" />
              <span className="font-display text-base sm:text-lg font-black uppercase tracking-tight">
                CERTIFICATIONS, RESEARCH &amp; ACHIEVEMENTS
              </span>
            </div>
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 bg-white border-[2px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] flex items-center justify-center cursor-pointer hover:bg-red-400 transition-colors"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 graph-paper space-y-8">
            {/* Section 1: Research Paper */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-[#0D0D0D]">
                <BookOpen className="w-5 h-5 text-[#6D4AFF]" />
                <h3 className="font-display text-base sm:text-lg font-black uppercase text-[#0D0D0D] tracking-tight">
                  PEER-REVIEWED RESEARCH PUBLICATION (2025)
                </h3>
              </div>

              <div className="bg-[#FFE8EE] border-[2.2px] border-[#0D0D0D] p-5 shadow-[4px_4px_0px_0px_#0D0D0D] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-[#6D4AFF] text-white border border-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase shadow-[1.5px_1.5px_0px_0px_#0D0D0D]">
                    JETIR 2025 · VOLUME 12, ISSUE 5
                  </span>
                  <span className="font-mono text-xs text-zinc-600 font-bold">
                    ISSN: 2349-5162
                  </span>
                </div>

                <h4 className="font-display text-lg font-black uppercase text-[#0D0D0D]">
                  Multilingual Offline Cattle Disease Diagnosis using Quantized Edge Neural Networks &amp; On-Device Vision Systems
                </h4>

                <p className="font-mono text-xs text-zinc-700 leading-relaxed font-medium">
                  Authored comprehensive research on deploying INT8 post-training quantized MobileNetV3 models to rural mobile devices with zero network connectivity. Delivered sub-50ms inference latency with 94.2% diagnostic accuracy on epidermal cattle lesions, coupled with multilingual voice assistance in Kannada, Hindi, and English.
                </p>

                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-zinc-600">
                  <span className="bg-white border border-black px-2 py-0.5 font-bold">Author: Anirudh S</span>
                  <span className="bg-white border border-black px-2 py-0.5">Domain: Edge ML &amp; Quantization</span>
                  <span className="bg-white border border-black px-2 py-0.5">Latency: &lt; 50ms INT8</span>
                </div>
              </div>
            </div>

            {/* Section 2: Technical Certifications */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-[#0D0D0D]">
                <Award className="w-5 h-5 text-[#B5E635]" />
                <h3 className="font-display text-base sm:text-lg font-black uppercase text-[#0D0D0D] tracking-tight">
                  VERIFIED INDUSTRY CERTIFICATIONS ({portfolioData.certifications.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-white border-[2px] border-[#0D0D0D] p-4 shadow-[3px_3px_0px_0px_#0D0D0D] flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-mono text-[10px] font-bold text-[#6D4AFF] uppercase">
                        {cert.issuer}
                      </div>
                      <h4 className="font-display text-sm font-bold uppercase text-[#0D0D0D]">
                        {cert.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Honors & Achievements */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-[#0D0D0D]">
                <Trophy className="w-5 h-5 text-[#FF7A9E]" />
                <h3 className="font-display text-base sm:text-lg font-black uppercase text-[#0D0D0D] tracking-tight">
                  HONORS &amp; OPEN-SOURCE ACHIEVEMENTS
                </h3>
              </div>

              <div className="space-y-3">
                {portfolioData.achievements.map((achm, index) => (
                  <div
                    key={index}
                    className="bg-white border-[2px] border-[#0D0D0D] p-4 shadow-[3px_3px_0px_0px_#0D0D0D] flex items-start gap-3"
                  >
                    <span className="text-base text-yellow-500 font-black">★</span>
                    <p className="font-mono text-xs text-zinc-800 leading-relaxed font-medium">
                      {achm}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificationsModal;
