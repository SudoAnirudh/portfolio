"use client";

import React from "react";
import { useMarginalia } from "@/context/MarginaliaContext";

export default function RightMarginRail() {
  const { activeNote } = useMarginalia();

  return (
    <aside className="sticky top-12 space-y-6 font-mono text-xs text-[var(--text-secondary)]">
      {/* Sidenote Box */}
      <div className="border-b border-subtle pb-3">
        <span className="uppercase text-[10px] tracking-widest text-[var(--text-secondary)] block mb-1">
          MARG. NOTES & SIDENOTES
        </span>
        <span className="text-[11px] font-serif italic text-[var(--accent-editorial)]">
          Column 11–12 Margin
        </span>
      </div>

      {activeNote ? (
        <div className="p-4 bg-[var(--bg-surface)] border-l-2 border-[var(--accent-editorial)] border-y border-r border-subtle space-y-2 animate-fade-in">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[var(--accent-editorial)]">
            <span>Sidenote [{activeNote.number}]</span>
            <span>Trade-off</span>
          </div>
          {activeNote.title && (
            <h4 className="font-serif text-sm font-semibold text-[var(--text-primary)] leading-tight">
              {activeNote.title}
            </h4>
          )}
          <p className="font-serif text-xs leading-relaxed text-[var(--text-primary)]">
            {activeNote.text}
          </p>
          {activeNote.tradeoff && (
            <div className="pt-2 border-t border-subtle font-mono text-[10px] text-[var(--text-secondary)]">
              <span className="font-bold text-[var(--accent-editorial)]">Rejected Option: </span>
              {activeNote.tradeoff}
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 border border-dashed border-subtle bg-[var(--bg-surface)] space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
            Marginalia Inspection
          </div>
          <p className="font-serif text-xs italic text-[var(--text-secondary)] leading-relaxed">
            Hover over any engineering decision node or footnote marker <span className="font-mono text-[var(--accent-editorial)]">[1]</span> in the text flow to inspect detailed architectural trade-offs.
          </p>
        </div>
      )}

      {/* Benchmark Callout Badge */}
      <div className="p-3 bg-[var(--bg-surface)] border border-subtle space-y-1.5">
        <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-mono)] font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-mono)]" />
          Latency Standard
        </div>
        <p className="font-serif text-xs text-[var(--text-primary)] leading-snug">
          Vector Cosine Match: &lt; 200ms
        </p>
        <p className="font-serif text-xs text-[var(--text-primary)] leading-snug">
          Task Enqueue (HTTP 202): &lt; 15ms
        </p>
      </div>
    </aside>
  );
}
