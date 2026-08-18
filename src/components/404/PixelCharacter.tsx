"use client";
import React from "react";

export type CharState =
  | "idle"
  | "walking"
  | "jumping"
  | "interacting"
  | "confused"
  | "celebrating";

interface PixelCharacterProps {
  state?: CharState;
  direction?: "left" | "right";
  /** Scale factor relative to the base 8×16 grid (default 4 → 32×64px) */
  scale?: number;
}

/**
 * Pure CSS pixel-art developer character.
 * Uses SVG rect elements on an 8×16 pixel grid.
 *
 * Palette:
 *   Hair   #3D2314  Skin  #F0C8A0  Glasses #222222
 *   Hoodie #4A6FA5  Badge #F4C95D  Pants   #2C3A4A
 *   Boot   #1A1A1A  Eyes  #111111  Whites  #E8E4D9
 */

// prettier-ignore
const PIXELS: number[][] = [
  //0  1  2  3  4  5  6  7
  [ 0, 0, 1, 1, 1, 1, 0, 0 ], // row  0 – hair top
  [ 0, 1, 1, 1, 1, 1, 1, 0 ], // row  1 – hair
  [ 0, 1, 2, 2, 2, 2, 1, 0 ], // row  2 – face (under hair)
  [ 0, 2, 2, 2, 2, 2, 2, 0 ], // row  3 – face
  [ 0, 2, 3, 9, 9, 3, 2, 0 ], // row  4 – glasses frame + whites
  [ 0, 2, 3, 4, 4, 3, 2, 0 ], // row  5 – eyes
  [ 0, 2, 2, 0, 0, 2, 2, 0 ], // row  6 – mouth gap
  [ 5, 5, 5, 5, 5, 5, 5, 5 ], // row  7 – hoodie
  [ 5, 5, 5, 5, 5, 5, 5, 5 ], // row  8 – hoodie
  [ 5, 6, 5, 5, 5, 5, 6, 5 ], // row  9 – hoodie + badge accents
  [ 5, 5, 5, 5, 5, 5, 5, 5 ], // row 10 – hoodie
  [ 0, 7, 7, 0, 0, 7, 7, 0 ], // row 11 – pants
  [ 0, 7, 7, 0, 0, 7, 7, 0 ], // row 12 – pants
  [ 0, 7, 7, 0, 0, 7, 7, 0 ], // row 13 – pants
  [ 0, 8, 8, 0, 0, 8, 8, 0 ], // row 14 – boots
  [ 8, 8, 8, 0, 0, 8, 8, 8 ], // row 15 – boots (wide base)
];

const PALETTE: Record<number, string> = {
  0: "none",
  1: "#3D2314", // hair
  2: "#F0C8A0", // skin
  3: "#222222", // glasses
  4: "#111111", // eyes
  5: "#4A6FA5", // hoodie
  6: "#F4C95D", // badge / yellow accent
  7: "#2C3A4A", // pants
  8: "#1A1A1A", // boots
  9: "#E8E4D9", // eye whites
};

// State → CSS animation class mapping
const STATE_ANIMATION: Record<CharState, string | null> = {
  idle:        "char-idle 2.4s ease-in-out infinite",
  walking:     "char-walk 0.4s ease-in-out infinite",
  jumping:     "none",
  interacting: "char-idle 1.2s ease-in-out infinite",
  confused:    "char-confused 0.6s ease-in-out infinite",
  celebrating: "char-celebrate 0.5s ease-in-out infinite",
};

export default function PixelCharacter({
  state = "idle",
  direction = "right",
  scale = 4,
}: PixelCharacterProps) {
  const rows = PIXELS.length;   // 16
  const cols = PIXELS[0].length; // 8
  const svgW = cols * scale;
  const svgH = rows * scale;

  const animation = STATE_ANIMATION[state];

  return (
    <div
      style={{
        display: "inline-block",
        imageRendering: "pixelated",
        transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
        transformOrigin: "center bottom",
      }}
    >
      <svg
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${cols} ${rows}`}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        style={{
          imageRendering: "pixelated",
          display: "block",
          animation: animation ?? undefined,
        }}
        aria-hidden="true"
      >
        {PIXELS.map((row, ri) =>
          row.map((colorIdx, ci) => {
            const fill = PALETTE[colorIdx];
            if (fill === "none") return null;
            return (
              <rect
                key={`${ri}-${ci}`}
                x={ci}
                y={ri}
                width={1}
                height={1}
                fill={fill}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}
