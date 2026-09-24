"use client";

import React from "react";
import LeftRailNav from "@/components/LeftRailNav";
import HeroPreface from "@/components/HeroPreface";
import ProjectMonographs from "@/components/ProjectMonographs";
import EngineeringCore from "@/components/EngineeringCore";
import ExperienceMonograph from "@/components/ExperienceMonograph";
import CredentialsMonograph from "@/components/CredentialsMonograph";
import ContactMonograph from "@/components/ContactMonograph";
import RightMarginRail from "@/components/RightMarginRail";
import ReadingProgress from "@/components/ReadingProgress";
import FootnoteDrawer from "@/components/FootnoteDrawer";
import { MarginaliaProvider } from "@/context/MarginaliaContext";

export default function Home() {
  return (
    <MarginaliaProvider>
      <div className="relative min-h-screen selection:bg-[var(--accent-editorial)] selection:text-[var(--bg-primary)]">
        {/* Top Reading Depth Indicator */}
        <ReadingProgress />

        {/* 12-Column Asymmetrical Grid Layout (max-w-6xl centered) */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Columns 1–3: Sticky Left Rail (25% width on desktop) */}
            <aside className="lg:col-span-3 lg:sticky lg:top-12 h-fit">
              <LeftRailNav />
            </aside>

            {/* Columns 4–10: Main Editorial Text Flow (60% width on desktop) */}
            <div className="lg:col-span-7 space-y-16">
              <HeroPreface />
              <ProjectMonographs />
              <EngineeringCore />
              <ExperienceMonograph />
              <CredentialsMonograph />
              <ContactMonograph />
            </div>

            {/* Columns 11–12: Right Margin Rail for Sidenotes & Benchmarks (15% width on desktop) */}
            <div className="hidden lg:block lg:col-span-2">
              <RightMarginRail />
            </div>

          </div>
        </main>

        {/* Mobile Footnote Popover Drawer */}
        <FootnoteDrawer />
      </div>
    </MarginaliaProvider>
  );
}
