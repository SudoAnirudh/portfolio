"use client";
import React from "react";

interface GameHUDProps {
  discoveredCount: number;
  totalSecrets: number;
  isMobile: boolean;
}

export default function GameHUD({ discoveredCount, totalSecrets, isMobile }: GameHUDProps) {
  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-3 z-20"
        style={{
          background:
            "linear-gradient(180deg,rgba(4,6,15,0.98) 0%,rgba(4,6,15,0.8) 60%,rgba(4,6,15,0) 100%)",
          fontFamily: "var(--font-pixel), monospace",
        }}
      >
        {/* Left: OS label + secret badge */}
        <div className="flex items-center gap-3">
          <span
            className="text-sm sm:text-base tracking-[0.12em] font-bold"
            style={{ color: "var(--lost-cream)" }}
          >
            PORTFOLIO
          </span>
          {discoveredCount > 0 && (
            <span
              className="text-[9px] px-2 py-0.5 tracking-widest"
              style={{
                background: "var(--lost-green)",
                color: "#000",
                fontFamily: "var(--font-pixel), monospace",
              }}
            >
              {discoveredCount}/{totalSecrets} SECRETS
            </span>
          )}
        </div>

        {/* Right: blinking error pill */}
        <div
          className="flex items-center gap-2 px-3 py-1"
          style={{
            border: "1px solid rgba(255,107,107,0.35)",
            background: "rgba(255,107,107,0.08)",
          }}
        >
          <div
            className="w-1.5 h-1.5"
            style={{
              background: "var(--lost-red)",
              animation: "boot-cursor 1.4s step-end infinite",
            }}
          />
          <span
            className="text-[10px] sm:text-xs tracking-widest font-bold"
            style={{ color: "var(--lost-red)" }}
          >
            ERROR 404
          </span>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{
          background:
            "linear-gradient(0deg,rgba(4,6,15,0.98) 0%,rgba(4,6,15,0.8) 55%,rgba(4,6,15,0) 100%)",
          fontFamily: "var(--font-pixel), monospace",
        }}
      >
        {isMobile ? (
          /* Mobile: always-visible nav buttons */
          <div className="flex items-center justify-center gap-3 px-4 pb-4 pt-8">
            <NavBtn href="/" label="HOME" primary />
            <NavBtn href="/#projects" label="PROJECTS" />
            <NavBtn href="/#contact" label="RESUME" />
          </div>
        ) : (
          /* Desktop: keyboard hint strip */
          <div className="flex items-center justify-center pb-4 pt-8">
            <div
              className="flex items-center gap-5 text-[10px] tracking-widest px-5 py-2"
              style={{
                color: "var(--lost-muted)",
                border: "1px solid rgba(140,147,163,0.15)",
                background: "rgba(4,6,15,0.7)",
              }}
            >
              <HintGroup keys="← →" label="MOVE" />
              <Divider />
              <HintGroup keys="↑" label="JUMP" />
              <Divider />
              <HintGroup keys="↓" label="INTERACT" />
              <Divider />
              <HintGroup keys="ESC" label="MENU" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function HintGroup({ keys, label }: { keys: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <kbd
        className="px-1.5 py-0.5 text-[10px]"
        style={{
          color: "var(--lost-cream)",
          border: "1px solid rgba(232,228,217,0.35)",
          background: "rgba(232,228,217,0.06)",
          fontFamily: "var(--font-pixel), monospace",
        }}
      >
        {keys}
      </kbd>
      <span>{label}</span>
    </span>
  );
}

function Divider() {
  return (
    <span style={{ color: "rgba(140,147,163,0.3)" }}>|</span>
  );
}

function NavBtn({
  href,
  label,
  primary = false,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      className="text-[10px] sm:text-[11px] px-4 py-2 tracking-widest transition-all"
      style={{
        fontFamily: "var(--font-pixel), monospace",
        color: primary ? "#000" : "var(--lost-cream)",
        background: primary ? "var(--lost-yellow)" : "rgba(17,21,34,0.9)",
        border: `1px solid ${primary ? "var(--lost-yellow)" : "rgba(140,147,163,0.3)"}`,
        textDecoration: "none",
      }}
    >
      {primary ? `[ ${label} ]` : label}
    </a>
  );
}
