import React from 'react';
import { profile } from '../data';
import { ArrowRight, Download, Code, Cpu, Globe, Sparkles } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="section" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '80px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            {/* Floating Shapes/Icons */}
            <div className="floating-shape" style={{ top: '15%', left: '10%', animationDelay: '0s' }}>
                <Code size={40} color="var(--accent)" opacity={0.3} />
            </div>
            <div className="floating-shape" style={{ top: '25%', right: '15%', animationDelay: '1s' }}>
                <Cpu size={40} color="#818cf8" opacity={0.3} />
            </div>
            <div className="floating-shape" style={{ bottom: '20%', left: '15%', animationDelay: '2s' }}>
                <Globe size={40} color="#c084fc" opacity={0.3} />
            </div>
            <div className="floating-shape" style={{ bottom: '30%', right: '10%', animationDelay: '3s' }}>
                <Sparkles size={30} color="#f472b6" opacity={0.3} />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="flex flex-col items-center text-center">
                    <div className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                        <span style={{
                            background: 'rgba(56, 189, 248, 0.1)',
                            color: 'var(--accent)',
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                            backdropFilter: 'blur(5px)'
                        }}>
                            Hello, I'm
                        </span>
                    </div>

                    <h1 className="animate-fade-in" style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        marginBottom: '1.5rem',
                        animationDelay: '0.1s',
                        textShadow: '0 0 40px rgba(56, 189, 248, 0.3)',
                        display: 'inline-block',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        borderRight: '4px solid var(--accent)',
                        width: '0',
                        animation: 'typing 3.5s steps(40, end) forwards, blink-caret 0.75s step-end infinite'
                    }}>
                        {profile.name}
                    </h1>

                    <h2 className="animate-fade-in" style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        animationDelay: '0.2s'
                    }}>
                        {profile.title}
                    </h2>

                    <p className="animate-fade-in" style={{
                        maxWidth: '700px',
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '3rem',
                        animationDelay: '0.3s'
                    }}>
                        {profile.summary}
                    </p>

                    <div className="flex gap-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <a href="#projects" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            View Projects <ArrowRight size={18} />
                        </a>
                        <a href="/Anirudh S.pdf" download className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Download CV <Download size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="scroll-down">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Scroll Down</span>
            </div>
        </section>
    );
};

export default Hero;
