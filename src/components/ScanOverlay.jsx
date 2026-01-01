import React from 'react';
import { motion } from 'framer-motion';

const ScanOverlay = () => {
    return (
        <div className="scan-overlay">
            <div className="scan-line"></div>
            <div className="scan-grid"></div>
            <div className="scan-flicker"></div>
            <motion.div
                className="scan-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                SYS_SCAN: ANALYZING_DATA_POINTS...
            </motion.div>
        </div>
    );
};

export default ScanOverlay;
