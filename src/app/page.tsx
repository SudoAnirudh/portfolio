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
    <main className="relative">
      <div className="retro-3d-badge" aria-hidden="true" />
      <SarcasticToastWrapper />
      <ScrollObserver />

      {/* Grid container matches the HTML structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Row 1: Hero Section (Profile + Hello World) - Internal grid is 8+4 */}
        <div className="lg:col-span-12">
          <Hero />
        </div>

        {/* Row 2: About + Skills */}
        <div className="lg:col-span-6">
          <About />
        </div>
        <div className="lg:col-span-6">
          <Skills />
        </div>

        {/* Row 3: Experience (System Log) */}
        <div className="lg:col-span-12">
          <Experience />
        </div>

        {/* Row 4: Projects (File Explorer) */}
        <div className="lg:col-span-12">
          <Projects />
        </div>

        {/* Row 5: Education + Certifications */}
        <div className="lg:col-span-12">
          <Education />
        </div>
        <div className="lg:col-span-12">
          <Certifications />
        </div>

        {/* Row 6: Contribution Graph */}
        <div className="lg:col-span-12">
          <Contribution />
        </div>

        {/* Row 7: Contact + Footer */}
        <div className="lg:col-span-12">
          <Contact />
          <Footer />
        </div>

      </div>
    </main>
  );
}
