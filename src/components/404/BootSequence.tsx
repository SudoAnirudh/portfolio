"use client";
import React, { useState, useEffect, useCallback } from "react";

interface BootLine {
  text: string;
  color: string;
  delay: number;
  bold?: boolean;
}

const LINES: BootLine[] = [
  { text: "SYSTEM BOOT",                       color: "var(--lost-yellow)", delay: 0,    bold: true },
  { text: "v1.0.404",                           color: "var(--lost-muted)",  delay: 180 },
  { text: "",                                   color: "transparent",        delay: 340 },
  { text: "> Booting up...",                    color: "var(--lost-cream)",  delay: 420 },
  { text: "> Loading genius portfolio...",      color: "var(--lost-cream)",  delay: 640 },
  { text: "> Locating your requested page...",  color: "var(--lost-cream)",  delay: 880 },
  { text: "> Checking under the couch...",      color: "var(--lost-cream)",  delay: 1140 },
  { text: "> Asking nicely...",                 color: "var(--lost-cream)",  delay: 1380 },
  { text: "",                                   color: "transparent",        delay: 1560 },
  { text: "NOT FOUND.",                         color: "var(--lost-red)",    delay: 1580, bold: true },
  { text: "",                                   color: "transparent",        delay: 1760 },
  { text: "Congratulations. You broke it.",     color: "var(--lost-muted)",  delay: 1790 },
  { text: "",                                   color: "transparent",        delay: 1950 },
  { text: "> Entering LOST MODE...",            color: "var(--lost-yellow)", delay: 1980 },
];

const TOTAL_DURATION = 2800;

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [progressFull, setProgressFull] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  const skip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), LINES[i].delay));
    });

    timers.push(setTimeout(() => setShowProgress(true), 880));
    timers.push(setTimeout(() => setProgressFull(true), 1340));
    timers.push(setTimeout(() => setCanSkip(true), 400));
    timers.push(setTimeout(onComplete, TOTAL_DURATION));

    const keyHandler = (e: KeyboardEvent) => {
      if (["Enter", "Escape", " "].includes(e.key)) skip();
    };
    window.addEventListener("keydown", keyHandler);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [onComplete, skip]);

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-start px-8 sm:px-16 select-none overflow-hidden"
      style={{ background: "var(--lost-bg)", fontFamily: "var(--font-pixel), monospace" }}
    >
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)",
        }}
      />

      <div className="w-full max-w-lg z-20">
        {/* Header block */}
        <div className="mb-5">
          <div
            className="text-3xl sm:text-4xl font-bold tracking-[0.12em]"
            style={{ color: "var(--lost-yellow)" }}
          >
            SYSTEM BOOT
          </div>
          <div
            className="text-xs tracking-widest mt-1.5"
            style={{ color: "var(--lost-muted)" }}
          >
            v1.0.404 — LOST MODE EDITION
          </div>
        </div>

        {/* Thin separator */}
        <div
          className="mb-5"
          style={{ height: 1, background: "var(--lost-muted)", opacity: 0.2 }}
        />

        {/* Boot lines */}
        <div className="space-y-0.5 min-h-[220px]">
          {LINES.slice(2).map((line, i) => {
            const globalIdx = i + 2;
            if (globalIdx >= visibleCount) return null;
            if (!line.text) return <div key={i} className="h-2.5" />;
            return (
              <div
                key={i}
                className="text-xs sm:text-sm leading-relaxed"
                style={{
                  color: line.color,
                  fontFamily: "var(--font-pixel), monospace",
                  fontWeight: line.bold ? "bold" : "normal",
                  letterSpacing: line.bold ? "0.08em" : "0.04em",
                }}
              >
                {line.text}
              </div>
            );
          })}

          {/* Blinking cursor */}
          {visibleCount > 0 && (
            <div className="flex items-center mt-1">
              <span
                className="inline-block w-[9px] h-[18px]"
                style={{
                  background: "var(--lost-cream)",
                  animation: "boot-cursor 1s step-end infinite",
                }}
              />
            </div>
          )}
        </div>

        {/* Progress bar — shown once "Loading..." line appears */}
        {showProgress && (
          <div className="mt-5">
            <div
              className="text-[10px] mb-1.5 tracking-[0.12em] uppercase"
              style={{ color: "var(--lost-muted)", fontFamily: "var(--font-pixel), monospace" }}
            >
              {progressFull ? "████████████████ 100% — nice." : "Loading portfolio..."}
            </div>
            <div
              className="w-full overflow-hidden"
              style={{
                height: 6,
                background: "var(--lost-primary)",
                border: "1px solid rgba(140,147,163,0.25)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "var(--lost-yellow)",
                  width: progressFull ? "100%" : "0%",
                  transition: progressFull ? "width 0.42s steps(16,end)" : "none",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Skip */}
      {canSkip && (
        <button
          onClick={skip}
          className="fixed bottom-8 right-8 text-[10px] px-4 py-2 z-20 tracking-widest transition-opacity hover:opacity-100 opacity-60"
          style={{
            color: "var(--lost-muted)",
            border: "1px solid rgba(140,147,163,0.3)",
            fontFamily: "var(--font-pixel), monospace",
            background: "transparent",
          }}
        >
          SKIP →
        </button>
      )}
    </div>
  );
}
