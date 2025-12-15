import React from 'react';
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

const Home = () => {
    return (
        <>
            <LoadingScreen />
            <ParticleBackground />
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
};

export default Home;
