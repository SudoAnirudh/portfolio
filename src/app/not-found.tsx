"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SarcasticRoast {
    category: string;
    tag: string;
    ml: string;
    en: string;
}

const KERALA_RANDOM_ROASTS: SarcasticRoast[] = [
    // --- POLITICAL PARTIES & HARTAL CULTURE ---
    {
        category: "POLITICAL HARTAL",
        tag: "KERALA HARTAL CULTURE 🚩",
        ml: "ഇന്ന് കേരളത്തിൽ ഹർത്താൽ പ്രഖ്യാപിച്ച ദിവസമാണോ ഭായ്? ഈ 404 URL അടിയന്തരമായി അടച്ചിട്ടിരിക്കുകയാണ്!",
        en: "Is today a Hartal day in Kerala bhai? This 404 URL is strictly shut down for the strike!"
    },
    {
        category: "PARTY FLAGS",
        tag: "FLAG HOISTING POLITICS 🚩",
        ml: "ഓരോ 50 മീറ്ററിലും പാർട്ടി കൊടി കുത്തുന്ന ആവേശത്തിൽ ടൈപ്പ് ചെയ്ത തെറ്റായ URL ആണല്ലേ ഇത്?",
        en: "Typed this wrong URL in the enthusiasm of planting a party flag post every 50 meters, didn't you?"
    },
    {
        category: "ELECTION PROMISES",
        tag: "POLITICAL MANIFESTO 🗳️",
        ml: "തിരഞ്ഞെടുപ്പ് വാഗ്ദാനം പോലെയാണ് ഈ URL... കേൾക്കാൻ നല്ല രസമുണ്ട്, പക്ഷെ സംഭവം ഇവിടെ ഇല്ല!",
        en: "This URL is like an election manifesto promise... Sounds great to hear, but doesn't actually exist!"
    },
    {
        category: "PROTEST MARCH",
        tag: "SECRETARIAT MARCH 📣",
        ml: "സെക്രട്ടറിയേറ്റിലേക്ക് 'വഴി തടയൽ' സമരം നടത്തുന്ന ആവേശത്തിൽ ഇങ്ങോട്ട് തിരിഞ്ഞു പോയതാണോ തോമസ്കുട്ടീ?",
        en: "Did you turn down this wrong road while marching to the Secretariat for a road-block protest?"
    },

    // --- CIVIC SENSE & INFRASTRUCTURE ---
    {
        category: "CIVIC SENSE",
        tag: "NO DUMPING SIGNBOARD 🚯",
        ml: "'ഇവിടെ മാലിന്യം തള്ളരുത്' എന്ന് വലിയ അക്ഷരത്തിൽ ബോർഡ് വച്ച സ്ഥലത്ത് കൊണ്ട് ഇട്ട പ്ലാസ്റ്റിക് കവർ പോലെയായി ഈ 404 URL!",
        en: "This 404 URL is just like plastic waste dumped right next to a bold 'Do Not Dump Waste' signboard!"
    },
    {
        category: "PWD ROADS",
        tag: "FRESH TAR VS PWD DIGGING 🚧",
        ml: "ഇന്നലെ ടാർ ചെയ്ത റോഡ് ഇന്ന് കുഴിക്കാൻ വരുന്ന PWD ഡിപ്പാർട്ട്മെന്റ് പോലെയാണ് ഈ ടൈപ്പിംഗ് മിസ്റ്റേക്ക്!",
        en: "This typing mistake is just like PWD digging up a road right the day after it was freshly tarred!"
    },
    {
        category: "BEACH MORAL POLICING",
        tag: "MORAL POLICING UNCLE 👁️",
        ml: "ബീച്ചിൽ സമാധാനമായി ഇരുന്ന് സംസാരിക്കുന്ന കപ്പിൾസിനെ നോക്കുന്ന സദാചാര അമ്മാവന്റെ കണ്ണുതട്ടിപ്പോയതാ ഈ URL!",
        en: "This URL broke down because of the moral policing uncle staring at couples at the beach!"
    },
    {
        category: "BUS OVERTAKING",
        tag: "KSRTC VS PRIVATE BUS 🚌",
        ml: "പ്രൈവറ്റ് ബസ്സിനെക്കാൾ സ്പീഡിൽ മൽസരിച്ച് ഓവർടേക്ക് ചെയ്യാൻ നോക്കിയാൽ വണ്ടി ചെന്ന് നിൽക്കുന്നത് ഈ 404 കുഴിയിലാണ്!",
        en: "If you try overtaking private buses at top speed, your vehicle will land right in this 404 pothole!"
    },
    {
        category: "BEVCO QUEUE",
        tag: "BEVERAGES QUEUE 🍾",
        ml: "ബെവ്കോ ക്യൂവിൽ ബഹളം ഉണ്ടാക്കുന്ന അച്ചായന്മാരെക്കാൾ കൺഫ്യൂഷനിലാണല്ലോ നിങ്ങളുടെ ഈ URL ടൈപ്പിംഗ്!",
        en: "Your URL typing is more confused than uncles making noise in a Bevco queue!"
    },

    // --- DISTRICT ROASTS ---
    {
        category: "KOZHIKODE",
        tag: "CALICUT BIRYANI & BEACH 👑",
        ml: "കോഴിക്കോട്ടുകാരൻ ആണെന്ന് പറഞ്ഞ് വന്നിട്ട് ഒരൊറ്റ URL ശരിക്ക് അടിക്കാൻ അറിയുന്നില്ലല്ലോ ബ്രോ! ബിരിയാണിയും കഴിച്ച് കോഴിക്കോട് ബീച്ചിൽ കാറ്റുകൊള്ളേണ്ട സമയത്താ 404-ൽ വന്ന് നിൽക്കുന്നത്!",
        en: "Claiming to be from Kozhikode, but you don't know how to type a URL properly bro! Instead of eating Biryani at Kozhikode beach, you landed at a 404!"
    },
    {
        category: "KOCHI",
        tag: "ERNAKULAM METRO VIBE 🚇",
        ml: "കൊച്ചി മെട്രോയിൽ കേറി ലുലു മോളിൽ പോയി കാപ്പി കുടിക്കുന്ന ലാഘവത്തോടെ 404 URL അടിച്ചാൽ ഈ KSRTC ബസ്സിൽ കയറ്റില്ല കേട്ടോ!",
        en: "If you type 404 URLs with the nonchalance of taking Kochi Metro to Lulu Mall, you won't be allowed on this KSRTC bus!"
    },
    {
        category: "TRIVANDRUM",
        tag: "CAPITAL ANNA STYLE 🏛️",
        ml: "അണ്ണാ... തിരുവനന്തപുരത്ത് സെക്രട്ടറിയേറ്റ് മാർച്ചിൽ വഴിതെറ്റി ഇങ്ങോട്ട് വന്നതാണോ അണ്ണാ?",
        en: "Anna... Did you get lost during a Trivandrum Secretariat march and end up here?"
    },
    {
        category: "THRISSUR",
        tag: "POORAM GADEE VIBE 🐘",
        ml: "തൃശ്ശൂർ പൂരത്തിന് തെച്ചിക്കോട്ടുകാവ് രാമചന്ദ്രൻ നിൽക്കുന്ന പോലെ ഈ 404 Error പേജിൽ കുറച്ച് കുഴപ്പങ്ങൾ നിരന്നിട്ടുണ്ട് ഗഡീ!",
        en: "Just like grand elephants lined up at Thrissur Pooram, a bunch of 404 mistakes are lined up here Gadee!"
    },
    {
        category: "WAYANAD",
        tag: "CHURAM HAIRPIN BEND 🏔️",
        ml: "വയനാടൻ ചുരത്തിലെ 9-ാം ഹെയർപിൻ വളവിൽ ലോറി കുടുങ്ങിയ പോലെ ഈ URL 404-ൽ കുടുങ്ങിയിരിപ്പാണല്ലോ മച്ചാനേ!",
        en: "Just like a truck stuck on Wayanad Churam's 9th hairpin curve, this URL is stuck on 404!"
    }
];

