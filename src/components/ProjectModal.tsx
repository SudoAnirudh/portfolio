"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Project } from '@/data/portfolio';
import { motion } from 'framer-motion';

// --- SUB-SIMULATORS FOR PORTFOLIO PROJECTS ---

// ⚡ Bolt: Hoisted static objects to prevent re-allocation on every render cycle.
const cows = {
    cow1: { name: "Holstein Friesian #402", status: "Lumpy Skin Disease detected", confidence: "94.2%", breed: "Holstein Friesian", action: "Isolate herd and contact local vet immediately." },
    cow2: { name: "Gir Cow #108", status: "Healthy cattle", confidence: "98.7%", breed: "Gir", action: "Routine feed and health checks." },
    cow3: { name: "Jersey #099", status: "Foot and Mouth Disease suspected", confidence: "88.1%", breed: "Jersey", action: "Quarantine cattle. Apply foot bath antiseptics." },
};

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

const mentors = [
    {
        name: 'Ramesh Kumar',
        nameKn: 'ರಮೇಶ್ ಕುಮಾರ್',
        role: 'Agriculture Expert (Coconut & Arecanut)',
        roleKn: 'ಕೃಷಿ ತಜ್ಞ (ತೆಂಗು ಮತ್ತು ಅಡಿಕೆ)',
        ward: 'Ward 3',
        wardKn: 'ವಾರ್ಡ್ 3',
        rating: '4.9',
        contact: '+91 94475 XXXXX',
        bio: '30+ years of farming experience. Specializes in soil health, natural composting, and organic pest control.',
        bioKn: '30+ ವರ್ಷಗಳ ಕೃಷಿ ಅನುಭವ. ಮಣ್ಣಿನ ಆರೋಗ್ಯ, ನೈಸರ್ಗಿಕ ಕಾಂಪೋಸ್ಟಿಂಗ್ ಮತ್ತು ಸಾವಯವ ಕೀಟ ನಿಯಂತ್ರಣದಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿದ್ದಾರೆ.'
    },
    {
        name: 'Gowri Amma',
        nameKn: 'ಗೌರಿ ಅಮ್ಮ',
        role: 'Traditional Pottery Art',
        roleKn: 'ಸಾಂಪ್ರದಾಯಿಕ ಮಣ್ಣಿನ ಮಡಕೆ ಕಲೆ',
        ward: 'Ward 5',
        wardKn: 'ವಾರ್ಡ್ 5',
        rating: '4.8',
        contact: '+91 98451 XXXXX',
        bio: 'Master artisan creating terracotta cookware and traditional clay artifacts for local festivals.',
        bioKn: 'ಸ್ಥಳೀಯ ಹಬ್ಬಗಳಿಗೆ ಟೆರಾಕೋಟಾ ಅಡುಗೆ ಪಾತ್ರೆಗಳು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಜೇಡಿಮಣ್ಣಿನ ಕಲಾಕೃತಿಗಳನ್ನು ರಚಿಸುವ ಪ್ರಮುಖ ಕುಶಲಕರ್ಮಿ.'
    },
    {
        name: 'Shankarappa Gowda',
        nameKn: 'ಶಂಕರಪ್ಪ ಗೌಡ',
        role: 'Master Wood Carver',
        roleKn: 'ಮರ ಕೆತ್ತನೆ ತಜ್ಞ',
        ward: 'Ward 2',
        wardKn: 'ವಾರ್ಡ್ 2',
        rating: '4.9',
        contact: '+91 95391 XXXXX',
        bio: 'Preserving the heritage of wooden temple carvings and traditional furniture design.',
        bioKn: 'ಮರದ ದೇವಸ್ಥಾನದ ಕೆತ್ತನೆಗಳು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಪೀಠೋಪಕರಣಗಳ ವಿನ್ಯಾಸದ ಪರಂಪರೆಯನ್ನು ಸಂರಕ್ಷಿಸುತ್ತಿದ್ದಾರೆ.'
    },
    {
        name: 'Dr. Leela Raju',
        nameKn: 'ಡಾ. ಲೀಲಾ ರಾಜು',
        role: 'Ayurveda & Herbal Practitioner',
        roleKn: 'ಆಯುರ್ವೇದ ಮತ್ತು ಗಿಡಮೂಲಿಕೆ ವೈದ್ಯರು',
        ward: 'Ward 4',
        wardKn: 'ವಾರ್ಡ್ 4',
        rating: '4.7',
        contact: '+91 96521 XXXXX',
        bio: 'Expertise in native medicinal plants and traditional wellness remedies for seasonal ailments.',
        bioKn: 'ಸ್ಥಳೀಯ ಔಷಧೀಯ ಸಸ್ಯಗಳು ಮತ್ತು ಕಾಲೋಚಿತ ಕಾಯಿಲೆಗಳಿಗೆ ಸಾಂಪ್ರದಾಯಿಕ ಕ್ಷೇಮ ಪರಿಹಾರಗಳಲ್ಲಿ ಪರಿಣತಿ.'
    }
];

const t = {
    en: {
        title: "Nimma-Guru",
        subtitle: "Village Expert Directory",
        searchPlaceholder: "Search expertise (e.g. soil, clay)...",
        tabGurus: "Gurus",
        tabGemini: "Gemini AI",
        tabKudos: "Kudos Wall",
        tabBookings: "Bookings",
        ward: "Ward",
        rating: "Rating",
        contact: "Call/SMS",
        bookBtn: "Schedule Session",
        bookingConfirmed: "Synced with Firebase",
        bookingPending: "Syncing...",
        askGeminiTitle: "AI Mentor Recommendations",
        askGeminiDesc: "Describe what skill or issue you want to learn/solve, and our Gemini model will find the perfect mentor.",
        askGeminiBtn: "Ask Gemini Assistant",
        askGeminiPlaceholder: "I want to learn soil conditioning or pottery...",
        kudosTitle: "Thank You Wall",
        kudosDesc: "Show appreciation to your local gurus for sharing their knowledge.",
        kudosFormName: "Your Name",
        kudosFormMentor: "Select Mentor",
        kudosFormMsg: "Your message of thanks...",
        kudosFormBtn: "Post Thank You Note"
    },
    kn: {
        title: "ನಿಮ್ಮ ಗುರು",
        subtitle: "ಗ್ರಾಮೀಣ ತಜ್ಞರ ಡೈರೆಕ್ಟರಿ",
        searchPlaceholder: "ವಿಷಯ ಹುಡುಕಿ (ಉದಾ: ಮಣ್ಣು, ಕೃಷಿ)...",
        tabGurus: "ಗುರುಗಳು",
        tabGemini: "ಗೇಮಿನಿ ಸಹಾಯಕ",
        tabKudos: "ಧನ್ಯವಾದ ಗೋಡೆ",
        tabBookings: "ಬುಕಿಂಗ್ಗಳು",
        ward: "ವಾರ್ಡ್",
        rating: "ರೇಟಿಂಗ್",
        contact: "ಕರೆ/ಸಂದೇಶ",
        bookBtn: "ತರಗತಿ ನಿಗದಿಪಡಿಸಿ",
        bookingConfirmed: "ಫೈರ್ಬೇಸ್ಗೆ ಸಿಂಕ್ ಆಗಿದೆ",
        bookingPending: "ಸಿಂಕ್ ಆಗುತ್ತಿದೆ...",
        askGeminiTitle: "AI ಶಿಫಾರಸು ಎಂಜಿನ್",
        askGeminiDesc: "ನೀವು ಯಾವ ಕೌಶಲ್ಯವನ್ನು ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ ಎಂದು ಬರೆಯಿರಿ, ನಮ್ಮ ಗೇಮಿನಿ ಮಾದರಿಯು ಸೂಕ್ತ ಮಾರ್ಗದರ್ಶಕರನ್ನು ಹುಡುಕುತ್ತದೆ.",
        askGeminiBtn: "ಗೇಮಿನಿಗೆ ಕೇಳಿ",
        askGeminiPlaceholder: "ಉದಾಹರಣೆಗೆ: ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಅಥವಾ ಮಡಕೆ ತಯಾರಿಕೆ...",
        kudosTitle: "ಧನ್ಯವಾದ ಗೋಡೆ",
        kudosDesc: "ಜ್ಞಾನವನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕಾಗಿ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಗುರುಗಳಿಗೆ ಧನ್ಯವಾದ ತಿಳಿಸಿ.",
        kudosFormName: "ನಿಮ್ಮ ಹೆಸರು",
        kudosFormMentor: "ಗುರುವನ್ನು ಆರಿಸಿ",
        kudosFormMsg: "ನಿಮ್ಮ ಧನ್ಯವಾದ ಸಂದೇಶ...",
        kudosFormBtn: "ಧನ್ಯವಾದ ಪೋಸ್ಟ್ ಮಾಡಿ"
    }
};



