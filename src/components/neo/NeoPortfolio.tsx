"use client";
import React, { useState } from "react";
import { portfolioData, Project } from "@/data/portfolio";
import NeoNavbar from "./NeoNavbar";
import NeoHero from "./NeoHero";
import NeoSkillsStrip from "./NeoSkillsStrip";
import NeoMiddleBento from "./NeoMiddleBento";
import NeoBottomBento from "./NeoBottomBento";
import NeoFooter from "./NeoFooter";
import ProjectModal from "@/components/ProjectModal";
import AllProjectsModal from "./AllProjectsModal";
import SkillsModal from "./SkillsModal";
import CertificationsModal from "./CertificationsModal";
import ContactModal from "./ContactModal";

export default function NeoPortfolio() {
  // Modal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number | null>(null);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [initialSkillFilter, setInitialSkillFilter] = useState<string | undefined>(undefined);
  const [isCertificationsOpen, setIsCertificationsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Smooth scroll handler
  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Open / download resume
  const handleOpenResume = () => {
    const link = document.createElement("a");
    link.href = "/Anirudh S.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = "Anirudh S.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open single project deep-dive modal
  const handleOpenProjectModal = (project: Project) => {
    const index = portfolioData.projects.findIndex((p) => p.slug === project.slug);
    setSelectedProject(project);
    setCurrentProjectIndex(index !== -1 ? index : 0);
  };

  // Navigate between projects inside ProjectModal
  const handleNavigateProject = (direction: "prev" | "next") => {
    if (currentProjectIndex === null) return;
    const total = portfolioData.projects.length;
    const nextIdx =
      direction === "next"
        ? (currentProjectIndex + 1) % total
        : (currentProjectIndex - 1 + total) % total;
    setCurrentProjectIndex(nextIdx);
    setSelectedProject(portfolioData.projects[nextIdx]);
  };

  const handleOpenSkills = (skillName?: string) => {
    setInitialSkillFilter(skillName);
    setIsSkillsOpen(true);
  };

  return (
    <div className="w-full min-h-screen py-4 sm:py-8 px-2 sm:px-4 md:px-6 flex flex-col items-center justify-center">
      {/* Neo-Brutalist Bento Outer Canvas */}
      <div className="w-full max-w-6xl bg-white border-[3px] border-[#0D0D0D] rounded-2xl sm:rounded-3xl shadow-[8px_8px_0px_0px_#0D0D0D] sm:shadow-[10px_10px_0px_0px_#0D0D0D] overflow-hidden flex flex-col">
        {/* Row 1: Navbar */}
        <NeoNavbar
          onOpenContact={() => setIsContactOpen(true)}
          onOpenSkills={() => handleOpenSkills()}
          onOpenResearch={() => setIsCertificationsOpen(true)}
          onScrollTo={handleScrollTo}
        />

        {/* Row 2: Hero Split */}
        <NeoHero
          onViewWork={() => handleScrollTo("projects")}
          onOpenResume={handleOpenResume}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Row 3: Skills Strip */}
        <NeoSkillsStrip onOpenSkills={handleOpenSkills} />

        {/* Row 4: Middle Bento (Featured Projects Carousel + Certifications) */}
        <NeoMiddleBento
          onOpenProjectModal={handleOpenProjectModal}
          onOpenAllProjects={() => setIsAllProjectsOpen(true)}
          onOpenCertifications={() => setIsCertificationsOpen(true)}
        />

        {/* Row 5: Bottom Bento (Experience Timeline + Let's Build CTA) */}
        <NeoBottomBento
          onOpenResume={handleOpenResume}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Row 6: Footer */}
        <NeoFooter onOpenContact={() => setIsContactOpen(true)} />
      </div>

      {/* Interactive Modals */}
      {/* 1. Deep Project Case Study & Live Simulators */}
      <ProjectModal
        project={selectedProject}
        currentIndex={currentProjectIndex}
        totalProjects={portfolioData.projects.length}
        onClose={() => {
          setSelectedProject(null);
          setCurrentProjectIndex(null);
        }}
        onNavigate={handleNavigateProject}
      />

      {/* 2. All 9 Projects Archive */}
      <AllProjectsModal
        isOpen={isAllProjectsOpen}
        onClose={() => setIsAllProjectsOpen(false)}
        onSelectProject={(project) => handleOpenProjectModal(project)}
      />

      {/* 3. 46+ Technical Skills Archive */}
      <SkillsModal
        isOpen={isSkillsOpen}
        onClose={() => setIsSkillsOpen(false)}
        initialSkill={initialSkillFilter}
      />

      {/* 4. Certifications, Research Paper & Achievements */}
      <CertificationsModal
        isOpen={isCertificationsOpen}
        onClose={() => setIsCertificationsOpen(false)}
      />

      {/* 5. Contact Composer Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
