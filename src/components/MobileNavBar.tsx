"use client";
import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";

const MobileNavBar = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      alert(`Email: ${portfolioData.personal.email}`);
    }
  };

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-4 left-4 right-4 z-50 lg:hidden flex items-center justify-around bg-zinc-900/95 dark:bg-black/95 backdrop-blur-md text-white py-2.5 px-3 rounded-2xl border-2 border-black dark:border-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all"
    >
      <a
        href="#about"
        className="flex items-center gap-1 text-[11px] font-pixel uppercase font-bold tracking-wider text-zinc-300 hover:text-white transition-colors"
      >
        <span className="material-symbols-outlined text-sm">person</span>
        <span>About</span>
      </a>

      <div className="w-[1px] h-4 bg-zinc-700"></div>

      <a
        href="#projects"
        className="flex items-center gap-1 text-[11px] font-pixel uppercase font-bold tracking-wider text-retro-yellow hover:text-white transition-colors"
      >
        <span className="material-symbols-outlined text-sm">folder_special</span>
        <span>Work</span>
      </a>

      <div className="w-[1px] h-4 bg-zinc-700"></div>

      <a
        href="/Anirudh_S.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-[11px] font-pixel uppercase font-bold tracking-wider text-white hover:text-retro-yellow transition-colors"
      >
        <span className="material-symbols-outlined text-sm">description</span>
        <span>CV</span>
      </a>

      <div className="w-[1px] h-4 bg-zinc-700"></div>

      <button
        onClick={handleCopyEmail}
        type="button"
        className="flex items-center gap-1 text-[11px] font-pixel uppercase font-bold tracking-wider text-emerald-400 hover:text-white transition-colors cursor-pointer"
        title="Copy Email Address"
      >
        <span className="material-symbols-outlined text-sm">
          {copied ? "check_circle" : "mail"}
        </span>
        <span>{copied ? "Copied!" : "Email"}</span>
      </button>
    </nav>
  );
};

export default MobileNavBar;
