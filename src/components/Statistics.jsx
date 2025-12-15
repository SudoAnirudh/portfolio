import React, { useState, useEffect, useRef } from 'react';
import { Code, Award, Briefcase, Users } from 'lucide-react';

const Statistics = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const stats = [
        { icon: Code, label: 'Projects Completed', value: 15, suffix: '+' },
        { icon: Award, label: 'Certifications', value: 5, suffix: '+' },
        { icon: Briefcase, label: 'Internships', value: 3, suffix: '' },
        { icon: Users, label: 'Hackathons', value: 8, suffix: '+' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const Counter = ({ end, duration = 2000, suffix = '' }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!isVisible) return;
            let startTime;
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                setCount(Math.floor(progress * end));
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, [isVisible, end, duration]);

        return <span>{count}{suffix}</span>;
    };

    return (
        <section ref={sectionRef} className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div className="grid md:grid-cols-2" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="card"
                            style={{
                                textAlign: 'center',
                                padding: '2rem',
                                animation: isVisible ? `fadeInUp 0.6s ease ${index * 0.1}s forwards` : 'none',
                                opacity: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <div style={{
                                color: 'var(--accent)',
                                marginBottom: '0.5rem'
                            }}>
                                <stat.icon size={28} />
                            </div>
                            <h3 style={{
                                fontSize: '2.5rem',
                                fontWeight: '300',
                                color: 'var(--text-primary)',
                                margin: 0,
                                lineHeight: 1
                            }}>
                                <Counter end={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                margin: 0,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase'
                            }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
