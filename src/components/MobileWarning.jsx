import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, X } from 'lucide-react';

const MobileWarning = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if screen width is less than 1024px (tablet/mobile)
        const checkMobile = () => {
            if (window.innerWidth < 1024) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mobile-warning-overlay"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="mobile-warning-content"
                >
                    <div className="warning-icon-group">
                        <Monitor className="icon-desktop" size={48} />
                        <div className="warning-divider">
                            <div className="dot pulse"></div>
                            <div className="line"></div>
                            <div className="dot"></div>
                        </div>
                        <Smartphone className="icon-mobile" size={32} />
                    </div>

                    <h2>Desktop Experience Recommended</h2>
                    <p>
                        This portfolio features complex 3D visualizations, interactive neural networks, and high-fidelity animations optimized for larger displays.
                    </p>

                    <div className="warning-actions">
                        <button className="btn-secondary" onClick={() => setIsVisible(false)}>
                            Continue Anyway
                        </button>
                    </div>

                    <div className="technical-note">
                        SYSTEM_OVR: HIGH_FIDELITY_GFX_DETECTED
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MobileWarning;