export default function NotFound() {
    const [isHornBlowing, setIsHornBlowing] = useState(false);
    const [roastIdx, setRoastIdx] = useState(0);
    const [fineCounter, setFineCounter] = useState(50);
    const [isSmokeActive, setIsSmokeActive] = useState(false);

    // Pick random roast on initial mount
    useEffect(() => {
        const initialRandom = Math.floor(Math.random() * KERALA_RANDOM_ROASTS.length);
        setRoastIdx(initialRandom);
    }, []);

    const blowHorn = () => {
        setIsHornBlowing(true);
        setIsSmokeActive(true);
        setTimeout(() => setIsHornBlowing(false), 800);
        setTimeout(() => setIsSmokeActive(false), 2000);
    };

    const pickRandomRoast = () => {
        setRoastIdx((prev) => {
            let next = Math.floor(Math.random() * KERALA_RANDOM_ROASTS.length);
            while (next === prev && KERALA_RANDOM_ROASTS.length > 1) {
                next = Math.floor(Math.random() * KERALA_RANDOM_ROASTS.length);
            }
            return next;
        });
        setFineCounter((prev) => prev + 50);
    };

    const currentRoast = KERALA_RANDOM_ROASTS[roastIdx];

    return (
        <div className="min-h-screen bg-retro-charcoal flex items-center justify-center p-4 font-pixel text-white select-none">
            {/* CRT Scanline & Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
            <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-40 bg-[length:100%_4px,3px_100%] pointer-events-none"></div>

            <div className="max-w-xl w-full bg-zinc-900 border-4 border-black p-5 sm:p-7 rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden text-center space-y-5">
                
                {/* KSRTC Destination Signboard Header */}
                <div className="bg-red-950 border-3 border-black p-3.5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                    <div className="flex justify-between items-center text-[10px] text-amber-300 font-mono uppercase border-b border-red-900 pb-1 mb-2">
                        <span className="flex items-center gap-1 font-bold">🐘 KSRTC AANA VANDI // ROUTE 404</span>
                        <span className="bg-red-800 text-amber-200 px-1.5 py-0.5 rounded text-[8px] font-bold">
                            100% KERALA SARCASTIC
                        </span>
                    </div>
                    <div className="bg-black border-2 border-red-800 p-2.5 rounded-xl text-center">
                        <span className="text-red-500 text-3xl sm:text-4xl font-extrabold tracking-widest animate-pulse block">
                            404: ROUTE MISSED!
                        </span>
                        <span className="text-amber-400 text-xs tracking-wider uppercase block mt-1 font-bold">
                            വഴി തെറ്റിപ്പോയി ദാസാ! (DESTINATION NOT FOUND)
                        </span>
                    </div>
                </div>

                {/* Refined Detailed KSRTC Bus Diagram */}
                <div className="relative py-1 flex flex-col items-center justify-center">
                    {/* Exhaust Smoke Animation */}
                    {isSmokeActive && (
                        <div className="absolute top-2 left-4 flex items-center gap-1 z-20">
                            <span className="text-lg animate-ping opacity-80">💨</span>
                            <span className="text-sm animate-bounce opacity-60">💨</span>
                        </div>
                    )}

                    <div className={`transition-transform duration-200 ${isHornBlowing ? 'scale-105 rotate-1' : ''}`}>
                        {/* KSRTC Red-Yellow Bus Frame */}
                        <div className="w-64 h-32 bg-gradient-to-r from-red-700 via-red-600 to-red-800 border-4 border-black rounded-3xl relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                            {/* Destination Route Board Top */}
                            <div className="bg-black border-b-2 border-black px-2 py-0.5 flex justify-between items-center text-[8px] font-mono text-yellow-300">
                                <span>TRIVANDRUM ➔ KOCHI ➔ KOZHIKODE</span>
                                <span className="text-red-400 font-bold">404 MISSED</span>
                            </div>

                            {/* Yellow Iconic Livery Stripe */}
                            <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-5 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 border-y-2 border-black flex items-center justify-between px-3">
                                <span className="text-[9px] text-black font-bold uppercase tracking-widest font-mono flex items-center gap-1">
                                    <span>🐘</span> KSRTC ORDINARY
                                </span>
                                <span className="text-[8px] bg-black text-yellow-300 px-1 py-0.5 rounded font-mono font-bold">
                                    KL-15 404
                                </span>
                            </div>
                            
                            {/* Bus Windows & Passenger Silhouettes */}
                            <div className="absolute top-7 inset-x-3 flex justify-between gap-1">
                                {['👤', '👨‍✈️', '👤', '👩', '👨'].map((p, idx) => (
                                    <div key={idx} className="w-9 h-6 bg-cyan-200/90 border-2 border-black rounded-xs flex items-center justify-center text-[9px] text-black shadow-inner">
                                        {p}
                                    </div>
                                ))}
                            </div>

                            {/* Front Door & Driver Cabin */}
                            <div className="absolute bottom-2 right-3 w-5 h-7 bg-zinc-900 border-2 border-black rounded-t-xs flex items-center justify-center text-[7px] text-amber-400 font-mono">
                                EXIT
                            </div>

                            {/* Headlights & Grille */}
                            <div className="absolute bottom-2 left-2 flex items-center gap-1">
                                <div className="w-3.5 h-3.5 rounded-full bg-yellow-300 border-2 border-black animate-pulse shadow-[0_0_8px_rgba(253,224,71,0.8)]"></div>
                                <div className="w-3.5 h-3.5 rounded-full bg-yellow-300 border-2 border-black animate-pulse shadow-[0_0_8px_rgba(253,224,71,0.8)]"></div>
                            </div>
                        </div>

                        {/* Bus Wheels & Mudflaps */}
                        <div className="flex justify-between px-8 -mt-4 relative z-10">
                            <div className="flex flex-col items-center">
                                <div className="w-9 h-9 rounded-full bg-zinc-950 border-3 border-black flex items-center justify-center text-[9px] text-zinc-500 animate-spin">
                                    ⚙️
                                </div>
                                <span className="text-[7px] bg-black text-zinc-400 px-1 rounded -mt-1 font-mono">KEEP DISTANCE</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-9 h-9 rounded-full bg-zinc-950 border-3 border-black flex items-center justify-center text-[9px] text-zinc-500 animate-spin">
                                    ⚙️
                                </div>
                                <span className="text-[7px] bg-black text-zinc-400 px-1 rounded -mt-1 font-mono">AANA VANDI</span>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Conductor Controls */}
                    <div className="mt-3.5 flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={blowHorn}
                            className="px-3.5 py-1.5 bg-amber-500 text-black border-2 border-black text-[10px] font-bold rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-400 active:translate-y-0.5 cursor-pointer flex items-center gap-1"
                        >
                            <span>📢 Air Horn (എയർ ഹോൺ)</span>
                        </button>
                        <button
                            onClick={pickRandomRoast}
                            className="px-4 py-1.5 bg-red-600 text-white border-2 border-black text-[10px] font-bold rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-red-500 active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                        >
                            <span>🎲 Next Random Sarcastic Roast</span>
                            <span className="bg-black/40 text-amber-300 text-[8px] px-1 rounded">₹50 Fine</span>
                        </button>
                    </div>
                </div>

                {/* Sarcastic Malayalam Conductor Comments Display */}
                <div className="bg-zinc-800/90 border-2 border-zinc-700 p-4 rounded-2xl text-center space-y-2 shadow-inner relative">
                    <div className="flex justify-between items-center text-[9px] text-amber-400 font-mono border-b border-zinc-700 pb-1">
                        <span>👨‍✈️ CONDUCTOR ROAST: {currentRoast.category}</span>
                        <span className="text-red-400 font-bold">ACCUMULATED FINE: ₹{fineCounter}</span>
                    </div>
                    <div className="text-[9px] text-amber-400 font-mono uppercase bg-black/40 py-0.5 rounded border border-amber-500/20">
                        {currentRoast.tag}
                    </div>
                    <p className="text-amber-300 text-sm font-sans font-bold leading-relaxed pt-1">
                        "{currentRoast.ml}"
                    </p>
                    <p className="text-zinc-400 text-[10px] font-mono italic">
                        "{currentRoast.en}"
                    </p>
                </div>

                {/* Navigation Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
                    <Link
                        href="/"
                        className="px-5 py-3 bg-retro-green border-3 border-black text-retro-charcoal font-pixel text-xs uppercase tracking-wider font-bold rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
                    >
                        <span>🚌 Board KSRTC Bus Back to Home Page</span>
                    </Link>
                    <Link
                        href="/#skills"
                        className="px-5 py-3 bg-retro-yellow border-3 border-black text-retro-charcoal font-pixel text-xs uppercase tracking-wider font-bold rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
                    >
                        <span>☕ Stop at Chaya Kada Tech Lounge</span>
                    </Link>
                </div>

                {/* Footer Disclaimer */}
                <div className="text-[9px] text-zinc-500 uppercase font-mono pt-2 border-t border-zinc-800">
                    🌴 KSRTC SWIFT // 100% RANDOM KERALA POLITICS, CIVIC SENSE & DISTRICT SARCO-ADVISORY 🌴
                </div>
            </div>
        </div>
    );
}


