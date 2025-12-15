import React, { useState, useEffect, useRef } from 'react';
import { education } from '../data';
import TechMarquee from './TechMarquee';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} id="about" className="section" style={{ padding: '4rem 0' }}>
            <div className="container">
                <h2 className="section-title" style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease',
                }}>About Me</h2>

                {/* Education Section */}
                <div style={{
                    marginBottom: '3rem',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease 0.2s',
                }}>
                    <h3 className="subsection-title-center">
                        <span className="title-icon">🎓</span>
                        Education
                    </h3>
                    <div className="education-grid">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className="education-card"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transition: `all 0.6s ease ${0.3 + index * 0.1}s`,
                                }}
                            >
                                <h4 className="edu-institution">{edu.institution}</h4>
                                <p className="edu-degree">{edu.degree}</p>
                                <div className="edu-footer">
                                    <span className="edu-duration">{edu.duration}</span>
                                    <span className="edu-details">{edu.details}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Section - Looping Marquee */}
                <div style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease 0.5s',
                }}>
                    <h3 className="subsection-title-center">
                        <span className="title-icon">💻</span>
                        Technical Skills
                    </h3>
                    <TechMarquee />
                </div>
            </div>
        </section>
    );
};

export default About;

