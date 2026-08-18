"use client";
import React from "react";

interface PixelNPCProps {
  scale?: number;
  /** NPC variant: "ghost" (default) or "human" */
  variant?: "ghost" | "human";
}

/**
 * 8×14 pixel grid Ghost / Git Reaper NPC.
 * Floating ghostly tail with cyan glow eyes.
 */
// prettier-ignore
const GHOST_PIXELS: number[][] = [
  // 0=none 1=ghost white 2=ghost shading 3=glowing cyan eye 4=dark purple hood
  [ 0, 0, 4, 4, 4, 4, 0, 0 ], // row 0 - hood top
  [ 0, 4, 4, 4, 4, 4, 4, 0 ], // row 1
  [ 0, 4, 1, 1, 1, 1, 4, 0 ], // row 2 - face shadow
  [ 0, 4, 3, 1, 1, 3, 4, 0 ], // row 3 - glowing cyan eyes!
  [ 0, 4, 1, 1, 1, 1, 4, 0 ], // row 4
  [ 4, 4, 1, 1, 1, 1, 4, 4 ], // row 5 - cloak shoulders
  [ 4, 1, 1, 1, 1, 1, 1, 4 ], // row 6
  [ 4, 1, 2, 1, 1, 2, 1, 4 ], // row 7
  [ 0, 1, 1, 1, 1, 1, 1, 0 ], // row 8
  [ 0, 1, 2, 1, 1, 2, 1, 0 ], // row 9
  [ 0, 1, 1, 1, 1, 1, 1, 0 ], // row 10 - floating body
  [ 0, 1, 0, 1, 1, 0, 1, 0 ], // row 11 - ghostly wisps
  [ 0, 2, 0, 2, 2, 0, 2, 0 ], // row 12 - wisp tips
  [ 0, 0, 0, 0, 0, 0, 0, 0 ], // row 13
];

const GHOST_PALETTE: Record<number, string> = {
  0: "none",
  1: "#E8E4D9",
  2: "#9BA5B5",
  3: "#64F6D4", // Glowing cyan eyes
  4: "#1C142E", // Deep purple cloak
};

export default function PixelNPC({ scale = 3, variant = "ghost" }: PixelNPCProps) {
  const rows = GHOST_PIXELS.length;
  const cols = GHOST_PIXELS[0].length;

  return (
    <div style={{ display: "inline-block", imageRendering: "pixelated" }}>
      <svg
        width={cols * scale}
        height={rows * scale}
        viewBox={`0 0 ${cols} ${rows}`}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        style={{
          imageRendering: "pixelated",
          display: "block",
          filter: "drop-shadow(0 0 6px rgba(100,246,212,0.4))",
          animation: "char-idle 2.4s ease-in-out infinite",
        }}
        aria-hidden="true"
      >
        {GHOST_PIXELS.map((row, ri) =>
          row.map((colorIdx, ci) => {
            const fill = GHOST_PALETTE[colorIdx];
            if (fill === "none") return null;
            return (
              <rect key={`${ri}-${ci}`} x={ci} y={ri} width={1} height={1} fill={fill} />
            );
          })
        )}
      </svg>
    </div>
  );
}
