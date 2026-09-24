"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function ContactMonograph() {
  const { personal } = portfolioData;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending editorial dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="correspondence" className="space-y-8 pt-4">
      {/* Section Header */}
      <div className="border-b border-subtle pb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
        <span>§06 CORRESPONDENCE & ARCHIVAL ACCESS</span>
        <span>DIRECT CHANNELS</span>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--text-primary)]">
          Initiate Engineering Correspondence
        </h2>
        <p className="font-serif text-lg leading-relaxed text-[var(--text-primary)] max-w-prose">
          For technical inquiries, full-time AI/ML opportunities, architectural consultations, or research collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Direct Channels */}
        <div className="p-6 bg-[var(--bg-surface)] border border-subtle space-y-4 font-mono text-xs">
          <h3 className="font-serif text-xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-2">
            Direct Archival Channels
          </h3>
          <div className="space-y-3">
            <div>
              <div className="text-[var(--text-secondary)] uppercase text-[10px]">ELECTRONIC MAIL</div>
              <a
                href={`mailto:${personal.email}`}
                className="editorial-link text-sm font-serif font-medium text-[var(--text-primary)] hover:text-[var(--accent-editorial)]"
              >
                {personal.email}
              </a>
            </div>

            <div>
              <div className="text-[var(--text-secondary)] uppercase text-[10px]">TELEPHONE / SIGNAL</div>
              <span className="text-sm font-serif text-[var(--text-primary)]">{personal.phone}</span>
            </div>

            <div>
              <div className="text-[var(--text-secondary)] uppercase text-[10px]">LOCATION BASE</div>
              <span className="text-sm font-serif text-[var(--text-primary)]">{personal.location}</span>
            </div>

            <div>
              <div className="text-[var(--text-secondary)] uppercase text-[10px] pb-1">REPOSITORY & PROFILES</div>
              <div className="flex flex-col space-y-1 font-serif text-sm">
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link text-[var(--text-primary)]"
                >
                  GitHub: SudoAnirudh
                </a>
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link text-[var(--text-primary)]"
                >
                  LinkedIn: sudoanirudh
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Form Dispatch */}
        <div className="p-6 bg-[var(--bg-surface)] border border-subtle space-y-4">
          <h3 className="font-serif text-xl font-medium italic text-[var(--text-primary)] border-b border-subtle pb-2">
            Editorial Dispatch Form
          </h3>

          {submitted ? (
            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--accent-mono)] text-[var(--accent-mono)] font-mono text-xs space-y-2">
              <div className="font-semibold uppercase">✓ Message Dispatched Successfully</div>
              <p className="font-serif text-sm text-[var(--text-primary)]">
                Thank you for your correspondence. I will review your message and reply promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[var(--text-secondary)] uppercase text-[10px] mb-1">
                  Sender Name / Organization
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Ada Lovelace"
                  className="w-full p-2.5 bg-[var(--bg-primary)] border border-subtle text-[var(--text-primary)] focus:border-[var(--accent-editorial)] outline-none"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] uppercase text-[10px] mb-1">
                  Return Address (Email)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ada@lovelace.org"
                  className="w-full p-2.5 bg-[var(--bg-primary)] border border-subtle text-[var(--text-primary)] focus:border-[var(--accent-editorial)] outline-none"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] uppercase text-[10px] mb-1">
                  Dispatch Inquiry / Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe architectural requirements or project inquiry..."
                  className="w-full p-2.5 bg-[var(--bg-primary)] border border-subtle text-[var(--text-primary)] focus:border-[var(--accent-editorial)] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] font-mono text-xs uppercase tracking-widest hover:bg-[var(--accent-editorial)] transition-colors duration-200 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Transmitting..." : "Send Correspondence"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
