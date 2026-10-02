'use client';

import React, { useState } from 'react';

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
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-amber-400 text-xl">terminal</span>
        <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-400 font-semibold">
          // 04. CORE ARCHITECTURAL LOGIC
        </h2>
      </div>

      {snippet.explanation && (
        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
          {snippet.explanation}
        </p>
      )}

      {/* Code Window IDE Container */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Top Header Bar */}
        <div className="bg-zinc-900/90 border-b border-zinc-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-xs text-zinc-400 border-l border-zinc-800 pl-3">
              {snippet.filename}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-zinc-100 bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 px-2.5 py-1 rounded transition-colors"
          >
            {copied ? (
              <>
                <span className="text-emerald-400">✓</span>
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">content_copy</span>
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content View */}
        <div className="p-4 overflow-x-auto">
          <pre className="font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed flex">
            <div className="flex flex-col text-zinc-600 select-none pr-4 text-right border-r border-zinc-800/80 font-mono text-xs">
              {lines.map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <code className="pl-4 font-mono text-zinc-200 whitespace-pre">
              {snippet.code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
