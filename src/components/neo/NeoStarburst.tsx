"use client";
import React from "react";
import { motion } from "framer-motion";

interface NeoStarburstProps {
  className?: string;
  size?: number;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}

export const NeoStarburst: React.FC<NeoStarburstProps> = ({
  className = "",
  size = 72,
  color = "#FF7A9E",
  borderColor = "#0D0D0D",
  borderWidth = 3,
}) => {
  // 12-point jagged starburst path points
  const points = [
    "50,0", "61,15", "78,9", "82,27", "98,31", "91,48",
    "100,65", "85,73", "85,91", "68,88", "59,100", "44,91",
    "30,98", "25,82", "9,80", "15,63", "0,52", "12,38",
    "6,21", "24,20", "28,3", "45,13"
  ].join(" ");

  return (
    <motion.div
      className={`relative select-none pointer-events-none ${className}`}
      animate={{ rotate: [0, 8, -6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[3px_3px_0px_#0D0D0D]"
        fill={color}
        stroke={borderColor}
        strokeWidth={borderWidth}
        strokeLinejoin="round"
      >
        <polygon points={points} />
      </svg>
    </motion.div>
  );
};

export default NeoStarburst;
