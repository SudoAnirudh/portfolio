import React from 'react';
import { motion } from 'framer-motion';
import { profile, certifications, achievements } from '../data';
import { Mail, Phone, MapPin, Github, Linkedin, Award } from 'lucide-react';
import ContactForm from './ContactForm';

const Contact = () => {
    return (
        <section id="contact" className="section">
            <div className="container">

                <div className="grid md:grid-cols-2 gap-4" style={{ marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="card"
                    >
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Award size={20} color="var(--accent)" /> Certifications
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {certifications.map((cert, index) => (
                                <li key={index} style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    {cert}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="card"
                    >
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Award size={20} color="var(--accent)" /> Achievements
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {achievements.map((ach, index) => (
                                <li key={index} style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    {ach}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-title"
                >
                    Get In Touch
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ marginBottom: '4rem' }}
                >
                    <ContactForm />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                >
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="flex justify-center gap-4" style={{ flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <a href={`mailto:${profile.email}`} className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            <Mail size={18} /> {profile.email}
                        </a>
                        <div className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            <Phone size={18} /> {profile.phone}
                        </div>
                        <div className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            <MapPin size={18} /> {profile.location}
                        </div>
                    </div>

                    <div className="flex justify-center gap-3">
                        <a href={profile.social.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ borderRadius: '50%', padding: '0.8rem' }}>
                            <Github size={20} />
                        </a>
                        <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ borderRadius: '50%', padding: '0.8rem' }}>
                            <Linkedin size={20} />
                        </a>
                        <a href={`mailto:${profile.email}`} className="btn btn-outline" style={{ borderRadius: '50%', padding: '0.8rem' }}>
                            <Mail size={20} />
                        </a>
                        <a
                            href="https://buymeacoffee.com/anirudh"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline"
                            style={{
                                borderRadius: '50%',
                                padding: '0.8rem',
                                borderColor: '#FFDD00',
                                color: '#FFDD00',
                                background: 'rgba(255, 221, 0, 0.05)'
                            }}
                            title="Buy Me A Coffee"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-coffee"
                            >
                                <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                                <line x1="6" x2="6" y1="2" y2="4"></line>
                                <line x1="10" x2="10" y1="2" y2="4"></line>
                                <line x1="14" x2="14" y1="2" y2="4"></line>
                            </svg>
                        </a>
                    </div>
                </motion.div>

                <div className="text-center" style={{ marginTop: '5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', opacity: 0.8 }}>
                    <p style={{ marginBottom: '0.5rem', color: 'var(--accent)', fontWeight: '500' }}>🎁 Wishing you a joyful holiday season! 🎄</p>
                    <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
