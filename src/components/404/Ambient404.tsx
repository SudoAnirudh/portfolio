"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import CRTOverlay from "./CRTOverlay";

interface QuoteItem {
  malayalam?: string;
  english: string;
}

const SARCASTIC_QUOTES: QuoteItem[] = [
  {
    malayalam: "വഴി തെറ്റിപ്പോയോ?",
    english: "Did you lose your way in God's Own Country?",
  },
  {
    malayalam: "KSRTC ബസ് പോലും ഇങ്ങോട്ട് വരില്ല!",
    english: "Even the KSRTC bus doesn't come to this 404 route.",
  },
  {
    malayalam: "നാട്ടുകാരോട് വഴി ചോദിച്ചു നോക്കൂ.",
    english: "Try asking a local Chettan at the junction for directions.",
  },
  {
    english: "Coding an AI fix for this broken URL... please stand by.",
  },
  {
    english: "404: Page Not Found. Prompting Claude to generate it.",
  },
  {
    english: "Error 404: The route was lost in latency.",
  },
];

/** Twinkling Stars — Mobile Optimized & Reduced Motion Aware */
function TwinklingStars({ isMobile, reducedMotion }: { isMobile: boolean; reducedMotion: boolean }) {
  const count = isMobile ? 20 : 40;
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (i * 23 + 7) % 100,
        y: (i * 41 + 13) % 55,
        size: i % 4 === 0 ? 3 : i % 2 === 0 ? 2 : 1,
        delay: (i * 0.3) % 4,
        opacity: 0.3 + ((i * 17) % 60) / 100,
      })),
    [count]
  );

  return (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-none pointer-events-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: i % 5 === 0 ? "#FACC15" : "#E2E8F0",
            opacity: s.opacity,
            animation: reducedMotion ? "none" : `star-twinkle ${2.5 + s.delay}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/** Periodic Diagonal Shooting Star ☄️ */
function ShootingStar({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) return null;
  return (
    <div
      className="absolute top-12 right-[20%] w-24 h-[2px] pointer-events-none z-2"
      style={{
        background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(56,189,248,0.9) 60%, rgba(255,255,255,1) 100%)",
        animation: "shooting-star 14s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        transformOrigin: "right center",
      }}
    />
  );
}

/** Glowing Golden & Cyan Fireflies (✨) */
function GlowingFireflies({ isMobile, reducedMotion }: { isMobile: boolean; reducedMotion: boolean }) {
  if (reducedMotion) return null;
  const count = isMobile ? 5 : 10;
  const fireflies = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (i * 10 + 5) % 90,
        y: 60 + (i * 8) % 30,
        delay: (i * 0.4) % 3,
        size: i % 3 === 0 ? 4 : 2,
        color: i % 2 === 0 ? "#FACC15" : "#38BDF8",
      })),
    [count]
  );

  return (
    <>
      {fireflies.map((f, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none z-10"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            background: f.color,
            boxShadow: `0 0 8px ${f.color}`,
            animation: `firefly-float ${3 + f.delay}s ease-in-out infinite`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </>
  );
}

function PixelMoon({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      className="absolute top-8 right-8 sm:right-24 pointer-events-none z-2"
      style={{ animation: reducedMotion ? "none" : "moon-glow 4s ease-in-out infinite" }}
    >
      <div
        className="w-14 h-14 sm:w-20 sm:h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, #FEF08A 0%, #F59E0B 55%, transparent 100%)",
          opacity: 0.85,
          boxShadow: "0 0 35px rgba(251,191,36,0.35)",
        }}
      />
    </div>
  );
}

/** Distant Floating Kerala Houseboat (Kettuvallam ⛵) */
function KeralaHouseboat({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      className="absolute bottom-24 left-0 pointer-events-none z-6"
      style={{
        animation: reducedMotion ? "none" : "houseboat-drift 52s linear infinite",
      }}
    >
      <svg
        width={96}
        height={40}
        viewBox="0 0 24 10"
        shapeRendering="crispEdges"
        className="opacity-80 drop-shadow-md"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="2" y="7" width="20" height="2" fill="#451A03" />
        <rect x="4" y="9" width="16" height="1" fill="#290E02" />
        <rect x="4" y="4" width="16" height="3" fill="#B45309" />
        <rect x="5" y="3" width="14" height="1" fill="#D97706" />
        <rect x="7" y="2" width="10" height="1" fill="#F59E0B" />
        <rect x="10" y="5" width="2" height="2" fill="#FEF08A" />
        <rect x="14" y="5" width="2" height="2" fill="#FEF08A" />
      </svg>
    </div>
  );
}

/** Interactive Pixel Coconut Palm Tree (Thenngu 🌴) with Touch & Mouse Parity */
function PixelCoconutTree({
  flip = false,
  onClick,
}: {
  flip?: boolean;
  onClick: () => void;
}) {
  const [dropping, setDropping] = useState(false);

  const handleAction = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (dropping) return;
    setDropping(true);
    onClick();
    setTimeout(() => setDropping(false), 1800);
  };

  return (
    <div
      onClick={handleAction}
      onTouchStart={handleAction}
      className="relative cursor-pointer group select-none touch-manipulation"
      aria-label="Interactive Kerala Coconut Palm Tree. Tap to knock down a coconut."
      role="button"
      tabIndex={0}
    >
      {/* Mobile-Friendly Interactive Hint Badge */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-950 text-[9px] font-bold px-2 py-0.5 border border-slate-950 opacity-80 group-hover:opacity-100 transition-opacity z-10 font-mono tracking-wider whitespace-nowrap shadow-sm">
        🌴 TAP TREE
      </div>

      {/* Falling Coconut Animation */}
      {dropping && (
        <div
          className="absolute left-8 top-12 z-20 pointer-events-none"
          style={{ animation: "coconut-drop 1.8s ease-in forwards" }}
        >
          <div className="w-4 h-4 bg-lime-700 rounded-full border border-lime-950 shadow-md flex items-center justify-center text-[8px]">
            🥥
          </div>
        </div>
      )}

      <svg
        width={150}
        height={280}
        viewBox="0 0 54 84"
        shapeRendering="crispEdges"
        className="opacity-95 drop-shadow-lg group-hover:scale-105 active:scale-95 transition-transform"
        style={{
          transform: flip ? "scaleX(-1)" : "none",
          imageRendering: "pixelated",
        }}
      >
        <rect x="22" y="74" width="8" height="10" fill="#3D2314" />
        <rect x="23" y="64" width="8" height="10" fill="#54331C" />
        <rect x="25" y="54" width="7" height="10" fill="#6E4426" />
        <rect x="27" y="44" width="7" height="10" fill="#54331C" />
        <rect x="29" y="34" width="6" height="10" fill="#6E4426" />
        <rect x="31" y="24" width="6" height="10" fill="#54331C" />
        <rect x="33" y="16" width="6" height="8"  fill="#6E4426" />

        <rect x="22" y="76" width="8" height="2" fill="#24130A" />
        <rect x="23" y="66" width="8" height="2" fill="#24130A" />
        <rect x="25" y="56" width="7" height="2" fill="#24130A" />
        <rect x="27" y="46" width="7" height="2" fill="#24130A" />
        <rect x="29" y="36" width="6" height="2" fill="#24130A" />

        <circle cx="32" cy="18" r="3.5" fill="#4D7C0F" />
        <circle cx="37" cy="19" r="3.5" fill="#3F6212" />
        <circle cx="34" cy="22" r="3.5" fill="#365314" />

        <path d="M34 16 C26 6, 12 4, 2 12" stroke="#15803D" strokeWidth="4" fill="none" />
        <path d="M34 16 C26 6, 12 4, 2 12" stroke="#4ADE80" strokeWidth="1.5" fill="none" />
        <polygon points="26,10 18,2 20,12" fill="#166534" />
        <polygon points="20,8 10,2 14,12" fill="#15803D" />

        <path d="M36 16 C44 6, 50 8, 54 16" stroke="#15803D" strokeWidth="4" fill="none" />
        <path d="M36 16 C44 6, 50 8, 54 16" stroke="#4ADE80" strokeWidth="1.5" fill="none" />
        <polygon points="40,10 48,2 44,12" fill="#166534" />

        <path d="M34 18 C20 18, 8 26, 0 38" stroke="#166534" strokeWidth="4" fill="none" />
        <polygon points="26,18 16,28 22,22" fill="#14532D" />

        <path d="M36 18 C46 22, 52 30, 54 44" stroke="#166534" strokeWidth="4" fill="none" />
        <polygon points="40,19 48,30 44,24" fill="#14532D" />

        <circle cx="35" cy="17" r="4" fill="#15803D" />
      </svg>
    </div>
  );
}

/** Pixel Campfire 🔥 */
function PixelCampfire({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative flex flex-col items-center select-none">
      {!reducedMotion && (
        <div className="absolute -top-8 flex gap-3 pointer-events-none z-10">
          {[0.1, 0.6, 1.1].map((delay, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-yellow-300 rounded-none shadow-sm"
              style={{
                animation: `pixel-float-up 2.2s ease-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          ))}
        </div>
      )}

      <svg
        width={56}
        height={64}
        viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        className={`filter drop-shadow-[0_0_14px_rgba(249,115,22,0.75)] ${reducedMotion ? "" : "animate-pulse"}`}
      >
        <rect x="7" y="2" width="2" height="4" fill="#EF4444" />
        <rect x="5" y="4" width="6" height="5" fill="#EF4444" />
        <rect x="6" y="5" width="4" height="5" fill="#F97316" />
        <rect x="5" y="7" width="6" height="3" fill="#F97316" />
        <rect x="7" y="6" width="2" height="4" fill="#F59E0B" />
        <rect x="6" y="8" width="4" height="3" fill="#FDE047" />
        <rect x="7" y="9" width="2" height="2" fill="#FEF08A" />
        <rect x="2" y="11" width="12" height="3" fill="#78350F" />
        <rect x="1" y="13" width="14" height="2" fill="#451A03" />
        <rect x="3" y="12" width="2" height="2" fill="#9A3412" />
        <rect x="11" y="12" width="2" height="2" fill="#9A3412" />
      </svg>

      <div
        className="w-36 h-6 rounded-full -mt-2 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(249,115,22,0.6) 0%, rgba(245,158,11,0.25) 60%, transparent 100%)",
        }}
      />
    </div>
  );
}

