"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F4F4EE] text-[#0D0D0D] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-lg bg-white border-[3px] border-[#0D0D0D] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#0D0D0D] text-center space-y-6 relative overflow-hidden">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 bg-[#FF7A9E] text-black border-[2px] border-[#0D0D0D] px-3 py-1 font-mono text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#0D0D0D]">
          <span>ERROR 404</span>
          <span>⚡</span>
        </div>

        {/* Giant Number */}
        <div className="space-y-1">
          <h1 className="font-display text-7xl sm:text-9xl font-black uppercase text-[#0D0D0D] tracking-tighter leading-none select-none">
            404
          </h1>
          <p className="font-mono text-xs sm:text-sm font-bold uppercase text-zinc-600 tracking-wider">
            PAGE_NOT_FOUND // LOST IN SPACE
          </p>
        </div>

        {/* Message */}
        <p className="font-mono text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium max-w-md mx-auto">
          The coordinate or case study you requested could not be located in this bento system. It may have been migrated or decommissioned.
        </p>

        {/* Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#B5E635] text-black border-[2.2px] border-[#0D0D0D] font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#0D0D0D] hover:bg-lime-400 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <Home className="w-4 h-4 stroke-[2.5]" />
            <span>RETURN TO BENTO</span>
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black border-[2.2px] border-[#0D0D0D] font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#0D0D0D] hover:bg-zinc-100 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>ALL WORKS</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
