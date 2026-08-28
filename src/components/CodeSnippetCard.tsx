"use client";
import React, { useState } from 'react';

export interface CodeSnippet {
    filename: string;
    language: string;
    code: string;
    explanation: string;
}

interface CodeSnippetCardProps {
    snippet?: CodeSnippet;
}

export const CodeSnippetCard: React.FC<CodeSnippetCardProps> = ({ snippet }) => {
    const [copied, setCopied] = useState(false);

    if (!snippet || !snippet.code) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = snippet.code.trim().split('\n');

    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 bento-card rounded-3xl p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-retro-green text-xl">code</span>
                    <h2 className="font-pixel text-xs sm:text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">
                        CORE ARCHITECTURAL LOGIC
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-black text-white px-2 py-0.5 rounded uppercase font-bold border border-zinc-700">
                        {snippet.language}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 font-bold">
                        {snippet.filename}
                    </span>
                </div>
            </div>

            <p className="font-body text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                {snippet.explanation}
            </p>

            {/* Dark Code Container */}
            <div className="bg-zinc-950 rounded-2xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {/* Code Header Bar */}
                <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                        <span className="font-mono text-xs text-zinc-400 ml-2">{snippet.filename}</span>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition-colors border border-zinc-700"
                    >
                        <span className="material-symbols-outlined text-sm">
                            {copied ? 'check' : 'content_copy'}
                        </span>
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                </div>

                {/* Code Snippet Scroll Area */}
                <div className="p-4 overflow-x-auto font-mono text-xs text-emerald-400 leading-relaxed max-h-96">
                    <table className="w-full border-collapse">
                        <tbody>
                            {lines.map((line, idx) => (
                                <tr key={idx} className="hover:bg-white/5">
                                    <td className="select-none text-zinc-600 text-right pr-4 w-8 font-mono text-[11px]">
                                        {idx + 1}
                                    </td>
                                    <td className="whitespace-pre text-zinc-200">
                                        {line}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
