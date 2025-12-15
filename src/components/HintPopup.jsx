import React, { useState, useEffect } from 'react';
import { X, Lightbulb } from 'lucide-react';

const HintPopup = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show hint after 10 seconds of being on the main site
        const timer = setTimeout(() => {
            setVisible(true);
        }, 8000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="animate-fade-in" style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px', // Changed to right for better visibility usually
            width: '300px',
            background: 'rgba(23, 23, 23, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--accent)',
            borderRadius: '12px',
            padding: '16px',
            zIndex: 9999, // High z-index to sit on top
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
        }}>
            <div style={{ color: 'var(--accent)', marginTop: '2px' }}>
                <Lightbulb size={20} />
            </div>
            <div style={{ flex: 1 }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '600', marginBottom: '4px' }}>
                    Easter Egg Hunt!
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>
                    Psst! Try clicking the <strong>dot</strong> in the logo or type <strong>"do a barrel roll"</strong> in the terminal!
                </p>
            </div>
            <button
                onClick={() => setVisible(false)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '0'
                }}
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default HintPopup;
