"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";

const GRID_SIZE = 30; // 30x30 grid for density
const SPEED_MS = 100;

const RetroGame = () => {
    const [grid, setGrid] = useState<boolean[][]>([]);
    const [isRunning, setIsRunning] = useState(true);
    const [generation, setGeneration] = useState(0);
    const gridRef = useRef<boolean[][]>([]); // Ref for performant access in interval

    // Initialize Grid
    const initGrid = useCallback(() => {
        const newGrid = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            const row = [];
            for (let x = 0; x < GRID_SIZE; x++) {
                // Random start state approx 20% alive
                row.push(Math.random() > 0.8);
            }
            newGrid.push(row);
        }
        setGrid(newGrid);
        gridRef.current = newGrid;
        setGeneration(0);
    }, []);

    useEffect(() => {
        initGrid();
    }, [initGrid]);

    // Game Logic Step
    const runSimulation = useCallback(() => {
        if (!gridRef.current.length) return;

        const currentGrid = gridRef.current;
        const newGrid = currentGrid.map(row => [...row]);
        let changes = 0;

        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                let neighbors = 0;
                // Check all 8 neighbors
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dy === 0 && dx === 0) continue;
                        const ny = (y + dy + GRID_SIZE) % GRID_SIZE; // Wrap around Y
                        const nx = (x + dx + GRID_SIZE) % GRID_SIZE; // Wrap around X
                        if (currentGrid[ny][nx]) neighbors++;
                    }
                }

                const isAlive = currentGrid[y][x];
                if (isAlive && (neighbors < 2 || neighbors > 3)) {
                    newGrid[y][x] = false; // Dies
                    changes++;
                } else if (!isAlive && neighbors === 3) {
                    newGrid[y][x] = true; // Born
                    changes++;
                }
            }
        }

        if (changes > 0) {
            gridRef.current = newGrid;
            setGrid(newGrid);
            setGeneration(g => g + 1);
        } else {
            // If static, restart chaos
            initGrid();
        }
    }, [initGrid]);

    // Loop
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(runSimulation, SPEED_MS);
        }
        return () => clearInterval(interval);
    }, [isRunning, runSimulation]);

    // Interaction
    const handleInteract = (x: number, y: number) => {
        const newGrid = [...grid];
        newGrid[y][x] = !newGrid[y][x]; // Toggle cell
        // Add some "splash" life around it
        if (y > 0) newGrid[y - 1][x] = true;
        if (y < GRID_SIZE - 1) newGrid[y + 1][x] = true;
        if (x > 0) newGrid[y][x - 1] = true;
        if (x < GRID_SIZE - 1) newGrid[y][x + 1] = true;

        setGrid(newGrid);
        gridRef.current = newGrid;
    };

    return (
        <div className="w-full h-full bg-black p-2 md:p-4 font-mono select-none flex flex-col items-center justify-center border-4 border-zinc-900 rounded-lg shadow-inner relative overflow-hidden group">

            {/* CRT Screen Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
            <div className="absolute inset-0 bg-green-500/5 z-10 animate-pulse pointer-events-none"></div>

            {/* Header */}
            <div className="w-full flex justify-between items-center mb-2 z-30 opacity-70">
                <div className="text-[10px] text-green-500 font-pixel uppercase tracking-widest">
                    SIM_OS v1.0
                </div>
                <div className="text-[10px] text-green-500 font-pixel uppercase tracking-widest">
                    GEN: {generation.toString().padStart(4, '0')}
                </div>
            </div>

            {/* Grid Container */}
            <div className="relative z-30 border border-green-900/50 p-1 shadow-[0_0_10px_rgba(0,255,0,0.1)]">
                <div
                    className="grid gap-[1px] bg-green-900/30 w-full h-full max-w-[280px] aspect-square"
                    style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                    }}
                >
                    {grid.map((row, y) => (
                        row.map((isAlive, x) => (
                            <div
                                key={`${x}-${y}`}
                                className={`
                                    w-full h-full cursor-crosshair transition-colors duration-300
                                    ${isAlive
                                        ? 'bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.8)]'
                                        : 'bg-black opacity-90 hover:bg-green-900/50'
                                    }
                                `}
                                onMouseEnter={(e) => {
                                    if (e.buttons === 1) handleInteract(x, y);
                                }}
                                onMouseDown={() => handleInteract(x, y)}
                            ></div>
                        ))
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-2 text-[8px] text-green-700/80 font-pixel uppercase tracking-widest z-30">
                // CLICK TO SPAWN LIFE //
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-4 animate-scanline opacity-30"></div>
        </div>
    );
};

export default RetroGame;
