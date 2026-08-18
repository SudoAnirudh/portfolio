"use client";
import React from "react";

interface CRTOverlayProps {
  reducedMotion?: boolean;
}

/**
 * Layered CRT effect:
 * 1. Scanlines  — repeating horizontal lines at 4px pitch
 * 2. Vignette   — darkened edges via radial gradient
 * 3. RGB fringe — subtle chromatic aberration (screen blend)
 * 4. Flicker    — very slow opacity variation keyframe
 */
export default function CRTOverlay({ reducedMotion = false }: CRTOverlayProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {/* 1. Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.13) 2px, rgba(0,0,0,0.13) 4px)",
        }}
      />

      {/* 2. Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* 3. RGB fringe (subtle) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,0,0,0.025) 0%, transparent 45%, rgba(0,0,255,0.025) 100%)",
          mixBlendMode: "screen",
        }}
      />

      {/* 4. Flicker (skip for reduced motion) */}
      {!reducedMotion && (
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(0,0,0,0.02)",
            animation: "crt-flicker 7s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}