/** Developer Character Sitting & Coding on AI Laptop 💻 */
function AICodingCharacter({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {!reducedMotion && (
        <div className="absolute -top-7 left-3 flex gap-2 pointer-events-none z-10 font-mono text-[9px] text-cyan-300 font-bold">
          {[0.2, 0.9].map((delay, i) => (
            <div
              key={i}
              style={{
                animation: `pixel-float-up 2s ease-out infinite`,
                animationDelay: `${delay}s`,
              }}
            >
              {i === 0 ? ">_" : "{}"}
            </div>
          ))}
        </div>
      )}

      <svg
        width={68}
        height={80}
        viewBox="0 0 16 20"
        shapeRendering="crispEdges"
        className="inline-block drop-shadow-lg"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="5" y="1" width="6" height="3" fill="#1C1917" />
        <rect x="5" y="4" width="6" height="4" fill="#D97706" />
        <rect x="6" y="5" width="1" height="1" fill="#38BDF8" />
        <rect x="9" y="5" width="1" height="1" fill="#38BDF8" />
        <rect x="3" y="8" width="10" height="5" fill="#1E293B" />
        <rect x="6" y="8" width="4" height="5" fill="#0F172A" />
        <rect x="2" y="11" width="12" height="2" fill="#94A3B8" />
        <rect x="3" y="9" width="10" height="3" fill="#38BDF8" />
        <rect x="4" y="10" width="8" height="1" fill="#E0F2FE" />
        <rect x="2" y="13" width="12" height="4" fill="#0F172A" />
        <rect x="1" y="17" width="4" height="2" fill="#334155" />
        <rect x="11" y="17" width="4" height="2" fill="#334155" />
      </svg>

      <div
        className="w-16 h-2 rounded-full -mt-1 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(56,189,248,0.5) 0%, transparent 80%)",
        }}
      />
    </div>
  );
}

