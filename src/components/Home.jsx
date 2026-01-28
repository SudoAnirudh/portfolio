import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import LoadingScreen from './LoadingScreen';
import NeuralBackground from './NeuralBackground';
import Statistics from './Statistics';
import GitHubHeatmap from './GitHubHeatmap';
import CommandPalette from './CommandPalette';
import BuyMeACoffeeWidget from './BuyMeACoffeeWidget';
import Terminal from './Terminal';
import MatrixBackground from './MatrixBackground';
import ScanOverlay from './ScanOverlay';

const Home = () => {
    const [isMatrixMode, setIsMatrixMode] = useState(false);
    const [isScanMode, setIsScanMode] = useState(false);

    return (
        <>
            <LoadingScreen />
            <CommandPalette />
            {isMatrixMode && <MatrixBackground />}
            {isScanMode && <ScanOverlay />}
            <Terminal
                onMatrixToggle={() => setIsMatrixMode(!isMatrixMode)}
                onScanToggle={() => setIsScanMode(!isScanMode)}
                isMatrixMode={isMatrixMode}
                isScanMode={isScanMode}
            />
            {!isMatrixMode && <NeuralBackground />}
            <BuyMeACoffeeWidget />
            <div className={`App animate-fade-in ${isMatrixMode ? 'matrix-active' : ''}`}>
                <Navbar />
                <Hero />
                <About />
                <GitHubHeatmap />
                <Statistics />
                <Experience />
                <Projects />
                <Contact />
            </div>
        </>
    );
};

export default Home;