const CattleScannerSimulator: React.FC = () => {
    const [selectedCow, setSelectedCow] = useState<'cow1' | 'cow2' | 'cow3'>('cow1');
    const [scanState, setScanState] = useState<'idle' | 'scanning' | 'done'>('idle');
    const [progress, setProgress] = useState(0);


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

const MessyDataSimulator: React.FC = () => {
    const [step, setStep] = useState<'idle' | 'ingesting' | 'fuzzy' | 'reconciliation' | 'done'>('idle');
    const [ingestLogs, setIngestLogs] = useState<string[]>([]);
    const [activeSource, setActiveSource] = useState<'none' | 'pg' | 'api' | 'csv'>('none');
    const [progress, setProgress] = useState(0);
    const [reconciliationDecision, setReconciliationDecision] = useState<'none' | 'merge' | 'split'>('none');

    const runPipeline = () => {
        setStep('ingesting');
        setIngestLogs([]);
        setProgress(0);
    };

    useEffect(() => {
        if (step !== 'ingesting') return;

        const timeline = [
            { source: 'pg', time: 300, log: "Initializing Multi-Source ETL Pipeline Engine..." },
            { source: 'pg', time: 800, log: "[Legacy DB] Connecting to PostgreSQL datastore..." },
            { source: 'pg', time: 1300, log: "[Legacy DB] Executing query: SELECT id, name, email, phone, location FROM customer_profiles..." },
            { source: 'pg', time: 1800, log: "[Legacy DB] Successfully fetched 500 legacy records." },
            
            { source: 'api', time: 2400, log: "[SaaS API] Initializing dynamic SaaS API connector..." },
            { source: 'api', time: 2900, log: "[SaaS API] GET https://api.saas-client.com/v1/users?limit=100" },
            { source: 'api', time: 3400, log: "[SaaS API] WARNING: HTTP 429 Too Many Requests detected!" },
            { source: 'api', time: 3900, log: "[SaaS API] BACKOFF: Inspecting 'Retry-After: 2s' header. Waiting before retry..." },
            { source: 'api', time: 6000, log: "[SaaS API] RETRY: (Attempt 1) with jitter (tenacity block)..." },
            { source: 'api', time: 6500, log: "[SaaS API] WARNING: HTTP 503 Service Unavailable!" },
            { source: 'api', time: 7000, log: "[SaaS API] BACKOFF: Exponential retry (Attempt 2)..." },
            { source: 'api', time: 9200, log: "[SaaS API] RETRY: (Attempt 2) GET https://api.saas-client.com/v1/users..." },
            { source: 'api', time: 9700, log: "[SaaS API] SUCCESS: HTTP 200 OK. Ingested 350 profiles." },

            { source: 'csv', time: 10400, log: "[CSV Export] Scanning regional directory for CSV exports..." },
            { source: 'csv', time: 10900, log: "[CSV Export] Found 'regional_export_2026_07.csv'. Normalizing malformed columns..." },
            { source: 'csv', time: 11400, log: "[CSV Export] Cleaned 380 profiles (mapped phone format + lowercased emails)." },
            { source: 'none', time: 12000, log: "ETL INGESTION PHASE COMPLETE: 1,230 raw records cached in staging." }
        ];

        let index = 0;
        const start = Date.now();

        const timer = setInterval(() => {
            const elapsed = Date.now() - start;
            while (index < timeline.length && timeline[index].time <= elapsed) {
                const item = timeline[index];
                setIngestLogs(prev => [...prev, item.log]);
                setActiveSource(item.source as any);
                setProgress(Math.min(100, Math.round((index / timeline.length) * 100)));
                index++;
            }

            if (index >= timeline.length) {
                clearInterval(timer);
                setProgress(100);
                setTimeout(() => {
                    setStep('fuzzy');
                }, 1000);
            }
        }, 100);

        return () => clearInterval(timer);
    }, [step]);

    const [fuzzyLogs, setFuzzyLogs] = useState<string[]>([]);
    useEffect(() => {
        if (step !== 'fuzzy') return;

        const fuzzyTimeline = [
            "Initializing Fuzzy Matching Reconciliation Engine (RapidFuzz v3.4.0)...",
            "Mapping cross-record similarity comparison grid...",
            "COMPARE: 'John Doe' (Legacy DB) vs 'Jon Doe' (SaaS API) -> Token Sort Ratio: 92%",
            "DECISION: Auto-Merge [John Doe] (Confidence 92% >= 85% threshold)",
            "COMPARE: 'Alice Smith' (Legacy DB) vs 'Bob Smith' (CSV) -> Token Sort Ratio: 32%",
            "DECISION: Keep Separate [Bob Smith] (Confidence 32% < 60% threshold)",
            "COMPARE: 'Anirudh Sudheer' (SaaS API) vs 'Sudheer Anirudh' (CSV) -> Token Sort Ratio: 78%",
            "DECISION: Suspect Duplicate! Routing to Operator Review Queue (78% in 60%-85% window)",
            "Fuzzy processing complete. 1 matching task requires operator review."
        ];

        let index = 0;
        const timer = setInterval(() => {
            if (index < fuzzyTimeline.length) {
                setFuzzyLogs(prev => [...prev, fuzzyTimeline[index]]);
                index++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    setStep('reconciliation');
                }, 1500);
            }
        }, 500);

        return () => clearInterval(timer);
    }, [step]);

    return (
        <div className="space-y-4 text-retro-charcoal font-pixel">
            <div className="bg-black text-green-500 p-2 text-[10px] uppercase tracking-wider font-pixel flex justify-between">
                <span>System: MessyData ETL v1.0.0</span>
                {step !== 'idle' && step !== 'done' && <span className="animate-pulse">Processing...</span>}
            </div>

            {step === 'idle' && (
                <div className="border-4 border-black bg-white aspect-video p-6 flex flex-col justify-between items-center text-center">
                    <div className="space-y-2 mt-4">
                        <span className="material-symbols-outlined text-6xl text-retro-charcoal animate-bounce">database</span>
                        <div className="text-sm font-bold uppercase">MessyData Reconciliation Pipeline</div>
                        <div className="text-[10px] text-zinc-500 max-w-sm uppercase leading-relaxed font-body">
                            Resolve duplicate customer entries across multiple flaky and mismatched systems using fuzzy matching and a Streamlit manual review queue.
                        </div>
                    </div>
                    <button
                        onClick={runPipeline}
                        className="w-full py-2 bg-retro-orange border-2 border-black text-xs uppercase font-pixel shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                    >
                        Load & Run ETL Pipeline
                    </button>
                </div>
            )}

            {step === 'ingesting' && (
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                        <div className={`border-2 p-2 text-center text-[10px] uppercase ${activeSource === 'pg' ? 'bg-retro-yellow border-black text-black font-bold animate-pulse' : 'bg-white border-zinc-200 text-zinc-400'}`}>
                            <span className="material-symbols-outlined text-sm block">storage</span>
                            Legacy DB
                        </div>
                        <div className={`border-2 p-2 text-center text-[10px] uppercase ${activeSource === 'api' ? 'bg-retro-yellow border-black text-black font-bold animate-pulse' : 'bg-white border-zinc-200 text-zinc-400'}`}>
                            <span className="material-symbols-outlined text-sm block">cloud_sync</span>
                            Flaky API
                        </div>
                        <div className={`border-2 p-2 text-center text-[10px] uppercase ${activeSource === 'csv' ? 'bg-retro-yellow border-black text-black font-bold animate-pulse' : 'bg-white border-zinc-200 text-zinc-400'}`}>
                            <span className="material-symbols-outlined text-sm block">description</span>
                            CSV Exports
                        </div>
                    </div>

                    <div className="h-32 border-4 border-black bg-zinc-900 text-green-400 p-2 text-[9px] uppercase leading-tight overflow-y-auto space-y-1 font-pixel shadow-[inset_0px_0px_6px_rgba(0,255,0,0.3)]">
                        {ingestLogs.map((log, i) => {
                            let color = "text-green-400";
                            if (log.includes("WARNING")) color = "text-yellow-400";
                            if (log.includes("BACKOFF")) color = "text-retro-orange font-bold";
                            if (log.includes("SUCCESS") || log.includes("COMPLETE")) color = "text-sky-400 font-bold";
                            return <div key={i} className={color}>&gt; {log}</div>;
                        })}
                    </div>

                    <div className="w-full bg-zinc-200 h-4 border-2 border-black overflow-hidden relative">
                        <div className="bg-retro-orange h-full transition-all duration-100" style={{ width: `${progress}%` }} />
                        <div className="absolute inset-0 flex items-center justify-center text-[9px] font-pixel text-black font-bold">
                            INGESTION PROGRESS: {progress}%
                        </div>
                    </div>
                </div>
            )}

            {step === 'fuzzy' && (
                <div className="space-y-3">
                    <div className="border-4 border-black bg-zinc-900 text-green-400 p-4 aspect-video flex flex-col justify-between overflow-hidden shadow-[inset_0px_0px_8px_rgba(0,255,0,0.3)]">
                        <div className="space-y-1 overflow-y-auto h-full text-[9px] font-pixel uppercase leading-snug">
                            {fuzzyLogs.map((log, i) => {
                                let color = "text-green-400";
                                if (log.includes("AUTO-MERGE") || log.includes("Score: 92%")) color = "text-sky-400 font-bold";
                                if (log.includes("SUSPECT") || log.includes("Score: 78%")) color = "text-yellow-400 font-bold animate-pulse";
                                if (log.includes("SEPARATE")) color = "text-zinc-400";
                                return <div key={i} className={color}>&gt;&gt; {log}</div>;
                            })}
                        </div>
                        <div className="border-t border-green-800/40 pt-2 text-[9px] text-green-500 font-pixel animate-pulse">
                            COMPUTING RAPIDFUZZ MATRIX EMBEDDINGS...
                        </div>
                    </div>
                </div>
            )}

            {step === 'reconciliation' && (
                <div className="space-y-3">
                    <div className="bg-retro-orange/20 border-2 border-retro-orange p-2 text-center text-[9px] uppercase font-bold text-retro-orange">
                        ⚠️ 1 Suspect Duplicate Record in Manual Review Queue (Streamlit UI)
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[10px]">
                        <div className="border-2 border-black p-3 bg-white space-y-2 relative">
                            <div className="absolute top-1 right-2 bg-retro-charcoal text-white text-[8px] px-1 font-pixel uppercase">Record A (API)</div>
                            <div className="font-pixel border-b pb-1 font-bold text-zinc-800 uppercase mt-2">SaaS API Entry</div>
                            <div className="space-y-1 font-body text-[11px]">
                                <div><span className="font-pixel text-[8px] text-zinc-400 block uppercase">Name</span> Anirudh Sudheer</div>
                                <div><span className="font-pixel text-[8px] text-zinc-400 block uppercase">Email</span> anirudhsudheer@gmail.com</div>
                                <div><span className="font-pixel text-[8px] text-zinc-400 block uppercase">Phone</span> +91 95391 02851</div>
                                <div><span className="font-pixel text-[8px] text-zinc-400 block uppercase">Location</span> Kozhikode, India</div>
                            </div>
                        </div>

                        <div className="border-2 border-black p-3 bg-white space-y-2 relative">
                            <div className="absolute top-1 right-2 bg-retro-charcoal text-white text-[8px] px-1 font-pixel uppercase">Record B (CSV)</div>
                            <div className="font-pixel border-b pb-1 font-bold text-zinc-800 uppercase mt-2">CSV Export Entry</div>
                            <div className="space-y-1 font-body text-[11px]">
                                <div><span className="font-pixel text-[8px] text-zinc-400 block uppercase">Name</span> Sudheer Anirudh</div>
                                <div><span className="font-pixel text-[8px] text-zinc-400 block uppercase">Email</span> anirudhsudheer@outlook.com</div>
                                <div><span className="font-pixel text-[8px] text-zinc-400 block uppercase">Phone</span> 9539102851</div>
                                <div><span className="font-pixel text-[8px] text-zinc-400 block uppercase">Location</span> Calicut, Kerala</div>
                            </div>
                        </div>
                    </div>

                    {reconciliationDecision === 'none' ? (
                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={() => setReconciliationDecision('merge')}
                                className="flex-1 py-2 bg-retro-green border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                            >
                                Merge & Enrich
                            </button>
                            <button
                                onClick={() => setReconciliationDecision('split')}
                                className="flex-1 py-2 bg-white border-2 border-zinc-400 text-zinc-600 text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] active:translate-x-[2px] active:translate-y-[2px]"
                            >
                                Keep Separate
                            </button>
                        </div>
                    ) : reconciliationDecision === 'merge' ? (
                        <div className="space-y-3">
                            <div className="bg-green-100 border-2 border-retro-green p-2 text-[10px] text-green-700 font-bold uppercase text-center rounded">
                                ✔️ profiles merged successfully! target lineage updated.
                            </div>
                            <div className="bg-black text-sky-400 p-2.5 rounded border border-zinc-700 font-pixel text-[8px] overflow-x-auto whitespace-pre-wrap leading-tight shadow-[0px_0px_8px_rgba(56,189,248,0.25)]">
{`PROVENANCE AUDIT TRAIL LOG:
{
  "merged_id": "usr_94a8f",
  "primary_name": "Anirudh Sudheer",
  "contacts": [
    "anirudhsudheer@gmail.com",
    "anirudhsudheer@outlook.com"
  ],
  "lineage": [
    { "source": "SaaS_API", "record_id": "api_402", "confidence": "78%" },
    { "source": "CSV_Export", "record_id": "csv_109", "confidence": "100%" }
  ]
}`}
                            </div>
                            <button
                                onClick={() => setStep('done')}
                                className="w-full py-2 bg-retro-charcoal text-white border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                View Final Pipeline Audit
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="bg-zinc-100 border-2 border-zinc-400 p-2 text-[10px] text-zinc-600 font-bold uppercase text-center rounded">
                                ❌ profiles separated. new profile 'usr_94a90' registered.
                            </div>
                            <button
                                onClick={() => setStep('done')}
                                className="w-full py-2 bg-retro-charcoal text-white border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                View Final Pipeline Audit
                            </button>
                        </div>
                    )}
                </div>
            )}

            {step === 'done' && (
                <div className="border-4 border-black bg-retro-cream p-4 space-y-4">
                    <div className="font-pixel text-[10px] uppercase text-zinc-500 border-b pb-1 border-black/10">Pipeline Execution Report Card</div>
                    
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-pixel">
                        <div className="border border-black/15 bg-white p-2 text-center">
                            <div className="text-zinc-400 uppercase text-[8px]">Ingested Raw</div>
                            <div className="text-base font-bold text-retro-charcoal">1,230</div>
                        </div>
                        <div className="border border-black/15 bg-white p-2 text-center">
                            <div className="text-zinc-400 uppercase text-[8px]">Clean/Unified</div>
                            <div className="text-base font-bold text-retro-green">1,017</div>
                        </div>
                        <div className="border border-black/15 bg-white p-2 text-center">
                            <div className="text-zinc-400 uppercase text-[8px]">Auto-Merged</div>
                            <div className="text-base font-bold text-sky-500">212</div>
                        </div>
                        <div className="border border-black/15 bg-white p-2 text-center">
                            <div className="text-zinc-400 uppercase text-[8px]">Manual Matches</div>
                            <div className="text-base font-bold text-retro-orange">1</div>
                        </div>
                    </div>

                    <div className="text-[9px] uppercase leading-relaxed text-zinc-500 bg-white p-2 border-2 border-dashed border-black/15">
                        * Ingested SaaS Rest API navigated 2 server failures & 1 rate limit using tenacity backoff.
                        <br/>
                        * Normalized phone format drift & lowercased emails before fuzzy indexing.
                    </div>

                    <button
                        onClick={() => {
                            setStep('idle');
                            setIngestLogs([]);
                            setFuzzyLogs([]);
                            setReconciliationDecision('none');
                        }}
                        className="w-full py-2 bg-retro-green border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                    >
                        Restart Simulator
                    </button>
                </div>
            )}
        </div>
    );
};

