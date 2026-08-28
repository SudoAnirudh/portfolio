"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { portfolioData } from "@/data/portfolio";

type Fragment = {
  id: string;
  label: string;
  icon: string;
  detail: string;
  href: string;
  image?: string;
  position: string;
  tone: "cream" | "blue" | "yellow" | "ink";
};

const fragments: Fragment[] = [
  { id: "home", label: "HOME", icon: "↗", detail: "the way back", href: "/", position: "fragment-home", tone: "yellow" },
  { id: "projects", label: "PROJECTS", icon: "▧", detail: "proof of work", href: "/#projects", image: portfolioData.projects[0].image, position: "fragment-projects", tone: "cream" },
  { id: "about", label: "ABOUT", icon: "✦", detail: "identity / summary", href: "/#about", position: "fragment-about", tone: "blue" },
  { id: "experience", label: "EXPERIENCE", icon: "—", detail: "career history", href: "/#experience", position: "fragment-experience", tone: "ink" },
  { id: "contact", label: "CONTACT", icon: "@", detail: "open a channel", href: "/#contact", position: "fragment-contact", tone: "cream" },
];

const fragmentVariants: Variants = {
  rest: { scale: 1, rotate: 0, y: 0 },
  hover: { scale: 1.045, rotate: -1, y: -6, transition: { duration: 0.25 } },
  caught: { scale: 0.82, opacity: 0, x: 34, y: 20, transition: { duration: 0.45 } },
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function FallingCharacter({ caught, reducedMotion, onClick }: { caught: boolean; reducedMotion: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      className={`fell-character ${caught ? "is-catching" : ""}`}
      onClick={onClick}
      aria-label="Look at the falling character"
      animate={reducedMotion ? undefined : { y: [0, 9, 0], rotate: [-3, 2, -3] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      whileHover={reducedMotion ? undefined : { scale: 1.05, rotate: 4 }}
    >
      <span className="character-shadow" />
      <svg viewBox="0 0 150 190" aria-hidden="true">
        <path className="character-backpack" d="M92 72c25 2 33 17 29 47l-7 35-26-5 4-77Z" />
        <path className="character-leg" d="m70 137 10 37-19 9-19-39Z" />
        <path className="character-leg character-leg-right" d="m87 138 25 28-14 14-30-30Z" />
        <path className="character-shoe" d="m42 174 20-9 10 12-24 12c-12 1-15-8-6-15Z" />
        <path className="character-shoe" d="m97 170 15-7 16 10c2 8-8 13-16 7l-15 2Z" />
        <path className="character-shirt" d="M45 79c12-13 34-14 50-2l4 49-16 12-35-6-10-34Z" />
        <path className="character-arm" d="M48 84 22 105l-11-13 31-32c9-3 13 15 6 24Z" />
        <path className="character-arm character-arm-right" d="m91 80 30 18-7 17-36-18c-5-8 4-20 13-17Z" />
        <path className="character-neck" d="M60 65h21v20H60Z" />
        <path className="character-face" d="M48 28c8-19 38-23 51-4l-4 41c-16 15-41 7-49-9Z" />
        <path className="character-hair" d="M47 40c-5-21 10-39 31-39 18 0 29 13 27 31-8-8-17-12-26-10-10 2-18 13-32 18Z" />
        <circle cx="67" cy="47" r="2.5" className="character-eye" />
        <circle cx="85" cy="45" r="2.5" className="character-eye" />
        <path d="M72 59c5 3 9 3 13-1" className="character-mouth" />
        <path d="M55 87 82 82l4 40-29 3Z" className="character-laptop" />
        <path d="m57 121 32-2 12 9-45 4Z" className="character-laptop-base" />
      </svg>
    </motion.button>
  );
}

function SceneBackground({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="fell-background" aria-hidden="true">
      <div className="fell-orbit fell-orbit-one" />
      <div className="fell-orbit fell-orbit-two" />
      <div className="fell-haze fell-haze-one" />
      <div className="fell-haze fell-haze-two" />
      <div className={`fell-dust ${reducedMotion ? "is-still" : ""}`}>
        {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ "--i": index } as CSSProperties} />)}
      </div>
    </div>
  );
}

