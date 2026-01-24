import React, { useEffect, useRef } from 'react';
import TagCloud from 'TagCloud';
import { skills } from '../data';
import { renderToStaticMarkup } from 'react-dom/server';
import {
    FaPython, FaJava, FaPhp, FaReact, FaGitAlt, FaDatabase, FaChartBar
} from 'react-icons/fa';
import {
    SiC, SiDart, SiDjango, SiFlask, SiFlutter, SiNumpy, SiPandas,
    SiScikitlearn, SiMongodb, SiJupyter, SiTableau
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

// Map skill names to icons - duplicated for now, ideal to move to shared utils
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
    "SQL": { icon: FaDatabase, color: "#4479A1" },
    "MongoDB": { icon: SiMongodb, color: "#47A248" }
};

const SkillSphere = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Flatten all skills into a single array for the cloud
        const allSkills = skills.flatMap(skillGroup => skillGroup.items);

        // Generate HTML strings for icons
        const iconTags = allSkills.map(skill => {
            const IconData = skillIcons[skill];
            if (IconData && IconData.icon) {
                const Icon = IconData.icon;
                // Render icon to static HTML string
                // We add a custom data attribute or style to handle color on hover via CSS if possible
                // Or we can just inline the color if we want it always colorful. 
                // User asked "can you do with the logos", assuming preferring colorful or consistent.
                // Let's make them use the brand color by default for 3D cloud as it looks better than monochrome text.
                return renderToStaticMarkup(
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                        <Icon size={42} color={IconData.color} />
                    </div>
                );
            }
            return skill; // Fallback to text
        });

        const container = containerRef.current;

        // Responsive radius
        const radius = Math.min(300, window.innerWidth / 2 - 40);

        const options = {
            radius: radius,
            maxSpeed: 'normal',
            initSpeed: 'normal',
            direction: 135,
            keep: true,
            useHTML: true // Important for rendering HTML strings
        };

        // Initialize TagCloud
        container.innerHTML = '';

        try {
            TagCloud(container, iconTags, options);
        } catch (e) {
            console.error("TagCloud error:", e);
        }

        return () => {
            container.innerHTML = '';
        };
    }, []);

    return (
        <div
            className="tagcloud-container"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                marginTop: '2rem'
            }}
        >
            <span className="tagcloud" ref={containerRef}></span>
        </div>
    );
};

export default SkillSphere;
