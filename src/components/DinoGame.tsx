"use client";
import React, { useEffect, useRef, useState } from 'react';

// Pixel Art Matrices
// 'X' = theme color, 'E' = white/eye, '.' = transparent

const DINO_STAND_1 = [
  "..............XXXXXX",
  ".............XXXXXXXX",
  ".............XXEXXXXX",
  ".............XXXXXXXX",
  ".............XXXXXXX.",
  ".............XXXX....",
  "....X.......XXXXXX...",
  "....XX....XXXXXXXX...",
  "....XXXX.XXXXXXXXX...",
  "....XXXXXXXXXXXXXX...",
  "....XXXXXXXXXXXXXX...",
  ".....XXXXXXXXXXXX....",
  "......XXXXXXXXXX.....",
  ".......XXXXXXXX......",
  "........XXXXXX.......",
  ".........XXXX........",
  ".........X..X........",
  ".........XX.X........",
  ".........X..X........",
  "........XX..X........"
];

const DINO_STAND_2 = [
  "..............XXXXXX",
  ".............XXXXXXXX",
  ".............XXEXXXXX",
  ".............XXXXXXXX",
  ".............XXXXXXX.",
  ".............XXXX....",
  "....X.......XXXXXX...",
  "....XX....XXXXXXXX...",
  "....XXXX.XXXXXXXXX...",
  "....XXXXXXXXXXXXXX...",
  "....XXXXXXXXXXXXXX...",
  ".....XXXXXXXXXXXX....",
  "......XXXXXXXXXX.....",
  ".......XXXXXXXX......",
  "........XXXXXX.......",
  ".........XXXX........",
  ".........X..X........",
  ".........X..XX.......",
  ".........X..X........",
  ".........X..XX......."
];

const DINO_DUCK_1 = [
  "............XXXXXXXXXXXXXX",
  "...........XXXXXXXXXXXXXXXX",
  "...........XXEXXXXXXXXXXXXX",
  "...........XXXXXXXXXXXXXXXX",
  "....X......XXXXXXXXXXXXXX..",
  "....XX....XXXXXXXXXXXXX....",
  "....XXXXXXXXXXXXX.XXXXX....",
  ".....XXXXXXXXXXX...XXX.....",
  "......XXXXXXXXX............",
  ".......XX...X..............",
  ".......XX..XX.............."
];

const DINO_DUCK_2 = [
  "............XXXXXXXXXXXXXX",
  "...........XXXXXXXXXXXXXXXX",
  "...........XXEXXXXXXXXXXXXX",
  "...........XXXXXXXXXXXXXXXX",
  "....X......XXXXXXXXXXXXXX..",
  "....XX....XXXXXXXXXXXXX....",
  "....XXXXXXXXXXXXX.XXXXX....",
  ".....XXXXXXXXXXX...XXX.....",
  "......XXXXXXXXX............",
  ".......X...XX..............",
  ".......XX..XX.............."
];

const CACTUS_SMALL = [
  "....XX....",
  "....XX....",
  ".X..XX..X.",
  ".X..XX..X.",
  ".XXXXXXX.",
  "..XXXXXX.",
  "....XX....",
  "....XX....",
  "....XX....",
  "....XX....",
  "....XX...."
];

const CACTUS_DOUBLE = [
  "....XX.......XX...",
  "....XX.......XX...",
  ".X..XX..X.X..XX..X",
  ".X..XX..X.X..XX..X",
  ".XXXXXXXX.XXXXXXX.",
  "..XXXXXX...XXXXXX.",
  "....XX.......XX...",
  "....XX.......XX...",
  "....XX.......XX...",
  "....XX.......XX...",
  "....XX.......XX..."
];

const CACTUS_LARGE = [
  "......XX......",
  "......XX......",
  "......XX......",
  "..X...XX...X..",
  "..X...XX...X..",
  "..X...XX...X..",
  "..XXXXXX...X..",
  "...XXXXX.XXX..",
  "......XX.XX...",
  "......XX......",
  "......XX......",
  "......XX......",
  "......XX......",
  "......XX......",
  "......XX......"
];

