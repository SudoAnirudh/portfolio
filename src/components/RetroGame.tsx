"use client";
import React, { useEffect, useRef, useState } from 'react';

const RetroGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    // Game constants
    const GAME_WIDTH = 400;
    const GAME_HEIGHT = 400;
    const PLAYER_SIZE = 24;
    const BULLET_SIZE = 4;
    const ENEMY_SIZE = 20;
    const PLAYER_SPEED = 5;
    const BULLET_SPEED = 7;
    const ENEMY_SPEED = 1;
    const SPAWN_RATE = 60; // Frames between spawns

    // Game state refs
    const playerRef = useRef({ x: GAME_WIDTH / 2 - PLAYER_SIZE / 2, y: GAME_HEIGHT - PLAYER_SIZE - 10 });
    const bulletsRef = useRef<{ x: number; y: number }[]>([]);
    const enemiesRef = useRef<{ x: number; y: number }[]>([]);
    const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string }[]>([]);
    const frameCountRef = useRef(0);
    const keysRef = useRef<{ [key: string]: boolean }>({});
    const gameLoopRef = useRef<number | null>(null);

    // Load high score
    useEffect(() => {
        const saved = localStorage.getItem('bug-invaders-highscore');
        if (saved) setHighScore(parseInt(saved));
    }, []);

    // Save high score
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('bug-invaders-highscore', score.toString());
        }
    }, [score, highScore]);

    const startGame = () => {
        playerRef.current = { x: GAME_WIDTH / 2 - PLAYER_SIZE / 2, y: GAME_HEIGHT - PLAYER_SIZE - 10 };
        bulletsRef.current = [];
        enemiesRef.current = [];
        particlesRef.current = [];
        frameCountRef.current = 0;
        setScore(0);
        setGameState('PLAYING');
    };

    const createExplosion = (x: number, y: number, color: string) => {
        for (let i = 0; i < 8; i++) {
            particlesRef.current.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 20,
                color
            });
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent default scrolling for game keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter', 'z', 'Z'].includes(e.key)) {
                e.preventDefault();
            }

            keysRef.current[e.key] = true;

            // Shoot on Enter or Z
            if ((e.key === 'Enter' || e.key === 'z' || e.key === 'Z') && gameState === 'PLAYING') {
                bulletsRef.current.push({
                    x: playerRef.current.x + PLAYER_SIZE / 2 - BULLET_SIZE / 2,
                    y: playerRef.current.y
                });

                // Screen Shake Effect
                document.body.classList.add('shake-screen');
                setTimeout(() => {
                    document.body.classList.remove('shake-screen');
                }, 300);
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            keysRef.current[e.key] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameState]);

    useEffect(() => {
        if (gameState !== 'PLAYING') {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            return;
        }

        const updateGame = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Update Player
            if (keysRef.current['ArrowLeft'] || keysRef.current['a']) {
                playerRef.current.x = Math.max(0, playerRef.current.x - PLAYER_SPEED);
            }
            if (keysRef.current['ArrowRight'] || keysRef.current['d']) {
                playerRef.current.x = Math.min(GAME_WIDTH - PLAYER_SIZE, playerRef.current.x + PLAYER_SPEED);
            }

            // Update Bullets
            bulletsRef.current = bulletsRef.current
                .map(b => ({ ...b, y: b.y - BULLET_SPEED }))
                .filter(b => b.y + BULLET_SIZE > 0);

            // Spawn Enemies
            frameCountRef.current++;
            if (frameCountRef.current % SPAWN_RATE === 0) {
                enemiesRef.current.push({
                    x: Math.random() * (GAME_WIDTH - ENEMY_SIZE),
                    y: -ENEMY_SIZE
                });
            }

            // Update Enemies
            enemiesRef.current = enemiesRef.current.map(e => ({ ...e, y: e.y + ENEMY_SPEED }));

            // Collision Detection
            // Bullet hit Enemy
            bulletsRef.current.forEach((bullet, bIdx) => {
                enemiesRef.current.forEach((enemy, eIdx) => {
                    if (
                        bullet.x < enemy.x + ENEMY_SIZE &&
                        bullet.x + BULLET_SIZE > enemy.x &&
                        bullet.y < enemy.y + ENEMY_SIZE &&
                        bullet.y + BULLET_SIZE > enemy.y
                    ) {
                        // Collision!
                        bulletsRef.current.splice(bIdx, 1);
                        enemiesRef.current.splice(eIdx, 1);
                        setScore(s => s + 10);
                        createExplosion(enemy.x + ENEMY_SIZE / 2, enemy.y + ENEMY_SIZE / 2, '#86EFAC');
                    }
                });
            });

            // Enemy hit Player or Bottom
            enemiesRef.current.forEach(enemy => {
                if (enemy.y > GAME_HEIGHT) {
                    // Enemy reached bottom - strict Game Over for "Defend the Base" feel
                    setGameState('GAME_OVER');
                }
                if (
                    playerRef.current.x < enemy.x + ENEMY_SIZE &&
                    playerRef.current.x + PLAYER_SIZE > enemy.x &&
                    playerRef.current.y < enemy.y + ENEMY_SIZE &&
                    playerRef.current.y + PLAYER_SIZE > enemy.y
                ) {
                    setGameState('GAME_OVER');
                    createExplosion(playerRef.current.x + PLAYER_SIZE / 2, playerRef.current.y + PLAYER_SIZE / 2, '#FACC15');
                }
            });

            // Update Particles
            particlesRef.current = particlesRef.current
                .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life - 1 }))
                .filter(p => p.life > 0);


            // Draw
            // Background
            ctx.fillStyle = '#18181B'; // Dark background
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            // Draw Grid (Retro feel)
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i < GAME_WIDTH; i += 40) { ctx.moveTo(i, 0); ctx.lineTo(i, GAME_HEIGHT); }
            for (let i = 0; i < GAME_HEIGHT; i += 40) { ctx.moveTo(0, i); ctx.lineTo(GAME_WIDTH, i); }
            ctx.stroke();

            // Draw Player (Ship)
            ctx.fillStyle = '#FACC15'; // Retro Yellow
            // Simple triangle ship
            ctx.beginPath();
            ctx.moveTo(playerRef.current.x + PLAYER_SIZE / 2, playerRef.current.y);
            ctx.lineTo(playerRef.current.x + PLAYER_SIZE, playerRef.current.y + PLAYER_SIZE);
            ctx.lineTo(playerRef.current.x, playerRef.current.y + PLAYER_SIZE);
            ctx.fill();

            // Draw Bullets
            ctx.fillStyle = '#FFF';
            bulletsRef.current.forEach(b => {
                ctx.fillRect(b.x, b.y, BULLET_SIZE, BULLET_SIZE * 2);
            });

            // Draw Enemies (Bugs)
            enemiesRef.current.forEach(e => {
                ctx.fillStyle = '#ef4444'; // Red bugs
                // Simple Bug Shape
                ctx.fillRect(e.x + 4, e.y, 12, 12); // body
                ctx.fillStyle = '#000';
                ctx.fillRect(e.x + 6, e.y + 2, 2, 2); // eyes
                ctx.fillRect(e.x + 12, e.y + 2, 2, 2);

                // Legs
                ctx.strokeStyle = '#ef4444';
                ctx.beginPath();
                ctx.moveTo(e.x, e.y); ctx.lineTo(e.x + 4, e.y + 4);
                ctx.moveTo(e.x + 20, e.y); ctx.lineTo(e.x + 16, e.y + 4);
                ctx.stroke();
            });

            // Draw Particles
            particlesRef.current.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life / 20;
                ctx.fillRect(p.x, p.y, 4, 4);
                ctx.globalAlpha = 1.0;
            });

            gameLoopRef.current = requestAnimationFrame(updateGame);
        };

        gameLoopRef.current = requestAnimationFrame(updateGame);
        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        };
    }, [gameState]);

    return (
        <div className="w-full h-full relative font-pixel bg-retro-charcoal overflow-hidden group">
            <div className="scanlines"></div>
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="w-full h-full block image-pixelated object-contain"
                style={{ imageRendering: 'pixelated' }}
            />

            {/* UI Overlay */}
            <div className="absolute top-4 left-4 text-retro-green font-bold text-lg tracking-wider mix-blend-difference pointer-events-none z-30">
                SCORE: {score.toString().padStart(4, '0')}
            </div>
            <div className="absolute top-4 right-4 text-retro-yellow font-bold text-sm tracking-wider mix-blend-difference pointer-events-none z-30 opacity-80">
                HI: {highScore.toString().padStart(4, '0')}
            </div>

            {gameState !== 'PLAYING' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm p-6 text-center z-40">
                    <h3 className="text-4xl text-retro-yellow mb-2 tracking-widest text-stroke-black drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                        {gameState === 'START' ? 'BUG INVADERS' : 'SYSTEM CRASH'}
                    </h3>

                    {gameState === 'GAME_OVER' && (
                        <div className="mb-6 animate-pulse">
                            <p className="text-retro-green text-sm uppercase">Bugs Squashed</p>
                            <p className="text-white text-3xl font-bold">{score}</p>
                            {score >= highScore && score > 0 && (
                                <p className="text-retro-yellow text-xs mt-1">NEW HIGH SCORE!</p>
                            )}
                        </div>
                    )}

                    {gameState === 'START' && highScore > 0 && (
                        <div className="mb-6">
                            <p className="text-retro-green text-xs uppercase">HIGH SCORE</p>
                            <p className="text-white text-xl font-bold">{highScore}</p>
                        </div>
                    )}

                    <button
                        onClick={startGame}
                        className="bg-retro-green text-black px-6 py-3 text-xl font-bold border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase"
                    >
                        {gameState === 'START' ? 'DEPLOY FIX' : 'REBOOT SYSTEM'}
                    </button>

                    <div className="mt-8 text-white/60 text-xs space-y-1">
                        <p>ARROWS / WASD to Move</p>
                        <p>ENTER / Z to Shoot</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RetroGame;
