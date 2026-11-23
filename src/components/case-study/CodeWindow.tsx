'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
  explanation?: string;
}

interface CodeWindowProps {
  snippet: CodeSnippet;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({ snippet }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const lines = snippet.code.split('\n');

  return (
    <div className="bg-white border-[3px] border-[#0D0D0D] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#0D0D0D] space-y-4">
      <div className="flex items-center gap-2">
        <span className="bg-[#FFDE59] text-[#0D0D0D] border-[2px] border-[#0D0D0D] px-2.5 py-1 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#0D0D0D]">
          CODE
        </span>
        <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#0D0D0D] font-black">
          {"//"} 04. CORE ARCHITECTURAL LOGIC
        </h2>
      </div>

      {snippet.explanation && (
        <p className="font-mono text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
          {snippet.explanation}
        </p>
      )}

      {/* Code Window Container */}
      <div className="bg-[#0D0D0D] border-[2.5px] border-[#0D0D0D] shadow-[6px_6px_0px_0px_#0D0D0D] overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-[#1E1E1E] border-b-[2px] border-[#333333] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF7A9E] border border-black/40" />
              <div className="w-3 h-3 rounded-full bg-[#FFDE59] border border-black/40" />
              <div className="w-3 h-3 rounded-full bg-[#B5E635] border border-black/40" />
            </div>
            <span className="font-mono text-xs font-bold text-zinc-300 border-l border-zinc-700 pl-3">
              {snippet.filename}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#0D0D0D] bg-[#B5E635] hover:bg-lime-400 border-[1.5px] border-[#0D0D0D] px-2.5 py-1 shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>COPY CODE</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content View */}
        <div className="p-4 overflow-x-auto bg-[#0D0D0D]">
          <pre className="font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed flex">
            <div className="flex flex-col text-zinc-600 select-none pr-4 text-right border-r border-zinc-800 font-mono text-xs">
              {lines.map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <code className="pl-4 font-mono text-lime-300 whitespace-pre">
              {snippet.code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
