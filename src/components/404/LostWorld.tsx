"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import PixelCharacter, { CharState } from "./PixelCharacter";
import PixelNPC from "./PixelNPC";
import InteractiveObject from "./InteractiveObject";
import GameHUD from "./GameHUD";
import DialogueBox, { DialogueConfig } from "./DialogueBox";
import VirtualControls from "./VirtualControls";
import CRTOverlay from "./CRTOverlay";

// ─── Constants ────────────────────────────────────────────────────────────────

const GROUND_OFFSET = 160; // px from bottom of screen where feet land
const CHAR_W = 32;          // character display width in px
const CHAR_H = 64;          // character display height
const SPEED = 3;            // px per game frame
const JUMP_FORCE = 11;      // upward velocity on jump
const GRAVITY = 0.52;       // downward acceleration per frame
const PROXIMITY = 80;       // px radius for interact prompt

// Konami sequence
const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
];

// ─── Git Graveyard Object Catalogue ──────────────────────────────────────────

interface WorldObject {
  id: string;
  icon: string;
  label: string;
  xPct: number; // percent of viewport width
  messages: string[];
  navigate?: string;
  isSecret?: boolean;
}

const WORLD_OBJECTS: WorldObject[] = [
  {
    id: "rip_main",
    icon: "🪦",
    label: "RIP main",
    xPct: 10,
    messages: [
      "RIP main branch",
      "Force-pushed at 4:59 PM on a Friday without testing.",
      "Last words: 'It worked on my machine'.",
    ],
  },
  {
    id: "abandoned_idea",
    icon: "🪦",
    label: "abandoned_v2",
    xPct: 24,
    messages: [
      "abandoned_idea_v2",
      "Started with 100% enthusiasm, abandoned 48 hours later.",
      "Last commit: 3 years ago — 'initial setup'.",
    ],
  },
  {
    id: "projects",
    icon: "💻",
    label: "git log",
    xPct: 38,
    messages: [
      "git log --oneline",
      "Loading commits that actually made it to production...",
      "Navigating to Projects.",
    ],
    navigate: "/#projects",
  },
  {
    id: "ghost_nodemodules",
    icon: "👻",
    label: "node_modules",
    xPct: 56,
    messages: [
      "Ghost of node_modules — 780MB",
      "BOO! I contain 42,000 sub-dependencies for a left-pad function.",
      "Fear my disk space footprint.",
    ],
    isSecret: true,
  },
  {
    id: "todo_fix",
    icon: "🪦",
    label: "TODO (2021)",
    xPct: 70,
    messages: [
      "// TODO: refactor this code before launch",
      "Written in October 2021.",
      "Still here. Still untouched.",
    ],
  },
  {
    id: "resume",
    icon: "📜",
    label: "RESUME.TXT",
    xPct: 82,
    messages: [
      "CONTRIBUTORS.md / RESUME",
      "Evidence that I build real production software when I'm not in git graveyards.",
    ],
    navigate: "/#contact",
  },
  {
    id: "rebase_portal",
    icon: "🔮",
    label: "git rebase",
    xPct: 92,
    messages: [
      "GIT REBASE PORTAL",
      "> git rebase -i HEAD~10",
      "Rewriting commit history and returning to safety...",
    ],
    navigate: "/",
    isSecret: true,
  },
];

// NPC position (The Git Reaper)
const NPC_PCT = 46;

// Portal (right-edge secret trigger)
const PORTAL_THRESHOLD_PCT = 94;

// ─── Dialogue catalogue ──────────────────────────────────────────────────────

const DLG = {
  intro: {
    messages: [
      "Welcome to the Git Commit Graveyard...",
      "Where dead branches and unmerged PRs come to rest.",
      "Watch your step around the merge conflicts.",
    ],
  } as DialogueConfig,

  npcApproach: {
    speaker: "GIT REAPER",
    messages: ["Another lost soul in the commit history?", "Did you force push to main again?"],
  } as DialogueConfig,

  npcReply: {
    speaker: "ME",
    messages: ["I just entered an invalid URL..."],
  } as DialogueConfig,

  npcFinal: {
    speaker: "GIT REAPER",
    messages: [
      "Ah, the classic 404.",
      "Look for the glowing 'git rebase' portal on the right to rewrite history.",
      "Or inspect the tombstones for cautionary tales.",
    ],
  } as DialogueConfig,

  secretWall: {
    messages: [
      "SECRET GRAVEYARD CRYPT",
      "You stepped outside the repository bounds.",
      "+404 XP (Detached HEAD State)",
    ],
  } as DialogueConfig,

  konami: {
    messages: [
      "CHEAT CODE ACTIVATED.",
      "↑ ↑ ↓ ↓ ← → ← →",
      "git checkout -f main",
      "You bypassed all merge conflicts!",
    ],
  } as DialogueConfig,

  voidInteract: {
    messages: [
      "You inspected empty graveyard soil.",
      "Nothing buried here... yet.",
    ],
  } as DialogueConfig,
};

