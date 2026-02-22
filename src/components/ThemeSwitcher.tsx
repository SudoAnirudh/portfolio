"use client";

import React, { useEffect, useState } from "react";

type EraTheme = "80s" | "90s" | "2000s";

const THEMES: { value: EraTheme; label: string; hint: string }[] = [
  { value: "80s", label: "80s Terminal", hint: "Green on black" },
  { value: "90s", label: "90s Desktop", hint: "Beige office" },
  { value: "2000s", label: "2000s Cyber", hint: "Neon glow" },
];

const STORAGE_KEY = "portfolio-era-theme";

const getInitialTheme = (): EraTheme => {
  if (typeof window === "undefined") return "80s";

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (savedTheme && THEMES.some((theme) => theme.value === savedTheme)) {
    return savedTheme as EraTheme;
  }

  return "80s";
};

const ThemeSwitcher = () => {
  const [selectedTheme, setSelectedTheme] = useState<EraTheme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-era", selectedTheme);
    window.localStorage.setItem(STORAGE_KEY, selectedTheme);
  }, [selectedTheme]);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[60] bg-black/80 text-retro-white border-2 border-retro-green p-3 rounded-lg backdrop-blur-sm shadow-[0_0_18px_rgba(0,0,0,0.4)]">
      <div className="font-pixel text-[11px] uppercase tracking-widest text-retro-green mb-2">
        Era Theme
      </div>
      <div className="space-y-2">
        {THEMES.map((theme) => {
          const isSelected = selectedTheme === theme.value;
          return (
            <button
              key={theme.value}
              type="button"
              onClick={() => setSelectedTheme(theme.value)}
              className={`w-full text-left px-3 py-2 border text-[11px] font-pixel uppercase tracking-wider transition-all ${
                isSelected
                  ? "bg-retro-green text-black border-retro-green"
                  : "bg-black/60 text-retro-white border-retro-green/50 hover:bg-retro-charcoal"
              }`}
            >
              <div>{theme.label}</div>
              <div className="text-[10px] opacity-75">{theme.hint}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
