import React, { useMemo } from 'react';

const GitHubHeatmap = () => {
    // Generate dummy contribution data for the last 365 days
    const contributionData = useMemo(() => {
        const data = [];
        const today = new Date();
        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - (364 - i));

            // Random contribution level: 0 (none) to 4 (high)
            // Weighting towards 0 and 1 to make it realistic
            const rand = Math.random();
            let level = 0;
            if (rand > 0.9) level = 4;
            else if (rand > 0.75) level = 3;
            else if (rand > 0.5) level = 2;
            else if (rand > 0.2) level = 1;

            data.push({ date, level });
        }
        return data;
    }, []);

    // Helper to get color based on level (Monochrome Theme)
    const getColor = (level) => {
        switch (level) {
            case 1: return 'var(--card-border)'; // Lightest gray
            case 2: return 'var(--text-secondary)'; // Medium gray
            case 3: return 'var(--text-primary)'; // Dark gray/white
            case 4: return 'var(--accent)'; // Pure white/accent
            default: return 'rgba(255,255,255,0.03)'; // Almost transparent
        }
    };

    // Helper to get GitHub theme color (Violet)
    const getGitHubColor = (level) => {
        switch (level) {
            case 1: return '#ddd6fe'; // Violet 100
            case 2: return '#a78bfa'; // Violet 400
            case 3: return '#8b5cf6'; // Violet 500
            case 4: return '#7c3aed'; // Violet 600
            default: return 'rgba(255,255,255,0.03)';
        }
    };

    return (
        <div className="section" style={{ paddingBottom: '2rem' }}>
            <div className="container">
                <h3 className="subsection-title-center" style={{ marginBottom: '2rem' }}>
                    Code Activity
                </h3>

                <div className="heatmap-container" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    justifyContent: 'center',
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '1.5rem',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: 'var(--radius)',
                    backdropFilter: 'blur(10px)'
                }}>
                    {contributionData.map((day, index) => (
                        <div
                            key={index}
                            title={`${day.date.toDateString()}: Level ${day.level}`}
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '2px',
                                backgroundColor: getColor(day.level),
                                transition: 'all 0.2s ease',
                                cursor: 'default'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.5)';
                                e.target.style.backgroundColor = getGitHubColor(day.level);
                                e.target.style.boxShadow = `0 0 8px ${getGitHubColor(day.level)}`;
                                e.target.style.zIndex = '10';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.backgroundColor = getColor(day.level);
                                e.target.style.boxShadow = 'none';
                                e.target.style.zIndex = '1';
                            }}
                        />
                    ))}
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '5px',
                    maxWidth: '800px',
                    margin: '10px auto 0',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    alignItems: 'center'
                }}>
                    <span>Less</span>
                    <div style={{ width: '10px', height: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}></div>
                    <div style={{ width: '10px', height: '10px', background: 'var(--card-border)', borderRadius: '2px' }}></div>
                    <div style={{ width: '10px', height: '10px', background: 'var(--text-secondary)', borderRadius: '2px' }}></div>
                    <div style={{ width: '10px', height: '10px', background: 'var(--text-primary)', borderRadius: '2px' }}></div>
                    <div style={{ width: '10px', height: '10px', background: 'var(--accent)', borderRadius: '2px' }}></div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};

export default GitHubHeatmap;
