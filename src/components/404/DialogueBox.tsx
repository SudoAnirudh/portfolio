"use client";
import React, { useState, useEffect, useCallback } from "react";

export interface DialogueConfig {
  speaker?: string;
  messages: string[];
  onNavigate?: string;
}

interface DialogueBoxProps {
  config: DialogueConfig;
  onClose: () => void;
  onNavigate?: (url: string) => void;
}

const TYPEWRITER_SPEED = 22; // ms per character

export default function DialogueBox({ config, onClose, onNavigate }: DialogueBoxProps) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  const current = config.messages[msgIdx] ?? "";

  useEffect(() => {
    setDisplayed("");
    setTyping(true);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(current.slice(0, i));
      if (i >= current.length) {
        setTyping(false);
        clearInterval(id);
      }
    }, TYPEWRITER_SPEED);
    return () => clearInterval(id);
  }, [msgIdx, current]);

  const advance = useCallback(() => {
    if (typing) {
      setDisplayed(current);
      setTyping(false);
      return;
    }
    const isLast = msgIdx >= config.messages.length - 1;
    if (isLast) {
      if (config.onNavigate && onNavigate) onNavigate(config.onNavigate);
      onClose();
    } else {
      setMsgIdx((p) => p + 1);
    }
  }, [typing, msgIdx, config, current, onClose, onNavigate]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["Enter", " ", "z", "Z", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        advance();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advance, onClose]);

  const isLast = msgIdx >= config.messages.length - 1;

  return (
    <div
      className="absolute left-1/2 w-[92%] max-w-[480px] z-30"
      style={{
        bottom: "190px",
        transform: "translateX(-50%)",
        animation: "dialogue-slide-in 0.15s ease-out",
        fontFamily: "var(--font-pixel), monospace",
      }}
    >
      {/* Pointer triangle */}
      <div
        className="absolute -top-[11px] left-8"
        style={{
          width: 0,
          height: 0,
          borderLeft: "9px solid transparent",
          borderRight: "9px solid transparent",
          borderBottom: "11px solid var(--lost-yellow)",
        }}
      />
      <div
        className="absolute -top-[8px] left-[34px]"
        style={{
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "10px solid var(--lost-panel)",
        }}
      />

      {/* Box */}
      <div
        className="p-4 sm:p-5"
        style={{
          background: "var(--lost-panel)",
          border: "2px solid var(--lost-yellow)",
          boxShadow: "0 0 0 1px rgba(244,201,93,0.12), 6px 6px 0 rgba(0,0,0,0.7)",
        }}
      >
        {/* Speaker tag */}
        {config.speaker && (
          <div
            className="inline-block text-[10px] font-bold px-2 py-0.5 mb-3 tracking-widest"
            style={{ background: "var(--lost-yellow)", color: "#000" }}
          >
            {config.speaker}
          </div>
        )}

        {/* Message */}
        <p
          className="text-sm leading-relaxed min-h-[2.5rem] tracking-wide"
          style={{ color: "var(--lost-cream)" }}
        >
          {displayed}
          {typing && (
            <span
              className="inline-block w-[2px] h-[14px] ml-[2px] translate-y-[2px]"
              style={{
                background: "var(--lost-cream)",
                animation: "boot-cursor 0.5s step-end infinite",
              }}
            />
          )}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {config.messages.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === msgIdx ? 12 : 5,
                  height: 3,
                  background:
                    i === msgIdx
                      ? "var(--lost-yellow)"
                      : i < msgIdx
                      ? "var(--lost-green)"
                      : "var(--lost-muted)",
                  opacity: i === msgIdx ? 1 : 0.45,
                  transition: "width 0.15s, background 0.15s",
                }}
              />
            ))}
          </div>

          {/* Action button */}
          <button
            onClick={advance}
            className="text-[10px] px-3 py-1.5 tracking-widest transition-colors"
            style={{
              color: "var(--lost-yellow)",
              border: "1px solid rgba(244,201,93,0.5)",
              background: "transparent",
              fontFamily: "var(--font-pixel), monospace",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(244,201,93,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
            }}
          >
            {typing
              ? "SKIP ▷"
              : isLast && config.onNavigate
              ? "GO →"
              : isLast
              ? "CLOSE ✕"
              : "NEXT ▶"}
          </button>
        </div>
      </div>
    </div>
  );
}
