"use client";
import React, { useEffect, useState, useCallback } from "react";

// Types
type Cell = {
    x: number;
    y: number;
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborCount: number;
};

type GameState = "START" | "PLAYING" | "WON" | "LOST";

// Constants
const GRID_SIZE = 10;
const TOTAL_MINES = 15;

const RetroGame = () => {
    const [grid, setGrid] = useState<Cell[][]>([]);
    const [gameState, setGameState] = useState<GameState>("START");
    const [minesLeft, setMinesLeft] = useState(TOTAL_MINES);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    // Initialize Game
    const initGame = useCallback(() => {
        // specific logic to ensure first click is safe or map is generated
        // safely. For simplicity in this version, we'll generate mines immediately
        // but ensures we have a playable board.

        // 1. Create Empty Grid
        let newGrid: Cell[][] = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            let row: Cell[] = [];
            for (let x = 0; x < GRID_SIZE; x++) {
                row.push({
                    x,
                    y,
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborCount: 0,
                });
            }
            newGrid.push(row);
        }

        // 2. Place Mines
        let minesPlaced = 0;
        while (minesPlaced < TOTAL_MINES) {
            const x = Math.floor(Math.random() * GRID_SIZE);
            const y = Math.floor(Math.random() * GRID_SIZE);
            if (!newGrid[y][x].isMine) {
                newGrid[y][x].isMine = true;
                minesPlaced++;
            }
        }

        // 3. Calculate Neighbors
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                if (!newGrid[y][x].isMine) {
                    let count = 0;
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const ny = y + dy;
                            const nx = x + dx;
                            if (
                                ny >= 0 &&
                                ny < GRID_SIZE &&
                                nx >= 0 &&
                                nx < GRID_SIZE &&
                                newGrid[ny][nx].isMine
                            ) {
                                count++;
                            }
                        }
                    }
                    newGrid[y][x].neighborCount = count;
                }
            }
        }

        setGrid(newGrid);
        setGameState("START");
        setMinesLeft(TOTAL_MINES);
        setTimer(0);
        setTimerActive(false);
    }, []);

    // Initial Load
    useEffect(() => {
        initGame();
    }, [initGame]);

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && gameState === "PLAYING") {
            interval = setInterval(() => {
                setTimer((t) => Math.min(t + 1, 999));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, gameState]);

    // Game Logic: Reveal Cell
    const revealCell = (x: number, y: number) => {
        if (gameState !== "PLAYING" && gameState !== "START") return;

        // Start timer on first click
        if (gameState === "START") {
            setGameState("PLAYING");
            setTimerActive(true);
        }

        const currentCell = grid[y][x];
        if (currentCell.isRevealed || currentCell.isFlagged) return;

        // Deep copy grid
        const newGrid = [...grid.map((row) => [...row])];
        const cell = newGrid[y][x];

        // Hit Mine
        if (cell.isMine) {
            cell.isRevealed = true;
            setGrid(newGrid);
            gameOver(newGrid);
            return;
        }

        // Flood Fill for empty cells
        const floodFill = (cx: number, cy: number, gridCopy: Cell[][]) => {
            if (
                cx < 0 ||
                cx >= GRID_SIZE ||
                cy < 0 ||
                cy >= GRID_SIZE ||
                gridCopy[cy][cx].isRevealed ||
                gridCopy[cy][cx].isFlagged
            )
                return;

            gridCopy[cy][cx].isRevealed = true;

            if (gridCopy[cy][cx].neighborCount === 0) {
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        // Don't fill diagonals? Standard minesweeper does 8-way.
                        floodFill(cx + dx, cy + dy, gridCopy);
                    }
                }
            }
        };

        floodFill(x, y, newGrid);
        setGrid(newGrid);
        checkWin(newGrid);
    };

    // Game Logic: Toggle Flag
    const toggleFlag = (x: number, y: number, e: React.MouseEvent) => {
        e.preventDefault();
        if (gameState !== "PLAYING" && gameState !== "START") return;

        // Start timer if needed (though usually starts on left click)
        if (gameState === "START") {
            setGameState("PLAYING");
            setTimerActive(true);
        }

        const newGrid = [...grid.map((row) => [...row])];
        const cell = newGrid[y][x];

        if (cell.isRevealed) return;

        if (!cell.isFlagged && minesLeft > 0) {
            cell.isFlagged = true;
            setMinesLeft(m => m - 1);
        } else if (cell.isFlagged) {
            cell.isFlagged = false;
            setMinesLeft(m => m + 1);
        }

        setGrid(newGrid);
    };

    // Game Over
    const gameOver = (finalGrid: Cell[][]) => {
        setGameState("LOST");
        setTimerActive(false);
        // Reveal all mines
        const revealedGrid = finalGrid.map(row =>
            row.map(cell => {
                if (cell.isMine) return { ...cell, isRevealed: true };
                return cell;
            })
        );
        setGrid(revealedGrid);
    };

    // Check Win
    const checkWin = (currentGrid: Cell[][]) => {
        let revealedCount = 0;
        for (let row of currentGrid) {
            for (let cell of row) {
                if (cell.isRevealed) revealedCount++;
            }
        }
        const safeCells = (GRID_SIZE * GRID_SIZE) - TOTAL_MINES;
        if (revealedCount === safeCells) {
            setGameState("WON");
            setTimerActive(false);
            // Flag all mines
            const wonGrid = currentGrid.map(row =>
                row.map(cell => {
                    if (cell.isMine) return { ...cell, isFlagged: true };
                    return cell;
                })
            );
            setGrid(wonGrid);
            setMinesLeft(0);
        }
    };

    // UI Helpers
    const getCellContent = (cell: Cell) => {
        if (cell.isFlagged) return <span className="text-red-500 text-[10px] md:text-sm">🚩</span>; // Flag
        if (!cell.isRevealed) return null;
        if (cell.isMine) return <span className="text-black text-[10px] md:text-sm">💣</span>; // Mine
        if (cell.neighborCount > 0) return cell.neighborCount;
        return null; // Empty
    };

    const getCellColor = (cell: Cell) => {
        if (!cell.isRevealed) return "bg-retro-grey hover:bg-zinc-300 border-t-white border-l-white border-b-zinc-500 border-r-zinc-500 border-[2px] md:border-[3px]";
        if (cell.isMine) return "bg-red-500 border border-zinc-400";
        // Number colors
        const colors = [
            "", // 0
            "text-blue-700", // 1
            "text-green-700", // 2
            "text-red-700", // 3
            "text-blue-900", // 4
            "text-red-900", // 5
            "text-teal-700", // 6
            "text-black", // 7
            "text-zinc-500", // 8
        ];
        return `bg-retro-cream border border-zinc-300 ${colors[cell.neighborCount]}`;
    };

    const getEmojiStatus = () => {
        switch (gameState) {
            case "WON": return "😎";
            case "LOST": return "😵";
            case "PLAYING": return "🙂"; // Could add😮 for mouse down in future
            default: return "🙂";
        }
    };

    return (
        <div className="w-full h-full bg-retro-charcoal p-2 md:p-4 font-mono select-none flex flex-col items-center justify-center border-4 border-zinc-400 rounded-lg shadow-inner bg-zinc-200">

            {/* Game Header */}
            <div className="w-full bg-zinc-300 border-b-white border-r-white border-t-zinc-400 border-l-zinc-400 border-[3px] p-1.5 flex justify-between items-center mb-2 shadow-sm">
                {/* Mines Counter */}
                <div className="bg-black text-red-500 font-digital text-xl px-2 py-0.5 min-w-[50px] text-center border-2 border-zinc-400 shadow-inner leading-none tracking-widest">
                    {Math.max(0, minesLeft).toString().padStart(3, '0')}
                </div>

                {/* Reset Button */}
                <button
                    onClick={initGame}
                    className="w-8 h-8 md:w-10 md:h-10 bg-zinc-200 border-t-white border-l-white border-b-zinc-500 border-r-zinc-500 border-[3px] active:border-t-zinc-500 active:border-l-zinc-500 active:border-b-white active:border-r-white flex items-center justify-center text-lg hover:bg-zinc-100"
                >
                    {getEmojiStatus()}
                </button>

                {/* Timer */}
                <div className="bg-black text-red-500 font-digital text-xl px-2 py-0.5 min-w-[50px] text-center border-2 border-zinc-400 shadow-inner leading-none tracking-widest">
                    {timer.toString().padStart(3, '0')}
                </div>
            </div>

            {/* Game Grid */}
            <div className="bg-zinc-400 p-1.5 border-l-white border-t-white border-r-zinc-500 border-b-zinc-500 border-[3px] shadow-lg flex flex-col items-center justify-center w-full aspect-square max-w-[320px]">
                <div
                    className="grid gap-[1px] bg-zinc-500 w-full h-full" // Gap for grid lines
                    style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                    }}
                >
                    {grid.map((row, y) => (
                        row.map((cell, x) => (
                            <div
                                key={`${x}-${y}`}
                                className={`
                                w-full h-full
                                flex items-center justify-center 
                                text-[10px] md:text-sm font-bold cursor-pointer
                                ${getCellColor(cell)}
                            `}
                                onClick={() => revealCell(x, y)}
                                onContextMenu={(e) => toggleFlag(x, y, e)}
                            >
                                {getCellContent(cell)}
                            </div>
                        ))
                    ))}
                </div>
            </div>

            {/* Footer/Controls Hint */}
            {gameState === 'START' && (
                <div className="mt-2 text-[9px] md:text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                    L-Click: Reveal • R-Click: Flag
                </div>
            )}
            {gameState === 'WON' && (
                <div className="mt-2 text-[9px] md:text-[10px] uppercase text-green-600 font-bold tracking-wider animate-pulse">
                    MISSION ACCOMPLISHED
                </div>
            )}
            {gameState === 'LOST' && (
                <div className="mt-2 text-[9px] md:text-[10px] uppercase text-red-600 font-bold tracking-wider">
                    MISSION FAILED
                </div>
            )}

        </div>
    );
};

export default RetroGame;