function FloatingFragment({ fragment, caught, onSelect, reducedMotion }: { fragment: Fragment; caught: boolean; onSelect: (fragment: Fragment) => void; reducedMotion: boolean }) {
  return (
    <motion.button
      type="button"
      className={`floating-fragment ${fragment.position} fragment-${fragment.tone} ${caught ? "is-caught" : ""}`}
      variants={fragmentVariants}
      initial="rest"
      whileHover={reducedMotion ? undefined : "hover"}
      animate={caught ? "caught" : "rest"}
      onClick={() => onSelect(fragment)}
      aria-label={`Grab ${fragment.label}. ${fragment.detail}.`}
    >
      {fragment.image && <Image src={fragment.image} alt="" width={190} height={67} />}
      <span className="fragment-topline"><b>{fragment.icon}</b><small>FRAGMENT / 0{fragments.indexOf(fragment) + 1}</small></span>
      <span className="fragment-label">{fragment.label}</span>
      <span className="fragment-detail">{fragment.detail}</span>
      <span className="fragment-action">GRAB <span aria-hidden="true">↘</span></span>
    </motion.button>
  );
}

export default function FellOut404() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [caught, setCaught] = useState<string | null>(null);
  const [message, setMessage] = useState("Find the way back.");
  const [portalOpen, setPortalOpen] = useState(false);
  const [numberClicks, setNumberClicks] = useState(0);
  const [isFalling, setIsFalling] = useState(true);

  const navigate = (fragment: Fragment) => {
    setCaught(fragment.id);
    setMessage(fragment.id === "home" ? "There it is. Hold on." : `Found something: ${fragment.label.toLowerCase()}.`);
    if (fragment.id === "home") {
      setPortalOpen(true);
      window.setTimeout(() => router.push(fragment.href), reducedMotion ? 0 : 1050);
    }
  };

  return (
    <main
      className={`fell-page ${portalOpen ? "portal-opening" : ""}`}
      onPointerMove={(event) => {
        if (reducedMotion) return;
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        setPointer({ x, y });
      }}
    >
      <SceneBackground reducedMotion={reducedMotion} />
      <motion.div className="fell-depth fell-depth-back" animate={reducedMotion ? undefined : { x: pointer.x * -10, y: pointer.y * -7 }} />
      <motion.div className="fell-depth fell-depth-mid" animate={reducedMotion ? undefined : { x: pointer.x * -20, y: pointer.y * -14 }} />

      <div className="fell-header">
        <Link href="/" className="fell-brand" aria-label="Anirudh S home">ANIRUDH S <span>AI / ML ENGINEER</span></Link>
        <span className="fell-status"><i /> OPEN FOR AI / ML ROLES</span>
      </div>

      <section className="fell-copy" aria-labelledby="fell-title">
        <button type="button" className={`fell-number ${numberClicks > 0 ? "number-touched" : ""}`} onClick={() => setNumberClicks((clicks) => clicks + 1)} aria-label="404, interactive number">
          404
        </button>
        <p className="fell-kicker">YOU ARE SOMEWHERE ELSE</p>
        <h1 id="fell-title">I think I fell<br /><em>out of the website.</em></h1>
        <p className="fell-description">Somewhere between the homepage and wherever you were trying to go, things got a little... disconnected.</p>
        <p className="fell-message" aria-live="polite">{numberClicks > 1 ? "I warned you." : message}</p>
      </section>

      <div className="fell-fragments" aria-label="Portfolio fragments">
        {fragments.map((fragment) => <FloatingFragment key={fragment.id} fragment={fragment} caught={caught === fragment.id} onSelect={navigate} reducedMotion={reducedMotion} />)}
      </div>

      <FallingCharacter caught={caught === "home"} reducedMotion={reducedMotion || !isFalling} onClick={() => setMessage("The character is looking for the same exit.")} />

      <button type="button" className="catch-button" onClick={() => { setMessage("Okay. Breathe. The fragments are holding still."); setIsFalling(false); }}>
        I&apos;M DONE FALLING <span aria-hidden="true">↓</span>
      </button>

      <nav className="fell-nav" aria-label="Portfolio navigation">
        {fragments.filter((fragment) => fragment.id !== "experience").map((fragment) => <a key={fragment.id} href={fragment.href}>{fragment.label}</a>)}
      </nav>

      <span className="fell-coordinates" aria-hidden="true">LAT 00° 00&apos; / URL UNKNOWN / 2026</span>
    </main>
  );
}
