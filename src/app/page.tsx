import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Credentials from "@/components/Credentials";
import Contribution from "@/components/Contribution";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollObserver from "@/components/ScrollObserver";

export default function Home() {
  return (
    <main className="relative">
      <ScrollObserver />

      {/* Grid container matches the HTML structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

        {/* Row 1: Hero Section (Profile + Hello World) */}
        <div className="lg:col-span-12">
          <Hero />
        </div>

        {/* Row 2: About + Skills */}
        <div className="lg:col-span-6 flex flex-col">
          <About />
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <Skills />
        </div>

        {/* Row 3: Projects (Headline Flagships) */}
        <div className="lg:col-span-12">
          <Projects />
        </div>

        {/* Row 4: Experience (Career History) */}
        <div className="lg:col-span-12">
          <Experience />
        </div>

        {/* Row 5: Consolidated Credentials (Education, Certifications, Achievements) */}
        <div className="lg:col-span-12">
          <Credentials />
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

