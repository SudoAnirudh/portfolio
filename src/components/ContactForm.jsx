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

    // Google Form Configuration
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdYW6y405M2Jsc_MnYhlQ-sGDVZFwSSbc9EBuW0B2IZRRGKog/formResponse";

    const GOOGLE_FORM_FIELDS = {
        name: "entry.2005620554",
        email: "entry.1045781291",
        subject: "entry.839337160",
        message: "entry.1495416884"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append(GOOGLE_FORM_FIELDS.name, formData.name);
            formDataToSend.append(GOOGLE_FORM_FIELDS.email, formData.email);
            formDataToSend.append(GOOGLE_FORM_FIELDS.subject, formData.subject);
            formDataToSend.append(GOOGLE_FORM_FIELDS.message, formData.message);

            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Forms
                body: formDataToSend
            });

            // "no-cors" mode returns an opaque response, so we can't check response.ok.
            // We assume success if no error was thrown.
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus(''), 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setTimeout(() => setStatus(''), 5000);
        }
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
                        <label htmlFor="name" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Name</label>
                        <input
                            id="name"
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
                        <label htmlFor="email" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
                        <input
                            id="email"
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
                    <label htmlFor="subject" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Subject</label>
                    <input
                        id="subject"
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
                    <label htmlFor="message" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message</label>
                    <textarea
                        id="message"
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
                {status === 'error' && (
                    <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '0.5rem' }}>
                        Oops! Something went wrong. Please try again later.
                    </p>
                )}
            </div>
        </form>
    );
};

export default ContactForm;
