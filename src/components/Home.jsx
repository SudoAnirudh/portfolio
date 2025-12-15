import React, { useState, useEffect } from 'react';
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
import GitHubHeatmap from './GitHubHeatmap';
import HintPopup from './HintPopup';

const Home = () => {
    const [showTerminal, setShowTerminal] = useState(true);

    // Console Easter Egg
    useEffect(() => {
        const style1 = "background: #0a0a0a; color: #4ade80; font-size: 20px; font-weight: bold; padding: 10px;";
        const style2 = "background: #0a0a0a; color: #fff; font-size: 14px; padding: 5px;";

        console.log("%c    ANIRUDH S.    ", style1);
        console.log("%cHello, fellow developer! 👨‍💻\nIf you're reading this, you're probably looking for bugs (or Easter eggs).\nTry typing 'do a barrel roll' in the terminal intro!", style2);
    }, []);

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
                        <GitHubHeatmap />
                        <Statistics />
                        <Experience />
                        <Projects />
                        <Contact />
                        <HintPopup />
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
