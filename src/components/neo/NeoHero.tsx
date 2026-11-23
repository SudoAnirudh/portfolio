"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown, Mail, Copy, Check, Coffee } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./SocialIcons";
import { portfolioData } from "@/data/portfolio";

interface NeoHeroProps {
  onViewWork: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const NeoHero: React.FC<NeoHeroProps> = ({
  onViewWork,
  onOpenResume,
  onOpenContact,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [photoStyle, setPhotoStyle] = useState<"vector" | "golden">("vector");

  const photoSources = {
    vector: "/profile_vector.jpg",
    golden: "/profile_golden.jpg",
  };

  const codeSnippet = `> const dev_mode = {
  vibe: 'caffeinated & unhinged',
  bugs: 'personality features™',
  tested_on: 'localhost (probably)',
  deploy: 'git push --force 🚀',
  sleep: null // 404 not found
};`;

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <section id="hero" className="w-full bg-white grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden">
      {/* Left Column: Bio & CTAs */}
      <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between graph-paper border-b-[2.5px] lg:border-b-0 lg:border-r-[2.5px] border-[#0D0D0D]">
        <div className="space-y-6">
          {/* Greeting Pill */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#6D4AFF] text-white border-[2.2px] border-[#0D0D0D] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_#0D0D0D]"
            >
              <span>HEY, I&apos;M ANIRUDH</span>
              <span className="text-sm">👋</span>
            </motion.div>
          </div>

          {/* Display Heading */}
          <div className="space-y-1">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase text-[#0D0D0D] tracking-tighter leading-[0.95]">
              AI / ML<br />ENGINEER
            </h1>
          </div>

          {/* Monospace Subtext / Bio */}
          <p className="font-mono text-xs sm:text-sm text-zinc-800 leading-relaxed max-w-xl font-medium">
            I build autonomous agentic workflows, production GenAI backends (FastAPI &amp; pgvector), and edge ML systems with clean, efficient code.
          </p>

          {/* Action Buttons: VIEW MY WORK & DOWNLOAD RESUME */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <motion.button
              whileHover={{ x: -1, y: -1 }}
              whileTap={{ x: 2, y: 2 }}
              onClick={onViewWork}
              className="bg-[#B5E635] text-[#0D0D0D] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-5 py-3 border-[2.2px] border-[#0D0D0D] shadow-[4px_4px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>VIEW MY WORK</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </motion.button>

            <motion.button
              whileHover={{ x: -1, y: -1 }}
              whileTap={{ x: 2, y: 2 }}
              onClick={onOpenResume}
              className="bg-white text-[#0D0D0D] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-5 py-3 border-[2.2px] border-[#0D0D0D] shadow-[4px_4px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] inline-flex items-center gap-2 cursor-pointer transition-all hover:bg-zinc-50"
            >
              <span>DOWNLOAD RESUME</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </motion.button>
          </div>
        </div>

        {/* CONNECT WITH ME Strip */}
        <div className="pt-8 sm:pt-10 space-y-2.5">
          <div className="font-mono text-[11px] font-bold text-zinc-600 uppercase tracking-widest">
            CONNECT WITH ME
          </div>
          <div className="flex items-center gap-2.5">
            <motion.a
              whileHover={{ x: -1, y: -1 }}
              whileTap={{ x: 2, y: 2 }}
              href={portfolioData.personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 bg-white border-[2.2px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] flex items-center justify-center text-[#0D0D0D] hover:bg-[#B5E635] transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </motion.a>

            <motion.a
              whileHover={{ x: -1, y: -1 }}
              whileTap={{ x: 2, y: 2 }}
              href={portfolioData.personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 bg-white border-[2.2px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] flex items-center justify-center text-[#0D0D0D] hover:bg-[#6D4AFF] hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </motion.a>

            <motion.a
              whileHover={{ x: -1, y: -1 }}
              whileTap={{ x: 2, y: 2 }}
              href="https://x.com/SudoAnirudh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profile"
              className="w-10 h-10 bg-white border-[2.2px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] flex items-center justify-center text-[#0D0D0D] hover:bg-sky-400 hover:text-white transition-colors"
            >
              <TwitterIcon className="w-5 h-5" />
            </motion.a>

            <motion.button
              whileHover={{ x: -1, y: -1 }}
              whileTap={{ x: 2, y: 2 }}
              onClick={onOpenContact}
              aria-label="Send Email / Contact"
              className="w-10 h-10 bg-white border-[2.2px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] flex items-center justify-center text-[#0D0D0D] hover:bg-[#FF7A9E] transition-colors cursor-pointer"
            >
              <Mail className="w-5 h-5" />
            </motion.button>

            {portfolioData.personal.social.buyMeACoffee && (
              <motion.a
                whileHover={{ x: -1, y: -1 }}
                whileTap={{ x: 2, y: 2 }}
                href={portfolioData.personal.social.buyMeACoffee}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buy Me a Coffee"
                className="w-10 h-10 bg-white border-[2.2px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] flex items-center justify-center text-[#0D0D0D] hover:bg-yellow-300 transition-colors"
              >
                <Coffee className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Coral Frame + Layered Photo + Overlapping Code Card */}
      <div className="lg:col-span-5 bg-[#FF7A9E] p-6 sm:p-10 lg:p-12 flex flex-col items-center justify-start lg:justify-center relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] overflow-hidden">
        {/* Layered Photo Assembly - shifted towards top/center */}
        <div className="relative w-56 sm:w-64 lg:w-72 aspect-[4/5] flex items-center justify-center my-4 sm:my-6 lg:my-0 lg:-translate-y-12">
          {/* Layer 1 (Behind): Acid Lime Box Offset */}
          <div className="absolute inset-0 bg-[#B5E635] border-[2.5px] border-[#0D0D0D] translate-x-3 -translate-y-3 sm:translate-x-4 sm:-translate-y-4 shadow-[4px_4px_0px_0px_#0D0D0D]" />

          {/* Layer 2 (Middle): Main Photo Frame */}
          <div className="absolute inset-0 bg-white border-[2.5px] border-[#0D0D0D] shadow-[6px_6px_0px_0px_#0D0D0D] overflow-hidden group">
            {/* Style Toggle Pill: Vector vs Golden */}
            <div className="absolute top-2 left-2 z-10 flex items-center bg-white border-[2px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] p-0.5 font-mono text-[9px] font-bold">
              <button
                type="button"
                onClick={() => setPhotoStyle("vector")}
                className={`px-2 py-0.5 transition-colors cursor-pointer ${
                  photoStyle === "vector"
                    ? "bg-[#6D4AFF] text-white"
                    : "text-[#0D0D0D] hover:bg-zinc-100"
                }`}
                title="Neo-Brutalist Pop Art Vector"
              >
                ⚡ VECTOR
              </button>
              <button
                type="button"
                onClick={() => setPhotoStyle("golden")}
                className={`px-2 py-0.5 transition-colors cursor-pointer ${
                  photoStyle === "golden"
                    ? "bg-[#FFDE59] text-[#0D0D0D]"
                    : "text-[#0D0D0D] hover:bg-zinc-100"
                }`}
                title="Cinematic Golden Hour Photography"
              >
                🌅 GOLDEN
              </button>
            </div>

            <Image
              src={photoSources[photoStyle] || "/profile_vector.jpg"}
              alt="Anirudh S"
              fill
              className="object-cover object-center filter contrast-105"
              sizes="(max-width: 768px) 256px, 288px"
              priority
            />
          </div>
        </div>

        {/* Layer 3: Sarcastic Neo-Brutalist Dev Card - anchored at the bottom right of the coral frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleCopyCode}
          title="Click to copy sarcastic dev config"
          className="absolute bottom-3 right-3 sm:bottom-5 sm:right-6 lg:bottom-6 lg:right-6 bg-[#6D4AFF] text-white border-[2.5px] border-[#0D0D0D] shadow-[6px_6px_0px_0px_#0D0D0D] p-3.5 sm:p-4 z-20 w-[225px] sm:w-[255px] font-mono text-[10px] sm:text-[11px] leading-tight cursor-pointer hover:bg-violet-700 transition-colors select-none"
        >
          <div className="flex items-center justify-between pb-1 border-b border-white/20 mb-1.5">
            <span className="text-[9px] text-[#B5E635] font-black uppercase tracking-wider flex items-center gap-1">
              <span>🔥</span> BRAIN_DUMP.TS
            </span>
            <span className="text-zinc-300 hover:text-white">
              {copiedCode ? <Check className="w-3.5 h-3.5 text-[#B5E635]" /> : <Copy className="w-3 h-3" />}
            </span>
          </div>
          <pre className="overflow-hidden font-mono whitespace-pre-wrap leading-relaxed">
            <span className="text-[#B5E635]">&gt; const</span> dev_mode = &#123;
            <br />  vibe: <span className="text-[#FF7A9E]">&apos;caffeinated™&apos;</span>,
            <br />  bugs: <span className="text-[#FF7A9E]">&apos;personality&apos;</span>,
            <br />  tested: <span className="text-[#B5E635]">&apos;localhost:3000&apos;</span>,
            <br />  deploy: <span className="text-[#FFDE59]">&apos;push --force 🚀&apos;</span>,
            <br />  sleep: <span className="text-[#FF7A9E]">null</span> <span className="text-zinc-400">{"// 404"}</span>
            <br />&#125;;
          </pre>
          {copiedCode && (
            <div className="absolute -top-3 right-4 bg-[#B5E635] text-black text-[9px] font-black px-2 py-0.5 border-[2px] border-black font-mono shadow-[2px_2px_0px_0px_#0D0D0D]">
              COPIED! NO REFUNDS 💀
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NeoHero;
