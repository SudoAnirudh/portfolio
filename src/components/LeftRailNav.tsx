"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const navSections = [
  { id: "preface", number: "§01", title: "Preface & Abstract" },
  { id: "monographs", number: "§02", title: "Project Monographs" },
  { id: "core", number: "§03", title: "Engineering Core" },
  { id: "experience", number: "§04", title: "Research & Experience" },
  { id: "credentials", number: "§05", title: "Credentials" },
  { id: "correspondence", number: "§06", title: "Correspondence" },
];

export default function LeftRailNav() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("preface");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = navSections.map((sec) =>
        document.getElementById(sec.id)
      );

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navSections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="space-y-8 text-sm">
      {/* Monograph Metadata Header */}
      <div className="border-b border-subtle pb-6 space-y-2">
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] flex items-center justify-between">
          <span>VOL. 01 / 2026</span>
          <span className="text-[var(--accent-editorial)] italic font-serif text-sm">Ed. 2.0</span>
        </div>
        <h1 className="font-serif text-2xl font-normal tracking-tight text-[var(--text-primary)]">
          The Engineering Monograph
        </h1>
        <p className="font-serif text-xs italic text-[var(--text-secondary)] leading-relaxed">
          A scientific journal of production AI systems, autonomous agents, and full-stack software architectures.
        </p>
      </div>

      {/* System Status Indicator */}
      <div className="bg-[var(--bg-surface)] p-3 border border-subtle rounded-none space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-mono)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-mono)]"></span>
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent-mono)] font-medium">
            System Online
          </span>
        </div>
        <p className="font-mono text-[11px] text-[var(--text-secondary)] leading-tight">
          Available for Full-Time AI/ML Roles & High-Impact Contracts
        </p>
      </div>

      {/* Table of Contents / Section Index */}
      <div className="space-y-3">
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] border-b border-subtle pb-1">
          Index / Contents
        </div>
        <ul className="space-y-2 font-mono text-xs">
          {navSections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className={`flex items-baseline gap-2 transition-colors duration-200 group ${
                    isActive
                      ? "text-[var(--accent-editorial)] font-medium"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="text-[10px] opacity-70 font-serif italic">{sec.number}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                    {sec.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Theme Switcher Toggle */}
      <div className="pt-2 border-t border-subtle">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-[var(--text-primary)] bg-[var(--bg-surface)] border border-subtle hover:border-[var(--accent-editorial)] transition-colors duration-200 cursor-pointer"
          aria-label="Toggle Monograph Theme"
        >
          <span className="text-[var(--text-secondary)] uppercase tracking-wider">Canvas Theme</span>
          <span className="flex items-center gap-1.5 font-medium text-[var(--accent-editorial)]">
            <span className="material-symbols-outlined !text-sm">
              {theme === "light" ? "menu_book" : "dark_mode"}
            </span>
            {theme === "light" ? "Archival Paper" : "Binder Ink"}
          </span>
        </button>
      </div>

      {/* Direct Links / Correspondence */}
      <div className="pt-2 space-y-2 font-mono text-xs">
        <div className="text-[var(--text-secondary)] uppercase tracking-widest text-[10px]">
          Direct Links
        </div>
        <div className="flex flex-col space-y-1.5">
          <a
            href="https://github.com/SudoAnirudh"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link text-[var(--text-primary)] hover:text-[var(--accent-editorial)]"
          >
            github.com/SudoAnirudh
          </a>
          <a
            href="https://linkedin.com/in/sudoanirudh"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link text-[var(--text-primary)] hover:text-[var(--accent-editorial)]"
          >
            linkedin.com/in/sudoanirudh
          </a>
          <a
            href="mailto:anirudhsudheer@gmail.com"
            className="editorial-link text-[var(--text-primary)] hover:text-[var(--accent-editorial)]"
          >
            anirudhsudheer@gmail.com
          </a>
          <a
            href="https://drive.google.com/file/d/1V6g7AmD1qLFil0PY0rPI54-Rfp0RgajU/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[var(--accent-editorial)] font-medium pt-1 hover:underline"
          >
            <span className="material-symbols-outlined !text-xs">description</span>
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </nav>
  );
}
