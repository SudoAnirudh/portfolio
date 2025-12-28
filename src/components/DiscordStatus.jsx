import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DISCORD_ID = '747829149804265532'; // Replace with your actual Discord ID

const DiscordStatus = () => {
    const [presence, setPresence] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const data = await response.json();
                if (data.success) {
                    setPresence(data.data);
                }
            } catch (error) {
                console.error('Lanyard error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 30000); // Update every 30 seconds
        return () => clearInterval(interval);
    }, []);

    if (loading || !presence) return null;

    const status = presence.discord_status;
    const spotify = presence.spotify;
    const activities = presence.activities || [];
    const isCoding = activities.some(a => a.name === 'Visual Studio Code');

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return '#23a55a';
            case 'idle': return '#f0b232';
            case 'dnd': return '#f23f43';
            default: return '#80848e';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="discord-status-container"
        >
            <div className="status-indicator">
                <div
                    className="status-dot"
                    style={{ backgroundColor: getStatusColor(status) }}
                >
                    {status === 'online' && <div className="status-ping" style={{ backgroundColor: getStatusColor(status) }}></div>}
                </div>
                <span className="status-text">
                    {isCoding ? 'Currently Coding' : (spotify ? 'Listening to Spotify' : (status === 'online' ? 'Online' : 'Offline'))}
                </span>
            </div>

            <AnimatePresence>
                {spotify && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="spotify-details"
                    >
                        <img src={spotify.album_art_url} alt="Spotify Album Art" className="spotify-art" />
                        <div className="spotify-info">
                            <span className="spotify-song">{spotify.track}</span>
                            <span className="spotify-artist">by {spotify.artist}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default DiscordStatus;
