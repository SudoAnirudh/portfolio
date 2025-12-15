import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import LoadingScreen from './LoadingScreen';
import ParticleBackground from './ParticleBackground';
import Statistics from './Statistics';
import BackToTop from './BackToTop';
import Terminal from './Terminal';

const Home = () => {
    const [showTerminal, setShowTerminal] = useState(true);

    const handleTerminalComplete = () => {
        setShowTerminal(false);
    };

    return (
        <>
            <LoadingScreen />
            {showTerminal ? (
                <Terminal onComplete={handleTerminalComplete} />
            ) : (
                <>
                    <ParticleBackground />
                    <BackToTop />
                    <div className="App animate-fade-in">
                        <Navbar />
                        <Hero />
                        <About />
                        <Statistics />
                        <Experience />
                        <Projects />
                        <Contact />
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
