import Hero from "@/components/Hero";
import About from "@/components/About";

import SarcasticToastWrapper from "@/components/SarcasticToastWrapper";

import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Contribution from "@/components/Contribution";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollObserver from "@/components/ScrollObserver";

export default function Home() {
  return (
    <main className="relative perspective-stage">
      <div className="floating-cubes" aria-hidden="true" />
      <SarcasticToastWrapper />
      <ScrollObserver />

      {/* Grid container matches the HTML structure */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Row 1: Hero Section (Profile + Hello World) - Internal grid is 8+4 */}
        <div className="lg:col-span-12 retro-3d-panel">
          <Hero />
        </div>

        {/* Row 2: About + Skills */}
        <div className="lg:col-span-6 retro-3d-panel">
          <About />
        </div>
        <div className="lg:col-span-6 retro-3d-panel">
          <Skills />
        </div>

        {/* Row 3: Experience (System Log) */}
        <div className="lg:col-span-12 retro-3d-panel">
          <Experience />
        </div>

        {/* Row 4: Projects (File Explorer) */}
        <div className="lg:col-span-12 retro-3d-panel">
          <Projects />
        </div>

        {/* Row 5: Education + Certifications */}
        <div className="lg:col-span-12 retro-3d-panel">
          <Education />
        </div>
        <div className="lg:col-span-12 retro-3d-panel">
          <Certifications />
        </div>

        {/* Row 6: Contribution Graph */}
        <div className="lg:col-span-12 retro-3d-panel">
          <Contribution />
        </div>

        {/* Row 7: Contact + Footer */}
        <div className="lg:col-span-12 retro-3d-panel">
          <Contact />
          <Footer />
        </div>

      </div>
    </main>
  );
}
