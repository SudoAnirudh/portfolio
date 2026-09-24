"use client";

import React from "react";
import { useMarginalia } from "@/context/MarginaliaContext";

export default function FootnoteDrawer() {
  const { activeNote, setActiveNote } = useMarginalia();

  if (!activeNote) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-[var(--bg-surface)] border-t-2 border-[var(--accent-editorial)] shadow-2xl transition-transform duration-300 animate-slide-up">
      <div className="flex items-center justify-between font-mono text-xs uppercase text-[var(--accent-editorial)] mb-2">
        <span>Marginalia Note [{activeNote.number}]</span>
        <button
          onClick={() => setActiveNote(null)}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-2 py-0.5 border border-subtle"
        >
          Close [×]
        </button>
      </div>

      {activeNote.title && (
        <h4 className="font-serif text-base font-semibold text-[var(--text-primary)] mb-1">
          {activeNote.title}
        </h4>
      )}

      <p className="font-serif text-sm text-[var(--text-primary)] leading-relaxed mb-2">
        {activeNote.text}
      </p>

      {activeNote.tradeoff && (
        <div className="font-mono text-xs text-[var(--text-secondary)] border-t border-subtle pt-1">
          <span className="font-semibold text-[var(--accent-editorial)]">Rejected Alternative: </span>
          {activeNote.tradeoff}
        </div>
      )}
    </div>
  );
}
