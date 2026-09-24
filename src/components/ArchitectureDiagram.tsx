"use client";

import React, { useState } from "react";

export interface DiagramNode {
  id: string;
  step: string;
  title: string;
  description: string;
  subtext?: string;
}

interface ArchitectureDiagramProps {
  slug: string;
  flow?: DiagramNode[];
}

export default function ArchitectureDiagram({ slug, flow }: ArchitectureDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  if (!flow || flow.length === 0) {
    return null;
  }

  return (
    <div className="my-8 space-y-4">
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] border-b border-subtle pb-2">
        <span>Architectural Line Art Diagram</span>
        <span className="text-[10px] text-[var(--accent-editorial)]">Hover nodes for data flow inspection</span>
      </div>

      {/* SVG Architectural Line Art Canvas */}
      <div className="bg-[var(--bg-surface)] border border-subtle p-6 overflow-x-auto">
        <div className="min-w-[600px] space-y-6">
          {/* Top Line Art Grid representation */}
          <div className="grid grid-cols-4 gap-4 relative">
            {flow.map((node, index) => {
              const isHovered = hoveredNode === node.id;
              const isConnected = hoveredNode !== null && hoveredNode !== node.id;

              return (
                <div key={node.id} className="relative group">
                  {/* Connector Line to next node */}
                  {index < flow.length - 1 && (
                    <div className="absolute top-1/2 -right-4 w-4 h-[1px] bg-[var(--border-subtle)] z-0 flex items-center justify-center">
                      <div className="w-1 h-1 bg-[var(--accent-editorial)] rounded-full animate-pulse" />
                    </div>
                  )}

                  {/* Architectural Node Box */}
                  <div
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`arch-node p-4 border transition-all duration-200 cursor-pointer relative z-10 bg-[var(--bg-primary)] ${
                      isHovered
                        ? "border-[var(--accent-editorial)] shadow-sm translate-y-[-1px]"
                        : "border-subtle"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[var(--text-secondary)] mb-1">
                      <span>{node.step}</span>
                      <span className="w-1.5 h-1.5 rounded-full border border-[var(--text-secondary)] group-hover:border-[var(--accent-editorial)] group-hover:bg-[var(--accent-editorial)] transition-colors" />
                    </div>
                    <h4 className="font-serif text-sm font-medium text-[var(--text-primary)] leading-tight mb-1">
                      {node.title}
                    </h4>
                    <p className="font-mono text-[11px] text-[var(--text-secondary)] leading-snug line-clamp-3">
                      {node.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Micro Flow Details Banner */}
          <div className="pt-3 border-t border-subtle flex items-center justify-between font-mono text-[11px] text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-mono)]" />
              Determinism: Strict Control Loop
            </span>
            <span>Latency SLA: Sub-100ms Inference</span>
            <span>Engine: FastAPI / PyTorch</span>
          </div>
        </div>
      </div>
    </div>
  );
}
