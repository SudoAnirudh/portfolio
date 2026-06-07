"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Project } from '@/data/portfolio';
import { motion } from 'framer-motion';

// --- SUB-SIMULATORS FOR PORTFOLIO PROJECTS ---

const CattleScannerSimulator: React.FC = () => {
    const [selectedCow, setSelectedCow] = useState<'cow1' | 'cow2' | 'cow3'>('cow1');
    const [scanState, setScanState] = useState<'idle' | 'scanning' | 'done'>('idle');
    const [progress, setProgress] = useState(0);

    const cows = {
        cow1: { name: "Holstein Friesian #402", status: "Lumpy Skin Disease detected", confidence: "94.2%", breed: "Holstein Friesian", action: "Isolate herd and contact local vet immediately." },
        cow2: { name: "Gir Cow #108", status: "Healthy cattle", confidence: "98.7%", breed: "Gir", action: "Routine feed and health checks." },
        cow3: { name: "Jersey #099", status: "Foot and Mouth Disease suspected", confidence: "88.1%", breed: "Jersey", action: "Quarantine cattle. Apply foot bath antiseptics." },
    };

    const runInference = () => {
        setScanState('scanning');
        setProgress(0);
    };

    useEffect(() => {
        if (scanState !== 'scanning') return;
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setScanState('done');
                    return 100;
                }
                return p + 20;
            });
        }, 150);
        return () => clearInterval(interval);
    }, [scanState]);

    return (
        <div className="space-y-4 text-retro-charcoal font-pixel">
            <div className="bg-black text-green-500 p-2 text-[10px] uppercase tracking-wider">
                System: PashuSwasthya TFLite Client v1.0.4
            </div>
            <div className="grid grid-cols-3 gap-2">
                {(['cow1', 'cow2', 'cow3'] as const).map(c => (
                    <button 
                        key={c}
                        onClick={() => { setSelectedCow(c); setScanState('idle'); }}
                        className={`p-2 border-2 text-[10px] uppercase transition-all ${selectedCow === c ? 'bg-retro-yellow border-black text-black' : 'bg-white border-zinc-300 text-zinc-600'}`}
                    >
                        {c === 'cow1' ? 'Subject A' : c === 'cow2' ? 'Subject B' : 'Subject C'}
                    </button>
                ))}
            </div>
            <div className="border-4 border-black bg-white aspect-video relative flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/20 text-8xl">agriculture</span>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-0.5 text-[9px] tracking-widest">
                        CAM_FEED_01 // CONFIDENCE: HIGH
                    </div>
                    {scanState === 'scanning' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-retro-yellow text-xs p-4 space-y-2">
                            <div>SCANNING EPIDERMAL LAYER...</div>
                            <div className="w-full max-w-xs bg-zinc-700 h-4 border-2 border-retro-yellow overflow-hidden">
                                <div className="bg-retro-yellow h-full transition-all duration-150" style={{ width: `${progress}%` }} />
                            </div>
                            <div className="text-[10px] text-white">{progress}% Complete</div>
                        </div>
                    )}
                    {scanState === 'done' && (
                        <div className="absolute inset-0 bg-black/85 text-white p-3 flex flex-col justify-between overflow-y-auto font-body">
                            <div>
                                <div className="font-pixel text-[10px] text-retro-yellow uppercase tracking-widest mb-1 border-b border-white/20 pb-1">Inference Complete</div>
                                <div className="text-xs font-bold uppercase">{cows[selectedCow].name}</div>
                                <div className="text-[11px] text-zinc-300">Breed: {cows[selectedCow].breed}</div>
                                <div className="text-[11px] text-zinc-300">Confidence: {cows[selectedCow].confidence}</div>
                                <div className="mt-2 text-xs bg-red-950/40 border border-red-500/50 p-2 rounded text-retro-orange font-bold">
                                    Status: {cows[selectedCow].status}
                                </div>
                            </div>
                            <div className="text-[10px] text-zinc-400 bg-black p-1.5 border border-zinc-700 font-pixel mt-2 leading-tight">
                                Action Plan: {cows[selectedCow].action}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {scanState === 'idle' && (
                <button 
                    onClick={runInference}
                    className="w-full py-2 bg-retro-orange border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                    Diagnose Cattle
                </button>
            )}
            {scanState === 'done' && (
                <button 
                    onClick={() => setScanState('idle')}
                    className="w-full py-2 bg-retro-green border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                    Reset Scanner
                </button>
            )}
        </div>
    );
};

