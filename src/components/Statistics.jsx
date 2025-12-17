import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Award, Briefcase, Users } from 'lucide-react';

const Statistics = () => {
    const [isVisible, setIsVisible] = useState(false);

    const stats = [
        { icon: Code, label: 'Projects Completed', value: 15, suffix: '+' },
        { icon: Award, label: 'Certifications', value: 5, suffix: '+' },
        { icon: Briefcase, label: 'Internships', value: 3, suffix: '' },
        { icon: Users, label: 'Hackathons', value: 8, suffix: '+' },
    ];

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
        <motion.section
            onViewportEnter={() => setIsVisible(true)}
            viewport={{ once: true, amount: 0.3 }}
            className="section"
            style={{ background: 'var(--bg-secondary)' }}
        >
            <div className="container">
                <div className="grid md:grid-cols-2" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="card"
                            style={{
                                textAlign: 'center',
                                padding: '2rem',
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
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Statistics;