// ─── Graveyard Environment Background ────────────────────────────────────────

function Stars({ count = 35, reducedMotion }: { count?: number; reducedMotion: boolean }) {
  const stars = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (i * 37 + 11) % 100,
        y: (i * 53 + 7) % 50,
        size: i % 3 === 0 ? 2 : 1,
        delay: (i * 0.23) % 3,
        color: i % 4 === 0 ? "#64F6D4" : "var(--lost-cream)",
      })),
    [count]
  );

  return (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            opacity: 0.6,
            animation: reducedMotion
              ? "none"
              : `star-twinkle ${2 + s.delay}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </>
  );
}

function PixelMoon() {
  return (
    <div
      className="absolute top-8 right-12 sm:right-24 z-2 pointer-events-none"
      style={{ animation: "moon-glow 4s ease-in-out infinite" }}
    >
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, #64F6D4 0%, #3D7A7A 60%, rgba(100,246,212,0) 100%)",
          opacity: 0.85,
          boxShadow: "0 0 35px rgba(100,246,212,0.4)",
        }}
      />
    </div>
  );
}

function GraveyardBackground() {
  return (
    <div className="absolute bottom-0 left-0 right-0" style={{ height: "50%" }}>
      <svg
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Distant crypts & dead trees */}
        <polygon
          points="0,300 80,140 140,240 220,100 320,220 420,80 520,200 620,110 740,230 840,90 960,210 1080,120 1200,250 1200,300"
          fill="#0B0616"
        />
        {/* Mid graveyard hills */}
        <polygon
          points="0,300 100,180 200,260 340,150 480,250 600,160 700,240 840,130 960,220 1080,170 1200,240 1200,300"
          fill="#100A22"
        />
        {/* Foreground hill contours */}
        <polygon
          points="0,300 120,220 240,270 380,190 520,270 660,210 780,260 920,180 1060,250 1200,220 1200,300"
          fill="#0E0F20"
        />
      </svg>
    </div>
  );
}

function GraveyardGround() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0"
      style={{ height: GROUND_OFFSET }}
    >
      {/* Deep soil */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: GROUND_OFFSET, background: "#0A0B14" }}
      />

      {/* Spooky stone tiles */}
      <div
        className="absolute left-0 right-0 flex"
        style={{ bottom: GROUND_OFFSET - 32, height: 20, overflow: "hidden" }}
      >
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 auto",
              width: "2.6%",
              height: "100%",
              background: i % 2 === 0 ? "#121422" : "#0D0E1A",
              borderRight: "1px solid rgba(0,0,0,0.7)",
            }}
          />
        ))}
      </div>

      {/* Soil accent dots */}
      <div
        className="absolute left-0 right-0 flex gap-4 px-6"
        style={{ bottom: GROUND_OFFSET - 56, opacity: 0.5 }}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            style={{
              width: i % 4 === 0 ? 5 : 3,
              height: i % 4 === 0 ? 5 : 3,
              background: i % 5 === 0 ? "#64F6D4" : "#2A2D45",
            }}
          />
        ))}
      </div>

      {/* Graveyard grass top strip */}
      <div
        className="absolute left-0 right-0"
        style={{ bottom: GROUND_OFFSET - 2, height: 3, background: "#3A5C5C" }}
      />
      {/* Grass body */}
      <div
        className="absolute left-0 right-0"
        style={{ bottom: GROUND_OFFSET - 10, height: 8, background: "#1F3838" }}
      />
      {/* Pixel grass teeth */}
      <div
        className="absolute left-0 right-0 flex"
        style={{ bottom: GROUND_OFFSET - 18, height: 8, overflow: "hidden" }}
      >
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 auto",
              width: "1.3%",
              height: i % 3 === 0 ? "100%" : "55%",
              alignSelf: "flex-end",
              background: i % 3 === 0
                ? "#64F6D4"
                : i % 2 === 0
                ? "#1F3838"
                : "transparent",
              opacity: i % 3 === 0 ? 0.7 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function FogLayer() {
  return (
    <div
      className="absolute left-0 right-0 pointer-events-none z-8"
      style={{
        bottom: GROUND_OFFSET - 10,
        height: 60,
        background: "linear-gradient(180deg, rgba(100,246,212,0) 0%, rgba(100,246,212,0.08) 50%, rgba(100,246,212,0) 100%)",
        animation: "fog-drift 12s ease-in-out infinite",
      }}
    />
  );
}

function XPPopup({ x }: { x: number }) {
  return (
    <div
      className="absolute pointer-events-none z-30 flex flex-col items-center gap-0.5"
      style={{
        left: x,
        bottom: GROUND_OFFSET + 80,
        transform: "translateX(-50%)",
        animation: "xp-float 2s ease-out forwards",
        fontFamily: "var(--font-pixel), monospace",
      }}
    >
      <span
        className="font-bold text-base tracking-widest"
        style={{ color: "#64F6D4", textShadow: "0 0 10px #64F6D4" }}
      >
        +404 XP (Detached HEAD)
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LostWorld() {
  const router = useRouter();

  // ── Detect environment ──
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // ── Computed object positions (px) ──
  const [objPositions, setObjPositions] = useState<Record<string, number>>({});
  const [npcX, setNpcX] = useState(0);

  // ── Character render state ──
  const [charPos, setCharPos] = useState({ x: 0, y: 0 });
  const [charState, setCharState] = useState<CharState>("idle");
  const [charDir, setCharDir] = useState<"left" | "right">("right");

  // ── Interaction state ──
  const [dialogue, setDialogue] = useState<DialogueConfig | null>(null);
  const [nearObject, setNearObject] = useState<string | null>(null);
  const [nearNPC, setNearNPC] = useState(false);
  const [npcPhase, setNpcPhase] = useState<0 | 1 | 2>(0);
  const [discoveredSecrets, setDiscoveredSecrets] = useState<Set<string>>(new Set());
  const [showXP, setShowXP] = useState(false);

  // ── Game loop refs ──
  const keysRef = useRef<Set<string>>(new Set());
  const charXRef = useRef(0);
  const charYRef = useRef(0);
  const velYRef = useRef(0);
  const isGroundedRef = useRef(true);
  const dialogueActiveRef = useRef(false);
  const rafRef = useRef<number>(0);
  const konamiBufferRef = useRef<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const discoveredRef = useRef<Set<string>>(new Set());
  const npcPhaseRef = useRef<0 | 1 | 2>(0);
  const objPosRef = useRef<Record<string, number>>({});
  const npcXRef = useRef(0);

  // ── Init on mount ──
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);

    const w = window.innerWidth;
    const startX = w * 0.35;
    charXRef.current = startX;
    setCharPos({ x: startX, y: 0 });

    const positions: Record<string, number> = {};
    WORLD_OBJECTS.forEach((obj) => {
      positions[obj.id] = (w * obj.xPct) / 100;
    });
    setObjPositions(positions);
    objPosRef.current = positions;

    const npc = (w * NPC_PCT) / 100;
    setNpcX(npc);
    npcXRef.current = npc;

    setIsReady(true);

    // Intro dialogue after 800ms
    const t = setTimeout(() => {
      setCharState("confused");
      dialogueActiveRef.current = true;
      setDialogue(DLG.intro);
    }, 800);

    return () => clearTimeout(t);
  }, []);

  // ── Keyboard listeners ──
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);

      // Konami tracker
      konamiBufferRef.current.push(e.key);
      if (konamiBufferRef.current.length > KONAMI.length) {
        konamiBufferRef.current.shift();
      }
      if (
        konamiBufferRef.current.length === KONAMI.length &&
        konamiBufferRef.current.every((k, i) => k === KONAMI[i])
      ) {
        if (!discoveredRef.current.has("konami")) {
          discoveredRef.current = new Set([...discoveredRef.current, "konami"]);
          setDiscoveredSecrets(new Set(discoveredRef.current));
          dialogueActiveRef.current = true;
          setDialogue(DLG.konami);
          setCharState("celebrating");
        }
        konamiBufferRef.current = [];
      }

      if (e.key === "ArrowDown" && !dialogueActiveRef.current) {
        handleInteract();
      }

      if (e.key === "Escape" && dialogueActiveRef.current) {
        closeDlg();
      }
    };

    const onUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Interaction handler ──
  const handleInteract = useCallback(() => {
    if (dialogueActiveRef.current) return;

    // NPC check
    if (Math.abs(charXRef.current - npcXRef.current) < PROXIMITY) {
      const phase = npcPhaseRef.current;
      if (phase === 0) {
        dialogueActiveRef.current = true;
        setDialogue(DLG.npcApproach);
        npcPhaseRef.current = 1;
        setNpcPhase(1);
      } else if (phase === 1) {
        dialogueActiveRef.current = true;
        setDialogue(DLG.npcReply);
        npcPhaseRef.current = 2;
        setNpcPhase(2);
      } else {
        dialogueActiveRef.current = true;
        setDialogue(DLG.npcFinal);
      }
      return;
    }

    // Objects check
    for (const obj of WORLD_OBJECTS) {
      const objX = objPosRef.current[obj.id];
      if (objX !== undefined && Math.abs(charXRef.current - objX) < PROXIMITY) {
        const dlgConfig: DialogueConfig = {
          speaker: obj.label,
          messages: obj.messages,
          onNavigate: obj.navigate,
        };

        if (obj.isSecret && !discoveredRef.current.has(obj.id)) {
          discoveredRef.current = new Set([...discoveredRef.current, obj.id]);
          setDiscoveredSecrets(new Set(discoveredRef.current));
        }

        dialogueActiveRef.current = true;
        setDialogue(dlgConfig);
        setCharState("interacting");
        return;
      }
    }

    if (!dialogueActiveRef.current) {
      dialogueActiveRef.current = true;
      setDialogue(DLG.voidInteract);
      setCharState("confused");
    }
  }, []);

  // Mobile virtual control handlers
  const handleMobileLeft = useCallback((active: boolean) => {
    if (active) keysRef.current.add("ArrowLeft");
    else keysRef.current.delete("ArrowLeft");
  }, []);

  const handleMobileRight = useCallback((active: boolean) => {
    if (active) keysRef.current.add("ArrowRight");
    else keysRef.current.delete("ArrowRight");
  }, []);

  const handleMobileJump = useCallback(() => {
    if (isGroundedRef.current && !dialogueActiveRef.current) {
      velYRef.current = JUMP_FORCE;
      isGroundedRef.current = false;
    }
  }, []);

  const closeDlg = useCallback(() => {
    dialogueActiveRef.current = false;
    setDialogue(null);
    setCharState("idle");
  }, []);

  const handleNavigate = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );

  // ── Game loop (RAF) ──
  useEffect(() => {
    if (!isReady) return;

    const tick = () => {
      if (dialogueActiveRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const keys = keysRef.current;
      const containerW = containerRef.current?.offsetWidth ?? window.innerWidth;

      let dx = 0;
      let newDir: "left" | "right" = charDir;
      let moving = false;

      if (keys.has("ArrowLeft")) { dx = -SPEED; newDir = "left"; moving = true; }
      if (keys.has("ArrowRight")) { dx = SPEED;  newDir = "right"; moving = true; }

      if ((keys.has("ArrowUp") || keys.has(" ")) && isGroundedRef.current) {
        velYRef.current = JUMP_FORCE;
        isGroundedRef.current = false;
      }

      if (!isGroundedRef.current) {
        velYRef.current -= GRAVITY;
        charYRef.current += velYRef.current;
        if (charYRef.current <= 0) {
          charYRef.current = 0;
          velYRef.current = 0;
          isGroundedRef.current = true;
        }
      }

      charXRef.current = Math.max(
        0,
        Math.min(containerW - CHAR_W, charXRef.current + dx)
      );

      let nextState: CharState = "idle";
      if (!isGroundedRef.current) nextState = "jumping";
      else if (moving) nextState = "walking";

      let nearObj: string | null = null;
      for (const [id, ox] of Object.entries(objPosRef.current)) {
        if (Math.abs(charXRef.current - ox) < PROXIMITY) {
          nearObj = id;
          break;
        }
      }
      const closeToNPC = Math.abs(charXRef.current - npcXRef.current) < PROXIMITY;

      // Secret wall trigger
      const portalThresholdX = containerW * (PORTAL_THRESHOLD_PCT / 100);
      if (
        charXRef.current > portalThresholdX &&
        !discoveredRef.current.has("wall")
      ) {
        discoveredRef.current = new Set([...discoveredRef.current, "wall"]);
        setDiscoveredSecrets(new Set(discoveredRef.current));
        dialogueActiveRef.current = true;
        setDialogue(DLG.secretWall);
        setShowXP(true);
        setTimeout(() => setShowXP(false), 2200);
      }

      setCharPos({ x: charXRef.current, y: charYRef.current });
      setCharState(nextState);
      if (newDir !== charDir) setCharDir(newDir);
      setNearObject(nearObj);
      setNearNPC(closeToNPC);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, charDir]);

  const totalSecrets = 3; // ghost_nodemodules, rebase_portal, wall

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden select-none"
      style={{
        background: `linear-gradient(180deg, #090514 0%, #0D1626 60%, #0A0B14 100%)`,
        fontFamily: "var(--font-pixel), monospace",
      }}
      role="main"
      aria-label="404 Git Graveyard game scene"
    >
      {/* Stars */}
      <Stars reducedMotion={reducedMotion} />

      {/* Pixel Moon */}
      <PixelMoon />

      {/* Graveyard Mountains & Crypt Background */}
      <GraveyardBackground />

      {/* Fog Layer */}
      <FogLayer />

      {/* ── 404 Zone Header ── */}
      <div
        className="absolute flex flex-col items-center"
        style={{
          left: "50%",
          top: "11%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        <div
          className="text-[84px] sm:text-[116px] leading-none font-bold tracking-widest"
          style={{
            color: "var(--lost-red)",
            textShadow:
              "0 0 20px rgba(255,107,107,0.6), 0 0 50px rgba(255,107,107,0.2), 4px 4px 0 rgba(0,0,0,0.9)",
            letterSpacing: "0.12em",
            fontFamily: "var(--font-pixel), monospace",
          }}
        >
          404
        </div>
        <div
          className="text-xs sm:text-base tracking-[0.35em] mt-0 uppercase"
          style={{ color: "#64F6D4", textShadow: "0 0 8px rgba(100,246,212,0.4)" }}
        >
          GIT COMMIT GRAVEYARD
        </div>
        <div
          className="mt-2 mb-1.5 w-44 sm:w-60"
          style={{ height: 1, background: "#64F6D4", opacity: 0.25 }}
        />
        <div
          className="text-[9px] sm:text-[10px] tracking-widest uppercase"
          style={{ color: "var(--lost-muted)", fontFamily: "var(--font-pixel), monospace" }}
        >
          detached HEAD state — 0 commits found
        </div>
      </div>

      {/* Ground */}
      <GraveyardGround />

      {/* Floating Ghost Wisps */}
      {!reducedMotion &&
        [1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${15 + i * 22}%`,
              bottom: GROUND_OFFSET + 30 + i * 12,
              width: 6,
              height: 6,
              background: "#64F6D4",
              boxShadow: "0 0 8px #64F6D4",
              opacity: 0.5,
              animation: `ghost-wisp ${2.5 + i * 0.6}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}

      {/* World Objects / Tombstones */}
      {isReady &&
        WORLD_OBJECTS.map((obj) => (
          <InteractiveObject
            key={obj.id}
            label={obj.label}
            icon={obj.icon}
            isNear={nearObject === obj.id}
            x={objPositions[obj.id] ?? 0}
            secret={obj.isSecret}
          />
        ))}

      {/* Git Reaper Ghost NPC */}
      {isReady && (
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: npcX,
            bottom: GROUND_OFFSET,
            transform: "translateX(-50%)",
          }}
        >
          {nearNPC && (
            <div
              className="mb-1 text-[10px] tracking-widest"
              style={{
                color: "#64F6D4",
                animation: "interact-pulse 0.8s ease-in-out infinite",
              }}
            >
              ↓ TALK
            </div>
          )}
          <PixelNPC scale={3} variant="ghost" />
          <div
            className="mt-1 text-[9px] tracking-widest px-2 py-0.5"
            style={{
              color: "#64F6D4",
              border: "1px solid rgba(100,246,212,0.4)",
              background: "rgba(11,6,22,0.9)",
            }}
          >
            GIT REAPER
          </div>
        </div>
      )}

      {/* Player Character */}
      {isReady && (
        <div
          className="absolute"
          style={{
            left: charPos.x,
            bottom: GROUND_OFFSET + charPos.y,
            transition: "none",
            zIndex: 10,
          }}
          aria-label="Your character"
        >
          <PixelCharacter
            state={dialogue ? "interacting" : charState}
            direction={charDir}
            scale={4}
          />
        </div>
      )}

      {/* XP Popup */}
      {showXP && <XPPopup x={charPos.x} />}

      {/* Dialogue Box */}
      {dialogue && (
        <DialogueBox
          config={dialogue}
          onClose={closeDlg}
          onNavigate={handleNavigate}
        />
      )}

      {/* HUD */}
      <GameHUD
        discoveredCount={discoveredSecrets.size}
        totalSecrets={totalSecrets}
        isMobile={isMobile}
      />

      {/* Mobile Controls */}
      {isMobile && !dialogue && (
        <VirtualControls
          onLeft={handleMobileLeft}
          onRight={handleMobileRight}
          onJump={handleMobileJump}
          onInteract={handleInteract}
        />
      )}

      {/* CRT Scanline Overlay */}
      <CRTOverlay reducedMotion={reducedMotion} />
    </div>
  );
}
