import React from 'react';
import { skills } from '../data';
import {
    FaPython, FaJava, FaPhp, FaReact, FaGitAlt, FaDatabase, FaChartBar
} from 'react-icons/fa';
import {
    SiC, SiDart, SiDjango, SiFlask, SiFlutter, SiNumpy, SiPandas,
    SiScikitlearn, SiMongodb, SiJupyter,
    SiTableau
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

// Map skill names to icons
const skillIcons = {
    "Python": { icon: FaPython, color: "#3776AB" },
    "C": { icon: SiC, color: "#A8B9CC" },
    "Java": { icon: FaJava, color: "#007396" },
    "Dart": { icon: SiDart, color: "#0175C2" },
    "PHP": { icon: FaPhp, color: "#777BB4" },
    "Django": { icon: SiDjango, color: "#092E20" },
    "Flask": { icon: SiFlask, color: "#000000" },
    "React": { icon: FaReact, color: "#61DAFB" },
    "Flutter": { icon: SiFlutter, color: "#02569B" },
    "NumPy": { icon: SiNumpy, color: "#013243" },
    "Pandas": { icon: SiPandas, color: "#150458" },
    "Scikit-learn": { icon: SiScikitlearn, color: "#F7931E" },
    "Git": { icon: FaGitAlt, color: "#F05032" },
    "VS Code": { icon: VscVscode, color: "#007ACC" },
    "Jupyter": { icon: SiJupyter, color: "#F37626" },
    "Power BI": { icon: FaChartBar, color: "#F2C811" },
    "Tableau": { icon: SiTableau, color: "#E97627" },
    "SQL": { icon: FaDatabase, color: "#4479A1" }, // Using Generic Database icon or SQL color
    "MongoDB": { icon: SiMongodb, color: "#47A248" }
};

// eslint-disable-next-line react/prop-types
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
            animation: `marquee ${direction === 'reverse' ? '30s' : '25s'} linear infinite ${direction === 'reverse' ? 'reverse' : ''}`
        }}>
            {items.map((skill, index) => {
                const IconData = skillIcons[skill];
                const IconComponent = IconData ? IconData.icon : null;

                return (
                    <span
                        key={index}
                        className="skill-tag-marquee"
                        title={skill}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (IconData?.color) e.currentTarget.style.color = IconData.color;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = ''; // Revert to CSS class color
                        }}
                    >
                        {IconComponent ? (
                            <IconComponent size={40} />
                        ) : (
                            skill
                        )}
                    </span>
                );
            })}
            {/* Duplicate for seamless loop */}
            {items.map((skill, index) => {
                const IconData = skillIcons[skill];
                const IconComponent = IconData ? IconData.icon : null;

                return (
                    <span
                        key={`dup-${index}`}
                        className="skill-tag-marquee"
                        title={skill}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (IconData?.color) e.currentTarget.style.color = IconData.color;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = ''; // Revert to CSS class color
                        }}
                    >
                        {IconComponent ? (
                            <IconComponent size={40} />
                        ) : (
                            skill
                        )}
                    </span>
                );
            })}
        </div>
    </div>
);

const TechMarquee = () => {
    // Flatten all skills into a single array
    const allSkills = skills.flatMap(skillGroup => skillGroup.items);

    // Split into two rows for better visual balance
    const half = Math.ceil(allSkills.length / 2);
    const row1 = allSkills.slice(0, half);
    const row2 = allSkills.slice(half);

    return (
        <div className="marquee-wrapper">
            <MarqueeRow items={row1} />
            <MarqueeRow items={row2} direction="reverse" />
        </div>
    );
};

export default TechMarquee;