const BIRD_WINGS_UP = [
  ".........XX........",
  "........XXXX.......",
  ".......XXXXXX......",
  "......XXXXXXXX.....",
  "...XXXXXXXXXXXX....",
  "..XXXXXXXXXXXXXX...",
  "..XXXXXXXXXX.XXX...",
  "...XXXXXXXX........",
  "....XXXXXX.........",
  ".....XXXX.........."
];

const BIRD_WINGS_DOWN = [
  "...XXXXXXXXXXXX....",
  "..XXXXXXXXXXXXXX...",
  "..XXXXXXXXXX.XXX...",
  "...XXXXXXXX........",
  "....XXXXXX.........",
  ".....XXXX..........",
  ".....XX.XX.........",
  "....XX...XX........",
  "...XX.....XX......."
];

const CLOUD = [
  "......XXXXXX......",
  "....XXXXXXXXXX....",
  "..XXXXXXXXXXXXXX..",
  "XXXXXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXXXXX"
];

type Obstacle = {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'cactus_small' | 'cactus_double' | 'cactus_large' | 'bird';
  speed: number;
};

type CloudType = {
  x: number;
  y: number;
  speed: number;
};

type GroundBump = {
  x: number;
  y: number;
  w: number;
  speed: number;
};

type Star = {
  x: number;
  y: number;
  blinkOffset: number;
};

const DinoGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const gameStateRef = useRef({
    player: { x: 30, y: 0, w: 24, h: 24, vy: 0, isJumping: false, isDucking: false },
    obstacles: [] as Obstacle[],
    clouds: [] as CloudType[],
    groundBumps: [] as GroundBump[],
    stars: [] as Star[],
    groundY: 88,
    pixelSize: 1.2,
    frameCount: 0,
    nextSpawnFrame: 60,
    score: 0,
    speedModifier: 1.0
  });

  // Load high score
  useEffect(() => {
    const savedHighScore = localStorage.getItem('dino_simulation_highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const state = gameStateRef.current;
    
    // Preset elements
    state.clouds = [
      { x: 120, y: 15, speed: 0.35 },
      { x: 290, y: 22, speed: 0.35 },
      { x: 420, y: 12, speed: 0.35 }
    ];
    state.groundBumps = [
      { x: 40, y: 92, w: 12, speed: 3.2 },
      { x: 170, y: 94, w: 8, speed: 3.2 },
      { x: 310, y: 91, w: 16, speed: 3.2 }
    ];
    state.stars = [
      { x: 150, y: 12, blinkOffset: 0 },
      { x: 260, y: 18, blinkOffset: 30 },
      { x: 380, y: 8, blinkOffset: 60 }
    ];

    // Core Drawing Parser
    const drawPixelSprite = (
      c: CanvasRenderingContext2D,
      sprite: string[],
      x: number,
      y: number,
      px: number,
      color: string,
      eyeColor: string = '#ffffff'
    ) => {
      for (let row = 0; row < sprite.length; row++) {
        const line = sprite[row];
        for (let col = 0; col < line.length; col++) {
          const char = line[col];
          if (char === 'X') {
            c.fillStyle = color;
            c.fillRect(x + col * px, y + row * px, px, px);
          } else if (char === 'E') {
            c.fillStyle = eyeColor;
            c.fillRect(x + col * px, y + row * px, px, px);
          }
        }
      }
    };

    const loop = () => {
      const s = gameStateRef.current;
      const { player, obstacles, clouds, groundBumps, stars, groundY, pixelSize } = s;

      s.frameCount++;
      s.score += 0.15;
      const roundedScore = Math.floor(s.score);
      setScore(roundedScore);

      // Save high score if exceeded
      if (roundedScore > highScore) {
        setHighScore(roundedScore);
        localStorage.setItem('dino_simulation_highscore', roundedScore.toString());
      }

      // Day / Night transition trigger
      const scoreMod = roundedScore % 1000;
      const isNight = scoreMod >= 700 && scoreMod <= 900;
      
      const themeColor = isNight ? '#e4e4e7' : '#535353';
      const secondaryColor = isNight ? 'rgba(228, 228, 231, 0.4)' : 'rgba(83, 83, 83, 0.4)';
      const eyeColor = isNight ? 'rgba(24, 24, 27, 0.9)' : '#ffffff';

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      s.speedModifier = 1 + Math.floor(roundedScore / 250) * 0.08;
      const currentSpeed = 3.2 * s.speedModifier;

      // --- Draw Moon & Stars (Night Mode Only) ---
      if (isNight) {
        // Moon
        ctx.fillStyle = '#e4e4e7';
        ctx.fillRect(320, 10, 14, 14);
        ctx.fillStyle = 'rgba(24, 24, 27, 0.9)';
        ctx.fillRect(324, 10, 10, 14);

        // Stars
        stars.forEach(star => {
          const isBlinking = Math.floor((s.frameCount + star.blinkOffset) / 20) % 3 === 0;
          if (!isBlinking) {
            ctx.fillStyle = 'rgba(228, 228, 231, 0.6)';
            ctx.fillRect(star.x, star.y, 2, 2);
          }
        });
      }

      // --- Draw Ground Line ---
      ctx.strokeStyle = themeColor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // --- Update & Draw Clouds ---
      if (s.frameCount % 240 === 0) {
        clouds.push({ x: canvas.width, y: 10 + Math.random() * 20, speed: 0.35 });
      }
      for (let i = clouds.length - 1; i >= 0; i--) {
        const cloud = clouds[i];
        cloud.x -= cloud.speed;
        if (cloud.x + 30 < 0) {
          clouds.splice(i, 1);
          continue;
        }
        drawPixelSprite(ctx, CLOUD, cloud.x, cloud.y, pixelSize, secondaryColor);
      }

      // --- Update & Draw Ground Bumps ---
      if (s.frameCount % 45 === 0) {
        groundBumps.push({ x: canvas.width, y: groundY + 2 + Math.random() * 6, w: 4 + Math.random() * 8, speed: currentSpeed });
      }
      for (let i = groundBumps.length - 1; i >= 0; i--) {
        const bump = groundBumps[i];
        bump.x -= currentSpeed;
        if (bump.x + bump.w < 0) {
          groundBumps.splice(i, 1);
          continue;
        }
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(bump.x, bump.y, bump.w, 1);
      }

      // --- Spawn Obstacles ---
      if (s.frameCount >= s.nextSpawnFrame) {
        const typeRand = Math.random();
        if (typeRand > 0.4) {
          const cactusSize = Math.random();
          let w = 10, h = 11, typeName: Obstacle['type'] = 'cactus_small';
          if (cactusSize > 0.7) {
            w = 26; h = 15; typeName = 'cactus_large';
          } else if (cactusSize > 0.45) {
            w = 18; h = 11; typeName = 'cactus_double';
          }
          
          obstacles.push({
            x: canvas.width,
            y: groundY - h * pixelSize,
            w: w * pixelSize,
            h: h * pixelSize,
            type: typeName,
            speed: currentSpeed
          });
        } else {
          // Bird
          const isHigh = Math.random() > 0.5;
          const birdY = isHigh ? groundY - 30 : groundY - 18;
          obstacles.push({
            x: canvas.width,
            y: birdY,
            w: 18 * pixelSize,
            h: 10 * pixelSize,
            type: 'bird',
            speed: currentSpeed + 0.3
          });
        }
        s.nextSpawnFrame = s.frameCount + Math.floor((100 + Math.random() * 120) / s.speedModifier);
      }

      // --- AI Autopilot Logic ---
      const nextObs = obstacles.find(o => o.x + o.w > player.x);
      if (nextObs) {
        const dist = nextObs.x - (player.x + player.w);
        
        if (nextObs.type.startsWith('cactus')) {
          const jumpDist = (54 + nextObs.w * 0.7) * s.speedModifier;
          if (dist < jumpDist && !player.isJumping) {
            player.vy = -6.8;
            player.isJumping = true;
          }
        } else {
          const isHighBird = nextObs.y < groundY - 24;
          if (isHighBird) {
            const duckDist = 65 * s.speedModifier;
            if (dist < duckDist) {
              player.isDucking = true;
            }
          } else {
            const jumpDist = 55 * s.speedModifier;
            if (dist < jumpDist && !player.isJumping) {
              player.vy = -6.8;
              player.isJumping = true;
            }
          }
        }
      }

      if (player.isDucking && (!nextObs || nextObs.type !== 'bird' || nextObs.x + nextObs.w < player.x)) {
        player.isDucking = false;
      }

      // --- Update Dino Physics ---
      if (player.isJumping) {
        player.vy += 0.4;
        player.y += player.vy;
        if (player.y >= groundY - player.h) {
          player.y = groundY - player.h;
          player.vy = 0;
          player.isJumping = false;
        }
      } else {
        player.h = player.isDucking ? 11 * pixelSize : 20 * pixelSize;
        player.y = groundY - player.h;
      }

      // --- Update & Draw Obstacles ---
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= obs.speed;
        
        if (obs.x + obs.w < 0) {
          obstacles.splice(i, 1);
          continue;
        }

        // Render Pixel Art Obstacles
        if (obs.type === 'cactus_small') {
          drawPixelSprite(ctx, CACTUS_SMALL, obs.x, obs.y, pixelSize, themeColor);
        } else if (obs.type === 'cactus_double') {
          drawPixelSprite(ctx, CACTUS_DOUBLE, obs.x, obs.y, pixelSize, themeColor);
        } else if (obs.type === 'cactus_large') {
          drawPixelSprite(ctx, CACTUS_LARGE, obs.x, obs.y, pixelSize, themeColor);
        } else if (obs.type === 'bird') {
          const birdFrame = Math.floor(s.frameCount / 12) % 2 === 0 ? BIRD_WINGS_UP : BIRD_WINGS_DOWN;
          drawPixelSprite(ctx, birdFrame, obs.x, obs.y, pixelSize, themeColor);
        }
      }

      // --- Draw Dino ---
      let activeDinoSprite = Math.floor(s.frameCount / 6) % 2 === 0 ? DINO_STAND_1 : DINO_STAND_2;
      if (player.isDucking) {
        activeDinoSprite = Math.floor(s.frameCount / 6) % 2 === 0 ? DINO_DUCK_1 : DINO_DUCK_2;
      }
      
      drawPixelSprite(ctx, activeDinoSprite, player.x, player.y, pixelSize, themeColor, eyeColor);

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationId);
  }, [highScore]);

  // Handle auto-resize canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      canvas.width = 400;
      canvas.height = 100;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMilestoneFlashing = score > 0 && Math.floor(score / 100) % 2 === 0 && (score % 100 < 15);

  return (
    <div 
      ref={containerRef}
      className="w-full flex flex-col p-1 select-none pointer-events-none overflow-hidden bg-transparent"
    >
      {/* Game Scores Header */}
      <div className="flex justify-end items-center gap-4 font-mono text-[9px] font-bold text-retro-charcoal/60 pb-1 mb-1">
        <span>HI {highScore.toString().padStart(5, '0')}</span>
        <span className={isMilestoneFlashing ? 'animate-pulse text-retro-orange' : ''}>
          {score.toString().padStart(5, '0')}
        </span>
      </div>

      {/* Transparent Canvas Screen */}
      <div className="w-full relative overflow-hidden bg-transparent flex items-center justify-center aspect-[4/1]">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
};

export default DinoGame;
