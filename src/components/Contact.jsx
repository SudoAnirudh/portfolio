import React from 'react';
import { profile, certifications, achievements } from '../data';
import { Mail, Phone, MapPin, Github, Linkedin, Award } from 'lucide-react';
import ContactForm from './ContactForm';

const Contact = () => {
    return (
        <section id="contact" className="section">
            <div className="container">

                <div className="grid md:grid-cols-2 gap-4" style={{ marginBottom: '4rem' }}>
                    <div className="card">
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
                    </div>

                    <div className="card">
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
                    </div>
                </div>

                <h2 className="section-title">Get In Touch</h2>

                <div style={{ marginBottom: '4rem' }}>
                    <ContactForm />
                </div>

                <div className="text-center">
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
                    </div>
                </div>

                <div className="text-center" style={{ marginTop: '5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', opacity: 0.6 }}>
                    <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
