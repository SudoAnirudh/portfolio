import React from 'react';
import { profile, certifications, achievements } from '../data';
import { Mail, Phone, MapPin, Github, Linkedin, Award } from 'lucide-react';
import ContactForm from './ContactForm';

const Contact = () => {
    return (
        <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">

                {/* Achievements & Certifications Section */}
                <div className="grid md:grid-cols-2 gap-4" style={{ marginBottom: '5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>Certifications</h3>
                        <ul className="flex flex-col gap-1">
                            {certifications.map((cert, index) => (
                                <li key={index} className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                                    <Award size={16} color="var(--accent)" /> {cert}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>Achievements</h3>
                        <ul className="flex flex-col gap-1">
                            {achievements.map((ach, index) => (
                                <li key={index} className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                                    <Award size={16} color="var(--accent)" /> {ach}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <h2 className="section-title">Get In Touch</h2>

                <div style={{ marginBottom: '3rem' }}>
                    <ContactForm />
                </div>

                <div className="card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="flex justify-center gap-4" style={{ flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <a href={`mailto:${profile.email}`} className="flex items-center gap-1" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                            <Mail size={20} color="var(--accent)" /> {profile.email}
                        </a>
                        <div className="flex items-center gap-1" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                            <Phone size={20} color="var(--accent)" /> {profile.phone}
                        </div>
                        <div className="flex items-center gap-1" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                            <MapPin size={20} color="var(--accent)" /> {profile.location}
                        </div>
                    </div>

                    <div className="flex justify-center gap-2">
                        <a href={profile.social.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ borderRadius: '50%', padding: '0.8rem' }}>
                            <Github size={24} />
                        </a>
                        <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ borderRadius: '50%', padding: '0.8rem' }}>
                            <Linkedin size={24} />
                        </a>
                        <a href={`mailto:${profile.email}`} className="btn btn-outline" style={{ borderRadius: '50%', padding: '0.8rem' }}>
                            <Mail size={24} />
                        </a>
                    </div>
                </div>

                <div className="text-center" style={{ marginTop: '5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
