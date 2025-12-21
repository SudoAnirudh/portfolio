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
import GitHubHeatmap from './GitHubHeatmap';
import HintPopup from './HintPopup';
import CommandPalette from './CommandPalette';
import BuyMeACoffeeWidget from './BuyMeACoffeeWidget';
import CustomCursor from './CustomCursor';
import Snowfall from './Snowfall';

const Home = () => {
    return (
        <>
            <LoadingScreen />
            <Snowfall />
            <CustomCursor />
            <CommandPalette />
            <ParticleBackground />
            <BackToTop />
            <BuyMeACoffeeWidget />
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
    );
};

export default Home;
