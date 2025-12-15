import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        setTimeout(() => {
            console.log('Form submitted:', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus(''), 3000);
        }, 1500);
    };

    const inputStyle = {
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid var(--card-border)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        outline: 'none',
        width: '100%',
        fontSize: '0.95rem',
        transition: 'border-color 0.3s'
    };

    return (
        <form onSubmit={handleSubmit} className="card" style={{ maxWidth: '600px', margin: '0 auto', border: 'none', background: 'transparent', padding: 0, boxShadow: 'none', backdropFilter: 'none' }}>
            <div className="flex flex-col gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            className="form-input"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        className="form-input"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        style={{ ...inputStyle, resize: 'none' }}
                        className="form-input"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === 'sending'}
                    style={{
                        marginTop: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: status === 'sending' ? 0.7 : 1,
                        width: '100%'
                    }}
                >
                    {status === 'sending' ? 'Sending...' : (
                        <>Send Message <Send size={18} /></>
                    )}
                </button>

                {status === 'success' && (
                    <p style={{ color: '#4ade80', textAlign: 'center', marginTop: '0.5rem' }}>
                        Message sent successfully!
                    </p>
                )}
            </div>
        </form>
    );
};

export default ContactForm;
