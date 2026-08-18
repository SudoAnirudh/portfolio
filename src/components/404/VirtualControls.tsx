"use client";
import React, { useCallback } from "react";

interface VirtualControlsProps {
  onLeft: (active: boolean) => void;
  onRight: (active: boolean) => void;
  onJump: () => void;
  onInteract: () => void;
}

export default function VirtualControls({
  onLeft,
  onRight,
  onJump,
  onInteract,
}: VirtualControlsProps) {
  const makeTouch = useCallback(
    (fn: () => void, release?: () => void) => ({
      onTouchStart: (e: React.TouchEvent) => {
        e.preventDefault();
        fn();
      },
      onTouchEnd: (e: React.TouchEvent) => {
        e.preventDefault();
        release?.();
      },
      onMouseDown: (e: React.MouseEvent) => {
        e.preventDefault();
        fn();
      },
      onMouseUp: (e: React.MouseEvent) => {
        e.preventDefault();
        release?.();
      },
      onMouseLeave: (e: React.MouseEvent) => {
        e.preventDefault();
        release?.();
      },
    }),
    []
  );

  const btnBase: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    borderRadius: "6px",
    border: "2px solid var(--lost-muted)",
    background: "rgba(23,28,43,0.85)",
    color: "var(--lost-cream)",
    fontSize: "18px",
    fontFamily: "var(--font-pixel), monospace",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "none",
    cursor: "pointer",
    transition: "background 0.08s",
  };

  const activeStyle: React.CSSProperties = {
    background: "var(--lost-yellow)",
    color: "#000",
    borderColor: "var(--lost-yellow)",
  };

  return (
    <div
      className="absolute bottom-20 left-4 z-25 select-none"
      aria-label="Virtual game controls"
    >
      {/* D-pad */}
      <div className="relative w-[148px] h-[148px]">
        {/* Up / Jump */}
        <button
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={btnBase}
          aria-label="Jump"
          {...makeTouch(onJump)}
          onTouchStart={(e) => { e.preventDefault(); onJump(); }}
        >
          ▲
        </button>

        {/* Left */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2"
          style={btnBase}
          aria-label="Move left"
          {...makeTouch(
            () => onLeft(true),
            () => onLeft(false)
          )}
        >
          ◀
        </button>

        {/* Center / Interact */}
        <button
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ ...btnBase, background: "rgba(244,201,93,0.15)", borderColor: "var(--lost-yellow)" }}
          aria-label="Interact"
          {...makeTouch(onInteract)}
        >
          ●
        </button>

        {/* Right */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2"
          style={btnBase}
          aria-label="Move right"
          {...makeTouch(
            () => onRight(true),
            () => onRight(false)
          )}
        >
          ▶
        </button>

        {/* Down — no use in spec but nice to have */}
        <button
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ ...btnBase, opacity: 0.35 }}
          aria-label="Down"
          disabled
        >
          ▼
        </button>
      </div>

      {/* Label */}
      <div
        className="text-center mt-2 text-[9px] tracking-widest"
        style={{ color: "var(--lost-muted)", fontFamily: "var(--font-pixel), monospace" }}
      >
        ● = INTERACT
      </div>
    </div>
  );
}
