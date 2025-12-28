import React, { useState, useEffect } from 'react';
import { profile } from '../data';
import { ArrowRight, Download } from 'lucide-react';
import DiscordStatus from './DiscordStatus';
import Magnetic from './Magnetic';
import CVButton from './CVButton';

const Hero = () => {
    const roles = [profile.title, "Full Stack Developer", "Open Source Enthusiast"];
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, roles]);

    return (
        <section id="home" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '80px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Blobs - Subtler via CSS */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="flex flex-col items-center text-center">
                    <div className="animate-fade-in" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <span style={{
                            background: 'var(--card-bg)',
                            color: 'var(--text-secondary)',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            letterSpacing: '0.05em',
                            border: '1px solid var(--card-border)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            HELLO, I'M
                        </span>
                    </div>

                    <h1 className="animate-fade-in" style={{
                        fontSize: 'clamp(3.5rem, 6vw, 6rem)',
                        fontWeight: '600',
                        lineHeight: '1.1',
                        marginBottom: '1.5rem',
                        animationDelay: '0.1s',
                        letterSpacing: '-0.03em',
                        color: 'var(--text-primary)'
                    }}>
                        {profile.name}
                    </h1>

                    <h2 className="animate-fade-in" style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        fontWeight: '400',
                        animationDelay: '0.2s',
                        height: '3rem' // Fixed height to prevent layout shift
                    }}>
                        {text}
                    </h2>

                    <p className="animate-fade-in" style={{
                        maxWidth: '600px',
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '3rem',
                        animationDelay: '0.3s',
                        lineHeight: '1.8'
                    }}>
                        {profile.summary}
                    </p>
                    <div className="animate-fade-in" style={{ animationDelay: '0.35s', marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
                        <DiscordStatus />
                    </div>

                    <div className="flex gap-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <Magnetic strength={0.3}>
                            <a href="#projects" className="btn btn-primary" style={{ gap: '0.5rem' }}>
                                View Projects <ArrowRight size={18} />
                            </a>
                        </Magnetic>
                        <Magnetic strength={0.3}>
                            <CVButton href="https://drive.google.com/file/d/1V6g7AmD1qLFil0PY0rPI54-Rfp0RgajU/view?usp=drive_link" />
                        </Magnetic>
                    </div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="scroll-down">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
