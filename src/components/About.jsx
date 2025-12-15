import React, { useState, useEffect, useRef } from 'react';
import { education, profile } from '../data';
import TechMarquee from './TechMarquee';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section ref={sectionRef} id="about" className="section">
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className="about-content" style={{
                    animation: isVisible ? 'fadeInUp 0.6s ease 0.1s forwards' : 'none',
                    opacity: 0
                }}>
                    <div className="profile-image-container">
                        <img src={profile.imgUrl} alt={profile.name} className="profile-image" />
                    </div>
                    <div className="about-text">
                        <p>{profile.about}</p>
                    </div>
                </div>

                <div style={{
                    marginBottom: '4rem',
                    animation: isVisible ? 'fadeInUp 0.6s ease 0.2s forwards' : 'none',
                    opacity: 0
                }}>
                    <h3 className="subsection-title-center" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                        Education
                    </h3>
                    <div className="education-list">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className="education-item"
                                style={{
                                    animation: isVisible ? `fadeInUp 0.6s ease ${0.3 + index * 0.1}s forwards` : 'none',
                                    opacity: 0
                                }}
                            >
                                <div className="edu-year">{edu.duration}</div>
                                <div className="edu-info">
                                    <h4 className="edu-school">{edu.institution}</h4>
                                    <p className="edu-degree-clean">{edu.degree}</p>
                                    <p className="edu-score">{edu.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{
                    animation: isVisible ? 'fadeInUp 0.6s ease 0.5s forwards' : 'none',
                    opacity: 0
                }}>
                    <h3 className="subsection-title-center" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                        Technical Skills
                    </h3>
                    <TechMarquee />
                </div>
            </div>
        </section>
    );
};

export default About;

