"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight, Copy, Check, Terminal, Sparkles } from "lucide-react";

export default function NotFound() {
  const [copied, setCopied] = useState(false);
  const [pingCount, setPingCount] = useState(0);

  const debugLog = `// 404_DIAGNOSTIC_TRACE.JSON
{
  "status": 404,
  "error": "ERR_LOST_IN_VECTOR_SPACE",
  "culprit": "probably_a_typo_or_outdated_link",
  "recommended_fix": "return_to_main_bento()",
  "coffee_level": "critically_low ☕"
}`;

  const handleCopyDebug = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(debugLog);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPingMessage = () => {
    if (pingCount === 0) return "PING SERVER";
    if (pingCount === 1) return "PING: 404 TIMEOUT 💀";
    if (pingCount === 2) return "PING: STILL DEAD 🤖";
    if (pingCount === 3) return "BRO IT'S GONE 😂";
    if (pingCount >= 4) return `PINGS: ${pingCount} (SERIOUSLY STOP 🛑)`;
    return "PING SERVER";
  };

  return (
    <main className="min-h-screen bg-[#F4F4EE] text-[#0D0D0D] flex items-center justify-center p-3 sm:p-6 md:p-10 graph-paper relative overflow-hidden select-none">
      {/* Decorative Neo-Brutalist Floating Shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-[#B5E635] border-[2.5px] border-[#0D0D0D] shadow-[4px_4px_0px_0px_#0D0D0D] rotate-12 hidden md:block" />
      <div className="absolute bottom-12 right-12 w-20 h-20 rounded-full bg-[#FF7A9E] border-[2.5px] border-[#0D0D0D] shadow-[5px_5px_0px_0px_#0D0D0D] -rotate-6 hidden md:block" />
      <div className="absolute top-1/4 right-8 w-12 h-12 bg-[#FFDE59] border-[2.5px] border-[#0D0D0D] shadow-[3px_3px_0px_0px_#0D0D0D] rotate-45 hidden lg:block" />

      {/* Main 404 Window Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
        className="w-full max-w-xl bg-white border-[3px] border-[#0D0D0D] shadow-[10px_10px_0px_0px_#0D0D0D] overflow-hidden relative z-10"
      >
        {/* Top Window Titlebar (Electric Violet) */}
        <div className="bg-[#6D4AFF] text-white border-b-[2.5px] border-[#0D0D0D] px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF7A9E] border border-black inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFDE59] border border-black inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#B5E635] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-wider uppercase ml-1.5 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL // 404_NOT_FOUND</span>
            </span>
          </div>

          <div className="bg-[#FFDE59] text-black font-mono text-[9px] font-black px-2 py-0.5 border-[1.8px] border-[#0D0D0D] uppercase shadow-[1.5px_1.5px_0px_0px_#0D0D0D]">
            HTTP: 404
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-center">
          {/* Giant 404 Numerals with Layered Neo Shadow */}
          <div className="relative inline-block my-2">
            {/* Offset Layer */}
            <div className="absolute inset-0 translate-x-2 translate-y-2 bg-[#B5E635] border-[3px] border-[#0D0D0D] shadow-[4px_4px_0px_0px_#0D0D0D]" />

            {/* Foreground Box */}
            <div className="relative bg-white border-[3px] border-[#0D0D0D] px-6 sm:px-10 py-3 sm:py-4">
              <h1 className="font-display text-6xl sm:text-8xl font-black uppercase tracking-tighter text-[#0D0D0D] leading-none">
                404
              </h1>
            </div>

            {/* Floating Sticker Badge */}
            <div className="absolute -top-3 -right-4 bg-[#FF7A9E] text-black border-[2px] border-[#0D0D0D] px-2 py-0.5 font-mono text-[10px] font-black uppercase rotate-6 shadow-[2px_2px_0px_0px_#0D0D0D]">
              NULL_POINTER!
            </div>
          </div>

          {/* Subtext */}
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="font-mono text-sm sm:text-base font-black uppercase text-[#0D0D0D] tracking-wide">
              COORDINATE LOST IN VECTOR SPACE 🛸
            </h2>
            <p className="font-mono text-xs text-zinc-700 leading-relaxed font-medium">
              The endpoint or case study you navigated to has been garbage-collected or decommissioned from this portfolio system.
            </p>
          </div>

          {/* Sarcastic Debug Card with Click-to-Copy */}
          <div
            onClick={handleCopyDebug}
            title="Click to copy diagnostic trace"
            className="bg-[#0D0D0D] text-left border-[2px] border-[#0D0D0D] p-3 sm:p-3.5 shadow-[4px_4px_0px_0px_#6D4AFF] relative cursor-pointer hover:bg-zinc-900 transition-colors"
          >
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-zinc-800 text-[10px] font-mono text-zinc-400">
              <span className="text-[#B5E635] font-bold flex items-center gap-1">
                <span>⚡</span> DIAGNOSTICS.JSON
              </span>
              <span className="flex items-center gap-1 hover:text-white">
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#B5E635]" />
                    <span className="text-[#B5E635] font-black">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY</span>
                  </>
                )}
              </span>
            </div>
            <pre className="font-mono text-[10px] sm:text-[11px] text-zinc-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              <span className="text-[#FF7A9E]">&quot;status&quot;</span>: 404,
              <br />
              <span className="text-[#FF7A9E]">&quot;error&quot;</span>: <span className="text-[#B5E635]">&quot;ERR_LOST_IN_VECTOR_SPACE&quot;</span>,
              <br />
              <span className="text-[#FF7A9E]">&quot;fix&quot;</span>: <span className="text-[#FFDE59]">&quot;hit_the_lime_button_below()&quot;</span>
            </pre>
            {copied && (
              <div className="absolute -top-2.5 right-4 bg-[#B5E635] text-black text-[9px] font-black px-2 py-0.5 border-[2px] border-black font-mono shadow-[2px_2px_0px_0px_#0D0D0D]">
                TRACE COPIED! 💀
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B5E635] text-black border-[2.2px] border-[#0D0D0D] font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#0D0D0D] hover:bg-lime-400 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4 stroke-[2.5]" />
              <span>RETURN TO MAIN BENTO</span>
            </Link>

            <button
              onClick={() => setPingCount((p) => p + 1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#F4F4EE] hover:bg-zinc-200 text-black border-[2.2px] border-[#0D0D0D] font-mono text-xs font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_#0D0D0D] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5] text-[#6D4AFF]" />
              <span>{getPingMessage()}</span>
            </button>
          </div>

          <div className="pt-1">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1 font-mono text-xs font-black uppercase text-[#6D4AFF] hover:underline underline-offset-4 decoration-2"
            >
              <span>OR EXPLORE ALL FLAGSHIP PROJECTS</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
