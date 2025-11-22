import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import ParticleBackground from './components/ParticleBackground';
import ThemeToggle from './components/ThemeToggle';
import Statistics from './components/Statistics';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <>
      <LoadingScreen />
      <ParticleBackground />
      <ThemeToggle />
      <BackToTop />
      <div className="App">
        <Navbar />
        <Hero />
        <About />
        <Statistics />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;

