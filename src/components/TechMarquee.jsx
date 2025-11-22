import React from 'react';
import { skills } from '../data';

const TechMarquee = () => {
    // Flatten all skills into a single array
    const allSkills = skills.flatMap(skillGroup => skillGroup.items);

    // Split into two rows for better visual balance
    const half = Math.ceil(allSkills.length / 2);
    const row1 = allSkills.slice(0, half);
    const row2 = allSkills.slice(half);

    const MarqueeRow = ({ items, direction = 'normal' }) => (
        <div className="marquee-container" style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            position: 'relative',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            marginBottom: '1rem'
        }}>
            <div className="marquee-content" style={{
                display: 'inline-block',
                animation: `marquee ${direction === 'reverse' ? '25s' : '20s'} linear infinite ${direction === 'reverse' ? 'reverse' : ''}`
            }}>
                {items.map((skill, index) => (
                    <span key={index} className="skill-tag">
                        {skill}
                    </span>
                ))}
                {/* Duplicate for seamless loop */}
                {items.map((skill, index) => (
                    <span key={`dup-${index}`} className="skill-tag">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col">
            <MarqueeRow items={row1} />
            <MarqueeRow items={row2} direction="reverse" />
        </div>
    );
};

export default TechMarquee;
