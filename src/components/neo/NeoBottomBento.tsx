"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Send, Sparkles } from "lucide-react";
import NeoStarburst from "./NeoStarburst";

interface NeoBottomBentoProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const NeoBottomBento: React.FC<NeoBottomBentoProps> = ({
  onOpenResume,
  onOpenContact,
}) => {
  return (
    <section id="experience" className="w-full bg-white grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden">
      {/* Left Experience Rail + Middle Timeline (Combined 8 Cols) */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 border-b-[2.5px] lg:border-b-0 lg:border-r-[2.5px] border-[#0D0D0D]">
        {/* Pink Left Rail: EXPERIENCE → */}
        <div className="md:col-span-3 bg-[#FF7A9E] p-5 sm:p-6 flex md:flex-col items-center justify-between md:justify-center border-b-[2.5px] md:border-b-0 md:border-r-[2.5px] border-[#0D0D0D] select-none">
          <div className="flex md:flex-col items-center gap-2">
            <span className="font-display text-xl sm:text-2xl font-black uppercase text-[#0D0D0D] tracking-tight md:[writing-mode:vertical-lr] md:rotate-180">
              EXPERIENCE
            </span>
            <div className="w-7 h-7 bg-white text-[#0D0D0D] border-[2px] border-[#0D0D0D] flex items-center justify-center shadow-[2px_2px_0px_0px_#0D0D0D]">
              <ArrowRight className="w-4 h-4 stroke-[3] md:rotate-90" />
            </div>
          </div>
        </div>

        {/* Middle Timeline Block */}
        <div className="md:col-span-9 p-6 sm:p-8 flex flex-col justify-between bg-white graph-paper">
          <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#0D0D0D]">
            {/* Experience Item 1: MindMatrix */}
            <div className="relative">
              <span className="absolute -left-[19px] sm:-left-[25px] top-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#0D0D0D] rounded-full border-2 border-white ring-2 ring-[#0D0D0D]" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h4 className="font-display text-sm sm:text-base font-black uppercase text-[#0D0D0D] tracking-tight">
                    ANDROID APP DEV INTERN (GENAI) • MINDMATRIX
                  </h4>
                </div>
                <div className="font-mono text-[11px] font-bold text-[#6D4AFF] uppercase">
                  FEB 2026 – MAY 2026
                </div>
                <p className="font-mono text-xs text-zinc-700 leading-relaxed font-medium pt-1">
                  Architected Nimma-Guru, a community mentorship mobile app in Kotlin &amp; Jetpack Compose connecting students with local mentors. Integrated Google Gemini 2.0 Flash for voice query assistance and AI mentor matching with real-time Firebase sync across 10+ Material 3 screens.
                </p>
              </div>
            </div>

            {/* Experience Item 2: HeproAI */}
            <div className="relative">
              <span className="absolute -left-[19px] sm:-left-[25px] top-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#0D0D0D] rounded-full border-2 border-white ring-2 ring-[#0D0D0D]" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h4 className="font-display text-sm sm:text-base font-black uppercase text-[#0D0D0D] tracking-tight">
                    AI/ML INTERN • HEPROAI
                  </h4>
                </div>
                <div className="font-mono text-[11px] font-bold text-[#6D4AFF] uppercase">
                  JAN 2026 – MAR 2026
                </div>
                <p className="font-mono text-xs text-zinc-700 leading-relaxed font-medium pt-1">
                  Engineered multi-dimensional student analytics engine tracking Academic, Wellness, and Career Readiness metrics across 200+ profiles with sub-100ms inference. Applied K-Means behavioral cohort segmentation and built interactive Power BI and Python dashboards.
                </p>
              </div>
            </div>

            {/* Experience Item 3: SIT Mangalore Education */}
            <div className="relative">
              <span className="absolute -left-[19px] sm:-left-[25px] top-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#0D0D0D] rounded-full border-2 border-white ring-2 ring-[#0D0D0D]" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h4 className="font-display text-sm sm:text-base font-black uppercase text-[#0D0D0D] tracking-tight">
                    B.E. ARTIFICIAL INTELLIGENCE &amp; ML • SIT MANGALORE
                  </h4>
                  <span className="bg-[#B5E635] text-black border border-black px-1.5 py-0.2 font-mono text-[10px] font-bold">
                    CGPA: 7.77
                  </span>
                </div>
                <div className="font-mono text-[11px] font-bold text-[#6D4AFF] uppercase">
                  2022 – 2026
                </div>
                <p className="font-mono text-xs text-zinc-700 leading-relaxed font-medium pt-1">
                  Specialized in Autonomous Agentic Workflows, ReAct Frameworks, INT8 Edge ML Inference (TensorFlow Lite), and Asynchronous Distributed Microservices (FastAPI &amp; Celery).
                </p>
              </div>
            </div>
          </div>

          {/* View Full Resume Button */}
          <div className="pt-6">
            <motion.button
              whileHover={{ x: -1, y: -1 }}
              whileTap={{ x: 2, y: 2 }}
              onClick={onOpenResume}
              className="bg-white hover:bg-zinc-50 text-[#0D0D0D] font-mono font-bold text-xs uppercase px-4 py-2.5 border-[2px] border-[#0D0D0D] shadow-[3.5px_3.5px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>VIEW FULL RESUME</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Right Column (4 Cols): Purple Grid CTA + Pink Starburst */}
      <div className="lg:col-span-4 bg-[#6D4AFF] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden graph-paper-purple text-white min-h-[340px]">
        {/* Top Header Tag */}
        <div className="flex items-center gap-1.5 text-white/80 font-mono text-xs uppercase font-bold tracking-widest">
          <Sparkles className="w-4 h-4 text-[#B5E635]" />
          <span>OPEN FOR HIGH-IMPACT ROLES</span>
        </div>

        {/* CTA Heading */}
        <div className="py-6 z-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-black uppercase text-white leading-[1.05] tracking-tight">
            LET&apos;S BUILD SOMETHING AMAZING TOGETHER.
          </h2>

          {/* GET IN TOUCH Button */}
          <div className="pt-6">
            <motion.button
              whileHover={{ x: -1, y: -1 }}
              whileTap={{ x: 2, y: 2 }}
              onClick={onOpenContact}
              className="bg-white hover:bg-zinc-100 text-[#0D0D0D] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-5 py-3 border-[2.5px] border-[#0D0D0D] shadow-[4px_4px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>GET IN TOUCH</span>
              <Send className="w-4 h-4 stroke-[2.5]" />
            </motion.button>
          </div>
        </div>

        {/* Pink Neo-Brutalist Starburst Sticker in bottom-right corner */}
        <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 z-0">
          <NeoStarburst size={110} color="#FF7A9E" borderColor="#0D0D0D" borderWidth={3} />
        </div>
      </div>
    </section>
  );
};

export default NeoBottomBento;
