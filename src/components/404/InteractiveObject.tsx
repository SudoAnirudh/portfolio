"use client";
import React from "react";

interface InteractiveObjectProps {
  /** Display label shown below object */
  label: string;
  /** Emoji or text icon rendered above label */
  icon: string;
  /** Whether the player is close enough to interact */
  isNear: boolean;
  /** Pixel x-position in the world */
  x: number;
  /** Height from ground in px (default 0 = sits on ground) */
  groundOffset?: number;
  /** Whether to add a highlight pulse (for easter-egg hidden objects) */
  secret?: boolean;
}

export default function InteractiveObject({
  label,
  icon,
  isNear,
  x,
  groundOffset = 0,
  secret = false,
}: InteractiveObjectProps) {
  return (
    <div
      className="absolute flex flex-col items-center select-none"
      style={{
        left: x,
        bottom: 160 + groundOffset, // GROUND_OFFSET constant mirrored
        transform: "translateX(-50%)",
        transition: "none",
      }}
    >
      {/* ↓ interact hint — only when player is near */}
      {isNear && (
        <div
          className="mb-1 text-[10px] tracking-widest font-bold"
          style={{
            color: "var(--lost-yellow)",
            fontFamily: "var(--font-pixel), monospace",
            animation: "interact-pulse 0.8s ease-in-out infinite",
          }}
        >
          ↓ INTERACT
        </div>
      )}

      {/* Object icon */}
      <div
        className="text-2xl sm:text-3xl leading-none"
        style={{
          filter: secret && !isNear ? "brightness(0.3) saturate(0)" : "none",
          transition: "filter 0.3s",
          imageRendering: "pixelated",
        }}
        title={secret && !isNear ? "???" : label}
      >
        {secret && !isNear ? "▪" : icon}
      </div>

      {/* Label sign */}
      <div
        className="mt-1 px-2 py-0.5 text-center rounded-sm"
        style={{
          background: isNear ? "var(--lost-yellow)" : "var(--lost-panel)",
          color: isNear ? "#000" : "var(--lost-muted)",
          border: `1px solid ${isNear ? "var(--lost-yellow)" : "var(--lost-muted)"}`,
          fontFamily: "var(--font-pixel), monospace",
          fontSize: "9px",
          letterSpacing: "0.08em",
          minWidth: "60px",
          textAlign: "center",
          transition: "background 0.15s, color 0.15s",
          whiteSpace: "nowrap",
          opacity: secret && !isNear ? 0.25 : 1,
          animation: secret && !isNear ? "none" : undefined,
        }}
      >
        {secret && !isNear ? "???" : label}
      </div>
    </div>
  );
}