const CommunityConnectSimulator: React.FC = () => {
    const [step, setStep] = useState<'idle' | 'auth' | 'claims' | 'supabase_rls' | 'realtime' | 'done'>('idle');
    
    // Auth Step State
    const [phoneNumber, setPhoneNumber] = useState('+91 95391 02851');
    const [authLogs, setAuthLogs] = useState<string[]>([]);
    const [otpSent, setOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [otpError, setOtpError] = useState(false);

    // Claims Step State
    const [claimsLogs, setClaimsLogs] = useState<string[]>([]);

    // Supabase RLS Step State
    const [rlsLogs, setRlsLogs] = useState<string[]>([]);

    // Realtime Broadcast Step State
    const [announcementText, setAnnouncementText] = useState('Urgent: Panchayat ward assembly meeting rescheduled to Sunday 9 AM.');
    const [broadcastLogs, setBroadcastLogs] = useState<string[]>([]);
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [phoneScreenOn, setPhoneScreenOn] = useState(false);
    const [notificationReceived, setNotificationReceived] = useState(false);

    // Run auth flow
    const triggerSendOtp = () => {
        if (!phoneNumber) return;
        setAuthLogs(prev => [...prev, `[Firebase Auth] Sending verification SMS OTP to ${phoneNumber}...`]);
        setTimeout(() => {
            setAuthLogs(prev => [...prev, `[Firebase Auth] SMS OTP delivered successfully. Code: 481029`]);
            setOtpSent(true);
        }, 1200);
    };

    const verifyOtp = () => {
        if (otpCode === '481029') {
            setAuthLogs(prev => [...prev, `[Firebase Auth] Code verified. Session ID fb_sess_x918 created.`]);
            setTimeout(() => {
                setStep('claims');
            }, 1000);
        } else {
            setOtpError(true);
            setAuthLogs(prev => [...prev, `[Firebase Auth] ERROR: Invalid OTP verification code. Try again.`]);
        }
    };

    // Firebase custom claims injection trigger simulation
    useEffect(() => {
        if (step !== 'claims') return;
        setClaimsLogs([]);
        
        const claimsTimeline = [
            { time: 200, log: "Initializing Firebase Cloud Function triggers..." },
            { time: 800, log: "[Cloud Function] user_created_trigger.js: New sign-up detected for uid 'fb_usr_881b2'." },
            { time: 1400, log: "[Cloud Function] Fetching Supabase target schema specifications..." },
            { time: 2000, log: "[Cloud Function] Injecting custom claims: { role: 'authenticated', provider: 'firebase' }" },
            { time: 2600, log: "[Cloud Function] Syncing session token claims. Metadata validation complete." },
            { time: 3200, log: "SUCCESS: Custom claims injected into Firebase Auth JWT." }
        ];

        let index = 0;
        const timer = setInterval(() => {
            if (index < claimsTimeline.length) {
                setClaimsLogs(prev => [...prev, claimsTimeline[index].log]);
                index++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    setStep('supabase_rls');
                }, 1200);
            }
        }, 600);

        return () => clearInterval(timer);
    }, [step]);

    // Supabase RLS verification simulation
    useEffect(() => {
        if (step !== 'supabase_rls') return;
        setRlsLogs([]);

        const rlsTimeline = [
            "Initializing Supabase Client...",
            "Passing Firebase JWT Token to session cache...",
            "supabase.auth.setSession({ access_token: Firebase_OIDC_JWT })",
            "Supabase DB: Decoded JWT claims headers...",
            "Checking claims -> auth.jwt() ->> 'role' = 'authenticated'",
            "Evaluating policy 'select_announcements' on table 'announcements'...",
            "RLS rule: USING (auth.jwt() ->> 'role' = 'authenticated' AND auth.jwt() ->> 'provider' = 'firebase')",
            "Result: TRUE -> Access GRANTED.",
            "Supabase RLS evaluation PASSED! Data fetched successfully."
        ];

        let index = 0;
        const timer = setInterval(() => {
            if (index < rlsTimeline.length) {
                setRlsLogs(prev => [...prev, rlsTimeline[index]]);
                index++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    setStep('realtime');
                }, 1500);
            }
        }, 500);

        return () => clearInterval(timer);
    }, [step]);

    // Broadcast FCM Push & Real-time Channel simulation
    const runBroadcast = () => {
        if (!announcementText) return;
        setIsBroadcasting(true);
        setBroadcastLogs([`[Supabase Realtime] Initiating announcement broadcast...`]);

        setTimeout(() => {
            setBroadcastLogs(prev => [...prev, `[Supabase Realtime] Payload pushed to channel 'ward_9_announcements'.`]);
        }, 800);

        setTimeout(() => {
            setBroadcastLogs(prev => [...prev, `[Firebase Admin SDK] Triggered FCM push request for ward 9 family devices.`]);
            setPhoneScreenOn(true);
        }, 1500);

        setTimeout(() => {
            setBroadcastLogs(prev => [...prev, `[FCM Engine] Broadcast complete. Pushed alerts to 125 active app instances.`]);
            setNotificationReceived(true);
            setIsBroadcasting(false);
        }, 2500);
    };

    return (
        <div className="space-y-4 text-retro-charcoal font-pixel">
            <div className="bg-black text-green-500 p-2 text-[10px] uppercase tracking-wider font-pixel flex justify-between">
                <span>System: CommunityConnect Staging Sandbox v0.1.0-beta</span>
                {step !== 'idle' && step !== 'done' && <span className="animate-pulse">Active Sandbox</span>}
            </div>

            {step === 'idle' && (
                <div className="border-4 border-black bg-white aspect-video p-6 flex flex-col justify-between items-center text-center">
                    <div className="space-y-2 mt-4">
                        <span className="material-symbols-outlined text-6xl text-retro-charcoal animate-bounce">groups</span>
                        <div className="text-sm font-bold uppercase">CommunityConnect Beta Sandbox</div>
                        <div className="text-[10px] text-zinc-500 max-w-sm uppercase leading-relaxed font-body">
                            Simulate the hybrid auth flow connecting Firebase Auth to Supabase database, and test real-time push notification broadcasts.
                        </div>
                    </div>
                    <button
                        onClick={() => setStep('auth')}
                        className="w-full py-2 bg-retro-orange border-2 border-black text-xs uppercase font-pixel shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                    >
                        Initialize Beta Sandbox
                    </button>
                </div>
            )}

            {step === 'auth' && (
                <div className="space-y-3">
                    <div className="border-2 border-black p-3 bg-white space-y-3">
                        <div className="text-[10px] uppercase font-bold text-zinc-500">Firebase OTP Signup Simulator</div>
                        
                        <div className="space-y-1">
                            <label className="text-[9px] text-zinc-400 block uppercase">Mobile Number</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    disabled={otpSent}
                                    className="flex-grow border-2 border-black px-2 py-1 text-xs font-pixel bg-retro-cream text-black"
                                />
                                <button
                                    onClick={triggerSendOtp}
                                    disabled={otpSent}
                                    className="px-3 bg-retro-yellow border-2 border-black text-[10px] uppercase font-bold disabled:opacity-50"
                                >
                                    Send OTP
                                </button>
                            </div>
                        </div>

                        {otpSent && (
                            <div className="space-y-1 animate-fade-in">
                                <label className="text-[9px] text-zinc-400 block uppercase">Enter SMS OTP Code (Delivered: 481029)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        value={otpCode}
                                        onChange={(e) => {
                                            setOtpCode(e.target.value);
                                            setOtpError(false);
                                        }}
                                        className={`flex-grow border-2 px-2 py-1 text-xs font-pixel bg-retro-cream text-black ${otpError ? 'border-red-500' : 'border-black'}`}
                                    />
                                    <button
                                        onClick={verifyOtp}
                                        className="px-3 bg-retro-green border-2 border-black text-[10px] uppercase font-bold"
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="h-28 border-4 border-black bg-zinc-900 text-green-400 p-2 text-[9px] uppercase leading-tight overflow-y-auto space-y-1 font-pixel shadow-[inset_0px_0px_6px_rgba(0,255,0,0.3)]">
                        {authLogs.length === 0 ? (
                            <div className="text-zinc-500">&gt; Waiting to start OTP flow...</div>
                        ) : (
                            authLogs.map((log, i) => <div key={i}>&gt; {log}</div>)
                        )}
                    </div>
                </div>
            )}

            {step === 'claims' && (
                <div className="space-y-3">
                    <div className="border-4 border-black bg-zinc-900 text-green-400 p-4 aspect-video flex flex-col justify-between overflow-hidden shadow-[inset_0px_0px_8px_rgba(0,255,0,0.3)]">
                        <div className="space-y-1 overflow-y-auto h-full text-[9px] font-pixel uppercase leading-snug">
                            {claimsLogs.map((log, i) => {
                                let color = "text-green-400";
                                if (log.includes("Injecting") || log.includes("claims:")) color = "text-yellow-400 font-bold";
                                if (log.includes("SUCCESS")) color = "text-sky-400 font-bold animate-pulse";
                                return <div key={i} className={color}>&gt; {log}</div>;
                            })}
                        </div>
                        <div className="border-t border-green-800/40 pt-2 text-[9px] text-green-500 font-pixel animate-pulse">
                            FIREBASE AUTH TRIGGERS RUNNING...
                        </div>
                    </div>
                </div>
            )}

            {step === 'supabase_rls' && (
                <div className="space-y-3">
                    <div className="border-4 border-black bg-zinc-900 text-green-400 p-4 aspect-video flex flex-col justify-between overflow-hidden shadow-[inset_0px_0px_8px_rgba(0,255,0,0.3)]">
                        <div className="space-y-1 overflow-y-auto h-full text-[9px] font-pixel uppercase leading-snug">
                            {rlsLogs.map((log, i) => {
                                let color = "text-green-400";
                                if (log.includes("auth.jwt()")) color = "text-yellow-400";
                                if (log.includes("GRANTED") || log.includes("PASSED")) color = "text-sky-400 font-bold animate-pulse";
                                return <div key={i} className={color}>&gt; {log}</div>;
                            })}
                        </div>
                        <div className="border-t border-green-800/40 pt-2 text-[9px] text-green-500 font-pixel animate-pulse">
                            SUPABASE ROW-LEVEL SECURITY POLICY ENGINE...
                        </div>
                    </div>
                </div>
            )}

            {step === 'realtime' && (
                <div className="space-y-3">
                    <div className="bg-retro-green/20 border-2 border-retro-green p-2 text-center text-[9px] uppercase font-bold text-retro-green">
                        ✔️ Firebase/Supabase Session Synced. Broadcaster Ready.
                    </div>

                    <div className="grid grid-cols-5 gap-3 text-[10px]">
                        <div className="col-span-3 border-2 border-black p-3 bg-white space-y-3 flex flex-col justify-between">
                            <div>
                                <div className="font-pixel border-b pb-1 font-bold text-zinc-800 uppercase text-[9px]">Admin Panel Console</div>
                                <div className="space-y-2 mt-2">
                                    <label className="font-pixel text-[8px] text-zinc-400 block uppercase">Announcement Text</label>
                                    <textarea
                                        value={announcementText}
                                        onChange={(e) => setAnnouncementText(e.target.value)}
                                        disabled={isBroadcasting}
                                        rows={3}
                                        className="w-full border-2 border-black p-1 text-[9px] font-pixel bg-retro-cream text-black resize-none uppercase leading-snug"
                                    />
                                </div>
                            </div>
                            
                            <button
                                onClick={runBroadcast}
                                disabled={isBroadcasting}
                                className="w-full py-1.5 bg-retro-orange border-2 border-black text-[9px] uppercase font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50 text-black"
                            >
                                {isBroadcasting ? "Broadcasting..." : "Broadcast Alert"}
                            </button>
                        </div>

                        <div className="col-span-2 flex flex-col items-center justify-center">
                            <div className={`w-28 h-48 border-4 border-black rounded-lg bg-zinc-950 p-1 flex flex-col justify-between relative transition-all duration-300 ${phoneScreenOn ? 'shadow-[0px_0px_12px_rgba(251,191,36,0.3)]' : ''}`}>
                                <div className="w-8 h-1 bg-black rounded-full mx-auto" />
                                
                                <div className={`flex-grow border-2 border-black rounded mt-1 bg-zinc-900 overflow-hidden relative flex flex-col justify-between p-1.5 transition-colors duration-300 ${phoneScreenOn ? 'bg-sky-900/45' : 'bg-black'}`}>
                                    {phoneScreenOn ? (
                                        <>
                                            <div className="flex justify-between text-[6px] text-white/60 font-pixel uppercase">
                                                <span>12:00</span>
                                                <span>fcm 📶</span>
                                            </div>
                                            
                                            {notificationReceived && (
                                                <div className="bg-white border border-black p-1 rounded space-y-1 shadow-md animate-bounce mt-2 text-black">
                                                    <div className="flex items-center gap-0.5 text-black">
                                                        <span className="material-symbols-outlined text-[8px]">groups</span>
                                                        <span className="text-[6px] font-bold font-pixel uppercase tracking-tight">CommunityConnect</span>
                                                    </div>
                                                    <div className="text-[6px] font-body text-zinc-700 leading-tight uppercase font-bold">
                                                        {announcementText.length > 50 ? announcementText.substring(0, 47) + '...' : announcementText}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="text-center text-[7px] text-white/40 uppercase mt-auto mb-1">
                                                Beta Mobile Client
                                            </div>
                                        </>
                                    ) : (
                                        <div className="m-auto text-[7px] text-zinc-700 uppercase">OFFLINE</div>
                                    )}
                                </div>

                                <div className="w-3 h-3 border border-zinc-700 rounded-full mx-auto mt-1 cursor-pointer" />
                            </div>
                            <span className="text-[8px] text-zinc-500 uppercase mt-1">Mock Mobile App</span>
                        </div>
                    </div>

                    <div className="h-16 border-2 border-black bg-zinc-900 text-green-400 p-1 text-[8px] uppercase leading-tight overflow-y-auto space-y-0.5 font-pixel">
                        {broadcastLogs.map((log, i) => <div key={i}>&gt; {log}</div>)}
                    </div>

                    {notificationReceived && (
                        <button
                            onClick={() => setStep('done')}
                            className="w-full py-2 bg-retro-green border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black"
                        >
                            Verify & Finish Testing
                        </button>
                    )}
                </div>
            )}

            {step === 'done' && (
                <div className="border-4 border-black bg-retro-cream p-4 space-y-4">
                    <div className="font-pixel text-[10px] uppercase text-zinc-500 border-b pb-1 border-black/10">Staging Sandbox Verification Card</div>
                    
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-pixel">
                        <div className="border border-black/15 bg-white p-2 text-center">
                            <div className="text-zinc-400 uppercase text-[8px]">OIDC Provider</div>
                            <div className="text-xs font-bold text-retro-charcoal">Firebase</div>
                        </div>
                        <div className="border border-black/15 bg-white p-2 text-center">
                            <div className="text-zinc-400 uppercase text-[8px]">Target Database</div>
                            <div className="text-xs font-bold text-retro-green">Supabase DB</div>
                        </div>
                        <div className="border border-black/15 bg-white p-2 text-center">
                            <div className="text-zinc-400 uppercase text-[8px]">RLS Policies</div>
                            <div className="text-xs font-bold text-sky-500">Verified</div>
                        </div>
                        <div className="border border-black/15 bg-white p-2 text-center">
                            <div className="text-zinc-400 uppercase text-[8px]">FCM Channels</div>
                            <div className="text-xs font-bold text-retro-orange">Broadcasting</div>
                        </div>
                    </div>

                    <div className="text-[9px] uppercase leading-relaxed text-zinc-500 bg-white p-2 border-2 border-dashed border-black/15">
                        * Custom OIDC claim injection prevents unauthorized Supabase table mutations.
                        <br/>
                        * Staging environment configured for real-time Firebase OTP verification loops.
                    </div>

                    <button
                        onClick={() => {
                            setStep('idle');
                            setOtpSent(false);
                            setOtpCode('');
                            setOtpError(false);
                            setAuthLogs([]);
                            setClaimsLogs([]);
                            setRlsLogs([]);
                            setBroadcastLogs([]);
                            setPhoneScreenOn(false);
                            setNotificationReceived(false);
                        }}
                        className="w-full py-2 bg-retro-green border-2 border-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] text-black"
                    >
                        Restart Sandbox Simulator
                    </button>
                </div>
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

const NimmaGuruSimulator: React.FC = () => {
    const [language, setLanguage] = useState<'en' | 'kn'>('en');
    const [tab, setTab] = useState<'directory' | 'gemini' | 'kudos' | 'bookings'>('directory');
    const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [bookings, setBookings] = useState<any[]>([
        { id: 1, mentorName: 'Ramesh Kumar', mentorNameKn: 'ರಮೇಶ್ ಕುಮಾರ್', date: '2026-07-05', time: '10:00 AM', status: 'Confirmed' }
    ]);
    const [newKudos, setNewKudos] = useState({ name: '', mentor: 'Ramesh Kumar', message: '' });
    const [kudosList, setKudosList] = useState<any[]>([
        { id: 1, sender: 'Anand S.', senderKn: 'ಆನಂದ್ ಎಸ್.', mentor: 'Ramesh Kumar', mentorKn: 'ರಮೇಶ್ ಕುಮಾರ್', text: 'Helped resolve my soil acidity issue in one visit!', textKn: 'ಕೇವಲ ಒಂದು ಭೇಟಿಯಲ್ಲಿ ನನ್ನ ಮಣ್ಣಿನ ಆಮ್ಲೀಯತೆಯ ಸಮಸ್ಯೆಯನ್ನು ಬಗೆಹರಿಸಲು ಸಹಾಯ ಮಾಡಿದರು!' },
        { id: 2, sender: 'Meera K.', senderKn: 'ಮೀರಾ ಕೆ.', mentor: 'Gowri Amma', mentorKn: 'ಗೌರಿ ಅಮ್ಮ', text: 'Patient teacher. My kids loved learning pottery basics.', textKn: 'ಅತ್ಯಂತ ತಾಳ್ಮೆಯ ಶಿಕ್ಷಕಿ. ನನ್ನ ಮಕ್ಕಳಿಗೆ ಮಡಕೆ ತಯಾರಿಕೆಯ ಮೂಲಭೂತ ಅಂಶಗಳನ್ನು ಕಲಿಯಲು ತುಂಬಾ ಖುಷಿಯಾಯಿತು.' }
    ]);

    const [geminiQuery, setGeminiQuery] = useState('');
    const [geminiLogs, setGeminiLogs] = useState<string[]>([]);
    const [geminiResult, setGeminiResult] = useState<any | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);


    const handleGeminiAsk = () => {
        if (!geminiQuery) return;
        setIsProcessing(true);
        setGeminiLogs([]);
        setGeminiResult(null);

        const logs = [
            language === 'kn' 
                ? "[Gemini 2.0] ಧ್ವನಿ/ಪಠ್ಯ ಇನ್‌ಪುಟ್ ಸ್ವೀಕರಿಸಲಾಗಿದೆ..." 
                : "[Gemini 2.0] Voice/Text Query received...",
            language === 'kn'
                ? "[Gemini 2.0] ಮೃದುವಾದ ಪ್ರಾಂಪ್ಟ್ ಟೆಂಪ್ಲೇಟ್ ಅನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ..."
                : "[Gemini 2.0] Loading soft prompt template for rural expert mapping...",
            language === 'kn'
                ? "[Gemini 2.0] ತಜ್ಞರ ವೆಕ್ಟರ್ ಪ್ರೊಫೈಲ್ ಡೇಟಾಬೇಸ್ ಅನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗುತ್ತಿದೆ..."
                : "[Gemini 2.0] Scanning expert vector profiles database...",
            language === 'kn'
                ? "[Gemini 2.0] ಮ್ಯಾಪಿಂಗ್ ಪೂರ್ಣಗೊಂಡಿದೆ. ನಿಕಟ ಹೊಂದಾಣಿಕೆಯನ್ನು ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ."
                : "[Gemini 2.0] Matching index computed. Nearest neighbor selected."
        ];

        let idx = 0;
        const interval = setInterval(() => {
            if (idx < logs.length) {
                setGeminiLogs(prev => [...prev, logs[idx]]);
                idx++;
            } else {
                clearInterval(interval);
                setIsProcessing(false);

                const queryLower = geminiQuery.toLowerCase();
                let matched = mentors[0];
                if (queryLower.includes('pottery') || queryLower.includes('clay') || queryLower.includes('ಮಡಕೆ') || queryLower.includes('ಜೇಡಿಮಣ್ಣು')) {
                    matched = mentors[1];
                } else if (queryLower.includes('wood') || queryLower.includes('carving') || queryLower.includes('ಮರ') || queryLower.includes('ಕೆತ್ತನೆ')) {
                    matched = mentors[2];
                } else if (queryLower.includes('ayurveda') || queryLower.includes('medicine') || queryLower.includes('ಆಯುರ್ವೇದ') || queryLower.includes('ಔಷಧ') || queryLower.includes('herbal')) {
                    matched = mentors[3];
                }
                setGeminiResult(matched);
            }
        }, 400);
    };

    const handleBookSession = (mentor: any) => {
        const newBooking = {
            id: Date.now(),
            mentorName: mentor.name,
            mentorNameKn: mentor.nameKn,
            date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
            time: '11:00 AM',
            status: 'Pending Sync'
        };

        setBookings(prev => [...prev, newBooking]);
        
        setTimeout(() => {
            setBookings(curr => curr.map(b => b.id === newBooking.id ? { ...b, status: 'Confirmed' } : b));
        }, 1500);
    };

    const handleAddKudos = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newKudos.name || !newKudos.message) return;

        const entry = {
            id: Date.now(),
            sender: newKudos.name,
            senderKn: newKudos.name,
            mentor: newKudos.mentor,
            mentorKn: mentors.find(m => m.name === newKudos.mentor)?.nameKn || newKudos.mentor,
            text: newKudos.message,
            textKn: newKudos.message
        };

        setKudosList(prev => [entry, ...prev]);
        setNewKudos({ name: '', mentor: 'Ramesh Kumar', message: '' });
    };


    const activeT = t[language];

    const filteredMentors = mentors.filter(m => {
        const term = searchQuery.toLowerCase();
        return (
            m.name.toLowerCase().includes(term) ||
            m.nameKn.includes(term) ||
            m.role.toLowerCase().includes(term) ||
            m.roleKn.includes(term) ||
            m.bio.toLowerCase().includes(term) ||
            m.bioKn.includes(term)
        );
    });

    return (
        <div className="space-y-4 text-retro-charcoal font-pixel">
            {/* Bilingual Header Toggle */}
            <div className="bg-orange-600 text-white p-2.5 text-[10px] uppercase tracking-wider font-pixel flex justify-between items-center border-b-2 border-black rounded shadow-[0_4px_12px_rgba(234,88,12,0.15)]">
                <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs animate-pulse text-yellow-300">spa</span>
                    <span>{language === 'kn' ? "ನಿಮ್ಮ ಗುರು: ಗ್ರಾಮೀಣ ಸಂಪರ್ಕ" : "NIMMA-GURU: VILLAGE CONNECT"}</span>
                </div>
                <div className="flex border border-white/40 rounded overflow-hidden">
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-2 py-0.5 text-[8px] font-bold ${language === 'en' ? 'bg-yellow-400 text-black' : 'bg-transparent text-white'}`}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => setLanguage('kn')}
                        className={`px-2 py-0.5 text-[8px] font-bold ${language === 'kn' ? 'bg-yellow-400 text-black' : 'bg-transparent text-white'}`}
                    >
                        ಕನ್ನಡ
                    </button>
                </div>
            </div>

            {/* Simulated Android Device Wrapper */}
            <div className="border-4 border-amber-800 bg-amber-50 rounded-xl overflow-hidden p-2 shadow-[inset_0px_0px_10px_rgba(139,92,26,0.2)]">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-2 py-0.5 text-[8px] text-amber-900/60 uppercase border-b border-amber-900/10 mb-2">
                    <span>9:41 AM</span>
                    <span className="flex items-center gap-1">
                        <span>bilingual 📶</span>
                        <span>100% 🔋</span>
                    </span>
                </div>

                {/* Sub-navigation tabs */}
                <div className="grid grid-cols-4 gap-1 text-[8px] mb-3">
                    {(['directory', 'gemini', 'kudos', 'bookings'] as const).map(tabKey => {
                        const active = tab === tabKey;
                        let label = "";
                        if (tabKey === 'directory') label = activeT.tabGurus;
                        if (tabKey === 'gemini') label = activeT.tabGemini;
                        if (tabKey === 'kudos') label = activeT.tabKudos;
                        if (tabKey === 'bookings') label = activeT.tabBookings;

                        return (
                            <button
                                key={tabKey}
                                onClick={() => { setTab(tabKey); setSelectedMentor(null); }}
                                className={`py-1.5 border border-black rounded uppercase text-center font-bold transition-all ${active ? 'bg-orange-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-zinc-600'}`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                {/* Directory Tab */}
                {tab === 'directory' && !selectedMentor && (
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {/* Search Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={activeT.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-[9px] font-pixel border border-black rounded p-1.5 bg-white text-black outline-none placeholder:text-zinc-400"
                            />
                        </div>

                        {/* List */}
                        {filteredMentors.map((m, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedMentor(m)}
                                className="bg-white border-2 border-black rounded p-2.5 flex justify-between items-start cursor-pointer hover:bg-orange-50/50 hover:border-orange-500 transition-colors"
                            >
                                <div className="space-y-1 text-left min-w-0">
                                    <div className="text-[10px] font-bold text-zinc-800 uppercase flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[10px] text-orange-600">account_circle</span>
                                        {language === 'kn' ? m.nameKn : m.name}
                                    </div>
                                    <div className="text-[8px] text-zinc-500 leading-tight uppercase truncate">
                                        {language === 'kn' ? m.roleKn : m.role}
                                    </div>
                                    <div className="text-[7px] font-pixel bg-green-100 text-green-800 border border-green-200 inline-block px-1 rounded uppercase">
                                        {language === 'kn' ? m.wardKn : m.ward}
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-[9px] text-yellow-600 font-bold flex items-center justify-end gap-0.5">
                                        ★ {m.rating}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Directory Details Screen */}
                {tab === 'directory' && selectedMentor && (
                    <div className="bg-white border-2 border-black rounded p-3 text-left space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-xs font-bold text-zinc-800 uppercase flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs text-orange-600">account_circle</span>
                                    {language === 'kn' ? selectedMentor.nameKn : selectedMentor.name}
                                </h4>
                                <p className="text-[8px] text-zinc-500 uppercase mt-0.5">
                                    {language === 'kn' ? selectedMentor.roleKn : selectedMentor.role}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedMentor(null)}
                                className="px-1.5 py-0.5 border border-black rounded text-[8px] uppercase bg-zinc-100 font-pixel"
                            >
                                {language === 'kn' ? "ಹಿಂದಕ್ಕೆ" : "Back"}
                            </button>
                        </div>

                        <div className="h-0.5 border-t border-dashed border-black/10" />

                        <div className="space-y-1.5">
                            <div className="text-[8px] text-zinc-400 uppercase">Bio / ಪರಿಚಯ</div>
                            <p className="text-[9px] text-zinc-700 leading-normal font-body uppercase font-bold">
                                {language === 'kn' ? selectedMentor.bioKn : selectedMentor.bio}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[8px]">
                            <div className="bg-zinc-50 border border-black/10 p-1.5 rounded">
                                <div className="text-zinc-400 uppercase text-[7px]">{activeT.ward}</div>
                                <div className="font-bold text-zinc-700 uppercase">{language === 'kn' ? selectedMentor.wardKn : selectedMentor.ward}</div>
                            </div>
                            <div className="bg-zinc-50 border border-black/10 p-1.5 rounded">
                                <div className="text-zinc-400 uppercase text-[7px]">{activeT.rating}</div>
                                <div className="font-bold text-yellow-600 uppercase">★ {selectedMentor.rating}</div>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={() => handleBookSession(selectedMentor)}
                                className="flex-1 py-1.5 bg-orange-500 text-white border border-black rounded text-[8px] uppercase font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            >
                                {activeT.bookBtn}
                            </button>
                            <a
                                href={`tel:${selectedMentor.contact}`}
                                className="px-3 py-1.5 bg-green-600 text-white border border-black rounded text-[8px] uppercase font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-1 justify-center"
                            >
                                <span className="material-symbols-outlined text-[10px]">call</span>
                                {activeT.contact}
                            </a>
                        </div>
                    </div>
                )}

                {/* Gemini AI tab */}
                {tab === 'gemini' && (
                    <div className="space-y-3">
                        <div className="bg-white border-2 border-black rounded p-3 text-left space-y-2">
                            <h4 className="text-[10px] font-bold text-zinc-800 uppercase flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-xs text-sky-500 animate-pulse">model_training</span>
                                {activeT.askGeminiTitle}
                            </h4>
                            <p className="text-[8px] text-zinc-500 leading-normal uppercase">
                                {activeT.askGeminiDesc}
                            </p>

                            <div className="flex gap-1.5 mt-2">
                                <input
                                    type="text"
                                    placeholder={activeT.askGeminiPlaceholder}
                                    value={geminiQuery}
                                    onChange={(e) => setGeminiQuery(e.target.value)}
                                    disabled={isProcessing}
                                    className="flex-grow text-[9px] font-pixel border border-black rounded p-1.5 bg-white text-black outline-none placeholder:text-zinc-400"
                                />
                                <button
                                    onClick={handleGeminiAsk}
                                    disabled={isProcessing}
                                    className="px-2.5 bg-sky-500 text-white border border-black rounded text-[8px] uppercase font-bold disabled:opacity-50"
                                >
                                    {activeT.askGeminiBtn.split(' ')[0]}
                                </button>
                            </div>
                        </div>

                        {/* Processing terminal logs */}
                        {(geminiLogs.length > 0 || isProcessing) && (
                            <div className="h-24 border-2 border-black bg-zinc-900 text-green-400 p-2 text-[8px] uppercase leading-tight overflow-y-auto space-y-0.5 font-pixel rounded text-left shadow-[inset_0px_0px_6px_rgba(0,255,0,0.25)]">
                                {geminiLogs.map((log, index) => <div key={index}>&gt; {log}</div>)}
                                {isProcessing && <div className="animate-pulse">&gt; Processing prompt tokens...</div>}
                            </div>
                        )}

                        {/* Gemini result matched mentor */}
                        {geminiResult && (
                            <div className="bg-green-50 border-2 border-green-600 rounded p-2.5 text-left flex justify-between items-center animate-fade-in">
                                <div className="space-y-1 min-w-0">
                                    <div className="text-[7px] text-green-700 font-pixel uppercase font-bold">Recommended Mentor matched</div>
                                    <div className="text-[9px] font-bold text-zinc-800 uppercase">
                                        {language === 'kn' ? geminiResult.nameKn : geminiResult.name}
                                    </div>
                                    <div className="text-[7px] text-zinc-500 uppercase truncate">
                                        {language === 'kn' ? geminiResult.roleKn : geminiResult.role}
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setSelectedMentor(geminiResult); setTab('directory'); }}
                                    className="px-2 py-1 bg-green-600 text-white border border-black rounded text-[8px] uppercase font-bold"
                                >
                                    {language === 'kn' ? "ವಿವರ ನೋಡಿ" : "View"}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Kudos Wall tab */}
                {tab === 'kudos' && (
                    <div className="space-y-3">
                        {/* Kudos post form */}
                        <form onSubmit={handleAddKudos} className="bg-white border-2 border-black rounded p-3 text-left space-y-2">
                            <h4 className="text-[9px] font-bold text-zinc-800 uppercase">{activeT.kudosTitle}</h4>
                            <p className="text-[7px] text-zinc-400 uppercase leading-snug">{activeT.kudosDesc}</p>
                            
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-0.5">
                                    <label className="text-[7px] text-zinc-400 uppercase">{activeT.kudosFormName}</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Anand"
                                        value={newKudos.name}
                                        onChange={(e) => setNewKudos({ ...newKudos, name: e.target.value })}
                                        className="w-full text-[8px] font-pixel border border-black rounded p-1 bg-zinc-50 text-black outline-none"
                                    />
                                </div>
                                <div className="space-y-0.5">
                                    <label className="text-[7px] text-zinc-400 uppercase">{activeT.kudosFormMentor}</label>
                                    <select
                                        value={newKudos.mentor}
                                        onChange={(e) => setNewKudos({ ...newKudos, mentor: e.target.value })}
                                        className="w-full text-[8px] font-pixel border border-black rounded p-1 bg-zinc-50 text-black outline-none h-6 uppercase"
                                    >
                                        {mentors.map((m, idx) => (
                                            <option key={idx} value={m.name}>{language === 'kn' ? m.nameKn : m.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-0.5">
                                <label className="text-[7px] text-zinc-400 uppercase">{activeT.kudosFormMsg}</label>
                                <input
                                    type="text"
                                    placeholder="Thank you for..."
                                    value={newKudos.message}
                                    onChange={(e) => setNewKudos({ ...newKudos, message: e.target.value })}
                                    className="w-full text-[8px] font-pixel border border-black rounded p-1 bg-zinc-50 text-black outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-1.5 bg-orange-500 text-white border border-black rounded text-[8px] uppercase font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            >
                                {activeT.kudosFormBtn}
                            </button>
                        </form>

                        {/* List of thank-you cards */}
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                            {kudosList.map((k, idx) => (
                                <div key={idx} className="bg-yellow-50 border border-yellow-300 rounded p-2 text-left space-y-1 relative shadow-sm">
                                    <div className="flex justify-between text-[7px] font-bold text-orange-800 uppercase">
                                        <span>From: {language === 'kn' ? k.senderKn : k.sender}</span>
                                        <span>To: {language === 'kn' ? k.mentorKn : k.mentor}</span>
                                    </div>
                                    <p className="text-[8px] text-zinc-700 leading-snug italic font-body font-bold">
                                        "{language === 'kn' ? k.textKn : k.text}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Scheduled Bookings Tab */}
                {tab === 'bookings' && (
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {bookings.map((b, idx) => (
                            <div key={idx} className="bg-white border border-black rounded p-2.5 text-left flex justify-between items-center shadow-sm">
                                <div className="space-y-1 min-w-0">
                                    <div className="text-[9px] font-bold text-zinc-800 uppercase">
                                        {language === 'kn' ? b.mentorNameKn : b.mentorName}
                                    </div>
                                    <div className="text-[7px] text-zinc-500 uppercase">
                                        {b.date} @ {b.time}
                                    </div>
                                </div>
                                <div className="shrink-0 text-right">
                                    <span className={`px-2 py-0.5 border text-[7px] rounded uppercase font-bold ${b.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300'}`}>
                                        {b.status === 'Confirmed' ? activeT.bookingConfirmed : activeT.bookingPending}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bilingual Footer */}
            <div className="text-[7px] uppercase tracking-widest text-zinc-500 bg-white p-2 border-2 border-dashed border-black/15 text-center">
                {language === 'kn' 
                    ? "* ಸ್ಥಳীয় ಜಿಪಿಎಸ್ ಆಧಾರಿತ ಮಾರ್ಗದರ್ಶನ | ಆಫ್ಲೈನ್ ಎಸ್ಎಂಎಸ್ ಅಲರ್ಟ್ ಹಬ್ ಸಂಯೋಜಿತವಾಗಿದೆ" 
                    : "* Offline-First SMS alert sync enabled | Local GPS-indexed mentors directory"}
            </div>
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
        "Hirenix",
        "MessyData",
        "Community Connect",
        "Nimma-Guru"
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
            case "Hirenix":
                return <HirenixSimulator />;
            case "MessyData":
                return <MessyDataSimulator />;
            case "Community Connect":
                return <CommunityConnectSimulator />;
            case "Nimma-Guru":
                return <NimmaGuruSimulator />;
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