const CnnVisualizerSimulator: React.FC = () => {
    const [selectedPattern, setSelectedPattern] = useState<'noise' | 'vertical' | 'horizontal'>('vertical');
    const [selectedFilter, setSelectedFilter] = useState<'edge' | 'sharpen' | 'blur'>('edge');

    const patterns = {
        noise: [
            [1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1],
        ],
        vertical: [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
        ],
        horizontal: [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
    };

    const kernels = {
        edge: [
            [-1, -1, -1],
            [-1,  8, -1],
            [-1, -1, -1],
        ],
        sharpen: [
            [ 0, -1,  0],
            [-1,  5, -1],
            [ 0, -1,  0],
        ],
        blur: [
            [0.1, 0.1, 0.1],
            [0.1, 0.2, 0.1],
            [0.1, 0.1, 0.1],
        ],
    };

    const computeConvolutions = (pat: number[][], ker: number[][]) => {
        const result: number[][] = [];
        for (let r = 0; r < 3; r++) {
            const row: number[] = [];
            for (let c = 0; c < 3; c++) {
                let sum = 0;
                for (let kr = 0; kr < 3; kr++) {
                    for (let kc = 0; kc < 3; kc++) {
                        sum += pat[r + kr][c + kc] * ker[kr][kc];
                    }
                }
                row.push(Number(sum.toFixed(1)));
            }
            result.push(row);
        }
        return result;
    };

    const output = computeConvolutions(patterns[selectedPattern], kernels[selectedFilter]);

    return (
        <div className="space-y-4 text-retro-charcoal font-pixel">
            <div className="bg-black text-green-500 p-2 text-[10px] uppercase tracking-wider font-pixel">
                CNN Visualizer Engine // Layer: CONV_2D
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] uppercase text-zinc-500 mb-1">Select Input Matrix</label>
                    <div className="grid grid-cols-3 gap-1">
                        {(['vertical', 'horizontal', 'noise'] as const).map(p => (
                            <button
                                key={p}
                                onClick={() => setSelectedPattern(p)}
                                className={`px-1 py-1 border-2 text-[9px] uppercase truncate ${selectedPattern === p ? 'bg-retro-yellow border-black font-bold' : 'bg-white'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] uppercase text-zinc-500 mb-1">Select Filter Kernel</label>
                    <div className="grid grid-cols-3 gap-1">
                        {(['edge', 'sharpen', 'blur'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setSelectedFilter(f)}
                                className={`px-1 py-1 border-2 text-[9px] uppercase truncate ${selectedFilter === f ? 'bg-retro-yellow border-black font-bold' : 'bg-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center text-center pt-2">
                <div className="space-y-1">
                    <div className="text-[9px] text-zinc-500 uppercase">Input (5x5)</div>
                    <div className="grid grid-cols-5 gap-0.5 border-2 border-black p-1 bg-white">
                        {patterns[selectedPattern].map((row, r) => 
                            row.map((val, c) => (
                                <div 
                                    key={`in-${r}-${c}`}
                                    className={`aspect-square text-[9px] flex items-center justify-center border border-zinc-100 ${val === 1 ? 'bg-retro-charcoal text-white font-bold' : 'bg-zinc-100 text-zinc-400'}`}
                                >
                                    {val}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="text-[9px] text-zinc-500 uppercase">Kernel (3x3)</div>
                    <div className="grid grid-cols-3 gap-0.5 border-2 border-black p-1 bg-retro-cream">
                        {kernels[selectedFilter].map((row, r) => 
                            row.map((val, c) => (
                                <div 
                                    key={`ker-${r}-${c}`}
                                    className="aspect-square text-[9px] flex items-center justify-center border border-zinc-300 bg-white font-bold"
                                >
                                    {val}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="text-[9px] text-zinc-500 uppercase">Feature Map</div>
                    <div className="grid grid-cols-3 gap-0.5 border-2 border-black p-1 bg-white">
                        {output.map((row, r) => 
                            row.map((val, c) => {
                                const isPositive = val > 0;
                                return (
                                    <div 
                                        key={`out-${r}-${c}`}
                                        className={`aspect-square text-[10px] flex items-center justify-center font-bold border border-zinc-200 ${isPositive ? 'bg-retro-green text-retro-charcoal' : 'bg-red-50 text-red-500'}`}
                                    >
                                        {val}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            <div className="text-[9px] text-zinc-500 bg-zinc-50 border border-zinc-300 p-2 leading-tight uppercase font-pixel">
                Formula: Output[x,y] = Sum_i,j (Input[x+i, y+j] * Kernel[i,j])
                <br/>
                Notice how the Kernel detects directional features (like edges)!
            </div>
        </div>
    );
};

const StockPredictorSimulator: React.FC = () => {
    const [selectedStock, setSelectedStock] = useState<'AAPL' | 'NVDA' | 'BTC'>('NVDA');
    const [model, setModel] = useState<'lstm' | 'gru'>('lstm');
    const [simState, setSimState] = useState<'idle' | 'running' | 'done'>('idle');

    const runSimulation = () => {
        setSimState('running');
    };

    useEffect(() => {
        if (simState !== 'running') return;
        const timer = setTimeout(() => {
            setSimState('done');
        }, 1200);
        return () => clearTimeout(timer);
    }, [simState]);

    return (
        <div className="space-y-4 text-retro-charcoal font-pixel">
            <div className="bg-black text-green-500 p-2 text-[10px] uppercase tracking-wider font-pixel">
                LSTM Neural Forecast Engine v2.1
            </div>
            <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="block text-[9px] uppercase text-zinc-500 mb-1">Asset</label>
                    <div className="grid grid-cols-3 gap-1">
                        {(['AAPL', 'NVDA', 'BTC'] as const).map(s => (
                            <button
                                key={s}
                                onClick={() => { setSelectedStock(s); setSimState('idle'); }}
                                className={`py-1 border-2 text-[10px] ${selectedStock === s ? 'bg-retro-yellow border-black font-bold' : 'bg-white'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-1/2">
                    <label className="block text-[9px] uppercase text-zinc-500 mb-1">Model Layer</label>
                    <div className="grid grid-cols-2 gap-1">
                        {(['lstm', 'gru'] as const).map(m => (
                            <button
                                key={m}
                                onClick={() => { setModel(m); setSimState('idle'); }}
                                className={`py-1 border-2 text-[10px] uppercase ${model === m ? 'bg-retro-yellow border-black font-bold' : 'bg-white'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-4 border-black bg-retro-cream h-36 relative overflow-hidden flex flex-col justify-end p-2">
                <div className="absolute top-2 left-2 text-[9px] text-zinc-500 uppercase">
                    Asset Chart // {selectedStock} - Interval: 1D
                </div>
                
                <div className="absolute inset-0 grid grid-rows-3 grid-cols-5 border-b border-black/10">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="border-t border-l border-black/5" />
                    ))}
                </div>

                <svg className="w-full h-full absolute inset-0 pt-8 pb-4 px-4 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d="M 0 70 Q 15 50 35 75 T 70 45 T 85 55"
                        fill="none"
                        stroke="black"
                        strokeWidth="2.5"
                    />
                    
                    {simState === 'running' && (
                        <line 
                            x1="85" y1="55" x2="100" y2="25"
                            stroke="#eab308"
                            strokeWidth="3.5"
                            strokeDasharray="4 4"
                        />
                    )}

                    {simState === 'done' && (
                        <>
                            <path 
                                d={selectedStock === 'BTC' 
                                    ? "M 85 55 Q 92 25 100 40" 
                                    : selectedStock === 'AAPL' 
                                    ? "M 85 55 L 100 50" 
                                    : "M 85 55 Q 92 30 100 15"
                                }
                                fill="none"
                                stroke="#16a34a"
                                strokeWidth="3"
                                strokeDasharray="3 3"
                            />
                            <path 
                                d="M 85 55 Q 92 65 100 60"
                                fill="none"
                                stroke="#dc2626"
                                strokeWidth="1.5"
                                opacity="0.4"
                            />
                        </>
                    )}
                </svg>

                {simState === 'running' && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-retro-yellow text-[10px] uppercase font-pixel">
                        Running Forecast Gradient descent...
                    </div>
                )}

                {simState === 'done' && (
                    <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-0.5 text-[9px] uppercase border border-zinc-700 font-pixel">
                        {selectedStock === 'AAPL' ? 'Rec: Hold (Conf 64%)' : 'Rec: Buy (Conf 89%)'}
                    </div>
                )}
            </div>

            {simState === 'idle' && (
                <button 
                    onClick={runSimulation}
                    className="w-full py-2 bg-retro-orange border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                >
                    Run Forecast Cycle
                </button>
            )}
            {simState === 'done' && (
                <button 
                    onClick={() => setSimState('idle')}
                    className="w-full py-2 bg-retro-green border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                >
                    Predict Another
                </button>
            )}
        </div>
    );
};

const ImageEnhancementSimulator: React.FC = () => {
    const [sliderVal, setSliderVal] = useState(50);
    const [enhancementType, setEnhancementType] = useState<'denoise' | 'superres'>('superres');

    return (
        <div className="space-y-4 text-retro-charcoal font-pixel">
            <div className="bg-black text-green-500 p-2 text-[10px] uppercase tracking-wider font-pixel">
                Vision Toolkit // Model: ESRGAN_SuperResolution
            </div>
            
            <div className="flex gap-2">
                {(['superres', 'denoise'] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setEnhancementType(t)}
                        className={`flex-1 py-1 border-2 text-[10px] uppercase ${enhancementType === t ? 'bg-retro-yellow border-black font-bold' : 'bg-white'}`}
                    >
                        {t === 'superres' ? 'Super Resolution' : 'Artifact Denoising'}
                    </button>
                ))}
            </div>

            <div className="border-4 border-black relative aspect-video overflow-hidden select-none bg-zinc-200">
                <div className="absolute inset-0 bg-retro-cream flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-retro-charcoal text-7xl">auto_fix</span>
                    <div className="text-[10px] font-bold text-retro-charcoal mt-1">
                        {enhancementType === 'superres' ? 'RECONSTRUCTED (4X HD)' : 'DENOISED OUTPUT'}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-retro-green border border-black text-retro-charcoal px-2 py-0.5 text-[9px] uppercase">
                        ENHANCED MODEL OUTPUT
                    </div>
                </div>

                <div 
                    className="absolute inset-y-0 left-0 bg-zinc-300 flex items-center justify-center overflow-hidden border-r-2 border-black"
                    style={{ width: `${sliderVal}%` }}
                >
                    <div className="w-[100vw] h-full flex flex-col items-center justify-center absolute left-0" style={{ width: '100%', minWidth: '400px' }}>
                        <span className="material-symbols-outlined text-zinc-600 text-7xl grayscale blur-[2px]">auto_fix</span>
                        <div className="text-[10px] text-zinc-600 mt-1 font-bold">
                            {enhancementType === 'superres' ? 'BLURRY LOW-RES' : 'NOISY INPUT'}
                        </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-0.5 text-[9px] uppercase">
                        RAW INPUT DATA
                    </div>
                </div>

                <div 
                    className="absolute inset-y-0 w-1 bg-black pointer-events-none"
                    style={{ left: `${sliderVal}%` }}
                />
            </div>

            <div className="space-y-1">
                <label className="flex justify-between text-[9px] uppercase text-zinc-500">
                    <span>Raw Input</span>
                    <span>Compare Slider ({sliderVal}%)</span>
                    <span>Enhanced</span>
                </label>
                <input 
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-full accent-black bg-zinc-200 border-2 border-black h-3 cursor-pointer"
                />
            </div>
            
            <div className="text-[9px] text-zinc-500 uppercase leading-tight bg-zinc-50 border border-zinc-300 p-2">
                Drag slider to see bilateral filtering and prior reconstruction results.
            </div>
        </div>
    );
};

const IdsSimulator: React.FC = () => {
    const [scanState, setScanState] = useState<'idle' | 'running' | 'alert' | 'defended'>('idle');
    const [logs, setLogs] = useState<string[]>([]);
    const logContainerRef = useRef<HTMLDivElement>(null);

    const logHistory = [
        "192.168.1.100 -> GATEWAY:80 - HTTP GET /index.html (PASS)",
        "192.168.1.104 -> DNS_SERVER:53 - UDP QUERY repo.pack (PASS)",
        "10.0.0.12 -> FIREWALL:443 - SSL HANDSHAKE OK (PASS)",
        "192.168.1.100 -> GATEWAY:80 - HTTP POST /login (PASS)",
        "SYSTEM STATUS: NETWORK LOAD NORMAL. STACK SECURE.",
        "ALERT PRE-CHECK: DETECTING METRIC ANOMALIES...",
        "WARNING: INCOMING TCP STREAM RAPID SEQUENCE FROM IP 185.12.44.9",
        "185.12.44.9 -> HOST:22 - TCP SYN PACKET RECEIVED",
        "185.12.44.9 -> HOST:23 - TCP SYN PACKET RECEIVED",
        "185.12.44.9 -> HOST:80 - TCP SYN PACKET RECEIVED",
        "185.12.44.9 -> HOST:443 - TCP SYN PACKET RECEIVED",
        "WARNING: PORT SCAN SCANNING SIGNATURE MATCHED (CONF 98.4%)",
        "CRITICAL: INTRUSION VECTOR DETECTED from 185.12.44.9!",
        "ACTION REQUIRED: ACTIVATE NETWORK SHIELD BAN PROTOCOL",
        "PROTOCOL ACTIVE: IP 185.12.44.9 IS DROPPED AT FIREWALL LEVEL.",
        "SYSTEM RECOVERY: RESTORING ROUTING PACKET FLOWS...",
        "SYSTEM HEALTH: 100% STABLE. FIREWALL SHIELDS: ARMED.",
    ];

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const runIDS = () => {
        setScanState('running');
        setLogs([]);
    };

    useEffect(() => {
        if (scanState !== 'running') return;
        let index = 0;
        let active = true;

        const runInterval = () => {
            if (!active) return;
            if (index < logHistory.length) {
                const currentLine = logHistory[index];
                setLogs(l => [...l, currentLine]);
                
                if (currentLine.startsWith("WARNING: INCOMING")) {
                    setScanState('alert');
                }
                
                index++;
                setTimeout(runInterval, index < 5 ? 300 : index < 12 ? 600 : 350);
            } else {
                setScanState('defended');
            }
        };

        runInterval();
        return () => { active = false; };
    }, [scanState]);

    return (
        <div className="space-y-4 text-retro-charcoal font-pixel">
            <div className="bg-black text-green-500 p-2 text-[10px] uppercase tracking-wider font-pixel">
                Intrusion Detection System Console v0.8.2
            </div>

            <div 
                ref={logContainerRef}
                className="h-32 border-4 border-black bg-zinc-900 text-green-400 p-2 text-[9px] uppercase leading-tight overflow-y-auto space-y-1 shadow-[inset_0px_0px_8px_rgba(0,255,0,0.4)]"
            >
                {logs.length === 0 ? (
                    <div className="text-zinc-500 italic text-center pt-10">Click "Arm Firewall" to start log monitoring.</div>
                ) : (
                    logs.map((log, idx) => {
                        let color = "text-green-400";
                        if (log.startsWith("WARNING:")) color = "text-yellow-400";
                        if (log.startsWith("CRITICAL:") || log.startsWith("ALERT:")) color = "text-red-500 font-bold animate-pulse";
                        if (log.startsWith("PROTOCOL ACTIVE:")) color = "text-retro-orange font-bold";
                        if (log.startsWith("SYSTEM HEALTH:")) color = "text-sky-400 font-bold";
                        return (
                            <div key={idx} className={color}>
                                &gt; {log}
                            </div>
                        );
                    })
                )}
            </div>

            {scanState === 'idle' && (
                <button 
                    onClick={runIDS}
                    className="w-full py-2 bg-retro-orange border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                >
                    Arm Firewall & Scan
                </button>
            )}

            {scanState === 'alert' && (
                <div className="bg-red-950/20 border-2 border-red-600 p-2 text-center text-xs text-red-500 font-bold animate-pulse uppercase">
                    ALERT! Port Scan Detected! Blocking IP Address...
                </div>
            )}

            {scanState === 'defended' && (
                <button 
                    onClick={() => { setScanState('idle'); setLogs([]); }}
                    className="w-full py-2 bg-retro-green border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                >
                    Reset Console
                </button>
            )}
        </div>
    );
};

const HirenixSimulator: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState<'aiml' | 'frontend'>('aiml');
    const [selectedResume, setSelectedResume] = useState<'anirudh' | 'generic' | 'marketing'>('anirudh');
    const [scanState, setScanState] = useState<'idle' | 'scanning' | 'done'>('idle');
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('');

    const roles = {
        aiml: {
            title: "AI/ML Engineer",
            keywords: ["Python", "PyTorch", "TensorFlow", "NLP", "CNN", "Deep Learning", "Transformers"]
        },
        frontend: {
            title: "Frontend Developer",
            keywords: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite", "Framer Motion", "HTML/CSS"]
        }
    };

    const resumes = {
        anirudh: {
            name: "Anirudh S. Resume (AI & ML Focus)",
            metrics: {
                aiml: {
                    sectionCompleteness: 100,
                    keywordDensity: 95,
                    measurableAchievements: 90,
                    formatting: 100,
                    semanticSimilarity: 92,
                    matchedKeywords: ["Python", "PyTorch", "TensorFlow", "NLP", "CNN", "Deep Learning"],
                    missingKeywords: ["Transformers"]
                },
                frontend: {
                    sectionCompleteness: 100,
                    keywordDensity: 80,
                    measurableAchievements: 85,
                    formatting: 100,
                    semanticSimilarity: 78,
                    matchedKeywords: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML/CSS"],
                    missingKeywords: ["Vite", "Framer Motion"]
                }
            }
        },
        generic: {
            name: "Generic IT Resume",
            metrics: {
                aiml: {
                    sectionCompleteness: 90,
                    keywordDensity: 40,
                    measurableAchievements: 50,
                    formatting: 85,
                    semanticSimilarity: 48,
                    matchedKeywords: ["Python"],
                    missingKeywords: ["PyTorch", "TensorFlow", "NLP", "CNN", "Deep Learning", "Transformers"]
                },
                frontend: {
                    sectionCompleteness: 90,
                    keywordDensity: 60,
                    measurableAchievements: 50,
                    formatting: 85,
                    semanticSimilarity: 58,
                    matchedKeywords: ["React", "HTML/CSS"],
                    missingKeywords: ["TypeScript", "Tailwind CSS", "Next.js", "Vite", "Framer Motion"]
                }
            }
        },
        marketing: {
            name: "Creative Marketing Resume",
            metrics: {
                aiml: {
                    sectionCompleteness: 70,
                    keywordDensity: 10,
                    measurableAchievements: 40,
                    formatting: 90,
                    semanticSimilarity: 18,
                    matchedKeywords: [],
                    missingKeywords: ["Python", "PyTorch", "TensorFlow", "NLP", "CNN", "Deep Learning", "Transformers"]
                },
                frontend: {
                    sectionCompleteness: 70,
                    keywordDensity: 15,
                    measurableAchievements: 40,
                    formatting: 90,
                    semanticSimilarity: 22,
                    matchedKeywords: ["HTML/CSS"],
                    missingKeywords: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite", "Framer Motion"]
                }
            }
        }
    };

    const currentMetrics = resumes[selectedResume].metrics[selectedRole];

    const ruleBasedScore = Math.round(
        (currentMetrics.sectionCompleteness * 0.3) +
        (currentMetrics.keywordDensity * 0.4) +
        (currentMetrics.measurableAchievements * 0.3)
    );
    const semanticScore = currentMetrics.semanticSimilarity;
    const finalScore = Math.round((ruleBasedScore * 0.7) + (semanticScore * 0.3));

    const getMatchRating = (score: number) => {
        if (score >= 85) return { text: "STRONG MATCH", color: "text-retro-green bg-green-950/40 border-retro-green" };
        if (score >= 60) return { text: "POTENTIAL MATCH", color: "text-retro-yellow bg-yellow-950/40 border-retro-yellow" };
        return { text: "LOW ALIGNMENT", color: "text-retro-orange bg-orange-950/40 border-retro-orange" };
    };

    const runAtsScan = () => {
        setScanState('scanning');
        setProgress(0);
    };

    useEffect(() => {
        if (scanState !== 'scanning') return;

        const steps = [
            { limit: 20, text: "Initializing all-MiniLM-L6-v2 embedding model..." },
            { limit: 40, text: "Parsing resume structure and checking section completeness..." },
            { limit: 60, text: "Running keyword density scanner and achievement extractor..." },
            { limit: 80, text: "Computing cosine similarity index against baseline embeddings..." },
            { limit: 100, text: "Aggregating hybrid scores and generating report card..." }
        ];

        const interval = setInterval(() => {
            setProgress(prev => {
                const nextVal = prev + 5;
                const currentStep = steps.find(s => nextVal <= s.limit) || steps[steps.length - 1];
                setStatusText(currentStep.text);

                if (nextVal >= 100) {
                    clearInterval(interval);
                    setScanState('done');
                    return 100;
                }
                return nextVal;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [scanState]);

    return (
        <div className="space-y-4 text-retro-charcoal font-pixel">
            <div className="bg-black text-green-500 p-2 text-[10px] uppercase tracking-wider">
                System: Hirenix ATS Analyzer Client v1.2.0
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] uppercase text-zinc-500 mb-1">Target Job Role</label>
                    <div className="flex flex-col gap-1">
                        {(Object.keys(roles) as Array<keyof typeof roles>).map(r => (
                            <button
                                key={r}
                                onClick={() => { setSelectedRole(r); setScanState('idle'); }}
                                disabled={scanState === 'scanning'}
                                className={`px-2 py-1.5 border-2 text-[10px] text-left uppercase transition-all ${selectedRole === r ? 'bg-retro-yellow border-black text-black font-bold' : 'bg-white border-zinc-200 text-zinc-600'}`}
                            >
                                {roles[r].title}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] uppercase text-zinc-500 mb-1">Upload/Select Resume</label>
                    <div className="flex flex-col gap-1">
                        {(Object.keys(resumes) as Array<keyof typeof resumes>).map(res => (
                            <button
                                key={res}
                                onClick={() => { setSelectedResume(res); setScanState('idle'); }}
                                disabled={scanState === 'scanning'}
                                className={`px-2 py-1 border-2 text-[9px] text-left uppercase truncate transition-all ${selectedResume === res ? 'bg-retro-yellow border-black text-black font-bold' : 'bg-white border-zinc-200 text-zinc-600'}`}
                            >
                                {resumes[res].name.split(' ')[0] + ' ' + (resumes[res].name.includes('AI') ? 'S. (AI/ML)' : resumes[res].name.includes('IT') ? 'IT Template' : 'Marketing')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-4 border-black bg-white aspect-video relative flex flex-col justify-center overflow-hidden p-4">
                <div className="absolute inset-0 bg-zinc-800 pointer-events-none opacity-[0.05]"></div>
                
                {scanState === 'idle' && (
                    <div className="text-center space-y-2">
                        <span className="material-symbols-outlined text-zinc-400 text-6xl">psychology</span>
                        <div className="text-xs uppercase text-zinc-600">Ready to score candidate alignment</div>
                        <div className="text-[9px] text-zinc-400 uppercase">
                            Weights: 70% rule-based | 30% semantic (cos-sim)
                        </div>
                    </div>
                )}

                {scanState === 'scanning' && (
                    <div className="flex flex-col items-center justify-center space-y-3 text-center px-4">
                        <div className="text-xs uppercase font-bold text-retro-orange animate-pulse">Scanning resume...</div>
                        <div className="text-[9px] text-zinc-400 uppercase h-8 max-w-xs">{statusText}</div>
                        <div className="w-full max-w-xs bg-zinc-200 h-4 border-2 border-black overflow-hidden relative">
                            <div className="bg-retro-orange h-full transition-all duration-100" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="text-[10px] text-zinc-600">{progress}% COMPLETE</div>
                    </div>
                )}

                {scanState === 'done' && (
                    <div className="h-full flex flex-col justify-between overflow-y-auto text-xs font-body">
                        <div>
                            <div className="flex justify-between items-center border-b border-zinc-200 pb-1.5 mb-2">
                                <span className="font-pixel text-[10px] text-retro-orange uppercase">Analysis Complete</span>
                                <span className={`font-pixel text-[10px] uppercase border px-2 py-0.5 font-bold ${getMatchRating(finalScore).color}`}>
                                    {getMatchRating(finalScore).text}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold text-zinc-800">CANDIDATE SUITABILITY REPORT</div>
                                    <div className="text-[11px] text-zinc-600">
                                        <div className="flex justify-between">
                                            <span>Target:</span> <span className="font-bold text-retro-charcoal">{roles[selectedRole].title}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Resume:</span> <span className="font-bold text-retro-charcoal truncate max-w-[120px]">{resumes[selectedResume].name.split(' (')[0]}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-black p-2 bg-retro-cream text-center flex flex-col justify-center items-center">
                                    <div className="text-[9px] uppercase text-zinc-500 font-pixel">Overall Score</div>
                                    <div className="text-2xl font-display leading-none text-retro-charcoal">{finalScore}%</div>
                                </div>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-pixel bg-zinc-50 border border-zinc-200 p-2">
                                <div>
                                    <div className="text-zinc-500 border-b border-zinc-200 pb-0.5 mb-1">RULE-BASED (70%)</div>
                                    <div>Completeness: {currentMetrics.sectionCompleteness}%</div>
                                    <div>Density: {currentMetrics.keywordDensity}%</div>
                                    <div>Achievements: {currentMetrics.measurableAchievements}%</div>
                                </div>
                                <div>
                                    <div className="text-zinc-500 border-b border-zinc-200 pb-0.5 mb-1">SEMANTIC (30%)</div>
                                    <div>Cos-Sim Rank: {currentMetrics.semanticSimilarity}%</div>
                                    <div className="text-[8px] text-zinc-400 mt-1 uppercase">all-MiniLM-L6-v2 Model</div>
                                </div>
                            </div>

                            <div className="mt-2 text-[10px]">
                                <span className="font-bold uppercase text-zinc-500 block mb-0.5">Matched Keywords:</span>
                                <div className="flex flex-wrap gap-1">
                                    {currentMetrics.matchedKeywords.length > 0 ? (
                                        currentMetrics.matchedKeywords.map(k => (
                                            <span key={k} className="px-1.5 py-0.5 bg-green-50 text-green-700 border border-green-200 text-[9px] font-pixel">{k}</span>
                                        ))
                                    ) : (
                                        <span className="text-zinc-400 text-[9px] font-pixel italic">No matched keywords</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {scanState === 'idle' && (
                <button 
                    onClick={runAtsScan}
                    className="w-full py-2 bg-retro-orange border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                >
                    Evaluate Match Score
                </button>
            )}
            {scanState === 'done' && (
                <button 
                    onClick={() => setScanState('idle')}
                    className="w-full py-2 bg-retro-green border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                >
                    Reset Evaluator
                </button>
            )}
        </div>
    );
};

// --- END OF SUB-SIMULATORS ---

interface ProjectModalProps {
    project: Project | null;
    currentIndex: number | null;
    totalProjects: number;
    onClose: () => void;
    onNavigate: (direction: 'prev' | 'next') => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
    project,
    currentIndex,
    totalProjects,
    onClose,
    onNavigate,
}) => {
    const [showSimulator, setShowSimulator] = useState(false);

    // Check if the current project title has a simulator
    const hasSimulator = project ? [
        "PashuSwasthya",
        "CNN Visualizer",
        "Stock Price Predictor",
        "Image Enhancement Toolkit",
        "Intrusion Detection System",
        "Hirenix"
    ].includes(project.title) : false;

    // Reset simulator tab when project changes
    useEffect(() => {
        setShowSimulator(false);
    }, [project]);

    const renderSimulator = (title: string) => {
        switch (title) {
            case "PashuSwasthya":
                return <CattleScannerSimulator />;
            case "CNN Visualizer":
                return <CnnVisualizerSimulator />;
            case "Stock Price Predictor":
                return <StockPredictorSimulator />;
            case "Image Enhancement Toolkit":
                return <ImageEnhancementSimulator />;
            case "Intrusion Detection System":
                return <IdsSimulator />;
            case "Hirenix":
                return <HirenixSimulator />;
            default:
                return <div className="text-center py-8 font-pixel text-zinc-500">Simulator not found.</div>;
        }
    };

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (!project) return;
            if (e.key === 'ArrowRight') onNavigate('next');
            if (e.key === 'ArrowLeft') onNavigate('prev');
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose, onNavigate, project]);

    if (!project) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-retro-charcoal/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className="bg-retro-white border-4 border-black p-0 max-w-3xl w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative flex flex-col max-h-[92vh] overflow-hidden animate-zoom-in"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.96, y: 14, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.98, y: 8, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                <div className="bg-retro-charcoal text-white p-2 flex justify-between items-center gap-2 border-b-4 border-black">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-sm">deployed_code</span>
                        <span className="font-pixel text-[10px] sm:text-sm tracking-wider truncate">CARTRIDGE_SLOT_A://{project.title.toUpperCase()}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:bg-red-500 p-1 rounded-none transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm block">close</span>
                    </button>
                </div>

                <div className="p-3 sm:p-6 overflow-y-auto font-body">
                    <div className="border-4 border-black bg-zinc-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="grid lg:grid-cols-12">
                            <div className="lg:col-span-5 p-4 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-retro-cream">
                                <div className="font-pixel text-xs uppercase tracking-wider bg-black text-white inline-block px-2 py-1 mb-3">
                                    Project Cartridge
                                </div>
                                <motion.div
                                    className="h-3 bg-zinc-800 border-2 border-black mb-3 overflow-hidden"
                                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                                    transition={{ duration: 0.28, delay: 0.1, ease: "easeOut" }}
                                >
                                    <div className="h-full bg-retro-yellow w-1/2" />
                                </motion.div>

                                <motion.div
                                    className="border-4 border-black bg-white mb-4 relative overflow-hidden"
                                    initial={{ opacity: 0, x: -14 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.08 }}
                                >
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                        />
                                    ) : (
                                        <div className="w-full aspect-video flex items-center justify-center bg-retro-charcoal/5">
                                            <span className="material-symbols-outlined text-6xl text-retro-charcoal/30">{project.icon}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.12)_50%,transparent_100%)] animate-scanline" />
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="font-pixel text-[11px] uppercase tracking-wider text-zinc-700 space-y-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.25, delay: 0.15 }}
                                >
                                    <div>Slot: A1</div>
                                    <div>File: {project.title.toUpperCase().replace(/\s+/g, "_")}.CRT</div>
                                    <div>Build: Stable</div>
                                </motion.div>
                            </div>

                            <motion.div
                                className="lg:col-span-7 p-3 sm:p-4 bg-retro-white flex flex-col justify-between"
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.05 }}
                            >
                                {showSimulator ? (
                                    <div className="flex-1 flex flex-col justify-between h-full">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-2">
                                                <h2 className="font-display text-xl sm:text-2xl uppercase tracking-tight leading-none text-retro-charcoal">
                                                    {project.title} Simulator
                                                </h2>
                                                <button
                                                    onClick={() => setShowSimulator(false)}
                                                    className="px-2 py-1 bg-zinc-100 border-2 border-black font-pixel text-[10px] uppercase hover:bg-zinc-200 transition-colors"
                                                >
                                                    Back to Details
                                                </button>
                                            </div>
                                            {renderSimulator(project.title)}
                                        </div>

                                        <div className="pt-4 flex flex-wrap gap-3 mt-auto border-t-2 border-dashed border-black/15">
                                            <motion.button
                                                onClick={() => onNavigate('prev')}
                                                className="px-3 py-2 bg-zinc-100 border-2 border-black font-pixel text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1"
                                                whileHover={{ y: -1 }}
                                            >
                                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                                Prev
                                            </motion.button>

                                            <motion.button
                                                onClick={() => onNavigate('next')}
                                                className="px-3 py-2 bg-zinc-100 border-2 border-black font-pixel text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1"
                                                whileHover={{ y: -1 }}
                                            >
                                                Next
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </motion.button>

                                            <motion.a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-retro-green border-2 border-black font-pixel text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                                                whileHover={{ y: -1 }}
                                            >
                                                <span className="material-symbols-outlined text-sm">code</span>
                                                View Source
                                            </motion.a>

                                            <button
                                                onClick={onClose}
                                                className="px-4 py-2 bg-zinc-100 border-2 border-black font-pixel text-xs uppercase hover:bg-zinc-200 transition-colors"
                                            >
                                                Eject
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col justify-between h-full">
                                        <div>
                                            <motion.h2
                                                className="font-display text-2xl sm:text-3xl uppercase tracking-tight leading-none mb-3 text-retro-charcoal"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2, delay: 0.12 }}
                                            >
                                                {project.title}
                                            </motion.h2>
                                            <motion.p
                                                className="text-zinc-700 leading-relaxed mb-5"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2, delay: 0.17 }}
                                            >
                                                {project.description}
                                            </motion.p>

                                            <div className="mb-5">
                                                <h3 className="font-pixel text-sm uppercase mb-2 border-b-2 border-black inline-block">Specs</h3>
                                                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                                                    {project.specs.map((spec, index) => (
                                                        <motion.div
                                                            key={`${spec.label}-${spec.value}`}
                                                            className="border-2 border-black bg-zinc-100 px-3 py-2"
                                                            initial={{ opacity: 0, y: 8 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.2, delay: 0.2 + index * 0.05 }}
                                                            whileHover={{ y: -2, x: -2 }}
                                                        >
                                                            <div className="font-pixel uppercase text-zinc-500 tracking-wider">{spec.label}</div>
                                                            <div className="font-body text-sm text-zinc-800">{spec.value}</div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mb-5">
                                                <h3 className="font-pixel text-sm uppercase mb-2 border-b-2 border-black inline-block">Stack</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.techStack?.map((tech, index) => (
                                                        <motion.span
                                                            key={tech}
                                                            className="px-2 py-1 bg-retro-yellow border-2 border-black font-pixel text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.18, delay: 0.22 + index * 0.04 }}
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2 flex flex-wrap gap-3 mt-auto border-t-2 border-dashed border-black/15">
                                            <motion.button
                                                onClick={() => onNavigate('prev')}
                                                className="px-3 py-2 bg-zinc-100 border-2 border-black font-pixel text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2, delay: 0.28 }}
                                                whileHover={{ y: -1 }}
                                            >
                                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                                Prev
                                            </motion.button>

                                            <motion.button
                                                onClick={() => onNavigate('next')}
                                                className="px-3 py-2 bg-zinc-100 border-2 border-black font-pixel text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2, delay: 0.29 }}
                                                whileHover={{ y: -1 }}
                                            >
                                                Next
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </motion.button>

                                            {project.demo && (
                                                <motion.a
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-retro-yellow border-2 border-black font-pixel text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 text-black"
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.2, delay: 0.3 }}
                                                    whileHover={{ y: -1 }}
                                                >
                                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                    Launch Demo
                                                </motion.a>
                                            )}

                                            {hasSimulator && (
                                                <motion.button
                                                    onClick={() => setShowSimulator(true)}
                                                    className="px-4 py-2 bg-retro-orange border-2 border-black font-pixel text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.2, delay: 0.3 }}
                                                    whileHover={{ y: -1 }}
                                                >
                                                    <span className="material-symbols-outlined text-sm">sports_esports</span>
                                                    Launch Simulator
                                                </motion.button>
                                            )}

                                            <motion.a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-retro-green border-2 border-black font-pixel text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2, delay: 0.35 }}
                                                whileHover={{ y: -1 }}
                                            >
                                                <span className="material-symbols-outlined text-sm">code</span>
                                                View Source
                                            </motion.a>

                                            <motion.button
                                                onClick={onClose}
                                                className="px-4 py-2 bg-zinc-100 border-2 border-black font-pixel text-xs uppercase hover:bg-zinc-200 transition-colors"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2, delay: 0.4 }}
                                                whileHover={{ y: -1 }}
                                            >
                                                Eject
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                                <motion.div
                                    className="mt-4 font-pixel text-[11px] uppercase text-zinc-500 tracking-wider"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2, delay: 0.45 }}
                                >
                                    Cartridge {currentIndex !== null ? currentIndex + 1 : 1} / {totalProjects}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