export default function Ambient404() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [toastText, setToastText] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkEnv = () => {
      setIsMobile(window.innerWidth < 640 || "ontouchstart" in window);
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
    };
    checkEnv();
    window.addEventListener("resize", checkEnv);
    return () => window.removeEventListener("resize", checkEnv);
  }, []);

  const cycleQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % SARCASTIC_QUOTES.length);
  };

  const triggerCoconutDrop = () => {
    const messages = [
      "Ouch! You knocked down a coconut 🥥 (Free coconut water!)",
      "Coconut dropped! Fresh Kerala Elaneer 🥥 unlocked.",
      "Watch your head! 🥥 A coconut fell from the tree.",
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setToastText(randomMsg);
    setTimeout(() => setToastText(null), 2500);
  };

  const currentQuote = SARCASTIC_QUOTES[quoteIdx];

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none flex flex-col justify-between custom-404-cursor"
      style={{
        background: "linear-gradient(180deg, #040817 0%, #0A1326 55%, #050B18 100%)",
        fontFamily: "var(--font-pixel), monospace",
      }}
    >
      {/* Sky & Atmospheric Particles */}
      <TwinklingStars isMobile={isMobile} reducedMotion={reducedMotion} />
      <ShootingStar reducedMotion={reducedMotion} />
      <PixelMoon reducedMotion={reducedMotion} />
      <GlowingFireflies isMobile={isMobile} reducedMotion={reducedMotion} />

      {/* Floating Kerala Houseboat (Kettuvallam ⛵) */}
      <KeralaHouseboat reducedMotion={reducedMotion} />

      {/* Kerala Coconut Palm Trees (Interactive with Touch & Mouse Parity) */}
      <div className="absolute bottom-28 left-0 z-5">
        <PixelCoconutTree onClick={triggerCoconutDrop} />
      </div>
      <div className="absolute bottom-28 right-0 z-5">
        <PixelCoconutTree flip onClick={triggerCoconutDrop} />
      </div>

      {/* Coconut Drop Toast Banner */}
      {toastText && (
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 bg-yellow-400 text-slate-950 font-bold text-xs sm:text-sm tracking-widest border-4 border-slate-950 shadow-[4px_4px_0_0_#000] animate-bounce"
        >
          {toastText}
        </div>
      )}

      {/* Kerala Backwater Lagoon Reflective Water Surface */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#050B18] border-t-2 border-[#162B45]">
        <div className="h-3 w-full bg-[#0D223A] opacity-75" />
        {!reducedMotion && (
          <div className="flex justify-around pt-3 opacity-30">
            <div className="w-24 h-0.5 bg-cyan-300 animate-pulse" />
            <div className="w-36 h-0.5 bg-yellow-200 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="w-20 h-0.5 bg-cyan-300 animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
        )}
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex flex-col items-center pt-8 sm:pt-14 text-center px-4">
        <div
          className="text-7xl sm:text-9xl font-bold tracking-widest leading-none text-yellow-400"
          style={{
            textShadow: "0 0 24px rgba(250,204,21,0.4), 4px 4px 0 rgba(0,0,0,0.8)",
          }}
        >
          404
        </div>
        <h1 className="text-lg sm:text-2xl tracking-[0.2em] text-cyan-300 mt-1 uppercase font-bold">
          DEBUGGING IN GOD&apos;S OWN COUNTRY 💻🌴
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 tracking-widest mt-1 max-w-md">
          Destination unreachable. Sitting by the campfire prompt-engineering a fix.
        </p>
      </div>

      {/* Centerpiece: Campfire, Character & Site-Consistent Speech Chrome */}
      <div className="relative z-10 flex flex-col items-center pb-24 px-4">
        {/* Site-Consistent Neubrutalist Speech Card with Malayalam + English Gloss */}
        <button
          onClick={cycleQuote}
          onTouchStart={cycleQuote}
          className="mb-5 px-5 py-3.5 bg-slate-900 border-4 border-slate-950 rounded-none text-left shadow-[6px_6px_0_0_#FACC15] max-w-xs sm:max-w-xl hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer group active:scale-98"
          title="Tap/Click to cycle quotes"
        >
          <div className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest mb-1">
            🤖 AI DEVELOPER // 404 LOG
          </div>

          {currentQuote.malayalam && (
            <div className="text-sm sm:text-base text-yellow-300 font-bold tracking-wide">
              &quot;{currentQuote.malayalam}&quot;
            </div>
          )}

          <div className="text-xs sm:text-sm text-slate-200 tracking-wide mt-0.5 font-medium">
            {currentQuote.malayalam ? `"${currentQuote.english}"` : `"${currentQuote.english}"`}
          </div>

          <span className="block text-[9px] text-slate-400 mt-2 uppercase tracking-widest group-hover:text-yellow-400 transition-colors">
            (tap / click to cycle thoughts 💬)
          </span>
        </button>

        {/* AI Coding Character + Pixel Campfire */}
        <div className="flex items-end gap-10 sm:gap-14">
          <AICodingCharacter reducedMotion={reducedMotion} />
          <PixelCampfire reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* 💥 HERO RECOVERY UX: Site-Consistent Dominant Navigation Bar (Item #4) */}
      <div className="relative z-20 pb-8 px-4 flex flex-col items-center text-center">
        <div className="p-4 bg-slate-950/80 border-4 border-slate-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.8)] backdrop-blur-md max-w-2xl w-full flex flex-col sm:flex-row justify-center items-center gap-3">
          {/* Primary Dominant Recovery Button */}
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-yellow-400 text-slate-950 font-bold text-sm sm:text-base tracking-widest border-4 border-slate-950 shadow-[4px_4px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#000] active:translate-x-[0px] active:translate-y-[0px] transition-all"
          >
            [ 🏠 RETURN HOME ]
          </Link>

          {/* Secondary Exit Options */}
          <Link
            href="/#projects"
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-slate-100 font-bold text-xs sm:text-sm tracking-widest border-4 border-slate-950 shadow-[4px_4px_0_0_#FACC15] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            [ 💻 VIEW PROJECTS ]
          </Link>

          <Link
            href="/#contact"
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-slate-100 font-bold text-xs sm:text-sm tracking-widest border-4 border-slate-950 shadow-[4px_4px_0_0_#FACC15] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            [ 📜 RESUME / CONTACT ]
          </Link>
        </div>
      </div>

      {/* CRT Scanline Overlay */}
      <CRTOverlay reducedMotion={reducedMotion} />
    </div>
  );
}
